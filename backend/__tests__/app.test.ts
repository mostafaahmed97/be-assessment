import app from "../src/app/app";
import request from "supertest";
import { describe, it, expect } from "@jest/globals";

describe("Server starts", () => {
  it("responds to root path", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});
