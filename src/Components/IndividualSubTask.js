import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function IndividualSubTask({ addSubTask, setaddSubTask }) {

  const [subTask, setsubTask] = useState([]);
  const [name, setname] = useState("");

  function handleEdit(editSubTask) {
    let index = subTask.indexOf(editSubTask);
    let newAray = [...subTask];
    newAray[index].edit = true;
    setsubTask(newAray);
    setname(editSubTask.name);
  }

  function handleKeyDown(e, editSubTask) {
    if (e.keyCode === 13) {
      let index = subTask.indexOf(editSubTask);
      let newAray = [...subTask];
      newAray[index].edit = false;
      setsubTask(newAray);
      updateTask(editSubTask.id, name, editSubTask.isComplete);
    }
  }

  async function updateTask(id, name, complete) {
    const subTaskInfo = { id, name, complete }
    fetch("/subtask/updateSubTask", {
      method: "POST",
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(subTaskInfo),
      credentials: "include"
    }).then(() => {
      setaddSubTask(true);
    });
  }

  function handleComplete(editSubTask) {
    updateTask(editSubTask.id, editSubTask.name, 1);
  }

  function handleUnComplete(editSubTask) {
    updateTask(editSubTask.id, editSubTask.name, 0);
  }

  async function handleDelete(editSubTask) {
    const subTaskID = editSubTask.id;
    fetch("/subtask/deleteSubTask", {
      method: "POST",
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(subTaskID),
      credentials: "include"
    }).then(() => {
      setaddSubTask(true);
    });
  }

  async function getSubTask() {
    fetch("/subtask/getSubTask", {
      credentials: "include"
    })
      .then(res => res.json())
      .then((result) => {
        let list = [];
        for (let i = 0; i < result.length; i++) {
          const newList = {
            id: result[i].id,
            name: result[i].name,
            isComplete: result[i].complete,
            edit: false
          }

          list = [...list, newList];
        }
        setsubTask(list);
      })
  }

  useEffect(() => {
    if (addSubTask) {
      getSubTask();
      setaddSubTask(false);
    }
  }, [addSubTask])

  return (
    <>
      {subTask.map((subtask) => (
        !subtask.edit ?
          <div style={styles.CardContainer
          } className="d-flex justify-content-between" >
            <div className='d-flex flex-row'>
              {!subtask.isComplete ?
                <CheckBoxOutlineBlankIcon onClick={() => { handleComplete(subtask) }} style={{ marginRight: "10px", cursor: "pointer" }} />
                : <CheckBoxIcon onClick={() => { handleUnComplete(subtask) }} style={{ marginRight: "10px", cursor: "pointer" }} />}
              <Typography
                maxWidth="350px"
                style={!subtask.isComplete ? null : styles.typographyDec}
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom>
                {subtask.name}
              </Typography>
            </div>
            <div style={{ marginRight: "10px" }}>
              <DeleteForeverIcon onClick={() => handleDelete(subtask)} style={{ marginRight: "10px", cursor: "pointer" }} />
              <EditIcon onClick={() => handleEdit(subtask)} style={{ cursor: "pointer" }} />
            </div>
          </div >
          :
          <div key={subtask.id} style={styles.InputContainer}>
            <TextField onKeyDown={(e) => handleKeyDown(e, subtask)} style={{ margin: "0px 0px", background: "white" }} fullWidth value={name} onChange={(e) => { setname(e.target.value) }} name='subtask' label="Sub Task" type="text" />
          </div>
      ))}

    </>
  )
}

const styles = {
  CardContainer: {
    marginBottom: 10,
    minWidth: "315px",
    width: "100%",
    background: "white",
    display: "flex",
    flexDirection: "row",
    borderRadius: "5px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    minHeight: 60,
    paddingTop: "10px",
    paddingLeft: "10px"
  },
  InputContainer: {
    width: "100%",
    minWidth: "315px",
    marginBottom: 10,
  },
  typographyDec: {
    textDecoration: "line-through"
  },


}