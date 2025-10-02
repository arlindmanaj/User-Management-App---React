import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import AddUserModal from "./AddUserModal";
import SearchBar from "./SearchBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [sortOption, setSortOption] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleAddUser = (newUser) => {
    setUsers([newUser, ...users]);
  };

  const handleSort = (option) => {
    setSortOption(option);
  };

  // Filter by search
  let filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply sorting
  if (sortOption) {
    filteredUsers = [...filteredUsers].sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "email-asc":
          return a.email.localeCompare(b.email);
        case "email-desc":
          return b.email.localeCompare(a.email);
        case "company-asc":
          return a.company.name.localeCompare(b.company.name);
        case "company-desc":
          return b.company.name.localeCompare(a.company.name);
        default:
          return 0;
      }
    });
  }

  return (
    <div>
      <SearchBar onSearch={setSearchTerm} onSort={handleSort}  onAddUser={() => setOpenModal(true)}  />

    
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {filteredUsers.map((user) => (
         <UserCard
  key={user.id}
  user={user}
  onDelete={(id) => setUsers(users.filter((u) => u.id !== id))}
  onEdit={(updatedUser) =>
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)))
  }
/>
        ))}
      </Box>

      <AddUserModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAdd={handleAddUser}
      />
    </div>
  );
}

export default UsersList;
