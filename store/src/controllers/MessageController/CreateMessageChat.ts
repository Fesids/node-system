import { IMessageRepository } from "../../DTO/Chat/MessageDTO";
import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { badRequest, created } from "../../UTILS/Helper";
import { IMessage } from "../../models/MessageChat";

export class CreateMessageChatController implements IController{
    constructor(private readonly messageRepository: IMessageRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<IMessage | string>> {
        try{
            const body = httpRequest.body;

            if(!body){
                return badRequest("No body found. Please, provied a body");
            }

            const msg = await this.messageRepository.save(body);

            return created<IMessage>(msg);
        }catch(err){
            return badRequest("failed to create msg");
        }
    }
    

}