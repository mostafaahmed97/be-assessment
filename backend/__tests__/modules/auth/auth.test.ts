import app from "../../../src/app/app";
import * as db from "../../../src/database";
import { IUser, IBaseUser } from "../../../src/modules/user/user.interface";
import User from "../../../src/modules/user/user.model";

import request from "supertest";
import bcrypt from "bcrypt";
import { describe, it, beforeAll, afterAll, expect } from "@jest/globals";

describe("Login route", () => {
  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  it("rejects login without email", async () => {
    const response = await request(app).post("/api/login").send({
      password: "12345789",
    });
    expect(response.statusCode).toBe(400);
  });

  it("rejects login without password", async () => {
    const response = await request(app).post("/api/login").send({
      email: "123",
    });
    expect(response.statusCode).toBe(400);
  });

  it("should authenticate user with valid email and password", async () => {
    const email = "testing@testing.com";
    const password = "TestPassword";
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username: "New User",
      email: email,
      password: hashedPassword,
    });

    const response = await request(app).post("/api/login").send({
      email,
      password,
    });

    await User.deleteOne({
      username: "New User",
      email: email,
      password: hashedPassword,
    }).exec();

    expect(response.statusCode).toBe(200);
    expect(response.body.accessToken).toBeDefined();
  });
});

describe("Signup route", () => {
  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  it("rejects signup without email", async () => {
    const response = await request(app).post("/api/signup").send({
      password: "12345789",
    });
    expect(response.statusCode).toBe(400);
  });

  it("rejects signup without password", async () => {
    const response = await request(app).post("/api/signup").send({
      email: "123",
    });
    expect(response.statusCode).toBe(400);
  });

  it("signs up users with valid data", async () => {
    const user = {
      username: "My Test User",
      email: "testing@testing.com",
      password: "TestPassword",
    };

    await User.deleteOne({
      username: user.username,
      email: user.email,
    }).exec();

    const response = await request(app).post("/api/signup").send(user);

    await User.deleteOne({
      username: user.username,
      email: user.email,
    }).exec();

    expect(response.statusCode).toBe(200);
    expect(response.body.accessToken).toBeDefined();
  });
});
