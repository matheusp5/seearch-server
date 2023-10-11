import { Establishment, EstablishmentPropertie } from "@prisma/client";
import IBaseRepository from "./IBaseRepository";
import { EstablishmentObject, EstablishmentPropertieObject, Optional } from "../types/types";

export default interface IEstablishmentRepository extends IBaseRepository<Establishment, EstablishmentObject, string> {
  saveEstablishment(establishment: EstablishmentObject, properties: EstablishmentPropertieObject[]): Promise<Establishment>;
  searchEstablishments(city: string, query?: string): Promise<Optional<Establishment[]>>
  findEstablishmentsByCategory(categoryName: string): Promise<Optional<Establishment[]>>
}