import { ISTD } from "../models/SiteTypeDescription";


export interface SiteTypeDescRequest extends Omit<ISTD, "id" | "siteType">{



}

export interface ISTDRepository{
    save(params: SiteTypeDescRequest, type:string): Promise<ISTD>;

    getSTList(): Promise<ISTD[]>;

    STDetail(id:string): Promise<ISTD>;
}