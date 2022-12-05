"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../src/app/app"));
const supertest_1 = __importDefault(require("supertest"));
const globals_1 = require("@jest/globals");
(0, globals_1.describe)("Server starts", () => {
    (0, globals_1.it)("responds to root path", async () => {
        const response = await (0, supertest_1.default)(app_1.default).get("/");
        (0, globals_1.expect)(response.statusCode).toBe(200);
    });
});
