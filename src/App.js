import React from 'react';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, Container } from '@mui/material';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import CharacterManager from './components/CharacterManager';
import customTheme from './components/customTheme'; // Import your custom theme
import CharacterCreator from './components/CharacterCreator';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              <NavLink to="/" exact style={{ color: 'white', textDecoration: 'none' }} activeClassName="active-link">
                Welcome Dungeon Master
              </NavLink>
            </Typography>
            {/* Add more navigation links here */}
            <NavLink to="/characters" style={{ color: 'white', marginLeft: '20px', textDecoration: 'none' }} activeClassName="active-link">
              Characters
            </NavLink>
            <NavLink to="/create" style={{ color: 'white', marginLeft: '20px', textDecoration: 'none' }} activeClassName="active-link">
              Create Character
            </NavLink>
            {/* Add more navigation links as needed */}
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/" element={<Typography variant="h2">Welcome Dungeon Master</Typography>} />
            <Route path="/characters" element={<CharacterManager />} />
            <Route path="/create" element={<CharacterCreator />} />
            {/* Add more routes as needed */}
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
