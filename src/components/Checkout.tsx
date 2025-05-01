import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { clearCart } from "../redux/slices/CartSlice"; // Action to clear the cart
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc} from "firebase/firestore"; // Use setDoc and collection for nested structure
import Button from "react-bootstrap/Button";
import { useState } from "react";

const Checkout = () => {
  const cart = useSelector((state: RootState) => state.cart.items); // Get cart items from Redux
  const user = useSelector((state: RootState) => state.user.user); // Get user info from Redux
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!user) {
      alert("You must be logged in to place an order.");
      return;
    }

    try {
        // Create a new document in the /orders collection with the user's email and current date as the document ID
        const orderId = `${user.email}_${new Date().toISOString()}`;
        const orderDocRef = doc(db, "orders", orderId);
  
        // Add the user's email to the order document
        await setDoc(orderDocRef, {
          userEmail: user.email,
          orderDate: new Date().toISOString(),
        });
  
        // Add a subcollection called UserOrder inside the order document
        const userOrderCollectionPath = `orders/${orderId}/UserOrder`;

      // Add each item in the cart to the UserOrder subcollection
      for (const item of cart) {
        const itemDocRef = doc(db, userOrderCollectionPath, item.id.toString()); // Correctly reference the document
        await setDoc(itemDocRef, {
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        });
      }

      // Clear the cart
      dispatch(clearCart());

      // Show success message
      setSuccessMessage("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      setSuccessMessage("Failed to place order. Please try again.");
    }
  };

  return (
    <>
      {successMessage && <p className="text-success">{successMessage}</p>}
      <Button variant="success" onClick={handleCheckout} disabled={cart.length === 0}>
        Checkout
      </Button>
    </>
  );
};

export default Checkout;