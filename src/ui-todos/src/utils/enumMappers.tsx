import { TodoPriority, TodoStatus } from '../generated/todo_pb.ts';
import { JSX } from 'react';
import { DoubleRightOutlined, PauseOutlined } from '@ant-design/icons';

function mapStatusToString(status: number): string {
    switch (status) {
        case TodoStatus.NEW:
            return 'New';
        case TodoStatus.IN_PROGRESS:
            return 'In Progress';
        case TodoStatus.DONE:
            return 'Done';
        default:
            return 'Unknown';
    }
}

function mapPriorityToString(priority: number): string {
    switch (priority) {
        case TodoPriority.LOW:
            return 'Low';
        case TodoPriority.MEDIUM:
            return 'Medium';
        case TodoPriority.HIGH:
            return 'High';
        default:
            return 'Unknown';
    }
}

function priorityIcon(priority: number): JSX.Element {
    switch (priority) {
        case TodoPriority.LOW:
            return <DoubleRightOutlined style={{ transform: 'rotate(90deg)', color: '#0b83d8' }} />;

        case TodoPriority.MEDIUM:
            return <PauseOutlined style={{ transform: 'rotate(90deg)', color: '#eab308' }} />;

        case TodoPriority.HIGH:
            return (
                <DoubleRightOutlined style={{ transform: 'rotate(-90deg)', color: '#d80b49' }} />
            );

        default:
            return <PauseOutlined style={{ transform: 'rotate(90deg)', color: '#949494' }} />;
    }
}

export { mapPriorityToString, mapStatusToString, priorityIcon };
