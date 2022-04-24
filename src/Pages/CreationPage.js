import React, { useState, useEffect } from 'react';
import { Paper, Grid, Button, Dialog, DialogContent } from '@mui/material';
import CreateProject from '../Components/CreateProject';
import { useHistory } from 'react-router-dom';


export default function CreationPage() {

    const [projectList, setProjectList] = useState([]);
    const [createBtn, setCreateBtn] = useState(false);
    const history = useHistory();

    async function handleCreate(projectName, projectAdmin) {

        const project = { projectName, projectAdmin }
        fetch("/project/newProject", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(project),
            credentials: "include"
        }).then((res) => {
        });
    }

    async function handleMember(memberID) {
        const memberInfo = { memberID };
        fetch("/project/newProjectMember", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(memberInfo),
            credentials: "include"
        }).then(() => {
        });
    }

    async function getProjectList() {
        fetch("/project/getProject", {
            credentials: "include"
        })
            .then(res => res.json())
            .then((result) => {
                setProjectList(result);
            }).catch((error) => {
                history.push("/login")
            });
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    async function handleSelectProject(projectID) {
        fetch("/project/selectProject", {
            method: "POST",
            mode: "no-cors",
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(projectID),
            credentials: "include"
        }).then(() => {
            history.push("/grouptask");
        });
    }

    useEffect(() => {
        getProjectList();
    }, [createBtn])

    return (
        <>
            {
                createBtn ? <Dialog open={createBtn}><DialogContent><CreateProject setCloseBtn={setCreateBtn} handleCreate={handleCreate} handleMember={handleMember} /></DialogContent></Dialog> : null
            }
            <Grid >
                <Paper elevation={20} style={{ padding: '30px 20px', width: 800, margin: '20px auto' }}>
                    <div>
                        <Grid className='d-flex flex-row justify-content-between' >
                            <h3 style={{ margin: "20px 55px" }}>Your Current Projects</h3>
                            <Button onClick={() => { setCreateBtn(true) }} style={{ margin: "20px 55px 10px 0px", width: "200px", height: "50px", fontSize: '15pt' }} variant='contained'>Add Project</Button>
                        </Grid>
                        <div style={{ margin: "auto", overflowY: "scroll", height: "475px", width: '650px' }}>

                            {
                                projectList.map(project =>
                                (
                                    <>
                                        <div key={project.id} onClick={() => handleSelectProject(project.id)} className='card' style={{ margin: "10px 15px 0px 0px", background: `${getRandomColor()}`, cursor: "pointer" }}>
                                            <div className='card-body d-flex flex-row justify-content-between'>
                                                <h5 style={{ color: "white" }}>{project.projectName}</h5>
                                            </div>
                                        </div>
                                    </>
                                ))
                            }
                        </div>

                    </div >
                </Paper>

            </Grid>

        </>
    )
}
