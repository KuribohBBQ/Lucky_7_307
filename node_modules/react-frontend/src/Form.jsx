// src/Form.jsx
import React, { useState } from "react";
import './Form.css';

function Form(props) {
    const [person, setPerson] = useState({
        time: "",
        task: "",
        date: ""
    });
    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "task")
            setPerson({ time: person["time"], task: value });
        else setPerson({ time: value, task: person["task"] });
    }

	function submitForm() {
		const taskWithDate = {
			...person,
			date: props.date
		};
		props.handleSubmit(taskWithDate);
		setPerson({ time: "", task: "", date: "" });
	}

    return (
        <form className="fancy-form">
            <label htmlFor="time">Time</label>
            <input
                type="text"
                name="time"
                id="time"
                value={person.time}
                onChange={handleChange}
            />
            <label htmlFor="task">Task</label>
            <input
                type="text"
                name="task"
                id="task"
                value={person.task}
                onChange={handleChange}
            />
            <input
                type="button"
                value="Add"
                onClick={submitForm}
                className="Submit"
            />
        </form>
    );
}

export default Form;