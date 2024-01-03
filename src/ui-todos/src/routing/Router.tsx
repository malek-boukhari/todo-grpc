import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Auth from '../components/auth';
import PrivateRoute from './PrivateRoute.tsx';
import Layout from '../components/Layout.tsx';
import TaskDetail from '../components/content/main/task-detail';
import TasksList from '../components/content/main/task-list';
import Settings from '../components/content/main/settings';

const routes: RouteObject[] = [
    {
        path: '/auth',
        element: <Auth />
    },
    {
        path: '/',
        element: <PrivateRoute />,
        children: [
            {
                path: '/',
                element: <Layout />,
                children: [
                    {
                        path: '',
                        element: <TasksList />
                    },
                    {
                        path: 'task/:id',
                        element: <TaskDetail />
                    },
                    {
                        path: '/settings',
                        element: <Settings />
                    }
                ]
            }
        ]
    }
];

const router = createBrowserRouter(routes);

export { router };
