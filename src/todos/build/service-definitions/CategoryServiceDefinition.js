"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryServiceDefinition = void 0;
const CategoryServiceDefinition = (container) => {
    const categoryService = container.getNamed('Service', 'CategoryService');
    return {
        GetCategories: (call, callback) => categoryService.GetCategories(call, callback),
        CreateCategory: (call, callback) => categoryService.CreateCategory(call, callback),
        UpdateCategory: (call, callback) => categoryService.UpdateCategory(call, callback),
        DeleteCategory: (call, callback) => categoryService.DeleteCategory(call, callback)
    };
};
exports.CategoryServiceDefinition = CategoryServiceDefinition;
