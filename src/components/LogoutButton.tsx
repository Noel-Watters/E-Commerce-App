//LogoutButton.tsx
import Button from 'react-bootstrap/Button';
import { signOut } from 'firebase/auth';
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/slices/UserSlice";

const LogoutButton = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const dispatch = useDispatch();


  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser()); // Clear the user state in Redux
      alert("Logged out!");
      navigate("/"); // Redirect to the home page after logout
    } catch (err: any) {
      console.error("Logout error:", err.message);
    }
  };

  return (
    <Button variant="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;


