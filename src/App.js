import React, { useState } from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Container } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import customTheme from './components/customTheme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import CharacterManager from './components/CharacterManager';
import CharacterCreator from './components/CharacterCreator';
import Home from './components/Home';

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>

              <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Welcome </NavLink>
            </Typography>
            <IconButton
              aria-label="character menu"
              aria-controls="character-menu"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              Character Menu
              {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </IconButton>
            <Menu
              id="character-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <NavLink to="/create" style={{ textDecoration: 'none', color: 'inherit' }}>Create Character</NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NavLink to="/manager" style={{ textDecoration: 'none', color: 'inherit' }}>Character Manager</NavLink>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CharacterCreator />} />
            <Route path="/manager" element={<CharacterManager />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
