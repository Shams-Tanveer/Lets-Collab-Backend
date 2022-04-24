import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Draggable } from 'react-beautiful-dnd';
import { Dialog, DialogContent } from '@mui/material';
import ModifyTask from './ModifyTask';
import { LinearProgress } from '@mui/material';

export default function Task({ taskIndex, task, colName,setignore }) {

    const [openForm, setOpenForm] = useState(false)

    async function setSelectedTask(taskID) {
        fetch("/subtask/selectTask", {
            method: "POST",
            mode: "no-cors",
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
            body: JSON.stringify(taskID),
            credentials: "include"
        }).then(() => {
            setOpenForm(true);
        });
    }

    return (
        <>
            {
                <Dialog open={openForm}><DialogContent><ModifyTask setOpenForm={setOpenForm} taskID={task.id} setignore={setignore}/></DialogContent></Dialog>
            }

            <Draggable isDragDisabled={colName == "4" ? true : false} draggableId={String(task.id)} index={taskIndex}>
                {
                    (provided) => (
                        <div onClick={() => {
                            setSelectedTask(task.id);
                        }} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                            <Card sx={{ minWidth: 275 }} style={styles.CardContainer}>
                                <CardContent>
                                    <Typography
                                        sx={{ fontSize: 14 }}
                                        color="text.secondary"
                                        gutterBottom>
                                        {task.text}
                                    </Typography>
                                    <LinearProgress style={{ marginTop: "10px" }} variant='determinate' value={(task.completedSubTask / task.totalSubTask) * 100} />
                                </CardContent>
                            </Card>
                        </div>
                    )
                }
            </Draggable>
        </>
    )
}
const styles = {
    CardContainer: {
        marginBottom: 10,
        minHeight: "60px"
    },

}