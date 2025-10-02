import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography
} from "@mui/material";

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

function AddUserModal({ open, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
const [emailError, setEmailError] = useState(false);

  const handleSubmit = () => {
    if (!name || !email) {
      alert("Name and Email are required!");
      return;
    }

        if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      return;
    }

    const newUser = {
      id: Date.now(), // temporary ID
      name,
      email,
      phone,
      company: { name: company || "N/A" },
      address: { street: "", city: "" }, // optional placeholder
      website: ""
    };

    onAdd(newUser);
    setName("");
    setEmail("");
    setCompany("");
    setPhone("");
    setEmailError(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          Add New User
        </Typography>

        <TextField
          fullWidth
          required
          margin="normal"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

         <TextField
          fullWidth
          required
          margin="normal"
          label="Email"
          type="email"
          value={email}
          error={emailError}
          helperText={emailError ? "Please enter a valid email address" : ""}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Box sx={{ mt: 3, textAlign: "right" }}>
          <Button onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddUserModal;
