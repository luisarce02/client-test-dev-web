
export interface TaskData {
  idString: string;
  name: string;
  status: "Select" | "Backlog" | "In Progress" | "Done";
  category: string;
  created: Date;
}

export interface TaskListProps {
  title: string;
  tasks: TaskData[];
  handleEdit: (id: string, currentCategory: string, newName: string, currentDate: Date) => void;
  handleCategoryChange: (
    taskId: string,
    newCategory: string,
    currentName: string,
    currentDate: Date
  ) => void;
  handleDelete: (id: string) => void;
}

export interface TaskProps {
  idString: string;
  name: string;
  status: "Select" | "Backlog" | "In Progress" | "Done";
  category: string;
  created: Date;
  onEdit: (id: string, currentCategory: string, newName: string, currentDate: Date) => void;
  onDelete: (id: string) => void;
  onEditCategory: (
    id: string,
    newCategory: string,
    currentName: string,
    currentDate: Date
  ) => void;
}