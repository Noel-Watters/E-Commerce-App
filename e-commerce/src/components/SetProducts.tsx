import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector} from 'react-redux';
import { fetchProducts } from '../api/api';
import { setProducts } from '../redux/slices/PorductSlice';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { RootState } from '../redux/store';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/types';
import { Spinner } from 'react-bootstrap'; 



const SetProducts = () => {
    const dispatch = useDispatch();

    // Fetch products using React Query
    const { data: productsData, isLoading, isError } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    // Access products from Redux store
    const products = useSelector((state: RootState) => state.products.products);
    const selectedCategory = useSelector((state: RootState) => state.categories.selectedCategory);


    // Dispatch the fetched products to Redux store
    useEffect(() => {
        if (productsData) {
            dispatch(setProducts(productsData.data));
        }
    }, [productsData, dispatch]);

        // Filter products based on the selected category
        const filteredProducts = selectedCategory
        ? products.filter((product: Product) => product.category === selectedCategory)
        : products;

        if (isLoading) {
            return (
                <Col className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Col>
            );
        }
        if (isError) {
            return <p>Error loading data. Please try again later.</p>;
        }

    return (
        <Row className="g-4"> {/* Add spacing between rows */}
            {filteredProducts.map((product: Product) => (
                <Col key={product.id} xs={12} sm={6} md={4}> {/* Responsive grid: 3 cards per row on medium screens */}
                    <ProductCard product={product} />
                </Col>
            ))}
        </Row>
    );
};

export default SetProducts;