/*import Profile from "../entities/Profile";
import { IProfileInput, IProfileOutput } from "../interfaces/IProfile";
import { AppDataSourceMongoDB } from "../../database/dataSource";

class ProfileRepository {
  private static profileRepository =
    AppDataSourceMongoDB.getRepository(Profile);

  static async getProfile(): Promise<IProfileOutput[]> {
    return this.profileRepository.find();
  }

  static async createProfile(profile: IProfileInput): Promise<IProfileOutput> {
    const createdProfile = await this.profileRepository.save(profile);
    return createdProfile;
  }
}

export default ProfileRepository;
*/
