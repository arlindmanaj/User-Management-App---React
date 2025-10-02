import React, { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditUserModal from "./EditUserModal";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  width: 400,
};

function UserCard({ user, onDelete, onEdit }) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      {/* Card */}
    <Card
  variant="outlined"
  sx={{ 
    width: 280, // fixed width
    m: 2, 
    cursor: "pointer", 
    boxShadow: 3, 
    borderRadius: 2 
  }}
  onClick={() => setOpen(true)}
>
        <Box sx={{ p: 2 }}>
          <Typography gutterBottom variant="h6" component="div">
            {user.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {user.email}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="body2">{user.company?.name}</Typography>
        </Box>
      </Card>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            {user.name}
          </Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>Phone: {user.phone}</Typography>
          <Typography>Website: {user.website}</Typography>
          <Typography>
            Address: {user.address.street}, {user.address.city}
          </Typography>
          <Typography>Company: {user.company?.name}</Typography>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Box>
              <IconButton
                color="primary"
                onClick={() => {
                  setOpen(false);
                  setEditOpen(true);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => onDelete(user.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Edit User Modal */}
      <EditUserModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        user={user}
        onEdit={onEdit}
      />
    </>
  );
}

export default UserCard;
