import { useContext, useState } from "react";
import { useParams } from "react-router"
import { AppContext } from "../Context/AppContext";
import { IRequest } from "../Interfaces/Request";

export const RequestDetailPage = () =>{
    const {id} = useParams();
    const {getRequest} = useContext(AppContext);
    const [request, setRequest] = useState({} as IRequest);

    useState(()=>{
        let req_id = 0;
        if(id){
            req_id = parseInt(id);
        };

        getRequest(req_id).then(resp => setRequest(resp));
    });

    console.log(request);


    return(
        <div className="client-request-detail">
            
            <p>body {request.body}</p>
            <p>subject {request.subject}</p>
           
            <p>created at {request.created_at}</p>

            <div className="buttons-container">
                <button className="btn btn-danger">reject</button>
                <button className="btn btn-success" >send to analisys</button>
            </div>
        </div>
    )
}