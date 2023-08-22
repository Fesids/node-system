import _ from "lodash";
import { ConnectionDTO, IConnectionRepository } from "../../DTO/Chat/ConnectionDTO";
import { Connection } from "../../databases/ChatDBModels/ConnectionModel";
import { IConnection, IConnectionResponse } from "../../models/Connection";
import { IChatResponse } from "../../models/Chat";

export class ConnectionRepository implements IConnectionRepository{
    async retrieveConnectionById(connectionId: string): 
    Promise<IConnection> {
        
        if(!connectionId){
            throw new Error("No connection id provided");
        }

        const connection =  await Connection.findById(connectionId);

        if(!connection){
            throw new Error("No connection found");
        }

        return{
            id: connection._id,
            profileId: connection.profileId
        }

       
    }


    async save(body: ConnectionDTO): Promise<IConnection> {
        const {profileId} = body;

        if(!profileId){
            throw new Error("Profile id is required");
        }

        const {_id} = await Connection.create({profileId: profileId});

        const connection = await Connection.findById(_id);

        if(!connection){
            throw new Error("Failed to create connection");

        }

        return{
            id:connection._id,
            profileId: connection.profileId
        }



    }

    async retrieveConnectionByProfileId(profileId: string): Promise<IConnection> {
        
        if(!profileId){
            throw new Error("No profile id. please, provide a profile id");
        }

        const connection = await Connection.findOne<IConnectionResponse>({
            profileId: profileId
        });

        if(!connection){
            throw new Error("Connection not found");
        }

        return{
            id: connection._id,
            profileId: connection.profileId
        }

    }
    
}