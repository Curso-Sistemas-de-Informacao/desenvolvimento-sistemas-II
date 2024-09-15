import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import UserProject from "./UsersProjects";
import Post from "./Posts";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar", { length: 100 })
  name: string;

  @Column("varchar", { length: 100 })
  email: string;

  @Column("varchar", { length: 100 })
  password: string;

  @Column("date")
  birth_date: Date;

  @Column("boolean", { default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Post, (post) => post.users)
  posts: Post[];

  @OneToMany(() => UserProject, (userProject) => userProject.users)
  userProjects: UserProject[];
}

export default User;