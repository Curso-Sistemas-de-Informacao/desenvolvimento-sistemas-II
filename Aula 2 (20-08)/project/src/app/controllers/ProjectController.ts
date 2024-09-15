import { Request, Response, Router } from "express";
import ProjectRepository from "../repositories/ProjectRepository";
import authenticateMiddleware from "../middlewares/authMiddleware";

class ProjectRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", authenticateMiddleware, this.getAllProjects);
    this.router.post("/", this.createProject);
    this.router.get("/:id", this.getProjectById);
    this.router.patch("/:id", this.updateProject);
  }

  private async getAllProjects(req: Request, res: Response) {
    const Projects = await ProjectRepository.getProjects();
    res.status(200).json(Projects);
  }

  private async createProject(req: Request, res: Response) {
    const Project = await ProjectRepository.newProject(req.body);
    res.status(200).json(Project);
  }

  private async getProjectById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const Project = await ProjectRepository.getProjectById(id);
    res.status(200).json(Project);
  }

  private async updateProject(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const Project = await ProjectRepository.updateProject(id, req.body);
    res.status(201).json(Project);
  }
}

const projectRouter = new ProjectRouter().router;

export default projectRouter;