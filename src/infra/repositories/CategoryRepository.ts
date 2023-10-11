import { Category, CategoryPropertie, PrismaClient } from "@prisma/client";
import ICategoryRepository from "../../domain/repositories/ICategoryRepository";
import { CategoryObject, CategoryPropertieObject, Optional } from "../../domain/types/types";
import PrismaClientHelper from "../../utils/PrismaClientHelper";
import Messager from "../../utils/Messager";

const prismaClient: PrismaClient = PrismaClientHelper()

export default class CategoryRepository implements ICategoryRepository {
  async saveCategory(category: CategoryObject, properties: CategoryPropertieObject[]): Promise<Category> {
    const createdCategory = await prismaClient.category.create({
      data: {
        name: category.name,
        description: category.description,
        properties: {
          create: properties.map(prop => ({ key: prop.key, name: prop.name })),
        },
      },
      include: {
        properties: true,
      },
    });
  
    return createdCategory;
  }
  async findAll(limit?: number | undefined): Promise<Category[]> {
    return await prismaClient.category.findMany({
      take: limit ?? 10,
      include: {
        properties: true
      }
    })
  }
  async findOne(id: string): Promise<Optional<Category>> {
    return await prismaClient.category.findFirst({
      where:{id},
      include: {
        properties: true,
      },
    })
  }
  save(entity: Category): Promise<Category> {
    Messager.errorMessage("use saveCategory method instead of save method")
    throw new Error()
  }

}