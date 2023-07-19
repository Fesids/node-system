import { IMessage } from "../../Interfaces/Chat/IMessage"

interface MessageContainerProps{
    msg: IMessage,
    senderId : number

}
export const MessageContainer = ({msg, senderId}:MessageContainerProps) =>{
    const msg_id = msg.senderId
    const comp = msg_id == senderId
    return(
        <div>
            {comp?<div className="chat-box-sent">{msg.text}</div>: <div className="chat-box-received">{msg.text}</div>}
        </div>
    )
}