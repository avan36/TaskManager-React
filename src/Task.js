export const Task = (props) => {
    const isOverdue = props.dueDate && new Date(props.dueDate) < new Date();
  
    return (
      <div className={`task ${props.completed ? "completed" : ""}`}>
        <div>
          <h1>{props.taskName}</h1>
          {props.dueDate && (
            <p style={{ color: isOverdue ? "red" : "#888" }}>
              Due: {new Date(props.dueDate).toLocaleDateString()}
            </p>
          )}
        </div>
        <div>
          <button onClick={() => props.completeTask(props.id)}>
            {props.completed ? "Undo" : "Complete"}
          </button>
          <button onClick={() => props.deleteTask(props.id)}>X</button>
        </div>
      </div>
    );
  };
  