import { Request, Response, Router } from "express";
import UserProjectRepository from "../repositories/UserProjectRepository";

class UserProjectProjectRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.getAllUserProjectProject);
    this.router.post("/", this.createUserProject);
    this.router.get("/:id", this.getUserProjectById);
    this.router.patch("/:id", this.updateUserProject);
    this.router.delete("/:id", this.removeUserProject);
  }

  private async getAllUserProjectProject(req: Request, res: Response) {
    const userProjects = await UserProjectRepository.getUserProjects();
    res.status(200).json(userProjects);
  }

  private async createUserProject(req: Request, res: Response) {
    const userProject = await UserProjectRepository.newUserProject(req.body);
    res.status(200).json(userProject);
  }

  private async getUserProjectById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const userProject = await UserProjectRepository.getUserProjectById(id);
    res.status(200).json(userProject);
  }

  private async updateUserProject(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const userProject = await UserProjectRepository.updateUserProject(
      id,
      req.body,
    );
    res.status(201).json(userProject);
  }

  private async removeUserProject(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await UserProjectRepository.removeUserProject(id);
    res.status(201).json({ message: "Registro removido com sucesso" });
  }
}

const userProjectProjectRouter = new UserProjectProjectRouter().router;

export default userProjectProjectRouter;