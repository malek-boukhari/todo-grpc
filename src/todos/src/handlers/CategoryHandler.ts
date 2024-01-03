import { inject, injectable, named } from 'inversify';
import { Logger } from 'log4js';
import { category_package } from '../generated/category';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { TaskRepository } from '../repositories/TaskRepository';

@injectable()
export class CategoryHandler {
    constructor(
        @inject('Repository')
        @named('CategoryRepository')
        private categoryRepository: CategoryRepository,
        @inject('Repository')
        @named('TaskRepository')
        private taskRepository: TaskRepository,
        @inject('Logger')
        @named('Logger')
        private logger: Logger
    ) {
        // pass
    }

    public async getCategories(
        req: category_package.GetCategoriesRequest
    ): Promise<category_package.GetCategoriesResponse> {
        const userId: string = req.userId;
        const categories = await this.categoryRepository.getCategoriesByOwner(userId);

        // Convert categories to 'category_package.GetCategoriesResponse' message and return
        return category_package.GetCategoriesResponse.fromObject({ categories });
    }

    public async createCategory(
        req: category_package.CreateCategoryRequest
    ): Promise<category_package.Category | null> {
        try {
            const categoryObj = req.toObject();

            // Make sure the category name isn't already taken
            const exists = await this.categoryRepository.nameExists(
                categoryObj.user,
                categoryObj.name
            );
            if (exists) {
                return null;
            }

            const createdCategory = await this.categoryRepository.createOne(categoryObj);

            // Convert created category to 'category_package.Category' message and return
            return category_package.Category.fromObject(createdCategory);
        } catch (e) {
            this.logger.error(e);
            return null;
        }
    }

    public async updateCategory(
        req: category_package.UpdateCategoryRequest
    ): Promise<category_package.Category | null> {
        const categoryId: string = req._id;
        const categoryObj = req.category.toObject();

        try {
            const updatedCategory = await this.categoryRepository.updateOne(
                categoryId,
                categoryObj
            );

            // Convert updated category to 'category_package.Category' message and return
            return category_package.Category.fromObject(updatedCategory);
        } catch (e) {
            this.logger.error(e);
            return null;
        }
    }

    public async deleteCategory(
        req: category_package.DeleteCategoryRequest
    ): Promise<category_package.DeleteCategoryResponse> {
        const categoryId: string = req._id;

        try {
            // Return false if tasks have already been associated with the category
            const isAssociatedWithTasks = await this.taskRepository.categoryHasTasks(categoryId);
            if (isAssociatedWithTasks) {
                return category_package.DeleteCategoryResponse.fromObject({ success: false });
            }

            const isDeleted = await this.categoryRepository.deleteOne(categoryId);

            // Convert deletion status to 'category_package.DeleteCategoryResponse' message and return
            return category_package.DeleteCategoryResponse.fromObject({
                success: isDeleted.acknowledged
            });
        } catch (e) {
            this.logger.error(e);
            return category_package.DeleteCategoryResponse.fromObject({ success: false });
        }
    }
}
