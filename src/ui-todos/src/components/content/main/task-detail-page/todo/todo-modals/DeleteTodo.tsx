import { JSX } from 'react';
import { Modal, notification, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { errorNotification, successNotification } from '../../../../../../utils/Notifications.ts';
import { useTaskStore } from '../../../../../../store/Task.store.ts';
import { useTodoStore } from '../../../../../../store/Todo.store.ts';
import { useAppSettingsStore } from '../../../../../../store/AppSettings.store.ts';
import type { NotificationMessage, NotificationType } from '../../../../../../types';

function DeleteTodo(): JSX.Element {
    const { getLastUpdatedTasks } = useTaskStore();
    const { currentTask } = useTaskStore();
    const { setIsLoading } = useAppSettingsStore();
    const {
        getTodos,
        deleteTodo,
        setShowDeleteTodo,
        showDeleteTodo,
        currentTodo,
        titleFilter,
        setCurrentTodo
    } = useTodoStore();

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
            // refresh the todos
            await getTodos(currentTask?.Id as string, titleFilter);
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
