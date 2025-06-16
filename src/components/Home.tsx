import Typography from '@mui/joy/Typography';
import React, { useState } from 'react';
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
		<Box sx={{
			width: "100%",
			height: "100%"
		}}>
			<Navbar />
			{/* <Box sx={{ textAlign: "center", alignItems: "center", justifyContent: "center", height: "100%", width: "100%", display: "flex" }}> */}
			<Box sx={{marginLeft:"20px"}}>
				<Box>
					<Typography sx={{ fontSize: "16px" }}>
						Latest Changes (newest to oldest):
					</Typography>
					<Typography sx={{ fontSize: "13px" }}>
						1. Created a new tutorial video to explain adding desks/items in more detail + explain how to print the charts.
					</Typography>
					<Typography sx={{ fontSize: "13px" }}>
						2. Added a new feature that allows you to save the seating chart as a PDF file/print it. 
					</Typography>
			
					{!signedIn &&
						<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginTop: "20px" }}>
							<Button sx={{ width: "100px" }} onClick={() => { navigate('/login') }}>Log In</Button>
							<Button sx={{ width: "100px" }} onClick={() => { navigate('/signup') }}>Sign Up</Button>
						</Box>
					}

				</Box>
			</Box>
		</Box>
	);
}
