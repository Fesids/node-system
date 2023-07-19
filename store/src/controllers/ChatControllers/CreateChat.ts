import { IChatCreate, IChatRepository } from "../../DTO/Chat/ChatDTO";
import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { badRequest, ok } from "../../UTILS/Helper";
import { IChat } from "../../models/Chat";

export class CreateChatController implements IController{
    constructor(private readonly chatRepository:IChatRepository){}
    async handle(httpRequest: HttpRequest<IChatCreate>): 
    Promise<HttpResponse<IChat | string>> {

        try{
            if (!httpRequest.body){
                return badRequest("No body found. Please, insert a body");
            }

            const newChat = await this.chatRepository.save(httpRequest.body);

            return ok(newChat);
        }catch{
            return badRequest("Failed to create chat");
        }




        throw new Error("Method not implemented.");
    }

}