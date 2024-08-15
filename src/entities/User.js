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
    length: 50, 
  })
  username;

  @Column({
    type: "varchar",
    length: 255, 
  })
  password;

  @Column({
    type: "varchar",
    default: "user", 
    length: 20, 
  })
  role;

  @OneToMany(() => Task, (task) => task.user)
  tasks;
}

module.exports = User;
