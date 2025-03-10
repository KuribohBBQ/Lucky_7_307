import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import HorizontalCalendar from "./Calendar";
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate
} from "react-router-dom";
import Login from "./Login.jsx";

function ToDoPage({ goToTaskPage, savedToken, loginState }) {
	const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString());

	const [tasksByDay, setTasksByDay] = useState([]);

	const INVALID_TOKEN = "INVALID_TOKEN";
	const [token, setToken] = useState(INVALID_TOKEN);
	const [message, setMessage] = useState("");
	// loginState is passed in from myApp when we're coming from taskPage
	const [isLoggedIn, setIsLoggedIn] = useState(loginState); 

	const formatCurrentMonth = (date) => {
		const dateParts = date.split('/');
		if (dateParts.length !== 3) {
		  return "Invalid date format";
		}
	  
		const day = parseInt(dateParts[1], 10);
		const month = parseInt(dateParts[0], 10) - 1; // Month is now at index 1
		const year = parseInt(dateParts[2], 10);
	  
		const dateObject = new Date(year, month, day);
		const longMonth = dateObject.toLocaleDateString(undefined, { month: 'long' });
		return longMonth;
	};

	function postTask(task) {
		const promise = fetch("Http://localhost:8000/tasks", {
			method: "POST",
			headers: addAuthHeader({
				"Content-Type": "application/json"
			}),
			body: JSON.stringify(task)
		});

		return promise;
	}

	function deleteTask(task) {
		const promise = fetch(
			"Http://localhost:8000/tasks/" + task._id,
			{
				method: "DELETE",
				headers: addAuthHeader({
					"Content-Type": "application/json"
				}),
				body: JSON.stringify(task)
			}
		);

		return promise;
	}

	function removeOneCharacter(index) {
		const task = tasksByDay[index];
		const updated = tasksByDay.filter((task, i) => {
			return i !== index;
		});
		deleteTask(task)
			.then((res) => {
				if (res.status === 204) setTasksByDay(updated);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function filterTasksByDate(taskList, targetDate) {
		console.log("this is the targetDate", targetDate);
		const filteredTasks = taskList.tasks_list.filter(
			(task) => task.date === targetDate
		);
		return filteredTasks;
	}

	function updateTasks(task) {
		console.log("this is task in update", task);
		postTask(task)
			.then((res) => {
				if (res.status === 201) return res.json();
			})
			.then((json) => {
				setTasksByDay([...tasksByDay, json]);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function fetchTasks() {
		const promise = fetch("http://localhost:8000/tasks", {
			headers: addAuthHeader()
		});

		return promise;
	}

	const handleDateSelection = (date) => {
		// this sets it to mm/dd/yyyy format
		const dateString = date.toLocaleDateString();
		console.log("this is the date: ", dateString)
		setSelectedDate(dateString);
		fetchTasks()
			.then((res) =>
				res.status === 200 ? res.json() : undefined
			)
			.then((json) => {
				if (json) {
					setTasksByDay(
						filterTasksByDate(json, dateString)
					);
				} else {
					setTasksByDay([]);
				}
			});
		console.log("this is the tasks", tasksByDay);
		console.log("this is the date", selectedDate);
	};

	useEffect(() => {
		console.log("useEffect is running. savedToken:", savedToken, "Current token:", token);
		console.log("loginstate: ", loginState);
		if (savedToken !== null) {
			console.log("inside the if statement!");
			setToken(savedToken);
		} 
		fetchTasks()
			.then((res) =>
				res.status === 200 ? res.json() : undefined
			)
			.then((json) => {
				if (json) {
					setTasksByDay(
						filterTasksByDate(
							json,
							selectedDate
						)
					);
				} else {
					setTasksByDay([]);
				}
			});
	}, [token]);

	// auth stuff
	function loginUser(creds) {
		const promise = fetch(`http://localhost:8000/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(creds)
		})
			.then((response) => {
				if (response.status === 200) {
					response
						.json()
						.then((payload) => setToken(payload.token));
					setMessage(`Login successful; auth token saved`);
					setIsLoggedIn(true);
					console.log("Loggedin. Current token:", token);
				} else {
					setMessage(
						`Login Error ${response.status}: ${response.data}`
					);
					setIsLoggedIn(false);
					throw error;
				}
			})
			.catch((error) => {
				setMessage(`Login Error: ${error}`);
				throw error;
			});

		return promise;
	}

	function signupUser(creds) {
		const promise = fetch(`http://localhost:8000/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(creds)
		})
			.then((response) => {
				if (response.status === 201) {
					response
						.json()
						.then((payload) => setToken(payload.token));
					setIsLoggedIn(true);
					setMessage(
						`Signup successful for user: ${creds.username}; auth token saved`
					);
				} else {
					setMessage(
						`Signup Error ${response.status}: ${response.data}`
					);
					setIsLoggedIn(false);
				}
			})
			.catch((error) => {
				setMessage(`Signup Error: ${error}`);
			});

		return promise;
	}

	function addAuthHeader(otherHeaders = {}) {
		console.log("addAuthHeader is called. Current token:", token);
		if (token === INVALID_TOKEN) {
			return otherHeaders;
		} else {
			return {
				...otherHeaders,
				Authorization: `Bearer ${token}`
			};
		}
	}

	return (
		<BrowserRouter>
			<Routes>
				{/* Login Route */}
				<Route
					path="/login"
					element={
						<Login
							handleSubmit={loginUser}
							message={message}
						/>
					}
				/>

				{/* Main Content Route */}
				<Route
					path="/"
					// if not logged in, move straight to login page.
					element={
						isLoggedIn ? (
							<div className="container">
								<h1 style={{ textAlign: "center", marginTop: "10rem", color: "white" }}>
									{formatCurrentMonth(selectedDate)}
								</h1>
								<HorizontalCalendar
									onDateSelect={handleDateSelection}
								/>
								<h1 style={{color: "white"}}>Daily Planner</h1>
								<Table
									characterData={tasksByDay}
									removeCharacter={
										removeOneCharacter
									}
									style={{ marginBottom: "20px" }}
								/>
								<Form
									handleSubmit={updateTasks}
									date={selectedDate}
								/>
								<ul>
									<li
										onClick={() => goToTaskPage(token)} // Navigate to task page
										style={{
											cursor: "pointer",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											width: "50px",
											height: "50px",
											borderRadius: "50%",
											background: "#9979b8",
											position: "fixed", 
        									bottom: "20px", 
        									right: "20px",
										}}
									>
										<img
											className="Tableicon"
											src="src/assets/table.svg"
											alt="Table"
										></img>
									</li>
								</ul>
							</div>
						) : (
							<Navigate to="/login" replace />
						)
					}
				/>

				<Route
					path="/signup"
					element={
						<Login
							handleSubmit={signupUser}
							buttonLabel="Sign Up"
							buttonLabel2="Log In"
						/>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}
export default ToDoPage;
