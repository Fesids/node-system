import { RowDataPacket } from "mysql2";

export interface ISalesRequest extends RowDataPacket{
    request_id : number,
    destination_dept_id : string,
    subject : string,
    body : string,
    created_at : string,
    client_email : string
}