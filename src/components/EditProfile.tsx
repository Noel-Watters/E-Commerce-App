//EditProfile.tsx
import { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";
import { updateEmail } from "firebase/auth";
import EditProfileModal from "./EditProfileModal";
import { EditProfileProps } from "../types/types";

const EditProfile = ({ show, onHide, user, setUser }: EditProfileProps) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [error, setError] = useState<string | null>(null);

  const handleEditSubmit = async () => {
    try {
      if (auth.currentUser) {
        // Update email in Firebase Authentication
        await updateEmail(auth.currentUser, email);

        // Update user data in Firestore
        const userDocRef = doc(db, "users", user?.id || "");
        await updateDoc(userDocRef, { name, email });

        // Update the user state in Redux
        setUser({ id: user?.id || "", name, email });

        alert("Profile updated successfully!");
        onHide();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <EditProfileModal
      show={show}
      onHide={onHide}
      name={name}
      email={email}
      error={error}
      setName={setName}
      setEmail={setEmail}
      handleEditSubmit={handleEditSubmit}
    />
  );
};

export default EditProfile;

