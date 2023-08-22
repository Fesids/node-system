import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import { AppContext } from "../../Context/AppContext";
import { IProfile } from "../../Interfaces/Chat/IProfile";


export const ProfileDetailPage = () =>{

    const {profileId} = useParams();
    const {getProfileDetail, createChat, currentProfileUser} = useContext(AppContext);
    const [profile, setProfile] = useState({} as IProfile);

    useEffect(()=>{
        let profId = " ";
        if(profileId){
            profId = profileId;
        }
        getProfileDetail(profId).then(resp => setProfile(resp));
    },[profileId])

    /*useEffect(()=>{
        let profId = 0;
        if(profileId){
            profId = parseInt(profileId);
        }
        getProfileDetail(profId).then(resp => setProfile(resp));

    });*/

    const handleCreateChat = (e:any) =>{
        e.preventDefault();
        let currentUserProfileId = " ";
        if(currentProfileUser){
            currentUserProfileId = currentProfileUser.id; 
        }
        const body = {
            senderId: currentUserProfileId,
            receiverId: profile.id
        }
        createChat(body);
    }


    //console.log(currentProfileUser);
    console.log(profile)

    return(
        <div className="profile-detail-container">
            <div className="profile-detail">
               <div className="head">
                    <div className="pic"></div>
                    <div className="name">{profile.name}</div>
               </div>
               <div className="buttons-container">
                    <button onClick={(e)=> handleCreateChat(e)} className="connection-btn">+ Send message to {profile.name} </button>
                    <button className="btn btn-outline-danger">break connection</button>
               </div>

            </div>
        </div>
    )
}