import { JSX, useEffect, useState } from 'react';
import { Button, ColorPicker, Input, Modal, notification, Space, Typography } from 'antd';
import { useCategoryStore } from '../../../../store/Category.store.ts';
import { useUserStore } from '../../../../store/User.store.ts';
import { useAppSettingsStore } from '../../../../store/AppSettings.store.ts';
import { errorNotification, successNotification } from '../../../../utils/Notifications.ts';
import type { NotificationType, NotificationMessage } from '../../../../types';

function EditCategory(): JSX.Element {
    const {
        currentCategory,
        setCurrentCategory,
        getCategories,
        showEditCategory,
        setShowEditCategory,
        updateCategory
    } = useCategoryStore();
    const { currentUser } = useUserStore();
    const { setIsLoading } = useAppSettingsStore();

    const [api, contextHolder] = notification.useNotification();
    const { Text, Title } = Typography;

    const [categoryColor, setCategoryColor] = useState<string>('');
    const [categoryName, setCategoryName] = useState<string | undefined>('');

    const editCategorySuccess = successNotification('The category has been updated');
    const editCategoryError = errorNotification(
        'The category could not be updated, make sure the name doesnt exist'
    );

    // Set the default values of the category form
    useEffect(() => {
        if (currentCategory) {
            setCategoryName(currentCategory.name);
            setCategoryColor(currentCategory.color);
        }
    }, [currentCategory]);

    function openNotification(type: NotificationType, message: NotificationMessage): void {
        api[type](message);
    }

    function closeModal(): void {
        setCurrentCategory(null);
        setShowEditCategory(false);
    }

    async function onFinish(): Promise<void> {
        if (!currentCategory || !categoryName) {
            return;
        }

        const updatedCategory = {
            Id: currentCategory.Id,
            user: currentUser.Id,
            color: categoryColor,
            name: categoryName
        };

        if (!categoryColor.includes('#')) {
            updatedCategory.color = `#${categoryColor}`;
        }

        setIsLoading(true);
        await update(updatedCategory);
        await getCategories();
        setIsLoading(false);

        closeModal();
    }

    async function update(category: any): Promise<void> {
        const updated = await updateCategory(category.Id, category);
        if (!updated) {
            openNotification('error', editCategoryError);
            return;
        }

        openNotification('success', editCategorySuccess);
    }

    return (
        <Modal open={showEditCategory} onCancel={closeModal} footer={null}>
            {contextHolder}
            <Title level={2} style={{ marginTop: 0 }}>
                Update the category
            </Title>

            <Space direction="vertical" size="middle">
                <Space direction="vertical">
                    <label htmlFor="editCategoryNameInput">Category name</label>
                    <Input
                        id="editCategoryNameInput"
                        placeholder={'Enter category name'}
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        style={{ minWidth: 250 }}
                    />
                </Space>

                <Space direction="vertical">
                    <Text>Category color</Text>
                    <ColorPicker
                        value={categoryColor}
                        onChange={(color) => setCategoryColor(color.toHexString())}
                        style={{ minWidth: 250, justifyContent: 'left', padding: 11 }}
                        showText
                    />
                </Space>
            </Space>

            <div style={{ margin: '24px 0 0' }}>
                <Button type="primary" onClick={onFinish}>
                    Submit
                </Button>
            </div>
        </Modal>
    );
}

export default EditCategory;
