import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";
import ToDoPage from "./ToDoPage";
import TaskPage from "./TaskPage";

function MyApp() {
    const [showPage, setShowPage] = useState("ToDoPage"); // State to toggle between pages

    // Function to navigate to ToDoPage
    const goToToDoPage = () => {
        setShowPage("ToDoPage");
    };

    // Function to navigate to TaskPage
    const goToTaskPage = () => {
        setShowPage("TaskPage");
    };

    return (
        <>
            {showPage === "TaskPage" ? (
                <TaskPage goToToDoPage={goToToDoPage} />
            ) : (
                <ToDoPage goToTaskPage={goToTaskPage} />
            )}
        </>
    );
}

export default MyApp;
