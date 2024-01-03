import { ReactElement } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useAppSettingsStore } from '../../store/AppSettings.store.ts';
import { useUserStore } from '../../store/User.store.ts';
import { LoginRequest } from '../../generated/user_pb.ts';
import { errorNotification } from '../../utils/Notifications.ts';
import { useNavigate } from 'react-router-dom';

export default function Login(): ReactElement {
    const navigate = useNavigate();

    const { login } = useUserStore();
    const { setIsLoading } = useAppSettingsStore();

    const [api, contextHolder] = notification.useNotification();

    const loginError = errorNotification('Wrong email or password');

    async function onFinish(values: LoginRequest): Promise<void> {
        setIsLoading(true);
        const success = await login(values);
        setIsLoading(false);

        if (!success) {
            api['error'](loginError);
            return;
        }
        navigate('/');
    }

    return (
        <>
            {contextHolder}
            <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
