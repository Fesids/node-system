import { Link } from "react-router-dom"
import { ISalesRequest } from "../Interfaces/SaleRequest"
import { IRequest } from "../Interfaces/Request"


export interface CLRProps {
    list: IRequest[],
    dept_name: string
}
export const RequesReceivedtList = ({list, dept_name}: CLRProps) =>{
    //console.log('teste'+list.map(resp => resp));
    return(
        <div className="req-list-container">
            {list.length?list.map(rc=>
                <div className="req-container">
                    <Link to={`/departments/${dept_name}/requests/${rc.request_id}`} className="link">{rc.subject}</Link>
                </div>): <p>No requests founds</p>}
        </div>
    )
}