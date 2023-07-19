import { IMessageRepository } from "../../DTO/Chat/MessageDTO";
import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { badRequest, ok } from "../../UTILS/Helper";
import { IMessage } from "../../models/MessageChat";

export class GetMessagesByChatIdController implements IController{
    constructor(private readonly messageRepository: IMessageRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<IMessage[] | string>> {
        try{
            const {chatId} = httpRequest.params;

            if(!chatId){
                return badRequest("No chat id found");
            }

            const msg_list = await this.messageRepository.getMessages(chatId);

            return ok(msg_list);
        }catch(err){
            return badRequest("Failed to retrieve messages");
        }
    }   
    
}