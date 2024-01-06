import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Auth from '../components/auth';
import PrivateRoute from './PrivateRoute.tsx';
import Layout from '../components/layout';
import TaskDetailPage from '../components/content/main/task-detail-page';
import TaskListPage from '../components/content/main/task-list-page';
import SettingsPage from '../components/content/main/settings-page';

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
                        element: <TaskListPage />
                    },
                    {
                        path: 'task/:id',
                        element: <TaskDetailPage />
                    },
                    {
                        path: '/settings',
                        element: <SettingsPage />
                    }
                ]
            }
        ]
    }
];

const router = createBrowserRouter(routes);

export { router };
