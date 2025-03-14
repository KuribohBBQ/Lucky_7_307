import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
	const navigate = useNavigate();

	const [creds, setCreds] = useState({
		username: "",
		pwd: ""
	});

	return (
		<form>
			<label htmlFor="username"
			style={{ color: "white"}}>UserName</label>
			<input
				type="text"
				name="username"
				id="username"
				value={creds.username}
				onChange={handleChange}
			/>
			<label htmlFor="password"
			style={{ color: "white"}}>Password</label>
			<input
				type="password"
				name="password"
				id="password"
				value={creds.pwd}
				onChange={handleChange}
			/>
			<input
				type="button"
				value={props.buttonLabel || "Log In"}
				onClick={submitForm}
			/>
		</form>
	);

	function handleChange(event) {
		const { name, value } = event.target;
		switch (name) {
			case "username":
				setCreds({ ...creds, username: value });
				break;
			case "password":
				setCreds({ ...creds, pwd: value });
				break;
		}
	}

	function submitForm() {
		props
			.handleSubmit(creds)
			.then(() => {
				navigate("/"); // Navigate to home after successful login/signup
			})
			.catch((error) => {
				console.error("Login/Signup failed:", error);
			});
		setCreds({ username: "", pwd: "" });
	}
}

export default Login;
