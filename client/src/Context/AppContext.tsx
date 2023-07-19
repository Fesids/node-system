import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { IUser, LoginResponseData } from "../Interfaces/User";
import { IDepartment } from "../Interfaces/Department";
import { SearchQuery } from "../Interfaces/Search";
import { ISTD } from "../Interfaces/SiteTypeDescription";
import { ISalesRequest, SaleRequestCreate } from "../Interfaces/SaleRequest";
import { ICreateRequest, IRequest } from "../Interfaces/Request";
import { IChat } from "../Interfaces/Chat/IChat";
import { IMessage, IMessageCreate } from "../Interfaces/Chat/IMessage";

interface AppContextProps{
    currentUser: IUser | null,
    user:IUser,
    register(e:any, user:any): void,
    login(e:any, user:any): Promise<LoginResponseData>,
    getDepartmentList(): Promise<IDepartment[]>,
    getDepartment(dept_id:string): Promise<IDepartment>,
    getUsersByDeptId(dept_id:string): Promise<IUser[]>,
    searchUser(char:SearchQuery): Promise<IUser[]>,

    getSiteTypeList(): Promise<ISTD[]>,
    getSiteTypeDetail(id:string): Promise<ISTD>;

    createSaleRequest(body:SaleRequestCreate):Promise<string>;
    getAllSaleRequestByDept(dept_id:string): Promise<ISalesRequest[]>;
    getSaleRequest(id:number): Promise<ISalesRequest>;
    deleteSalesRequest(id:number): Promise<void>,

    getAllRequestByDestinationDept(dept_id:string): Promise<IRequest[]>;
    getAllRequestBySentDept(dept_id:string): Promise<IRequest[]>;
    getRequest(id:number): Promise<IRequest>;
    createRequest(user_id:number, body:any): Promise<IRequest>;

    getChats(user_id:number):Promise<IChat[]>;
    getUserDetail(user_id:number): Promise<IUser>;
    findChat(firstId:number, secondId:number): Promise<IChat>;
    findMessagesByChatId(chatId: string): Promise<IMessage[]>;
    createMessage(body:IMessageCreate): Promise<IMessage>;

}

export const AppContext = createContext({} as AppContextProps);


