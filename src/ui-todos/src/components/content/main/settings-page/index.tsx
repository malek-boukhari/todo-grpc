import React, { JSX } from 'react';
import { Collapse, CollapseProps, theme, Typography } from 'antd';
import Security from './security';
import ChangeAvatar from './avatar';
import AppSettings from './app-settings';
import Account from './account';

function SettingsPage(): JSX.Element {
    const { token } = theme.useToken();
    const { Title } = Typography;

    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: token.colorBgBase,
        borderRadius: 8,
        border: 'none'
    };

    function beautifyLabel(title: string): JSX.Element {
        return (
            <Title level={5} style={{ margin: '0' }}>
                {title}
            </Title>
        );
    }

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: beautifyLabel('App settings'),
            children: <AppSettings />,
            style: panelStyle
        },
        {
            key: '2',
            label: beautifyLabel('Avatar'),
            children: <ChangeAvatar />,
            style: panelStyle
        },
        {
            key: '3',
            label: beautifyLabel('Security'),
            children: <Security />,
            style: panelStyle
        },
        {
            key: '4',
            label: beautifyLabel('Account'),
            children: <Account />,
            style: panelStyle
        }
    ];

    return (
        <section>
            <div style={{ maxWidth: 800, margin: '0 auto 40px' }}>
                <Collapse
                    items={items}
                    defaultActiveKey={['1']}
                    bordered={false}
                    destroyInactivePanel={true}
                    style={{ background: token.colorBgContainer }}
                />
            </div>
        </section>
    );
}

export default SettingsPage;
