
import { Navigate } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import SearchLayout from '../layouts/SearchLayout';
import ProductDetails from '../components/ProductDetail';

export const routes = [
    {
        path: '/search', element: <MainLayout/>, children: [
            { path: '', element: <SearchLayout/>}
            
        ]
    },
    { path: 'product/:id', element: <ProductDetails/> },
    { path: '*', element: <Navigate to="/search" /> } 
]