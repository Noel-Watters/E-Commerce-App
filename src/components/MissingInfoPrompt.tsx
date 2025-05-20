// src/components/MissingInfoPrompt.tsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface MissingInfoPromptProps {
  show: boolean;
  onSubmit: (name: string) => void;
  onClose: () => void;
  email: string;
}

const MissingInfoPrompt: React.FC<MissingInfoPromptProps> = ({ show, onSubmit, onClose, email }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Complete Your Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} disabled />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Button className="mt-3" variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MissingInfoPrompt;