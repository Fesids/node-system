import { useContext, useState } from "react"
import { UserRegisterReq, UserRole } from "../Interfaces/User"
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router";

export const RegisterPage = () =>{

    const [regUser, setRegUser] = useState({} as UserRegisterReq);
    const {register} = useContext(AppContext);
    const navigate = useNavigate();

    const handleChange = (e:any) =>{
        setRegUser({...regUser, [e.target.name]: e.target.value})
    }

    const Register = (e:any, user:any) =>{
        try{
            register(e, user);
            navigate("../login", {replace:true})
        } catch(err){

        }
    }

    const regBody: UserRegisterReq = {
        username: regUser.username,
        email: regUser.email,
        password: regUser.password,
        uRole: UserRole.EXTERNAL_USER
    }

    console.log(regBody)


    return(
        <div className="create-user-form">
            <h2 className="mt-2 mb-2">Register</h2>
            <p>Enter your credentials</p>
            <form method="post" onSubmit={(e) => Register(e, regBody)}>
                <div className="form-group">
                    <label htmlFor="username" className="form-label mt-3">USERNAME : </label>
                    <input name="username" className="form-control" id="username" onChange={(e)=> handleChange(e)}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label mt-3">EMAIL : </label>
                    <input name="email" className="form-control" id="email" onChange={(e)=> handleChange(e)}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label mt-3">PASSWORD : </label>
                    <input name="password" className="form-control" id="password" onChange={(e)=> handleChange(e)}></input>
                </div>

                <input type="submit" value={"register"}></input>
            </form>
        </div>
    )
}