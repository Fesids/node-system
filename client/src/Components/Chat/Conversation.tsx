import { useContext, useEffect, useState } from "react"
import { IChat } from "../../Interfaces/Chat/IChat"
import { AppContext } from "../../Context/AppContext"
import { IUser } from "../../Interfaces/User"
import { Link } from "react-router-dom"
import { IProfile } from "../../Interfaces/Chat/IProfile"

interface IConversationProps{
    data: IChat
    currentUserId: string
}

export const Conversation = ({data, currentUserId}: IConversationProps)=>{

    const [userData, setUserData] = useState({} as IProfile);
    const {getUserDetail, findChat, getProfileDetail} = useContext(AppContext)

    // USER DETAIL EFFECT
    useEffect(()=>{
        const userId = data.members.find((id)=>id!==currentUserId)
        const getUserData = async ()=>{
            const data = getProfileDetail(userId)
            .then(resp => setUserData(resp))
            
        }

        getUserData()
    })

    return(
            <Link to={`/chat/conversation/${userData.id}`} style={{color: "black", textDecoration: "none"}}>

                <div className="friends">
                    <div className="pic">
                        <img src="" alt=""></img>
                    </div>
                    <div className="name">
                        <h5>{userData.name}</h5>
                        
                        <p>How are you doing today</p>
                    </div>
                    <div className="time_new_msg">
                        <div className="msg">0</div>
                    </div>
                </div>

            </Link>

    )

}