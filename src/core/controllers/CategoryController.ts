import { Request, Response } from "express";
import CategoryRepository from "../../infra/repositories/CategoryRepository";
import { CreateCategoryBody, Optional } from "../../domain/types/types";
import { Category } from "@prisma/client";
import { EHttpCode } from "../../domain/enums/EHttpCode";
import HttpResponseFactory from "../../application/factories/HttpResponseFactory";

const {create} = new HttpResponseFactory()
const categoryRepository: CategoryRepository = new CategoryRepository()

export default class CategoryController {

  async FindAll(request: Request, response: Response) {
    return response.status(EHttpCode.SUCCESS).json(create(EHttpCode.SUCCESS, "success", await categoryRepository.findAll(Number(request.query.limit))))
  }

  async FindOne(request: Request, response: Response) {
    const category: Optional<Category> = await categoryRepository.findOne(request.params.id)
    if(category != null) {
      return response.status(EHttpCode.SUCCESS).json(create(EHttpCode.SUCCESS, "success", category))  
    }
    return response.status(EHttpCode.NOT_FOUND).json(create(EHttpCode.NOT_FOUND, "not_found"))  
  }

  async SaveCategory(request: Request, response: Response) {
    const body = request.body as CreateCategoryBody
    const result: Category = await categoryRepository.saveCategory(body.category, body.properties)
    return response.status(EHttpCode.SUCCESS).json(create(EHttpCode.SUCCESS, "success", result))
  }
}