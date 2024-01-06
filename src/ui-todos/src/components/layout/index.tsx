import React from 'react';
import { useLocation } from 'react-router';
import { Link, Outlet } from 'react-router-dom';
import { Breadcrumb, Layout as AppLayout, theme } from 'antd';
import { useTaskStore } from '../../store/Task.store.ts';
import Navbar from './Navbar.tsx';
import Sidebar from './Sidebar.tsx';
import type { JSX } from 'react';

interface CustomBreadcrumbItem {
    title: React.ReactNode;
}

function Index(): JSX.Element {
    const location = useLocation();

    const { currentTask } = useTaskStore();

    const { Content } = AppLayout;
    const { useToken } = theme;
    const { colorBgContainer } = useToken().token;

    const isHomePage = location.pathname === '/';
    const isSettingsPage = location.pathname === '/settings';

    const breadcrumbItems: CustomBreadcrumbItem[] = [
        {
            title: isHomePage ? 'Home' : <Link to={''}>Home</Link>
        },
        !!currentTask && {
            title: 'Task'
        },
        isSettingsPage && {
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
                    <Sidebar />
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

export default Index;
