import { Request, Response } from "express";
import EstablishmentRepository from "../../infra/repositories/EstablishmentRepository";
import HttpResponseFactory from "../../application/factories/HttpResponseFactory";
import { EHttpCode } from "../../domain/enums/EHttpCode";
import { Establishment } from "@prisma/client";
import { EstablishmentObject, EstablishmentPropertieObject, Optional } from "../../domain/types/types";

const establishmentRepository: EstablishmentRepository = new EstablishmentRepository()
const {create} = new HttpResponseFactory()

export default class EstablishmentController {

  async FindByCategory(request: Request, response: Response) {
    if(request.query.category) {  
      const result = await establishmentRepository.findEstablishmentsByCategory(String(request.query.category))
      if(result) {
        return response.status(EHttpCode.SUCCESS).json(create(EHttpCode.SUCCESS, "success", result))
      }
      return response.status(EHttpCode.NOT_FOUND).json(create(EHttpCode.NOT_FOUND, "not_found")) 
    }
    return response.status(EHttpCode.BAD_REQUEST).json(create(EHttpCode.BAD_REQUEST, "missing_category"))
  }

  async SearchEstablishments(request: Request, response: Response) {
    let result: Optional<Establishment[]>
    if(request.query.city) {
      const city: string = String(request.query.city)
      if(request.query.query) {
        result = await establishmentRepository.searchEstablishments(city, String(request.query.query))
      } else {
        result = await establishmentRepository.searchEstablishments(city)  
      }
      if(result) {
        return response.status(EHttpCode.SUCCESS).json(create(EHttpCode.SUCCESS, "success", result))
      }
      return response.status(EHttpCode.NOT_FOUND).json(create(EHttpCode.NOT_FOUND, "not_found"))
    }
    return response.status(EHttpCode.BAD_REQUEST).json(create(EHttpCode.BAD_REQUEST, "missing_city"))
  }


  async FindAll(request: Request, response: Response) {
    return response.status(EHttpCode.SUCCESS).json(create(EHttpCode.SUCCESS, "success", await establishmentRepository.findAll(Number(request.query.limit))))
  }

  async FindOne(request: Request, response: Response) {
    const category: Optional<Establishment> = await establishmentRepository.findOne(request.params.id)
    if(category != null) {
      return response.status(EHttpCode.SUCCESS).json(create(EHttpCode.SUCCESS, "success", category))  
    }
    return response.status(EHttpCode.NOT_FOUND).json(create(EHttpCode.NOT_FOUND, "not_found"))  
  }

  async SaveEstablishment(request: Request, response: Response) {
    if(request.body.establishment && request.body.properties) {
      const establishmentBody: EstablishmentObject = request.body.establishment
      const establishmentProperties: EstablishmentPropertieObject[] = request.body.properties
      const result: Establishment = await establishmentRepository.saveEstablishment(establishmentBody, establishmentProperties)
      return response.status(EHttpCode.SUCCESS).json(create(EHttpCode.SUCCESS, "success", result))
    }
    return response.status(EHttpCode.BAD_REQUEST).json(create(EHttpCode.BAD_REQUEST, "missing_body"))
  }
}