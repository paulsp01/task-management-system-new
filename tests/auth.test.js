const request = require("supertest");
const app = require("../src/server"); // Adjust the path to your Express app

describe("Auth API", () => {
  // Test for user signup
  describe("POST /api/auth/signup", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        username: "john_doe",
        password: "password123",
        role: "user", // Assuming roles can be passed during registration
      });

      expect(res.statusCode).toEqual(201);
      expect(res.body.message).toEqual("User registered successfully");
    });

    it("should return error if username already exists", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        username: "john_doe", // Duplicate username
        password: "password123",
        role: "user",
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual("Username already exists");
    });
  });

  // Test for user login
  describe("POST /api/auth/login", () => {
    it("should log in an existing user", async () => {
      const res = await request(app).post("/api/auth/login").send({
        username: "john_doe",
        password: "password123",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body.token).toBeDefined(); // Ensure the token is returned
    });

    it("should return error for invalid credentials", async () => {
      const res = await request(app).post("/api/auth/login").send({
        username: "john_doe",
        password: "wrongpassword",
      });

      expect(res.statusCode).toEqual(401);
      expect(res.body.error).toEqual("Invalid credentials");
    });
  });
});
