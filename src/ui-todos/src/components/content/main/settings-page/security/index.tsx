import { JSX, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useUserStore } from '../../../../../store/User.store.ts';
import { useAppSettingsStore } from '../../../../../store/AppSettings.store.ts';
import styles from './styles.module.css';

function Security(): JSX.Element {
    const { currentUser, updatePassword } = useUserStore();
    const { setIsLoading } = useAppSettingsStore();

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [repeatPasswordVisible, setRepeatPasswordVisible] = useState<boolean>(false);

    const { Password } = Input;

    function validateRepeatPassword(value: string, getFieldValue: any): Promise<void> {
        if (!value || getFieldValue('newPassword') === value) {
            return Promise.resolve();
        }

        return Promise.reject(new Error('The confirm password does not match!'));
    }

    async function onFinish(values: any): Promise<void> {
        if (!values.newPassword) {
            return;
        }
        setIsLoading(true);

        await updatePassword(currentUser.Id, {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword
        });

        setIsLoading(false);
    }

    return (
        <section className={styles.container}>
            <Form onFinish={onFinish} layout="vertical">
                <Form.Item
                    name={['currentPassword']}
                    label={'Current password'}
                    rules={[{ required: true }]}
                >
                    <Password
                        placeholder={'Enter current password'}
                        visibilityToggle={{
                            visible: passwordVisible,
                            onVisibleChange: setPasswordVisible
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name={['newPassword']}
                    label={'New password'}
                    rules={[{ required: true }]}
                >
                    <Password
                        placeholder={'Enter new password'}
                        visibilityToggle={{
                            visible: passwordVisible,
                            onVisibleChange: setPasswordVisible
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name={['repeat']}
                    label={'Repeat password'}
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
                    <Password
                        placeholder={'Enter new password'}
                        visibilityToggle={{
                            visible: repeatPasswordVisible,
                            onVisibleChange: setRepeatPasswordVisible
                        }}
                    />
                </Form.Item>

                <Form.Item className={styles.submitButton}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </section>
    );
}

export default Security;
