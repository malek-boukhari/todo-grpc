import { JSX } from 'react';
import { Spin, theme } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useAppSettingsStore } from '../../store/AppSettings.store.ts';

function Spinner(): JSX.Element {
    const { isLoading } = useAppSettingsStore();

    const { token } = theme.useToken();

    return (
        <div>
            <Spin
                fullscreen
                spinning={isLoading}
                delay={0}
                style={{
                    background: token.colorBgBase
                }}
                indicator={
                    <LoadingOutlined
                        style={{
                            fontSize: 32
                        }}
                    />
                }
            />
        </div>
    );
}

export default Spinner;
