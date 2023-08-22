import { useContext } from "react"
import { AppContext } from "../../Context/AppContext"
import { IConnection } from "../../Interfaces/Chat/IConnection";
import { Connection } from "../../Components/Connection";



export const AllConnectionPage = () =>{

    const {currentProfileUser} = useContext(AppContext);
    
    let connectionsList = [] as Array<string>;

    if(currentProfileUser){
        connectionsList = currentProfileUser.friends
    }

    return(
        <div className="your-connections">
            <div className="your-connections-header">
                <h2>Your Connections</h2>
            </div>
            <div className="connectionslist-container">
             {connectionsList?.map(fr => <Connection data={fr}/>)}
            </div>
        </div>
        
    )
}