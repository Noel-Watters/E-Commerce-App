// src/components/GoogleSignInButton.tsx
import React from "react"; // Necessary for testing purposes
import { Button } from "react-bootstrap";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface GoogleSignInButtonProps {
  onSignInResult?: (user: { uid: string; email: string; displayName: string | null }) => void;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onSignInResult }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (onSignInResult) {
        onSignInResult({
          uid: user.uid,
          email: user.email || "",
          displayName: user.displayName || null,
        });
      }
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      let userData;
      if (userDoc.exists()) {
        userData = userDoc.data();
      } else {
        userData = {
          id: user.uid,
          email: user.email || "",
          name: user.displayName || "",
          admin: false,
        };
        await setDoc(userDocRef, userData);
      }
      dispatch(
        setUser({
          id: user.uid,
          email: user.email || "",
          name: userData.name || "",
          admin: userData.admin || false,
        })
      );
      alert("Login successful!");
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <Button variant="danger" type="button" className="me-2" onClick={handleGoogleSignIn}>
        Login with Google
      </Button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </>
  );
};

export default GoogleSignInButton;