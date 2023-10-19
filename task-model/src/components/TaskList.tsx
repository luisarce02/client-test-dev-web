import React, { useEffect, useState } from "react";
import TaskListProp from "./TaskListProp";
import { TaskData } from "../interfaces/TaskInterfaces";
import { Button, TextField } from "@mui/material";
import {
  API_URL,
  HEADER_TYPE,
  DEFAULT_STATUS,
} from "../constants/TaskConstants";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [newTaskName, setNewTaskName] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const handleAddTask = () => {
    const currentDate = new Date();
    fetch(API_URL, {
      method: "POST",
      headers: HEADER_TYPE,
      body: JSON.stringify({
        name: newTaskName,
        category: DEFAULT_STATUS,
        created: currentDate,
      }),
    })
      .then((response) => response.json())
      .then((newTask) => {
        setTasks((oldTasks) => [...oldTasks, { ...newTask }]);
        setNewTaskName("");
      });
  };

  const handleEdit = (
    id: string,
    currentCategory: string,
    newName: string,
    currentDate: Date
  ) => {
    if (newName) {
      fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: HEADER_TYPE,
        body: JSON.stringify({
          name: newName,
          category: currentCategory,
          created: currentDate,
        }),
      })
        .then((response) => response.json())
        .then((updatedTask) =>
          setTasks((oldTasks) =>
            oldTasks.map((task) => (task.idString === id ? updatedTask : task))
          )
        );
    }
  };

  const handleCategoryChange = (
    taskId: string,
    newCategory: string,
    currentName: string,
    currentDate: Date
  ) => {
    fetch(`${API_URL}/${taskId}`, {
      method: "PUT",
      headers: HEADER_TYPE,
      body: JSON.stringify({ name: currentName, category: newCategory, created: currentDate }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((updatedTask) => {
        setTasks((oldTasks) =>
          oldTasks.map((task) =>
            task.idString === taskId
              ? { ...task, category: updatedTask.category }
              : task
          )
        );
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };

  const handleDelete = (id: string) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    }).then(() =>
      setTasks((oldTasks) => oldTasks.filter((task) => task.idString !== id))
    );
  };

  const selectTasks = tasks.filter((task) => task.category === "Select");
  const backlogTasks = tasks.filter((task) => task.category === "Backlog");
  const progressTasks = tasks.filter((task) => task.category === "In Progress");
  const doneTasks = tasks.filter((task) => task.category === "Done");

  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex" }}>
        <TaskListProp
          title="Select"
          tasks={selectTasks}
          handleEdit={handleEdit}
          handleCategoryChange={handleCategoryChange}
          handleDelete={handleDelete}
        />
        <TaskListProp
          title="Backlog"
          tasks={backlogTasks}
          handleEdit={handleEdit}
          handleCategoryChange={handleCategoryChange}
          handleDelete={handleDelete}
        />
        <TaskListProp
          title="In Progress"
          tasks={progressTasks}
          handleEdit={handleEdit}
          handleCategoryChange={handleCategoryChange}
          handleDelete={handleDelete}
        />
        <TaskListProp
          title="Done"
          tasks={doneTasks}
          handleEdit={handleEdit}
          handleCategoryChange={handleCategoryChange}
          handleDelete={handleDelete}
        />
      </div>
      <div style={{ flex: 1, marginTop: 15 }}>
        <TextField
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          sx={{ m: 2 }}
          id="outlined-basic"
          label="Task Name"
          variant="outlined"
          size="small"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          InputProps={{
            style: { backgroundColor: "white" },
          }}
        />
        <Button
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          sx={{ m: 2 }}
          variant="contained"
          color="success"
          onClick={handleAddTask}
        >
          Add Task
        </Button>
      </div>
    </div>
  );
};

export default TaskList;
