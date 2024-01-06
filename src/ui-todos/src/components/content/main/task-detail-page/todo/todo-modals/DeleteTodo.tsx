import { JSX } from 'react';
import { Modal, notification, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { errorNotification, successNotification } from '../../../../../../utils/Notifications.ts';
import type { NotificationMessage, NotificationType } from '../../../../../../types';
import { useTodoStore } from '../../../../../../store/Todo.store.ts';
import { useAppSettingsStore } from '../../../../../../store/AppSettings.store.ts';
import { useTaskStore } from '../../../../../../store/Task.store.ts';

function DeleteTodo(): JSX.Element {
    const { getLastUpdatedTasks } = useTaskStore();
    const {
        setShouldReloadTodos,
        deleteTodo,
        setShowDeleteTodo,
        showDeleteTodo,
        currentTodo,
        setCurrentTodo
    } = useTodoStore();
    const { setIsLoading } = useAppSettingsStore();

    const [api, contextHolder] = notification.useNotification();
    const { Text } = Typography;

    const deleteTodoSuccess = successNotification('The todo has been deleted');
    const deleteTodoError = errorNotification(
        'The todo could not be deleted. Please refresh and try again'
    );

    function openNotification(type: NotificationType, message: NotificationMessage): void {
        api[type](message);
    }

    function closeModal(): void {
        setShowDeleteTodo(false);
        setCurrentTodo(null);
    }

    async function remove(): Promise<void> {
        if (!currentTodo) {
            return;
        }

        setIsLoading(true);
        const isDeleted = await deleteTodo(currentTodo?.Id);

        if (isDeleted) {
            openNotification('success', deleteTodoSuccess);
            setShouldReloadTodos(true);
            await getLastUpdatedTasks();
        } else {
            openNotification('error', deleteTodoError);
        }

        setIsLoading(false);
        closeModal();
    }

    return (
        <Modal
            open={showDeleteTodo}
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
                    Confirming will permanently delete the todo:{' '}
                    <Text strong>{currentTodo?.title}</Text>
                </Text>
            </div>
        </Modal>
    );
}

export default DeleteTodo;
