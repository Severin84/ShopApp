import React,{useState} from 'react'
import {Paper,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button,CssBaseline} from '@material-ui/core';
import useStyles from'./styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import { useEffect } from 'react';
//import { useState } from 'react';
import { Link , useHref} from 'react-router-dom';



const steps=['Shipping address','Payment details'];


const CheckOut = ({cart,order,onCaptureCheckout,error}) => { 
    const [activeStep,setActiveStep]=useState(0);
    const [checkoutToken,setCheckoutToken]=useState(null);
    const [shippingData,setShippingData]=useState({});
    const [isFinished,setIsFinished]=useState(false);
    const classes=useStyles();
    const history=useHref(); 

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);


    useEffect(()=>{
        if (cart.id) {
        const generateToken=async ()=>{
            try {
                //console.log("TOKEN=>")
                const token =await commerce.checkout.generateToken(cart.id,{type:'cart'});
                // console.log("TOKEN=>"+{token})
                setCheckoutToken(token);
            }catch (error){
                 history.pushState('/')
            }
            
        }
        generateToken();
    }
    },[cart]);

    // const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next=(data)=>{
        setShippingData(data);
        nextStep();
    

    }

    const timeOut=()=>{
        setTimeout(()=>{
            setIsFinished(true);
        },3000)
    }




    let Confirmation =()=> order.customer ?(
        <>
         <div>
            <Typography variant='h5'>Thank You for YOUR purchase ,  {order.customer.firstname} {order.customer.lastname}!</Typography>
            <Divider className={classes.divider}/>
            <Typography variant='subtitle2'>Order ref : {order.customer_reference}</Typography>
         </div>
         <br/>
           <Button component={Link} to='/' variant='outlined' type="button"> BACK TO HOME</Button>
        </>
    ):( 
        
        isFinished ?(
            
            <>
         <div>
            <Typography variant='h5'>Thank You for YOUR purchase</Typography>
            <Divider className={classes.divider}/>
         </div>
         <br/>
           <Button component={Link} to='/' variant='outlined' type="button"> BACK TO HOME</Button>
        </>
        ):(
            <>
        <div className={classes.spinner}>
           <CircularProgress />
         </div>
          </> 
       )
       
    );                                             
       
    if (error) {
        Confirmation = () => (
          <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
          </>
        );
      }
    
    const Form=()=>(activeStep===0?<AddressForm checkoutToken={checkoutToken} nextStep={nextStep}  setshippingData={setShippingData}   next={next}/>:<PaymentForm checkoutToken={checkoutToken}  backStep={backStep} shippingData={shippingData}   onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} timeOut={timeOut}/>)
    return (
        <>
         <CssBaseline />
        <div className={classes.toolbar} />
        <main className={classes.layout}>
        <Paper className={classes.paper}>
            <Typography variant='h4' align='center' >CheckOut</Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
                {
                    steps.map((step)=>(
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))
                }
            </Stepper>
            {activeStep===steps.length ? <Confirmation/>:checkoutToken && <Form/>}
        </Paper>
        </main>
        </>
    )
}

export default CheckOut