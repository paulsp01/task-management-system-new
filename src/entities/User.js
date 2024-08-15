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

  @Column({ unique: true })
  username;

  @Column()
  password;

  // Add a new column for role-based access control
  @Column({ default: "user" }) // Default role is 'user'
  role;

  @OneToMany(() => Task, (task) => task.user)
  tasks;
}

module.exports = User;
