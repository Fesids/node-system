import { IChatRepository } from "../../DTO/Chat/ChatDTO";
import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { badRequest, ok } from "../../UTILS/Helper";
import { IChat } from "../../models/Chat";

export class FindChatController implements IController{
    constructor(private readonly chatRepository:IChatRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<IChat | string>> {
        try{
            const {firstId, secondId} = httpRequest.params;

            if(!firstId || !secondId){
                return badRequest("some missing params");
            };

            const fId = parseInt(firstId);
            const sId = parseInt(secondId);


            const resp = await this.chatRepository.findChat(fId, sId);

            return ok(resp);


        }catch(err){
            return badRequest("Failed to retrieve chat")
        }
    }

}