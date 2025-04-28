 import Button from 'react-bootstrap/Button';
 import { signOut } from 'firebase/auth';
 import { auth } from "../firebase/firebaseConfig";
 
 const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out!");
    } catch (err: any) {
      console.error("Logout error:", err.message);
    }
  };

  const LogoutButton = () => { 
    return (
        <Button variant="secondary" onClick={handleLogout}>
            Logout
        </Button>
    )
  }

  export default LogoutButton;
