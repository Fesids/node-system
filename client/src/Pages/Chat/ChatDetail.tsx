import {useContext, useEffect, useState} from "react"
import { AppContext } from "../../Context/AppContext"
import { IChat } from "../../Interfaces/Chat/IChat";
import { ChatBox } from "../../Components/Chat/ChatBox";
import { IUser } from "../../Interfaces/User";
import { useParams } from "react-router";
import { IMessage, IMessageCreate } from "../../Interfaces/Chat/IMessage";
import { MessageContainer } from "../../Components/Chat/MessageContainer";
export const ChatDetailPage = () =>{

    const {currentUser, getChats, getUserDetail, findChat, findMessagesByChatId, createMessage, currentConnectionUser, currentProfileUser} = useContext(AppContext);
    //const [chats, setChats] = useState<IChat[]>([] as IChat[]);
    const [userDetail, setUserDetail] = useState({} as IUser);
    const [chatMessages, setChatMessages] = useState([] as Array<IMessage>);
    const [chat, setChat] = useState({} as IChat);

    const [newMsgBody, setNewMsgBody] = useState({} as IMessageCreate);

    const {userId} = useParams();

    let user_id = 0;
    if(currentUser?.id){
        user_id = currentUser.id
    }

    const handleOnChange = (e:any) =>{
        setNewMsgBody({...newMsgBody, [e.target.name]: e.target.value})
    }

    const handleSendMessage = (e:any) =>{
        e.preventDefault();
        const new_msg:IMessageCreate = {
            chatId: chat?.id,
            senderId: user_id,
            text: newMsgBody.text
        }
        createMessage(new_msg);
    }

    

    // SET CHAT SUBJECT USER DATA
    useEffect(()=>{
        let param_user_id = 0
        if(userId){
            param_user_id = parseInt(userId)
        }
        getUserDetail(param_user_id).then(resp => setUserDetail(resp));
    }, [userId]);

    console.log(userDetail)

    // SET CHAT DATA
    useEffect(()=>{
        let first_user_id = 0
        let second_user_id = 0
        if(userId && currentUser){
            first_user_id = parseInt(userId);
            second_user_id = currentUser.id
        
        }

        findChat(first_user_id, second_user_id).then(resp => setChat(resp))
    }, [userId]);


    // SET CHAT MESSAGES
    useEffect(()=>{
        const chat_id = chat.id;

        findMessagesByChatId(chat_id).then(resp => setChatMessages(resp));
    })

    /*useEffect(()=>{
        let user_id = 0;
        if(currentUser?.id){
            user_id = currentUser.id
        }
        getChats(user_id).then(resp => setChats(resp))
    });*/
    console.log(newMsgBody)

   

    return(
        <div className="chat-container2">
             <div className="identity">
                <div>
                
                    <a href="{% url 'index' %}">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        fill="currentColor"
                        className="bi bi-house"
                        viewBox="0 0 16 16"
                    >
                        <path
                        fill-rule="evenodd"
                        d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                        />
                        <path
                        fill-rule="evenodd"
                        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                        />
                        </svg>
                    </a>
                </div>

                <h3>{userDetail.username}</h3>


                <div className="pro-pic">
                    <img src="{{friend.profile.pic.url}}" alt="profile-picture"/>
                </div>


            </div>


            <div className="chat-messages-container">
                {/*{chatMessages.map((msg)=>(
                    <div className="chat-message-container">
                        <p>{msg.text}</p>
                    </div>
                ))}*/}
                {chatMessages.length?
                        <p>
                            {
                                chatMessages.map((msg)=>(
                                    <div className="chat-message-container">
                                        <MessageContainer msg={msg} senderId={user_id}/>
                                    </div>
                                ))
                            }
                        </p>
                        :
                        <p>No Message yet</p>
                
            
            
                }
            </div>

            <div className="chat-message-send-container">
                <form method="post" className="my-form" onSubmit={(e:any)=> handleSendMessage(e)}>
            
                    <textarea className="forms" rows={3} placeholder="Type a message" name="text" onChange={(e)=>handleOnChange(e)}>

                    </textarea>

                    <input type="submit" value="send" className="btn-input" name="send"/>
                </form>
            </div>

        </div>
    )
}