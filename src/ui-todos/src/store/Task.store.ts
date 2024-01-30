import { create } from 'zustand';
import { TasksGateway } from '../api/gateways/TasksGateway.ts';
import { GetTasksResponse, Task, PopulatedTask, SortBy, SortOrder } from '../generated/task_pb.ts';
import { fetchByKey } from '../utils/storage.ts';
import type { SortCriteria } from '../types';

const tasksGateway = new TasksGateway();

export interface ITaskStore {
    tasks: PopulatedTask[];
    getTasks: (title: string, sortCriteria?: SortCriteria) => Promise<void>;
    lastUpdatedTasks: PopulatedTask[];
    getLastUpdatedTasks: () => Promise<void>;
    currentTask: PopulatedTask | null; // set when a task is being edited/ deleted
    setCurrentTask: (task: PopulatedTask | null) => void;
    showCreateTask: boolean;
    setShowCreateTask: (showCreateTask: boolean) => void;
    showEditTask: boolean;
    setShowEditTask: (showEditTask: boolean) => void;
    showDeleteTask: boolean;
    setShowDeleteTask: (showDeleteTask: boolean) => void;
    getTask: (taskId: string) => Promise<PopulatedTask | null>;
    createTask: (data: Task) => Promise<Task | null>;
    updateTask: (id: string, data: Task) => Promise<Task | null>;
    deleteTask: (taskId: string) => Promise<boolean>;
}

const initialState: ITaskStore = {
    tasks: [],
    getTasks: () => Promise.resolve(),
    lastUpdatedTasks: [],
    getLastUpdatedTasks: () => Promise.resolve(),
    currentTask: null,
    setCurrentTask: () => {},
    showCreateTask: false,
    setShowCreateTask: () => {},
    showEditTask: false,
    setShowEditTask: () => {},
    showDeleteTask: false,
    setShowDeleteTask: () => {},
    getTask: () => Promise.resolve(null),
    createTask: () => Promise.resolve(null),
    updateTask: () => Promise.resolve(null),
    deleteTask: () => Promise.resolve(false)
};

export const useTaskStore = create<ITaskStore>((set) => {
    return {
        ...initialState,

        setShowCreateTask(showCreateTask: boolean): void {
            set((state: ITaskStore) => {
                return {
                    ...state,
                    showCreateTask
                };
            });
        },

        setShowEditTask(showEditTask: boolean): void {
            set((state: ITaskStore) => {
                return {
                    ...state,
                    showEditTask
                };
            });
        },

        setShowDeleteTask(showDeleteTask: boolean): void {
            set((state: ITaskStore) => {
                return {
                    ...state,
                    showDeleteTask
                };
            });
        },

        setCurrentTask(task: PopulatedTask | null): void {
            set((state: ITaskStore) => {
                return {
                    ...state,
                    currentTask: task
                };
            });
        },

        async getTasks(title: string = '', sortCriteria?: SortCriteria): Promise<void> {
            try {
                const user = fetchByKey('user');
                if (!user) {
                    return;
                }

                // Ensure sortCriteria is defined
                const resolvedSortCriteria: SortCriteria = sortCriteria || {
                    sortBy: SortBy.DATE,
                    sortOrder: SortOrder.DESCENDING
                };

                const userId = user.Id;
                const resp: GetTasksResponse | null = await tasksGateway.getTasks(
                    userId,
                    title,
                    resolvedSortCriteria
                );

                if (!resp) {
                    return;
                }

                set((state: ITaskStore) => ({
                    ...state,
                    tasks: resp.tasks
                }));
            } catch (e) {
                console.error(e);
            }
        },

        async getLastUpdatedTasks(): Promise<void> {
            try {
                const user = fetchByKey('user');
                if (!user) {
                    return;
                }

                const userId = user.Id;
                const resp = await tasksGateway.getLastUpdatedTasks(userId);
                if (!resp) {
                    return;
                }

                set((state: ITaskStore) => ({
                    ...state,
                    lastUpdatedTasks: resp.tasks
                }));
            } catch (e) {
                console.error(e);
            }
        },

        async getTask(taskId: string): Promise<PopulatedTask | null> {
            try {
                const resp = await tasksGateway.getTask(taskId);
                if (!resp || !resp.task) {
                    return null;
                }

                return resp.task;
            } catch (e) {
                console.error(e);
                return null;
            }
        },

        async createTask(data): Promise<Task | null> {
            try {
                return await tasksGateway.createTask(data);
            } catch (e) {
                console.error(e);
                return null;
            }
        },

        async updateTask(id: string, data: Task): Promise<Task | null> {
            try {
                return await tasksGateway.updateTask(id, data);
            } catch (e) {
                console.error(e);
                return null;
            }
        },

        async deleteTask(taskId: string): Promise<boolean> {
            try {
                const resp = await tasksGateway.deleteTask(taskId);

                if (!resp) {
                    return false;
                }

                return resp.success;
            } catch (e) {
                console.error(e);
                return false;
            }
        }
    };
});
