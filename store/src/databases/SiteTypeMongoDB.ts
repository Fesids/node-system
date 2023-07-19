import mongoose from "mongoose";
import {Model, Document, Schema} from "mongoose";
import {type} from "os"
import { EsiteType } from "../ENUM/EsiteType";

type SiteTypeDocument = Document & {
    body: string,
    description: string,
    siteType: EsiteType

}

const SiteTypeSchema = new Schema(
    {
        description:{
            type: String,
            default: ""
        },
        body: {
            type: String,
            default: ""
        },
        siteType: {
            type: String,
            default: ""
        }
    }
)

const SiteTypeDescription: Model<SiteTypeDocument> = mongoose.model<SiteTypeDocument>("STD", SiteTypeSchema);
export{SiteTypeDescription, SiteTypeDocument}