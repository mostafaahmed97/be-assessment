export interface IBaseUser {
  username: string;
  email: string;
  password: string;
}

export interface IUser extends IBaseUser {
  id: string;
}
