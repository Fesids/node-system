import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import { AppContext } from "../Context/AppContext";
import { ISTD } from "../Interfaces/SiteTypeDescription";
import { SaleRequestCreate } from "../Interfaces/SaleRequest";


export const STDetail = () =>{
    const {id} = useParams();
    const {getSiteTypeDetail, createSaleRequest} = useContext(AppContext);
    const [siteDetail, setSiteDetail] = useState({} as ISTD);
    const [newReqBody, setNewReqBody] = useState({} as SaleRequestCreate);
    //const [newReqBody, setNewReqBody] = useState({} as IRequestClient);

    const handleOnChange = (e:any) =>{
        //setNewReqBody({...newReqBody, [e.target.name]:e.target.value})
        setNewReqBody({...newReqBody, [e.target.name]:e.target.value});
    }

    useEffect(()=>{
        let st_id = ""
        if(id){
            st_id = id;
        }

        getSiteTypeDetail(st_id).then(resp => setSiteDetail(resp));

    });

    console.log(newReqBody);


    const handleSubmit = (e:any) =>{
        e.preventDefault();
        let st_id = ""
        if(id){
            st_id = id;
        }
        const sendBody = {
            destination_dept_id: "64949b07b4f28f7fac6ef5a5",
            ...newReqBody
        }
        createSaleRequest(sendBody);
    }


    return(
        <div>
            {<p>{siteDetail.body}</p>}
            <div>
                <h2>Are you interest on our services?</h2>
            </div>

            <div className="">
                <form method="post" onSubmit={(e) =>handleSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="client_email" className="form-label mt-3">Email : </label>
                        <input name="client_email" className="form-control" id="client_email" onChange={(e)=> handleOnChange(e) }></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject" className="form-label mt-3">Subject : </label>
                        <input name="subject" className="form-control" id="subject" onChange={(e)=> handleOnChange(e) }></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="body" className="form-label mt-3">Body : </label>
                        <input name="body" className="form-control" id="body" onChange={(e)=> handleOnChange(e) }></input>
                    </div>

                    <input type="submit" value={"enviar"}></input>
                </form>
            </div>
        </div>
    )
}