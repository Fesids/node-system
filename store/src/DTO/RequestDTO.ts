import { IRequest } from "../models/Request";
import { ISalesRequest } from "../models/SalesRequest";

export interface SalesRequestDTO extends Omit<ISalesRequest, "request_id" | "created_at">{

}

export interface RequestDTO{
    //request_id int primary key auto_increment not null,
    //user_sender_id : number;
    sender_dept_id : string;
    destination_dept_id : string;
    subject : string;
    request_body : string,
    request_image: string
}

export interface IRequestRepository{
    save(params: RequestDTO, user_id:number): Promise<IRequest>;
    saveSaleRequest(params: SalesRequestDTO): Promise<ISalesRequest>;

    getSaleRequestList(dept_id:string): Promise<ISalesRequest[]>;
    getSaleRequestDetail(id:string): Promise<ISalesRequest>;
    deleteSaleRequest(id:number): Promise<any>;

    getRequestList(dept_id:string): Promise<IRequest[]>;
    getRequestListBySentId(sent_id:string): Promise<IRequest[]>;
    getRequestDetail(id:string): Promise<any>;

}

