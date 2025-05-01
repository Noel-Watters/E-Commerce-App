// I want to take the orders we made from the Checkout.tsx component and display them in the OrderHistory.tsx component.
// it should be very simple with Item : Quntity : Price
// I would also like to include a total cost at the bottom of the page
// I would like to use Bootstrap for all formatting

import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import DateFormatter from "./DateFormatter"; // Import the reusable DateFormatter component
import { OrderItem, Order } from "../types/types";



const OrderHistory = () => {
  const user = useSelector((state: RootState) => state.user.user); // Get user info from Redux
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setError("You must be logged in to view your order history.");
        return;
      }

      try {
        const userOrders: Order[] = [];

        // Fetch all orders for the logged-in user
        const ordersCollection = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersCollection);

        // Loop through each order document
        for (const orderDoc of ordersSnapshot.docs) {
          // Check if the document ID includes the user's email
          if (orderDoc.id.includes(user.email)) {
            const orderData = orderDoc.data();
            const orderDate = orderData.orderDate || "Unknown Date";

            const userOrderCollection = collection(orderDoc.ref, "UserOrder");
            const userOrderSnapshot = await getDocs(userOrderCollection);

            const items: OrderItem[] = [];
            if (!userOrderSnapshot.empty) {
              userOrderSnapshot.forEach((itemDoc) => {
                const itemData = itemDoc.data() as OrderItem;
                items.push(itemData);
              });
            }

            userOrders.push({ orderDate, items });
          }
        }

        setOrders(userOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch order history. Please try again.");
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Order History</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {!error && orders.length === 0 && <p>No orders found.</p>}
      {orders.length > 0 && (
        <>
          {orders.map((order, index) => (
            <div key={index} className="mb-4">
              <h4>
                Order Date: <DateFormatter isoDate={order.orderDate} />
              </h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      <td>{item.title}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <h5 className="mt-2">
                Total Cost: $
                {order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
              </h5>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default OrderHistory;