import { Types } from "mongoose";

type authHeader = {
  username: string;
  password: string;
};

type httpHeader = {
  key: string;
  value: string;
};

export interface IBaseCheck {
  name: string;
  url: string;
  protocol: "HTTP" | "HTTPS" | "TCP";
  path?: string;
  port?: number;
  timeout: number;
  interval: number;
  webhook: string;
  headers: Array<httpHeader>;
  authentication?: authHeader;
  tags?: Array<string>;
  ignoreSSL?: boolean;
}

export interface ICheck extends IBaseCheck {
  id: string;
  userId: Types.ObjectId;
}
