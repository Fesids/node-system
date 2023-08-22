import { IConnection } from "../../models/Connection";
import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { IChatResponse } from "../../models/Chat";
import { IConnectionRepository } from "../../DTO/Chat/ConnectionDTO";
import { badRequest, ok } from "../../UTILS/Helper";


export class GetConnectionByProfileIdController implements IController{
    constructor(private readonly connectionRepository:IConnectionRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<IConnection | string>> {
        try{
            const {profileId} = httpRequest.params;

            if(!profileId){
                return badRequest("No profile Id found");
            }

            const connection = await this.connectionRepository.retrieveConnectionByProfileId(profileId);

            return ok(connection);
        }catch(err){
            return badRequest("Failed to retrieve connection")
        }
    }
    
    
}