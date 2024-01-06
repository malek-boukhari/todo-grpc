import { JSX, useEffect, useState } from 'react';
import { Button, Input, Modal, notification, Select, Space, Typography } from 'antd';
import { TodoPriority, TodoStatus } from '../../../../../../generated/todo_pb.ts';
import { useUserStore } from '../../../../../../store/User.store.ts';
import { useAppSettingsStore } from '../../../../../../store/AppSettings.store.ts';
import { errorNotification, successNotification } from '../../../../../../utils/Notifications.ts';
import { useTodoStore } from '../../../../../../store/Todo.store.ts';
import { priorityIcon } from '../../../../../../utils/mappers.tsx';
import type { NotificationMessage, NotificationType } from '../../../../../../types';

function EditTodo(): JSX.Element {
    const { currentUser } = useUserStore();
    const { setIsLoading } = useAppSettingsStore();
    const {
        currentTodo,
        setCurrentTodo,
        setShowEditTodo,
        setShouldReloadTodos,
        showEditTodo,
        updateTodo
    } = useTodoStore();

    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState(TodoPriority.MEDIUM);
    const [status, setStatus] = useState(TodoStatus.NEW);

    const [api, contextHolder] = notification.useNotification();
    const { Title } = Typography;

    const editTodoSuccess = successNotification('The todo has been updated');
    const editTodoError = errorNotification('The todo could not be updated');
    const flexStyles = { display: 'flex', justifyContent: 'space-between' };

    const priorityMenuItems = [
        {
            value: TodoPriority.LOW,
            label: <div style={flexStyles}>Low {priorityIcon(TodoPriority.LOW)}</div>
        },
        {
            value: TodoPriority.MEDIUM,
            label: <div style={flexStyles}>Medium {priorityIcon(TodoPriority.MEDIUM)}</div>
        },
        {
            value: TodoPriority.HIGH,
            label: <div style={flexStyles}>High {priorityIcon(TodoPriority.HIGH)}</div>
        }
    ];

    // Set the default values of the task form
    useEffect(() => {
        if (!currentTodo) {
            return;
        }

        // Set the state values directly
        setTitle(currentTodo?.title || '');
        setPriority(currentTodo.priority);
        setStatus(currentTodo.status);
    }, [currentTodo]);

    function openNotification(type: NotificationType, message: NotificationMessage): void {
        api[type](message);
    }

    function closeModal(): void {
        setShowEditTodo(false);
        setCurrentTodo(null);
    }

    async function onFinish(): Promise<void> {
        if (!currentTodo) {
            return;
        }

        const todo = {
            Id: currentTodo.Id,
            title,
            updatedBy: currentUser.Id,
            priority,
            status,
            task: currentTodo.task
        };

        setIsLoading(true);
        await update(todo);
        setIsLoading(false);
        closeModal();
    }

    async function update(todo: any): Promise<void> {
        const updated = await updateTodo(todo.Id, todo);
        if (!updated) {
            openNotification('error', editTodoError);
            return;
        }

        openNotification('success', editTodoSuccess);
        setShouldReloadTodos(true);
    }

    return (
        <Modal open={showEditTodo} onCancel={closeModal} footer={null}>
            {contextHolder}

            <Title level={2} style={{ marginTop: 0 }}>
                Update todo
            </Title>

            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Space direction="vertical">
                    <label htmlFor="editTodotitle">Title</label>
                    <Input
                        id="editTodotitle"
                        value={title}
                        style={{ minWidth: 250 }}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Space>

                <Space direction="vertical">
                    <label htmlFor="priority">Priority</label>
                    <Select
                        id="priority"
                        placeholder="Change priority"
                        value={priority}
                        onChange={(value) => setPriority(value)}
                        options={priorityMenuItems}
                        style={{ minWidth: 250 }}
                    />
                </Space>

                <Space direction="vertical">
                    <label htmlFor="status">Status</label>
                    <Select
                        id="status"
                        placeholder="Change Status"
                        value={status}
                        onChange={(value) => setStatus(value)}
                        style={{ minWidth: 250 }}
                        options={[
                            { value: TodoStatus.NEW, label: 'New' },
                            { value: TodoStatus.IN_PROGRESS, label: 'In progress' },
                            { value: TodoStatus.DONE, label: 'Done' }
                        ]}
                    />
                </Space>
            </Space>

            <div style={{ margin: '24px 0 0 0' }}>
                <Button type="primary" onClick={onFinish}>
                    Submit
                </Button>
            </div>
        </Modal>
    );
}

export default EditTodo;
