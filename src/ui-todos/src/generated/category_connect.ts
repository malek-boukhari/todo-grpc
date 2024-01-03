// Important: Please make modifications in the proto files located in the root directory to ensure they take effect.
// Changes made in todos/src/proto and ui-todos/src/proto will be overwritten on build unless propagated to the root
// directory.

// @generated by protoc-gen-connect-es v0.13.0 with parameter "target=ts"
// @generated from file category.proto (package category_package, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { Category, CreateCategoryRequest, DeleteCategoryRequest, DeleteCategoryResponse, GetCategoriesRequest, GetCategoriesResponse, UpdateCategoryRequest } from "./category_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * Service definition
 *
 * @generated from service category_package.CategoryService
 */
export const CategoryService = {
  typeName: "category_package.CategoryService",
  methods: {
    /**
     * @generated from rpc category_package.CategoryService.GetCategories
     */
    getCategories: {
      name: "GetCategories",
      I: GetCategoriesRequest,
      O: GetCategoriesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc category_package.CategoryService.CreateCategory
     */
    createCategory: {
      name: "CreateCategory",
      I: CreateCategoryRequest,
      O: Category,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc category_package.CategoryService.UpdateCategory
     */
    updateCategory: {
      name: "UpdateCategory",
      I: UpdateCategoryRequest,
      O: Category,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc category_package.CategoryService.DeleteCategory
     */
    deleteCategory: {
      name: "DeleteCategory",
      I: DeleteCategoryRequest,
      O: DeleteCategoryResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;
