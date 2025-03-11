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

export function ScheduleForm(props) { 
    const [schedule, setSchedule] = useState({
        task: "",
        time: "",
        start: "",
        due: ""
    });

	function handleChange(event) {
		const { name, value } = event.target; 
	
		switch (name) {
			case "time":
				setSchedule({ ...schedule, time: value }); 
				break;
			case "task":
				setSchedule({ ...schedule, task: value }); 
				break;
			case "start":
				setSchedule({ ...schedule, start: value }); 
				break;
			case "due":
				setSchedule({ ...schedule, due: value });   
				break;
		}
	}

    function submitForm() {
        const taskWithDate = {
            ...schedule,
            date: props.date
        };
        props.handleSubmit(taskWithDate);
        setSchedule({ time: "", task: "", start: "", due: "" });
    }

    return (
        <form className="fancy-form">
            <label htmlFor="time">Time</label>
            <input
                type="text"
                name="time"
                id="time"
                value={schedule.time}
                onChange={handleChange}
            />
            <label htmlFor="task">Task</label>
            <input
                type="text"
                name="task"
                id="task"
                value={schedule.task}
                onChange={handleChange}
            />
            <label htmlFor="start">Start</label> 
            <input
                type="text"
                name="start"
                id="start"
                value={schedule.start}
                onChange={handleChange}
            />
            <label htmlFor="due">Due</label> 
            <input
                type="text"
                name="due"
                id="due"
                value={schedule.due}
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