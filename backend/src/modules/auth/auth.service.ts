import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import User from "../user/user.model";
import { IAuthResponse } from "./auth.interface";
import { IBaseUser } from "modules/user/user.interface";
import { mailer } from "../../utilities/mailer";
import { nanoid } from "nanoid";
import Token from "./tokens/token.model";

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

    const verificationHash = nanoid(12);
    await Token.create({ hash: verificationHash, userId: newUser.id });

    // mailer.sendMail({
    //   to: newUser.email,
    //   subject: "Verify Acc",
    //   text: `Click the link to verify your email
    //     ${config}
    //   `,
    // });

    return this.generateToken(newUser.toJSON());
  }

  async verify(userId: string, hash: string) {
    const token = await Token.findOne({
      hash,
      userId,
    }).exec();

    if (!token) throw { code: 404 };

    await User.findOneAndUpdate(
      { _id: userId },
      { $set: { isVerified: true } }
    );
    await token.delete();
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
