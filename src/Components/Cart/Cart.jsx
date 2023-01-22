import React from 'react'
import {Container,Typography,Button,Grid} from '@material-ui/core';
import useStyles from './styles';
import Carditem from './Cartitem/Carditem';
import {Link} from 'react-router-dom';
import CheckOut from '../CheckoutForm/CheckOut/CheckOut';
const Cart = ({cart,handleUpdateCart,handleRemoveCart,handleEmptyCart}) => {
    const classes = useStyles();
    //const isEmpty=!cart.line_items.length;

    const handleEmpty=()=>handleEmptyCart();
    const renderEmptyCart=()=>(
        <Link to={"/"} className={classes.link}>
        <Typography variant='subtitle1'>You have no item in your shopping cart , start adding some!</Typography>
        </Link>
    )

    if (!cart.line_items) return 'Loading';
    //wtf is this thing doing
    const renderCart=()=>(
        <>
        <Grid>
            {
                cart.line_items.map((item)=>(
                    <Grid item xs={12} sm={4} key={item.id}>
                        <Carditem item={item} handleUpdateCart={handleUpdateCart} handleRemoveCart={handleRemoveCart}/>
                    </Grid>
                ))
            }
        </Grid>
        <div className={classes.cardDetails}>
            <Typography variant='h4'>Subtotal:{cart.subtotal.formatted_with_symbol}</Typography>
             <div>
               <Button className={classes.emptyButon} size="large" type="button" variant="contained" color='secondary' onClick={handleEmpty}>Empty Cart</Button>
               <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary" component={Link} to="/checkout">Checkout</Button>
             </div>
        </div>
        </>
    )
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
      { !cart.line_items.length ? renderEmptyCart() : renderCart() }
    </Container>
  )
}

export default Cart