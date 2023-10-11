import { Establishment, EstablishmentPropertie, Prisma, PrismaClient } from "@prisma/client";
import PrismaClientHelper from "../../utils/PrismaClientHelper";
import IEstablishmentRepository from "../../domain/repositories/IEstablishmentRepository";
import { EstablishmentObject, EstablishmentPropertieObject, Optional } from "../../domain/types/types";
import Messager from "../../utils/Messager";

const prismaClient: PrismaClient = PrismaClientHelper()

export default class EstablishmentRepository implements IEstablishmentRepository {
  
  async findEstablishmentsByCategory(categoryName: string): Promise<Optional<Establishment[]>> {
    const category = await prismaClient.category.findFirst({where: {name: categoryName}})
    return await prismaClient.establishment.findMany({
      where:{
        categoryId: category?.id
      }
    })
  }

  async searchEstablishments(city: string, query?: string): Promise<Optional<Establishment[]>> {
    const conditions: Prisma.EstablishmentWhereInput[] = [{ city: { equals: city } }];
  
    if (query) {
      conditions.push({
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
        ],
      });
    }
  
    const establishments = await prismaClient.establishment.findMany({
      where: {
        AND: conditions,
      },
    });
  
    return establishments;
  }
  
  
  


  async saveEstablishment(establishment: EstablishmentObject, properties: EstablishmentPropertieObject[]): Promise<Establishment> {
    const establishmentResult = await prismaClient.establishment.create({
      data: establishment,
    });
  
    const propertyPromises = properties.map(async (prop) => {
      return prismaClient.establishmentPropertie.create({
        data: {
          value: prop.value,
          propertieId: prop.propertieId,
          establishmentId: establishmentResult.id,
        },
      });
    });
  
    await Promise.all(propertyPromises);
  
    return establishmentResult;
  }

  async findAll(limit?: number | undefined): Promise<Establishment[]> {
    return await prismaClient.establishment.findMany({
      take: limit ?? 30
    })
  }
  async findOne(id: string): Promise<Optional<Establishment>> {
    return await prismaClient.establishment.findFirst({
      where:{id}
    })
  }
  async save(entity: Establishment): Promise<Establishment> {
    Messager.errorMessage("use saveEstablishment method instead of save method")
    throw new Error()
  }
  
}