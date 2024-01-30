import type { JSX } from 'react';
import TaskList from './task-list';
import TaskListControls from './task-list-controls';

function TaskListPage(): JSX.Element {
    return (
        <>
            <TaskListControls />
            <TaskList />
        </>
    );
}

export default TaskListPage;
