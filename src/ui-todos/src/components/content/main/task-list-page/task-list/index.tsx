import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Card, Col, Row, Tag, Typography } from 'antd';
import { useTaskStore } from '../../../../../store/Task.store.ts';
import { PopulatedTask } from '../../../../../generated/task_pb.ts';
import extendedDayJs from '../../../../../config/dayjs.ts';
import { debounce } from '../../../../../utils/debounce.ts';
import { useAppSettingsStore } from '../../../../../store/AppSettings.store.ts';
import { useUserStore } from '../../../../../store/User.store.ts';
import styles from './styles.module.css';
import type { JSX } from 'react';

function TaskList(): JSX.Element {
    const { tasks, getTasks } = useTaskStore();
    const { currentUser } = useUserStore();
    const { setIsLoading } = useAppSettingsStore();

    const [title, _] = useState<string>('');

    const { Meta } = Card;
    const { Text, Title } = Typography;

    // Get Tasks on page load or when the search input value changes
    useEffect(() => {
        setIsLoading(true);
        fetchTasks();
        setIsLoading(false);
    }, [currentUser, title]);

    function fetchTasks(): void {
        const delay = title === '' ? 0 : 500;

        const debouncedGetTasks = debounce(async () => {
            await getTasks(title);
        }, delay);

        setIsLoading(true);
        debouncedGetTasks();
        setIsLoading(false);
    }

    function findTaskOwner(task: PopulatedTask): string {
        const owner = task?.collaborators.find((collaborator) => (collaborator.Id = task?.user));

        return owner?.username ?? '';
    }

    return (
        <Row gutter={16}>
            {tasks.map((task) => (
                <Col key={task.Id} span={6}>
                    <Link to={`/task/${task.Id}`}>
                        <Card hoverable className={styles.cardContainer}>
                            <Title className={styles.title} level={3}>
                                {task.title}
                            </Title>

                            <div className={styles.avatarGroup}>
                                <Avatar.Group>
                                    {task.collaborators.map((collaborator) => {
                                        return (
                                            <Avatar key={collaborator.Id}>
                                                {collaborator.username}
                                            </Avatar>
                                        );
                                    })}
                                    <Avatar>{task.collaborators[0].username}</Avatar>
                                </Avatar.Group>

                                <div className={styles.textContainer}>
                                    <Text>Owned by {findTaskOwner(task)}</Text>
                                </div>
                            </div>

                            <div className={styles.tagContainer}>
                                <Tag color={task.category?.color}>{task.category?.name}</Tag>
                            </div>

                            <div className={styles.taskDescription}>
                                <Text>{task.description}</Text>
                            </div>

                            <div>
                                <Meta
                                    className={styles.updatedAt}
                                    description={`Last updated: ${extendedDayJs(
                                        task.updatedAt
                                    ).fromNow()}`}
                                ></Meta>
                            </div>
                        </Card>
                    </Link>
                </Col>
            ))}
        </Row>
    );
}

export default TaskList;
