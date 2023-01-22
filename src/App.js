import logo from './logo.svg';
import './App.css';
import React,{useEffect,useState}from 'react';
import Products from './Components/Products/Products';
import Navbar from './Components/Navbar/Navbar';
import Cart from './Components/Cart/Cart';
import CheckOut from './Components/CheckoutForm/CheckOut/CheckOut';
import {commerce} from './lib/commerce';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const App=() =>{
  const [products,setProduct]=useState([]);
  const [cart,setCart]=useState({});
  //const [totalItem,setItem]=useState(0);
  const [order,setOrder]=useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts =async () =>{
    const {data} =await commerce.products.list();
     setProduct(data);
  }

  const fetchCart =async ()=>{
    setCart(await commerce.cart.retrieve());
  }
   
  

  const handleAddtoCart=async(productId,quantity)=>{
    const item=await commerce.cart.add(productId,quantity);
    //console.log("ITEM"+typeof(item));
    // function logObjectKeys(object) {
      // for (const key in item) {
      //   console.log(key);
      // }
    // }
      setCart(item.total_items);
  }

  const handleUpdateCart= async (productId,quantity)=>{
     const item=await commerce.cart.update(productId,{quantity});
     setCart(item.total_items);
  }


  const handleRemoveCart=async (productId)=>{
     const item=await commerce.cart.remove(productId);
     setCart(item.total_items);
  }

  const handleEmptyCart = async()=>{
    const {item}=await commerce.cart.empty();
    setCart(item.total_items)
  }
 
  const refresh=async () =>{
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  }

  const handleCaptureCheckout = async (checkoutTokenId,newOrder)=>{
    try{
      const incomingOrder=await commerce.checkout.capture(checkoutTokenId,newOrder);

      setOrder(incomingOrder);
      refresh();
    }catch(error){
      setErrorMessage(error.data.error.message);
    }
  }

  useEffect(()=>{
    fetchProducts();
    fetchCart();
  },[]);
  //console.log(products);
  //  console.log("CART"+cart);
  //  for (const key in cart) {
  //       console.log("KEY"+key);
  //   }
if(cart.total_items){
  return (
    <Router>
      <div>
        <Navbar updateCartIcon={cart.total_items}/>
      <Routes>
        <Route exact path="/" element={<Products products={products}  AddtoCart={handleAddtoCart} handleUpdateCart/> }/>
        <Route exact path="/cart" element={ <Cart cart={cart} handleUpdateCart={handleUpdateCart} handleRemoveCart={handleRemoveCart} handleEmptyCart={handleEmptyCart}/>}/>
        <Route exact path="/checkout" element={<CheckOut cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage}/>}></Route>
        {/* <Route path="/checkout" exact>
              <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
        </Route> */}
      </Routes>
      </div>
    </Router>
    
    );
}
else if(typeof cart === 'number' && !isNaN(cart)){
  return (
    <Router>
      <div>
      <Navbar updateCartIcon={cart}/>
      <Routes>
        <Route exact path="/" element={<Products products={products}  AddtoCart={handleAddtoCart} handleUpdateCart/> }/>
        <Route exact path="/cart" element={ <Cart cart={cart} handleUpdateCart={handleUpdateCart} handleRemoveCart={handleRemoveCart} handleEmptyCart={handleEmptyCart}/>}/>
        <Route exact path="/checkout" element={<CheckOut cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage}/>}></Route>
        {/* <Route path="/checkout" exact>
              <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
        </Route> */}
      </Routes>
      </div>
    </Router>
    
    );
}else{
  return (
    <Router>
      <div>
      <Navbar updateCartIcon={cart.total_items}/>
      <Routes>
        <Route exact path="/" element={<Products products={products}  AddtoCart={handleAddtoCart} handleUpdateCart/> }/>
        <Route exact path="/cart" element={ <Cart cart={cart} handleUpdateCart={handleUpdateCart} handleRemoveCart={handleRemoveCart} handleEmptyCart={handleEmptyCart}/>}/>
        <Route exact path="/checkout" element={<CheckOut cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage}/>}></Route>
        {/* <Route path="/checkout" exact>
              <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
        </Route> */}
      </Routes>
      </div>
    </Router>
    
    );
}


// const productsElements = Object.keys(products).map(key => (
//   <div key={key} product={products[key]} AddtoCart={handleAddtoCart} handleUpdateCart={handleUpdateCart} />
// ));

// return (
//   <Router>
//     <div>
//       {cart.total_items ? (
//         <Navbar updateCartIcon={cart.total_items} />
//       ) : (
//         <Navbar updateCartIcon={cart} />
//       )}
//       <Routes>
//         <Route exact path="/" element={<div>{productsElements}</div>} />
//         <Route
//           exact
//           path="/cart"
//           element={<Cart cart={cart} handleUpdateCart={handleUpdateCart} handleRemoveCart={handleRemoveCart} handleEmptyCart={handleEmptyCart} />}
//         />
//         <Route
//           exact
//           path="/checkout"
//           element={<CheckOut cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />}
//         ></Route>
//         {/* <Route path="/checkout" exact>
//             <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
//       </Route> */}
//       </Routes>
//     </div>
//   </Router>
// );
}

export default App;
