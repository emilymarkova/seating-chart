// import * as React from 'react';
// import { Popper } from '@mui/base/Popper';
// import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import FlagIcon from '@mui/icons-material/Flag';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import { getAuth, signOut } from "firebase/auth";

// import ListItemDecorator from '@mui/joy/ListItemDecorator';
// import HomeRounded from '@mui/icons-material/HomeRounded';
// import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Person from '@mui/icons-material/Person';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
// import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import Dropdown from '@mui/joy/Dropdown';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import MoreVert from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  const logOut = function () {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    navigate('/');
  }
  return (
    <Box sx={{ minHeight: "20px", width:"100%" }}>
      <List
        role="menubar"
        orientation="horizontal"
        sx={{
          '--List-radius': '8px',
          '--List-padding': '4px',
          '--List-gap': '8px',
          '--ListItem-gap': '0px',
        }}
      >
        <ListItem role="none">
          <ListItemButton
            role="menuitem"
            component="a"
            // href="#navigation-menu"
            onClick={() => { navigate('/') }}
          >
            <Typography>Table Map</Typography>
          </ListItemButton>
        </ListItem>
        {getAuth().currentUser &&
          <ListItem role="none" sx={{ marginInlineStart: 'auto' }} >
            <Dropdown>
              <MenuButton
                slots={{ root: Person }}
                slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
              >
                <MoreVert />
              </MenuButton>
              <Menu>
                {/* <MenuItem onClick={() => { navigate('/profile') }}><Person /> Profile</MenuItem> */}
                {/* <MenuItem><InfoOutlinedIcon /> Instructions</MenuItem> */}
                <MenuItem onClick={() => { navigate('/seating-chart') }}><BackupTableIcon />Charts</MenuItem>
                <MenuItem onClick={() => { window.open("https://forms.gle/NSnBUfDfmLXSRt567", "_blank") }}><FlagIcon />Form</MenuItem>
                <MenuItem onClick={() => { window.open("https://youtu.be/l6MknVfKeIM", "_blank") }}><OndemandVideoIcon />Tutorial</MenuItem>
                <MenuItem onClick={logOut}><ExitToAppOutlinedIcon /> Logout</MenuItem>
              </Menu>
            </Dropdown>
          </ListItem>
        }
      </List>
    </Box>
  );
}

