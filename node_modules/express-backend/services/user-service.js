import mongoose from "mongoose";
import authModel from "../models/authentication.js";

mongoose.set("debug", true);

function addUser(user) {
	const userToAdd = new authModel(user);
	const promise = userToAdd.save();
	return promise;
}

function deleteUserById(id) {
	return authModel.findByIdAndDelete(id);
}

function findUserByName(name) {
	return authModel.findOne({ username: name });
}

export default {
	addUser,
	deleteUserById,
	findUserByName
};
