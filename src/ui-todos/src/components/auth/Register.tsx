import { ReactElement } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useUserStore } from '../../store/User.store.ts';
import { useAppSettingsStore } from '../../store/AppSettings.store.ts';
import { errorNotification, successNotification } from '../../utils/Notifications.ts';
import type { NotificationMessage, NotificationType } from '../../types';

export default function Register(props: any): ReactElement {
    const { setIsRegisterSuccess } = props;

    const { register } = useUserStore();
    const { setIsLoading } = useAppSettingsStore();

    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();

    const registerSuccess = successNotification('Register completed, welcome aboard !');
    const registerError = errorNotification('The email already exists');

    function openNotification(type: NotificationType, message: NotificationMessage): void {
        api[type](message);
    }

    function validateRepeatPassword(value: string, getFieldValue: any): Promise<void> {
        if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
        }

        return Promise.reject(new Error('The confirm password does not match!'));
    }

    async function onFinish(values: any): Promise<void> {
        setIsLoading(true);
        const success = await register(values);
        setIsLoading(false);

        if (!success) {
            openNotification('error', registerError);
            return;
        }

        openNotification('success', registerSuccess);
        form.resetFields();
        setTimeout(() => {
            setIsRegisterSuccess(true);
        }, 2000);
    }

    return (
        <>
            {contextHolder}
            <Form name="register" form={form} onFinish={onFinish} layout="vertical">
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Repeat Password"
                    name="repeatPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!'
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                return validateRepeatPassword(value, getFieldValue);
                            }
                        })
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
