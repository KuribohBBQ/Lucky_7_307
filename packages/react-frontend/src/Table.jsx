import React, { useState } from "react";
import './Table.css';

function TableHeader() {
    return (
        <thead>
            <tr>
                <th>Time</th>
                <th>Task</th>
            </tr>
        </thead>
    );
}

function TableBody(props) {
    const [selectedRow, setSelectedRow] = useState(null);

    console.log("characterData:", props.characterData);

    if (props.characterData === null || props.characterData.length === 0) {
        return (
            <tbody>
                <tr className="no-plan">
                    <td colSpan="3">Nothing planned today</td>
                </tr>
            </tbody>
        );
    }

    const rows = props.characterData.map((row, index) => {
        return (
            <tr
                key={index}
                onClick={() => setSelectedRow(index)}
                className={selectedRow === index ? "selected" : ""}
            >
                <td>{row.time}</td>
                <td>{row.task}</td>
                <td>
                    {selectedRow === index && (
                        <button
                            className="delete-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                props.removeCharacter(index);
                                setSelectedRow(null);
                            }}
                        >
                            Remove
                        </button>
                    )}
                </td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

function Table(props) {
    return (
        <table className="fancy-table">
            <TableHeader />
            <TableBody
                characterData={props.characterData}
                removeCharacter={props.removeCharacter}
            />
        </table>
    );
}

export default Table;