import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { IRequestRepository } from "../../DTO/RequestDTO";
import { badRequest, ok } from "../../UTILS/Helper";
import { IRequest } from "../../models/Request";

export class GetAllRequestsByDestinationId implements IController{
    constructor(private readonly requestRepository: IRequestRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<IRequest[] | string>> {
        try{
            const {dept_id} = httpRequest.params;
            if(!dept_id){
                return badRequest("No id provieded!!");
            }

            const res = await this.requestRepository.getRequestList(dept_id);

            return ok(res);
        }catch(err){
            throw new Error("failed to retrieve request list");
        }
    }

}