import { inject, injectable, named } from 'inversify';
import * as grpc from '@grpc/grpc-js';
import { CategoryHandler } from '../handlers/CategoryHandler';
import { category_package as cgpkg } from '../generated/category';
import type { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';

@injectable()
export class CategoryService {
    constructor(
        @inject('Handler')
        @named('CategoryHandler')
        private categoryHandler: CategoryHandler
    ) {
        // empty
    }

    public async GetCategories(
        call: ServerUnaryCall<cgpkg.GetCategoriesRequest, cgpkg.GetCategoriesResponse>,
        callback: sendUnaryData<cgpkg.GetCategoriesResponse>
    ): Promise<void> {
        const req = call.request;
        const categories: cgpkg.GetCategoriesResponse | null =
            await this.categoryHandler.getCategories(req);

        if (!categories) {
            callback({
                code: grpc.status.INTERNAL,
                details: 'Internal server error'
            });
        }

        callback(null, categories);
    }

    public async CreateCategory(
        call: ServerUnaryCall<cgpkg.CreateCategoryRequest, cgpkg.Category>,
        callback: sendUnaryData<cgpkg.Category>
    ): Promise<void> {
        const req = call.request;
        const createdCategory: cgpkg.Category | null =
            await this.categoryHandler.createCategory(req);

        if (!createdCategory) {
            callback({
                code: grpc.status.INTERNAL,
                details: 'Category already exists'
            });
        }

        callback(null, createdCategory);
    }

    public async UpdateCategory(
        call: ServerUnaryCall<cgpkg.UpdateCategoryRequest, cgpkg.Category>,
        callback: sendUnaryData<cgpkg.Category>
    ): Promise<void> {
        const req = call.request;
        const updatedCategory: cgpkg.Category | null =
            await this.categoryHandler.updateCategory(req);

        if (!updatedCategory) {
            callback({
                code: grpc.status.INTERNAL,
                details: 'The category could not be updated'
            });
        }

        callback(null, updatedCategory);
    }

    public async DeleteCategory(
        call: ServerUnaryCall<cgpkg.DeleteCategoryRequest, cgpkg.DeleteCategoryResponse>,
        callback: sendUnaryData<cgpkg.DeleteCategoryResponse>
    ): Promise<void> {
        const req = call.request;
        const isDeleted = await this.categoryHandler.deleteCategory(req);

        callback(null, isDeleted);
    }
}
