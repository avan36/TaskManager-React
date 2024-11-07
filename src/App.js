import styles from './App.css';
import { useState } from 'react';
import { Task } from "./Task";


function App() {

  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleChange = (event) => {
    setNewTask(event.target.value); //takes in event and sets the new task as the event.target.value
  };

  const addTask = () => {
    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1, //We want the id to increment by 1
      taskName: newTask,
      completed: false
    }
    
    setTodoList([...todoList, task]);
  }

  const deleteTask = (id) => {
    const newTodoList = todoList.filter((task) => {
      return task.id != id
    });
    setTodoList(newTodoList);
  };

  const completeTask = (id) => {
    setTodoList (
      todoList.map((task) => {
        if (task.id == id) {
          if (task.completed) {
            return {... task, completed: false}
          }
          else {
            return {... task, completed: true}
          }
        } else {
          return task;
        }
      })

    );
  };

  return (<div className='App'>
    <div className = 'addTask'>
      <input onChange={handleChange}/>
      <button onClick={addTask}>Add task</button>
    </div>

    <div className= 'list'></div>
    {todoList.map((current_task) =>  {
      return (<Task taskName = {current_task.taskName} id = {current_task.id} completed = {current_task.completed} deleteTask = {deleteTask} completeTask = {completeTask}/> );
    })}
    </div>
  );
}
export default App;
