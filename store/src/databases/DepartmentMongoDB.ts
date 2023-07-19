import moongose, {Model, Document, Schema} from "mongoose";
import { type } from "os";

type DepartmentDocument = Document & {
    department_name: string
}

type DepartmentInput = {
    department_name: DepartmentDocument["department_name"],

}

const DepartmentSchema = new Schema(
    {
        department_name:{
            type:String,
            default: ""
        }
    }
)

const Department: Model<DepartmentDocument> = moongose.model<DepartmentDocument>("Department", DepartmentSchema);
export {Department, DepartmentDocument, DepartmentInput}
