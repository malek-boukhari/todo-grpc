"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todo_package = void 0;
const pb_1 = __importStar(require("google-protobuf"));
const grpc_1 = __importStar(require("@grpc/grpc-js"));
var todo_package;
(function (todo_package) {
    var _Todo_one_of_decls, _GetTodoRequest_one_of_decls, _GetTodosRequest_one_of_decls, _GetTodosResponse_one_of_decls, _CreateTodoRequest_one_of_decls, _UpdateTodoRequest_one_of_decls, _DeleteTodoRequest_one_of_decls, _DeleteTodoResponse_one_of_decls;
    let TodoPriority;
    (function (TodoPriority) {
        TodoPriority[TodoPriority["TODO_PRIORITY_UNKNOWN"] = 0] = "TODO_PRIORITY_UNKNOWN";
        TodoPriority[TodoPriority["TODO_PRIORITY_LOW"] = 1] = "TODO_PRIORITY_LOW";
        TodoPriority[TodoPriority["TODO_PRIORITY_MEDIUM"] = 2] = "TODO_PRIORITY_MEDIUM";
        TodoPriority[TodoPriority["TODO_PRIORITY_HIGH"] = 3] = "TODO_PRIORITY_HIGH";
    })(TodoPriority = todo_package.TodoPriority || (todo_package.TodoPriority = {}));
    let TodoStatus;
    (function (TodoStatus) {
        TodoStatus[TodoStatus["TODO_STATUS_UNKNOWN"] = 0] = "TODO_STATUS_UNKNOWN";
        TodoStatus[TodoStatus["TODO_STATUS_NEW"] = 1] = "TODO_STATUS_NEW";
        TodoStatus[TodoStatus["TODO_STATUS_IN_PROGRESS"] = 2] = "TODO_STATUS_IN_PROGRESS";
        TodoStatus[TodoStatus["TODO_STATUS_DONE"] = 3] = "TODO_STATUS_DONE";
    })(TodoStatus = todo_package.TodoStatus || (todo_package.TodoStatus = {}));
    class Todo extends pb_1.Message {
        constructor(data) {
            super();
            _Todo_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _Todo_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("_id" in data && data._id != undefined) {
                    this._id = data._id;
                }
                if ("title" in data && data.title != undefined) {
                    this.title = data.title;
                }
                if ("task" in data && data.task != undefined) {
                    this.task = data.task;
                }
                if ("updatedBy" in data && data.updatedBy != undefined) {
                    this.updatedBy = data.updatedBy;
                }
                if ("status" in data && data.status != undefined) {
                    this.status = data.status;
                }
                if ("priority" in data && data.priority != undefined) {
                    this.priority = data.priority;
                }
                if ("createdAt" in data && data.createdAt != undefined) {
                    this.createdAt = data.createdAt;
                }
                if ("updatedAt" in data && data.updatedAt != undefined) {
                    this.updatedAt = data.updatedAt;
                }
            }
        }
        get _id() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set _id(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get title() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set title(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get task() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set task(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get updatedBy() {
            return pb_1.Message.getFieldWithDefault(this, 4, "");
        }
        set updatedBy(value) {
            pb_1.Message.setField(this, 4, value);
        }
        get status() {
            return pb_1.Message.getFieldWithDefault(this, 5, TodoStatus.TODO_STATUS_UNKNOWN);
        }
        set status(value) {
            pb_1.Message.setField(this, 5, value);
        }
        get priority() {
            return pb_1.Message.getFieldWithDefault(this, 6, TodoPriority.TODO_PRIORITY_UNKNOWN);
        }
        set priority(value) {
            pb_1.Message.setField(this, 6, value);
        }
        get createdAt() {
            return pb_1.Message.getFieldWithDefault(this, 7, "");
        }
        set createdAt(value) {
            pb_1.Message.setField(this, 7, value);
        }
        get updatedAt() {
            return pb_1.Message.getFieldWithDefault(this, 8, "");
        }
        set updatedAt(value) {
            pb_1.Message.setField(this, 8, value);
        }
        static fromObject(data) {
            const message = new Todo({});
            if (data._id != null) {
                message._id = data._id;
            }
            if (data.title != null) {
                message.title = data.title;
            }
            if (data.task != null) {
                message.task = data.task;
            }
            if (data.updatedBy != null) {
                message.updatedBy = data.updatedBy;
            }
            if (data.status != null) {
                message.status = data.status;
            }
            if (data.priority != null) {
                message.priority = data.priority;
            }
            if (data.createdAt != null) {
                message.createdAt = data.createdAt;
            }
            if (data.updatedAt != null) {
                message.updatedAt = data.updatedAt;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this._id != null) {
                data._id = this._id;
            }
            if (this.title != null) {
                data.title = this.title;
            }
            if (this.task != null) {
                data.task = this.task;
            }
            if (this.updatedBy != null) {
                data.updatedBy = this.updatedBy;
            }
            if (this.status != null) {
                data.status = this.status;
            }
            if (this.priority != null) {
                data.priority = this.priority;
            }
            if (this.createdAt != null) {
                data.createdAt = this.createdAt;
            }
            if (this.updatedAt != null) {
                data.updatedAt = this.updatedAt;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this._id.length)
                writer.writeString(1, this._id);
            if (this.title.length)
                writer.writeString(2, this.title);
            if (this.task.length)
                writer.writeString(3, this.task);
            if (this.updatedBy.length)
                writer.writeString(4, this.updatedBy);
            if (this.status != TodoStatus.TODO_STATUS_UNKNOWN)
                writer.writeEnum(5, this.status);
            if (this.priority != TodoPriority.TODO_PRIORITY_UNKNOWN)
                writer.writeEnum(6, this.priority);
            if (this.createdAt.length)
                writer.writeString(7, this.createdAt);
            if (this.updatedAt.length)
                writer.writeString(8, this.updatedAt);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Todo();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message._id = reader.readString();
                        break;
                    case 2:
                        message.title = reader.readString();
                        break;
                    case 3:
                        message.task = reader.readString();
                        break;
                    case 4:
                        message.updatedBy = reader.readString();
                        break;
                    case 5:
                        message.status = reader.readEnum();
                        break;
                    case 6:
                        message.priority = reader.readEnum();
                        break;
                    case 7:
                        message.createdAt = reader.readString();
                        break;
                    case 8:
                        message.updatedAt = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return Todo.deserialize(bytes);
        }
    }
    _Todo_one_of_decls = new WeakMap();
    todo_package.Todo = Todo;
    class GetTodoRequest extends pb_1.Message {
        constructor(data) {
            super();
            _GetTodoRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _GetTodoRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("_id" in data && data._id != undefined) {
                    this._id = data._id;
                }
            }
        }
        get _id() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set _id(value) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data) {
            const message = new GetTodoRequest({});
            if (data._id != null) {
                message._id = data._id;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this._id != null) {
                data._id = this._id;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this._id.length)
                writer.writeString(1, this._id);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetTodoRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message._id = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return GetTodoRequest.deserialize(bytes);
        }
    }
    _GetTodoRequest_one_of_decls = new WeakMap();
    todo_package.GetTodoRequest = GetTodoRequest;
    class GetTodosRequest extends pb_1.Message {
        constructor(data) {
            super();
            _GetTodosRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _GetTodosRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("taskId" in data && data.taskId != undefined) {
                    this.taskId = data.taskId;
                }
            }
        }
        get taskId() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set taskId(value) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data) {
            const message = new GetTodosRequest({});
            if (data.taskId != null) {
                message.taskId = data.taskId;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.taskId != null) {
                data.taskId = this.taskId;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.taskId.length)
                writer.writeString(1, this.taskId);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetTodosRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.taskId = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return GetTodosRequest.deserialize(bytes);
        }
    }
    _GetTodosRequest_one_of_decls = new WeakMap();
    todo_package.GetTodosRequest = GetTodosRequest;
    class GetTodosResponse extends pb_1.Message {
        constructor(data) {
            super();
            _GetTodosResponse_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], __classPrivateFieldGet(this, _GetTodosResponse_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("todos" in data && data.todos != undefined) {
                    this.todos = data.todos;
                }
            }
        }
        get todos() {
            return pb_1.Message.getRepeatedWrapperField(this, Todo, 1);
        }
        set todos(value) {
            pb_1.Message.setRepeatedWrapperField(this, 1, value);
        }
        static fromObject(data) {
            const message = new GetTodosResponse({});
            if (data.todos != null) {
                message.todos = data.todos.map(item => Todo.fromObject(item));
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.todos != null) {
                data.todos = this.todos.map((item) => item.toObject());
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.todos.length)
                writer.writeRepeatedMessage(1, this.todos, (item) => item.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetTodosResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.todos, () => pb_1.Message.addToRepeatedWrapperField(message, 1, Todo.deserialize(reader), Todo));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return GetTodosResponse.deserialize(bytes);
        }
    }
    _GetTodosResponse_one_of_decls = new WeakMap();
    todo_package.GetTodosResponse = GetTodosResponse;
    class CreateTodoRequest extends pb_1.Message {
        constructor(data) {
            super();
            _CreateTodoRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _CreateTodoRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("title" in data && data.title != undefined) {
                    this.title = data.title;
                }
                if ("task" in data && data.task != undefined) {
                    this.task = data.task;
                }
                if ("updatedBy" in data && data.updatedBy != undefined) {
                    this.updatedBy = data.updatedBy;
                }
                if ("status" in data && data.status != undefined) {
                    this.status = data.status;
                }
                if ("priority" in data && data.priority != undefined) {
                    this.priority = data.priority;
                }
            }
        }
        get title() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set title(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get task() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set task(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get updatedBy() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set updatedBy(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get status() {
            return pb_1.Message.getFieldWithDefault(this, 4, TodoStatus.TODO_STATUS_UNKNOWN);
        }
        set status(value) {
            pb_1.Message.setField(this, 4, value);
        }
        get priority() {
            return pb_1.Message.getFieldWithDefault(this, 5, TodoPriority.TODO_PRIORITY_UNKNOWN);
        }
        set priority(value) {
            pb_1.Message.setField(this, 5, value);
        }
        static fromObject(data) {
            const message = new CreateTodoRequest({});
            if (data.title != null) {
                message.title = data.title;
            }
            if (data.task != null) {
                message.task = data.task;
            }
            if (data.updatedBy != null) {
                message.updatedBy = data.updatedBy;
            }
            if (data.status != null) {
                message.status = data.status;
            }
            if (data.priority != null) {
                message.priority = data.priority;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.title != null) {
                data.title = this.title;
            }
            if (this.task != null) {
                data.task = this.task;
            }
            if (this.updatedBy != null) {
                data.updatedBy = this.updatedBy;
            }
            if (this.status != null) {
                data.status = this.status;
            }
            if (this.priority != null) {
                data.priority = this.priority;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.title.length)
                writer.writeString(1, this.title);
            if (this.task.length)
                writer.writeString(2, this.task);
            if (this.updatedBy.length)
                writer.writeString(3, this.updatedBy);
            if (this.status != TodoStatus.TODO_STATUS_UNKNOWN)
                writer.writeEnum(4, this.status);
            if (this.priority != TodoPriority.TODO_PRIORITY_UNKNOWN)
                writer.writeEnum(5, this.priority);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CreateTodoRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.title = reader.readString();
                        break;
                    case 2:
                        message.task = reader.readString();
                        break;
                    case 3:
                        message.updatedBy = reader.readString();
                        break;
                    case 4:
                        message.status = reader.readEnum();
                        break;
                    case 5:
                        message.priority = reader.readEnum();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return CreateTodoRequest.deserialize(bytes);
        }
    }
    _CreateTodoRequest_one_of_decls = new WeakMap();
    todo_package.CreateTodoRequest = CreateTodoRequest;
    class UpdateTodoRequest extends pb_1.Message {
        constructor(data) {
            super();
            _UpdateTodoRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _UpdateTodoRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("_id" in data && data._id != undefined) {
                    this._id = data._id;
                }
                if ("todo" in data && data.todo != undefined) {
                    this.todo = data.todo;
                }
            }
        }
        get _id() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set _id(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get todo() {
            return pb_1.Message.getWrapperField(this, Todo, 2);
        }
        set todo(value) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get has_todo() {
            return pb_1.Message.getField(this, 2) != null;
        }
        static fromObject(data) {
            const message = new UpdateTodoRequest({});
            if (data._id != null) {
                message._id = data._id;
            }
            if (data.todo != null) {
                message.todo = Todo.fromObject(data.todo);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this._id != null) {
                data._id = this._id;
            }
            if (this.todo != null) {
                data.todo = this.todo.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this._id.length)
                writer.writeString(1, this._id);
            if (this.has_todo)
                writer.writeMessage(2, this.todo, () => this.todo.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new UpdateTodoRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message._id = reader.readString();
                        break;
                    case 2:
                        reader.readMessage(message.todo, () => message.todo = Todo.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return UpdateTodoRequest.deserialize(bytes);
        }
    }
    _UpdateTodoRequest_one_of_decls = new WeakMap();
    todo_package.UpdateTodoRequest = UpdateTodoRequest;
    class DeleteTodoRequest extends pb_1.Message {
        constructor(data) {
            super();
            _DeleteTodoRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _DeleteTodoRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("_id" in data && data._id != undefined) {
                    this._id = data._id;
                }
            }
        }
        get _id() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set _id(value) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data) {
            const message = new DeleteTodoRequest({});
            if (data._id != null) {
                message._id = data._id;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this._id != null) {
                data._id = this._id;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this._id.length)
                writer.writeString(1, this._id);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DeleteTodoRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message._id = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return DeleteTodoRequest.deserialize(bytes);
        }
    }
    _DeleteTodoRequest_one_of_decls = new WeakMap();
    todo_package.DeleteTodoRequest = DeleteTodoRequest;
    class DeleteTodoResponse extends pb_1.Message {
        constructor(data) {
            super();
            _DeleteTodoResponse_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _DeleteTodoResponse_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("success" in data && data.success != undefined) {
                    this.success = data.success;
                }
            }
        }
        get success() {
            return pb_1.Message.getFieldWithDefault(this, 1, false);
        }
        set success(value) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data) {
            const message = new DeleteTodoResponse({});
            if (data.success != null) {
                message.success = data.success;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.success != null) {
                data.success = this.success;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.success != false)
                writer.writeBool(1, this.success);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DeleteTodoResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.success = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return DeleteTodoResponse.deserialize(bytes);
        }
    }
    _DeleteTodoResponse_one_of_decls = new WeakMap();
    todo_package.DeleteTodoResponse = DeleteTodoResponse;
    class UnimplementedTodoServiceService {
    }
    UnimplementedTodoServiceService.definition = {
        GetTodo: {
            path: "/todo_package.TodoService/GetTodo",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => GetTodoRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Todo.deserialize(new Uint8Array(bytes))
        },
        GetTodos: {
            path: "/todo_package.TodoService/GetTodos",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => GetTodosRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => GetTodosResponse.deserialize(new Uint8Array(bytes))
        },
        CreateTodo: {
            path: "/todo_package.TodoService/CreateTodo",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => CreateTodoRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Todo.deserialize(new Uint8Array(bytes))
        },
        UpdateTodo: {
            path: "/todo_package.TodoService/UpdateTodo",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => UpdateTodoRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Todo.deserialize(new Uint8Array(bytes))
        },
        DeleteTodo: {
            path: "/todo_package.TodoService/DeleteTodo",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => DeleteTodoRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => DeleteTodoResponse.deserialize(new Uint8Array(bytes))
        }
    };
    todo_package.UnimplementedTodoServiceService = UnimplementedTodoServiceService;
    class TodoServiceClient extends grpc_1.makeGenericClientConstructor(UnimplementedTodoServiceService.definition, "TodoService", {}) {
        constructor(address, credentials, options) {
            super(address, credentials, options);
            this.GetTodo = (message, metadata, options, callback) => {
                return super.GetTodo(message, metadata, options, callback);
            };
            this.GetTodos = (message, metadata, options, callback) => {
                return super.GetTodos(message, metadata, options, callback);
            };
            this.CreateTodo = (message, metadata, options, callback) => {
                return super.CreateTodo(message, metadata, options, callback);
            };
            this.UpdateTodo = (message, metadata, options, callback) => {
                return super.UpdateTodo(message, metadata, options, callback);
            };
            this.DeleteTodo = (message, metadata, options, callback) => {
                return super.DeleteTodo(message, metadata, options, callback);
            };
        }
    }
    todo_package.TodoServiceClient = TodoServiceClient;
})(todo_package || (exports.todo_package = todo_package = {}));
