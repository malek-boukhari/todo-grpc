import { create } from 'zustand';
import { fetchByKey, keyExists } from '../utils/storage.ts';

interface IAppSettingsStore {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    loadingQueue: number;
    isDarkMode: boolean;
    setIsDarkMode: (isDarkMode: boolean) => void;
    isTaskMenuDefaultOpen: boolean;
    setIsTaskMenuDefaultOpen: (isOpen: boolean) => void;
    isCategoryMenuDefaultOpen: boolean;
    setIsCategoryMenuDefaultOpen: (isOpen: boolean) => void;
}

const initialState: IAppSettingsStore = {
    isLoading: false,
    loadingQueue: 0,
    setIsLoading: () => {},
    isDarkMode: fetchByKey('is_dark_mode') || false,
    setIsDarkMode: () => {},
    isTaskMenuDefaultOpen: keyExists('is_task_menu_default_open')
        ? fetchByKey('is_task_menu_default_open')
        : true,
    setIsTaskMenuDefaultOpen: () => {},
    isCategoryMenuDefaultOpen: keyExists('is_task_menu_default_open')
        ? fetchByKey('is_category_menu_default_open')
        : true,
    setIsCategoryMenuDefaultOpen: () => {}
};

export const useAppSettingsStore = create<IAppSettingsStore>((set) => {
    return {
        ...initialState,

        setIsLoading(isLoading: boolean) {
            set((state: IAppSettingsStore) => {
                const loadingQueue = isLoading
                    ? state.loadingQueue + 1
                    : Math.max(0, state.loadingQueue - 1);

                return {
                    ...state,
                    isLoading: loadingQueue > 0,
                    loadingQueue
                };
            });
        },

        setIsDarkMode(isDarkMode: boolean) {
            set((state: IAppSettingsStore) => {
                return {
                    ...state,
                    isDarkMode
                };
            });
        },

        setIsTaskMenuDefaultOpen(isOpen: boolean) {
            set((state: IAppSettingsStore) => {
                return {
                    ...state,
                    isTaskMenuDefaultOpen: isOpen
                };
            });
        },

        setIsCategoryMenuDefaultOpen(isOpen: boolean) {
            set((state: IAppSettingsStore) => {
                return {
                    ...state,
                    isCategoryMenuDefaultOpen: isOpen
                };
            });
        }
    };
});
