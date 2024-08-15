const AppDataSource = require("../config/db");
const Task = require("../entities/Task");

const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, due_date } = req.body;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = status;
    task.priority = priority;
    task.due_date = due_date;
    task.user = req.user;
    await AppDataSource.manager.save(task);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Task creation failed" });
  }
};

const getTasks = async (req, res) => {
  try {
    const {
      status,
      priority,
      due_date,
      search,
      page = 1,
      limit = 10,
    } = req.query;
    const whereClause = { user: req.user };

    // Apply filtering
    if (status) whereClause.status = status;
    if (priority) whereClause.priority = priority;
    if (due_date) whereClause.due_date = due_date;

    // Define pagination parameters
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    // Apply searching on title or description using the ILIKE operator (PostgreSQL or similar SQL systems)
    const queryBuilder = AppDataSource.manager
      .createQueryBuilder(Task, "task")
      .where(whereClause)
      .andWhere(
        new Brackets((qb) => {
          if (search) {
            qb.where("task.title ILIKE :search", {
              search: `%${search}%`,
            }).orWhere("task.description ILIKE :search", {
              search: `%${search}%`,
            });
          }
        })
      )
      .skip(skip)
      .take(limitNumber);

    const [tasks, total] = await queryBuilder.getManyAndCount();

    res.status(200).json({
      total,
      page: pageNumber,
      limit: limitNumber,
      tasks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetching tasks failed" });
  }
};


const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status, priority } = req.body;
    const task = await AppDataSource.manager.findOne(Task, {
      where: { id: taskId, user: req.user },
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    task.title = title;
    task.description = description;
    task.status = status;
    task.priority = priority;
    task.updated_at = new Date();
    await AppDataSource.manager.save(task);
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: "Updating task failed" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await AppDataSource.manager.findOne(Task, {
      where: { id: taskId, user: req.user },
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    await AppDataSource.manager.remove(task);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Deleting task failed" });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
