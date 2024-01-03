import React, { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { TagTwoTone } from '@ant-design/icons';
import { PopulatedTask } from '../../../../generated/task_pb.ts';
import { useAppSettingsStore } from '../../../../store/AppSettings.store.ts';

function TaskLabel(props: { task: PopulatedTask }): JSX.Element {
    const navigate = useNavigate();
    const { setIsLoading } = useAppSettingsStore();

    const task = props.task;

    function editTask(e: React.MouseEvent<HTMLElement>): void {
        e.preventDefault();
        setIsLoading(true);
        navigate(`/task/${task.Id}`);
        setIsLoading(false);
    }

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
            onClick={(e) => editTask(e)}
            role={'button'}
        >
            <div>
                <TagTwoTone twoToneColor={task.category?.color} />
                <span>{task.title}</span>
            </div>
        </div>
    );
}

export default TaskLabel;
