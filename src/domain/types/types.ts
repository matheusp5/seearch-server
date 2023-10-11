
export type Optional<T> = T | null

export type UserObject = {name: string, email: string, password: string, role: string}
export type CategoryObject = {name: string, description: string}
export type CategoryPropertieObject = {key: string, name: string}
export type EstablishmentObject = {    
  name: string;
  description: string;
  categoryId: string;
  city: string;
  state: string;
  country: string;
  coordinates: string;
  websiteLink: string; 
  ownerId: string;
}
export type EstablishmentPropertieObject = {value: string; propertieId: string; }

export type LoginBody = {email: string, password: string}
export type RegisterBody = {name: string, email: string, password: string}
export type CreateCategoryBody = {category: CategoryObject, properties: CategoryPropertieObject[]}