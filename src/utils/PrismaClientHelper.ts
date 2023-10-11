import { PrismaClient } from "@prisma/client";
import messager from "./Messager";

let prismaClient: PrismaClient

export default function prismaClientHelper() {
  if(!prismaClient) {
    messager.databaseMessage("New connection with database was created.")
    prismaClient = new PrismaClient()
  }
  return prismaClient;
}