const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

router.use(authMiddleware);

router.post("/tasks", roleMiddleware(["admin", "user"]), createTask);
router.get("/tasks", getTasks);
router.put("/tasks/:taskId", roleMiddleware(["admin"]), updateTask);
router.delete("/tasks/:taskId", roleMiddleware(["admin"]), deleteTask);

module.exports = router;
