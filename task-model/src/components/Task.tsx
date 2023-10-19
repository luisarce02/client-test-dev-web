import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { TaskProps } from "../interfaces/TaskInterfaces";

const categoryOptions = ["Select", "Backlog", "In Progress", "Done"];

const Task: React.FC<TaskProps> = ({
  idString,
  name,
  category,
  created,
  onEdit,
  onDelete,
  onEditCategory,
}) => {
  const [open, setOpen] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [newName, setNewName] = useState("");
  let textColor = "initial";

  if (category === "Done") {
    textColor = "green";
  } else if (category === "In Progress") {
    textColor = "blue";
  } else if (category === "Backlog") {
    textColor = "orange";
  } else if (category === "Select") {
    textColor = "gray";
  }

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newCategory = e.target.value as string;
    onEditCategory(idString, newCategory, name, created);
  };

  const handleUpdate = () => {
    onEdit(idString, category, newName, created);
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    onDelete(idString);
    setOpenDeleteDialog(false);
  };

  return (
    <div>
      <Card sx={{ width: 250, maxWidth: 345, minHeight: 200, m: 2 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{whiteSpace: "nowrap"}}>
            {name.length > 16 ? name.slice(0, 16) + "..." : name}
          </Typography>
          <Typography variant="body2" color={textColor}>
            {category}
          </Typography>
          <Typography variant="body2">
            Created: {new Date(created).toLocaleString()}
          </Typography>
          <TextField
            sx={{ mt: 2 }}
            id="outlined-select-currency-native"
            select
            label="Status select"
            value={category}
            SelectProps={{
              native: true,
            }}
            helperText="Please select the status"
            onChange={handleCategoryChange}
          >
            {categoryOptions.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </TextField>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            onClick={handleClickOpen}
          >
            Edit
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit task name</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="New name"
                type="text"
                fullWidth
                variant="standard"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button color="secondary" onClick={handleUpdate}>
                Update
              </Button>
            </DialogActions>
          </Dialog>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={handleClickOpenDeleteDialog}
          >
            Delete
          </Button>
          <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this task?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
              <Button color="error" onClick={handleConfirmDelete}>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </CardActions>
      </Card>
    </div>
  );
};

export default Task;
