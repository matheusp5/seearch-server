import { User } from "@prisma/client";

export default interface IAuthService {
  login(email: string, password: string): Promise<boolean>;
  register(name: string, email: string, password: string): Promise<boolean>;
}