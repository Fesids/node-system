import { IChatCreate, IChatRepository } from "../../DTO/Chat/ChatDTO";
import { Chat } from "../../databases/ChatDBModels/ChatModel";
import { IChat, IChatResponse } from "../../models/Chat";

export class ChatRepository implements IChatRepository{

    async findChat(firstId: number, secondId: number): Promise<any> {

        if(!firstId || !secondId){
            throw new Error("")
        }

        const chats = await Chat.findOne<IChatResponse>({
            
        }).where("members").all([firstId, secondId]);

        return {
            id: chats?._id,
            members: chats?.members
        };
    }

    
    async userChats(profileId:string): Promise<IChat[]> {
        if(!profileId){

            throw new Error("Profile Id is required to retrieve chat list");

        };

        /*const chat = await Chat.find<any>({
            members: {$in: userId}
        });*/

        const chat = await Chat.find<IChatResponse>({
           
        }).where("members").in([profileId]);
        
        

        return chat.map(({_id, members})=>({
            id: _id,
            members
        }));
    }
    async save(body: IChatCreate): Promise<IChat> {
        const {senderId, receiverId} = body;

        if (!senderId || !receiverId){

            throw new Error('Some fields are required');
        }

        const {_id} = await Chat.create({members:[senderId, receiverId]});
        
        const newChat = await Chat.findById(_id);

        if(!newChat){
            throw new Error("Failed to create a chat");
        }

        return {
            id: newChat._id,
            members: newChat.members
        }
    }
    
}