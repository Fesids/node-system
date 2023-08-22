import { useContext, useEffect, useState } from "react"
import { IProfile } from "../../Interfaces/Chat/IProfile"
import { AppContext } from "../../Context/AppContext"
import { IConnection } from "../../Interfaces/Chat/IConnection"

interface ProfileProps{
    data:IProfile,
    userProfileId: string
}
export const ProfileComp = ({data, userProfileId}: ProfileProps) =>{

    const [connection, setConnection] = useState({} as IConnection);
    const {getConnectionByProfileId, addFriend} = useContext(AppContext);

    useEffect(()=>{
        getConnectionByProfileId(data.id)
        .then(resp => setConnection(resp));
    }, [data]);



    const handleAddFriend = (e:any) =>{
        e.preventDefault();
        addFriend(userProfileId, connection.id);
    }
   

    return(
        <>
            {data?
            <tr >
                <td>{data.id}</td>
                <td>{data.name} - <p className="btn btn-dark" onClick={(e)=> handleAddFriend(e)}>+ add</p></td>
            </tr>
            
    
            :
            
            <tr>
                <td>not found</td>
                <td>not found</td>
            </tr>
            }
        </>
    )

}