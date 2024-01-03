import { JSX, useState } from 'react';
import { Button, ColorPicker, Input, Modal, notification, Space, theme, Typography } from 'antd';
import { useCategoryStore } from '../../../../store/Category.store.ts';
import { useUserStore } from '../../../../store/User.store.ts';
import { useAppSettingsStore } from '../../../../store/AppSettings.store.ts';
import type { NotificationType, NotificationMessage } from '../../../../types';
import { errorNotification, successNotification } from '../../../../utils/Notifications.ts';

function CreateCategory(): JSX.Element {
    const { createCategory, getCategories, showCreateCategory, setShowCreateCategory } =
        useCategoryStore();
    const { currentUser } = useUserStore();
    const { setIsLoading } = useAppSettingsStore();
    const { token } = theme.useToken();
    const { Text, Title } = Typography;

    const [api, contextHolder] = notification.useNotification();
    const [categoryColor, setCategoryColor] = useState<string>(token.colorPrimary);
    const [categoryName, setCategoryName] = useState<string>('');

    const createCategorySuccess = successNotification('The category has been created');
    const createCategoryError = errorNotification(
        'The category could not be created, make sure the name doesnt exist'
    );

    function openNotification(type: NotificationType, message: NotificationMessage): void {
        api[type](message);
    }

    function closeModal(): void {
        setShowCreateCategory(false);
    }

    async function onFinish(): Promise<void> {
        const category = {
            name: categoryName,
            color: categoryColor,
            user: currentUser.Id
        };

        setIsLoading(true);
        await create(category);
        setIsLoading(false);
    }

    async function create(category: any): Promise<void> {
        const created = await createCategory(category);
        if (!created) {
            openNotification('error', createCategoryError);
            return;
        }

        openNotification('success', createCategorySuccess);
        setCategoryName('');
        setShowCreateCategory(false);
        await getCategories();
    }

    return (
        <Modal open={showCreateCategory} onCancel={closeModal} footer={null}>
            {contextHolder}
            <Title level={2} style={{ marginTop: 0 }}>
                Create a new category
            </Title>

            <Space direction="vertical" size="middle">
                <Space direction="vertical" size={8}>
                    <label htmlFor="createCategoryNameInput">Category name</label>
                    <Input
                        id="createCategoryNameInput"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </Space>

                <Space direction="vertical" size={8}>
                    <Text>Category color</Text>
                    <ColorPicker
                        value={categoryColor}
                        onChange={(color) => setCategoryColor(color.toHexString())}
                        showText
                    />
                </Space>
            </Space>

            <div style={{ marginBottom: 0 }}>
                <Button type="primary" onClick={onFinish}>
                    Submit
                </Button>
            </div>
        </Modal>
    );
}

export default CreateCategory;
