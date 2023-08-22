import { IChatRepository } from "../../DTO/Chat/ChatDTO";
import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { badRequest, ok } from "../../UTILS/Helper";
import { IChat } from "../../models/Chat";

export class UserChatController implements IController{
    constructor(private readonly chatRepository:IChatRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<IChat[] | string>> {
        

        try{
            const {userId} = httpRequest.params;

            if(!userId){
                return badRequest("No user id found");
            }

            const resp = await this.chatRepository.userChats(userId);
            

            return ok(resp);
        }catch(err){
            return badRequest("failed to retrieve chat list");
        }


    }
    
}