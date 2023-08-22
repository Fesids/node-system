export interface IProfile{
    id: string,
    user_id:number,
    name: string,
    pic: string,
    friends:Array<any>
}

export interface IProfileResponse{
    _id: string,
    user_id:number,
    name: string,
    pic: string,
    friends:Array<any>
}

