import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

function DeleteConfirmation({ onDelete, id }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    // setOpen(false);
    onDelete();
  };

  return (
    <>
      <Button color="error" onClick={handleClickOpen}>
        <AiOutlineDelete size={20} className="text-red-500" />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete this item?</DialogTitle>
        <DialogContent>
          <p>This action cannot be undone.</p>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="bg-red-500 "
            onClick={handleDelete}
          >
              Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteConfirmation;
