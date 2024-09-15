import { ValidationErrorItem } from "joi";
import Post from "../entities/Posts";
import { AppDataSource } from "../../database/data-source";
import ErrorExtension from "../utils/ErrorExtension";
import postsSchemaValidation from "../utils/validations/postsSchemaValidation";
import IPost from "../interface/IPost";

class PostRepository {
  private static postRepository = AppDataSource.getRepository(Post);

  static async getPost(): Promise<IPost[]> {
    return this.postRepository.find({ relations: { users: true } });
  }

  static async newPost(post: IPost): Promise<IPost> {
    const { error } = postsSchemaValidation.validate(post, {
      abortEarly: false,
    });

    if (error) {
      const validationErrors = error.details.map(
        (detail: ValidationErrorItem) => detail.message
      );
      throw new ErrorExtension(400, validationErrors.join(", "));
    }

    const createdPost = await this.postRepository.save(post);
    return createdPost as IPost;
  }

  static async removePost(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}

export default PostRepository;