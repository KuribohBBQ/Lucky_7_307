import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userService from "./services/user-service.js";

// adds users to mongo
function postUser(userToAdd) {
	userService
		.addUser(userToAdd)
		.then((res) => {
			if (res.status === 201) return userToAdd;
		})
		.catch((error) => res.status(500).send(error));
}

function findUser(name) {
	return userService.findUserByName(name);
}

export function registerUser(req, res) {
	const { username, pwd } = req.body; // from form

	if (!username || !pwd) {
		return res.status(400).send("Bad request: Invalid input data.");
	}

	findUser(username)
		.then((existingUser) => {
			console.log("this is existing user:", existingUser);
			if (existingUser) {
				return res.status(409).send("Username already taken"); 
			} else {
				return bcrypt 
					.genSalt(10)
					.then((salt) => bcrypt.hash(pwd, salt))
					.then((hashedPassword) => {
						return generateAccessToken(username) 
							.then((token) => {
								console.log("Token:", token);
								res.status(201).send({ token: token });
								postUser({ username, hashedPassword });
							});
					});
			}
		})
		.catch((error) => { 
			console.error("Error during registration:", error);
			return res.status(500).send("Internal server error"); 
		});
}

function generateAccessToken(username) {
	return new Promise((resolve, reject) => {
		jwt.sign(
			{ username: username },
			process.env.TOKEN_SECRET ||
				"6b82d531eb46cff8f35435e4e0bc3a34d43d382ad16c57663fbee52f38470dc68c47766ee5f650ba824688da1ec50d28d559e10e57875cdc50e2595ee568facd",
			{ expiresIn: "1d" },
			(error, token) => {
				if (error) {
					reject(error);
				} else {
					resolve(token);
				}
			}
		);
	});
}

export function authenticateUser(req, res, next) {
	const authHeader = req.headers["authorization"];
	//Getting the 2nd part of the auth header (the token)
	const token = authHeader && authHeader.split(" ")[1];
	console.log("this is token", token);

	if (!token) {
		console.log("No token received");
		res.status(401).end();
	} else {
		jwt.verify(
			token,
			process.env.TOKEN_SECRET ||
				"6b82d531eb46cff8f35435e4e0bc3a34d43d382ad16c57663fbee52f38470dc68c47766ee5f650ba824688da1ec50d28d559e10e57875cdc50e2595ee568facd",
			(error, decoded) => {
				if (decoded) {
					req.username = decoded.username; // pass username to use in backend
					next();
				} else {
					console.log("JWT error:", error);
					res.status(401).end();
				}
			}
		);
	}
}

export function loginUser(req, res) {
	const { username, pwd } = req.body;
	findUser(username)
		.then((retrievedUser) => {
			if (!retrievedUser) {
				res.status(401).send("Unauthorized");
			} else {
				bcrypt
					.compare(pwd, retrievedUser.hashedPassword)
					.then((matched) => {
						if (matched) {
							generateAccessToken(username).then(
								(token) => {
									res.status(200).send({
										token: token
									});
								}
							);
						} else {
							res.status(401).send("Unauthorized");
						}
					})
					.catch((error) => {
						console.error(
							"Error comparing passwords:",
							error
						);
						res.status(500).send("Internal server error");
					});
			}
		})
		.catch((error) => {
			console.error("Error finding user:", error);
			res.status(500).send("Internal server error");
		});
}
