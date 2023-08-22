import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import { AppContext } from "../Context/AppContext";
import { ISalesRequest } from "../Interfaces/SaleRequest";
import { ICreateRequest } from "../Interfaces/Request";
import {} from "styled-components";
import Select from "react-select";

export const ClientRequestDetailPage = () =>{
    const {dept_name, id} = useParams();
    const {getSaleRequest, createRequest, deleteSalesRequest, currentUser} = useContext(AppContext);
    const [clientRequest, setClientRequest] = useState({} as ISalesRequest);
    const [sendAnaliseBody, setSendAnaliseBody] = useState({} as ICreateRequest);

    const [showMore, setShowMore] = useState(false);


    useEffect(()=>{
        let dept_id = 0;

        if(id){
            dept_id = parseInt(id);

        };

        getSaleRequest(dept_id).then(resp => setClientRequest(resp));
    });

    const handleRejectRequest = (e:any) =>{
        e.preventDefault()
        let req_client_id = 0;
        if(clientRequest.request_id){
            req_client_id = clientRequest.request_id;

        }

        deleteSalesRequest(req_client_id);
    }

    const sendToAnalise = (e:any) =>{
        e.preventDefault();
        const b = {
            sender_dept_id: "64949b07b4f28f7fac6ef5a5", // SALES DEPT ID
            destination_dept_id: "64779f1d621f292bc60f50f2", // IT DEPT ID
            subject: clientRequest.subject+ " ( client request )",
            body: clientRequest.body,
           
        }
        let cc = 0;
        if(currentUser?.id){

            cc = currentUser.id;
        }
        createRequest(cc,b);
        //deleteSalesRequest(clientRequest.request_id);
    }

    console.log(clientRequest);

    let body = ""
    if(clientRequest.body){
        body = clientRequest.body
    }

    return(
        <div className="request-detail-container">
             <div className="request-detail">
            
                <p className="subject">subject {clientRequest.subject}</p>

                <div className="request-body">
                    {showMore?body: body.substring(0, 100)} <p onClick={()=> setShowMore(!showMore)}>{!showMore?"show more":"show less"}</p>

                </div>

                <p>client email : {clientRequest.client_email}</p>
                <p>created at {clientRequest.created_at}</p>

                <div className="buttons-container">
                    <button className="btn btn-outline-danger" onClick={(e)=>handleRejectRequest(e)}>reject</button>
                    <button className="btn btn-outline-success btn-analysis"onClick={(e)=>sendToAnalise(e)}>send to analisys</button>
                </div>
            </div>
        </div>
       
    )
}