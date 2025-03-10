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
import React, { useState } from "react";
import TaskTable from "./TaskTable";
import Form from "./Form";

function TaskPage({ goToToDoPage, token  }) {
	// this is the token that we use to authenticate. Use to access mongo.
	console.log("this is the token:", token);

	const [characters, setCharacters] = useState([]);
	
  //ask about which one to use
  function removeOneCharacter(index) {
		const updated = characters.filter((character, i) => {
			return i !== index;
		});
    const id = characters[index]._id
    const promise = fetch("http://localhost:8000/tasks" + id {
      method: "DELETE"
    })
    return promise.then (
      (res) => {
        if (res.status == 204)
          setCharacters(updated);
      }
    )
	}
// ask about which one to use. 
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

  //function updateList is suppsoed to take in task and add it to table
  function updateList(person) {
    postScheduleEvent(event)
      .then((v) => setCharacters([...characters, v]))
      .catch((error) => {
        console.log(error);
      });
  }
  
  
  //supposed to handle the fetch part of the code
	function fetchTasks() {
		const promise = fetch("http://localhost:8000/tasks", {
			headers: addAuthHeader()
		});

		return promise;
	}

  function postScheduleEvent(task) {
		const promise = fetch("Http://localhost:8000/tasks", {
			method: "POST",
			headers: addAuthHeader({
				"Content-Type": "application/json"
			}),
			body: JSON.stringify(task)
		});

		return promise;
	}





	return (
		<div className="container">
			<h1 style={{color: "white"}}>Please Enter Tasks</h1>
			<TaskTable
				characterData={characters}
				removeCharacter={removeOneCharacter}
			/>
			<Form handleSubmit={updateList} />
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