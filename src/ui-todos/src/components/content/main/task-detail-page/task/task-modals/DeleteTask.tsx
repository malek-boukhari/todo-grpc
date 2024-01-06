import { JSX } from 'react';
import { Modal, notification, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { errorNotification, successNotification } from '../../../../../../utils/Notifications.ts';
import { useAppSettingsStore } from '../../../../../../store/AppSettings.store.ts';
import { useTaskStore } from '../../../../../../store/Task.store.ts';
import type { NotificationType, NotificationMessage } from '../../../../../../types';

function DeleteTask(): JSX.Element {
    const {
        currentTask,
        getTasks,
        getLastUpdatedTasks,
        setShowDeleteTask,
        showDeleteTask,
        deleteTask
    } = useTaskStore();
    const { setIsLoading } = useAppSettingsStore();

    const [api, contextHolder] = notification.useNotification();
    const { Text } = Typography;

    const deleteTaskSuccess = successNotification('The task has been deleted');
    const deleteTaskError = errorNotification('The task could not be deleted!');

    function openNotification(type: NotificationType, message: NotificationMessage): void {
        api[type](message);
    }

    function closeModal(): void {
        setShowDeleteTask(false);
    }

    async function remove(): Promise<void> {
        if (!currentTask) {
            return;
        }

        setIsLoading(true);
        const isDeleted = await deleteTask(currentTask?.Id);

        if (isDeleted) {
            openNotification('success', deleteTaskSuccess);
            await getTasks('');
            await getLastUpdatedTasks();
        } else {
            openNotification('error', deleteTaskError);
        }

        setIsLoading(false);
        closeModal();
    }

    return (
        <Modal
            open={showDeleteTask}
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
                    Confirming will permanently delete the task:{' '}
                    <Text strong>{currentTask?.title}</Text>
                </Text>
            </div>
        </Modal>
    );
}

export default DeleteTask;
