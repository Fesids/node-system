import { useContext, useEffect, useState } from "react"
import { IChat } from "../../Interfaces/Chat/IChat"
import { AppContext } from "../../Context/AppContext"
import { IUser } from "../../Interfaces/User"
import { Link } from "react-router-dom"

interface IConversationProps{
    data: IChat
    currentUserId: number
}

export const Conversation = ({data, currentUserId}: IConversationProps)=>{

    const [userData, setUserData] = useState({} as IUser);
    const {getUserDetail, findChat} = useContext(AppContext)

    // USER DETAIL EFFECT
    useEffect(()=>{
        const userId = data.members.find((id)=>id!==currentUserId)
        const getUserData = async ()=>{
            const data = getUserDetail(userId)
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
                        <h5>{userData.username}</h5>
                        <p>{userData.email}</p>
                        <p>How are you doing today</p>
                    </div>
                    <div className="time_new_msg">
                        <p>3</p>
                        <div className="msg">0</div>
                    </div>
                </div>

            </Link>

    )

}