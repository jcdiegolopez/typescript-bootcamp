
import { Navigate } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import SearchLayout from '../layouts/SearchLayout';

export const routes = [
    {
        path: '/search', element: <MainLayout/>, children: [
            { path: '', element: <SearchLayout/>},
            { path: 'product/:id', element: <p>Product</p> }
        ]
    },
    { path: '*', element: <Navigate to="/search" /> } 
]