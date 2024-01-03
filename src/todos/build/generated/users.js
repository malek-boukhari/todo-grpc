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
exports.user_package = void 0;
const pb_1 = __importStar(require("google-protobuf"));
const grpc_1 = __importStar(require("@grpc/grpc-js"));
var user_package;
(function (user_package) {
    var _User_one_of_decls, _RegisterRequest_one_of_decls, _RegisterResponse_one_of_decls, _LoginRequest_one_of_decls, _LoginResponse_one_of_decls, _UpdateUserRequest_one_of_decls, _DeleteUserRequest_one_of_decls, _DeleteUserResponse_one_of_decls;
    class User extends pb_1.Message {
        constructor(data) {
            super();
            _User_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _User_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("_id" in data && data._id != undefined) {
                    this._id = data._id;
                }
                if ("email" in data && data.email != undefined) {
                    this.email = data.email;
                }
                if ("username" in data && data.username != undefined) {
                    this.username = data.username;
                }
                if ("password" in data && data.password != undefined) {
                    this.password = data.password;
                }
            }
        }
        get _id() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set _id(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get email() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set email(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get username() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set username(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get password() {
            return pb_1.Message.getFieldWithDefault(this, 4, "");
        }
        set password(value) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data) {
            const message = new User({});
            if (data._id != null) {
                message._id = data._id;
            }
            if (data.email != null) {
                message.email = data.email;
            }
            if (data.username != null) {
                message.username = data.username;
            }
            if (data.password != null) {
                message.password = data.password;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this._id != null) {
                data._id = this._id;
            }
            if (this.email != null) {
                data.email = this.email;
            }
            if (this.username != null) {
                data.username = this.username;
            }
            if (this.password != null) {
                data.password = this.password;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this._id.length)
                writer.writeString(1, this._id);
            if (this.email.length)
                writer.writeString(2, this.email);
            if (this.username.length)
                writer.writeString(3, this.username);
            if (this.password.length)
                writer.writeString(4, this.password);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new User();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message._id = reader.readString();
                        break;
                    case 2:
                        message.email = reader.readString();
                        break;
                    case 3:
                        message.username = reader.readString();
                        break;
                    case 4:
                        message.password = reader.readString();
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
            return User.deserialize(bytes);
        }
    }
    _User_one_of_decls = new WeakMap();
    user_package.User = User;
    class RegisterRequest extends pb_1.Message {
        constructor(data) {
            super();
            _RegisterRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _RegisterRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("user" in data && data.user != undefined) {
                    this.user = data.user;
                }
            }
        }
        get user() {
            return pb_1.Message.getWrapperField(this, User, 1);
        }
        set user(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_user() {
            return pb_1.Message.getField(this, 1) != null;
        }
        static fromObject(data) {
            const message = new RegisterRequest({});
            if (data.user != null) {
                message.user = User.fromObject(data.user);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.user != null) {
                data.user = this.user.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_user)
                writer.writeMessage(1, this.user, () => this.user.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RegisterRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.user, () => message.user = User.deserialize(reader));
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
            return RegisterRequest.deserialize(bytes);
        }
    }
    _RegisterRequest_one_of_decls = new WeakMap();
    user_package.RegisterRequest = RegisterRequest;
    class RegisterResponse extends pb_1.Message {
        constructor(data) {
            super();
            _RegisterResponse_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _RegisterResponse_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("user" in data && data.user != undefined) {
                    this.user = data.user;
                }
            }
        }
        get user() {
            return pb_1.Message.getWrapperField(this, User, 1);
        }
        set user(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_user() {
            return pb_1.Message.getField(this, 1) != null;
        }
        static fromObject(data) {
            const message = new RegisterResponse({});
            if (data.user != null) {
                message.user = User.fromObject(data.user);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.user != null) {
                data.user = this.user.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_user)
                writer.writeMessage(1, this.user, () => this.user.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RegisterResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.user, () => message.user = User.deserialize(reader));
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
            return RegisterResponse.deserialize(bytes);
        }
    }
    _RegisterResponse_one_of_decls = new WeakMap();
    user_package.RegisterResponse = RegisterResponse;
    class LoginRequest extends pb_1.Message {
        constructor(data) {
            super();
            _LoginRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _LoginRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("email" in data && data.email != undefined) {
                    this.email = data.email;
                }
                if ("password" in data && data.password != undefined) {
                    this.password = data.password;
                }
            }
        }
        get email() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set email(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get password() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set password(value) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data) {
            const message = new LoginRequest({});
            if (data.email != null) {
                message.email = data.email;
            }
            if (data.password != null) {
                message.password = data.password;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.email != null) {
                data.email = this.email;
            }
            if (this.password != null) {
                data.password = this.password;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.email.length)
                writer.writeString(1, this.email);
            if (this.password.length)
                writer.writeString(2, this.password);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new LoginRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.email = reader.readString();
                        break;
                    case 2:
                        message.password = reader.readString();
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
            return LoginRequest.deserialize(bytes);
        }
    }
    _LoginRequest_one_of_decls = new WeakMap();
    user_package.LoginRequest = LoginRequest;
    class LoginResponse extends pb_1.Message {
        constructor(data) {
            super();
            _LoginResponse_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _LoginResponse_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("token" in data && data.token != undefined) {
                    this.token = data.token;
                }
            }
        }
        get token() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set token(value) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data) {
            const message = new LoginResponse({});
            if (data.token != null) {
                message.token = data.token;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.token != null) {
                data.token = this.token;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.token.length)
                writer.writeString(1, this.token);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new LoginResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.token = reader.readString();
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
            return LoginResponse.deserialize(bytes);
        }
    }
    _LoginResponse_one_of_decls = new WeakMap();
    user_package.LoginResponse = LoginResponse;
    class UpdateUserRequest extends pb_1.Message {
        constructor(data) {
            super();
            _UpdateUserRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _UpdateUserRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("_id" in data && data._id != undefined) {
                    this._id = data._id;
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
        get user() {
            return pb_1.Message.getWrapperField(this, User, 2);
        }
        set user(value) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get has_user() {
            return pb_1.Message.getField(this, 2) != null;
        }
        static fromObject(data) {
            const message = new UpdateUserRequest({});
            if (data._id != null) {
                message._id = data._id;
            }
            if (data.user != null) {
                message.user = User.fromObject(data.user);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this._id != null) {
                data._id = this._id;
            }
            if (this.user != null) {
                data.user = this.user.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this._id.length)
                writer.writeString(1, this._id);
            if (this.has_user)
                writer.writeMessage(2, this.user, () => this.user.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new UpdateUserRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message._id = reader.readString();
                        break;
                    case 2:
                        reader.readMessage(message.user, () => message.user = User.deserialize(reader));
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
            return UpdateUserRequest.deserialize(bytes);
        }
    }
    _UpdateUserRequest_one_of_decls = new WeakMap();
    user_package.UpdateUserRequest = UpdateUserRequest;
    class DeleteUserRequest extends pb_1.Message {
        constructor(data) {
            super();
            _DeleteUserRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _DeleteUserRequest_one_of_decls, "f"));
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
            const message = new DeleteUserRequest({});
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
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DeleteUserRequest();
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
            return DeleteUserRequest.deserialize(bytes);
        }
    }
    _DeleteUserRequest_one_of_decls = new WeakMap();
    user_package.DeleteUserRequest = DeleteUserRequest;
    class DeleteUserResponse extends pb_1.Message {
        constructor(data) {
            super();
            _DeleteUserResponse_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _DeleteUserResponse_one_of_decls, "f"));
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
            const message = new DeleteUserResponse({});
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
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DeleteUserResponse();
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
            return DeleteUserResponse.deserialize(bytes);
        }
    }
    _DeleteUserResponse_one_of_decls = new WeakMap();
    user_package.DeleteUserResponse = DeleteUserResponse;
    class UnimplementedUsersService {
    }
    UnimplementedUsersService.definition = {
        Register: {
            path: "/user_package.Users/Register",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => RegisterRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => RegisterResponse.deserialize(new Uint8Array(bytes))
        },
        Login: {
            path: "/user_package.Users/Login",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => LoginRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => LoginResponse.deserialize(new Uint8Array(bytes))
        },
        UpdateUser: {
            path: "/user_package.Users/UpdateUser",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => UpdateUserRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => User.deserialize(new Uint8Array(bytes))
        },
        DeleteUser: {
            path: "/user_package.Users/DeleteUser",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => DeleteUserRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => DeleteUserResponse.deserialize(new Uint8Array(bytes))
        }
    };
    user_package.UnimplementedUsersService = UnimplementedUsersService;
    class UsersClient extends grpc_1.makeGenericClientConstructor(UnimplementedUsersService.definition, "Users", {}) {
        constructor(address, credentials, options) {
            super(address, credentials, options);
            this.Register = (message, metadata, options, callback) => {
                return super.Register(message, metadata, options, callback);
            };
            this.Login = (message, metadata, options, callback) => {
                return super.Login(message, metadata, options, callback);
            };
            this.UpdateUser = (message, metadata, options, callback) => {
                return super.UpdateUser(message, metadata, options, callback);
            };
            this.DeleteUser = (message, metadata, options, callback) => {
                return super.DeleteUser(message, metadata, options, callback);
            };
        }
    }
    user_package.UsersClient = UsersClient;
})(user_package || (exports.user_package = user_package = {}));
