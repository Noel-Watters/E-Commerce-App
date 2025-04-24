import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../api/api';
import { setCategories, setSelectedCategory} from '../redux/slices/CategorySlice';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Col from 'react-bootstrap/Col';
import { Category } from '../types/types'; 

const CategoryFilter = () => {
    const dispatch = useDispatch();


    // Fetch categories using React Query
    const { data: categoryData } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    const { categories, selectedCategory } = useSelector((state: RootState) => state.categories);


    // Dispatch the fetched categories to Redux store
    useEffect(() => {
        if (categoryData) {
            dispatch(setCategories(categoryData.data));
        }
    }, [categoryData, dispatch]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSelectedCategory(e.target.value)); // Update selectedCategory in Redux
    };

    return (
<Col>
            <select value={selectedCategory || ''} onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                {categories.map((category: Category) => (
                    <option value={category} key={category}>
                        {category}
                    </option>
                ))}
            </select>
        </Col>
    );
};

export default CategoryFilter;