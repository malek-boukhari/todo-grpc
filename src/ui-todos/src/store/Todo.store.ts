import { create } from 'zustand';
import { TodosGateway } from '../api/gateways/TodosGateway.ts';
import { GetTodosResponse, Todo } from '../generated/todo_pb.ts';

const todosGateway = new TodosGateway();

export interface ITodoStore {
    todos: Todo[];
    getTodos: (taskId: string) => Promise<void>;
    currentTodo: Todo | null;
    setCurrentTodo: (todo: Todo | null) => void;
    showCreateTodo: boolean;
    setShowCreateTodo: (showCreateTodo: boolean) => void;
    showDeleteTodo: boolean;
    setShowDeleteTodo: (showDeleteTodo: boolean) => void;
    showEditTodo: boolean;
    setShowEditTodo: (showEditTodo: boolean) => void;
    shouldReloadTodos: boolean;
    setShouldReloadTodos: (shouldReload: boolean) => void;
    getTodo: (todoId: string) => Promise<Todo | null>;
    createTodo: (data: any) => Promise<Todo | null>;
    updateTodo: (todoId: string, data: Todo) => Promise<Todo | null>;
    deleteTodo: (todoId: string) => Promise<boolean>;
}

const initialState: ITodoStore = {
    todos: [],
    getTodos: () => Promise.resolve(),
    currentTodo: null,
    setCurrentTodo: () => {},
    showCreateTodo: false,
    setShowCreateTodo: () => {},
    showEditTodo: false,
    setShowEditTodo: () => {},
    showDeleteTodo: false,
    setShowDeleteTodo: () => {},
    shouldReloadTodos: false,
    setShouldReloadTodos: () => {},
    getTodo: () => Promise.resolve(null),
    createTodo: () => Promise.resolve(null),
    updateTodo: () => Promise.resolve(null),
    deleteTodo: () => Promise.resolve(false)
};

export const useTodoStore = create<ITodoStore>((set) => {
    return {
        ...initialState,

        setCurrentTodo(todo: Todo | null): void {
            set((state: ITodoStore) => {
                return {
                    ...state,
                    currentTodo: todo
                };
            });
        },

        setShowCreateTodo(showCreateTodo: boolean): void {
            set((state: ITodoStore) => {
                return {
                    ...state,
                    showCreateTodo
                };
            });
        },

        setShowEditTodo(showEditTodo: boolean): void {
            set((state: ITodoStore) => {
                return {
                    ...state,
                    showEditTodo
                };
            });
        },

        setShowDeleteTodo(showDeleteTodo: boolean): void {
            set((state: ITodoStore) => {
                return {
                    ...state,
                    showDeleteTodo
                };
            });
        },

        setShouldReloadTodos(shouldReloadTodos: boolean): void {
            set((state: ITodoStore) => {
                return {
                    ...state,
                    shouldReloadTodos
                };
            });
        },

        async getTodos(taskId: string): Promise<void> {
            try {
                const resp: GetTodosResponse | null = await todosGateway.getTodos(taskId);
                if (!resp) {
                    return;
                }

                set((state: ITodoStore) => ({
                    ...state,
                    todos: resp.todos
                }));
            } catch (e) {
                console.error(e);
            }
        },

        async getTodo(todoId: string): Promise<Todo | null> {
            try {
                return await todosGateway.getTodo(todoId);
            } catch (e) {
                console.error(e);
                return null;
            }
        },

        async createTodo(data: any): Promise<Todo | null> {
            try {
                return await todosGateway.createTodo(data);
            } catch (e) {
                console.error(e);
                return null;
            }
        },

        async updateTodo(todoId: string, data: Todo): Promise<Todo | null> {
            try {
                return await todosGateway.updateTodo(todoId, data);
            } catch (e) {
                console.error(e);
                return null;
            }
        },

        async deleteTodo(todoId: string): Promise<boolean> {
            try {
                const resp = await todosGateway.deleteTodo(todoId);

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
