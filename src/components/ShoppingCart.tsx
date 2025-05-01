// ShoppingCart.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart, updateQuantity } from '../redux/slices/CartSlice';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Checkout from './Checkout'; 

interface CartModalProps {
  show: boolean;
  handleClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th style={{ width: "10%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      style={{ width: "60px" }} // Limit input field width
                      onChange={(e) =>
                        dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))
                      }
                    />
                  </td>
                  <td>${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                  <td className="text-nowrap">
                    <Button variant="danger" size='sm' onClick={() => dispatch(removeFromCart(item.id))}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <h5>Total: ${totalPrice.toFixed(2)}</h5>
        <Checkout />
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
