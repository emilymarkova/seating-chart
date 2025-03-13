// import React from 'react';
// import logo from './logo.svg';
import './App.css';
import SeatingChart from './components/SeatingChart';
import SignUp from './components/SignUp';
import Home from './components/Home';
import LogIn from './components/LogIn.tsx';
import Box from '@mui/joy/Box';
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (

    <Box sx={{ width: "100vw", height: "100vh" }}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/seating-chart" element={<SeatingChart />} />
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/login" element={<LogIn />}/>
            <Route path="/" element={<Home />}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Box>

  );
}

export default App;
