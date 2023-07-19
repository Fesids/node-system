import { Link } from "react-router-dom"
import { ISalesRequest } from "../Interfaces/SaleRequest"


export interface CLRProps {
    list: ISalesRequest[],
    dept_name: string
}
export const ClientRequestList = ({list, dept_name}: CLRProps) =>{
    //console.log('teste'+list.map(resp => resp));
    return(
        <div>
            {list.map(rc=>
                <div>
                    <h4><Link to={`/departments/${dept_name}/clientRequests/${rc.request_id}`}>{rc.subject}</Link></h4>
                </div>)}
        </div>
    )
}