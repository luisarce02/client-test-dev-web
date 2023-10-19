import React from "react";
import Task from "./Task";
import { TaskListProps } from "../interfaces/TaskInterfaces";

const TaskListProp: React.FC<TaskListProps> = ({
  title,
  tasks,
  handleEdit,
  handleCategoryChange,
  handleDelete,
}) => {
  return (
    <div style={{ flex: 1, margin: 10 }}>
      <h2
        className={title}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </h2>
      {tasks.map((task) => (
        <Task
          key={task.idString}
          idString={task.idString}
          name={task.name}
          status={task.status}
          category={task.category}
          created={task.created}
          onEdit={handleEdit}
          onEditCategory={handleCategoryChange}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default TaskListProp;
