import React, { useRef, useState } from 'react';
import Alert from '@mui/joy/Alert';

import { useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Navbar from './Navbar';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Select from '@mui/joy/Select';
import Box from '@mui/joy/Box';
import Option from '@mui/joy/Option';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';


export default function Home() {
	  const navigate = useNavigate();

	return (
		<Box sx={{width: "100%",
    height: "100%"}}>
			<Navbar/>
		<Box sx={{ textAlign: "center", alignItems: "center", justifyContent: "center", height: "100%", width: "100%", display: "flex" }}>
			<Box>
			<Typography sx={{fontSize:"30px" }}>
  Welcome to the {" "}
  <Typography variant="outlined" color="success">Seating Chart Project</Typography>. <br/>I hope you enjoy your experience!
				</Typography>
				<Box sx={{display:"flex", width:"400px", justifyContent:"space-between", alignItems:"center"}}>
					<Button sx={{ width: "100px" }} onClick={() => { navigate('/login') }}>Log In</Button>
				<Button sx={{width:"100px" }} onClick={() => { navigate('/signup') }}>Sign Up</Button>
				</Box>
				
</Box>
			</Box>
			</Box>
  );
}
