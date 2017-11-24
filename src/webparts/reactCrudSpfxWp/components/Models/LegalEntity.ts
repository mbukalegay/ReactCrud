export interface ILegalEntity{
    Id : number;
    Title? : string;
    Description : string;
} 

export class LegalEntity implements ILegalEntity{
   constructor(id:number, title:string, description:string){
       this.Id = id;
       this.Title = title;
       this.Description = description;
   }

   public Id:number;
   public Title:string;
   public Description: string;
}