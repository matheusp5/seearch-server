import { User } from "@prisma/client";
import IBaseRepository from "./IBaseRepository";
import { Optional, UserObject } from "../types/types";

export default interface IUserRepository extends IBaseRepository<User, UserObject, string> {
  findByEmail(email: string): Promise<Optional<User>>
  findByName(name: string): Promise<Optional<User>>
  userWithEmailExists(email: string): Promise<boolean>
}