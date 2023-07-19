import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { IRequestRepository } from "../../DTO/RequestDTO";
import { badRequest, ok } from "../../UTILS/Helper";
import { ISalesRequest } from "../../models/SalesRequest";

export class GetSalesRequestByDeptController implements IController{
    constructor(private readonly requstRepository: IRequestRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<ISalesRequest[] | string>> {
        try{

            const {dept_id} = httpRequest.params;
            if(!dept_id){
                return badRequest("insert department id to retrieve the list");
            }
            const res = await this.requstRepository.getSaleRequestList(dept_id);

            return ok(res);
        } catch(err){
            return badRequest("failed to retrieve request list");
        }
    }
    
}