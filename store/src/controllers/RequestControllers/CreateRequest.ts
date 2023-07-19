import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { RequestDTO } from "../../DTO/RequestDTO";
import { badRequest, ok } from "../../UTILS/Helper";
import { IRequest } from "../../models/Request";
import { RequestRepository } from "../../repositories/RequestRepository";

export class CreateRequestController implements IController{
    constructor(private readonly requestRepository:RequestRepository){};
    async handle(httpRequest: HttpRequest<RequestDTO>): 
    Promise<HttpResponse<RequestDTO | any>> {
        const {user_id} = httpRequest.params;
        try{

            if(!httpRequest.body){
                return badRequest("Please, specify a body");
            }

            const req = await this.requestRepository.save(httpRequest.body,user_id);

            return ok(req);
        }catch(err){
            return badRequest(err);
        }

        

    }
    
}