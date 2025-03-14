import mongoose from "mongoose";
import taskModel from "../models/tasks.js";

mongoose.set("debug", true);

function getTasks(name) {
	let promise;
	promise = taskModel.find({ username: name });
	return promise;
}

function addTask(task, username) {
	const newTask = {
		time: "",
		task: "",
		date: "",
		username: ""
	};
	newTask.time = task.time;
	newTask.task = task.task;
	newTask.date = task.date;
	newTask.username = username;
	console.log("this is newTask", newTask);
	const taskToAdd = new taskModel(newTask);
	const promise = taskToAdd.save();
	return promise;
}

function deleteTaskById(id) {
	return taskModel.findByIdAndDelete(id);
}

export default {
	addTask,
	getTasks,
	deleteTaskById
};
