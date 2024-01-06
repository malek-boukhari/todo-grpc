import type { JSX } from 'react';
import TaskList from './task-list';
import SearchTasks from './SearchTasks.tsx';

function TaskListPage(): JSX.Element {
    return (
        <>
            <SearchTasks />
            <TaskList />
        </>
    );
}

export default TaskListPage;
