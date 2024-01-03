import { JSX } from 'react';
import { Modal, notification, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { useCategoryStore } from '../../../../store/Category.store.ts';
import { useAppSettingsStore } from '../../../../store/AppSettings.store.ts';
import { errorNotification, successNotification } from '../../../../utils/Notifications.ts';
import type { NotificationType, NotificationMessage } from '../../../../types';

function DeleteCategory(): JSX.Element {
    const {
        currentCategory,
        showDeleteCategory,
        getCategories,
        deleteCategory,
        setCurrentCategory,
        setShowDeleteCategory
    } = useCategoryStore();
    const { setIsLoading } = useAppSettingsStore();

    const [api, contextHolder] = notification.useNotification();
    const { Text } = Typography;

    const deleteCategorySuccess = successNotification('The category has been deleted');
    const deleteCategoryError = errorNotification(
        'The category could not be deleted. Please ensure there are no tasks associated with this ' +
            'category before attempting to delete it.'
    );

    function openNotification(type: NotificationType, message: NotificationMessage): void {
        api[type](message);
    }

    function closeModal(): void {
        setShowDeleteCategory(false);
        setCurrentCategory(null);
    }

    async function remove(): Promise<void> {
        if (!currentCategory) {
            return;
        }

        setIsLoading(true);
        const isDeleted = await deleteCategory(currentCategory?.Id);

        if (isDeleted) {
            openNotification('success', deleteCategorySuccess);
            getCategories();
        } else {
            openNotification('error', deleteCategoryError);
        }

        setIsLoading(false);
        closeModal();
    }

    return (
        <Modal
            open={showDeleteCategory}
            onCancel={closeModal}
            onOk={remove}
            okType={'danger'}
            okText={'Delete'}
            cancelText={'Cancel'}
        >
            {contextHolder}
            <Title level={4} style={{ marginTop: 0, marginBottom: 24 }}>
                Are you sure?
            </Title>
            <div style={{ marginBottom: 32 }}>
                <Text>
                    Confirming will permanently delete the category:{' '}
                    <Text strong>{currentCategory?.name}</Text>
                </Text>
            </div>
        </Modal>
    );
}

export default DeleteCategory;
