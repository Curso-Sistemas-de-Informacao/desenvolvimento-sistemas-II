import { Request, Response, Router } from "express";
import PostRepository from "../repositories/PostRepository";

class PostRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.getAllPosts);
    this.router.post("/", this.createPost);
    this.router.delete("/:id", this.removePost);
  }

  private async getAllPosts(req: Request, res: Response) {
    const posts = await PostRepository.getPost();
    res.status(200).json(posts);
  }

  private async createPost(req: Request, res: Response) {
    const post = await PostRepository.newPost(req.body);
    res.status(200).json(post);
  }

  private async removePost(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await PostRepository.removePost(id);
    res.status(201).json({ message: "Registro removido com sucesso" });
  }
}

const postRouter = new PostRouter().router;

export default postRouter;