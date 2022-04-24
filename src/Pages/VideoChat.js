import React, { useEffect,useState } from 'react';
import VideoCall from '../Components/VideoCall';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

export default function VideoChat() {

    const [inCall, setInCall] = useState(false);
    const [token, settoken] = useState("");
    const [code, setcode] = useState("");
    const [cName, setcName] = useState("");
    const history = useHistory();

    async function getTokenFromDB() {
        fetch("/videoChat/getToken", {
            credentials: "include"
        })
            .then(res => res.json())
            .then((result) => {
                setcode(result.resultCode);
                settoken(result.tokenID);
                setcName(result.projectName);
            }).catch((error) => {
                history.push("/projects")
            })
    }

    useEffect(() => {
        getTokenFromDB();
    }, [])

    

    return (
        <div className="App" style={{ height: "90vh"}}>
            {inCall ? (
                <VideoCall setInCall={setInCall} code={code} dbToken={token} cName={cName} />
            ) : (
                <Button
                    style={{marginTop:"200px",marginLeft:"43vw"}}
                    variant="contained"
                    onClick={() => setInCall(true)}
                >
                    Join Meeting
                </Button>
            )}
        </div>
    );
}
