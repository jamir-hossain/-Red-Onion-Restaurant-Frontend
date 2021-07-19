import foodData from '../../../foodData/foodData';
import { useContextData } from '../ContextProvider';

const CartHandler = () => {
   const {cart, setCart} = useContextData()

   // Product id generator
   const mongoObjectId = () =>{
      var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
      return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
          return (Math.random() * 16 | 0).toString(16);
      }).toLowerCase();
   };

   // console.log(cart)
   const addToCartHandler = (selectedFood) => {
      const _id = mongoObjectId()
      const newObj = {...selectedFood, _id}
      setCart([...cart, newObj])
      localStorage.setItem('cartFoods', JSON.stringify([...cart, newObj]));
   }

   // deleteCartFoodHandler
   const removeFromCartHandler = (foodId) => {
      const deletedFood = cart && cart.filter(food => food._id !== foodId)
      setCart(deletedFood)
      localStorage.setItem('cartFoods', JSON.stringify(deletedFood));
   }

   // Add Quantity
   const addQuantity = (foodId, quantity) => {
      console.log({foodId, quantity})
      const selectedFood = cart.find( data => data._id === foodId)
      selectedFood.quantity = quantity;

      const updatedFoods = cart.map(food => {
         if (food._id === foodId) {
            return selectedFood
         }else{
            return food
         }
      })
      setCart(updatedFoods)
      localStorage.setItem('cartFoods', JSON.stringify(updatedFoods));
   }

   // Remove Quantity
   const removeQuantity = (foodId, quantity) => {
      const selectedFood = cart.find( data => data._id === foodId)
      selectedFood.quantity = quantity;

      const updatedFoods = cart.map(food => {
         if (food._id === foodId) {
            return selectedFood
         }else{
            return food
         }
      })
      setCart(updatedFoods)
      localStorage.setItem('cartFoods', JSON.stringify(updatedFoods));
   }


   return {
      addToCartHandler,
      removeFromCartHandler,
      addQuantity,
      removeQuantity
   }
};

export default CartHandler;