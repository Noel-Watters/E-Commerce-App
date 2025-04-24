
import Container from 'react-bootstrap/Container';
import  Row  from "react-bootstrap/Row";
import  Col  from "react-bootstrap/Col";
import SetProducts from '../components/SetProducts';
import CategoryFilter from '../components/categoryFilter';
import CartButton from '../components/CartButton';




const Home = () => {



    return (
        <Container>
            <Row className="py-3">
                <Col sm ={12} lg = {10}>
                <h1> Fake E-Commerce App</h1>
                </Col>
                <CartButton />
            </Row>
            <Row>
                <CategoryFilter />
            </Row>
                <SetProducts />
        </Container>

    );
}
export default Home;