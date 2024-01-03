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
exports.label_package = void 0;
const pb_1 = __importStar(require("google-protobuf"));
const grpc_1 = __importStar(require("@grpc/grpc-js"));
var label_package;
(function (label_package) {
    var _Label_one_of_decls, _GetLabelsRequest_one_of_decls, _GetLabelsResponse_one_of_decls, _CreateLabelRequest_one_of_decls, _UpdateLabelRequest_one_of_decls, _DeleteLabelRequest_one_of_decls, _DeleteLabelResponse_one_of_decls;
    class Label extends pb_1.Message {
        constructor(data) {
            super();
            _Label_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _Label_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("_id" in data && data._id != undefined) {
                    this._id = data._id;
                }
                if ("label" in data && data.label != undefined) {
                    this.label = data.label;
                }
                if ("color" in data && data.color != undefined) {
                    this.color = data.color;
                }
                if ("userId" in data && data.userId != undefined) {
                    this.userId = data.userId;
                }
            }
        }
        get _id() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set _id(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get label() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set label(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get color() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set color(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get userId() {
            return pb_1.Message.getFieldWithDefault(this, 4, "");
        }
        set userId(value) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data) {
            const message = new Label({});
            if (data._id != null) {
                message._id = data._id;
            }
            if (data.label != null) {
                message.label = data.label;
            }
            if (data.color != null) {
                message.color = data.color;
            }
            if (data.userId != null) {
                message.userId = data.userId;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this._id != null) {
                data._id = this._id;
            }
            if (this.label != null) {
                data.label = this.label;
            }
            if (this.color != null) {
                data.color = this.color;
            }
            if (this.userId != null) {
                data.userId = this.userId;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this._id.length)
                writer.writeString(1, this._id);
            if (this.label.length)
                writer.writeString(2, this.label);
            if (this.color.length)
                writer.writeString(3, this.color);
            if (this.userId.length)
                writer.writeString(4, this.userId);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Label();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message._id = reader.readString();
                        break;
                    case 2:
                        message.label = reader.readString();
                        break;
                    case 3:
                        message.color = reader.readString();
                        break;
                    case 4:
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
            return Label.deserialize(bytes);
        }
    }
    _Label_one_of_decls = new WeakMap();
    label_package.Label = Label;
    class GetLabelsRequest extends pb_1.Message {
        constructor(data) {
            super();
            _GetLabelsRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _GetLabelsRequest_one_of_decls, "f"));
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
            const message = new GetLabelsRequest({});
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
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetLabelsRequest();
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
            return GetLabelsRequest.deserialize(bytes);
        }
    }
    _GetLabelsRequest_one_of_decls = new WeakMap();
    label_package.GetLabelsRequest = GetLabelsRequest;
    class GetLabelsResponse extends pb_1.Message {
        constructor(data) {
            super();
            _GetLabelsResponse_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], __classPrivateFieldGet(this, _GetLabelsResponse_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("labels" in data && data.labels != undefined) {
                    this.labels = data.labels;
                }
            }
        }
        get labels() {
            return pb_1.Message.getRepeatedWrapperField(this, Label, 1);
        }
        set labels(value) {
            pb_1.Message.setRepeatedWrapperField(this, 1, value);
        }
        static fromObject(data) {
            const message = new GetLabelsResponse({});
            if (data.labels != null) {
                message.labels = data.labels.map(item => Label.fromObject(item));
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.labels != null) {
                data.labels = this.labels.map((item) => item.toObject());
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.labels.length)
                writer.writeRepeatedMessage(1, this.labels, (item) => item.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetLabelsResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.labels, () => pb_1.Message.addToRepeatedWrapperField(message, 1, Label.deserialize(reader), Label));
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
            return GetLabelsResponse.deserialize(bytes);
        }
    }
    _GetLabelsResponse_one_of_decls = new WeakMap();
    label_package.GetLabelsResponse = GetLabelsResponse;
    class CreateLabelRequest extends pb_1.Message {
        constructor(data) {
            super();
            _CreateLabelRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _CreateLabelRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("label" in data && data.label != undefined) {
                    this.label = data.label;
                }
                if ("color" in data && data.color != undefined) {
                    this.color = data.color;
                }
                if ("userId" in data && data.userId != undefined) {
                    this.userId = data.userId;
                }
            }
        }
        get label() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set label(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get color() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set color(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get userId() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set userId(value) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data) {
            const message = new CreateLabelRequest({});
            if (data.label != null) {
                message.label = data.label;
            }
            if (data.color != null) {
                message.color = data.color;
            }
            if (data.userId != null) {
                message.userId = data.userId;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.label != null) {
                data.label = this.label;
            }
            if (this.color != null) {
                data.color = this.color;
            }
            if (this.userId != null) {
                data.userId = this.userId;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.label.length)
                writer.writeString(1, this.label);
            if (this.color.length)
                writer.writeString(2, this.color);
            if (this.userId.length)
                writer.writeString(3, this.userId);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CreateLabelRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.label = reader.readString();
                        break;
                    case 2:
                        message.color = reader.readString();
                        break;
                    case 3:
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
            return CreateLabelRequest.deserialize(bytes);
        }
    }
    _CreateLabelRequest_one_of_decls = new WeakMap();
    label_package.CreateLabelRequest = CreateLabelRequest;
    class UpdateLabelRequest extends pb_1.Message {
        constructor(data) {
            super();
            _UpdateLabelRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _UpdateLabelRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("_id" in data && data._id != undefined) {
                    this._id = data._id;
                }
                if ("label" in data && data.label != undefined) {
                    this.label = data.label;
                }
            }
        }
        get _id() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set _id(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get label() {
            return pb_1.Message.getWrapperField(this, Label, 2);
        }
        set label(value) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get has_label() {
            return pb_1.Message.getField(this, 2) != null;
        }
        static fromObject(data) {
            const message = new UpdateLabelRequest({});
            if (data._id != null) {
                message._id = data._id;
            }
            if (data.label != null) {
                message.label = Label.fromObject(data.label);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this._id != null) {
                data._id = this._id;
            }
            if (this.label != null) {
                data.label = this.label.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this._id.length)
                writer.writeString(1, this._id);
            if (this.has_label)
                writer.writeMessage(2, this.label, () => this.label.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new UpdateLabelRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message._id = reader.readString();
                        break;
                    case 2:
                        reader.readMessage(message.label, () => message.label = Label.deserialize(reader));
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
            return UpdateLabelRequest.deserialize(bytes);
        }
    }
    _UpdateLabelRequest_one_of_decls = new WeakMap();
    label_package.UpdateLabelRequest = UpdateLabelRequest;
    class DeleteLabelRequest extends pb_1.Message {
        constructor(data) {
            super();
            _DeleteLabelRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _DeleteLabelRequest_one_of_decls, "f"));
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
            const message = new DeleteLabelRequest({});
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
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DeleteLabelRequest();
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
            return DeleteLabelRequest.deserialize(bytes);
        }
    }
    _DeleteLabelRequest_one_of_decls = new WeakMap();
    label_package.DeleteLabelRequest = DeleteLabelRequest;
    class DeleteLabelResponse extends pb_1.Message {
        constructor(data) {
            super();
            _DeleteLabelResponse_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _DeleteLabelResponse_one_of_decls, "f"));
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
            const message = new DeleteLabelResponse({});
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
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DeleteLabelResponse();
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
            return DeleteLabelResponse.deserialize(bytes);
        }
    }
    _DeleteLabelResponse_one_of_decls = new WeakMap();
    label_package.DeleteLabelResponse = DeleteLabelResponse;
    class UnimplementedLabelServiceService {
    }
    UnimplementedLabelServiceService.definition = {
        CreateLabel: {
            path: "/label_package.LabelService/CreateLabel",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => CreateLabelRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Label.deserialize(new Uint8Array(bytes))
        },
        UpdateLabel: {
            path: "/label_package.LabelService/UpdateLabel",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => UpdateLabelRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Label.deserialize(new Uint8Array(bytes))
        },
        DeleteLabel: {
            path: "/label_package.LabelService/DeleteLabel",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => DeleteLabelRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => DeleteLabelResponse.deserialize(new Uint8Array(bytes))
        },
        GetLabels: {
            path: "/label_package.LabelService/GetLabels",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => GetLabelsRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => GetLabelsResponse.deserialize(new Uint8Array(bytes))
        }
    };
    label_package.UnimplementedLabelServiceService = UnimplementedLabelServiceService;
    class LabelServiceClient extends grpc_1.makeGenericClientConstructor(UnimplementedLabelServiceService.definition, "LabelService", {}) {
        constructor(address, credentials, options) {
            super(address, credentials, options);
            this.CreateLabel = (message, metadata, options, callback) => {
                return super.CreateLabel(message, metadata, options, callback);
            };
            this.UpdateLabel = (message, metadata, options, callback) => {
                return super.UpdateLabel(message, metadata, options, callback);
            };
            this.DeleteLabel = (message, metadata, options, callback) => {
                return super.DeleteLabel(message, metadata, options, callback);
            };
            this.GetLabels = (message, metadata, options, callback) => {
                return super.GetLabels(message, metadata, options, callback);
            };
        }
    }
    label_package.LabelServiceClient = LabelServiceClient;
})(label_package || (exports.label_package = label_package = {}));
