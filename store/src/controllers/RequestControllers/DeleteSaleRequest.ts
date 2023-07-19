import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { IRequestRepository } from "../../DTO/RequestDTO";
import { badRequest, ok } from "../../UTILS/Helper";

export class DeleteSaleRequest implements IController{
    constructor(private readonly requestRepository:IRequestRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<any>> {
        try{
            const {id} = httpRequest.params;

            if(!id){
                return badRequest("No request id found!");
            }

            const resp = await this.requestRepository.deleteSaleRequest(id);

            return ok(resp);

        }catch(err){
            return badRequest("Failed to delete request");
        }
    }
    
}