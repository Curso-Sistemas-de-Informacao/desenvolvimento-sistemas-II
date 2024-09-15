import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  import User from "./Users";
  import Project from "./Projects";
  
  @Entity("user_project")
  class UserProject {
    @PrimaryGeneratedColumn("increment")
    id: number;
  
    @Column("int")
    hours_worked: number;
  
    @Column("int")
    id_user: number;
  
    @Column("int")
    id_project: number;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @ManyToOne(() => User, (user) => user.userProjects)
    @JoinColumn({ name: "id_user" })
    users: User;
  
    @ManyToOne(() => Project, (project: Project) => project.userProjects)
    @JoinColumn({ name: "id_project" })
    projects: User;
  }
  
  export default UserProject;