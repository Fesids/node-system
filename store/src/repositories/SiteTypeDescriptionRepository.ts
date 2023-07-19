import { ISTDRepository, SiteTypeDescRequest } from "../DTO/SiteTypeRequest";
import { SiteTypeDescription } from "../databases/SiteTypeMongoDB";
import { ISTD, ISTDResponse } from "../models/SiteTypeDescription";

export class SiteTypeDescriptionRepository implements ISTDRepository{

    async STDetail(id: string): Promise<ISTD> {
        const siteTypeExist = await SiteTypeDescription.findById(id);

        if (!siteTypeExist){
            throw new Error("Site Type doesn't exist");
        };

        const {_id, description, body, siteType} = siteTypeExist;

        return {
            id: _id,
            description: description,
            body: body,
            siteType: siteType
        }
    }

    async getSTList(): Promise<ISTD[]> {
        const typeList = await SiteTypeDescription.find<ISTDResponse>({});
        

        return typeList.map(({_id, siteType, body, description})=>({
            id: _id,
            siteType,
            body,
            description
        }));
    }

    
    async save(params: SiteTypeDescRequest, type: string): 
    Promise<ISTD> {
        const siteTypeExist = await SiteTypeDescription.findOne({siteType:type});

        if(siteTypeExist){
            throw new Error("type already exist");
        }

        const typeBody = {
            body: params.body,
            description: params.description,
            siteType: type
        }

        const {_id} = await SiteTypeDescription.create(typeBody);

        const new_type = await SiteTypeDescription.findById(_id);

        if(!new_type){
            throw new Error("failed to create site type");
        }

        return {
            id:new_type.id,
            body: new_type.body,
            description: new_type.description,
            siteType: new_type.siteType
        }
    }

}