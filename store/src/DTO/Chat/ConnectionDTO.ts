import { IConnection } from "../../models/Connection"

export interface ConnectionDTO{
    profileId: string
}

export interface IConnectionRepository{
    save(body:ConnectionDTO): Promise<IConnection>;

    retrieveConnectionById(connectionId:string): Promise<IConnection>;
    retrieveConnectionByProfileId(profileId:string): Promise<IConnection>;
}