import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { IRequestRepository } from "../../DTO/RequestDTO";
import { badRequest, ok } from "../../UTILS/Helper";
import { ISalesRequest } from "../../models/SalesRequest";

export class GetSaleRequestDetail implements IController{
    constructor(private readonly requestRepository:IRequestRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<ISalesRequest | string>> {
        try{
            const {id} = httpRequest.params;

            if(!id){
                return badRequest("no request id found!");
            }

            const resp = await this.requestRepository.getSaleRequestDetail(id);

            return ok(resp);
        }catch(err){
            return badRequest("failed to retrieve sale request");
        }
    }
    
}