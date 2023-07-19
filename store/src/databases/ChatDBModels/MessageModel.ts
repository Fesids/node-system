import mongoose, {Schema, Model, Document} from "mongoose";


type MessageDocument = Document &{
    chatId: String,
    senderId: number,
    text: String
}

const MessageSchema = new Schema(
    {
        chatId: {
            type: String,
        },

        senderId: {
            type: Number
        },
        
        text:{
            type: String
        },
    },{
        timestamps: true
    }
)

const Message:Model<MessageDocument> = mongoose.model<MessageDocument>("Message", MessageSchema);
export {Message, MessageDocument};