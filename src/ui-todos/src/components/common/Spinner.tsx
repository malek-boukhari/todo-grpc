import { JSX } from 'react';
import { Spin, theme } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function Spinner(): JSX.Element {
    const { token } = theme.useToken();

    return (
        <div>
            <Spin
                fullscreen
                spinning={true}
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
