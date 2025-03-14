import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true
		},
		hashedPassword: {
			type: String,
			required: true,
			trim: true
		}
	},
	{ collection: "auth_list" }
);

// Create the Task model
const authModel = mongoose.model("authModel", authSchema);

export default authModel;
