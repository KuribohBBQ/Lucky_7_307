import express from "express";
import cors from "cors";
import { registerUser, loginUser, authenticateUser } from "./auth.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import taskService from "./services/task-service.js";
import scheduleService from "./services/schedule-service.js";
dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
	.connect(MONGO_CONNECTION_STRING + "tasks") // connect to Db "tasks"
	.catch((error) => console.log(error));

const app = express();
const port = 8000;
app.use(cors());

app.use(express.json());
app.get("/", (req, res) => {
	res.send("Welcome to our ToDo backend!");
});

//authenticate
app.post("/signup", registerUser);
app.post("/login", loginUser);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

//app to list all tasks
app.get("/tasks", authenticateUser, (req, res) => {
	const username = req.username;
	console.log("the current username is: ", username);
	taskService
		.getTasks(username)
		.then((tasks) => res.send({ tasks_list: tasks }))
		.catch((error) => res.status(500).send(error));
});

//app to post task
app.post("/tasks", authenticateUser, (req, res) => {
	const tasksToAdd = req.body;
	const username = req.username;
	taskService
		.addTask(tasksToAdd, username)
		.then((addedTask) => res.status(201).send(addedTask))
		.catch((error) => res.status(500).send(error));
});

app.delete("/tasks/:id", authenticateUser, (req, res) => {
	const id = req.params["id"];
	taskService
		.deleteTaskById(id)
		.then((deletedUser) => {
			res.status(204).send(deletedUser);
		})
		.catch((error) => res.status(500).send(error));
});

// adding users to mongo.
app.post("/users", (req, res) => {
	const userToAdd = req.body;
	userService
		.addUser(userToAdd)
		.then((addedUser) => res.status(201).send(addedUser))
		.catch((error) => res.status(500).send(error));
});

//adding schedule plans to mongo. 
app.post("/schedules". (req, res) => {
	const scheduleToAdd = req.body;
	const username = req.username;
	scheduleService
		.addSchedule(scheduleToAdd, username)
		.then((addedSchedule) => res.status(201).send(addedSchedule)
		.catch((error) => res.status(500).send(error))

}); 


//retrieve the entries for each day the user has already
//on the schedule
app.get("/tasks", authenticateUser, (req, res) => {
	const username = req.username;
	console.log("Fetching tasks for user:", username);
	Promise.all([
		taskService.getTasks,
		scheduleService.getSchedule
	])
	.then(([tasks, schedule]) => {
		const taskList = tasks;
		const sortedTasks = listSort(tasks);  

		const schedule_list = schedule;
		
		const groupedTasks = groupTasksByDate(sortedTasks); //creates available hours

		const finalizedSchedule = assembleSchedule(schedule_list, groupedTasks)


		res.send(finalizedSchedule);

		
	})
	.catch((error) => {
		console.error("Error fetching tasks or schedule:", error);
		res.status(500).send(error);
	})
})