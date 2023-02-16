import { useSelector,useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, clearCart, decreaseCart, removeFromCart,getTotals } from "../features/cartSlice";
import { useEffect } from "react";

const Cart = () => {
    const cart = useSelector((state => state.cart));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTotals());
      }, [cart, dispatch]);

    const handleRemoveFromCart = (cartItem) => {
        dispatch(removeFromCart(cartItem));
    };
    const handleDecreaseCart =(cartItem) => {
         dispatch(decreaseCart(cartItem));
    };
    const handleIncreaseCart =(cartItem) => {
        dispatch(addToCart(cartItem));
   };
   const handleClearCart = () => {
    dispatch(clearCart());
  };
    return(
    <div className="cartContainer">
        <h2>Shopping Cart</h2>
        { cart.cartItems.length === 0 ? ( 
            <div className="cartEmpty">
                <p>Your cart is currently empty</p>
                <div className="startShopping">
                    <Link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                    <span>Start Shopping</span>
                    </Link>
                </div>
            </div>
        ) : (
        <div className="cartMainContainer">
            <div className="titles">
                <h3 className="productTitle"><b>Product</b></h3>
                <h3 className="price"><b>Price</b></h3>
                <h3 className="quantity"><b>Quantity</b></h3>
                <h3 className="total"><b>Total</b></h3>
            </div>
            <div className="cartItems">
                {cart.cartItems?.map(cartItem=>(
                    <div className="cartItem" key= {cartItem.id}>
                        <div className="cartProduct">
                            <img src={cartItem.image} alt={cartItem.title}></img>
                            <div>
                                <h3>{cartItem.title}</h3>
                                <div className="cartRating">
                                <h4 className="dataCategory">{cartItem.category}</h4>
                                <span className='button1 m-2 p-1' ><b>{cartItem.rating.rate}</b>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg></span>
                                </div>
                                <p className="dataCategory">{cartItem.description}</p>
                                <button onClick={()=>handleRemoveFromCart(cartItem)}>Remove</button>
                            </div>
                        </div>
                        <span className="cartProductPrice">${cartItem.price}</span>
                        <div className="cartProductQuantity">
                            <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                            <div className="count">{cartItem.cartQuantity}</div>
                            <button onClick={() => handleIncreaseCart(cartItem)}>+</button>
                        </div>
                        <div className="cartProductTotalPrice">
                            ${cartItem.price * cartItem.cartQuantity}
                        </div>
                    </div>
                ))}
            </div>
            <div className="cartSummary">
                <button className="clearBtn" onClick={() => handleClearCart()}>Clear Cart</button>
                <div className="cartCheckout">
                    <div className="subtotal">
                        <span>Subtotal</span>
                        <span className="amount">?{cart.cartTotalAmount}</span>
                        <button>Check out</button>
                        <div className="continueShopping">
                            <Link to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                             <span>Continue Shopping</span>
                            </Link>
                        </div>  
                    </div>
                </div>
            </div>

        </div>
        )}

    </div>
    ); 
};
 
export default Cart;