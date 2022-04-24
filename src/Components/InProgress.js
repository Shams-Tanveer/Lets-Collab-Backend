import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

export default function InProgress({ tasks,setignore }) {
  return (
    <Droppable droppableId='2'>
      {
        (provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} style={styles.container}>
            <h4>In Progress</h4>
            {tasks.map((task, taskIndex) => (
              <Task key={task.id} taskIndex={taskIndex} task={task} colName="2" setignore={setignore}/>
            ))}
            {provided.placeholder}
          </div>
        )
      }
    </Droppable>
  )
}

const styles = {
  container: {
    backgroundColor: "#dfe3e6",
    borderRadius: 3,
    width: window.innerWidth / 3,
    padding: 8,
    heigth: "100%",
    marginRight: 8,
    overflowY: "scroll",
    maxHeight: "79vh"
  }
};