export const AppContextProvider = ({children}:React.PropsWithChildren)=>{
    const [currentUser, setCurrentUser] = useState<null | IUser>(JSON.parse(localStorage.getItem("currentuser") || "{}"));
    const [user, setUser] = useState({} as IUser);
   
    const register = async (e:any, user:any)=>{
        e.preventDefault();
        try{
            const resp = await axios.post("api/auth/register", user);
        } catch(err:unknown){
            console.log(err);
        }
    }

    const login = async (e:any, user:any) =>{
        e.preventDefault()
        try{
            const resp = await axios.post("api/auth/login", user);
            setUser(resp.data.body);
            setCurrentUser(resp.data.body)
            localStorage.setItem("currentuser", JSON.stringify(resp.data.body));
        
            return resp.data
            
        } catch(err){
            console.log(err)
        }
    }

    const getDepartmentList = async () =>{
        const resp = await axios.get("api/department/all");
        return resp.data;
    }


    const getDepartment = async (dept_id:string) =>{
        try{
            const department = await axios.get("api/department/detail/"+dept_id);
            return department.data;
        }catch(err){
            throw new Error(`department with id ${dept_id} not found`);
        }
    }

    const getUsersByDeptId = async (dept_id:string) =>{
        try{
            const usersByDept = await axios.get("api/auth/users/department/"+dept_id);
            return usersByDept.data;
        }catch(err){
            throw new Error("")
        }

    }


    /*useEffect(()=>{
        localStorage.setItem("currentuser", JSON.stringify(user));
    }, [cookie]);*/

    const searchUser = async (char:SearchQuery) =>{
        const resp = await axios.post("api/auth/search/user", char);

        return resp.data;

    }

    const getSiteTypeList = async (): Promise<ISTD[]> =>{
        try{
            const STDList = await axios.get("api/std/list");
            return STDList.data
        } catch(err){
            throw new Error("somethinhg went wrong")
        }
    }

    const getSiteTypeDetail = async (id:string) =>{
        try{
            const resp = await axios.get("/api/std/detail/"+id);
            return resp.data;
        } catch(err){
            throw new Error("axios failed to retrieve site type detail");
        }

    }

    const createSaleRequest = async (body:SaleRequestCreate) =>{
        try{
            axios.post("/api/request/create/sale", body);
            return "cretaed"
        }catch(err){
            throw new Error("failed to create sale request");
        }
    }

    const getAllSaleRequestByDept = async (dept_id:string) =>{
        try{
            const res = await axios.get("/api/request/sales/department/"+dept_id);
            return res.data;
        } catch(err){
            throw new Error("failed to retrieve")
        }
    }

    const getAllRequestByDestinationDept = async (dept_id:string): Promise<IRequest[]> =>{
        try{
            const resp = await axios.get("api/request/all/department/"+dept_id);
            return resp.data;
        }catch(err){
            throw new Error("failed to retrieve");
        }
    }

    const getSaleRequest = async (id:number): Promise<ISalesRequest> =>{
        try{
            const resp = await axios.get("api/request/salesRequest/detail/"+id);
            return resp.data;
        }catch(err){
            throw new Error("Failed to retrieve sale request")
        }
    }

    const getRequest = async (id:number) =>{
        try{
            const resp = await axios.get("api/request/requests/detail/"+id);
            return resp.data;
        }catch(err){
            throw new Error("failed to retrieve request")
        }
    }

    const createRequest = async (user_id:number, body:any) =>{
        try{
            const resp = await axios.post("api/request/new/"+user_id, body);
            return resp.data;
        }catch(err){
            throw new Error("Failed to create a new request");
        }
    }

    const deleteSalesRequest = async (id:number) =>{
        try{
            await axios.delete("api/request/salesRequest/delete/"+id);
        }catch(err){
            throw new Error("failed to delete sale request")
        }
    }


    const getAllRequestBySentDept = async (dept_id:string) =>{
        try{
            const resp = await axios.get("api/request/sent/department/"+dept_id);
            return resp.data;
        }catch(err){
            throw new Error("failed to retrieve request list");
        }
    }

    const getChats = async (user_id:number) =>{
        try{
            const resp = axios.get("api/chat/user/"+user_id)
            return (await resp).data
        }catch(err){
            throw new Error("failed to retrieve chat list")
        }

    }

    const getUserDetail = async (user_id:number) =>{

        try{
            const resp = await axios.get("api/auth/detail/"+user_id);
            return resp.data;
        }catch(err){
           throw new Error("failed to retrieve user");
        }

    }

    const findChat= async (firstId:number, secondId:number): Promise<IChat>=>{
        try{
            const resp = await axios.get(`api/chat/find/${firstId}/${secondId}`);
            return resp.data;
        }catch(err){
            throw new Error("failed to retrieve chat")
        }
    }

    const findMessagesByChatId = async (chatId: string): Promise<IMessage[]> =>{
        try{
            const resp = await axios.get("api/message/all/"+chatId);
            return resp.data;
        }catch(err){
            throw new Error("failed to retrieve messages");
        }
    }

    const createMessage = async (body:IMessageCreate): Promise<IMessage> =>{
        try{
            const resp = await axios.post("api/message/new", body);
            return resp.data
        }catch(err){
            throw new Error("Failed to create msg");
        }
    }
    return(

        <AppContext.Provider value={{register, login, getDepartmentList, getDepartment, getUsersByDeptId, searchUser, getSiteTypeList, getSiteTypeDetail, createSaleRequest, getAllSaleRequestByDept, getAllRequestByDestinationDept, getSaleRequest, getRequest, createRequest, deleteSalesRequest, getAllRequestBySentDept, user, currentUser, getChats, getUserDetail, findChat, findMessagesByChatId, createMessage}}>
            {children}
        </AppContext.Provider>
    )
}