"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryHandler = void 0;
const inversify_1 = require("inversify");
const category_1 = require("../generated/category");
const CategoryRepository_1 = require("../repositories/CategoryRepository");
const TaskRepository_1 = require("../repositories/TaskRepository");
let CategoryHandler = class CategoryHandler {
    constructor(categoryRepository, taskRepository, logger) {
        this.categoryRepository = categoryRepository;
        this.taskRepository = taskRepository;
        this.logger = logger;
    }
    async getCategories(req) {
        const userId = req.userId;
        const categories = await this.categoryRepository.getCategoriesByOwner(userId);
        return category_1.category_package.GetCategoriesResponse.fromObject({ categories });
    }
    async createCategory(req) {
        try {
            const categoryObj = req.toObject();
            const exists = await this.categoryRepository.nameExists(categoryObj.user, categoryObj.name);
            if (exists) {
                return null;
            }
            const createdCategory = await this.categoryRepository.createOne(categoryObj);
            return category_1.category_package.Category.fromObject(createdCategory);
        }
        catch (e) {
            this.logger.error(e);
            return null;
        }
    }
    async updateCategory(req) {
        const categoryId = req._id;
        const categoryObj = req.category.toObject();
        try {
            const updatedCategory = await this.categoryRepository.updateOne(categoryId, categoryObj);
            return category_1.category_package.Category.fromObject(updatedCategory);
        }
        catch (e) {
            this.logger.error(e);
            return null;
        }
    }
    async deleteCategory(req) {
        const categoryId = req._id;
        try {
            const isAssociatedWithTasks = await this.taskRepository.categoryHasTasks(categoryId);
            if (isAssociatedWithTasks) {
                return category_1.category_package.DeleteCategoryResponse.fromObject({ success: false });
            }
            const isDeleted = await this.categoryRepository.deleteOne(categoryId);
            return category_1.category_package.DeleteCategoryResponse.fromObject({
                success: isDeleted.acknowledged
            });
        }
        catch (e) {
            this.logger.error(e);
            return category_1.category_package.DeleteCategoryResponse.fromObject({ success: false });
        }
    }
};
exports.CategoryHandler = CategoryHandler;
exports.CategoryHandler = CategoryHandler = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('Repository')),
    __param(0, (0, inversify_1.named)('CategoryRepository')),
    __param(1, (0, inversify_1.inject)('Repository')),
    __param(1, (0, inversify_1.named)('TaskRepository')),
    __param(2, (0, inversify_1.inject)('Logger')),
    __param(2, (0, inversify_1.named)('Logger')),
    __metadata("design:paramtypes", [CategoryRepository_1.CategoryRepository,
        TaskRepository_1.TaskRepository, Object])
], CategoryHandler);
