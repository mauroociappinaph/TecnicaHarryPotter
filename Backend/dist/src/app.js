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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const userRoutes_1 = __importDefault(require("../src/routes/user/userRoutes"));
const charactersRoutes_1 = __importDefault(require("../src/routes/characters/charactersRoutes"));
const cors_1 = __importDefault(require("cors"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
class Application {
    constructor() {
        this.app = (0, express_1.default)();
        this.router = (0, express_1.Router)();
        this.settings();
        this.middlewares();
        this.routes();
        this.swaggerSetup();
    }
    settings() {
        this.app.set('port', process.env.PORT || 4000);
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.router.use('/api/user', userRoutes_1.default);
        this.router.use('/api/characters', charactersRoutes_1.default);
    }
    swaggerSetup() {
        const swaggerOptions = {
            swaggerDefinition: {
                openapi: '3.0.0',
                info: {
                    title: 'API de Harry Potter',
                    version: '1.0.0',
                    description: 'Documentación de la API de Harry Potter.',
                },
                servers: [
                    {
                        url: 'http://localhost:4000',
                    },
                ],
            },
            apis: ['./src/routes/user/userRoutes.ts', './src/routes/characters/charactersRoutes.ts'],
        };
        const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
    }
    start() {
        this.app.use('/', this.router);
        this.app.listen(this.app.get('port'), () => {
            console.log('Server running on port', this.app.get('port'));
        });
    }
}
exports.default = Application;
