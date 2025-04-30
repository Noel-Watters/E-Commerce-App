import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import CartModal from '../components/ShoppingCart';
import Col from 'react-bootstrap/Col';
import { BsCart } from 'react-icons/bs';


const Header: React.FC = () => {
  const [showCart, setShowCart] = useState(false);

  return (
    <Col sm ={12} lg = {2}>
      <Button variant="secondary" onClick={() => setShowCart(true)}>
        <BsCart size={24} />
      </Button>
      <CartModal show={showCart} handleClose={() => setShowCart(false)} />
    </Col>
  );
};

export default Header;