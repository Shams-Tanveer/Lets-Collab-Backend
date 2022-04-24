import React from 'react';
import Moment from 'react-moment';
import { useRef, useEffect } from 'react';

export default function ShowMsg({ msg }) {

    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [msg]);

    return (
        <div style={msg.msgFrom === "other" ? styles.container : styles.containerRight}
            ref={scrollRef}>
            <small style={styles.nameField}>
                {msg.senderName}
            </small>
            <br />
            <p style={msg.msgFrom === "other" ? styles.msgField : styles.msgFieldRight}>
                {msg.mediaFile.includes("image") ?
                    <img src={msg.media} width="200px" height="200px" style={{background:"white"}} alt="This is an image" />
                    : null}
                {msg.mediaFile === "" ? msg.message :
                    <a style={{ cursor: "pointer",color:"white" }} href={msg.media}>{msg.message}</a>
                }
                <br />
                <small style={styles.timeField}>
                    <Moment fromNow>{msg.createdAt.toDate()}</Moment>
                </small>
            </p>


        </div >
    )
}


const styles = {
    container: {
        marginTop: "5px",
        padding: "0px 5px"
    },
    containerRight: {
        marginTop: "5px",
        padding: "0px 5px",
        textAlign: "right"
    },
    msgField: {
        padding: "10px 10px 10px 10px",
        display: "inline-block",
        textAlign: "left",
        maxWidth: "50%",
        borderRadius: "5px",
        background: '#1976d2',
        color: 'white',
        wordWrap: "break-word"
    },
    msgFieldRight: {
        padding: "10px 10px 10px 10px",
        display: "inline-block",
        textAlign: "left",
        maxWidth: "50%",
        borderRadius: "5px",
        background: '#673ab7',
        color: 'white',
        wordWrap: "break-word"
    },
    showImg: {
        width: "100%",
        borderRadius: "5px"
    },
    timeField: {
        display: "inline-block",
        opacity: "0.8",
        color:"white"
    },
    nameField: {
        display: "inline-block",
        opacity: "0.8",
    }

};