import { Request, Response } from "express";
import HttpResponseFactory from "../../application/factories/HttpResponseFactory";
import { EHttpCode } from "../../domain/enums/EHttpCode";

const httpResponseFactory: HttpResponseFactory = new HttpResponseFactory() 
export default class HomeController {

  public Index(request: Request, response: Response) {
    response.send(httpResponseFactory.create(EHttpCode.SUCCESS, "success"))
  }
}
