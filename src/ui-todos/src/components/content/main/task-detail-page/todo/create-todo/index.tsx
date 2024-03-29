import { JSX, useEffect, useState } from 'react';
import { useTaskStore } from '../../../../../../store/Task.store.ts';
import { Button, Input, Select, theme } from 'antd';
import { ArrowRightOutlined, CloseOutlined } from '@ant-design/icons';
import Paragraph from 'antd/es/typography/Paragraph';
import { useAppSettingsStore } from '../../../../../../store/AppSettings.store.ts';
import { useTodoStore } from '../../../../../../store/Todo.store.ts';
import { useUserStore } from '../../../../../../store/User.store.ts';
import { TodoPriority, TodoStatus } from '../../../../../../generated/todo_pb.ts';
import { priorityIcon } from '../../../../../../utils/enumMappers.tsx';
import styles from './styles.module.css';

function CreateTodo(): JSX.Element {
    const { currentTask, getLastUpdatedTasks } = useTaskStore();
    const { currentUser } = useUserStore();
    const { createTodo, getTodos, setShowCreateTodo, showCreateTodo, titleFilter } = useTodoStore();
    const { setIsLoading } = useAppSettingsStore();

    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState(TodoPriority.MEDIUM);
    const [status, setStatus] = useState(TodoStatus.NEW);
    const [isVisible, setIsVisible] = useState(false);

    const { token } = theme.useToken();

    useEffect(() => {
        setIsVisible(showCreateTodo);
    }, [showCreateTodo]);

    const priorityMenuItems = [
        {
            value: TodoPriority.LOW,
            label: <div className={styles.flex}>Low {priorityIcon(TodoPriority.LOW)}</div>
        },
        {
            value: TodoPriority.MEDIUM,
            label: <div className={styles.flex}>Medium {priorityIcon(TodoPriority.MEDIUM)}</div>
        },
        {
            value: TodoPriority.HIGH,
            label: <div className={styles.flex}>High {priorityIcon(TodoPriority.HIGH)}</div>
        }
    ];

    async function handleCreateTodo(): Promise<void> {
        // Create a new Todo object with the input values
        const newTodo = {
            title,
            priority,
            status,
            task: currentTask?.Id,
            updatedBy: currentUser.Id
        };

        await createTodo(newTodo);
        // After successful creation, refresh the todos
        await getTodos(currentTask?.Id as string, titleFilter);
        await getLastUpdatedTasks();
        setIsLoading(false);

        // Reset input values
        setTitle('');
        setPriority(TodoPriority.MEDIUM);
        setStatus(TodoStatus.NEW);
    }

    return (
        <div
            className={`${styles.transition} ${styles.createTodoCard} ${
                isVisible ? styles.visible : styles.hidden
            }`}
            style={{ borderRadius: token.borderRadius, background: token.colorBgBase }}
        >
            <div className={styles.gridContainer}>
                <div>
                    <Paragraph className={styles.label}>Title</Paragraph>
                    <Input
                        className={styles.input}
                        bordered={false}
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <Paragraph className={styles.label}>Priority</Paragraph>
                    <Select
                        className={styles.select}
                        defaultValue={TodoPriority.MEDIUM}
                        options={priorityMenuItems}
                        onChange={(value) => setPriority(value)}
                    />
                </div>

                <div>
                    <Paragraph className={styles.label}>Status</Paragraph>
                    <Select
                        className={styles.select}
                        defaultValue={TodoStatus.NEW}
                        options={[
                            { value: TodoStatus.NEW, label: 'New' },
                            { value: TodoStatus.IN_PROGRESS, label: 'In progress' },
                            { value: TodoStatus.DONE, label: 'Done' }
                        ]}
                        onChange={(value) => setStatus(value)}
                    />
                </div>

                <div className={styles.buttonContainer}>
                    <Button size="small" type="text" onClick={handleCreateTodo}>
                        <ArrowRightOutlined />
                    </Button>
                    <Button size={'small'} type={'text'} onClick={() => setShowCreateTodo(false)}>
                        <CloseOutlined />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CreateTodo;
