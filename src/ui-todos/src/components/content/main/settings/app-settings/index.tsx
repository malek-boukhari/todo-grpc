import { JSX } from 'react';
import { Switch, Typography } from 'antd';
import styles from './styles.module.css';
import { useAppSettingsStore } from '../../../../../store/AppSettings.store.ts';
import { persistByKey } from '../../../../../utils/storage.ts';

function AppSettings(): JSX.Element {
    const {
        isCategoryMenuDefaultOpen,
        isTaskMenuDefaultOpen,
        setIsCategoryMenuDefaultOpen,
        setIsTaskMenuDefaultOpen
    } = useAppSettingsStore();

    const { Text } = Typography;

    function onTaskSwitchChange(checked: boolean): void {
        persistByKey('is_task_menu_default_open', checked);
        setIsTaskMenuDefaultOpen(checked);
    }

    function onCategorySwitchChange(checked: boolean): void {
        persistByKey('is_category_menu_default_open', checked);
        setIsCategoryMenuDefaultOpen(checked);
    }

    return (
        <section className={styles.mainContainer}>
            <div className={styles.switchContainer}>
                <Text>Open sidebar tasks menu by default</Text>
                <Switch checked={isTaskMenuDefaultOpen} onChange={onTaskSwitchChange} />
            </div>

            <div className={styles.switchContainer}>
                <Text>Open sidebar categories menu by default</Text>
                <Switch checked={isCategoryMenuDefaultOpen} onChange={onCategorySwitchChange} />
            </div>
        </section>
    );
}

export default AppSettings;
