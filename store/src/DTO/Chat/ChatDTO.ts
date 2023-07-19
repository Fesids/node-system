import { IChat } from "../../models/Chat"

export interface IChatCreate{
    senderId: number,
    receiverId: number
}

export interface IChatRepository{
    save(body: IChatCreate): Promise<IChat>;

    userChats(userId: number): Promise<any>;

    findChat(firstId:number, secondId:number): Promise<any>;
}