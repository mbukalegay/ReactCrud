import { IUserProfile } from '../Models/IUserProfile';

import {Constants} from '../Models/Constants';

import { IKeyValueProps } from '../Models/IKeyValueProps';

export interface IUserProfileProps{
    values : IKeyValueProps[];
}
export class MockUserProfileService{
    private _userProfile : IKeyValueProps[] ;

    public getCurrentUserProfileProperties() : Promise<IKeyValueProps[] >{
        this._userProfile = [ { Key: "Account", Value:  "my Account" },{ Key: "FirstNamme", Value:  "my F Name" },{ Key: "LastName", Value:  "my L Name" },{ Key: "SID", Value:  "my SID" },{ Key: "PictureURL", Value:  "my URL" }];
        return new Promise<IKeyValueProps[]>(resolve => {
            resolve(this._userProfile);
        });
    }

    public getAnyUserProfileProperties(account:string) : Promise<IKeyValueProps[] >{
        this._userProfile = [ { Key: "Account", Value:  "y Account" },{ Key: "FirstNamme", Value:  "y F Name" },{ Key: "LastName", Value:  "y L Name" },{ Key: "SID", Value:  "y SID" },{ Key: "PictureURL", Value:  "y URL" }];
        
        return new Promise<IKeyValueProps[]>(resolve => {
            resolve(this._userProfile);
        });
    }
}