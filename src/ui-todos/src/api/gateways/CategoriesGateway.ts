import { createGrpcWebTransport } from '@connectrpc/connect-web';
import { createPromiseClient } from '@connectrpc/connect';
import { CategoryService } from '../../generated/category_connect.ts';
import {
    CreateCategoryRequest,
    UpdateCategoryRequest,
    Category,
    DeleteCategoryResponse,
    GetCategoriesResponse,
    DeleteCategoryRequest,
    GetCategoriesRequest
} from '../../generated/category_pb.ts';
import type { PromiseClient, Transport } from '@connectrpc/connect';

export class CategoriesGateway {
    private readonly transport: Transport;
    private client: PromiseClient<typeof CategoryService>;

    constructor() {
        this.transport = createGrpcWebTransport({
            baseUrl: import.meta.env.VITE_TODOS_BASE_URL
        });
        this.client = createPromiseClient(CategoryService, this.transport);
    }

    async getCategories(userId: string): Promise<GetCategoriesResponse | null> {
        try {
            const request = new GetCategoriesRequest({ userId });

            return await this.client.getCategories(request);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async createCategory(data: Category): Promise<any | null> {
        try {
            const request = new CreateCategoryRequest(data);

            return await this.client.createCategory(request);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async updateCategory(id: string, data: Category): Promise<any | null> {
        try {
            const request = new UpdateCategoryRequest({ Id: id, category: data });

            return await this.client.updateCategory(request);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async deleteCategory(categoryId: string): Promise<DeleteCategoryResponse | null> {
        try {
            const request = new DeleteCategoryRequest({ Id: categoryId });

            return await this.client.deleteCategory(request);
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
