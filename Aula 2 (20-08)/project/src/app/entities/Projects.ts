import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from "typeorm";
  import UserProject from "./UsersProjects";
  
  @Entity("projects")
  class Project {
    @PrimaryGeneratedColumn("increment")
    id: number;
  
    @Column("varchar", { length: 100 })
    name: string;
  
    @Column("varchar", { length: 100 })
    description: string;
  
    @Column("date")
    start_at: Date;
  
    @Column("date")
    end_at: Date;
  
    @Column("boolean", { default: true })
    active: boolean;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @OneToMany(() => UserProject, (userProject) => userProject.projects)
    userProjects: UserProject[];
  }
  
  export default Project;