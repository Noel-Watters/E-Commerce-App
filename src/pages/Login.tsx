//Login.tsx
import { useState, FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import RegisterButton from "../components/RegisterButton"; 
import NavBar from "../components/NavBar";
import Row from "react-bootstrap/Row";
import { setUser } from "../redux/slices/UserSlice";
import GoogleSignInButton from "../components/GoogleSignInButton"; 
import MissingInfoPrompt from "../components/MissingInfoPrompt";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showMissingInfo, setShowMissingInfo] = useState(false);
  const [googleUserId, setGoogleUserId] = useState<string | null>(null);
  const [googleUserEmail, setGoogleUserEmail] = useState<string>("");
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
            name: userData.name || "",
            admin: userData.admin || false,
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

  const handleGoogleSignInResult = (user: { uid: string; email: string; displayName: string | null }) => {
  if (!user.displayName) {
    setGoogleUserId(user.uid);
    setGoogleUserEmail(user.email || "");
    setShowMissingInfo(true);
  } else {
    // proceed as normal
  }
};

const handleMissingInfoSubmit = async (name: string) => {
  if (!googleUserId) return;
  const userDocRef = doc(db, "users", googleUserId);
  await setDoc(userDocRef, { name }, { merge: true });
  // Optionally update Redux state here
  setShowMissingInfo(false);
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
        <GoogleSignInButton onSignInResult={handleGoogleSignInResult} /> {/* Google Sign-In button added here */}
        <RegisterButton /> {/*Register button added here*/}
      </Form>
      </Row>
      <MissingInfoPrompt
      show={showMissingInfo}
      onSubmit={handleMissingInfoSubmit}
      onClose={() => setShowMissingInfo(false)}
      email={googleUserEmail}
      />
    </Container>
  );
};



export default Login;