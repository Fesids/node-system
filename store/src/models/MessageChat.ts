export interface IMessage {
    id: String,
    chatId: String,
    senderId: number,
    text: String
}

export interface IMessageResponse {
    _id: String,
    chatId: String,
    senderId: number,
    text: String
}