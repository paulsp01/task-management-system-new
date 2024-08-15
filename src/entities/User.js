const {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} = require("typeorm");
const Task = require("./Task");

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id;

  @Column({
    unique: true,
    length: 50, // Set a length constraint if needed
  })
  username;

  @Column({
    type: "varchar",
    length: 255, // Adjust length as needed, but ensure it's sufficient for hashed passwords
  })
  password;

  @Column({
    type: "varchar",
    default: "user", // Default role is 'user'
    length: 20, // Set a length constraint if needed
  })
  role;

  @OneToMany(() => Task, (task) => task.user)
  tasks;
}

module.exports = User;
