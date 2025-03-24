import React, { useRef, useState } from 'react';
import Alert from '@mui/joy/Alert';
import { useNavigate } from 'react-router-dom';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Navbar from './Navbar';
import Typography from '@mui/joy/Typography';
import { Link } from 'react-router-dom';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import { getDatabase, ref, set } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export default function SignUp() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth()
  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault(); // prevent from refereshing
    if (!passwordRef.current || !passwordConfirmationRef.current || !emailRef.current) {
      return;
    }
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match");//end function
    }
    try {
      //may want to add verification at one point!
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
      const userUid = auth.currentUser.uid;
      const db = getDatabase();
      await set(ref(db, 'users/' + userUid), {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        screen: {},
        desks: [],
        items: []

      });
      navigate("/");
      alert("You have successfully signed up and created an account! Make sure to save your login credentials somewhere so you don't forget them!");
    } catch(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
    }
    setLoading(false);

  }
  return (
    <Box>
      <Navbar />

      <Box sx={{
        height: "100%",
        width: "100%",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        display: "flex"
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
            {error !== "" && <Alert color="danger">{error}</Alert>}

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
              placeholder=""
              slotProps={{
                input: {
                  ref: emailRef
                }
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              // html input attribute
              name="firstName"
              type="text"
              slotProps={{
                input: {
                  ref: firstNameRef
                }
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              // html input attribute
              name="lastName"
              type="text"
              slotProps={{
                input: {
                  ref: lastNameRef
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
          <FormControl>
            <FormLabel>Password Confirmation</FormLabel>
            <Input
              // html input attribute
              name="passwordConfirmation"
              type="password"
              placeholder="password confirmation"
              slotProps={{
                input: {
                  ref: passwordConfirmationRef
                }
              }}
            />
          </FormControl>
          <Button sx={{ mt: 1 /* margin top */ }} onClick={handleSubmit} disabled={loading}>Sign Up</Button>
          <Typography
            endDecorator={<Link to='/login'>Log in</Link>}
            sx={{ fontSize: 'sm', alignSelf: 'center' }}
          >
            Already have an account?
          </Typography>
        </Sheet>
      </Box>
    </Box>
  );
}
