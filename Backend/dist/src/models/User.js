"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcryptjs"));
const generarId_1 = __importDefault(require("../../helpers/generarId"));
const UserSchema = new mongoose_1.default.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  token: {
    type: String,
    default: (0, generarId_1.default)(),
  },
  confirmado: {
    type: Boolean,
    default: false,
  },
});
// Pre-save hook para encriptar la contraseña
UserSchema.pre("save", function (next) {
  return __awaiter(this, void 0, void 0, function* () {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    this.password = yield bcrypt_1.default.hash(this.password, salt);
    next();
  });
});
// Método para comprobar la contraseña
UserSchema.methods.comprobarPassword = function (passwordFormulario) {
  return __awaiter(this, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(passwordFormulario, this.password);
  });
};
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
