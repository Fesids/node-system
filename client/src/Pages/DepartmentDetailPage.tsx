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
    const {getDepartment, getUsersByDeptId, getAllSaleRequestByDept, getAllRequestByDestinationDept, getAllRequestBySentDept} = useContext(AppContext);
    const [salesRequest, setSlesRequest] = useState([] as ISalesRequest[]);
    const [deptRequests, setDeptRequests] = useState([] as IRequest[]);
    const [sentRequests, setSentRequests] = useState([] as IRequest[]);




    
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

    useState(()=>{
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
            {id}
            <DepartmentComp {...department}/>

            <div className="mt-4 mb-4 border">
                {users.map(u =>
                    <div>
                        <h3>{u.username}</h3>
                        <p>{u.email}</p>
                    </div>
                    
                )}
            </div>

            <div className="request-content-container">

                <div className="request-container border">
                    <div className="request-title"><h4>Sales Request</h4></div>
                    <div  className="request-buttons">buttons</div>
                    <div>
                        <ClientRequestList list={salesRequest} dept_name={department.department_name}/>
                    </div>
                </div>

                <div className="request-container border">
                    <div className="request-title"><h4>Others Request</h4></div>
                    <div className="request-buttons">
                        <Link to={`/departments/${id}}/request/new`}>+ add request</Link>
                    </div>
                    <div>
                        <RequesReceivedtList list={deptRequests} dept_name={department.department_name}/>
                    </div>
                </div>

                <div className="request-container border">
                    <div className="request-title"><h4>Sent Request</h4></div>
                    <div className="request-buttons">buttons</div>
                    <div>
                        <SentRequestList list={sentRequests} dept_name={department.department_name}/>
                    </div>
                </div>
            </div>
        </div>
    )
}