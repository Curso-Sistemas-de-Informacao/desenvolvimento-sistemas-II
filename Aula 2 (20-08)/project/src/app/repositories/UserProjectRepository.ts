import { ValidationErrorItem } from "joi";
import UserProject from "../entities/UsersProjects";
import IUserProject from "../interface/IUserProject";
import { AppDataSource } from "../../database/data-source";
import ErrorExtension from "../utils/ErrorExtension";
import UserProjectSchemaValidation from "../utils/validations/userProjectSchemaValidation";

class UserProjectRepository {
  private static userProjectRepository =
    AppDataSource.getRepository(UserProject);

  static async getUserProjects(): Promise<IUserProject[]> {
    return this.userProjectRepository.find();
  }

  static async newUserProject(project: IUserProject): Promise<IUserProject> {
    const { error } = UserProjectSchemaValidation.validate(project, {
      abortEarly: false,
    });

    if (error) {
      const validationErrors = error.details.map(
        (detail: ValidationErrorItem) => detail.message,
      );
      throw new ErrorExtension(400, validationErrors.join(", "));
    }

    const createdProject = await this.userProjectRepository.save(project);
    return createdProject as IUserProject;
  }

  static async getUserProjectById(id: number): Promise<IUserProject | null> {
    return this.userProjectRepository.findOneBy({ id });
  }

  static async updateUserProject(
    id: number,
    project: Partial<IUserProject>,
  ): Promise<IUserProject> {
    await this.userProjectRepository.update(id, project);

    return project as IUserProject;
  }

  static async removeUserProject(id: number): Promise<void> {
    await this.userProjectRepository.delete(id);
  }
}

export default UserProjectRepository;