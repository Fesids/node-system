import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { IRequestRepository } from "../../DTO/RequestDTO";
import { badRequest, ok } from "../../UTILS/Helper";
import { IRequest } from "../../models/Request";

export class GetRequestDetail implements IController{
    constructor(private readonly requestRepository: IRequestRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<IRequest | string>> {
        try{
            const {id} = httpRequest.params;

            if(!id){
                return badRequest("Missing request id");
            }

            const resp = await this.requestRepository.getRequestDetail(id);

            return ok(resp);
        }catch(err){
            return badRequest("Failed to retrieve request");
        }
    }
    
}