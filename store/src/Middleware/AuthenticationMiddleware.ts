import jwt, {Secret, JwtPayload, JwtPayloadUser} from 'jsonwebtoken';
import {Request, Response, NextFunction} from "express";

declare module "jsonwebtoken"{
    export interface JwtPayloadUser extends JwtPayload{
        role: string
    }
}

export interface CustomRequest extends Request{
    token: JwtPayloadUser | string
}


export const Auth = (req:Request, res:Response, next:NextFunction) =>{
    let token = req.header("Authorization");

    if(!token || token== null) return res.status(401).send("Acess Denied");

    try{
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = <jwt.JwtPayloadUser>jwt.verify(token, "jwtkey");

        (req as CustomRequest).token = verified.role;

        
        next()


    } catch(err){
        res.send(err)
    }

}


export const isExternalUser = (req:Request, res:Response, next:NextFunction) =>{


    const customReq = (req as CustomRequest);

    const uRole = customReq.token;
    if(uRole != "EXTERNAL_USER"){

        res.status(401).json("No permissions");
    }
    res.json(uRole)
    next()




}



export const isEmployee = (req:Request, res:Response, next:NextFunction)=>{

    const customReq = (req as CustomRequest);

    const role = customReq.token;

    if(role != "EMPLOYEE"){
        res.status(401).json("non employee user blocked");
    }
    next()


}


export const isAdmin = (req:Request, res:Response, next:NextFunction)=>{

    const customReq = (req as CustomRequest);

    const role = customReq.token;

    if(role != "ADMIN"){
        res.status(401).json("non admin user blocked");
    }
    next()


}








