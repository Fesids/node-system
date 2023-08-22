import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import { AppContext } from "../Context/AppContext";
import { IRequest } from "../Interfaces/Request";
import { IUser } from "../Interfaces/User";
import { IProfile } from "../Interfaces/Chat/IProfile";

export const RequestDetailPage = () =>{
    const {id} = useParams();
    const {getRequest, getUserDetail, createChat, currentUser, getProfileDetail, currentProfileUser, getProfileByUserId} = useContext(AppContext);
    const [request, setRequest] = useState({} as IRequest);

    const [sentUser, setSentUser] = useState({} as IUser);
    const [showMore, setShowMore] = useState(false);
    const [profile, setProfile] = useState({} as IProfile);


    useEffect(()=>{
        let cc = 0;
        if(currentUser){
            cc = currentUser.id
        }
        getProfileByUserId(request.user_sender_id)
        .then(resp => setProfile(resp));

    })


    const handleCreateChat = () =>{
        const b = {
            senderId: currentProfileUser.id,
            receiverId: profile.id
        }

        createChat(b);
    }

    useEffect(()=>{
        let req_id = 0;
        if(id){
            req_id = parseInt(id);
        };

        getRequest(req_id).then(resp => setRequest(resp));
    }, []);


    useEffect(()=>{
        getUserDetail(request?.user_sender_id)
        .then(resp => setSentUser(resp));
        
        
    })

    /*console.log(request.user_sender_id);
    console.log(sentUser);*/

    console.log(profile);
    console.log(currentProfileUser);

    let body = ""
    if(request.request_body){
        body = request.request_body;
    }


    return(
        <div className="request-detail-container">
            <div className="request-detail">
                
                
                <p>subject {request.subject}</p>

                <div className="request-body">
                    {showMore?body: body.substring(0, 100)} <p onClick={()=> setShowMore(!showMore)}>{!showMore?"show more":"show less"}</p>

                </div>
            
                <p>created at {request.created_at}</p>
                <p>sent by {sentUser.username}</p>

                
                <div className="buttons-container">
                    
                    <button onClick={handleCreateChat} className="connection-btn">+ Send message to {sentUser.username} </button>
                    <button className="btn btn-outline-danger">reject</button>
                
                </div>
            </div>
        </div>
        
    )
}