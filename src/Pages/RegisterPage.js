import React, { useRef, useState, useEffect } from 'react';
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useHistory } from 'react-router-dom';

export default function RegisterPage() {

    const [data, setData] = useState({
        name: "",
        emailid: "",
        password: ""
    });
    const emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    const image = "https://firebasestorage.googleapis.com/v0/b/web-archi-project-768be.appspot.com/o/image%2Fpng%2F1649756656785-userImage.png?alt=media&token=7ce97c50-1306-4a0d-8b90-525ae5e906d9";
    const [queryResult, setqueryResult] = useState("");
    const [errors, setErrors] = useState({
        emailid: "",
        password: "",
    })
    const { name, emailid, password } = data;
    const history = useHistory();

    async function validate() {
        let temp = {}
        temp.emailid = emailPattern.test(data.emailid) ? "" : "Enter valid email id."
        temp.password = data.password.length > 7 ? "" : "Minimum 8 characters are required";

        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === ""); 
    }

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }


    async function handleSubmit(e) {
        const user = { emailid, name, password, image };
        setqueryResult("");
        let validation = await validate();
        if (validation === true) {
            fetch("/user/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
                credentials: "include"
            }).then(res => res.json())
                .then((result) => {
                    if (result.resultCode === 0) {
                        setqueryResult(result.resultInLng);
                    }
                    else {
                        history.push("/projects");
                    }
                });
        }  
    }

    return (
        <div className='bg-light vh-100'>
            <Grid>
                <Paper elevation={20} style={{ backgroundColor: "white", padding: '30px 20px', width: 500, margin: '20px auto' }}>
                    <Grid align="center">
                        <Avatar style={{ backgroundColor: '#1565C0' }}>
                            <AccountCircle />
                        </Avatar>
                        <h2>Sign Up</h2>
                        <Typography variant='caption'>Please fill this form to create an account </Typography>
                    </Grid>
                    <form >
                        <TextField required style={{ margin: "10px 0px" }} value={name} onChange={handleChange} fullWidth name='name' label="User Name" type="text" />
                        <TextField required style={{ margin: "10px 0px" }} value={emailid} onChange={handleChange} fullWidth name='emailid' label="Email ID" type="emailid" error={errors.emailid === "" ? false : true} helperText={errors.emailid === "" ? "" : errors.emailid} />
                        <TextField required style={{ margin: "10px 0px" }} value={password} onChange={handleChange} fullWidth name='password' label="Password" type="password" error={errors.password === "" ? false : true} helperText={errors.password === "" ? "" : errors.password} />
                        <Button onClick={() => { handleSubmit() }} style={{ margin: "10px 0px" }} variant='contained'>Sign Up</Button>
                    </form>
                    {queryResult === "" ? null : <Typography variant='caption'>{queryResult}</Typography>}

                </Paper>
            </Grid>
        </div>

    )
}
