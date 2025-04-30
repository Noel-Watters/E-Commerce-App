import { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";
import { updateEmail } from "firebase/auth";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { User } from "../types/types";

interface EditProfileProps {
  show: boolean;
  onHide: () => void;
  user: User | null;
  setUser: (updatedUser: User) => void;
  
}

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
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfile;

