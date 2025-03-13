import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";
import ToDoPage from "./ToDoPage";
import TaskPage from "./TaskPage";

function MyApp() {
    const [showPage, setShowPage] = useState("ToDoPage"); // State to toggle between pages
    const [taskPageToken, setTaskPageToken] = useState(null);
    const [loginState, setLoginState] = useState(false);


    // Function to navigate to ToDoPage
    const goToToDoPage = () => {
        setShowPage("ToDoPage");
    };

    // Function to navigate to TaskPage
    const goToTaskPage = (token) => {
        setTaskPageToken(token);
        setLoginState(true);
        setShowPage("TaskPage");
    };

    return (
        <>
            {showPage === "TaskPage" ? (
                <TaskPage goToToDoPage={goToToDoPage} token={taskPageToken}/>
            ) : (
                <ToDoPage goToTaskPage={goToTaskPage} savedToken={taskPageToken} loginState={loginState}/>
            )}
        </>
    );
}

export default MyApp;
