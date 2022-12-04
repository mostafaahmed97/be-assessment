import { IUser } from "modules/user/user.interface";

// Adds a user property to the base Request interface from Express
declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
