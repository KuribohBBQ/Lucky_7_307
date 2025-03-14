import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
	{
		time: {
			type: String,
			required: true,
			trim: true
		},
		task: {
			type: String,
			required: true,
			trim: true
		},
		date: {
			type: String,
			required: true,
			trim: true
		},
		username: {
			type: String,
			required: true,
			trim: true
		}
	},
	{ collection: "tasks_list" }
);

// Create the Task model
const taskModel = mongoose.model("taskModel", TaskSchema);

export default taskModel;
