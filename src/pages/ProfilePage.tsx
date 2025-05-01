// ProfilePage.tsx
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { auth, db } from "../firebase/firebaseConfig";
import { sendPasswordResetEmail, deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { clearUser, setUser } from "../redux/slices/UserSlice";
import NavBar from "../components/NavBar";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import EditProfile from "../components/EditProfile";
import { useNavigate } from "react-router-dom";
import { User } from "../types/types"; 
import OrderHistory from "../components/OrderHistory";

const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResetPassword = async () => {
    try {
      if (auth.currentUser?.email) {
        await sendPasswordResetEmail(auth, auth.currentUser.email);
        alert("Password reset email sent!");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      try {
        if (auth.currentUser) {
          // Delete user data from Firestore
          const userDocRef = doc(db, "users", user?.id || "");
          await deleteDoc(userDocRef);

          // Delete user from Firebase Authentication
          await deleteUser(auth.currentUser);

          // Clear user state in Redux
          dispatch(clearUser());

          alert("Account deleted successfully!");
          navigate("/"); // Redirect to home page after deletion
        }
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const updateUserState = (updatedUser: User) => {
    dispatch(setUser(updatedUser)); // Update the user state in Redux
  };

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <h1>Profile Page</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>User ID:</strong> {user?.id}</p>
        <Button variant="primary" className="me-2" onClick={() => setShowEditModal(true)}>
          Edit Profile
        </Button>
        <Button variant="secondary" className="me-2" onClick={handleResetPassword}>
          Reset Password
        </Button>
        <Button variant="danger" onClick={handleDeleteAccount}>
          Delete Account
        </Button>
      </div>

      {/* Edit Profile Modal */}
      <EditProfile
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        user={user}
        setUser={updateUserState}
        />
      <div className="container mt-5">
      <OrderHistory />
      </div>
  
    </>
  );
};

export default ProfilePage;