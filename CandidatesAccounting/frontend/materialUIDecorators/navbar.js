import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui-icons/AccountCircle';

export default function Navbar(props) {
  return (
    <AppBar className="custom-navbar" color="primary">
      <Toolbar>
        <Typography type="title" color="inherit">
          <Icon /> {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}