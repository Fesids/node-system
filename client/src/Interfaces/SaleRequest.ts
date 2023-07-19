export interface ISalesRequest {
    request_id : number,
    destination_dept_id : string,
    subject : string,
    body : string,
    created_at : string,
    client_email : string
}

export interface SaleRequestCreate extends Omit<ISalesRequest, "request_id"|"created_at"|"destination_dept_id">{}