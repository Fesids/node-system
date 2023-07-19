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
        <div>
            {list.map(rc=>
                <div>
                    <h4><Link to={`/departments/${dept_name}/requests/${rc.request_id}`}>{rc.subject}</Link></h4>
                </div>)}
        </div>
    )
}