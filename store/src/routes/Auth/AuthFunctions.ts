import {Request, Response, NextFunction} from 'express';
import { UserRepository } from '../../repositories/UserRepository';
import { RegisterController } from '../../controllers/AuthControllers/Register';
import { LoginController } from '../../controllers/AuthControllers/Login';
import { DeleteUserController } from '../../controllers/AuthControllers/DeleteUser';
import { UpdateUserController } from '../../controllers/AuthControllers/UpdateUser';
import { GetUsersByDeptIdController } from '../../controllers/AuthControllers/GetUsersByDeptId';
import { useRef } from 'react';
import { SearchUserController } from '../../controllers/AuthControllers/SearchUsersController';
import { GetUserDetailController } from '../../controllers/AuthControllers/GetUserById';
import { GetUsersController } from '../../controllers/AuthControllers/GetUsers';


export const teste = (req:Request, res:Response)=>{

    return res.json("pegou");
}

export const Register = async ( req:Request, res:Response, next:NextFunction)=>{


    /*const uRep = new UserRepository();
    try{
        const {username, email,password} = req.body;
        const b = {
            "username":username,
            "email":email,
            "password":password
        }
        const u = uRep.createUser(b);
        res.status(200).json("user created");
    } catch(Error){
        res.status(400).json("errroooou")
    }*/
    const userRepository = new UserRepository();

    const registerUserController = new RegisterController(
        userRepository
    );
    
    const {body, statusCode} = await registerUserController.handle({
        body: req.body
    });

    res.status(statusCode).json(body);

}

export const login = async (req:Request, res:Response, next:NextFunction) =>{
    const loginReposiory = new UserRepository();

    const loginController = new LoginController(
        loginReposiory
    );


    const {body, statusCode, token} = await loginController.handle({

        body: req.body
    })


    res.cookie("auth_cookie", token, {
        httpOnly: true
    });

    res.status(statusCode).json({body, token: token});
    
}

export const logout = (req:Request, res:Response) =>{
    /*res.cookie("auth_cookie", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has logout");*/

    res.clearCookie("auth_cookie", {
        sameSite:true,
        secure: true
    }).status(200).json("User has logout");

}


export const deleteUser = async (req:Request, res:Response, next:NextFunction) =>{

    const userRepository = new UserRepository();

    const userController = new DeleteUserController(userRepository);

    const {body, statusCode} = await userController.handle({
        params: req.params
    });

    return res.status(statusCode).json(body);

}

export const updateUser = async (req:Request, res:Response) =>{
    const userRepository = new UserRepository();

    const userController = new UpdateUserController(
        userRepository
    );

    const {body, statusCode} = await userController.handle({
        params: req.params,
        body: req.body
    });

    res.status(statusCode).json(body);

}

export const GetAllDepartmentsById = async (req:Request, res:Response)=>{

    /*const userRepository = new UserRepository();

    const userController = new GetUsersByDeptIdController(userRepository);

    const {statusCode, body} = await userController.handle({
        params: req.params
    })

    res.status(statusCode).json(body)*/

}

export const GetUsersByDeptId = async (req:Request, res:Response) =>{

    const userRepository = new UserRepository();

    const userController = new GetUsersByDeptIdController(
        userRepository
    );

    const {statusCode, body} = await userController.handle({
        params: req.params
    });

    res.status(statusCode).json(body);

}

export const SearchUserFunction = async (req:Request, res:Response) =>{

    const userRepository = new UserRepository();

    const userController = new SearchUserController(
        userRepository
    );

    const {body, statusCode} = await userController.handle({
        body: req.body,
        params: req.params
    
    });

    res.status(statusCode).json(body);

}

export const getUserDetail = async (req:Request, res:Response) =>{
    const userRepository = new UserRepository();

    const userController = new GetUserDetailController(
        userRepository
    );

    const {statusCode, body} = await userController.handle({
        params: req.params
    });

    res.status(statusCode).json(body);
}

export const GetUsersList = async (req:Request, res:Response) =>{
    const userRepository = new UserRepository();

    const userController = new GetUsersController(
        userRepository
    );

    const {body, statusCode} = await userController.handle({
        params: req.params
    });

    res.status(statusCode).json(body);


}