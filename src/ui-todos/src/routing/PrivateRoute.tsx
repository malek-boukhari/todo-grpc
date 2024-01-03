import { Navigate, Outlet } from 'react-router-dom';
import { fetchByKey } from '../utils/storage.ts';

const PrivateRoute = (_props: any) => {
    const token: string = fetchByKey('token');
    const isAuthenticated = !!token;

    return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoute;
