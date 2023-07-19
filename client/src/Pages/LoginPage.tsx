import { useContext, useEffect, useState } from "react"
import { IUser, LoginResponseData, UserLoginReq } from "../Interfaces/User"
import { AppContext } from "../Context/AppContext";
import Cookie from "js-cookie";
import { useNavigate } from "react-router";

export const LoginPage = () =>{

    const [userLogin, setUserLogin] = useState({} as UserLoginReq);
    const [userBody, setUserbody] = useState({} as LoginResponseData);

    const {login, currentUser} = useContext(AppContext);

    const navigate = useNavigate();

    const handleChange = (e:any)=>{
        setUserLogin({...userLogin, [e.target.name]: e.target.value});
    }

    const LoginHandle = (e:any, user:any) =>{
        e.preventDefault()
        login(e, user).then(
            resp => {setUserbody(resp);}
        );

        if(Cookie.get("auth_cookie")?.length && currentUser){
            navigate("../", {replace:true})
        }
        //navigate("../", {replace:true})


    }

    useEffect(()=>{
        if(userBody.token){
            Cookie.set("auth_cookie", userBody.token);
        }
    })

    console.log(userBody);
    return(
        <div className="create-user-form">
            <h2 className="mt-2 mb-2">Login</h2>
            <p>Enter your credentials</p>
            <form method="post" onSubmit={(e) => LoginHandle(e, userLogin)} >
                

                <div className="form-group">
                    <label htmlFor="email" className="form-label mt-3">EMAIL : </label>
                    <input name="email" className="form-control" id="email" onChange={(e)=> handleChange(e)}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label mt-3">PASSWORD : </label>
                    <input name="password" className="form-control" id="password" onChange={(e)=> handleChange(e)}></input>
                </div>

                <input type="submit" value={"login"}></input>
            </form>
        </div>
    )
}