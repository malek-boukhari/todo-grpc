import { JSX } from 'react';
import { Button, notification, Progress, Tag, theme } from 'antd';
import Typography from 'antd/es/typography';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useAppSettingsStore } from '../../../../../../store/AppSettings.store.ts';
import { useTodoStore } from '../../../../../../store/Todo.store.ts';
import { useTaskStore } from '../../../../../../store/Task.store.ts';
import { mapStatusToString, priorityIcon } from '../../../../../../utils/enumMappers.tsx';
import { TodoStatus } from '../../../../../../generated/todo_pb.ts';
import { errorNotification } from '../../../../../../utils/Notifications.ts';
import extendedDayJs from '../../../../../../config/dayjs.ts';
import styles from './styles.module.css';

function TodoDetail(props: any): JSX.Element {
    const { todo } = props;
    const { currentTask } = useTaskStore();
    const { setIsLoading } = useAppSettingsStore();
    const {
        getTodos,
        updateTodo,
        titleFilter,
        setCurrentTodo,
        setShowDeleteTodo,
        setShowEditTodo
    } = useTodoStore();

    const [api, contextHolder] = notification.useNotification();
    const { token } = theme.useToken();
    const { Text } = Typography;

    function openNotificationError(): void {
        const deleteTodoError = errorNotification(
            'The todo could not be deleted. Please refresh and try again'
        );

        api['error'](deleteTodoError);
    }

    async function showDeleteModal(): Promise<void> {
        setCurrentTodo(todo);
        setShowDeleteTodo(true);
    }

    async function showEditModal(): Promise<void> {
        setCurrentTodo(todo);
        setShowEditTodo(true);
    }

    function getUpdatedStatus(currentStatus: number): number {
        switch (currentStatus) {
            case TodoStatus.NEW:
                return TodoStatus.IN_PROGRESS;
            case TodoStatus.IN_PROGRESS:
                return TodoStatus.DONE;
            case TodoStatus.DONE:
                return TodoStatus.NEW;
            default:
                return TodoStatus.NEW; // Default to NEW if not in the expected cases
        }
    }

    async function editStatus(): Promise<void> {
        setIsLoading(true);
        const newStatus = getUpdatedStatus(todo.status);

        try {
            await updateTodo(todo.Id, {
                ...todo,
                status: newStatus
            });

            // After successful update, refresh the todos
            await getTodos(currentTask?.Id as string, titleFilter);
            setIsLoading(false);
        } catch (error) {
            console.error('Error updating todo status:', error);
            openNotificationError();
        }
    }

    function statusPercentage(status: number): number {
        switch (status) {
            case TodoStatus.NEW:
                return 0;
            case TodoStatus.IN_PROGRESS:
                return 50;
            case TodoStatus.DONE:
                return 100;
            default:
                return 0;
        }
    }

    return (
        <div
            className={styles.todoCard}
            style={{ borderRadius: token.borderRadius, background: token.colorBgBase }}
        >
            {contextHolder}

            <div className={styles.flex}>
                <div className={styles.title}>
                    <Text delete={todo.status === TodoStatus.DONE}>{todo.title}</Text>
                </div>

                <div className={styles.priority}>{priorityIcon(todo.priority)}</div>

                <div className={styles.status}>
                    <Tag color={'rgb(232,232,232)'}>
                        <span className={styles.statusText}>{mapStatusToString(todo.status)}</span>
                    </Tag>
                </div>

                <div className={styles.progress}>
                    <Button type={'text'} onClick={() => editStatus()}>
                        <Progress
                            type={'circle'}
                            percent={statusPercentage(todo.status)}
                            size={24}
                            showInfo={false}
                            strokeColor={token.colorPrimary}
                        />
                    </Button>
                </div>

                <div className={styles.deleteButton}>
                    <Button size={'small'} type={'text'} onClick={() => showEditModal()}>
                        <EditOutlined />
                    </Button>
                    <Button size={'small'} type={'text'} onClick={() => showDeleteModal()}>
                        <DeleteOutlined />
                    </Button>
                </div>
            </div>

            <Text className={styles.updatedAt}>
                Updated {extendedDayJs(todo.updatedAt).fromNow()}
            </Text>
        </div>
    );
}

export default TodoDetail;
