import { Navigate, Outlet } from 'react-router-dom';
import { fetchByKey } from '../utils/storage.ts';
import type { ReactElement } from 'react';

function PrivateRoute(_props: any): ReactElement {
    const token: string = fetchByKey('token');
    const isAuthenticated = !!token;

    return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
}

export default PrivateRoute;
