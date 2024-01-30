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
exports.task_package = void 0;
const dependency_1 = __importStar(require("./category"));
const dependency_2 = __importStar(require("./user"));
const pb_1 = __importStar(require("google-protobuf"));
const grpc_1 = __importStar(require("@grpc/grpc-js"));
var task_package;
(function (task_package) {
    var _Task_one_of_decls, _PopulatedTask_one_of_decls, _GetLastUpdatedTasksRequest_one_of_decls, _GetTasksRequest_one_of_decls, _GetTasksResponse_one_of_decls, _GetTaskRequest_one_of_decls, _GetTaskResponse_one_of_decls, _CreateTaskRequest_one_of_decls, _UpdateTaskRequest_one_of_decls, _DeleteTaskRequest_one_of_decls, _DeleteTaskResponse_one_of_decls;
    let SortBy;
    (function (SortBy) {
        SortBy[SortBy["SORT_UNKNOWN"] = 0] = "SORT_UNKNOWN";
        SortBy[SortBy["TITLE"] = 1] = "TITLE";
        SortBy[SortBy["DATE"] = 2] = "DATE";
    })(SortBy = task_package.SortBy || (task_package.SortBy = {}));
    let SortOrder;
    (function (SortOrder) {
        SortOrder[SortOrder["ORDER_UNKNOWN"] = 0] = "ORDER_UNKNOWN";
        SortOrder[SortOrder["ASCENDING"] = 1] = "ASCENDING";
        SortOrder[SortOrder["DESCENDING"] = 2] = "DESCENDING";
    })(SortOrder = task_package.SortOrder || (task_package.SortOrder = {}));
    class Task extends pb_1.Message {
        constructor(data) {
            super();
            _Task_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [5, 6], __classPrivateFieldGet(this, _Task_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("_id" in data && data._id != undefined) {
                    this._id = data._id;
                }
                if ("title" in data && data.title != undefined) {
                    this.title = data.title;
                }
                if ("description" in data && data.description != undefined) {
                    this.description = data.description;
                }
                if ("user" in data && data.user != undefined) {
                    this.user = data.user;
                }
                if ("collaborators" in data && data.collaborators != undefined) {
                    this.collaborators = data.collaborators;
                }
                if ("todos" in data && data.todos != undefined) {
                    this.todos = data.todos;
                }
                if ("category" in data && data.category != undefined) {
                    this.category = data.category;
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
        get description() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set description(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get user() {
            return pb_1.Message.getFieldWithDefault(this, 4, "");
        }
        set user(value) {
            pb_1.Message.setField(this, 4, value);
        }
        get collaborators() {
            return pb_1.Message.getFieldWithDefault(this, 5, []);
        }
        set collaborators(value) {
            pb_1.Message.setField(this, 5, value);
        }
        get todos() {
            return pb_1.Message.getFieldWithDefault(this, 6, []);
        }
        set todos(value) {
            pb_1.Message.setField(this, 6, value);
        }
        get category() {
            return pb_1.Message.getFieldWithDefault(this, 7, "");
        }
        set category(value) {
            pb_1.Message.setField(this, 7, value);
        }
        get createdAt() {
            return pb_1.Message.getFieldWithDefault(this, 8, "");
        }
        set createdAt(value) {
            pb_1.Message.setField(this, 8, value);
        }
        get updatedAt() {
            return pb_1.Message.getFieldWithDefault(this, 9, "");
        }
        set updatedAt(value) {
            pb_1.Message.setField(this, 9, value);
        }
        static fromObject(data) {
            const message = new Task({});
            if (data._id != null) {
                message._id = data._id;
            }
            if (data.title != null) {
                message.title = data.title;
            }
            if (data.description != null) {
                message.description = data.description;
            }
            if (data.user != null) {
                message.user = data.user;
            }
            if (data.collaborators != null) {
                message.collaborators = data.collaborators;
            }
            if (data.todos != null) {
                message.todos = data.todos;
            }
            if (data.category != null) {
                message.category = data.category;
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
            if (this.description != null) {
                data.description = this.description;
            }
            if (this.user != null) {
                data.user = this.user;
            }
            if (this.collaborators != null) {
                data.collaborators = this.collaborators;
            }
            if (this.todos != null) {
                data.todos = this.todos;
            }
            if (this.category != null) {
                data.category = this.category;
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
            if (this.description.length)
                writer.writeString(3, this.description);
            if (this.user.length)
                writer.writeString(4, this.user);
            if (this.collaborators.length)
                writer.writeRepeatedString(5, this.collaborators);
            if (this.todos.length)
                writer.writeRepeatedString(6, this.todos);
            if (this.category.length)
                writer.writeString(7, this.category);
            if (this.createdAt.length)
                writer.writeString(8, this.createdAt);
            if (this.updatedAt.length)
                writer.writeString(9, this.updatedAt);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Task();
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
                        message.description = reader.readString();
                        break;
                    case 4:
                        message.user = reader.readString();
                        break;
                    case 5:
                        pb_1.Message.addToRepeatedField(message, 5, reader.readString());
                        break;
                    case 6:
                        pb_1.Message.addToRepeatedField(message, 6, reader.readString());
                        break;
                    case 7:
                        message.category = reader.readString();
                        break;
                    case 8:
                        message.createdAt = reader.readString();
                        break;
                    case 9:
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
            return Task.deserialize(bytes);
        }
    }
    _Task_one_of_decls = new WeakMap();
    task_package.Task = Task;
    class PopulatedTask extends pb_1.Message {
        constructor(data) {
            super();
            _PopulatedTask_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [5, 6], __classPrivateFieldGet(this, _PopulatedTask_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("_id" in data && data._id != undefined) {
                    this._id = data._id;
                }
                if ("title" in data && data.title != undefined) {
                    this.title = data.title;
                }
                if ("description" in data && data.description != undefined) {
                    this.description = data.description;
                }
                if ("user" in data && data.user != undefined) {
                    this.user = data.user;
                }
                if ("collaborators" in data && data.collaborators != undefined) {
                    this.collaborators = data.collaborators;
                }
                if ("todos" in data && data.todos != undefined) {
                    this.todos = data.todos;
                }
                if ("category" in data && data.category != undefined) {
                    this.category = data.category;
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
        get description() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set description(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get user() {
            return pb_1.Message.getFieldWithDefault(this, 4, "");
        }
        set user(value) {
            pb_1.Message.setField(this, 4, value);
        }
        get collaborators() {
            return pb_1.Message.getRepeatedWrapperField(this, dependency_2.user_package.User, 5);
        }
        set collaborators(value) {
            pb_1.Message.setRepeatedWrapperField(this, 5, value);
        }
        get todos() {
            return pb_1.Message.getFieldWithDefault(this, 6, []);
        }
        set todos(value) {
            pb_1.Message.setField(this, 6, value);
        }
        get category() {
            return pb_1.Message.getWrapperField(this, dependency_1.category_package.Category, 7);
        }
        set category(value) {
            pb_1.Message.setWrapperField(this, 7, value);
        }
        get has_category() {
            return pb_1.Message.getField(this, 7) != null;
        }
        get createdAt() {
            return pb_1.Message.getFieldWithDefault(this, 8, "");
        }
        set createdAt(value) {
            pb_1.Message.setField(this, 8, value);
        }
        get updatedAt() {
            return pb_1.Message.getFieldWithDefault(this, 9, "");
        }
        set updatedAt(value) {
            pb_1.Message.setField(this, 9, value);
        }
        static fromObject(data) {
            const message = new PopulatedTask({});
            if (data._id != null) {
                message._id = data._id;
            }
            if (data.title != null) {
                message.title = data.title;
            }
            if (data.description != null) {
                message.description = data.description;
            }
            if (data.user != null) {
                message.user = data.user;
            }
            if (data.collaborators != null) {
                message.collaborators = data.collaborators.map(item => dependency_2.user_package.User.fromObject(item));
            }
            if (data.todos != null) {
                message.todos = data.todos;
            }
            if (data.category != null) {
                message.category = dependency_1.category_package.Category.fromObject(data.category);
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
            if (this.description != null) {
                data.description = this.description;
            }
            if (this.user != null) {
                data.user = this.user;
            }
            if (this.collaborators != null) {
                data.collaborators = this.collaborators.map((item) => item.toObject());
            }
            if (this.todos != null) {
                data.todos = this.todos;
            }
            if (this.category != null) {
                data.category = this.category.toObject();
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
            if (this.description.length)
                writer.writeString(3, this.description);
            if (this.user.length)
                writer.writeString(4, this.user);
            if (this.collaborators.length)
                writer.writeRepeatedMessage(5, this.collaborators, (item) => item.serialize(writer));
            if (this.todos.length)
                writer.writeRepeatedString(6, this.todos);
            if (this.has_category)
                writer.writeMessage(7, this.category, () => this.category.serialize(writer));
            if (this.createdAt.length)
                writer.writeString(8, this.createdAt);
            if (this.updatedAt.length)
                writer.writeString(9, this.updatedAt);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new PopulatedTask();
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
                        message.description = reader.readString();
                        break;
                    case 4:
                        message.user = reader.readString();
                        break;
                    case 5:
                        reader.readMessage(message.collaborators, () => pb_1.Message.addToRepeatedWrapperField(message, 5, dependency_2.user_package.User.deserialize(reader), dependency_2.user_package.User));
                        break;
                    case 6:
                        pb_1.Message.addToRepeatedField(message, 6, reader.readString());
                        break;
                    case 7:
                        reader.readMessage(message.category, () => message.category = dependency_1.category_package.Category.deserialize(reader));
                        break;
                    case 8:
                        message.createdAt = reader.readString();
                        break;
                    case 9:
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
            return PopulatedTask.deserialize(bytes);
        }
    }
    _PopulatedTask_one_of_decls = new WeakMap();
    task_package.PopulatedTask = PopulatedTask;
    class GetLastUpdatedTasksRequest extends pb_1.Message {
        constructor(data) {
            super();
            _GetLastUpdatedTasksRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _GetLastUpdatedTasksRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("collaboratorId" in data && data.collaboratorId != undefined) {
                    this.collaboratorId = data.collaboratorId;
                }
            }
        }
        get collaboratorId() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set collaboratorId(value) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data) {
            const message = new GetLastUpdatedTasksRequest({});
            if (data.collaboratorId != null) {
                message.collaboratorId = data.collaboratorId;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.collaboratorId != null) {
                data.collaboratorId = this.collaboratorId;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.collaboratorId.length)
                writer.writeString(1, this.collaboratorId);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetLastUpdatedTasksRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.collaboratorId = reader.readString();
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
            return GetLastUpdatedTasksRequest.deserialize(bytes);
        }
    }
    _GetLastUpdatedTasksRequest_one_of_decls = new WeakMap();
    task_package.GetLastUpdatedTasksRequest = GetLastUpdatedTasksRequest;
    class GetTasksRequest extends pb_1.Message {
        constructor(data) {
            super();
            _GetTasksRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _GetTasksRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("collaboratorId" in data && data.collaboratorId != undefined) {
                    this.collaboratorId = data.collaboratorId;
                }
                if ("title" in data && data.title != undefined) {
                    this.title = data.title;
                }
                if ("sortBy" in data && data.sortBy != undefined) {
                    this.sortBy = data.sortBy;
                }
                if ("sortOrder" in data && data.sortOrder != undefined) {
                    this.sortOrder = data.sortOrder;
                }
            }
        }
        get collaboratorId() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set collaboratorId(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get title() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set title(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get sortBy() {
            return pb_1.Message.getFieldWithDefault(this, 3, SortBy.SORT_UNKNOWN);
        }
        set sortBy(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get sortOrder() {
            return pb_1.Message.getFieldWithDefault(this, 4, SortOrder.ORDER_UNKNOWN);
        }
        set sortOrder(value) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data) {
            const message = new GetTasksRequest({});
            if (data.collaboratorId != null) {
                message.collaboratorId = data.collaboratorId;
            }
            if (data.title != null) {
                message.title = data.title;
            }
            if (data.sortBy != null) {
                message.sortBy = data.sortBy;
            }
            if (data.sortOrder != null) {
                message.sortOrder = data.sortOrder;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.collaboratorId != null) {
                data.collaboratorId = this.collaboratorId;
            }
            if (this.title != null) {
                data.title = this.title;
            }
            if (this.sortBy != null) {
                data.sortBy = this.sortBy;
            }
            if (this.sortOrder != null) {
                data.sortOrder = this.sortOrder;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.collaboratorId.length)
                writer.writeString(1, this.collaboratorId);
            if (this.title.length)
                writer.writeString(2, this.title);
            if (this.sortBy != SortBy.SORT_UNKNOWN)
                writer.writeEnum(3, this.sortBy);
            if (this.sortOrder != SortOrder.ORDER_UNKNOWN)
                writer.writeEnum(4, this.sortOrder);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetTasksRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.collaboratorId = reader.readString();
                        break;
                    case 2:
                        message.title = reader.readString();
                        break;
                    case 3:
                        message.sortBy = reader.readEnum();
                        break;
                    case 4:
                        message.sortOrder = reader.readEnum();
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
            return GetTasksRequest.deserialize(bytes);
        }
    }
    _GetTasksRequest_one_of_decls = new WeakMap();
    task_package.GetTasksRequest = GetTasksRequest;
    class GetTasksResponse extends pb_1.Message {
        constructor(data) {
            super();
            _GetTasksResponse_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], __classPrivateFieldGet(this, _GetTasksResponse_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("tasks" in data && data.tasks != undefined) {
                    this.tasks = data.tasks;
                }
                if ("sortBy" in data && data.sortBy != undefined) {
                    this.sortBy = data.sortBy;
                }
                if ("sortOrder" in data && data.sortOrder != undefined) {
                    this.sortOrder = data.sortOrder;
                }
            }
        }
        get tasks() {
            return pb_1.Message.getRepeatedWrapperField(this, PopulatedTask, 1);
        }
        set tasks(value) {
            pb_1.Message.setRepeatedWrapperField(this, 1, value);
        }
        get sortBy() {
            return pb_1.Message.getFieldWithDefault(this, 2, SortBy.SORT_UNKNOWN);
        }
        set sortBy(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get sortOrder() {
            return pb_1.Message.getFieldWithDefault(this, 3, SortOrder.ORDER_UNKNOWN);
        }
        set sortOrder(value) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data) {
            const message = new GetTasksResponse({});
            if (data.tasks != null) {
                message.tasks = data.tasks.map(item => PopulatedTask.fromObject(item));
            }
            if (data.sortBy != null) {
                message.sortBy = data.sortBy;
            }
            if (data.sortOrder != null) {
                message.sortOrder = data.sortOrder;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.tasks != null) {
                data.tasks = this.tasks.map((item) => item.toObject());
            }
            if (this.sortBy != null) {
                data.sortBy = this.sortBy;
            }
            if (this.sortOrder != null) {
                data.sortOrder = this.sortOrder;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.tasks.length)
                writer.writeRepeatedMessage(1, this.tasks, (item) => item.serialize(writer));
            if (this.sortBy != SortBy.SORT_UNKNOWN)
                writer.writeEnum(2, this.sortBy);
            if (this.sortOrder != SortOrder.ORDER_UNKNOWN)
                writer.writeEnum(3, this.sortOrder);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetTasksResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.tasks, () => pb_1.Message.addToRepeatedWrapperField(message, 1, PopulatedTask.deserialize(reader), PopulatedTask));
                        break;
                    case 2:
                        message.sortBy = reader.readEnum();
                        break;
                    case 3:
                        message.sortOrder = reader.readEnum();
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
            return GetTasksResponse.deserialize(bytes);
        }
    }
    _GetTasksResponse_one_of_decls = new WeakMap();
    task_package.GetTasksResponse = GetTasksResponse;
    class GetTaskRequest extends pb_1.Message {
        constructor(data) {
            super();
            _GetTaskRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _GetTaskRequest_one_of_decls, "f"));
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
            const message = new GetTaskRequest({});
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
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetTaskRequest();
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
            return GetTaskRequest.deserialize(bytes);
        }
    }
    _GetTaskRequest_one_of_decls = new WeakMap();
    task_package.GetTaskRequest = GetTaskRequest;
    class GetTaskResponse extends pb_1.Message {
        constructor(data) {
            super();
            _GetTaskResponse_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _GetTaskResponse_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("task" in data && data.task != undefined) {
                    this.task = data.task;
                }
            }
        }
        get task() {
            return pb_1.Message.getWrapperField(this, PopulatedTask, 1);
        }
        set task(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_task() {
            return pb_1.Message.getField(this, 1) != null;
        }
        static fromObject(data) {
            const message = new GetTaskResponse({});
            if (data.task != null) {
                message.task = PopulatedTask.fromObject(data.task);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.task != null) {
                data.task = this.task.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_task)
                writer.writeMessage(1, this.task, () => this.task.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetTaskResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.task, () => message.task = PopulatedTask.deserialize(reader));
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
            return GetTaskResponse.deserialize(bytes);
        }
    }
    _GetTaskResponse_one_of_decls = new WeakMap();
    task_package.GetTaskResponse = GetTaskResponse;
    class CreateTaskRequest extends pb_1.Message {
        constructor(data) {
            super();
            _CreateTaskRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [4], __classPrivateFieldGet(this, _CreateTaskRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("title" in data && data.title != undefined) {
                    this.title = data.title;
                }
                if ("description" in data && data.description != undefined) {
                    this.description = data.description;
                }
                if ("user" in data && data.user != undefined) {
                    this.user = data.user;
                }
                if ("collaborators" in data && data.collaborators != undefined) {
                    this.collaborators = data.collaborators;
                }
                if ("category" in data && data.category != undefined) {
                    this.category = data.category;
                }
            }
        }
        get title() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set title(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get description() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set description(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get user() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set user(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get collaborators() {
            return pb_1.Message.getFieldWithDefault(this, 4, []);
        }
        set collaborators(value) {
            pb_1.Message.setField(this, 4, value);
        }
        get category() {
            return pb_1.Message.getFieldWithDefault(this, 5, "");
        }
        set category(value) {
            pb_1.Message.setField(this, 5, value);
        }
        static fromObject(data) {
            const message = new CreateTaskRequest({});
            if (data.title != null) {
                message.title = data.title;
            }
            if (data.description != null) {
                message.description = data.description;
            }
            if (data.user != null) {
                message.user = data.user;
            }
            if (data.collaborators != null) {
                message.collaborators = data.collaborators;
            }
            if (data.category != null) {
                message.category = data.category;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.title != null) {
                data.title = this.title;
            }
            if (this.description != null) {
                data.description = this.description;
            }
            if (this.user != null) {
                data.user = this.user;
            }
            if (this.collaborators != null) {
                data.collaborators = this.collaborators;
            }
            if (this.category != null) {
                data.category = this.category;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.title.length)
                writer.writeString(1, this.title);
            if (this.description.length)
                writer.writeString(2, this.description);
            if (this.user.length)
                writer.writeString(3, this.user);
            if (this.collaborators.length)
                writer.writeRepeatedString(4, this.collaborators);
            if (this.category.length)
                writer.writeString(5, this.category);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CreateTaskRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.title = reader.readString();
                        break;
                    case 2:
                        message.description = reader.readString();
                        break;
                    case 3:
                        message.user = reader.readString();
                        break;
                    case 4:
                        pb_1.Message.addToRepeatedField(message, 4, reader.readString());
                        break;
                    case 5:
                        message.category = reader.readString();
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
            return CreateTaskRequest.deserialize(bytes);
        }
    }
    _CreateTaskRequest_one_of_decls = new WeakMap();
    task_package.CreateTaskRequest = CreateTaskRequest;
    class UpdateTaskRequest extends pb_1.Message {
        constructor(data) {
            super();
            _UpdateTaskRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _UpdateTaskRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("_id" in data && data._id != undefined) {
                    this._id = data._id;
                }
                if ("task" in data && data.task != undefined) {
                    this.task = data.task;
                }
            }
        }
        get _id() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set _id(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get task() {
            return pb_1.Message.getWrapperField(this, Task, 2);
        }
        set task(value) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get has_task() {
            return pb_1.Message.getField(this, 2) != null;
        }
        static fromObject(data) {
            const message = new UpdateTaskRequest({});
            if (data._id != null) {
                message._id = data._id;
            }
            if (data.task != null) {
                message.task = Task.fromObject(data.task);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this._id != null) {
                data._id = this._id;
            }
            if (this.task != null) {
                data.task = this.task.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this._id.length)
                writer.writeString(1, this._id);
            if (this.has_task)
                writer.writeMessage(2, this.task, () => this.task.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new UpdateTaskRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message._id = reader.readString();
                        break;
                    case 2:
                        reader.readMessage(message.task, () => message.task = Task.deserialize(reader));
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
            return UpdateTaskRequest.deserialize(bytes);
        }
    }
    _UpdateTaskRequest_one_of_decls = new WeakMap();
    task_package.UpdateTaskRequest = UpdateTaskRequest;
    class DeleteTaskRequest extends pb_1.Message {
        constructor(data) {
            super();
            _DeleteTaskRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _DeleteTaskRequest_one_of_decls, "f"));
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
            const message = new DeleteTaskRequest({});
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
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DeleteTaskRequest();
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
            return DeleteTaskRequest.deserialize(bytes);
        }
    }
    _DeleteTaskRequest_one_of_decls = new WeakMap();
    task_package.DeleteTaskRequest = DeleteTaskRequest;
    class DeleteTaskResponse extends pb_1.Message {
        constructor(data) {
            super();
            _DeleteTaskResponse_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _DeleteTaskResponse_one_of_decls, "f"));
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
            const message = new DeleteTaskResponse({});
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
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DeleteTaskResponse();
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
            return DeleteTaskResponse.deserialize(bytes);
        }
    }
    _DeleteTaskResponse_one_of_decls = new WeakMap();
    task_package.DeleteTaskResponse = DeleteTaskResponse;
    class UnimplementedTaskServiceService {
    }
    UnimplementedTaskServiceService.definition = {
        GetTasks: {
            path: "/task_package.TaskService/GetTasks",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => GetTasksRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => GetTasksResponse.deserialize(new Uint8Array(bytes))
        },
        GetLastUpdatedTasks: {
            path: "/task_package.TaskService/GetLastUpdatedTasks",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => GetLastUpdatedTasksRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => GetTasksResponse.deserialize(new Uint8Array(bytes))
        },
        GetTask: {
            path: "/task_package.TaskService/GetTask",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => GetTaskRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => GetTaskResponse.deserialize(new Uint8Array(bytes))
        },
        CreateTask: {
            path: "/task_package.TaskService/CreateTask",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => CreateTaskRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Task.deserialize(new Uint8Array(bytes))
        },
        UpdateTask: {
            path: "/task_package.TaskService/UpdateTask",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => UpdateTaskRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Task.deserialize(new Uint8Array(bytes))
        },
        DeleteTask: {
            path: "/task_package.TaskService/DeleteTask",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => DeleteTaskRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => DeleteTaskResponse.deserialize(new Uint8Array(bytes))
        }
    };
    task_package.UnimplementedTaskServiceService = UnimplementedTaskServiceService;
    class TaskServiceClient extends grpc_1.makeGenericClientConstructor(UnimplementedTaskServiceService.definition, "TaskService", {}) {
        constructor(address, credentials, options) {
            super(address, credentials, options);
            this.GetTasks = (message, metadata, options, callback) => {
                return super.GetTasks(message, metadata, options, callback);
            };
            this.GetLastUpdatedTasks = (message, metadata, options, callback) => {
                return super.GetLastUpdatedTasks(message, metadata, options, callback);
            };
            this.GetTask = (message, metadata, options, callback) => {
                return super.GetTask(message, metadata, options, callback);
            };
            this.CreateTask = (message, metadata, options, callback) => {
                return super.CreateTask(message, metadata, options, callback);
            };
            this.UpdateTask = (message, metadata, options, callback) => {
                return super.UpdateTask(message, metadata, options, callback);
            };
            this.DeleteTask = (message, metadata, options, callback) => {
                return super.DeleteTask(message, metadata, options, callback);
            };
        }
    }
    task_package.TaskServiceClient = TaskServiceClient;
})(task_package || (exports.task_package = task_package = {}));
