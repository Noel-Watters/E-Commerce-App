//Homepage.tsx
import Container from 'react-bootstrap/Container';
import  Row  from "react-bootstrap/Row";
import  Col  from "react-bootstrap/Col";
import SetProducts from '../components/SetProducts';
import CategoryFilter from '../components/categoryFilter';
import Navbar from '../components/NavBar';




const Home = () => {

    return (
        <Container>
            <Navbar />
            <Row className="py-3">
                <Col sm ={12} lg = {10}>
                <h1> Fake Store - Not real Transactions</h1>
                </Col>
            </Row>
            <Row>
                <CategoryFilter />
            </Row>
                <SetProducts />
        </Container>

    );
}
export default Home;