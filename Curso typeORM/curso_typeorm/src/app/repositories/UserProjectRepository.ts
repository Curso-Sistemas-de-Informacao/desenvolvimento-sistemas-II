import { ValidationErrorItem } from "joi";
import UserProject from "../entities/UserProject";
import { AppDataSource } from "../../database/dataSource";
import ErrorExtension from "../utils/ErrorExtension";
import userProjectSchemaValidation from "../utils/validations/userProjectSchemaValidation";
import {
  IUserProjectInput,
  IUserProjectOutput,
} from "../interfaces/IUserProject";
import { IUserInput, IUserOutput } from "../interfaces/IUser";
import { IProjectInput, IProjectOutput } from "../interfaces/IProject";
import User from "../entities/User";
import Project from "../entities/Project";

class UserProjectRepository {
  private static userProjectRepository =
    AppDataSource.getRepository(UserProject);

  static async getUsersProjects(): Promise<IUserProjectOutput[]> {
    return this.userProjectRepository.find({
      relations: {
        users: true,
        projects: true,
      },
    });
  }

  static async newUserProject(
    userProject: IUserProjectInput,
  ): Promise<IUserProjectOutput> {
    const { error } = userProjectSchemaValidation.validate(userProject, {
      abortEarly: false,
    });
    if (error) {
      const validateErrors = error.details.map(
        (detail: ValidationErrorItem) => detail.message,
      );
      throw new ErrorExtension(400, validateErrors.join(","));
    }

    const createdUserProject =
      await this.userProjectRepository.save(userProject);
    return createdUserProject;
  }

  static async getUserProject(id: number): Promise<IUserProjectOutput | null> {
    const userProject = await this.userProjectRepository.findOneBy({ id });

    if (!userProject) {
      throw new ErrorExtension(404, "UserProject not found!");
    }

    return userProject;
  }

  static async updateUserProject(
    id: number,
    userProject: IUserProjectInput,
  ): Promise<string> {
    const userProjectData = await this.userProjectRepository.findOneBy({ id });

    if (!userProjectData) {
      throw new ErrorExtension(404, "UserProject not found!");
    }

    await this.userProjectRepository.update(id, userProject);

    return "UserProject data was updated!";
  }

  static async removeUserProject(id: number): Promise<string> {
    await this.userProjectRepository.delete(id);

    return "UserProject removed!";
  }

  static async createAll(data: {
    user: IUserInput;
    project: IProjectInput;
    user_project: IUserProjectInput;
  }): Promise<{
    user: IUserOutput;
    project: IProjectOutput;
    user_project: IUserProjectOutput;
  }> {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.save(User, data.user);
      const project = await queryRunner.manager.save(Project, data.project);

      const user_project = await queryRunner.manager.save(UserProject, {
        hours_worked: data.user_project.hours_worked,
        id_project: project.id,
        id_user: user.id,
      });

      await queryRunner.commitTransaction();

      return { user, project, user_project };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

export default UserProjectRepository;
