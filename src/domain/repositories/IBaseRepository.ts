import { Optional } from "../types/types";

export default interface IBaseRepository<Entity, CreateObject, KeyType> {
  findAll(limit?: number): Promise<Entity[]>
  findOne(id: KeyType): Promise<Optional<Entity>>
  save(entity: CreateObject): Promise<Entity>
}