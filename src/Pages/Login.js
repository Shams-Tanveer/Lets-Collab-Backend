import React, { useEffect, useState } from 'react';
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useHistory } from 'react-router-dom';

export default function Login() {

    const history = useHistory();
    const [data, setData] = useState({
        emailid: "",
        password: "",
    });
    const { emailid, password } = data;
    const [queryResult, setqueryResult] = useState("");

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const user = { emailid, password };
        setqueryResult("");
        fetch("/user/finduser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
            credentials: "include"
        }).then(res => res.json())
            .then((result) => {

                if (result.resultCode === 0) {
                    setqueryResult(result.resultInLng);
                }
                else if (result.resultCode === 2) {
                    setqueryResult(result.resultInLng);
                }
                else {
                    history.push("/projects")
                }
            })
    }
    
    return (
        <Grid>
            <Paper elevation={20} style={{ padding: '30px 20px', width: 500, margin: '20px auto' }}>

                <Grid align="center">
                    <Avatar style={{ backgroundColor: '#1565C0' }}>
                        <AccountCircle />
                    </Avatar>
                    <h2>Log In</h2>
                    <Typography variant='caption'>Please log into your account </Typography>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField required style={{ margin: "10px 0px" }} value={emailid} onChange={handleChange} fullWidth name='emailid' label="Email ID" type="email" />
                    <TextField required style={{ margin: "10px 0px" }} value={password} onChange={handleChange} fullWidth name='password' label="Password" type="password" />
                    <Button type='submit' style={{ margin: "10px 0px" }} variant='contained'>Sign In</Button>
                </form>
                {queryResult === "" ? null : <Typography variant='caption'>{queryResult}</Typography>}

            </Paper>
        </Grid>
    )
}
