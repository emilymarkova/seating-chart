import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import { ref, update } from "firebase/database";

import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import useRef from 'react';
import KeyIcon from '@mui/icons-material/Key';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { getAuth, sendPasswordResetEmail,updateEmail } from "firebase/auth";
import { db } from "../firebase";

import NavBar from './Navbar';

export default function Profile() {
	const firstNameRef = useRef<HTMLInputElement>(null);
	const lastNameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const handleResetPassword = function () {
		const auth = getAuth();
		if (auth.currentUser) {
			sendPasswordResetEmail(auth, auth.currentUser.email)		
			.then(() => {
		alert("An email has been sent to reset your password! Make sure to save your password somewhere so you can use it later!");
  })
  .catch((error) => {
    const errorCode = error.code;
		const errorMessage = error.message;
		alert(error)
    // ..
	});
	updateEmail(auth.currentUser, emailRef.current.value).then(() => {
		// Email updated!
		// ...
	}).catch((error) => {
		const errorMessage = error.message;
		alert(error)
		// ...
	});
	
		}

	}

	const saveInformation = function () {
		const userUid = auth.currentUser.uid;
		const userRef = ref(db, 'users/' + userUid);
		update(userRef, {
			firstName: firstNameRef.current.value,
			lastName: lastNameRef.current.value,
			email: emailRef.current.value
	}).catch((error) => {
			alert("Hmmm....There was an error updating your information.")
	});
	}
  return (
    <Box sx={{ flex: 1, width: '100%' }}>
      <NavBar/>
       
      <Stack
        spacing={4}
        sx={{
          display: 'flex',
          maxWidth: '800px',
          mx: 'auto',
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Profile Information</Typography>
            <Typography level="body-sm">
              Change your profile information.
            </Typography>
          </Box>
          <Divider />
          <Stack
            direction="column"
          >
           <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    size="sm"
										type="text"
										name="firstName"
                    startDecorator={<DriveFileRenameOutlineIcon />}
										sx={{ flexGrow: 1 }}
										slotProps={{
											input: {
												ref: firstNameRef
											}
										}}
                  />
								</FormControl>
              </Stack>
            </Stack>
					<Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    size="sm"
										type="text"
										name="lastName"
                    startDecorator={<DriveFileRenameOutlineIcon />}
										sx={{ flexGrow: 1 }}
										slotProps={{
											input: {
												ref: lastNameRef
											}
										}}
                  />
								</FormControl>
              </Stack>
            </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    startDecorator={<EmailRoundedIcon />}
										sx={{ flexGrow: 1 }}
										slotProps={{
											input: {
												ref: emailRef
											}
										}}
                  />
								</FormControl>
              </Stack>
            </Stack>
					</Stack>
					
          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral" onClick={handleResetPassword}>
                Reset Password
              </Button>
              <Button size="sm" variant="solid" onClick={saveInformation}>
                Save Information
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}