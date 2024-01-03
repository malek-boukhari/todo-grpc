import { JSX, useEffect } from 'react';
import { Button, Form, Input, Modal, notification, Select, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import { Task } from '../../../../../../generated/task_pb.ts';
import { useCategoryStore } from '../../../../../../store/Category.store.ts';
import { useUserStore } from '../../../../../../store/User.store.ts';
import { useAppSettingsStore } from '../../../../../../store/AppSettings.store.ts';
import { useTaskStore } from '../../../../../../store/Task.store.ts';
import { debounce } from '../../../../../../utils/debounce.ts';
import { errorNotification, successNotification } from '../../../../../../utils/Notifications.ts';
import type { NotificationMessage, NotificationType } from '../../../../../../types';

function EditTaskMetadata(): JSX.Element {
    const { currentUser, getUsers, users } = useUserStore();
    const { isLoading, setIsLoading } = useAppSettingsStore();
    const { currentTask, getTasks, setShowEditTask, showEditTask, updateTask } = useTaskStore();
    const { categories } = useCategoryStore();

    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();

    const editTaskSuccess = successNotification('The task has been updated');
    const editTaskError = errorNotification('The task could not be updated');

    // Set the default values of the task form
    useEffect(() => {
        if (!currentTask || !showEditTask) {
            return;
        }

        const taskValues = {
            task: {
                title: currentTask?.title,
                description: currentTask?.description,
                category: {
                    label: currentTask.category?.name,
                    value: currentTask.category?.Id
                }
            }
        };

        form.setFieldsValue(taskValues);
    }, [currentTask, form, showEditTask]);

    function openNotification(type: NotificationType, message: NotificationMessage): void {
        api[type](message);
    }

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
        setShowEditTask(false);
    }

    async function onFinish(values: any): Promise<void> {
        if (!currentTask) {
            return;
        }

        const { task } = values;
        task.Id = currentTask.Id;
        task.user = currentUser.Id;
        task.category =
            typeof values.task.category === 'object'
                ? values.task.category.value
                : values.task.category;
        task.collaborators = [currentUser.Id];

        setIsLoading(true);
        await update(task);
        await getTasks('');
        setIsLoading(false);
        closeModal();
    }

    async function update(task: Task): Promise<void> {
        const updated = await updateTask(task.Id, task);
        if (!updated) {
            openNotification('error', editTaskError);
            return;
        }

        openNotification('success', editTaskSuccess);
    }

    return (
        <Modal open={showEditTask} onCancel={closeModal} footer={null}>
            {contextHolder}

            <Title level={2} style={{ marginTop: 0 }}>
                Update the task
            </Title>

            <Form
                form={form}
                layout={'vertical'}
                name="task"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
            >
                <Form.Item name={['task', 'title']} label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    name={['task', 'description']}
                    label="Description"
                    rules={[{ required: true }]}
                >
                    <Input.TextArea />
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
                        placeholder="Select users"
                        notFoundContent={isLoading ? <Spin size="small" /> : null}
                        options={users}
                        fieldNames={{ label: 'username', value: 'Id' }}
                    />
                </Form.Item>

                <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditTaskMetadata;
