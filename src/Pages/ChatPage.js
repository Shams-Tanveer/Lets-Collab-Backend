import React, { useEffect, useState } from 'react';
import { Grid, Paper} from '@mui/material';
import ShowMsg from '../Components/ShowMsg';
import MsgInput from '../Components/MsgInput';
import { db, storage } from "../FireBase/firebase";
import { collection, query, where, onSnapshot, addDoc, Timestamp, orderBy } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { useHistory } from 'react-router-dom';

export default function ChatPage() {

    const [text, setText] = useState('');
    const [media, setMedia] = useState("");
    const [msges, setMsges] = useState([]);
    const [isMediaSelected, setIsMediaSelected] = useState(false);
    const [userID, setuserID] = useState("");
    const [projectID, setprojectID] = useState('');
    const [username, setusername] = useState("");
    const [projectName, setprojectName] = useState("");
    const history = useHistory();

    async function handleSend(e) {
        e.preventDefault();
        let url;
        let mediaType;

        if (media) {
            const mediaRef = ref(
                storage,
                `${media.type}/${new Date().getTime()}-${media.name}`
            );

            mediaType = media.type;
            const snap = await uploadBytes(mediaRef, media);
            const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
            url = dlUrl;
        }

        await addDoc(collection(db, "projectChat"), {
            id: projectID,
            message: text,
            msgFrom: userID,
            senderName:  username,
            createdAt: Timestamp.fromDate(new Date()),
            media: url || "",
            mediaFile: mediaType || ""
        });

        setText("");
        setMedia("");
        setIsMediaSelected(false);

    }


    async function getCurUserInfo() {
        fetch("/project/chat", {
            credentials: "include"
        })
            .then(res => res.json())
            .then((result) => {
                setuserID(result.userID);
                setprojectID(result.projectID);
                setusername(result.userName);
                setprojectName(result.projectName);
                getMessage(result.userID, result.projectID)
            }).catch((error) => {
                history.push("/projects")
            });
    }

    function getMessage(curUserID, curProjectID) {
        const msgRef = collection(db, "projectChat");
        const q = query(msgRef, orderBy('createdAt', 'asc'), where('id', '==', curProjectID));
        onSnapshot(q, querySnapShot => {
            let msgs = [];
            querySnapShot.forEach(doc => {
                const chatData = doc.data();
                if (doc.data().msgFrom === curUserID) {
                    chatData.msgFrom = "own";
                }
                else {
                    chatData.msgFrom = "other";
                }
                msgs.push(chatData);
            });
            setMsges(msgs);
        });
    }
    useEffect(() => {
        getCurUserInfo();
    }, [])

    return (
        <>
            <Paper elevation={20} style={{ padding: '10px 20px', width: "80%", margin: '20px auto' }}>
                <Grid container direction="column">
                    <Grid item xs={12} style={{ marginTop: '20px', overflow: "auto" }}>
                        <>
                            <h3 style={styles.msgHeader}>{projectName}</h3>
                            <div style={styles.msgContainer}>
                                {msges.length !== 0 ?
                                    msges.map((msg, index) =>
                                        <ShowMsg key={index} msg={msg} />
                                    )
                                    : <p>Start Conversation</p>}
                            </div>
                        </>
                    </Grid>
                    <Grid>
                        <MsgInput
                            handleSend={handleSend}
                            text={text}
                            setText={setText}
                            setMedia={setMedia}
                            isMediaSelected={isMediaSelected}
                            setIsMediaSelected={setIsMediaSelected}
                        />
                    </Grid>
                </Grid>
            </Paper >

        </>

    )
}


const styles = {
    msgContainer: {
        height: "calc(100vh - 250px)",
        overflowY: "auto",
    },
    msgHeader: {
        padding: "5px",
        textAlign: "center",
        borderBottom: "2px solid #023c7e"
    }
};