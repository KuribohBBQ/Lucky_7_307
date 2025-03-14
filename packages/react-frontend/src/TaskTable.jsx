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
	if (props.scheduleData === null) {
		return <caption>Data Unavailable</caption>;
	}
	const rows = props.scheduleData.map((row, index) => {
		return (
			<tr key={index}>
				<td>{row.task}</td>
				<td>{row.time}</td>
				<td>{row.start}</td>
				<td>{row.due}</td>
				<td>
					<button
						onClick={() => props.removeEntry(index)}
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
				scheduleData={props.scheduleData}
				removeEntry={props.removeEntry}
			/>
		</table>
	);
}

export default TaskTable;
