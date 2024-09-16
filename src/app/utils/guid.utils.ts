import { v4 as uuidv4 } from 'uuid';

export class GuidUtils{
    public static newGuid(){
        return uuidv4();
    }
}