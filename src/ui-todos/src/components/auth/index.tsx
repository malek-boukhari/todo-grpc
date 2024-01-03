import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsProps } from 'antd';
import { useUserStore } from '../../store/User.store.ts';
import Login from './Login.tsx';
import Register from './Register.tsx';

export default function Auth(): ReactElement {
    const navigate = useNavigate();

    const { token } = useUserStore();

    const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>('login');

    // Redirect the user to home page if the token is present
    useEffect(() => {
        if (!token) {
            return;
        }

        navigate('/');
    }, [token]);

    useEffect(() => {
        if (isRegisterSuccess) {
            setActiveTab('login');
        }
    }, [isRegisterSuccess]);

    const tabItems: TabsProps['items'] = [
        {
            key: 'login',
            label: 'Login',
            children: <Login />
        },
        {
            key: 'register',
            label: 'Register',
            children: <Register setIsRegisterSuccess={setIsRegisterSuccess} />
        }
    ];

    return (
        <div style={{ width: '300px', margin: '80px auto 0' }}>
            <Tabs
                activeKey={activeTab}
                tabPosition="top"
                items={tabItems}
                onTabClick={(key, _e) => setActiveTab(key)}
            />
        </div>
    );
}
