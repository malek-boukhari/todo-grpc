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
exports.google = void 0;
const pb_1 = __importStar(require("google-protobuf"));
var google;
(function (google) {
    var protobuf;
    (function (protobuf) {
        var _Timestamp_one_of_decls;
        class Timestamp extends pb_1.Message {
            constructor(data) {
                super();
                _Timestamp_one_of_decls.set(this, []);
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _Timestamp_one_of_decls, "f"));
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("seconds" in data && data.seconds != undefined) {
                        this.seconds = data.seconds;
                    }
                    if ("nanos" in data && data.nanos != undefined) {
                        this.nanos = data.nanos;
                    }
                }
            }
            get seconds() {
                return pb_1.Message.getFieldWithDefault(this, 1, 0);
            }
            set seconds(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get nanos() {
                return pb_1.Message.getFieldWithDefault(this, 2, 0);
            }
            set nanos(value) {
                pb_1.Message.setField(this, 2, value);
            }
            static fromObject(data) {
                const message = new Timestamp({});
                if (data.seconds != null) {
                    message.seconds = data.seconds;
                }
                if (data.nanos != null) {
                    message.nanos = data.nanos;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.seconds != null) {
                    data.seconds = this.seconds;
                }
                if (this.nanos != null) {
                    data.nanos = this.nanos;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.seconds != 0)
                    writer.writeInt64(1, this.seconds);
                if (this.nanos != 0)
                    writer.writeInt32(2, this.nanos);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Timestamp();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.seconds = reader.readInt64();
                            break;
                        case 2:
                            message.nanos = reader.readInt32();
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
                return Timestamp.deserialize(bytes);
            }
        }
        _Timestamp_one_of_decls = new WeakMap();
        protobuf.Timestamp = Timestamp;
    })(protobuf = google.protobuf || (google.protobuf = {}));
})(google || (exports.google = google = {}));
