import { create } from 'zustand';
import { fetchByKey, persistByKey } from '../utils/storage.ts';
import { CategoriesGateway } from '../api/gateways/CategoriesGateway.ts';
import { Category, GetCategoriesResponse } from '../generated/category_pb.ts';

const categoriesGateway = new CategoriesGateway();

export interface ICategoryStore {
    categories: any;
    getCategories: () => Promise<void>;
    currentCategory: Category | null; // set when a category is being edited/ deleted
    setCurrentCategory: (category: Category | null) => void;
    showCreateCategory: boolean;
    setShowCreateCategory: (showCreateCategory: boolean) => void;
    showEditCategory: boolean;
    setShowEditCategory: (showEditCategory: boolean) => void;
    showDeleteCategory: boolean;
    setShowDeleteCategory: (showDeleteCategory: boolean) => void;
    createCategory: (data: any) => Promise<Category | null>;
    updateCategory: (categoryId: string, data: any) => Promise<Category | null>;
    deleteCategory: (id: string) => Promise<boolean>;
}

const initialState: ICategoryStore = {
    categories: [],
    getCategories: () => Promise.resolve(),
    currentCategory: null,
    setCurrentCategory: () => {},
    showCreateCategory: false,
    setShowCreateCategory: () => {},
    showEditCategory: false,
    setShowEditCategory: () => {},
    showDeleteCategory: false,
    setShowDeleteCategory: () => {},
    createCategory: () => Promise.resolve(null),
    updateCategory: () => Promise.resolve(null),
    deleteCategory: () => Promise.resolve(false)
};

export const useCategoryStore = create<ICategoryStore>((set) => {
    return {
        ...initialState,

        setShowCreateCategory(showCreateCategory: boolean) {
            set((state: ICategoryStore) => {
                return {
                    ...state,
                    showCreateCategory
                };
            });
        },

        setShowEditCategory(showEditCategory: boolean) {
            set((state: ICategoryStore) => {
                return {
                    ...state,
                    showEditCategory
                };
            });
        },

        setCurrentCategory(category: Category | null) {
            set((state: ICategoryStore) => {
                return {
                    ...state,
                    currentCategory: category
                };
            });
        },

        setShowDeleteCategory(showDeleteCategory: boolean) {
            set((state: ICategoryStore) => {
                return {
                    ...state,
                    showDeleteCategory
                };
            });
        },

        async getCategories(): Promise<void> {
            const user = fetchByKey('user');
            if (!user) {
                return;
            }

            const userId = user.Id;
            const resp: GetCategoriesResponse | null =
                await categoriesGateway.getCategories(userId);
            if (!resp) {
                return;
            }

            persistByKey('categories', resp.categories);

            set((state: ICategoryStore) => {
                return {
                    ...state,
                    categories: resp.categories
                };
            });
        },

        async createCategory(data: any): Promise<Category | null> {
            return await categoriesGateway.createCategory(data);
        },

        async updateCategory(categoryId: string, data: any): Promise<Category | null> {
            return await categoriesGateway.updateCategory(categoryId, data);
        },

        async deleteCategory(id: string): Promise<boolean> {
            const resp = await categoriesGateway.deleteCategory(id);

            if (!resp) {
                return false;
            }

            return resp.success;
        }
    };
});
