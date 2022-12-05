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
const app_1 = __importDefault(require("../../../src/app/app"));
const db = __importStar(require("../../../src/database"));
const user_model_1 = __importDefault(require("../../../src/modules/user/user.model"));
const supertest_1 = __importDefault(require("supertest"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const globals_1 = require("@jest/globals");
(0, globals_1.describe)("Login route", () => {
    (0, globals_1.beforeAll)(async () => {
        await db.connect();
    });
    (0, globals_1.afterAll)(async () => {
        await db.disconnect();
    });
    (0, globals_1.it)("rejects login without email", async () => {
        const response = await (0, supertest_1.default)(app_1.default).post("/api/login").send({
            password: "12345789",
        });
        (0, globals_1.expect)(response.statusCode).toBe(400);
    });
    (0, globals_1.it)("rejects login without password", async () => {
        const response = await (0, supertest_1.default)(app_1.default).post("/api/login").send({
            email: "123",
        });
        (0, globals_1.expect)(response.statusCode).toBe(400);
    });
    (0, globals_1.it)("should authenticate user with valid email and password", async () => {
        const email = "testing@testing.com";
        const password = "TestPassword";
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await user_model_1.default.create({
            username: "New User",
            email: email,
            password: hashedPassword,
        });
        const response = await (0, supertest_1.default)(app_1.default).post("/api/login").send({
            email,
            password,
        });
        await user_model_1.default.deleteOne({
            username: "New User",
            email: email,
            password: hashedPassword,
        }).exec();
        (0, globals_1.expect)(response.statusCode).toBe(200);
        (0, globals_1.expect)(response.body.accessToken).toBeDefined();
    });
});
(0, globals_1.describe)("Signup route", () => {
    (0, globals_1.beforeAll)(async () => {
        await db.connect();
    });
    (0, globals_1.afterAll)(async () => {
        await db.disconnect();
    });
    (0, globals_1.it)("rejects signup without email", async () => {
        const response = await (0, supertest_1.default)(app_1.default).post("/api/signup").send({
            password: "12345789",
        });
        (0, globals_1.expect)(response.statusCode).toBe(400);
    });
    (0, globals_1.it)("rejects signup without password", async () => {
        const response = await (0, supertest_1.default)(app_1.default).post("/api/signup").send({
            email: "123",
        });
        (0, globals_1.expect)(response.statusCode).toBe(400);
    });
    (0, globals_1.it)("signs up users with valid data", async () => {
        const user = {
            username: "My Test User",
            email: "testing@testing.com",
            password: "TestPassword",
        };
        await user_model_1.default.deleteOne({
            username: user.username,
            email: user.email,
        }).exec();
        const response = await (0, supertest_1.default)(app_1.default).post("/api/signup").send(user);
        await user_model_1.default.deleteOne({
            username: user.username,
            email: user.email,
        }).exec();
        (0, globals_1.expect)(response.statusCode).toBe(200);
        (0, globals_1.expect)(response.body.accessToken).toBeDefined();
    });
});
