import { ValidationErrorItem } from "joi";
import Project from "../entities/Project";
import { AppDataSource } from "../../database/dataSource";
import ErrorExtension from "../utils/ErrorExtension";
import projectSchemaValidation from "../utils/validations/projectSchemaValidation";
import { IProjectInput, IProjectOutput } from "../interfaces/IProject";

class ProjectRepository {
  private static projectRepository = AppDataSource.getRepository(Project);

  static async getProjects(): Promise<IProjectOutput[]> {
    return this.projectRepository
      .createQueryBuilder("project")
      .leftJoinAndSelect("project.userProjects", "userProjects")
      .getMany();
  }

  static async newProject(project: IProjectInput): Promise<IProjectOutput> {
    const { error } = projectSchemaValidation.validate(project, {
      abortEarly: false,
    });
    if (error) {
      const validateErrors = error.details.map(
        (detail: ValidationErrorItem) => detail.message,
      );
      throw new ErrorExtension(400, validateErrors.join(","));
    }

    const createdProject = await this.projectRepository.save(project);
    return createdProject;
  }

  static async getProject(id: number): Promise<IProjectOutput | null> {
    const project = await this.projectRepository.findOneBy({ id });

    if (!project) {
      throw new ErrorExtension(404, "Project not found!");
    }

    return project;
  }

  static async removeProject(id: number): Promise<string> {
    await this.projectRepository.delete(id);

    return "Project removed!";
  }
}

export default ProjectRepository;
