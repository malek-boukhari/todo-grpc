import { JSX, useEffect } from 'react';
import Title from 'antd/es/typography/Title';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppSettingsStore } from '../../../../../../store/AppSettings.store.ts';
import { useTaskStore } from '../../../../../../store/Task.store.ts';
import { useTodoStore } from '../../../../../../store/Todo.store.ts';
import TodoCard from '../todo-detail';
import styles from './styles.module.css';
import CreateTodo from '../create-todo';

function TodoList(): JSX.Element {
    const { currentTask } = useTaskStore();
    const { setIsLoading } = useAppSettingsStore();
    const { getTodos, todos, shouldReloadTodos, setShouldReloadTodos, setShowCreateTodo } =
        useTodoStore();

    useEffect(() => {
        if (!currentTask) {
            return;
        }

        loadTodos();
    }, [currentTask]);

    useEffect(() => {
        if (!shouldReloadTodos || !currentTask) {
            return;
        }

        loadTodos();
    }, [shouldReloadTodos]);

    async function loadTodos(): Promise<void> {
        setIsLoading(true);
        await getTodos(currentTask?.Id as string);
        setShouldReloadTodos(false);
        setIsLoading(false);
    }

    return (
        <div>
            <div className={styles.header}>
                <Title style={{ margin: 0 }} level={4}>
                    Todos
                </Title>

                <Button type={'text'} onClick={() => setShowCreateTodo(true)}>
                    <PlusOutlined /> <span>Add todo</span>
                </Button>
            </div>
            <CreateTodo />

            {todos.map((todo) => (
                <TodoCard todo={todo} key={todo.Id} />
            ))}
        </div>
    );
}

export default TodoList;
