import _ from "lodash";
import { IMessageCreate, IMessageRepository } from "../../DTO/Chat/MessageDTO";
import { Message } from "../../databases/ChatDBModels/MessageModel";
import { IMessage, IMessageResponse } from "../../models/MessageChat";

export class MessageRepository implements IMessageRepository{
    async getMessages(chatId: string): Promise<IMessage[]> {

        if (!chatId){
            throw new Error("No chat id provided");
        };

        const messages = await Message.find<IMessageResponse>({chatId});

        /*if(!messages.length){
            
            //console.log("batata");
            throw new Error("No messages found");
        }*/

        return messages.map(({_id, chatId, senderId, text})=> ({
            id: _id,
            text,
            senderId, 
            chatId
        }));
    };


    async save(body: IMessageCreate): 
    Promise<IMessage> {
       const {senderId, chatId, text} = body;

       const b:IMessageCreate ={
            senderId,
            chatId,
            text
       };

       const {_id} = await Message.create(b);

       const newMessage = await Message.findById(_id);

       if(!newMessage){
        throw new Error("Failed to create message");
       }

       return{
        id: newMessage._id,
        senderId: newMessage.senderId,
        chatId: newMessage.chatId,
        text: newMessage.text
       }




    }
    
}