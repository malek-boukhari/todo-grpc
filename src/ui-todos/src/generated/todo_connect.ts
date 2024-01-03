// Important: Please make modifications in the proto files located in the root directory to ensure they take effect.
// Changes made here will be overwritten on build unless propagated to the root directory.

// @generated by protoc-gen-connect-es v0.13.0 with parameter "target=ts"
// @generated from file todo.proto (package todo_package, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { CreateTodoRequest, DeleteTodoRequest, DeleteTodoResponse, GetTodoRequest, GetTodosRequest, GetTodosResponse, Todo, UpdateTodoRequest } from "./todo_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * Service definition
 *
 * @generated from service todo_package.TodoService
 */
export const TodoService = {
  typeName: "todo_package.TodoService",
  methods: {
    /**
     * @generated from rpc todo_package.TodoService.GetTodo
     */
    getTodo: {
      name: "GetTodo",
      I: GetTodoRequest,
      O: Todo,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc todo_package.TodoService.GetTodos
     */
    getTodos: {
      name: "GetTodos",
      I: GetTodosRequest,
      O: GetTodosResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc todo_package.TodoService.CreateTodo
     */
    createTodo: {
      name: "CreateTodo",
      I: CreateTodoRequest,
      O: Todo,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc todo_package.TodoService.UpdateTodo
     */
    updateTodo: {
      name: "UpdateTodo",
      I: UpdateTodoRequest,
      O: Todo,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc todo_package.TodoService.DeleteTodo
     */
    deleteTodo: {
      name: "DeleteTodo",
      I: DeleteTodoRequest,
      O: DeleteTodoResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

