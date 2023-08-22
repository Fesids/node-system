import { IProfile } from "../../models/Profile"

export interface IProfileCreate{
    user_id:number,
    name: string,
    pic: string,
    friends:Array<any>
}

export interface AddConnection{
    profileId:string, 
    connectionId:string
}

export interface IProfileRepository{
    save(body:IProfileCreate): Promise<IProfile>,

    getProfileByUserId(userId:number): Promise<IProfile>,

    getProfileById(profileId:number): Promise<IProfile>,

    getAllProfiles(): Promise<IProfile[]>,

    addConnection(params: AddConnection): Promise<IProfile>,
}