import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import { AppContext } from "../Context/AppContext";
import { ISalesRequest } from "../Interfaces/SaleRequest";
import { ICreateRequest } from "../Interfaces/Request";
import {} from "styled-components";
import Select from "react-select";

export const ClientRequestDetailPage = () =>{
    const {dept_name, id} = useParams();
    const {getSaleRequest, createRequest, deleteSalesRequest} = useContext(AppContext);
    const [clientRequest, setClientRequest] = useState({} as ISalesRequest);
    const [sendAnaliseBody, setSendAnaliseBody] = useState({} as ICreateRequest);



    useEffect(()=>{
        let dept_id = 0;

        if(id){
            dept_id = parseInt(id);

        };

        getSaleRequest(dept_id).then(resp => setClientRequest(resp));
    });

    const sendToAnalise = (e:any) =>{
        e.preventDefault();
        const b = {
            sender_dept_id: "64949b07b4f28f7fac6ef5a5",
            destination_dept_id: "64779f1d621f292bc60f50f2",
            subject: clientRequest.subject,
            body: clientRequest.body,
           
        }
        createRequest(1,b);
        deleteSalesRequest(clientRequest.request_id);
    }

    console.log(clientRequest);
    return(
        <div className="client-request-detail">
            
            <p>body {clientRequest.body}</p>
            <p>subject {clientRequest.subject}</p>
            <p>client email : {clientRequest.client_email}</p>
            <p>created at {clientRequest.created_at}</p>

            <div className="buttons-container">
                <button className="btn btn-danger">reject</button>
                <button className="btn btn-success"onClick={(e)=>sendToAnalise(e)}>send to analisys</button>
            </div>
        </div>
    )
}