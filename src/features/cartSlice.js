import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {                          //if we have items in local storage we
  cartItems: localStorage.getItem("cartItems")  // have to add them in our state
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {                        //
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id ===action.payload.id
      );  
      if(itemIndex >=0){
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(`increased ${state.cartItems[itemIndex].title} cart`, {         //toast message is added here
            position:"bottom-left",
        });
      } else{
        const tempProduct = {...action.payload,cartQuantity:1} // created due to product is duplicated
      state.cartItems.push(tempProduct);
      toast.success(`${action.payload.title} added to cart`, {         //toast message is added here thatis new product is added
        position:"bottom-left",
        });
       
      }
      localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
    },

    //removing item from our shopping cart
    removeFromCart(state,action){
      const nextCartItems=state.cartItems.filter(
      (cartItem) => cartItem.id!==action.payload.id
      );

      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
      toast.error(`${action.payload.title} removed from cart`, {         //toast message is added here thatis new product is added
        position:"bottom-left",
        });
    },
    decreaseCart(state,action){
      const itemIndex = state.cartItems.findIndex(
        cartItem => cartItem.id === action.payload.id
      )
      if(state.cartItems[itemIndex].cartQuantity > 1){
        state.cartItems[itemIndex].cartQuantity -= 1
        toast.error(`Decreased ${action.payload.title} cart quantity`, {         //toast message is added here thatis new product is added
          position:"bottom-left",
          });
      }else if(state.cartItems[itemIndex].cartQuantity === 1){
        const nextCartItems=state.cartItems.filter(
          (cartItem) => cartItem.id!==action.payload.id
          );
    
          state.cartItems = nextCartItems;
          
          toast.error(`${action.payload.title} removed from cart`, {         //toast message is added here thatis new product is added
            position:"bottom-left",
            });
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
      }
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("Cart cleared", { position: "bottom-left" });
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          
          if(action.payload!==state.cartItems){
            cartTotal.quantity += 1;
          }
          

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
 
}, 
});




export const { addToCart,removeFromCart,decreaseCart,clearCart, getTotals ,cartTotals } = cartSlice.actions;
export default cartSlice.reducer;
