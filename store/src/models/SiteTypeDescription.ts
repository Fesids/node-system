import { EsiteType } from "../ENUM/EsiteType";
export interface ISiteTypeDescription{
    id: string,
    body: string,
    description: string,
    siteType: EsiteType
}

export interface ISTD{
    id: String,
    body: String,
    description: String,
    siteType: EsiteType

}

export interface ISTDResponse{
    _id: String,
    body: String,
    description: String,
    siteType: EsiteType

}