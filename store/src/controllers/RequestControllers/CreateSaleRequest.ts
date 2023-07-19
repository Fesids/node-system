import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { IRequestRepository, SalesRequestDTO } from "../../DTO/RequestDTO";
import { badRequest, ok } from "../../UTILS/Helper";
import { ISalesRequest } from "../../models/SalesRequest";

export class CreateSalesRequestController implements IController{
    constructor(private readonly salesRequestRepository: IRequestRepository){}
    async handle(httpRequest: HttpRequest<SalesRequestDTO>): 
    Promise<HttpResponse<ISalesRequest | string>> {
        try{
            if(!httpRequest.body){
                return badRequest("No body provided");
            }

            const req = await this.salesRequestRepository.saveSaleRequest(httpRequest.body);

            return ok<ISalesRequest>(req);
        }catch(err){
            return badRequest("failed to create sale request");
        }
    }
    
}