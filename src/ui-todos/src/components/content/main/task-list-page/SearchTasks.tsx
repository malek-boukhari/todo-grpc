import React, { JSX } from 'react';
import { Input } from 'antd';
import { debounce } from '../../../../utils/debounce.ts';
import { useTaskStore } from '../../../../store/Task.store.ts';
import { useAppSettingsStore } from '../../../../store/AppSettings.store.ts';

function SearchTasks(): JSX.Element {
    const { getTasks } = useTaskStore();
    const { setIsLoading } = useAppSettingsStore();

    function onSearch(e: React.ChangeEvent<HTMLInputElement>): void {
        const value = e.target.value;

        const debouncedGetTasks = debounce(async () => {
            setIsLoading(true);
            await getTasks(value);

            // Fake a longer loading time to improve the user experience.
            setTimeout(() => {
                setIsLoading(false);
            }, 300);
        }, 500);

        debouncedGetTasks();
    }

    return (
        <div style={{ maxWidth: 200 }}>
            <Input
                bordered={true}
                placeholder="Search tasks"
                onChange={(e) => onSearch(e)}
                style={{ marginBottom: 0 }}
            />
        </div>
    );
}

export default SearchTasks;
