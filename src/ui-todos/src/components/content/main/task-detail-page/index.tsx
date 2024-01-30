import { JSX, useEffect } from 'react';
import { Divider } from 'antd';
import { useParams } from 'react-router';
import { useTaskStore } from '../../../../store/Task.store.ts';
import { useAppSettingsStore } from '../../../../store/AppSettings.store.ts';
import TodoList from './todo/todo-list';
import TaskMetadata from './task/task-metadata';
import DeleteTodo from './todo/todo-modals/DeleteTodo.tsx';
import DeleteTask from './task/task-modals/DeleteTask.tsx';
import EditTaskMetadata from './task/task-modals/EditTaskMetadata.tsx';
import EditTodo from './todo/todo-modals/EditTodo.tsx';
import { PopulatedTask } from '../../../../generated/task_pb.ts';

function TaskDetailPage(): JSX.Element {
    const { id } = useParams(); // Get the task ID from the URL params

    const { getTask, setCurrentTask } = useTaskStore();
    const { setIsLoading } = useAppSettingsStore();

    useEffect(() => {
        if (!id) {
            return;
        }

        const fetchTaskDetails = async () => {
            setIsLoading(true);
            const task = await getTask(id);
            if (task) {
                setCurrentTask(task as PopulatedTask);
            }
            setIsLoading(false);
        };

        fetchTaskDetails();

        // eslint-disable-next-line consistent-return
        return () => {
            setCurrentTask(null);
        };
    }, [id, getTask, setCurrentTask]);

    return (
        <section>
            <div style={{ maxWidth: 800, margin: '0 auto 40px' }}>
                <TaskMetadata />
                <EditTaskMetadata />
                <DeleteTask />
                <Divider />

                <EditTodo />
                <DeleteTodo />
                <TodoList />
            </div>
        </section>
    );
}

export default TaskDetailPage;
