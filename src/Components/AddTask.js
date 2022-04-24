import React, { useState, useEffect } from 'react';
import { Button,  FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Cancel } from '@mui/icons-material';

export default function AddTask({setformOpen,addTask}) {
    const [data, setData] = useState({
        email: "",
        task: "",
        week: ""
    });
    const [memberList, setMemberList] = useState([]);
    const { email, task, week } = data;

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    function handleCreateProject() {
        addTask(task,email,week);
        setformOpen(false);
        setData({ email: "", task: "", week: "" });
    }

    

    async function getMembers() {
        fetch("/project/getMembers",{
            credentials: 'include'
        })
            .then(res => res.json())
            .then((result) => {
                setMemberList(result);
            })
    }

    useEffect(() => {
        getMembers();
    }, [])


    return (
        <div>
            <Grid className='d-flex flex-row justify-content-between' >
                <h2 style={{ margin: "10px 10px 10px 10px" }}>Add Task</h2>
                <Cancel onClick={() => { setformOpen(false) }} style={{ margin: "10px 10px 10px 10px" }} />
            </Grid>

            <div className='d-flex flex-column align-items-center' >
                <div>
                    <TextField required style={{ margin: "10px 10px 30px 10px" ,width:"460px"}} value={task} onChange={handleChange} fullWidth name='task' label="Task Name" type="text" />
                </div>
                <div style={{ margin: "10px 10px 10px 10px" }} className='d-flex flex-row align-items-center'>
                    <FormControl>
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
                    <FormControl style={{ marginLeft: "10px" }}>
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
                <Button onClick={handleCreateProject} style={{ margin: "20px 0px", width: "200px", height: "50px" }} variant='contained'>Add Task</Button>
            </div>


        </div>
    )
}
