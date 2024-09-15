import { ValidationErrorItem } from "joi";
import Project from "../entities/Projects";
import IProject from "../interface/IProject";
import { AppDataSource } from "../../database/data-source";
import ErrorExtension from "../utils/ErrorExtension";
import ProjectSchemaValidation from "../utils/validations/projectSchemaValidation";

class ProjectRepository {
  private static projectsRepository = AppDataSource.getRepository(Project);

  static async getProjects(): Promise<IProject[]> {
    return this.projectsRepository.find({
      relations: { userProjects: true },
    });
  }

  static async newProject(project: IProject): Promise<IProject> {
    const { error } = ProjectSchemaValidation.validate(project, {
      abortEarly: false,
    });

    if (error) {
      const validationErrors = error.details.map(
        (detail: ValidationErrorItem) => detail.message
      );
      throw new ErrorExtension(400, validationErrors.join(", "));
    }

    const createdProject = await this.projectsRepository.save(project);
    return createdProject as IProject;
  }

  static async getProjectById(id: number): Promise<IProject | null> {
    return this.projectsRepository.findOneBy({ id });
  }

  static async updateProject(
    id: number,
    project: Partial<IProject>
  ): Promise<IProject> {
    await this.projectsRepository.update(id, project);

    return project as IProject;
  }
}

export default ProjectRepository;