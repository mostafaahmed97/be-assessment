import { IBaseUser } from "./user.interface";
import User from "./user.model";

class UserService {
  async me(id: string): Promise<IBaseUser> {
    const user = await User.findById(id);

    if (!user) throw { code: 404 };
    return user;
  }
}

export const userSvc = new UserService();
