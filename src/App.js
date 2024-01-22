import logo from './logo.svg';
import './App.css';
import { Typography } from '@mui/material';
import CharacterManager from './components/CharacterManager';


function App() {
  return (
    <div className="App">
      <Typography variant = "h2">Welcome Dungeon Master </Typography>
      <CharacterManager />
    </div>
  );
}

export default App;
