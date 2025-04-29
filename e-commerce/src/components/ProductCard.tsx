
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Product } from '../types/types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/CartSlice';


const ProductCard:React.FC<{product: Product}> = ({product}) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product)); // Dispatch the addToCart action with the product
    };

        // Dynamically adjust font size based on description length
        const getDescriptionFontSize = (description: string) => {
            if (description.length > 150) return '0.8rem'; // Smaller font for long descriptions
            if (description.length > 100) return '1rem'; // Medium font for moderate descriptions
            return '1.2rem'; // Larger font for short descriptions
        };


    return (                        
    <Card className="shadow-sm">
        <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text >
                Category: {product.category}
            </Card.Text>
            <Card.Text>
                ${product.price.toFixed(2)}
            </Card.Text>
            <Card.Img variant="top" src={product.image} alt={product.title} 
            style={{ height: '200px', objectFit: 'contain' }} />
            <Card.Text 
            className = "font-weight-light"
             style={{ fontSize: getDescriptionFontSize(product.description) }}
            >
                {product.description}
            </Card.Text>
            <Button variant="primary" className="mt-2" onClick={handleAddToCart}>
                Add to Cart
            </Button>
        </Card.Body>
    </Card>

    );
};

export default ProductCard;