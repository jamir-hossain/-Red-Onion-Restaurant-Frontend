import React from 'react';

const Cart = (props) => {
   const cart = props.selectedItem
   const total = cart.reduce( (defaultValue, food) => defaultValue + (food.price * food.quantity), 0)

   return (
      <div>
         
      </div>
   );
};

export default Cart;