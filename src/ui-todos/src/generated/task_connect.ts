// Important: Please make modifications in the proto files located in the root directory to ensure they take effect.
// Changes made here will be overwritten on build unless propagated to the root directory.

// @generated by protoc-gen-connect-es v0.13.0 with parameter "target=ts"
// @generated from file task.proto (package task_package, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { CreateTaskRequest, DeleteTaskRequest, DeleteTaskResponse, GetLastUpdatedTasksRequest, GetTaskRequest, GetTaskResponse, GetTasksRequest, GetTasksResponse, Task, UpdateTaskRequest } from "./task_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * Service definition
 *
 * @generated from service task_package.TaskService
 */
export const TaskService = {
  typeName: "task_package.TaskService",
  methods: {
    /**
     * @generated from rpc task_package.TaskService.GetTasks
     */
    getTasks: {
      name: "GetTasks",
      I: GetTasksRequest,
      O: GetTasksResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc task_package.TaskService.GetLastUpdatedTasks
     */
    getLastUpdatedTasks: {
      name: "GetLastUpdatedTasks",
      I: GetLastUpdatedTasksRequest,
      O: GetTasksResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc task_package.TaskService.GetTask
     */
    getTask: {
      name: "GetTask",
      I: GetTaskRequest,
      O: GetTaskResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc task_package.TaskService.CreateTask
     */
    createTask: {
      name: "CreateTask",
      I: CreateTaskRequest,
      O: Task,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc task_package.TaskService.UpdateTask
     */
    updateTask: {
      name: "UpdateTask",
      I: UpdateTaskRequest,
      O: Task,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc task_package.TaskService.DeleteTask
     */
    deleteTask: {
      name: "DeleteTask",
      I: DeleteTaskRequest,
      O: DeleteTaskResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;
