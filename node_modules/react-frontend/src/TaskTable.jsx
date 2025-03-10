import React from "react";
function TableHeader() {
	return (
		<thead>
			<tr>
				<th style={{ color: "white" }}>Task</th>
				<th style={{ color: "white" }}>Time-to-Complete</th>
				<th style={{ color: "white" }}>Start</th>
				<th style={{ color: "white" }}>Due</th>
			</tr>
		</thead>
	);
}

function TableBody(props) {
	if (props.characterData === null) {
		return <caption>Data Unavailable</caption>;
	}
	const rows = props.characterData.map((row, index) => {
		return (
			<tr key={index}>
				<td>{row.task}</td>
				<td>{row.time}</td>
				<td>{row.start}</td>
				<td>{row.due}</td>
				<td>
					<button
						onClick={() => props.removeCharacter(index)}
					>
						Delete
					</button>
				</td>
			</tr>
		);
	});
	return <tbody>{rows}</tbody>;
}

function TaskTable(props) {
	return (
		<table>
			<TableHeader />
			<TableBody
				characterData={props.characterData}
				removeCharacter={props.removeCharacter}
			/>
		</table>
	);
}

export default TaskTable;
