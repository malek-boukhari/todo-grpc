import { JSX } from 'react';
import { Modal, notification, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { useUserStore } from '../../../../../store/User.store.ts';
import { errorNotification, successNotification } from '../../../../../utils/Notifications.ts';
import { useAppSettingsStore } from '../../../../../store/AppSettings.store.ts';
import { useNavigate } from 'react-router-dom';
import type { NotificationType, NotificationMessage } from '../../../../../types';

function DeleteUser(): JSX.Element {
    const navigate = useNavigate();

    const { currentUser, deleteUser, clearCurrentUser, showDeleteUser, setShowDeleteUser } =
        useUserStore();
    const { setIsLoading } = useAppSettingsStore();

    const [api, contextHolder] = notification.useNotification();
    const { Text } = Typography;

    const deleteUserSuccess = successNotification('The account has been deleted');
    const deleteUserError = errorNotification('The account could not be deleted!');

    function openNotification(type: NotificationType, message: NotificationMessage): void {
        api[type](message);
    }

    function closeModal(): void {
        setShowDeleteUser(false);
    }

    async function remove(): Promise<void> {
        setIsLoading(true);
        const isDeleted = await deleteUser(currentUser.Id);
        setIsLoading(false);

        if (!isDeleted) {
            openNotification('error', deleteUserError);
            closeModal();
            return;
        }

        openNotification('success', deleteUserSuccess);
        closeModal();
        setTimeout(() => {
            clearCurrentUser();
            navigate('/auth');
        }, 2000);
    }

    return (
        <Modal
            open={showDeleteUser}
            onCancel={closeModal}
            onOk={remove}
            okType={'danger'}
            okText={'Delete'}
            cancelText={'Cancel'}
        >
            {contextHolder}
            <Title level={4} style={{ marginTop: 0, marginBottom: 24 }}>
                Are you sure?
            </Title>
            <div style={{ marginBottom: 32 }}>
                <Text>
                    By confirming, you acknowledge that the action will permanently delete your
                    account, along with all associated{' '}
                    <Text strong>tasks, todos, and categories. This action is irreversible</Text>.
                </Text>
            </div>
        </Modal>
    );
}

export default DeleteUser;
