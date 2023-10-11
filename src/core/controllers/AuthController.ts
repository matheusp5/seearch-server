import { Request, Response } from "express";
import AuthService from "../../application/services/AuthService";
import UserRepository from "../../infra/repositories/UserRepository";
import { LoginBody, RegisterBody } from "../../domain/types/types";
import HttpResponseFactory from "../../application/factories/HttpResponseFactory";
import { EHttpCode } from "../../domain/enums/EHttpCode";
import Messager from "../../utils/Messager";

const authService: AuthService = new AuthService()
const httpResponseFactory: HttpResponseFactory = new HttpResponseFactory()

export default class AuthController {
  async Login(request: Request, response: Response) {
    try {
      const {email, password}: LoginBody = request.body
      const result = await authService.login(email, password)
      if(result) {
        return response.status(EHttpCode.SUCCESS).json(httpResponseFactory.create(EHttpCode.SUCCESS, "authorized"))
      }
      return response.status(EHttpCode.UNAUTHORIZED).json(httpResponseFactory.create(EHttpCode.UNAUTHORIZED, "unauthorized"))
    } catch(e) {
      Messager.errorMessage((e as Error).message)
      return response.status(EHttpCode.INTERNAL_ERROR).json(httpResponseFactory.create(EHttpCode.INTERNAL_ERROR, "internal_error"))
    }
  }

  
  async Register(request: Request, response: Response) {
    try {
      const {name, email, password}: RegisterBody = request.body
      const result = await authService.register(name, email, password)
      if(result) {
        return response.status(EHttpCode.SUCCESS).json(httpResponseFactory.create(EHttpCode.SUCCESS, "success"))
      }
      return response.status(EHttpCode.UNAUTHORIZED).json(httpResponseFactory.create(EHttpCode.UNAUTHORIZED, "email_already_exists"))
    } catch(e) {
      Messager.errorMessage((e as Error).message)
      return response.status(EHttpCode.INTERNAL_ERROR).json(httpResponseFactory.create(EHttpCode.INTERNAL_ERROR, "internal_error"))
    }
  }
}