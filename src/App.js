import React, { useState } from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Container, Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import customTheme from './components/themes/customTheme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import CharacterManager from './components/characters/CharacterManager';
import CharacterCreator from './components/characters/CharacterCreator';
import Home from './components/Home';
import DiceRoller from './components/tools/DiceRoller';
import InitiativeTracker from './components/tools/InitiativeTracker';
import MusicSearch from './components/tools/MusicSearch';
import MonsterSearch from './components/reference_guide/MonsterSearch';
import RacesSearch from './components/reference_guide/RacesSearch';
import RulesSearch from './components/reference_guide/RulesSearch';

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [diceMenuAnchorEl, setDiceMenuAnchorEl] = useState(null);
  const [monstersMenuAnchorEl, setMonstersMenuAnchorEl] = useState([]);

  const openCharacterMenu = Boolean(anchorEl);
  const openDiceMenu = Boolean(diceMenuAnchorEl);
  const openMonsterMenu = Boolean(monstersMenuAnchorEl)

  const handleCharacterMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDiceMenuClick = (event) => {
    setDiceMenuAnchorEl(event.currentTarget);
  };

  const handleMonstersMenuClick = (event) => {
    setMonstersMenuAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
    setDiceMenuAnchorEl(null);
    setMonstersMenuAnchorEl(null);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Welcome</NavLink>
            </Typography>

            {/* Character Menu Dropdown */}
            <Button
              aria-controls="character-menu"
              aria-haspopup="true"
              onClick={handleCharacterMenuClick}
              color="inherit"
              endIcon={openCharacterMenu ? <ArrowDropDownIcon /> : <ArrowDropDownIcon />}
            >
              Characters
            </Button>
            <Menu
              id="character-menu"
              anchorEl={anchorEl}
              keepMounted
              open={openCharacterMenu}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <NavLink to="/create" style={{ textDecoration: 'none', color: 'inherit' }}>Create Character</NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NavLink to="/manager" style={{ textDecoration: 'none', color: 'inherit' }}>Character Manager</NavLink>
              </MenuItem>
            </Menu>

            {/* Other Tools Dropdown */}
            <Button
              aria-controls="dice-menu"
              aria-haspopup="true"
              onClick={handleDiceMenuClick}
              color="inherit"
              endIcon={openDiceMenu ? <ArrowDropDownIcon /> : <ArrowDropDownIcon />}
            >
              Tools
            </Button>
            <Menu
              id="dice-menu"
              anchorEl={diceMenuAnchorEl}
              keepMounted
              open={openDiceMenu}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <NavLink to="/dice" style={{ textDecoration: 'none', color: 'inherit' }}>Dice Roller</NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NavLink to="/initiative-tracker" style={{ textDecoration: 'none', color: 'inherit' }}>Initiative Tracker</NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NavLink to="/music-search" style={{ textDecoration: 'none', color: 'inherit' }}>Music</NavLink>
              </MenuItem>
            </Menu>
            <Button

              aria-controls="monster-menu"
              aria-haspopup="true"
              onClick={handleMonstersMenuClick}
              color="inherit"
              endIcon={openMonsterMenu ? <ArrowDropDownIcon /> : <ArrowDropDownIcon />}
            >
              Reference
            </Button>
            <Menu
              id="monster-menu"
              anchorEl={monstersMenuAnchorEl}
              keepMounted
              open={openMonsterMenu}
              onClose={handleClose}>
              <MenuItem onClick={handleClose}>
                <NavLink to="/rules-search" style={{ textDecoration: 'none', color: 'inherit' }}>Rules</NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NavLink to="/monster-search" style={{ textDecoration: 'none', color: 'inherit' }}>Monsters</NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NavLink to="/races-search" style={{ textDecoration: 'none', color: 'inherit' }}>Races</NavLink>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CharacterCreator />} />
            <Route path="/manager" element={<CharacterManager />} />
            <Route path="/dice" element={<DiceRoller />} />
            <Route path="/initiative-tracker" element={<InitiativeTracker />} />
            <Route path="/music-search" element={<MusicSearch />} />
            <Route path="/monster-search" element={<MonsterSearch />} />
            <Route path="/races-search" element={<RacesSearch />} />
            <Route path="/rules-search" element={<RulesSearch />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
