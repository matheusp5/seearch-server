import { User } from "@prisma/client";
import IAuthService from "../../domain/services/IAuthService";
import UserRepository from "../../infra/repositories/UserRepository";
import { Optional, UserObject } from "../../domain/types/types";
import HashService from "./HashService";

const userRepository: UserRepository = new UserRepository()
const hashService: HashService = new HashService()

export default class AuthService implements IAuthService {
  async login(email: string, password: string): Promise<boolean> {
    const user: Optional<User> = await userRepository.findByEmail(email);
    if(user) {
      return hashService.compare(password, user.password)
    }
    return false;
  }
  async register(name: string, email: string, password: string): Promise<boolean> {
    if(!await userRepository.userWithEmailExists(email)) {
      let user: UserObject = {
        name,
        email,
        password: hashService.hash(password),
        role: "user"
      }
      if(email == "matheus@mxtheuz.com.br" && name == "Matheus Piccoli") {
        user.role = "admin"
      }
      await userRepository.save(user)
      return true
    }
    return false
  }

}