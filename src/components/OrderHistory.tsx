//OrderHistory.tsx
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import DateFormatter from "./DateFormatter"; 
import { OrderItem, Order } from "../types/types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";




const OrderHistory = () => {
  const user = useSelector((state: RootState) => state.user.user); 
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
    <Container className="mt-5">
      <Row>
        <Col>
          <h2 className="mb-4 ">Order History</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {!error && orders.length === 0 && (
            <p>No orders found.</p>
          )}
        </Col>
      </Row>
      {orders.length > 0 && (
        <Row>
          {orders.map((order, index) => (
            <Col key={index} md={6} className="mb-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">
                    Order Date: <DateFormatter isoDate={order.orderDate} />
                  </h5>
                </div>
                <div className="card-body">
                  <Table striped bordered hover size="sm">
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
                  <h5 className="text-end mt-3">
                    Total Cost: $
                    {order.items
                      .reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </h5>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default OrderHistory;