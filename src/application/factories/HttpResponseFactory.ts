import IHttpResponseFactory from "../../domain/factories/IHttpResponseFactory";
import HttpResponse from "../../domain/models/dto/HttpResponse";

export default class HttpResponseFactory implements IHttpResponseFactory {
  
  create(status: number, message: string, content?: Object): HttpResponse {
    const res: HttpResponse = new HttpResponse();
    res.status = status;
    res.message = message;
    if(content) {res.content = content}
    const date: Date = new Date();
    res.timestamp = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    return res;
  }

}