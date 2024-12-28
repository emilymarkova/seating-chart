import React from 'react';
import logo from './logo.svg';
import './App.css';
import SeatingChart from './components/SeatingChart';
import Navbar from './components/Navbar';
import Box from '@mui/joy/Box';


function App() {
  return (
    <Box sx={{width:"100vw", height:"100vh"}}>
      <Navbar />  
      <SeatingChart />
      </Box>
  );
}

export default App;
