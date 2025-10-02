import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  flex: 1, // makes it expand
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function SearchBar({ onSearch, onSort, onAddUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = (option) => {
    setAnchorEl(null);
    if (option) onSort(option);
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by name or email…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => onSearch(e.target.value)}
            />
          </Search>

          {/* Sort button */}
          <IconButton color="inherit" onClick={handleMenuClick}>
            <SortIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose(null)}
          >
            <MenuItem onClick={() => handleClose("name-asc")}>Name A–Z</MenuItem>
            <MenuItem onClick={() => handleClose("name-desc")}>Name Z–A</MenuItem>
            <MenuItem onClick={() => handleClose("email-asc")}>Email A–Z</MenuItem>
            <MenuItem onClick={() => handleClose("email-desc")}>Email Z–A</MenuItem>
            <MenuItem onClick={() => handleClose("company-asc")}>Company A–Z</MenuItem>
            <MenuItem onClick={() => handleClose("company-desc")}>Company Z–A</MenuItem>
          </Menu>

          {/* Add User button */}
          <Button
            variant="contained"
            color="secondary"
            sx={{ ml: 2 }}
            onClick={onAddUser}
          >
            + Add User
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
