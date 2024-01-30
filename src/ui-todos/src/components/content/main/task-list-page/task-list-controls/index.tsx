import { useEffect, useRef, useState } from 'react';
import { Input, Select } from 'antd';
import { SortBy, SortOrder } from '../../../../../generated/task_pb.ts';
import { debounce } from '../../../../../utils/debounce.ts';
import { useTaskStore } from '../../../../../store/Task.store.ts';
import { useAppSettingsStore } from '../../../../../store/AppSettings.store.ts';
import styles from './styles.module.css';
import type { JSX } from 'react';
import type { SortCriteria } from '../../../../../types';

function TaskListControls(): JSX.Element {
    const { getTasks } = useTaskStore();
    const { setIsLoading } = useAppSettingsStore();

    const [searchValue, setSearchValue] = useState<string>('');
    const [selectedSortOption, setSelectedSortOption] = useState<string>('newest');

    // useRef to track the initial render
    const initialRender = useRef(true);

    const sortOptions = [
        {
            label: 'Sort by',
            options: [
                {
                    label: 'Newest',
                    value: 'newest',
                    sortBy: SortBy.DATE,
                    sortOrder: SortOrder.DESCENDING
                },
                {
                    label: 'Oldest',
                    value: 'oldest',
                    sortBy: SortBy.DATE,
                    sortOrder: SortOrder.ASCENDING
                },
                {
                    label: 'Title - A to Z',
                    value: 'title_asc',
                    sortBy: SortBy.TITLE,
                    sortOrder: SortOrder.ASCENDING
                },
                {
                    label: 'Title - Z to A',
                    value: 'title_desc',
                    sortBy: SortBy.TITLE,
                    sortOrder: SortOrder.DESCENDING
                }
            ]
        }
    ];

    useEffect(() => {
        getSortedTasks();
    }, [selectedSortOption]);

    useEffect(() => {
        // Skip fetching the filtered tasks on the first render since this is already done in on fetching sorted tasks
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        getFilteredTasks();
    }, [searchValue]);

    function getFilteredTasks(): void {
        console.log('heeeeeeeeeeere');
        const debouncedGetTasks = debounce(async () => {
            setIsLoading(true);
            const sortCriteria = getSortCriteria();
            await getTasks(searchValue, sortCriteria);

            // Fake a longer loading time to improve the user experience.
            setTimeout(() => {
                setIsLoading(false);
            }, 300);
        }, 500);

        debouncedGetTasks();
    }

    async function getSortedTasks(): Promise<void> {
        setIsLoading(true);
        const sortCriteria = getSortCriteria();
        await getTasks(searchValue, sortCriteria);
        setIsLoading(false);
    }

    // Helper function to get SortCriteria based on the selected sort option
    function getSortCriteria(): SortCriteria {
        const selectedOption = sortOptions[0].options.find(
            (option) => option.value === selectedSortOption
        );

        // Default sort criteria in case the selected option is not found
        if (!selectedOption) {
            return {
                sortBy: SortBy.SORT_UNKNOWN,
                sortOrder: SortOrder.ORDER_UNKNOWN
            };
        }

        return {
            sortBy: selectedOption.sortBy,
            sortOrder: selectedOption.sortOrder
        };
    }

    return (
        <div className={styles.wrapper}>
            <Input
                bordered={true}
                className={styles.searchInput}
                placeholder="Search tasks"
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <Select
                className={styles.sortSelection}
                defaultValue={selectedSortOption}
                placeholder="Sort by"
                options={sortOptions}
                onChange={(value) => setSelectedSortOption(value)}
            />
        </div>
    );
}

export default TaskListControls;
