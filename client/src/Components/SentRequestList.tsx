import { Link } from "react-router-dom"
import { IRequest } from "../Interfaces/Request"

interface SentReqParams{
    list: IRequest[],
    dept_name: string
}


export const SentRequestList = ({list, dept_name}:SentReqParams) =>{

    return(
        <div className="req-list-container">
            {list.length? list.map(resp =>

                <div className="req-container">
                    <Link to={`/departments/${dept_name}/requests/${resp.request_id}`} className="link">{resp.subject}</Link>
                </div>
            ):
            
            <p>No requests found</p>}

        </div>
    )

}