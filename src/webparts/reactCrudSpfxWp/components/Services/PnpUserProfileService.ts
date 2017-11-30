
import { IUserProfile } from '../Models/IUserProfile';

import {Constants} from '../Models/Constants';

import $pnp from 'sp-pnp-js';
import { IKeyValueProps } from '../Models/IKeyValueProps';

export interface IUserProfileProps{
    values : IKeyValueProps[];
}
export class PnpUserProfileService{
    private _userProfile : IKeyValueProps[] = [];
    private searchedProps : Array<string> =  ["AccountName","SID","FirstName","LastName","PictureURL","UserName"]

    public getCurrentUserProfileProperties() : Promise<IKeyValueProps[] >{
        return $pnp.sp.profiles.myProperties.get().then( (result) => {
            var keys = result.UserProfileProperties.keys();
            result.UserProfileProperties.forEach(element => {
                var key = element.Key;                
                //if(this.searchedProps.filter(key)){
                if(this.searchedProps.indexOf(key) > -1){
                    console.log("See-- - "+key + "-"+ element.Value);
                    console.log(element);
                    this._userProfile.push(element);
                }     
          
            });
            //return  result.UserProfileProperties;
            return  this._userProfile;
               
        },
    (error : Error) =>{
        console.log(error);
    })
    }

    public getAnyUserProfileProperties(account:string) : Promise<IKeyValueProps[] >{
        return $pnp.sp.profiles.getPropertiesFor(account).then((result ) => {
           result.forEach((elemenet) =>{
                this._userProfile.push(elemenet.Key,elemenet.Value);
            })
            return this._userProfile;
        },
    (error : Error) =>{
        console.log(error);
    })
    }
}