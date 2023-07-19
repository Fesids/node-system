import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { IRequestRepository } from "../../DTO/RequestDTO";
import { badRequest, ok } from "../../UTILS/Helper";
import { IRequest } from "../../models/Request";

export class GetRequestsBySentIdController implements IController{
    constructor(private readonly requestRepository:IRequestRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<IRequest[] | string>> {

        try{
            const {sent_id} = httpRequest.params;

            const requests = await this.requestRepository.getRequestListBySentId(sent_id);

            return ok(requests);
        }catch(err){
            return badRequest("failed to retrieve request list");
        }

    }
    
}