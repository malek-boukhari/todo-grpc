import React, { JSX, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Breadcrumb, Layout as AppLayout, theme } from 'antd';
import Navbar from './layout/Navbar.tsx';
import Sidebar from './layout/Sidebar.tsx';
import CreateTask from './content/sidebar/tasks/CreateTask.tsx';
import CreateCategory from './content/sidebar/categories/CreateCategory.tsx';
import EditCategory from './content/sidebar/categories/EditCategory.tsx';
import DeleteCategory from './content/sidebar/categories/DeleteCategory.tsx';
import Spinner from './common/Spinner.tsx';
import { useTaskStore } from '../store/Task.store.ts';
import { useLocation } from 'react-router';

interface CustomBreadcrumbItem {
    title: React.ReactNode;
}

function Layout(): JSX.Element {
    const location = useLocation();

    const { currentTask } = useTaskStore();

    const { Content } = AppLayout;
    const { useToken } = theme;
    const { colorBgContainer } = useToken().token;

    const [showSettingsBreadcrumb, setShowSettingsBreadcrumb] = useState<boolean>(false);

    const isHomePage = location.pathname === '/';

    useEffect(() => {
        setShowSettingsBreadcrumb(location.pathname === '/settings');
    }, [location.pathname]);

    const breadcrumbItems: CustomBreadcrumbItem[] = [
        {
            title: isHomePage ? 'Home' : <Link to={''}>Home</Link>
        },
        !!currentTask && {
            title: 'Task'
        },
        showSettingsBreadcrumb && {
            title: 'Settings'
        }
    ].filter(Boolean) as CustomBreadcrumbItem[];

    return (
        <div style={{ height: '100%' }}>
            <AppLayout style={{ height: '100%' }}>
                <Navbar />
                <AppLayout
                    style={{ padding: '24px 0', marginTop: 16, background: colorBgContainer }}
                >
                    <Spinner />
                    <Sidebar />
                    <CreateCategory />
                    <EditCategory />
                    <DeleteCategory />
                    <CreateTask />

                    <Content
                        style={{
                            padding: '8px 32px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 24
                        }}
                    >
                        <Breadcrumb items={breadcrumbItems} />
                        <Outlet />
                    </Content>
                </AppLayout>
            </AppLayout>
        </div>
    );
}

export default Layout;
