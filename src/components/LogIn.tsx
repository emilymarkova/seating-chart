import React, { useRef, useState } from 'react';
import Alert from '@mui/joy/Alert';
import { useNavigate } from 'react-router-dom';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Navbar from './Navbar';
import {Link} from 'react-router-dom';
import Typography from '@mui/joy/Typography';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';


export default function LogIn() {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function handleLogIn(e: any) {
		e.preventDefault(); // prevent from refereshing
		if (!passwordRef.current || !emailRef.current) {
			return;
		}
		const auth = getAuth();
		try {
			setError("");
			setLoading(true);
			await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
			navigate("/");

		} catch (error: any) {
			setError("Failed to log in");
		}
	}

  return (
    <Box>
      <Navbar />
    
		<Box sx={{
			height:"100%",
			width:"100%",
			textAlign: "center",
			alignItems: "center",
			justifyContent: "center",
			display:"flex"
		}}>
      <CssBaseline />
      <Sheet
        sx={{
          width: 300,
          mx: 'auto', // margin left & right
          my: 4, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
				<div>
        {error!=="" && <Alert color="danger">{error}</Alert>}
					
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body-sm">Sign in to continue.</Typography>
        </div>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            // html input attribute
            name="email"
            type="email"
						placeholder="johndoe@email.com"
						slotProps={{
              input: {
                ref: emailRef
              }
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            // html input attribute
            name="password"
            type="password"
						placeholder="password"
						slotProps={{
              input: {
                ref: passwordRef
              }
            }}
          />
				</FormControl>
        <Button sx={{ mt: 1 /* margin top */ }} onClick={handleLogIn} disabled={loading}>Log In</Button>
        <Typography
          endDecorator={<Link to='/signup'>Sign Up</Link>}
          sx={{ fontSize: 'sm', alignSelf: 'center' }}
        >
          Need an account?
        </Typography>
      </Sheet>
      </Box>
      </Box>
  );
}
