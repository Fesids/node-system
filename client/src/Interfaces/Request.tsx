export interface IRequest{
    request_id: number,
    user_sender_id: number,
    sender_dept_id: string,
    destination_dept_id: string,
    subject: string,
    body: string,
    created_at: string,
    
}

export interface ICreateRequest{
    //request_id: number,
    //user_sender_id: number,
    sender_dept_id: string,
    destination_dept_id: string,
    subject: string,
    body: string,
    //created_at: string,
    
}