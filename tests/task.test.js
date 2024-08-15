const request = require("supertest");
const app = require("../src/server"); // Path to your Express app

describe("Task API", () => {
  let token;

  // Authenticate a user before running task-related tests
  beforeAll(async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "john_doe",
      password: "password123",
    });
    token = res.body.token; // Assuming the token is returned in the response body
  });

  // Test for task creation
  describe("POST /api/tasks", () => {
    it("should create a new task", async () => {
      const res = await request(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "New Task",
          description: "Task description",
          status: "Todo",
          priority: "High",
          due_date: "2024-08-20",
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.title).toEqual("New Task");
    });
  });

  // Test for task pagination
  describe("GET /api/tasks", () => {
    it("should return a paginated list of tasks", async () => {
      const res = await request(app)
        .get("/api/tasks?page=1&limit=5")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.tasks).toBeDefined();
      expect(res.body.tasks.length).toBeLessThanOrEqual(5); // Limit is 5 tasks per page
    });
  });
});
