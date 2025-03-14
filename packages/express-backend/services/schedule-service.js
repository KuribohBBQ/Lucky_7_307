import mongoose from "mongoose";
import scheduleModel from "../models/schedule.js";
import taskService from "./task-service.js";

mongoose.set("debug", true);

function getSchedule(name) {
	let promise;
	promise = scheduleModel.find({ username: name });
	return promise;
}

function addSchedule(schedule, username) {
	const newSchedule = {
		task: "",
		time: "",
		start: "",
        due: "",
		username: ""
	};
	/*
    taskService.getTasks(username).then(
        {
            (tasks) => {




            }
        }
    ) */
	newSchedule.time = schedule.time;
	newSchedule.task = schedule.task;
	newSchedule.start = schedule.start;
	newSchedule.due = schedule.due;
	newSchedule.date = schedule.date;
	newSchedule.username = username;
	console.log("this is newTask", newSchedule);
	const scheduleToAdd = new scheduleModel(newSchedule);
	const promise = scheduleToAdd.save();
	return promise;
}

function deleteScheduleById(id) {
	return scheduleModel.findByIdAndDelete(id);
}

export default {
	addSchedule,
	getSchedule,
	deleteScheduleById
};
