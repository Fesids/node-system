import { toInteger } from "lodash";
import { IMessage } from "../../models/MessageChat";

export interface IMessageCreate{
    
    chatId: String,
    senderId: number,
    text: String

}

export interface IMessageRepository{
    save(body: IMessageCreate): Promise<IMessage>;
    getMessages(chatId:string): Promise<IMessage[]>
}