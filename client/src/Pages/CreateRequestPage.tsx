import { useContext, useState } from "react"
import { ICreateRequest } from "../Interfaces/Request"
import { AppContext } from "../Context/AppContext";
import { IDepartment } from "../Interfaces/Department";
import { useParams } from "react-router";


export const CreateRequestPage= () =>{
    const {dept_id} = useParams();
    const [createBody, setCreateBody] = useState({} as ICreateRequest);
    const [departments, setDepartments] = useState([] as IDepartment[]);
    const {getDepartmentList, createRequest} = useContext(AppContext);
    const [img, setImg] = useState("");
    /*const formData = new FormData;
    formData.append("sender_dept_id", send_dept_id.toString());
    formData.append("destination_dept_id", createBody.destination_dept_id.toString());
    formData.append("subject", createBody.subject);
    formData.append("body", createBody.body);
    formData.append("request_image", img);*/

    // SET DEPARTMENTS
    useState(()=>{
        getDepartmentList().then(resp => setDepartments(resp));
    })


    const handleCreateRequest = (e:any) =>{
        e.preventDefault();
        let send_dept_id = " ";
        if(dept_id){
            send_dept_id = dept_id;
        }
        const formData = new FormData;
        formData.append("sender_dept_id", send_dept_id);
        formData.append("destination_dept_id", createBody.destination_dept_id.toString());
        formData.append("subject", createBody.subject);
        formData.append("request_body", createBody.body);
        formData.append("request_image", img);
        createRequest(1, formData)
    };

    const handleOnChange = (e:any) =>{
        setCreateBody({...createBody, [e.target.name]: e.target.value})
    }

    const handleSetImg = (e:any) =>{
        setImg(e)
    }

    console.log(departments);
    console.log(createBody);
    console.log(img)

    return(
        <div>
            <p>Create a new Request {dept_id}</p>
            <form onSubmit={(e)=> handleCreateRequest(e)}>
                <div className="form-group">
                    <select onChange={(e)=> handleOnChange(e)} name="destination_dept_id" /*defaultValue={departments[0].id}*/>
                        {departments.map(dept => <option value={dept.id}>{dept.department_name}</option>)}
                    </select>
                    {/*<Select options={departments} defaultValue={departments[0]} name="destination_dept_id" onChange={(e)=> handleOnChange(e)}></Select>*/}

                </div>
                <div className="form-group">
                    <label htmlFor="subject" className="form-label mt-3">SUBJECT : </label>
                    <input name="subject" className="form-control" id="subject" onChange={(e)=> handleOnChange(e)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="body" className="form-label mt-3">BODY : </label>
                    <input name="body" className="form-control" id="body" onChange={(e)=> handleOnChange(e)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="image" className="form-label mt-3">Image</label>
                    <input name="image" className="form-control" id="image" type="file" onChange={(e:any)=> handleSetImg(e.target.files[0])}></input>
                </div>

                <input type="submit" value={"send"}></input>
            </form>
        </div>
    )
}