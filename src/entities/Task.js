const {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} = require("typeorm");
const User = require("./User");

@Entity()
class Task {
  @PrimaryGeneratedColumn()
  id;

  @Column({
    type: "varchar",
    length: 255, // Specify the length if needed
  })
  title;

  @Column({
    type: "text", // Use 'text' for longer descriptions
  })
  description;

  @Column({
    type: "varchar",
    length: 50, // Specify the length if needed
  })
  status;

  @Column({
    type: "varchar",
    length: 50, // Specify the length if needed
  })
  priority;

  @Column({
    type: "date", // Use 'date' for due_date
  })
  due_date;

  @CreateDateColumn({
    type: "timestamp",
  })
  created_at;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updated_at;

  @ManyToOne(() => User, (user) => user.tasks)
  user;
}

module.exports = Task;
