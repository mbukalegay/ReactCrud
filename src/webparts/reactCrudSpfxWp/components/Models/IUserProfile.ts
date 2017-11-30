export interface IUserProfile{
    Account : string;
    FirstName : string;
    LastName : string;
    SID : string;
    PictureURL : string;
    UserName : string;
}

export class UserProfile implements IUserProfile {
    Account : string;
    FirstName : string;
    LastName : string;
    SID : string;
    PictureURL : string;
    UserName : string;


    constructor(account:string,fname:string,lname:string,sid:string,pic:string,uname: string){
        this.Account = account;
        this.FirstName = fname;
        this.LastName = lname;
        this.SID = sid;
        this.PictureURL = pic;
        this.UserName = uname;
    }
}