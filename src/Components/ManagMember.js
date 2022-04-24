import React,{useEffect, useState} from 'react';
import { TextField,Button } from '@mui/material';
import { Delete } from '@mui/icons-material';

export default function ManagMember({setCloseBtn}) {

    const [memberList, setMemberList] = useState([]);
    const [email, setemail] = useState("");

    async function getMembers() {
        fetch("/project/getMembers", {
            credentials: 'include'
        })
            .then(res => res.json())
            .then((result) => {
                setMemberList(result);
            })
    }

    async function handleMember(memberID) {
        const memberInfo = { memberID };
        setemail("");
        fetch("/project/newProjectMember", {
            method: "POST",
            headers: {"Content-Type":"application/json" },
            body: JSON.stringify(memberInfo),
            credentials: "include"
        }).then(() => {
        });
    }

    async function handleDeleteMember(memberID) {
        const memberInfo = { memberID };
        fetch("/project/deleteProjectMember", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(memberInfo),
            credentials: "include"
        }).then(() => {
        });
    }

    useEffect(() => {
      getMembers()
    }, [memberList])
    

    return (
        <div>
            <div className='d-flex flex-row align-items-center '>
                <TextField required style={{ margin: "10px 10px 10px 20px", width: "450px" }} value={email} onChange={(e)=>{setemail(e.target.value)}} fullWidth name='email' label="Member's Email" type="email" />
                <Button onClick={()=>{handleMember(email)}} style={{ margin: "10px 0px", height: "54px" }} variant='contained'>Add</Button>
            </div>
            <h3 style={{ margin: "20px 10px 10px 20px", width: "450px" }}>Project Memebers</h3>
            <div style={{ margin: "10px 10px 10px 20px ", overflowY: "scroll", height: "300px", width: '525px' }}>
                <div className='card' style={{ marginRight: "15px" }}>
                    {
                        memberList.map((member, index) =>
                        (
                            <div className='card-body d-flex flex-row justify-content-between'>
                                <h5>{member.userEmail}</h5>
                                <Delete onClick={() => { handleDeleteMember(member.userID) }} style={{cursor:"pointer"}}/>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Button onClick={() => { setCloseBtn(false) }} style={{ margin: "30px 0px 0px 475px", height: "54px" }} variant='contained'>Done</Button>
        </div>
    )
}
