import { Router } from "express";
import UserRouter from "../controllers/UserController";
import PostController from "../controllers/PostController";
import ProjectController from "../controllers/ProjectController";
import UserProjectController from "../controllers/UserProjectController";

const routers = Router();

routers.use("/users", UserRouter);
routers.use("/posts", PostController);
routers.use("/projects", ProjectController);
routers.use("/usersprojects", UserProjectController);

export default routers;