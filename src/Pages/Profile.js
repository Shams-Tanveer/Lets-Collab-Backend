import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, CardMedia, Grid, CardContent, CardActions, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useHistory } from 'react-router-dom';
import { storage } from "../FireBase/firebase";
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';


export default function Profile() {
    const [img, setImg] = useState("");
    const [user, setUser] = useState({
        id: "",
        name: "",
        emailid: "",
        image: ""
    });

    const { id,name, emailid, image } = user;
    const [isDeleted, setIsDeleted] = useState(false);
    const hiddenFileInput = useRef(null);
    const [open, setopen] = useState(false);
    const [message, setmessage] = useState("");
    const [update, setupdate] = useState(false);
    const history = useHistory();
    const [changed, setchanged] = useState(true);
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/web-archi-project-768be.appspot.com/o/image%2Fpng%2F1649756656785-userImage.png?alt=media&token=7ce97c50-1306-4a0d-8b90-525ae5e906d9";

    function handleClickUpdate(e) {

        hiddenFileInput.current.click();
    }

    function handleChange(e) {
        setImg(e.target.files[0]);
        setupdate(true);
        setmessage("Sure to Update ?");
        setopen(true);

    }
    function handleClickDelete(e) {
        setmessage("Sure to Delete ?")
        setIsDeleted(true);
        setopen(true);
    }

    function handleConfirm() {
        setopen(false);
        if (isDeleted) {
            updateUser(defaultImage);
        }
        else if (update) {
            updatImage();
        }
    }

    async function updatImage() {
        let url;
        let mediaType;
        if (img) {
            if (img.type.includes("image/")) {
                const mediaRef = ref(
                    storage,
                    `${img.type}/${new Date().getTime()}-${img.name}`
                );
                mediaType = img.type;
                const snap = await uploadBytes(mediaRef, img);
                const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
                url = dlUrl;
                updateUser(url);
            }
        }
    }

    async function updateUser(image) {
        const userInfo = { id, emailid, name,image};
        fetch("/user/updateUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInfo),
            credentials: "include"
        }).then(() => {
            setchanged(true)
        })
    }

    function handleCancel() {
        setopen(false);
    }

    async function getUserInfo() {
        fetch("/user/userDetails", {
            credentials: "include"
        })
            .then(res => res.json())
            .then((result) => {
                setUser(result);
            }).catch((error) => {
                history.push("/login")
            })
    }

    useEffect(() => {
        if(changed)
        {
        getUserInfo();
        setchanged(false);
        }
    }, [changed])


    return (
        <>
            {
                <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {message}
                    </DialogTitle>
                    <DialogContent>
                        <Button onClick={handleCancel} autoFocus>Cancel</Button>
                        <Button onClick={handleConfirm} autoFocus>Confirm</Button>
                    </DialogContent>
                </Dialog>
            }
            {<Grid align="center" style={{ margin: '20px auto' }}>
                <Card align="left" sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        alt={user.name}
                        height="400"
                        src={user.image}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user.emailid}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" size="large" style={{ padding: "10px 12px", marginRight: "4px" }}
                            onClick={handleClickUpdate}
                        >Update Profile
                            <input type="file" ref={hiddenFileInput}
                                onChange={handleChange}
                                hidden />
                        </Button>
                        <Button variant="contained" size="large" style={{ padding: "10px 12px" }} color="error"
                            onClick={handleClickDelete}
                        >Delete Profile
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
            }
        </>
    )
}
