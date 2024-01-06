import { JSX } from 'react';
import { Avatar, Button, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import extendedDayJs from '../../../../../../config/dayjs.ts';
import { useTaskStore } from '../../../../../../store/Task.store.ts';
import styles from './styles.module.css';

function TaskMetadata(): JSX.Element {
    const { currentTask, setShowDeleteTask, setShowEditTask } = useTaskStore();

    const { Title, Paragraph, Text } = Typography;

    function findTaskOwner(): string {
        const owner = currentTask?.collaborators.find(
            (collaborator) => (collaborator.Id = currentTask?.user)
        );

        return owner?.username ?? '';
    }

    return (
        <>
            <div className={styles.taskHeader}>
                <Title level={2} className={styles.title}>
                    {currentTask?.title}
                </Title>

                <div>
                    <Button type={'text'} onClick={() => setShowEditTask(true)}>
                        <EditOutlined />
                    </Button>

                    <Button type={'text'} onClick={() => setShowDeleteTask(true)}>
                        <DeleteOutlined />
                    </Button>
                </div>
            </div>

            <div className={styles.avatarGroup}>
                <Avatar.Group>
                    {currentTask?.collaborators.map((collaborator) => {
                        return <Avatar key={collaborator.Id}>{collaborator.username}</Avatar>;
                    })}
                </Avatar.Group>

                <div className={styles.textContainer}>
                    <Text type="secondary" className={styles.secondaryText}>
                        Owned by {findTaskOwner()}
                    </Text>

                    <Text type="secondary" className={styles.secondaryText}>
                        Last updated: {extendedDayJs(currentTask?.updatedAt).fromNow()}
                    </Text>
                </div>
            </div>

            <Paragraph className={styles.description}>{currentTask?.description}</Paragraph>
        </>
    );
}

export default TaskMetadata;
