import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';

const NavBar = () => {
  return (
    <AppBar position='static'>
      <Toolbar variant='dense'>
        <IconButton edge='start' aria-label='menu' color='inherit'>
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' color='inherit'>
          Books
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
