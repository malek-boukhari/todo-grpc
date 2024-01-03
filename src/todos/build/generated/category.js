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
exports.category_package = void 0;
const pb_1 = __importStar(require("google-protobuf"));
const grpc_1 = __importStar(require("@grpc/grpc-js"));
var category_package;
(function (category_package) {
    var _Category_one_of_decls, _GetCategoriesRequest_one_of_decls, _GetCategoriesResponse_one_of_decls, _CreateCategoryRequest_one_of_decls, _UpdateCategoryRequest_one_of_decls, _DeleteCategoryRequest_one_of_decls, _DeleteCategoryResponse_one_of_decls;
    class Category extends pb_1.Message {
        constructor(data) {
            super();
            _Category_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _Category_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("_id" in data && data._id != undefined) {
                    this._id = data._id;
                }
                if ("name" in data && data.name != undefined) {
                    this.name = data.name;
                }
                if ("color" in data && data.color != undefined) {
                    this.color = data.color;
                }
                if ("user" in data && data.user != undefined) {
                    this.user = data.user;
                }
            }
        }
        get _id() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set _id(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get name() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set name(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get color() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set color(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get user() {
            return pb_1.Message.getFieldWithDefault(this, 4, "");
        }
        set user(value) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data) {
            const message = new Category({});
            if (data._id != null) {
                message._id = data._id;
            }
            if (data.name != null) {
                message.name = data.name;
            }
            if (data.color != null) {
                message.color = data.color;
            }
            if (data.user != null) {
                message.user = data.user;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this._id != null) {
                data._id = this._id;
            }
            if (this.name != null) {
                data.name = this.name;
            }
            if (this.color != null) {
                data.color = this.color;
            }
            if (this.user != null) {
                data.user = this.user;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this._id.length)
                writer.writeString(1, this._id);
            if (this.name.length)
                writer.writeString(2, this.name);
            if (this.color.length)
                writer.writeString(3, this.color);
            if (this.user.length)
                writer.writeString(4, this.user);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Category();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message._id = reader.readString();
                        break;
                    case 2:
                        message.name = reader.readString();
                        break;
                    case 3:
                        message.color = reader.readString();
                        break;
                    case 4:
                        message.user = reader.readString();
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
            return Category.deserialize(bytes);
        }
    }
    _Category_one_of_decls = new WeakMap();
    category_package.Category = Category;
    class GetCategoriesRequest extends pb_1.Message {
        constructor(data) {
            super();
            _GetCategoriesRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _GetCategoriesRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("userId" in data && data.userId != undefined) {
                    this.userId = data.userId;
                }
            }
        }
        get userId() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set userId(value) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data) {
            const message = new GetCategoriesRequest({});
            if (data.userId != null) {
                message.userId = data.userId;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.userId != null) {
                data.userId = this.userId;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.userId.length)
                writer.writeString(1, this.userId);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetCategoriesRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.userId = reader.readString();
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
            return GetCategoriesRequest.deserialize(bytes);
        }
    }
    _GetCategoriesRequest_one_of_decls = new WeakMap();
    category_package.GetCategoriesRequest = GetCategoriesRequest;
    class GetCategoriesResponse extends pb_1.Message {
        constructor(data) {
            super();
            _GetCategoriesResponse_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], __classPrivateFieldGet(this, _GetCategoriesResponse_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("categories" in data && data.categories != undefined) {
                    this.categories = data.categories;
                }
            }
        }
        get categories() {
            return pb_1.Message.getRepeatedWrapperField(this, Category, 1);
        }
        set categories(value) {
            pb_1.Message.setRepeatedWrapperField(this, 1, value);
        }
        static fromObject(data) {
            const message = new GetCategoriesResponse({});
            if (data.categories != null) {
                message.categories = data.categories.map(item => Category.fromObject(item));
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.categories != null) {
                data.categories = this.categories.map((item) => item.toObject());
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.categories.length)
                writer.writeRepeatedMessage(1, this.categories, (item) => item.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetCategoriesResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.categories, () => pb_1.Message.addToRepeatedWrapperField(message, 1, Category.deserialize(reader), Category));
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
            return GetCategoriesResponse.deserialize(bytes);
        }
    }
    _GetCategoriesResponse_one_of_decls = new WeakMap();
    category_package.GetCategoriesResponse = GetCategoriesResponse;
    class CreateCategoryRequest extends pb_1.Message {
        constructor(data) {
            super();
            _CreateCategoryRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _CreateCategoryRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("name" in data && data.name != undefined) {
                    this.name = data.name;
                }
                if ("color" in data && data.color != undefined) {
                    this.color = data.color;
                }
                if ("user" in data && data.user != undefined) {
                    this.user = data.user;
                }
            }
        }
        get name() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set name(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get color() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set color(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get user() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set user(value) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data) {
            const message = new CreateCategoryRequest({});
            if (data.name != null) {
                message.name = data.name;
            }
            if (data.color != null) {
                message.color = data.color;
            }
            if (data.user != null) {
                message.user = data.user;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.name != null) {
                data.name = this.name;
            }
            if (this.color != null) {
                data.color = this.color;
            }
            if (this.user != null) {
                data.user = this.user;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.name.length)
                writer.writeString(1, this.name);
            if (this.color.length)
                writer.writeString(2, this.color);
            if (this.user.length)
                writer.writeString(3, this.user);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CreateCategoryRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.name = reader.readString();
                        break;
                    case 2:
                        message.color = reader.readString();
                        break;
                    case 3:
                        message.user = reader.readString();
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
            return CreateCategoryRequest.deserialize(bytes);
        }
    }
    _CreateCategoryRequest_one_of_decls = new WeakMap();
    category_package.CreateCategoryRequest = CreateCategoryRequest;
    class UpdateCategoryRequest extends pb_1.Message {
        constructor(data) {
            super();
            _UpdateCategoryRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _UpdateCategoryRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("_id" in data && data._id != undefined) {
                    this._id = data._id;
                }
                if ("category" in data && data.category != undefined) {
                    this.category = data.category;
                }
            }
        }
        get _id() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set _id(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get category() {
            return pb_1.Message.getWrapperField(this, Category, 2);
        }
        set category(value) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get has_category() {
            return pb_1.Message.getField(this, 2) != null;
        }
        static fromObject(data) {
            const message = new UpdateCategoryRequest({});
            if (data._id != null) {
                message._id = data._id;
            }
            if (data.category != null) {
                message.category = Category.fromObject(data.category);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this._id != null) {
                data._id = this._id;
            }
            if (this.category != null) {
                data.category = this.category.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this._id.length)
                writer.writeString(1, this._id);
            if (this.has_category)
                writer.writeMessage(2, this.category, () => this.category.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new UpdateCategoryRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message._id = reader.readString();
                        break;
                    case 2:
                        reader.readMessage(message.category, () => message.category = Category.deserialize(reader));
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
            return UpdateCategoryRequest.deserialize(bytes);
        }
    }
    _UpdateCategoryRequest_one_of_decls = new WeakMap();
    category_package.UpdateCategoryRequest = UpdateCategoryRequest;
    class DeleteCategoryRequest extends pb_1.Message {
        constructor(data) {
            super();
            _DeleteCategoryRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _DeleteCategoryRequest_one_of_decls, "f"));
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
            const message = new DeleteCategoryRequest({});
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
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DeleteCategoryRequest();
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
            return DeleteCategoryRequest.deserialize(bytes);
        }
    }
    _DeleteCategoryRequest_one_of_decls = new WeakMap();
    category_package.DeleteCategoryRequest = DeleteCategoryRequest;
    class DeleteCategoryResponse extends pb_1.Message {
        constructor(data) {
            super();
            _DeleteCategoryResponse_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _DeleteCategoryResponse_one_of_decls, "f"));
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
            const message = new DeleteCategoryResponse({});
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
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DeleteCategoryResponse();
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
            return DeleteCategoryResponse.deserialize(bytes);
        }
    }
    _DeleteCategoryResponse_one_of_decls = new WeakMap();
    category_package.DeleteCategoryResponse = DeleteCategoryResponse;
    class UnimplementedCategoryServiceService {
    }
    UnimplementedCategoryServiceService.definition = {
        GetCategories: {
            path: "/category_package.CategoryService/GetCategories",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => GetCategoriesRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => GetCategoriesResponse.deserialize(new Uint8Array(bytes))
        },
        CreateCategory: {
            path: "/category_package.CategoryService/CreateCategory",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => CreateCategoryRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Category.deserialize(new Uint8Array(bytes))
        },
        UpdateCategory: {
            path: "/category_package.CategoryService/UpdateCategory",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => UpdateCategoryRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Category.deserialize(new Uint8Array(bytes))
        },
        DeleteCategory: {
            path: "/category_package.CategoryService/DeleteCategory",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => DeleteCategoryRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => DeleteCategoryResponse.deserialize(new Uint8Array(bytes))
        }
    };
    category_package.UnimplementedCategoryServiceService = UnimplementedCategoryServiceService;
    class CategoryServiceClient extends grpc_1.makeGenericClientConstructor(UnimplementedCategoryServiceService.definition, "CategoryService", {}) {
        constructor(address, credentials, options) {
            super(address, credentials, options);
            this.GetCategories = (message, metadata, options, callback) => {
                return super.GetCategories(message, metadata, options, callback);
            };
            this.CreateCategory = (message, metadata, options, callback) => {
                return super.CreateCategory(message, metadata, options, callback);
            };
            this.UpdateCategory = (message, metadata, options, callback) => {
                return super.UpdateCategory(message, metadata, options, callback);
            };
            this.DeleteCategory = (message, metadata, options, callback) => {
                return super.DeleteCategory(message, metadata, options, callback);
            };
        }
    }
    category_package.CategoryServiceClient = CategoryServiceClient;
})(category_package || (exports.category_package = category_package = {}));
