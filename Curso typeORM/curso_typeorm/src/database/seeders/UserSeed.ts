import { IUserInput } from "../../app/interfaces/IUser";

const userSeed: IUserInput = {
  name: "admin",
  email: "admin@admin.com",
  password: "12345678",
  birth_date: new Date("1990-03-07"),
  active: true,
};

export default userSeed;
