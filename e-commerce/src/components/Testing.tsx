import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
//import Table from "react-bootstrap/Table";
//import Alert from "react-bootstrap/Alert";

interface OrderItem {
    id: string;
    //title: string;
    //price: number;
    //quantity: number;
  }

const LogOrderIDs = () => {

    const user = useSelector((state: RootState) => state.user.user); // Get user info from Redux
    const [orders, setOrders] = useState<OrderItem[]>([]);
    //const [totalCost, setTotalCost] = useState<number>(0);
    //const [error, setError] = useState<string | null>(null);

    console.log("User from Redux:", user); // Log user info
    console.log("User Email:", user?.email); // Log user email

    useEffect(() => {
        const fetchData = async () => {
        const querydoc = await getDocs(collection(db, 'orders'));
        console.log ("Quearydoc:", querydoc.docs.map((doc) => doc.id)); // Log all document IDs
          const querySnapshot = await getDocs(collection(db, 'orders', 'noelwatters757@gmail.com_2025-04-29T15:23:25.619Z', 'UserOrder'));
          console.log("Orders Snapshot Size:", querySnapshot.size); // Log snapshot size
          const dataArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as OrderItem[];
          setOrders(dataArray);
        };
    
        fetchData();
      }, []);
    
    
    
    
      return (
        <div>
            <h1>Product IDs</h1>    
            <ul>
                {orders.map((product) => (
                    <li key={product.id}>
                     ID: {product.id}
                    </li>
                ))}
            </ul>
        </div>
        );
    }

export default LogOrderIDs;

