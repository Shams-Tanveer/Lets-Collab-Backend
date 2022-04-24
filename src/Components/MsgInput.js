import React from 'react'
import { AttachFile } from '@mui/icons-material';
import { Button } from '@mui/material';

export default function MsgInput({ handleSend, text, setText, setMedia, isMediaSelected, setIsMediaSelected }) {
    return (
        <form style={styles.container} onSubmit={handleSend}>

            <label style={{ cursor: "pointer" }} htmlFor='media'>
                <AttachFile />
            </label>
            <input
                onChange={(e) => {
                    setMedia(e.target.files[0]);
                    setText(e.target.files[0].name);
                    setIsMediaSelected(true);
                }}
                type="file" id="media"
                style={styles.attachField} />
            <div >
                <input style={styles.inputField}
                    type="text"
                    placeholder='Type Message'
                    value={text}
                    disabled={isMediaSelected}
                    onChange={e => setText(e.target.value)}
                />
            </div>
            <div>
                <Button
                    type='submit'
                    style={{ margin: "-8px 10px 0px" }}
                    variant='contained' >Send</Button>
            </div>
        </form>
    )
}


const styles = {
    container:
    {
        position: "absolute",
        bottom: "20px",
        left: "23%",
        widht: "100%",
        height: "30px",
        display: "flex",
        alignItems: "center",


    },
    inputField: {
        width: "45vw",
        margin: "0px 0px 15px",
        padding: "10px",
        borderRadius: "5px",
        outline: "none",
    },
    attachField: {
        width: "40vw",
        margin: "0px 0px 15px",
        padding: "10px",
        borderRadius: "5px",
        outline: "none",
        border: "none",
        display: "none"
    }
};