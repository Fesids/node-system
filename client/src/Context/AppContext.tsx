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
import { IProfile } from "../Interfaces/Chat/IProfile";
import { IConnection } from "../Interfaces/Chat/IConnection";

interface AppContextProps{
    currentUser: IUser | null,
    user:IUser,
    currentProfileUser: IProfile,
    currentConnectionUser: IConnection,
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

    getChats(user_id:string):Promise<IChat[]>;
    getUserDetail(user_id:number): Promise<IUser>;


    findChat(firstId:number, secondId:number): Promise<IChat>;
    createChat(chatBody:any): Promise<IChat>;

    findMessagesByChatId(chatId: string): Promise<IMessage[]>;
    createMessage(body:IMessageCreate): Promise<IMessage>;

    getUsers(offset:number):Promise<IUser[]>;

    getProfileByUserId(userId:number):Promise<IProfile>;
    getProfileDetail(profileId:string): Promise<IProfile>;

    getConnectionByProfileId(profileId: string): Promise<IConnection>;
    getConnectionDetail(connectionId:string): Promise<IConnection>;
    getAllProfiles(): Promise<IProfile[]>;

    addFriend(profileId:string, connectionId:string): Promise<IProfile>


}

export const AppContext = createContext({} as AppContextProps);


export const AppContextProvider = ({children}:React.PropsWithChildren)=>{
    const [currentUser, setCurrentUser] = useState<null | IUser>(JSON.parse(localStorage.getItem("currentuser") || "{}"));
    const [currentProfileUser, setCurrentUserProfile] = useState({} as IProfile);
    const [currentConnectionUser, setCurrentConnectionUser] = useState({} as IConnection);
    const [user, setUser] = useState({} as IUser);

    useEffect(()=>{
        if(currentProfileUser){
            axios.get("api/connection/detail/profile/"+currentProfileUser.id)
            .then(resp => setCurrentConnectionUser(resp.data));
        }
    })


    // SET CURRENT USER PROFILE
    useEffect(()=>{
        
        if(currentUser?.id)
        getProfileByUserId(currentUser?.id)
       .then(resp => setCurrentUserProfile(resp))

    })
   
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

    const getChats = async (user_id:string) =>{
        try{
            const resp = axios.get("api/chat/user/"+user_id)
            return (await resp).data
        }catch(err){
            throw new Error("failed to retrieve chat list")
        }

    }

    const createChat = async (chatBody:any) =>{
        try{
            const resp = await axios.post("api/chat/new", chatBody);
            return resp.data;
        }catch(err){
            throw new Error("Failed to create chat")
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

    const getUsers = async (offset:number) =>{
        try{
            const resp = await axios.get("api/auth/all/1/"+offset);
            return resp.data;
        }catch(err){
            throw new Error("Failed to retrieve users")
        }
    }


    const getProfileByUserId = async (userId:number) =>{
        try{
            const resp = await axios.get("api/profile/user/"+userId);
            return resp.data;
        }catch(err){
            throw new Error("Failed to retrieve profile");
        }
    }

    const getProfileDetail = async (profileId:string) =>{
        try{
            const resp = await axios.get("api/profile/detail/"+profileId);
            return resp.data;
        }catch(err){
            throw new Error("Failed to retrive profile id");
        }
    }

    const getConnectionByProfileId = async (profileId: string) =>{
        try{
            const resp = await axios.get("api/connection/detail/profile/"+profileId);
            return resp.data;
        }catch(err){
            throw new Error("failed to retrieve connection")
        }
    }

    const getAllProfiles = async () =>{
        try{
            const resp = await axios.get("api/profile/all");
            return resp.data;
        }catch(err){
            throw new Error("Failed to retrieved all profiles")
        }
    }

    const addFriend = async (profileId:string, connectionId:string)=>{
        try{
            const resp = await axios.post(`api/profile/${profileId}/connection/${connectionId}`);
            return resp.data;
        }catch(err){
            throw new Error("Failed to add friend");
        }
    }

    const getConnectionDetail = async (connectionId:string) =>{
        try{
            const resp = await axios.get("api/connection/detail/"+connectionId);
            return resp.data;
        }catch(err){
            throw new Error("Failed to retrieve connection")
        }
    }


    return(

        <AppContext.Provider value={{register, login, getDepartmentList, getDepartment, getUsersByDeptId, searchUser, getSiteTypeList, getSiteTypeDetail, createSaleRequest, getAllSaleRequestByDept, getAllRequestByDestinationDept, getSaleRequest, getRequest, createRequest, deleteSalesRequest, getAllRequestBySentDept, user, currentUser, getChats, getUserDetail, findChat, findMessagesByChatId, createMessage, createChat, getUsers, getProfileByUserId, currentProfileUser, currentConnectionUser,
            getConnectionByProfileId, getAllProfiles, addFriend, getProfileDetail, getConnectionDetail}}>
            {children}
        </AppContext.Provider>
    )
}