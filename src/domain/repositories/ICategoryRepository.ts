import { Category, CategoryPropertie } from "@prisma/client";
import IBaseRepository from "./IBaseRepository";
import { CategoryObject, CategoryPropertieObject } from "../types/types";

export default interface ICategoryRepository extends IBaseRepository<Category, CategoryObject, string> {
  saveCategory(category: Category, properties: CategoryPropertieObject[]): Promise<Category>
}