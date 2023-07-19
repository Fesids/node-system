export interface IMessage {
    id: String,
    chatId: String,
    senderId: number,
    text: String
}

export interface IMessageCreate {
   
    chatId: String,
    senderId: number,
    text: String
}