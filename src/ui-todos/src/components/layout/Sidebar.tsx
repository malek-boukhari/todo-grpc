import { JSX, useEffect, useState } from 'react';
import { Divider, Layout, Menu, MenuProps, theme } from 'antd';
import { TagsOutlined, FileDoneOutlined, PlusOutlined } from '@ant-design/icons';
import { PopulatedTask } from '../../generated/task_pb.ts';
import { useCategoryStore } from '../../store/Category.store.ts';
import { useUserStore } from '../../store/User.store.ts';
import { Category } from '../../generated/category_pb.ts';
import { useTaskStore } from '../../store/Task.store.ts';
import { debounce } from '../../utils/debounce.ts';
import { useAppSettingsStore } from '../../store/AppSettings.store.ts';
import CategoryLabel from '../content/sidebar/categories/CategoryLabel.tsx';
import SearchTasks from '../content/sidebar/tasks/SearchTasks.tsx';
import TaskLabel from '../content/sidebar/tasks/TaskLabel.tsx';

function Sidebar(): JSX.Element {
    const { getTasks, tasks, setShowCreateTask } = useTaskStore();
    const { currentUser } = useUserStore();
    const { getCategories, categories, setShowCreateCategory } = useCategoryStore();
    const { isCategoryMenuDefaultOpen, isTaskMenuDefaultOpen, setIsLoading } =
        useAppSettingsStore();

    const [title, setTitle] = useState<string>('');

    const { Sider } = Layout;
    const { useToken } = theme;
    const { colorBgContainer } = useToken().token;

    // Get categories on page load
    useEffect(() => {
        setIsLoading(true);
        getCategories();
        setIsLoading(false);
    }, [currentUser]);

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

    /*
     * Determines the default behaviour of the sidebar menus on page render.
     * This behaviour is configurable in AppSettings component.
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

    const taskItems = tasks.map((task: PopulatedTask) => {
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
            label: 'Tasks',
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
        <Sider
            style={{
                background: colorBgContainer,
                padding: '8px',
                borderRight: '1px solid #d4d4d4'
            }}
            width={250}
        >
            <SearchTasks setTitle={setTitle} />
            <Divider />
            <Menu
                theme="light"
                mode="inline"
                defaultOpenKeys={defaultOpenKeys()}
                style={{ border: 'none' }}
                items={menuItems}
            />
        </Sider>
    );
}

export default Sidebar;
