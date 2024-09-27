import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import User from "./User";
import Project from "./Project";

@Entity("users_projects")
class UserProject {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("int", { nullable: false })
  hours_worked: number;

  @Column("int", { nullable: false })
  id_user: number;

  @Column("int", { nullable: false })
  id_project: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.userProjects)
  @JoinColumn({ name: "id_user" })
  users: User;

  @ManyToOne(() => Project, (project) => project.userProjects)
  @JoinColumn({ name: "id_project" })
  projects: Project;
}

export default UserProject;
