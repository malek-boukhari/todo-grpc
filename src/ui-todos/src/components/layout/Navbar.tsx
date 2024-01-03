import { JSX, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Layout, MenuProps, Switch, theme } from 'antd';
import Avatar, { genConfig } from 'react-nice-avatar';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Moon, Sun } from 'react-bootstrap-icons';
import { useUserStore } from '../../store/User.store.ts';
import { useAppSettingsStore } from '../../store/AppSettings.store.ts';
import { persistByKey } from '../../utils/storage.ts';
import AppLogo from '../common/AppLogo.tsx';

function Navbar(): JSX.Element {
    const navigate = useNavigate();

    const { currentUser, clearCurrentUser } = useUserStore();
    const { isDarkMode, setIsDarkMode } = useAppSettingsStore();

    const { Header } = Layout;
    const { token } = theme.useToken();
    const { colorBgContainer, boxShadow } = token;

    const config = currentUser?.avatar ? genConfig(currentUser.avatar) : '';

    // Change the background color of the body when theme changes
    useEffect(() => {
        document.body.style.backgroundColor = token.colorBgContainer;
    }, [token.colorBgContainer]);

    function onChange(checked: boolean): void {
        setIsDarkMode(checked);
        persistByKey('is_dark_mode', checked);
    }

    function logout(): void {
        clearCurrentUser();
        navigate('/auth');
    }

    const menuItems: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div
                    style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '8px 0' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Sun /> <Switch checked={isDarkMode} onChange={(e) => onChange(e)} /> <Moon />
                </div>
            )
        },
        {
            key: '2',
            label: (
                <Link
                    to={'/settings'}
                    style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '8px 0' }}
                >
                    <SettingOutlined />
                    <span>Settings</span>
                </Link>
            )
        },
        {
            key: '3',
            label: (
                <a
                    onClick={logout}
                    style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '8px 0' }}
                >
                    <LogoutOutlined />
                    <span>Logout</span>
                </a>
            )
        }
    ];

    return (
        <Header
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '16px',
                background: colorBgContainer,
                boxShadow
            }}
        >
            <AppLogo />
            <Dropdown
                menu={{ items: menuItems }}
                placement="bottom"
                trigger={['click']}
                overlayStyle={{}}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Avatar
                        {...config}
                        style={{ width: '3rem', height: '3rem', marginLeft: 'auto' }}
                    />
                </a>
            </Dropdown>
        </Header>
    );
}

export default Navbar;
