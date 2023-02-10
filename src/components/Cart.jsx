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
        <div>
            <div className="titles">
                <h3 className="productTitle">Product</h3>
                <h3 className="price">Price</h3>
                <h3 className="quantity">Quantity</h3>
                <h3 className="total">Total</h3>
            </div>
            <div className="cartItems">
                {cart.cartItems?.map(cartItem=>(
                    <div className="cartItem" key= {cartItem.id}>
                        <div className="cartProduct">
                            <img src={cartItem.image} alt={cartItem.title}></img>
                            <div>
                                <h3>{cartItem.title}</h3>
                                <h3>{cartItem.category}</h3>
                                <button onClick={()=>handleRemoveFromCart(cartItem)}>Remove</button>
                            </div>
                        </div>
                        <div className="cartProductPrice">${cartItem.price}</div>
                        <div className="cardProductQuantity">
                            <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                            <div className="count">{cartItem.cartQuantity}</div>
                            <button onClick={() => handleIncreaseCart(cartItem)}>+</button>
                        </div>
                        <div className="cartProductTotalPrize">
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
                        <span className="amount">${cart.cartTotalAmount}</span>
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