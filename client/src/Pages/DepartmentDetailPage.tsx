import { useContext, useEffect, useState } from "react"
import { AppContext } from "../Context/AppContext"
import { IDepartment } from "../Interfaces/Department";
import { useParams } from "react-router";
import { DepartmentComp } from "../Components/DepartmentComp";
import { IUser } from "../Interfaces/User";
import { ISalesRequest } from "../Interfaces/SaleRequest";
import { ClientRequestList } from "../Components/ClientRequestList";
import { IRequest } from "../Interfaces/Request";
import { RequesReceivedtList } from "../Components/RequestList";
import { SentRequestList } from "../Components/SentRequestList";
import { Link } from "react-router-dom";

export const DepartmentDetail = () =>{
    const [department, setDepartment] = useState({} as IDepartment);
    const [users, setUsers] = useState([] as IUser[]);
    const {id} = useParams();
    const {getDepartment,currentUser, getUsersByDeptId, getAllSaleRequestByDept, getAllRequestByDestinationDept, getAllRequestBySentDept} = useContext(AppContext);
    const [salesRequest, setSlesRequest] = useState([] as ISalesRequest[]);
    const [deptRequests, setDeptRequests] = useState([] as IRequest[]);
    const [sentRequests, setSentRequests] = useState([] as IRequest[]);

    const [showClientRequests, setShowClientRequests] = useState(false);
    const [showReceivedRequests, setShowReceivedRequests] = useState(false);
    const [showSentRequests, setShowSentRequests] = useState(false);


    const handleShowClientRequests = () =>{
        setShowClientRequests(!showClientRequests);
    }

    const handleShowRecievedRequests = () =>{
        setShowReceivedRequests(!showReceivedRequests);
    }

    const handleShowSentClientRequests = () =>{
        setShowSentRequests(!showSentRequests);
    }

    useEffect(()=>{
        let dep_id = '';
        if(id){
            dep_id = id;
        };
        getAllSaleRequestByDept(dep_id).then(resp => setSlesRequest(resp));
    });


    useEffect(()=>{
        let dep_id='';
        if(id){
            dep_id = id;
        };
        getAllRequestByDestinationDept(dep_id).then(resp => setDeptRequests(resp));
    });

    useEffect(()=>{
        let dep_id= "";
        if(id){
            dep_id= id;
        };
        getAllRequestBySentDept(dep_id).then(resp => setSentRequests(resp));
    })


    // ##### SET DEPARTENT
    useEffect(() =>{
        let dep_id = '';
        if(id){
            dep_id = id;
        }
        getDepartment(dep_id).then(resp => setDepartment(resp));
    }, []);


    useEffect(()=>{
        let dep_id = '';
        if(id){
            dep_id = id;
        }
        getUsersByDeptId(dep_id).then(resp => setUsers(resp));
    }, []);


    console.log(deptRequests);

    return(
        <div>
            
            <div className="department-header">
                <h2>{department?.department_name} department</h2>
                <h6>Welcome {currentUser?.username} !!!</h6>
            </div>

            <h3 className="request-header-text">Check department requests</h3>

        

            <div className="requests-content-container">

                <div className="request-container border">
                    <div className="client-request-header">Sales Request</div>
                    <div  className="request-button-container bg-dark">
                        <button className="btn btn-dark" onClick={handleShowClientRequests}>show</button>
                    </div>
                    <div>
                        {showClientRequests?<ClientRequestList list={salesRequest} dept_name={department.department_name}/>: ""}
                    </div>
                </div>

                <div className="request-container">
                    <div className="client-request-header">Others Request</div>
                    <div className="request-button-container bg-dark">
                        <button className="btn btn-dark" onClick={handleShowRecievedRequests}>show</button>
                        <button className="btn btn-light btn-request btn-link"><Link to={`/departments/${id}}/request/new`} className="link">+ add request</Link></button>
                    </div>
                    <div>
                        {showReceivedRequests?<RequesReceivedtList list={deptRequests} dept_name={department.department_name}/>:""}
                    </div>
                </div>

                <div className="request-container border">
                    <div className="client-request-header"><h4>Sent Request</h4></div>
                    <div className="request-button-container bg-dark">
                        <button className="btn btn-dark" onClick={handleShowSentClientRequests}>show</button>
                        <button className="btn btn-light btn-request btn-link"><Link to={`/departments/${id}}/request/new`} className="link">+ add request</Link></button>
                   
                    </div>
                    <div>
                        {showSentRequests?<SentRequestList list={sentRequests} dept_name={department.department_name}/>:""}
                    </div>
                </div>
            </div>
        </div>
    )
}