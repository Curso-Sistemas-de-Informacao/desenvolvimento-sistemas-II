import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateUsersTable1724553093188 } from "./migrations/1724553093188-CreateUsersTable";
import { CreateSeedUsersTable1724553321493 } from "./migrations/1724553321493-CreateSeedUsersTable";
import { CreatePostsTable1724806550533 } from "./migrations/1724806550533-CreatePostsTable"
import { CreateProjectTable1724807684930 } from "./migrations/1724807684930-CreateProjectTable"
import { CreateUserProjectTable1724807712959 } from "./migrations/1724807712959-CreateUserProjectTable"
import User from "../app/entities/Users";
import Post from "../app/entities/Posts";
import Project from "../app/entities/Projects";
import UserProject from "../app/entities/UsersProjects";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "mlovatto",
  database: "projeto_typeorm",
  synchronize: true,
  logging: false,
  entities: [User, Post,Project, UserProject],
  migrations: [CreateUsersTable1724553093188, CreateSeedUsersTable1724553321493, 
    CreatePostsTable1724806550533, CreateProjectTable1724807684930, CreateUserProjectTable1724807712959],
  subscribers: [],
});