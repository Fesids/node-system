import { IConnectionRepository } from "../../DTO/Chat/ConnectionDTO";
import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { badRequest, ok } from "../../UTILS/Helper";
import { IConnection } from "../../models/Connection";

export class GetConnectionDetailController implements IController{
    constructor(private readonly connectionRepository:IConnectionRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<IConnection | string>> {
        try{

            const {connectionId} = httpRequest.params;

            if(!connectionId){
                return badRequest("No connection id provided");
            }

            const connection = await this.connectionRepository.retrieveConnectionById(connectionId);

            return ok(connection);

        }catch(err){
            return badRequest("Failed to retrieve connection");
        }
    }
    
}