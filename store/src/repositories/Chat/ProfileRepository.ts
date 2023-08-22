import _ from "lodash";
import { AddConnection, IProfileCreate, IProfileRepository } from "../../DTO/Chat/ProfileDTO";
import { Profile } from "../../databases/ChatDBModels/ProfileModel";
import { IProfile, IProfileResponse } from "../../models/Profile";

export class ProfileRepository implements IProfileRepository{

    async getProfileById(profileId: number): Promise<IProfile> {

        if(!profileId){
            throw new Error("No profile id provided");
        }

        const profile = await Profile.findById(profileId);

        if(!profile){
            throw new Error("No profile found")
        }

        return {
            id: profile._id,
            pic: profile.pic,
            name: profile.name,
            user_id: profile.user_id,
            friends: profile.friends
        }

        
    }

    async addConnection(params:AddConnection): 
    Promise<IProfile> {
        const {profileId, connectionId} = params;

        if(!profileId){
            throw new Error("No profile id provided");
        }

        if(!connectionId){
            throw new Error("No connection id provided");
        }

        const profile = await Profile.findById(profileId);

        if(!profile){
            throw new Error("Somenthing went wrong trying add connection")
        }
        
        const list = [...profile?.friends, connectionId];

        

        await Profile.findByIdAndUpdate(profileId,{friends: list})

      
        return {
            id: profile?._id,
            pic: profile?.pic,
            name: profile?.name,
            user_id: profile?.user_id,
            friends: profile?.friends
        }
        


    }
    async getAllProfiles(): Promise<IProfile[]> {
        
        const profiles = await Profile.find<IProfileResponse>({});

        if (!profiles){
            throw new Error("Failed to retrieve profile list");

        }

        return profiles.map(({_id, user_id, name,friends, pic })=>({
            id:_id,
            user_id: user_id,
            pic: pic,
            name: name, 
            friends: friends

        }))
       



    }

    async getProfileByUserId(userId: number): Promise<IProfile> {
        
        if(!userId){
            throw new Error("user id is missing");
        }

        const profile = await Profile.findOne<IProfileResponse>({
            user_id:userId
        });

        if(!profile){
            throw new Error("Profile not found");
        }
        return{
            id:profile?._id,
            pic: profile?.pic,
            name: profile?.name,
            user_id: profile?.user_id,
            friends: profile?.friends
        }
    }



    async save(body: IProfileCreate): Promise<IProfile> {
        
        if(!body){
            throw new Error("No body provided");
        }

        const {_id} = await Profile.create(body);

        const new_profile = await Profile.findById(_id);

        if(!new_profile){
            throw new Error("Failed to create profile");
        }

        return {
            id: new_profile._id,
            user_id: new_profile.user_id,
            name: new_profile.name,
            pic: new_profile.pic,
            friends: new_profile.friends
        }
    }
    
}