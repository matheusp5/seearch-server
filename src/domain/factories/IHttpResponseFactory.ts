import HttpResponse from "../models/dto/HttpResponse";

export default interface IHttpResponseFactory {
  create(status: number, message: string): HttpResponse;
}