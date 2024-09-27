import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { CreateUsersTable1708439009924 } from "./migrations/1708439009924-CreateUsersTable";
import { CreateSeedUsersTable1708455815303 } from "./migrations/1708455815303-CreateSeedUsersTable";
import { CreateAddressTable1708693308270 } from "./migrations/1708693308270-CreateAddressTable";
import { CreateProjectTable1708705774484 } from "./migrations/1708705774484-CreateProjectTable";
import { CreateUserProjectTable1708705789378 } from "./migrations/1708705789378-CreateUserProjectTable";
import User from "../app/entities/User";
import Address from "../app/entities/Address";
import Project from "../app/entities/Project";
import UserProject from "../app/entities/UserProject";
//import Profile from "../app/entities/Profile";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOSTNAME,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  logger: "file",
  ssl: true,
  entities: [User, Address, Project, UserProject],
  migrations: [
    CreateUsersTable1708439009924,
    CreateAddressTable1708693308270,
    CreateProjectTable1708705774484,
    CreateUserProjectTable1708705789378,
    CreateSeedUsersTable1708455815303,
  ],
  subscribers: [],
  /*cache: {
    alwaysEnabled: true,
    duration: 60000,
  },*/
});

/*export const AppDataSourceMongoDB = new DataSource({
  type: "mongodb",
  host: "localhost",
  port: 27017,
  database: "test",
  synchronize: true,
  entities: [Profile],
});*/
