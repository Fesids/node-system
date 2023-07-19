import { Link } from "react-router-dom"
import { IRequest } from "../Interfaces/Request"

interface SentReqParams{
    list: IRequest[],
    dept_name: string
}


export const SentRequestList = ({list, dept_name}:SentReqParams) =>{

    return(
        <div>
            {list.length? list.map(resp =>

                <div>
                    <p><Link to={`/departments/${dept_name}/requests/${resp.request_id}`}>{resp.subject}</Link></p>
                </div>
            ):
            
            <p>No requests</p>}

        </div>
    )

}