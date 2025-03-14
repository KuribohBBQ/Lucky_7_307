import React, { useState } from "react";
import TaskTable from "./TaskTable";
import Form from "./Form";

function TaskPage({ goToToDoPage, token  }) {
	// this is the token that we use to authenticate. Use to access mongo.
	console.log("this is the token:", token);

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
