// Register.tsx
import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/UserSlice"; // Redux slice for user state
import { User } from "../types/types"; // Import User type
import { useNavigate } from "react-router-dom"; // For navigation
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>(""); // Name field
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Get the user ID from the created user
      const userId = userCredential.user.uid;

      // Create a user object based on the User type
      const newUser: User = {
        id: userId,
        name,
        email,
        admin: false, // Ensure new users are not admins by default
      };

      // Save the user document in Firestore
      await setDoc(doc(db, "users", userId), newUser);

      // Dispatch the user to Redux state
      dispatch(setUser(newUser));

      navigate("/");

      alert("Registration successful!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
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
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;