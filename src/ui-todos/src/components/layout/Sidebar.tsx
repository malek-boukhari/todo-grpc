import { useEffect } from 'react';
import { Layout, Menu, MenuProps, theme } from 'antd';
import { TagsOutlined, FileDoneOutlined, PlusOutlined } from '@ant-design/icons';
import { PopulatedTask } from '../../generated/task_pb.ts';
import { Category } from '../../generated/category_pb.ts';
import { useCategoryStore } from '../../store/Category.store.ts';
import { useUserStore } from '../../store/User.store.ts';
import { useTaskStore } from '../../store/Task.store.ts';
import { useAppSettingsStore } from '../../store/AppSettings.store.ts';
import CategoryLabel from '../content/sidebar/categories/CategoryLabel.tsx';
import TaskLabel from '../content/sidebar/tasks/TaskLabel.tsx';
import CreateCategory from '../content/sidebar/categories/CreateCategory.tsx';
import EditCategory from '../content/sidebar/categories/EditCategory.tsx';
import DeleteCategory from '../content/sidebar/categories/DeleteCategory.tsx';
import CreateTask from '../content/sidebar/tasks/CreateTask.tsx';
import type { JSX } from 'react';

function Sidebar(): JSX.Element {
    const { getLastUpdatedTasks, lastUpdatedTasks, setShowCreateTask } = useTaskStore();
    const { currentUser } = useUserStore();
    const { getCategories, categories, setShowCreateCategory } = useCategoryStore();
    const { isCategoryMenuDefaultOpen, isTaskMenuDefaultOpen, setIsLoading } =
        useAppSettingsStore();

    const { Sider } = Layout;
    const { useToken } = theme;
    const { colorBgContainer } = useToken().token;

    // Get Tasks and categories on page load
    useEffect(() => {
        setIsLoading(true);
        getLastUpdatedTasks();
        getCategories();
        setIsLoading(false);
    }, [currentUser]);

    /*
     * Determines the default behaviour of the sidebar menus on page render.
     * This behaviour is configurable in AppSettings.tsx component.
     */
    function defaultOpenKeys(): string[] {
        const keys = [];

        if (isTaskMenuDefaultOpen) {
            keys.push('1');
        }
        if (isCategoryMenuDefaultOpen) {
            keys.push('2');
        }

        return keys;
    }

    const categoryItems = categories.map((category: Category) => {
        return {
            key: category.Id,
            label: <CategoryLabel category={category} />,
            style: { paddingLeft: '32px' }
        };
    });

    const taskItems = lastUpdatedTasks.map((task: PopulatedTask) => {
        return {
            key: task.Id,
            label: <TaskLabel task={task} />,
            style: { paddingLeft: '32px' }
        };
    });

    const menuItems: MenuProps['items'] = [
        {
            key: 1,
            icon: <FileDoneOutlined />,
            label: 'Last updated tasks',
            children: [
                ...taskItems,
                {
                    key: 4,
                    label: 'New task',
                    icon: <PlusOutlined />,
                    onClick: () => setShowCreateTask(true),
                    style: { paddingLeft: '32px' }
                }
            ]
        },
        {
            key: 2,
            icon: <TagsOutlined />,
            label: 'Categories',
            children: [
                ...categoryItems,
                {
                    key: 6,
                    label: 'New category',
                    icon: <PlusOutlined />,
                    onClick: () => setShowCreateCategory(true),
                    style: { paddingLeft: '32px' }
                }
            ]
        }
    ];

    return (
        <>
            <CreateCategory />
            <EditCategory />
            <DeleteCategory />
            <CreateTask />

            <Sider
                style={{
                    background: colorBgContainer,
                    padding: '8px',
                    borderRight: '1px solid #d4d4d4'
                }}
                width={250}
            >
                <Menu
                    theme="light"
                    mode="inline"
                    defaultOpenKeys={defaultOpenKeys()}
                    style={{ border: 'none' }}
                    items={menuItems}
                />
            </Sider>
        </>
    );
}

export default Sidebar;
