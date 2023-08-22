import { Link } from "react-router-dom"

import { useContext, useEffect, useState } from "react"
import { AppContext } from "../Context/AppContext"
import { IConnection } from "../Interfaces/Chat/IConnection"
import { IProfile } from "../Interfaces/Chat/IProfile"

export interface ConnectionProps{
    data: string
}
export const Connection = ({data}:ConnectionProps) =>{

    const [profile, setProfile] = useState({} as IProfile);
    const [connection, setConnection] = useState({} as IConnection)
    const {getProfileDetail, getConnectionDetail} = useContext(AppContext);
    
    useEffect(()=>{
        let connection_id = " ";
        if(data){
            connection_id = data
        }

        getConnectionDetail(data)
        .then(resp => setConnection(resp));
    });

    useEffect(()=>{
        let profile_id = " ";
        if (connection){
            profile_id = connection.profileId;
        }

        getProfileDetail(profile_id)
        .then(resp => setProfile(resp));
    })
    /*useEffect(()=>{
        let connectionId = 0;
        if(data){
            connectionId = data.profile
        }
        getProfileDetail(connectionId)
        .then(resp => setProfile(resp));
        

    })*/

    return(
        <div className="connection-container">
             <div className="pic">
                <img src="" alt=""></img>
            </div>
            <div className="name">
                <Link to={`/chat/connections/detail/${profile.id}`}><h5 className="link-chat">{profile.name}</h5></Link>
                
            </div>
           
        </div>
    )
}