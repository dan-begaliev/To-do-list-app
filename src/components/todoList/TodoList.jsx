import React, { useState } from "react";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [doneTasks, setDoneTasks] = useState([]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index, listType) {
    if (listType === "inProgress") {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    } else if (listType === "done") {
      const updatedDoneTasks = doneTasks.filter((_, i) => i !== index);
      setDoneTasks(updatedDoneTasks);
    }
  }

  function moveUp(index, listType) {
    if (listType === "inProgress" && index > 0) {
      let updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    } else if (listType === "done" && index > 0) {
      let updatedDoneTasks = [...doneTasks];
      [updatedDoneTasks[index], updatedDoneTasks[index - 1]] = [
        updatedDoneTasks[index - 1],
        updatedDoneTasks[index],
      ];
      setDoneTasks(updatedDoneTasks);
    }
  }

  function moveDown(index, listType) {
    if (listType === "inProgress" && index < tasks.length - 1) {
      let updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    } else if (listType === "done" && index < doneTasks.length - 1) {
      let updatedDoneTasks = [...doneTasks];
      [updatedDoneTasks[index], updatedDoneTasks[index + 1]] = [
        updatedDoneTasks[index + 1],
        updatedDoneTasks[index],
      ];
      setDoneTasks(updatedDoneTasks);
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  function moveTaskToDone(index) {
    const taskToMove = tasks[index];
    setDoneTasks((prevDoneTasks) => [...prevDoneTasks, taskToMove]);
    deleteTask(index, "inProgress");
  }

  function moveTaskBack(index) {
    const taskToMove = doneTasks[index];
    setTasks((prevTasks) => [...prevTasks, taskToMove]);
    deleteTask(index, "done");
  }

  return (
    <div className="to-do-list">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <div className="listsOfTasks">
        <ol>
          <h2>In Progress 💣</h2>
          {tasks.map((task, index) => (
            <li key={`inProgress-${index}`}>
              <span className="text">{task}</span>

              <button
                className="move-button"
                onClick={() => moveUp(index, "inProgress")}
              >
                🖕
              </button>
              <button
                className="move-button"
                onClick={() => moveDown(index, "inProgress")}
              >
                👇
              </button>
              <button
                className="delete-button"
                onClick={() => deleteTask(index, "inProgress")}
              >
                Delete
              </button>
              <button
                className="add-button reverse"
                onClick={() => moveTaskToDone(index)}
              >
                💪
              </button>
            </li>
          ))}
        </ol>
        <ol className="done-list">
          <h2>Done ✅</h2>
          {doneTasks.map((task, index) => (
            <li key={`done-${index}`}>
              <span className="text">{task}</span>
              <button
                className="delete-button"
                onClick={() => deleteTask(index, "done")}
              >
                Delete
              </button>
              <button
                className="move-button"
                onClick={() => moveUp(index, "done")}
              >
                🖕
              </button>
              <button
                className="move-button"
                onClick={() => moveDown(index, "done")}
              >
                👇
              </button>
              <button
                className="add-button reverse"
                onClick={() => moveTaskBack(index)}
              >
                🔄
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default TodoList;
