const {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} = require("typeorm");
const User = require("./User");

@Entity()
class Task {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  title;

  @Column()
  description;

  @Column()
  status;

  @Column()
  priority;

  @Column()
  due_date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  created_at;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  updated_at;

  @ManyToOne(() => User, (user) => user.tasks)
  user;
}

module.exports = Task;
