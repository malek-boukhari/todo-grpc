import { Container } from 'inversify';
import { CategoryService } from '../services/CategoryService';
import { category_package } from '../generated/category';

export const CategoryServiceDefinition = (
    container: Container
): category_package.UnimplementedCategoryServiceService => {
    const categoryService = container.getNamed<CategoryService>('Service', 'CategoryService');

    return {
        GetCategories: (call, callback) => categoryService.GetCategories(call, callback),
        CreateCategory: (call, callback) => categoryService.CreateCategory(call, callback),
        UpdateCategory: (call, callback) => categoryService.UpdateCategory(call, callback),
        DeleteCategory: (call, callback) => categoryService.DeleteCategory(call, callback)
    };
};
