import React from 'react'
import {Typography,Button,Card,CardActions,CardContent,CardMedia} from '@material-ui/core';
import useStyles from './styles';
const Carditem = ({item,handleUpdateCart,handleRemoveCart}) => {
    const classes = useStyles();
    const handleAddToCart=()=>handleUpdateCart(item.id,item.quantity+1);
    const handleRedusefromCart=()=>handleUpdateCart(item.id,item.quantity-1);
    const handleRemovefromCart=()=>handleRemoveCart(item.id);
  return (
     <Card className="cart-item">
        <CardMedia image={item.image.url} alt={item.name} className={classes.media}></CardMedia>
        <CardContent className={classes.CardContent}>
            <Typography variant='h4'>{item.name}</Typography>
            <Typography variant='h5'>{item.line_total.formatted_with_symbol}</Typography>
        </CardContent>
        <CardActions className={classes.CardActions}>
            <div className={classes.Button}>
                <Button type="button" size="small" onClick={handleRedusefromCart}>-</Button>
                <Typography>{item.quantity}</Typography>
                <Button type="button" size="small" onClick={handleAddToCart}>+</Button>
            </div>
            <Button variant='contained' type="button" color="secondary" onClick={handleRemovefromCart}>Remove</Button>
        </CardActions>
     </Card>
  )
}

export default Carditem