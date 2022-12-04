import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import User from "../user/user.model";
import { IAuthResponse } from "./auth.interface";
import { IBaseUser } from "modules/user/user.interface";
import { mailer } from "../../utilities/mailer";

class AuthenticationService {
  async login(email: string, password: string): Promise<IAuthResponse> {
    const user = await User.findOne({ email: email });
    if (!user) throw { code: 403 };

    const pwdCheck = await bcrypt.compare(password, user.password);
    if (!pwdCheck) throw { code: 403 };

    return this.generateToken(user.toJSON());
  }

  async signup(user: Omit<IBaseUser, "id">): Promise<IAuthResponse> {
    const emailExists = await User.findOne({ email: user.email });
    if (emailExists) throw { code: 409 };

    user.password = await bcrypt.hash(user.password, 12);
    const newUser = await User.create(user);

    mailer.sendMail({
      to: newUser.email,
      subject: "Verify Acc",
      text: "Verification email",
    });

    return this.generateToken(newUser.toJSON());
  }

  private generateToken(
    user: IBaseUser,
    tokenDuration = config.jwt.duration
  ): IAuthResponse {
    const accessToken = jwt.sign(user, config.jwt.secret, {
      expiresIn: tokenDuration,
    });
    return { accessToken };
  }
}

export const authSvc = new AuthenticationService();
