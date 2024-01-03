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
    var _Avatar_one_of_decls, _User_one_of_decls, _RegisterRequest_one_of_decls, _LoginRequest_one_of_decls, _LoginResponse_one_of_decls, _GetUsersRequest_one_of_decls, _GetUsersResponse_one_of_decls, _UpdateUserRequest_one_of_decls, _SecurityFields_one_of_decls, _UpdatePasswordRequest_one_of_decls, _UpdatePasswordResponse_one_of_decls, _DeleteUserRequest_one_of_decls, _DeleteUserResponse_one_of_decls;
    class Avatar extends pb_1.Message {
        constructor(data) {
            super();
            _Avatar_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _Avatar_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("sex" in data && data.sex != undefined) {
                    this.sex = data.sex;
                }
                if ("hairStyle" in data && data.hairStyle != undefined) {
                    this.hairStyle = data.hairStyle;
                }
                if ("hairColor" in data && data.hairColor != undefined) {
                    this.hairColor = data.hairColor;
                }
                if ("faceColor" in data && data.faceColor != undefined) {
                    this.faceColor = data.faceColor;
                }
                if ("eyeStyle" in data && data.eyeStyle != undefined) {
                    this.eyeStyle = data.eyeStyle;
                }
                if ("earSize" in data && data.earSize != undefined) {
                    this.earSize = data.earSize;
                }
                if ("noseStyle" in data && data.noseStyle != undefined) {
                    this.noseStyle = data.noseStyle;
                }
                if ("mouthStyle" in data && data.mouthStyle != undefined) {
                    this.mouthStyle = data.mouthStyle;
                }
                if ("glassesStyle" in data && data.glassesStyle != undefined) {
                    this.glassesStyle = data.glassesStyle;
                }
                if ("hatStyle" in data && data.hatStyle != undefined) {
                    this.hatStyle = data.hatStyle;
                }
                if ("hatColor" in data && data.hatColor != undefined) {
                    this.hatColor = data.hatColor;
                }
                if ("shirtStyle" in data && data.shirtStyle != undefined) {
                    this.shirtStyle = data.shirtStyle;
                }
                if ("shirtColor" in data && data.shirtColor != undefined) {
                    this.shirtColor = data.shirtColor;
                }
                if ("bgColor" in data && data.bgColor != undefined) {
                    this.bgColor = data.bgColor;
                }
            }
        }
        get sex() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set sex(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get hairStyle() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set hairStyle(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get hairColor() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set hairColor(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get faceColor() {
            return pb_1.Message.getFieldWithDefault(this, 4, "");
        }
        set faceColor(value) {
            pb_1.Message.setField(this, 4, value);
        }
        get eyeStyle() {
            return pb_1.Message.getFieldWithDefault(this, 5, "");
        }
        set eyeStyle(value) {
            pb_1.Message.setField(this, 5, value);
        }
        get earSize() {
            return pb_1.Message.getFieldWithDefault(this, 6, "");
        }
        set earSize(value) {
            pb_1.Message.setField(this, 6, value);
        }
        get noseStyle() {
            return pb_1.Message.getFieldWithDefault(this, 7, "");
        }
        set noseStyle(value) {
            pb_1.Message.setField(this, 7, value);
        }
        get mouthStyle() {
            return pb_1.Message.getFieldWithDefault(this, 8, "");
        }
        set mouthStyle(value) {
            pb_1.Message.setField(this, 8, value);
        }
        get glassesStyle() {
            return pb_1.Message.getFieldWithDefault(this, 9, "");
        }
        set glassesStyle(value) {
            pb_1.Message.setField(this, 9, value);
        }
        get hatStyle() {
            return pb_1.Message.getFieldWithDefault(this, 10, "");
        }
        set hatStyle(value) {
            pb_1.Message.setField(this, 10, value);
        }
        get hatColor() {
            return pb_1.Message.getFieldWithDefault(this, 11, "");
        }
        set hatColor(value) {
            pb_1.Message.setField(this, 11, value);
        }
        get shirtStyle() {
            return pb_1.Message.getFieldWithDefault(this, 12, "");
        }
        set shirtStyle(value) {
            pb_1.Message.setField(this, 12, value);
        }
        get shirtColor() {
            return pb_1.Message.getFieldWithDefault(this, 13, "");
        }
        set shirtColor(value) {
            pb_1.Message.setField(this, 13, value);
        }
        get bgColor() {
            return pb_1.Message.getFieldWithDefault(this, 14, "");
        }
        set bgColor(value) {
            pb_1.Message.setField(this, 14, value);
        }
        static fromObject(data) {
            const message = new Avatar({});
            if (data.sex != null) {
                message.sex = data.sex;
            }
            if (data.hairStyle != null) {
                message.hairStyle = data.hairStyle;
            }
            if (data.hairColor != null) {
                message.hairColor = data.hairColor;
            }
            if (data.faceColor != null) {
                message.faceColor = data.faceColor;
            }
            if (data.eyeStyle != null) {
                message.eyeStyle = data.eyeStyle;
            }
            if (data.earSize != null) {
                message.earSize = data.earSize;
            }
            if (data.noseStyle != null) {
                message.noseStyle = data.noseStyle;
            }
            if (data.mouthStyle != null) {
                message.mouthStyle = data.mouthStyle;
            }
            if (data.glassesStyle != null) {
                message.glassesStyle = data.glassesStyle;
            }
            if (data.hatStyle != null) {
                message.hatStyle = data.hatStyle;
            }
            if (data.hatColor != null) {
                message.hatColor = data.hatColor;
            }
            if (data.shirtStyle != null) {
                message.shirtStyle = data.shirtStyle;
            }
            if (data.shirtColor != null) {
                message.shirtColor = data.shirtColor;
            }
            if (data.bgColor != null) {
                message.bgColor = data.bgColor;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.sex != null) {
                data.sex = this.sex;
            }
            if (this.hairStyle != null) {
                data.hairStyle = this.hairStyle;
            }
            if (this.hairColor != null) {
                data.hairColor = this.hairColor;
            }
            if (this.faceColor != null) {
                data.faceColor = this.faceColor;
            }
            if (this.eyeStyle != null) {
                data.eyeStyle = this.eyeStyle;
            }
            if (this.earSize != null) {
                data.earSize = this.earSize;
            }
            if (this.noseStyle != null) {
                data.noseStyle = this.noseStyle;
            }
            if (this.mouthStyle != null) {
                data.mouthStyle = this.mouthStyle;
            }
            if (this.glassesStyle != null) {
                data.glassesStyle = this.glassesStyle;
            }
            if (this.hatStyle != null) {
                data.hatStyle = this.hatStyle;
            }
            if (this.hatColor != null) {
                data.hatColor = this.hatColor;
            }
            if (this.shirtStyle != null) {
                data.shirtStyle = this.shirtStyle;
            }
            if (this.shirtColor != null) {
                data.shirtColor = this.shirtColor;
            }
            if (this.bgColor != null) {
                data.bgColor = this.bgColor;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.sex.length)
                writer.writeString(1, this.sex);
            if (this.hairStyle.length)
                writer.writeString(2, this.hairStyle);
            if (this.hairColor.length)
                writer.writeString(3, this.hairColor);
            if (this.faceColor.length)
                writer.writeString(4, this.faceColor);
            if (this.eyeStyle.length)
                writer.writeString(5, this.eyeStyle);
            if (this.earSize.length)
                writer.writeString(6, this.earSize);
            if (this.noseStyle.length)
                writer.writeString(7, this.noseStyle);
            if (this.mouthStyle.length)
                writer.writeString(8, this.mouthStyle);
            if (this.glassesStyle.length)
                writer.writeString(9, this.glassesStyle);
            if (this.hatStyle.length)
                writer.writeString(10, this.hatStyle);
            if (this.hatColor.length)
                writer.writeString(11, this.hatColor);
            if (this.shirtStyle.length)
                writer.writeString(12, this.shirtStyle);
            if (this.shirtColor.length)
                writer.writeString(13, this.shirtColor);
            if (this.bgColor.length)
                writer.writeString(14, this.bgColor);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Avatar();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.sex = reader.readString();
                        break;
                    case 2:
                        message.hairStyle = reader.readString();
                        break;
                    case 3:
                        message.hairColor = reader.readString();
                        break;
                    case 4:
                        message.faceColor = reader.readString();
                        break;
                    case 5:
                        message.eyeStyle = reader.readString();
                        break;
                    case 6:
                        message.earSize = reader.readString();
                        break;
                    case 7:
                        message.noseStyle = reader.readString();
                        break;
                    case 8:
                        message.mouthStyle = reader.readString();
                        break;
                    case 9:
                        message.glassesStyle = reader.readString();
                        break;
                    case 10:
                        message.hatStyle = reader.readString();
                        break;
                    case 11:
                        message.hatColor = reader.readString();
                        break;
                    case 12:
                        message.shirtStyle = reader.readString();
                        break;
                    case 13:
                        message.shirtColor = reader.readString();
                        break;
                    case 14:
                        message.bgColor = reader.readString();
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
            return Avatar.deserialize(bytes);
        }
    }
    _Avatar_one_of_decls = new WeakMap();
    user_package.Avatar = Avatar;
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
                if ("avatar" in data && data.avatar != undefined) {
                    this.avatar = data.avatar;
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
        get avatar() {
            return pb_1.Message.getWrapperField(this, Avatar, 4);
        }
        set avatar(value) {
            pb_1.Message.setWrapperField(this, 4, value);
        }
        get has_avatar() {
            return pb_1.Message.getField(this, 4) != null;
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
            if (data.avatar != null) {
                message.avatar = Avatar.fromObject(data.avatar);
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
            if (this.avatar != null) {
                data.avatar = this.avatar.toObject();
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
            if (this.has_avatar)
                writer.writeMessage(4, this.avatar, () => this.avatar.serialize(writer));
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
                        reader.readMessage(message.avatar, () => message.avatar = Avatar.deserialize(reader));
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
            return pb_1.Message.getWrapperField(this, RegisterRequest.RegisterFields, 1);
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
                message.user = RegisterRequest.RegisterFields.fromObject(data.user);
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
                        reader.readMessage(message.user, () => message.user = RegisterRequest.RegisterFields.deserialize(reader));
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
    (function (RegisterRequest) {
        var _RegisterFields_one_of_decls;
        class RegisterFields extends pb_1.Message {
            constructor(data) {
                super();
                _RegisterFields_one_of_decls.set(this, []);
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _RegisterFields_one_of_decls, "f"));
                if (!Array.isArray(data) && typeof data == "object") {
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
            get email() {
                return pb_1.Message.getFieldWithDefault(this, 1, "");
            }
            set email(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get username() {
                return pb_1.Message.getFieldWithDefault(this, 2, "");
            }
            set username(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get password() {
                return pb_1.Message.getFieldWithDefault(this, 3, "");
            }
            set password(value) {
                pb_1.Message.setField(this, 3, value);
            }
            static fromObject(data) {
                const message = new RegisterFields({});
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
                if (this.email.length)
                    writer.writeString(1, this.email);
                if (this.username.length)
                    writer.writeString(2, this.username);
                if (this.password.length)
                    writer.writeString(3, this.password);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RegisterFields();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.email = reader.readString();
                            break;
                        case 2:
                            message.username = reader.readString();
                            break;
                        case 3:
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
                return RegisterFields.deserialize(bytes);
            }
        }
        _RegisterFields_one_of_decls = new WeakMap();
        RegisterRequest.RegisterFields = RegisterFields;
    })(RegisterRequest = user_package.RegisterRequest || (user_package.RegisterRequest = {}));
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
    class GetUsersRequest extends pb_1.Message {
        constructor(data) {
            super();
            _GetUsersRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _GetUsersRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("userName" in data && data.userName != undefined) {
                    this.userName = data.userName;
                }
            }
        }
        get userName() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set userName(value) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data) {
            const message = new GetUsersRequest({});
            if (data.userName != null) {
                message.userName = data.userName;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.userName != null) {
                data.userName = this.userName;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.userName.length)
                writer.writeString(1, this.userName);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetUsersRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.userName = reader.readString();
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
            return GetUsersRequest.deserialize(bytes);
        }
    }
    _GetUsersRequest_one_of_decls = new WeakMap();
    user_package.GetUsersRequest = GetUsersRequest;
    class GetUsersResponse extends pb_1.Message {
        constructor(data) {
            super();
            _GetUsersResponse_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], __classPrivateFieldGet(this, _GetUsersResponse_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("users" in data && data.users != undefined) {
                    this.users = data.users;
                }
            }
        }
        get users() {
            return pb_1.Message.getRepeatedWrapperField(this, User, 1);
        }
        set users(value) {
            pb_1.Message.setRepeatedWrapperField(this, 1, value);
        }
        static fromObject(data) {
            const message = new GetUsersResponse({});
            if (data.users != null) {
                message.users = data.users.map(item => User.fromObject(item));
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.users != null) {
                data.users = this.users.map((item) => item.toObject());
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.users.length)
                writer.writeRepeatedMessage(1, this.users, (item) => item.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetUsersResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.users, () => pb_1.Message.addToRepeatedWrapperField(message, 1, User.deserialize(reader), User));
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
            return GetUsersResponse.deserialize(bytes);
        }
    }
    _GetUsersResponse_one_of_decls = new WeakMap();
    user_package.GetUsersResponse = GetUsersResponse;
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
    class SecurityFields extends pb_1.Message {
        constructor(data) {
            super();
            _SecurityFields_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _SecurityFields_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("currentPassword" in data && data.currentPassword != undefined) {
                    this.currentPassword = data.currentPassword;
                }
                if ("newPassword" in data && data.newPassword != undefined) {
                    this.newPassword = data.newPassword;
                }
            }
        }
        get currentPassword() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set currentPassword(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get newPassword() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set newPassword(value) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data) {
            const message = new SecurityFields({});
            if (data.currentPassword != null) {
                message.currentPassword = data.currentPassword;
            }
            if (data.newPassword != null) {
                message.newPassword = data.newPassword;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.currentPassword != null) {
                data.currentPassword = this.currentPassword;
            }
            if (this.newPassword != null) {
                data.newPassword = this.newPassword;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.currentPassword.length)
                writer.writeString(1, this.currentPassword);
            if (this.newPassword.length)
                writer.writeString(2, this.newPassword);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SecurityFields();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.currentPassword = reader.readString();
                        break;
                    case 2:
                        message.newPassword = reader.readString();
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
            return SecurityFields.deserialize(bytes);
        }
    }
    _SecurityFields_one_of_decls = new WeakMap();
    user_package.SecurityFields = SecurityFields;
    class UpdatePasswordRequest extends pb_1.Message {
        constructor(data) {
            super();
            _UpdatePasswordRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _UpdatePasswordRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("_id" in data && data._id != undefined) {
                    this._id = data._id;
                }
                if ("security" in data && data.security != undefined) {
                    this.security = data.security;
                }
            }
        }
        get _id() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set _id(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get security() {
            return pb_1.Message.getWrapperField(this, SecurityFields, 2);
        }
        set security(value) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get has_security() {
            return pb_1.Message.getField(this, 2) != null;
        }
        static fromObject(data) {
            const message = new UpdatePasswordRequest({});
            if (data._id != null) {
                message._id = data._id;
            }
            if (data.security != null) {
                message.security = SecurityFields.fromObject(data.security);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this._id != null) {
                data._id = this._id;
            }
            if (this.security != null) {
                data.security = this.security.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this._id.length)
                writer.writeString(1, this._id);
            if (this.has_security)
                writer.writeMessage(2, this.security, () => this.security.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new UpdatePasswordRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message._id = reader.readString();
                        break;
                    case 2:
                        reader.readMessage(message.security, () => message.security = SecurityFields.deserialize(reader));
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
            return UpdatePasswordRequest.deserialize(bytes);
        }
    }
    _UpdatePasswordRequest_one_of_decls = new WeakMap();
    user_package.UpdatePasswordRequest = UpdatePasswordRequest;
    class UpdatePasswordResponse extends pb_1.Message {
        constructor(data) {
            super();
            _UpdatePasswordResponse_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _UpdatePasswordResponse_one_of_decls, "f"));
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
            const message = new UpdatePasswordResponse({});
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
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new UpdatePasswordResponse();
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
            return UpdatePasswordResponse.deserialize(bytes);
        }
    }
    _UpdatePasswordResponse_one_of_decls = new WeakMap();
    user_package.UpdatePasswordResponse = UpdatePasswordResponse;
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
    class UnimplementedUserServiceService {
    }
    UnimplementedUserServiceService.definition = {
        Register: {
            path: "/user_package.UserService/Register",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => RegisterRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => User.deserialize(new Uint8Array(bytes))
        },
        Login: {
            path: "/user_package.UserService/Login",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => LoginRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => LoginResponse.deserialize(new Uint8Array(bytes))
        },
        GetUsers: {
            path: "/user_package.UserService/GetUsers",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => GetUsersRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => GetUsersResponse.deserialize(new Uint8Array(bytes))
        },
        UpdateUser: {
            path: "/user_package.UserService/UpdateUser",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => UpdateUserRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => User.deserialize(new Uint8Array(bytes))
        },
        UpdatePassword: {
            path: "/user_package.UserService/UpdatePassword",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => UpdatePasswordRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => UpdatePasswordResponse.deserialize(new Uint8Array(bytes))
        },
        DeleteUser: {
            path: "/user_package.UserService/DeleteUser",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => DeleteUserRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => DeleteUserResponse.deserialize(new Uint8Array(bytes))
        }
    };
    user_package.UnimplementedUserServiceService = UnimplementedUserServiceService;
    class UserServiceClient extends grpc_1.makeGenericClientConstructor(UnimplementedUserServiceService.definition, "UserService", {}) {
        constructor(address, credentials, options) {
            super(address, credentials, options);
            this.Register = (message, metadata, options, callback) => {
                return super.Register(message, metadata, options, callback);
            };
            this.Login = (message, metadata, options, callback) => {
                return super.Login(message, metadata, options, callback);
            };
            this.GetUsers = (message, metadata, options, callback) => {
                return super.GetUsers(message, metadata, options, callback);
            };
            this.UpdateUser = (message, metadata, options, callback) => {
                return super.UpdateUser(message, metadata, options, callback);
            };
            this.UpdatePassword = (message, metadata, options, callback) => {
                return super.UpdatePassword(message, metadata, options, callback);
            };
            this.DeleteUser = (message, metadata, options, callback) => {
                return super.DeleteUser(message, metadata, options, callback);
            };
        }
    }
    user_package.UserServiceClient = UserServiceClient;
})(user_package || (exports.user_package = user_package = {}));
