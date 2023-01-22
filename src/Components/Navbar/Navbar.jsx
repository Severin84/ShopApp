import React from 'react'
import {AppBar,Toolbar,IconButton,Badge,MenuItem,Menu,Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import useStyles from './style';
import {Link,useLocation} from 'react-router-dom'
const Navbar = ({updateCartIcon}) => {
    const classes=useStyles();
    const location=useLocation();
  return (
    <AppBar position='fixed' className={classes.appBar} color="inherit">
        <Toolbar>
            <Typography variant='h6' className={classes.title} color="inherit">
                <img src='data:image/png;base64,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' alt='commerce.js' height='25px' className={classes.image}></img>
                DOWNTOWN
            </Typography>
            <div className={classes.grow}></div>
            {location.pathname==='/' && (
                <div className={classes.button}>
                <Link to={"/cart"} style={{color:'black'}}>
                <IconButton aria-label='Show cart item' color="inherit">
                    <Badge badgeContent={updateCartIcon} color="secondary">
                        <ShoppingCart/>
                    </Badge>
                </IconButton>
                </Link>
                </div>
              )} 
        </Toolbar>

    </AppBar>
  )
}

export default Navbar