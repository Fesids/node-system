import { values } from "lodash";
import { IRequestRepository, RequestDTO, SalesRequestDTO } from "../DTO/RequestDTO";
import { MysqlRequestDB, MysqlRequestPool } from "../databases/RequestMysqlDB";
import { IRequest } from "../models/Request";
import { ISalesRequest } from "../models/SalesRequest";

export class RequestRepository implements IRequestRepository{

    async getRequestListBySentId(sent_id: string): Promise<IRequest[]> {
        let q = "select * from request_history where sender_dept_id=?";

        const requests = await MysqlRequestPool.query<IRequest[]>(q, sent_id);

        return requests[0];
    }

    async deleteSaleRequest(id: number): Promise<any> {
        let q = "select * from sales_request_history where request_id=?";

        const saleRequestExist = await MysqlRequestPool.query<ISalesRequest[]>(q, id);
        
        if(!saleRequestExist[0][0]){
            throw new Error("No Request with id "+id+" found");
        }

        q = "delete from sales_request_history where request_id=?";

        MysqlRequestPool.query(q, id);

        return "delete successfully";
        //throw new Error("")
    }
    async getSaleRequestDetail(id: string): Promise<ISalesRequest> {
        let q = "select * from sales_request_history where request_id=?";

        const saleReq = await MysqlRequestPool.query<ISalesRequest[]>(q, id);

        if(!saleReq){
            throw new Error(`request with id ${id} doesn't exist`);
        }

        return saleReq[0][0];

    }
    async getRequestDetail(id: string): Promise<IRequest> {
        let q = "select * from request_history where request_id=?";

        const request = await MysqlRequestPool.query<IRequest[]>(q, id);

        if(!request){
            throw new Error(`No request with id ${id} found`);
        }

        return request[0][0];
    }

    

    async getRequestList(dept_id: string): Promise<IRequest[]> {
        let q = "select * from request_history where destination_dept_id=?";

        const res = await MysqlRequestPool.query<IRequest[]>(q, dept_id);

        return res[0];

    }

    async getSaleRequestList(dept_id: string): Promise<ISalesRequest[]> {
        let q = "select * from sales_request_history where destination_dept_id=?";
        

        const res = await MysqlRequestPool.query<ISalesRequest[]>(q,dept_id);

        return res[0];
    }

    async saveSaleRequest(params: SalesRequestDTO): Promise<ISalesRequest> {
        let q = "insert into sales_request_history( destination_dept_id,subject,body, client_email) values(?, ?, ?, ?)";

        const values = [
            params.destination_dept_id,
            params.subject,
            params.body,
            params.client_email
        ];

        let [rows] = await MysqlRequestPool.query<ISalesRequest[]>(q, values);

        q = "select * from sales_request_history where id=?";
        const res = await MysqlRequestPool.query<ISalesRequest[]>(q, rows[0].request_id);

        return res[0][0];
    }
    

    async save(params: RequestDTO, user_id:number): Promise<any> {
        let q = "insert into request_history( user_sender_id,sender_dept_id,destination_dept_id,subject,request_body, created_at, request_image) values(?, ?, ?, ?, ?, ?, ?)";

        

        const creation_date = new Date().toISOString().slice(0,19).replace("T", ' ');

        const values = [
            //params.user_sender_id,
            user_id,
            params.sender_dept_id,
            params.destination_dept_id,
            params.subject,
            params.request_body,
            creation_date,
            params.request_image
        ];

        let [rows] = await MysqlRequestPool.query<IRequest[]>(q, values);
        

        return ""//res[0][0];

    }
    
}