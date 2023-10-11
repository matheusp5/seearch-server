import { PrismaClient, User } from "@prisma/client";
import IUserRepository from "../../domain/repositories/IUserRepository";
import { Optional, UserObject } from "../../domain/types/types";
import PrismaClientHelper from "../../utils/PrismaClientHelper";

const prismaClient: PrismaClient = PrismaClientHelper()

export default class UserRepository implements IUserRepository {
  async userWithEmailExists(email: string): Promise<boolean> {
    const user = await prismaClient.user.findFirst({
      where:{email}
    })
    
    return user != null
  }

  async findByEmail(email: string): Promise<Optional<User>> {
    return await prismaClient.user.findFirst({where: {email}})
  }
  async findByName(name: string): Promise<Optional<User>> {
    return await prismaClient.user.findFirst({where: {name}})
  }
  async findAll(limit?: number | undefined): Promise<User[]> {
   return await prismaClient.user.findMany({
    take: limit ?? 100
   })
  }
  async findOne(id: string): Promise<Optional<User>>{
    return await prismaClient.user.findFirst({where: {id}})
  }
  async save(entity: UserObject): Promise<User> {
    return await prismaClient.user.create({
      data: entity
    });
  }

}