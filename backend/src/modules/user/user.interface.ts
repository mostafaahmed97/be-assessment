export interface IBaseUser {
  username: string;
  email: string;
  password: string;
  isVerified?: boolean;
}

export interface IUser extends IBaseUser {
  id: string;
}
