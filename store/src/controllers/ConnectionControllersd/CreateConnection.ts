import { ConnectionDTO, IConnectionRepository } from "../../DTO/Chat/ConnectionDTO";
import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { badRequest, ok } from "../../UTILS/Helper";
import { IConnection } from "../../models/Connection";

export class CreateConnectionController implements IController{
    constructor(private readonly connectionRepository: IConnectionRepository){}
    async handle(httpRequest: HttpRequest<ConnectionDTO>): 
    Promise<HttpResponse<IConnection | string>> {
        try{
            
            const {body} = httpRequest;

            if(!body){
                return badRequest("No body provided. Please, specify a body");
            }


            const connection = await this.connectionRepository.save(body);

            return ok(connection);
        }catch(err){
            return badRequest("Failed to retrieve connection");
        }
    }

}