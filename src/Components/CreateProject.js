import React, { useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, Grid, Paper, TextField } from '@mui/material';
import { Cancel} from '@mui/icons-material';

import ManagMember from './ManagMember';


export default function CreateProject({ setCloseBtn, handleCreate, handleMember }) {
    const [data, setData] = useState({
        email: "",
        project: "",
    });

    const [checked, setChecked] = useState(false);
    const [createdBtn, setcreatedBtn] = useState(false);
    const { email, project } = data;

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    function handleCheckBox() {
        setChecked(!checked);
    }

    function handleCreateProject() {
        setcreatedBtn(!createdBtn);
        if (checked) {
            handleCreate(project, "You are the admin");
        }
        else {
            handleCreate(project, email);
        }
        setData({ [email]: "", [project]: "" });
    }
    return (
        <div>
            <Grid className='d-flex flex-row justify-content-between' >
                <h2 style={{ margin: "0px 0px 0px 20px" }}>Create Project</h2>
                <Cancel onClick={() => { setCloseBtn(false) }} style={{ margin: "0px 20px 0px 0px" }} />
            </Grid>
            {
                !createdBtn ?
                    <div className='d-flex flex-column align-items-center' >
                        <div>
                            <TextField required style={{ margin: "10px 10px 10px 0px" }} value={project} onChange={handleChange} fullWidth name='project' label="Project Name" type="text" />
                            <FormControlLabel control={<Checkbox checked={checked} onChange={handleCheckBox} />} label="Are You the Master of the Project" />
                        </div>
                        {
                            !checked ?
                                <div >
                                    <TextField required style={{ margin: "10px 10px 10px 10px", width: '520px' }} value={email} onChange={handleChange} fullWidth name='email' label="Master Email" type="email" />

                                </div>
                                :
                                null
                        }
                        <Button onClick={handleCreateProject} style={{ margin: "20px 0px", width: "200px", height: "50px" }} variant='contained'>Create Project</Button>
                    </div>
                    : null

            }
            {
                createdBtn ?
                    <ManagMember setCloseBtn={setCloseBtn}/>
                    : null

            }
        </div>

    )
}
