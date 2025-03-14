import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema(
    {
        task: {
            type: String,
            required: true,
            trim: true
        },
        time: {
            type: String,
            required: true,
            trim: true
        },
        start: {
            type: String,
            required: true,
            trim: true
        },
        due: {
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
    { collection: "schedule_list" }
);

// Create the schedule model
const scheduleModel = mongoose.model("scheduleModel", ScheduleSchema);

export default scheduleModel;
