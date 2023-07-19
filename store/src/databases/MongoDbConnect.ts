import {config} from "dotenv";
import moongose from 'mongoose';

export const MongoDBConnect = (mongourl:string, dbName:string)=>{

    moongose.connect(mongourl+dbName);
    moongose.set('strictQuery', false);
    
    

}