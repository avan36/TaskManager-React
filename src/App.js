import styles from './App.css';
import { useState, useEffect } from 'react';
import { Task } from "./Task";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() === "") return;

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
    <div>
      <div className="greeting">
        {`Hi, it's ${currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} on ${currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}`}
      </div>
      
      <div className='App'>
        <div className='addTask'>
          <input 
            type="text" 
            placeholder="Enter a new task..." 
            value={newTask}
            onChange={handleChange} 
          />
          <br/>
          <label className="dateLabel">Due Date (Optional)</label>
          <input 
            type="date" 
            value={dueDate}
            onChange={handleDateChange} 
          />

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
      <p><a href = "https://github.com/avan36/TaskManager-React">Link to GitHub</a></p>
    </div>
    
  );
}

export default App;
