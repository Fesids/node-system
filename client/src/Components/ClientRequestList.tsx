import { Link } from "react-router-dom"
import { ISalesRequest } from "../Interfaces/SaleRequest"


export interface CLRProps {
    list: ISalesRequest[],
    dept_name: string
}
export const ClientRequestList = ({list, dept_name}: CLRProps) =>{
    //console.log('teste'+list.map(resp => resp));
    return(
        <div className="req-list-container">
            {list.length?list.map(rc=>
                <div className="req-container">
                    <Link to={`/departments/${dept_name}/clientRequests/${rc.request_id}`} className="link">{rc.subject}</Link>
                </div>): <p>No requests found</p>}
        </div>
    )
}