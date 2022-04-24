import React, { useState, useEffect } from 'react'
import IndividualSubTask from '../Components/IndividualSubTask';
import IndividualTask from '../Components/IndividualTask'
import { TextField, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

export default function OwnTaskPage() {

  const [selectedTaskID, setselectedTaskID] = useState(false)
  const [taskList, settaskList] = useState([]);
  const [addSubTask, setaddSubTask] = useState(false);
  const [name, setname] = useState("");
  const history = useHistory();

  function handleOneTask(selectedTask) {
    setSelectedTask(selectedTask);
  }

  async function getIndividualTask() {
    fetch("/task/individualTask", {
      credentials: "include"
    })
      .then(res => res.json())
      .then((result) => {
        settaskList(result);
      }).catch((error) => {
        history.push("/projects")
      })
  }

  async function setSelectedTask(taskID) {
    fetch("/subtask/selectTask", {
      method: "POST",
      mode: "no-cors",
      headers: { 'Content-Type': 'application/json;charset=UTF-8', },
      body: JSON.stringify(taskID),
      credentials: "include"
    }).then(() => {
      setselectedTaskID(true);
      setaddSubTask(true);
    });
  }

  async function handleAddSubTask() {
    const subTaskInfo = { name };
    fetch("/subtask/addSubTask", {
      method: "POST",
      headers: { 'Content-Type': 'application/json;charset=UTF-8', },
      body: JSON.stringify(subTaskInfo),
      credentials: "include"
    }).then(() => {
      setaddSubTask(true);
      setname("");
    });
  }

  useEffect(() => {
    getIndividualTask();
  }, [])

  return (
    <div>
      <div style={styles.listContainer}>
        <>
          <div className='d-flex flex-column' style={{
            width: window.innerWidth / 2,
            maxHeight: "80vh", margin: "0px 10px 10px 10px",
            padding: "5px 10px",
            overflowY: "scroll", backgroundColor: "#dfe3e6",
            borderRadius: 3,
          }}>
            {taskList.map((task) => (
              <IndividualTask handleOneTask={handleOneTask} task={task} />
            ))}
          </div>

          {
            selectedTaskID ?
              <div className='d-flex flex-column' style={{
                width: window.innerWidth / 2, padding: "5px 10px",
                margin: "0px 10px 10px 10px", maxHeight: "80vh",
                overflowY: "scroll", backgroundColor: "#dfe3e6",
                borderRadius: 3,
              }} >
                <div className='d-flex flex-row align-items-center ' style={{ marginBottom: "10px", width: "100%" }}>
                  <TextField required style={{ marginTop: "10px", minWidth: "315px", background: "white" }} fullWidth label="Sub Task" type="text" name='name' value={name} onChange={(e) => { setname(e.target.value) }} />
                  <Button onClick={() => { handleAddSubTask() }} style={{ margin: "10px 0 0 20px", height: "54px" }} variant='contained'>Add</Button>
                </div>
                <IndividualSubTask addSubTask={addSubTask} setaddSubTask={setaddSubTask} />
              </div>
              :
              null
          }

        </>
      </div>
    </div>
  )
}

const styles = {
  listContainer: {
    margin: "20px 20px",
    display: "flex",
    flexDirection: "row",
  },
  inputForm: {
    padding: "14px 32px 14px 16px",
    borderRadius: "4px 0 0 4px",
    border: "2px solid #5d0cff",
    outline: "none",
    width: window.innerWidth / 2,
    background: "transparent",
    color: "#fff",
  }
}