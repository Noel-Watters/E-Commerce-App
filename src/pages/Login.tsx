//Login.tsx
import { useState, FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import RegisterButton from "../components/RegisterButton"; 
import NavBar from "../components/NavBar";
import Row from "react-bootstrap/Row";
import { setUser } from "../redux/slices/UserSlice";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
      const user = userCredential.user;
  
      // Fetch user data from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        dispatch(
          setUser({
            id: user.uid,
            email: user.email || "",
            name: userData.name || "", // Fetch the name from Firestore
          })
        );
      } else {
        console.error("No such user document in Firestore!");
      }
  
      alert("Login successful!");
      navigate("/"); // Redirect to home page after successful login
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (

    <Container >
      <Row>
          <NavBar />
      </Row>
      <Row>
      <h2 className="mb-4">Login</h2>
      <p className="mb-4">Please enter your email and password to login.</p>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="me-2">
          Login
        </Button>
        <RegisterButton />
      </Form>
      </Row>
    </Container>
  );
};

export default Login;