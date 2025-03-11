// import * as React from 'react';
// import { Popper } from '@mui/base/Popper';
// import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
// import ListItemDecorator from '@mui/joy/ListItemDecorator';
// import HomeRounded from '@mui/icons-material/HomeRounded';
// import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Person from '@mui/icons-material/Person';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
// import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import Dropdown from '@mui/joy/Dropdown';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import MoreVert from '@mui/icons-material/MoreVert';

export default function NavBar() {
  return (
    <Box sx={{ minHeight: "20px" }}>
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
            href="#navigation-menu"
          >
           <Typography>Table Map</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem role="none" sx={{ marginInlineStart: 'auto' }} >
        <Dropdown>
      <MenuButton
        slots={{ root: Person }}
        slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
      >
        <MoreVert />
      </MenuButton>
      <Menu>
        <MenuItem><Person /> Profile</MenuItem>
        <MenuItem><InfoOutlinedIcon /> Instructions</MenuItem>
        <MenuItem><ExitToAppOutlinedIcon /> Logout</MenuItem>
      </Menu>
    </Dropdown>
        </ListItem>
      </List>
    </Box>
  );
}

