import { Avatar, Card, Col, Row, Tag, Typography } from 'antd';
import { useTaskStore } from '../../../../store/Task.store.ts';
import { PopulatedTask } from '../../../../generated/task_pb.ts';
import extendedDayJs from '../../../../config/dayjs.ts';
import { Link } from 'react-router-dom';
import styles from '../task-detail/task/task-metadata/styles.module.css';
import type { JSX } from 'react';

function TasksList(): JSX.Element {
    const { tasks } = useTaskStore();

    const { Meta } = Card;
    const { Text, Title } = Typography;

    function findTaskOwner(task: PopulatedTask): string {
        const owner = task?.collaborators.find((collaborator) => (collaborator.Id = task?.user));

        return owner?.username ?? '';
    }

    return (
        <Row gutter={16}>
            {tasks.map((task) => (
                <Col key={task.Id} span={6}>
                    <Link to={`/task/${task.Id}`}>
                        <Card hoverable style={{ marginBottom: 16 }}>
                            <Title style={{ marginTop: 0, fontWeight: 'normal' }} level={3}>
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

                            <div style={{ margin: '16px 0', display: 'flex', gap: 8 }}>
                                <Tag color={task.category?.color}>{task.category?.name}</Tag>
                            </div>

                            <div style={{ margin: '16px 0' }}>
                                <Text>{task.description}</Text>
                            </div>

                            <div>
                                <Meta
                                    description={`Last updated: ${extendedDayJs(
                                        task.updatedAt
                                    ).fromNow()}`}
                                    style={{ fontSize: 12 }}
                                ></Meta>
                            </div>
                        </Card>
                    </Link>
                </Col>
            ))}
        </Row>
    );
}

export default TasksList;
