/*import React, { useState } from "react"; 
import TaskTable from "./TaskTable"; 
import Form from "./Form"; 


function TaskPage() { 
    const [characters, setCharacters] = useState([]); 
    function removeOneCharacter(index) { 
      const updated = characters.filter((character, i) => { 
        return i !== index; 
      }); 
      setCharacters(updated); 
    } 
   
    function updateList(person) { 
      setCharacters([...characters, person]); 
    } 
   
    return ( 
      <div className="container"> 
        <h1>Please Enter Tasks</h1>
        <Table  
        characterData={characters}  
        removeCharacter={removeOneCharacter} 
        /> 
        <Form handleSubmit={updateList} /> 
        <ul>
            <li><img class="icon" src="src/assets/home.svg"></img></li></ul>
      </div> 
    ); 
  } 
  export default TaskPage;*/
import React, { useState, useEffect } from "react";
import TaskTable from "./TaskTable";
import { ScheduleForm } from "./Form";

const INVALID_TOKEN = "INVALID_TOKEN";

function TaskPage({ goToToDoPage, token  }) {
	// this is the token that we use to authenticate. Use to access mongo.
	console.log("this is the token:", token);

	const [schedule, setSchedule] = useState([]);

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

	function removeOneEntry(index) {
		const scheduleToRemove = schedule[index];
		const updated = schedule.filter((scheduleToRemove, i) => {
			return i !== index;
		});
		deleteSchedule(scheduleToRemove)
			.then((res) => {
				if (res.status === 204) setSchedule(updated);
			})
			.catch((error) => {
				console.log(error);
			});
	}

// ask about which one to use. 
  function deleteSchedule(scheduleToDelete) {
		const promise = fetch(
			"Http://localhost:8000/schedules/" + scheduleToDelete._id,
			{
				method: "DELETE",
				headers: addAuthHeader({
					"Content-Type": "application/json"
				}),
				body: JSON.stringify(scheduleToDelete)
			}
		);

		return promise;
	}


  
  //supposed to handle the fetch part of the code
	function fetchSchedule() {
		const promise = fetch("http://localhost:8000/schedules", {
			headers: addAuthHeader()
		});

		return promise;
	}

  function postTask() {
		const promise = fetch("http://localhost:8000/tasks/auto", {
			method: "POST",
			headers: addAuthHeader({
				"Content-Type": "application/json"
			})
		});

		return promise;
	}

  function postScheduleEvent(schedule) {
		const promise = fetch("http://localhost:8000/schedules", {
			method: "POST",
			headers: addAuthHeader({
				"Content-Type": "application/json"
			}),
			body: JSON.stringify(schedule)
		});

		return promise;
	}

	function updateSchedule(scheduleToAdd) {
		console.log("this is schedule in update", scheduleToAdd);
		postScheduleEvent(scheduleToAdd)
			.then((res) => {
				if (res.status === 201) return res.json();
			})
			.then((json) => {
				setSchedule([...schedule, json]);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		fetchSchedule()
			.then((res) =>
				res.status === 200 ? res.json() : undefined
			)
			.then((json) => {
				if (json) {
					console.log("this is jason:", json);
					setSchedule(json["schedule_list"]);
					console.log("this is schedule", schedule);
				} else {
					setSchedule([]);
				}
			});
	}, [token]);

	return (
		<div className="container">
			<h1 style={{color: "white"}}>Please Enter Tasks</h1>
			<TaskTable
				scheduleData={schedule}
				removeEntry={removeOneEntry}
			/>
			<ScheduleForm handleSubmit={updateSchedule} postTask={postTask}/>
			<ul>
				<li
					onClick={goToToDoPage} // Navigate to task page
					style={{
						cursor: "pointer",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						width: "50px",
						height: "50px",
						borderRadius: "60%",
						background: "#9979b8",
						border: "2px solid #000000",
					}}>
					<img className="icon" 
					src="src/assets/home.svg"
					alt="Home"
					/>
				</li>
			</ul>
		</div>
	);
}
export default TaskPage;