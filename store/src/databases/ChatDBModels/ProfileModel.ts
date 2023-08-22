import moongose, {Schema, Model, Document} from "mongoose";
import { string } from "prop-types";

type ProfileDocument = Document &{
    user_id:number,
    name: string,
    pic: string,
    friends:Array<any>

}

const ProfileSchema = new Schema(
    {
        user_id:{
            type: Number
        },
        name:{
            type: String
        },
        pic:{
            type: String
        },
        friends:{
            type: Array
        }
    },
    {
        timestamps: true
    }
);


const Profile:Model<ProfileDocument> = moongose.model<ProfileDocument>("Profile", ProfileSchema);
export {Profile, ProfileDocument}

