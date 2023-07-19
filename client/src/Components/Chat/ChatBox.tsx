import { useContext, useEffect, useState } from "react";
import { IChat } from "../../Interfaces/Chat/IChat"
import { IUser } from "../../Interfaces/User";
import { AppContext } from "../../Context/AppContext";

interface ChatBoxProps {
    chat:IChat,
    currentUserId: number
}

export const ChatBox = ({chat,  currentUserId}: ChatBoxProps) =>{
    const [userData, setUserData] = useState({} as IUser);
    const {getUserDetail} = useContext(AppContext);


    useEffect(()=>{
        const userId = chat.members.find((id)=>id!==currentUserId)
        const getUserData = async ()=>{
            const data = getUserDetail(userId)
            .then(resp => setUserData(resp))
            
        }

        getUserData()
    });

    //console.log(userData)

    return(
        <div>
            <h2>Chat box</h2>
        </div>
    )
}