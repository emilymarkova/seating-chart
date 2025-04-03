import Typography from '@mui/joy/Typography';
import React, {useState } from 'react';
import Navbar from './Navbar';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";



export default function Home() {
	const navigate = useNavigate();
	const [signedIn, setSignedIn] = useState(false);
		
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
		setSignedIn(true);
  } else {
		setSignedIn(false);
  }
});

	return (
		<Box sx={{width: "100%",
    height: "100%"}}>
			<Navbar/>
		<Box sx={{ textAlign: "center", alignItems: "center", justifyContent: "center", height: "100%", width: "100%", display: "flex" }}>
			<Box>
			<Typography sx={{fontSize:"30px" }}>
  Welcome to the {" "}
  <Typography variant="outlined" color="success">Seating Chart Project</Typography>. 
					</Typography>
					{!signedIn &&
				<Box sx={{display:"flex", width:"400px", justifyContent:"space-between", alignItems:"center"}}>
					<Button sx={{ width: "100px" }} onClick={() => { navigate('/login') }}>Log In</Button>
				<Button sx={{width:"100px" }} onClick={() => { navigate('/signup') }}>Sign Up</Button>
						</Box>
					}
				
</Box>
			</Box>
			</Box>
  );
}
