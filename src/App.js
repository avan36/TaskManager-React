import styles from './App.css';
import { useState } from 'react';
import { Task } from "./Task";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const toggleDatePicker = () => {
    setShowDatePicker((prev) => !prev);
    setDueDate(""); // Reset date if they toggle it off
  };

  const addTask = () => {
    if (newTask.trim() === "") return; // Prevent empty task submission

    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      taskName: newTask,
      dueDate: dueDate,
      completed: false
    };

    setTodoList([...todoList, task]);
    setNewTask("");
    setDueDate("");
  };

  const deleteTask = (id) => {
    const newTodoList = todoList.filter((task) => task.id !== id);
    setTodoList(newTodoList);
  };

  const completeTask = (id) => {
    setTodoList(
      todoList.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className='App'>
      <div className='addTask'>
        <input 
          type="text" 
          placeholder="Enter a new task..." 
          value={newTask}
          onChange={handleChange} 
        />
        
        <button onClick={toggleDatePicker}>
          {showDatePicker ? "Hide due date" : "Show a due date?"}
        </button>
        
        {showDatePicker && (
          <input 
            type="date" 
            value={dueDate}
            onChange={handleDateChange} 
          />
        )}

        <button onClick={addTask} disabled={!newTask.trim()}>
          Add task
        </button>
      </div>

      <div className='list'>
        {todoList.map((current_task) => (
          <Task
            key={current_task.id}
            taskName={current_task.taskName}
            dueDate={current_task.dueDate}
            id={current_task.id}
            completed={current_task.completed}
            deleteTask={deleteTask}
            completeTask={completeTask}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
