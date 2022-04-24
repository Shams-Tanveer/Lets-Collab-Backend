import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ToDoList from '../Components/ToDoList';
import ToReview from '../Components/ToReview';
import { useDispatch } from 'react-redux';
import { setTask } from '../Actions/taskAction';
import { useHistory } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import InProgress from '../Components/InProgress';
import Done from '../Components/Done';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Dialog, DialogContent } from '@mui/material';
import ManagMember from '../Components/ManagMember';


export default function () {
    const dispatch = useDispatch();
    const toDoTask = useSelector((state) => state.list.toDoTask);
    const inProgressTask = useSelector((state) => state.list.inProgressTask);
    const toReviewTask = useSelector((state) => state.list.toReviewTask);
    const doneTask = useSelector((state) => state.list.doneTask);
    const history = useHistory();
    const [projectName, setProjectName] = useState("");
    const [ignore, setignore] = useState(true);
    const [createBtn, setcreateBtn] = useState(false);

    const handleDnD = (result) => {
        const { destination, source, draggableID } = result;
        if (result.destination.droppableId !== "2" && result.source.droppableId === "1") {
            notify("Task can be moved to progress only");
        }
        else if (result.destination.droppableId === "1") {
            notify("Task can not be to moved to TODO List");
        }
        else {
            moveTask(result.source.droppableId, result.destination.droppableId, result.draggableId);
        }
        
    }

    async function moveTask(source, destination, taskID) {
        const movedTaskInfo = { source, destination, taskID };
        fetch("/task/movetask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(movedTaskInfo),
            credentials: "include"
        }).then(res => res.json())
            .then((result) => {
                if (result.resultCode === 1) {
                    setignore(!ignore);
                }
                else {
                    notify(result.resultInMsg);
                    setignore(!ignore);
                }
            });
    }

    const notify = (message) => {
        
        toast.warn(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
        });
    }

    async function handleComplete() {
        fetch("/project/completeProject", {
            credentials: "include"
        }).then(res => res.json())
            .then((result) => {
                if(result.resultCode === 0)
                {
                    notify(result.resultInLng)
                }
                else
                {
                    history.push("/projects");
                }
            })
    }

    async function getTaskList() {
        fetch("/task/groupTask", {
            credentials: "include"
        })
            .then(res => res.json())
            .then((sendResult) => {
                setProjectName(sendResult.projectName)
                let result = sendResult.taskList;
                let list1 = [];
                let list2 = [];
                let list3 = [];
                let list4 = [];
                let newList;
                for (let i = 0; i < result.length; i++) {
                    newList = {
                        id: result[i].id,
                        text: result[i].name,
                        completedSubTask: result[i].completedsubtask,
                        totalSubTask: result[i].totalsubtask === 1 ? result[i].totalsubtask : result[i].totalsubtask - 1
                    }
                    if (result[i].type === "todo") {
                        list1 = [...list1, newList]
                    }
                    else if (result[i].type === "inprogress") {
                        list2 = [...list2, newList]
                    }
                    else if (result[i].type === "review") {
                        list3 = [...list3, newList]
                    }
                    else {
                        list4 = [...list4, newList]
                    }
                }
                dispatch(setTask(list1, list2, list3, list4));

            }).catch((error) => {
                history.push("/projects")
            })
    }
    useEffect(() => {
        if (ignore) {
            getTaskList();
            setignore(!ignore)
        }

    }, [ignore])

    return (
        <>
            {
                createBtn ? <Dialog open={createBtn}><DialogContent><ManagMember setCloseBtn={setcreateBtn} /></DialogContent></Dialog> : null
            }
            <DragDropContext onDragEnd={handleDnD}>
                <div style={{ margin: "10px 10px 10px 15px" }}>
                    <div className='d-flex flex-row justify-content-between'>
                        <h2 style={{ marginBottom: "20px" }}>{projectName}</h2>
                        <div style={{ marginRight: "10px" }}>
                            <Button variant='contained' style={{ marginRight: "20px" }} onClick={() => { setcreateBtn(true) }}>Manage Member</Button>
                            <Button variant='contained' onClick={() => { handleComplete() }}>Complete</Button>
                        </div>
                    </div>
                    <div style={styles.listContainer}>

                        <>
                            <ToDoList tasks={toDoTask} setignore={setignore} notify={notify} />
                            <InProgress tasks={inProgressTask} setignore={setignore}/>
                            <ToReview tasks={toReviewTask} setignore={setignore}/>
                            <Done tasks={doneTask} setignore={setignore}/>
                            <ToastContainer
                                position="top-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            />
                        </>

                    </div>
                </div>
            </DragDropContext>
        </>
    )
}
const styles = {
    listContainer: {
        display: "flex",
        flexDirection: "row",
    }
}