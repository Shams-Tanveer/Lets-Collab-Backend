import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import AddTask from "./AddTask";
import { Dialog, DialogContent } from "@mui/material";


export default function ToDoList({ tasks, setignore ,notify}) {

    const [formOpen, setformOpen] = useState(false);

    async function checkRole() {
        fetch("/user/getRole", {
            method: "POST",
            mode: "no-cors",
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
            credentials: "include"
        }).then(res => res.json())
            .then((result) => {
                if (result.resultCode === 0) {
                    notify(result.resultInLng)
                }
                else {
                    setformOpen(true);
                }
            });
    }

    function openForm() {
        checkRole();
    }

    async function addTask(name, assignedTo, completeIn) {
        const task = { name, assignedTo, completeIn }
        fetch("/task/addTask", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(task),
            credentials: "include"
        }).then((res) => {
            setignore(true);
        });
    }

    return (
        <Droppable droppableId="1">
            {
                (provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} style={styles.container}>
                        <h4>To Do</h4>
                        {tasks.map((task, taskIndex) => (
                            <Task key={task.id} taskIndex={taskIndex} task={task} colName="1" setignore={setignore}/>
                        ))}
                        <div onClick={openForm} style={styles.buttonStyle}>
                            <AddIcon />
                            <p style={{ marginTop: 15, marginLeft: 8 }}> Add another task</p>
                        </div>
                        {
                            <Dialog open={formOpen}><DialogContent><AddTask setformOpen={setformOpen} addTask={addTask} /></DialogContent></Dialog>
                        }
                        {provided.placeholder}
                    </div>
                )
            }
        </Droppable>
    )
}


const styles = {
    container: {
        backgroundColor: "#dfe3e6",
        borderRadius: 3,
        width: window.innerWidth / 3,
        padding: 8,
        heigth: "100%",
        marginRight: 8,
        overflowY: "scroll",
        maxHeight: "79vh"
    },
    buttonStyle: {
        opacity: 1,
        color: "black",
        backgroundColor: "inherit",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 3,
        height: 36,
        width: 272,
        paddingLeft: 10
    },
    textArea: {
        resize: "none",
        width: "100%",
        outline: "none",
        overflow: "hidden",
        border: "none"
    },
    cardContainer: {
        minHeight: 80,
        minWidth: 272,
        padding: "8px 8px 2px"
    },
    buttonContainer: {
        marginTop: 8,
        display: "flex",
        alignItems: "center",

    }
};