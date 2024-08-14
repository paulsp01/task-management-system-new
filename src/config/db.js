const { DataSource } = require("typeorm");
const User = require("../entities/User");
const Task = require("../entities/Task");

const AppDataSource = new DataSource({
  type: "mysql",  // Change the type to 'mysql'
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Task],
  synchronize: true,
});

module.exports = AppDataSource;
