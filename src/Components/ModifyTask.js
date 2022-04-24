import React, { useState, useEffect } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Cancel } from '@mui/icons-material';


export default function ModifyTask({ setOpenForm, taskID, setignore }) {
    const [data, setData] = useState({
        email: '',
        task: "",
        week: ""
    });
    const [memberList, setMemberList] = useState([]);
    const [resultCode, setresultCode] = useState("");
    const [resultInLng, setresultInLng] = useState("");

    const { email, task, week } = data;

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    function handleUpdateProject() {
        let name = data.task;
        let assignedTo = email;
        let completeIn = week;
        let id = taskID;
        const taskInfo = { id, name, assignedTo, completeIn };
        fetch("/task//updateTask", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(taskInfo),
            credentials: "include"
        }).then((res) => {
            setOpenForm(false);
            setignore(true);
        });
        setData({ email: "", task: "", week: "" });
    }

    async function checkRole() {
        fetch("/user/getRole", {
            method: "POST",
            mode: "no-cors",
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
            credentials: "include"
        }).then(res => res.json())
            .then((result) => {
                setresultCode(result.resultCode);
                setresultInLng(result.resultInLng);
            });
    }

    async function getSpecificTask() {
        fetch("/task/specificTask", {
            credentials: "include"
        })
            .then(res => res.json())
            .then((result) => {
                result.members.map(re => {
                    setMemberList(result.members);
                    setData({ email: result.task.assignedTo, task: result.task.name, week: result.task.completeIn })
                })
            })
    }

    async function handleDelete() {
        fetch("/task/deleteTask", {
            credentials: "include"
        }).then(() => {
            setOpenForm(false);
            setignore(true);
        })
    }

    useEffect(() => {
        getSpecificTask();
        checkRole();
    }, [])
    return (
        <div>
            <Grid style={{ display: "flex", marginRight: "10px", justifyContent: "flex-end" }} >
                <Cancel onClick={() => { setOpenForm(false) }} style={{ margin: "10px 10px 10px 10px" }} />
            </Grid>

            <div className='d-flex flex-column align-items-center' >
                <div>
                    <TextField disabled={resultCode === 0 ? true : false} required style={{ margin: "10px 10px 30px 10px", width: "460px" }} value={task} onChange={handleChange} fullWidth name='task' label="Task Name" type="text" />
                </div>
                <div style={{ margin: "10px 10px 10px 10px" }} className='d-flex flex-row align-items-center'>
                    <FormControl  disabled={resultCode === 0 ? true : false}>
                        <InputLabel id="memberOption">Assign To</InputLabel>
                        <Select
                            labelId='memberOption'
                            value={email}
                            name="email"
                            onChange={handleChange}
                            style={{ width: "225px" }}
                        >
                            {
                                memberList.map((member, index) =>
                                (
                                    <MenuItem key={member.userID} value={member.userID}>{member.userEmail}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <FormControl style={{ marginLeft: "10px" }}  disabled={resultCode === 0 ? true : false}>
                        <InputLabel id="weekOption">Complete In</InputLabel>
                        <Select
                            labelId='weekOption'
                            value={week}
                            name="week"
                            onChange={handleChange}
                            style={{ width: "225px" }}
                        >
                            <MenuItem value={1}>One Week</MenuItem>
                            <MenuItem value={2}>Two Week</MenuItem>
                            <MenuItem value={3}>Three Week</MenuItem>
                            <MenuItem value={4}>Four Week</MenuItem>
                            <MenuItem value={5}>Five Week</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                {
                    resultCode === 0 ? null :
                    <div className='d-flex flex-row justify-content-between'>
                        <Button onClick={handleUpdateProject} style={{ margin: "10px 265px 10px 0px", width: "100px", height: "50px" }} variant='contained'>UPDATE</Button>
                        <Button onClick={handleDelete} style={{ margin: "10px 0px", width: "100px", height: "50px" }} color="error" variant='contained'>DELETE</Button>
                    </div>
                }
            </div>
        </div>
    )
}
