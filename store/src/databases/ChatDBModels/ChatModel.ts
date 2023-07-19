import mongoose, {Model, Schema, Document} from 'mongoose';

type ChatDocument = Document &{
    members: Array<any>,

};

const ChatSchema = new Schema(
    {
        members: {
            type: Array
        },
    },
    {
        timestamps: true
    }
);

const Chat:Model<ChatDocument> = mongoose.model<ChatDocument>("Chat", ChatSchema);
export {Chat, ChatDocument}