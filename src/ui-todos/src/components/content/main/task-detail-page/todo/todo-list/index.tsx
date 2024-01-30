import { useEffect, useRef } from 'react';
import Title from 'antd/es/typography/Title';
import { Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppSettingsStore } from '../../../../../../store/AppSettings.store.ts';
import { useTaskStore } from '../../../../../../store/Task.store.ts';
import { useTodoStore } from '../../../../../../store/Todo.store.ts';
import { debounce } from '../../../../../../utils/debounce.ts';
import TodoCard from '../todo-detail';
import CreateTodo from '../create-todo';
import styles from './styles.module.css';
import type { JSX } from 'react';

function TodoList(): JSX.Element {
    const { currentTask } = useTaskStore();
    const { setIsLoading } = useAppSettingsStore();
    const { getTodos, todos, setShowCreateTodo, titleFilter, setTitleFilter } = useTodoStore();

    // useRef to track the initial render
    const initialRender = useRef(true);

    // Fetch todos on initial render
    useEffect(() => {
        if (!currentTask) {
            return;
        }

        fetchTodos();
    }, [currentTask]);

    // Fetch todos when the search filter changes
    useEffect(() => {
        if (initialRender.current || !currentTask) {
            initialRender.current = false;
            return;
        }

        debouncedSearch();
    }, [titleFilter]);

    async function fetchTodos(): Promise<void> {
        setIsLoading(true);
        await getTodos(currentTask?.Id as string, titleFilter);
        setIsLoading(false);
    }

    async function debouncedSearch(): Promise<void> {
        const debouncedGetTodos = debounce(async () => {
            setIsLoading(true);
            await getTodos(currentTask?.Id as string, titleFilter);
            setIsLoading(false);
        }, 500);

        debouncedGetTodos();
    }

    return (
        <div>
            <div className={styles.header}>
                <Title level={4}>Todos</Title>

                <Input
                    bordered={true}
                    className={styles.searchInput}
                    placeholder="Search todos"
                    onChange={(e) => setTitleFilter(e.target.value)}
                />

                <Button
                    className={styles.addTodoBtn}
                    type={'text'}
                    onClick={() => setShowCreateTodo(true)}
                >
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
