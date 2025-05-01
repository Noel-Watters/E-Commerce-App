//RegisterPage.tsx
import Container from 'react-bootstrap/Container';
import  Row  from "react-bootstrap/Row";
import  Col  from "react-bootstrap/Col";
import Navbar from '../components/NavBar';
import Register from '../components/Register';


const RegisterPage = () => {



    return (
        <Container>
            <Navbar />
            <Row>
                <Col>
                    <Register />
                </Col>
            </Row>
        </Container>

    );
}
export default RegisterPage;