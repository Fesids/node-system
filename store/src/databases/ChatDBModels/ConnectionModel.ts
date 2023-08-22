import moongose, {Model, Document, Schema} from "mongoose";
import { number, string } from "prop-types";

type ConnectionDocument = Document & {
    profileId: string
}

const ConnectionSchema = new Schema(
    {
        profileId:{
            type: String
        }
    },
    {
        timestamps: true
    }
);

const Connection:Model<ConnectionDocument> = moongose.model<ConnectionDocument>("Connections", ConnectionSchema);
export {Connection, ConnectionDocument}