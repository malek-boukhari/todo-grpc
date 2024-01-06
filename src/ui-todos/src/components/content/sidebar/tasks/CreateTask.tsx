import { JSX } from 'react';
import { Button, Form, Input, Modal, Select, Spin } from 'antd';
import { useCategoryStore } from '../../../../store/Category.store.ts';
import { useUserStore } from '../../../../store/User.store.ts';
import { debounce } from '../../../../utils/debounce.ts';
import { useAppSettingsStore } from '../../../../store/AppSettings.store.ts';
import { useTaskStore } from '../../../../store/Task.store.ts';
import Title from 'antd/es/typography/Title';

function CreateTask(): JSX.Element {
    const { currentUser, getUsers, users } = useUserStore();
    const { isLoading, setIsLoading } = useAppSettingsStore();
    const { createTask, getTasks, setShowCreateTask, showCreateTask } = useTaskStore();
    const { categories } = useCategoryStore();

    function fetchUsers(value: string): void {
        if (!value) {
            return;
        }

        const debouncedGetUsers = debounce(async () => {
            await getUsers(value);
        }, 500);

        setIsLoading(true);
        debouncedGetUsers();
        setIsLoading(false);
    }

    function closeModal(): void {
        setShowCreateTask(false);
    }

    async function onFinish(values: any): Promise<void> {
        setIsLoading(true);
        values.task['user'] = currentUser.Id;

        await createTask(values.task);
        await getTasks('');

        setIsLoading(false);
        closeModal();
    }

    return (
        <Modal open={showCreateTask} onCancel={closeModal} footer={null}>
            <Title level={2} style={{ marginTop: 0 }}>
                Create a new task
            </Title>
            <Form layout={'vertical'} name="task" onFinish={onFinish} style={{ maxWidth: 600 }}>
                <Form.Item name={['task', 'title']} label="Title" rules={[{ required: true }]}>
                    <Input placeholder={'Enter task title'} />
                </Form.Item>

                <Form.Item
                    name={['task', 'description']}
                    label="Description"
                    rules={[{ required: true }]}
                >
                    <Input.TextArea placeholder={'Enter task description'} />
                </Form.Item>

                <Form.Item
                    name={['task', 'category']}
                    label="Category"
                    rules={[{ required: true }]}
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Choose a category"
                        options={categories}
                        fieldNames={{ label: 'name', value: 'Id' }}
                    />
                </Form.Item>

                <Form.Item name={['task', 'collaborators']} label="Collaborators">
                    <Select
                        style={{ width: '100%' }}
                        filterOption={false}
                        mode="multiple"
                        onSearch={fetchUsers}
                        placeholder="Enter collaborator username"
                        notFoundContent={isLoading ? <Spin size="small" /> : null}
                        options={users}
                        fieldNames={{ label: 'username', value: 'Id' }}
                    />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateTask;
