//RegisterButton.tsx
import React from 'react'; //Necessary for testing purposes
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';



  
const RegisterButton = () => { 
        const navigate = useNavigate();

    const handleRegisterRedirect = () => {
        navigate("/register");
    };
return (
          <Button variant="secondary" onClick={handleRegisterRedirect}>
              Register
          </Button>
      )
}
  
export default RegisterButton;
  