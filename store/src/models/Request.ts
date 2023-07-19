import { RowDataPacket } from "mysql2";

export interface IRequest extends RowDataPacket{
    request_id: string,
    user_sender_id : number;
    sender_dept_id : string;
    destination_dept_id : string;
    subject : string;
    body : string
}