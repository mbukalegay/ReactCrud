import {LegalEntity} from '../Models/LegalEntity';
import { ILegalEntityService } from '../Services/ILegalEntityService';

export class MockLegalEntityService implements ILegalEntityService{
    private legalEntities : LegalEntity[];
    constructor(){
        this.legalEntities = new Array();
        this.legalEntities.push( new LegalEntity(1,"Test1","Desription 1"));
        this.legalEntities.push( new LegalEntity(2,"Test2","Desription 2"));
        this.legalEntities.push( new LegalEntity(3,"Test 3","Desription 3"));

        this.getEntities = this.getEntities.bind(this);
        this.updateEntity = this.updateEntity.bind(this);
        this.addEntity = this.deleteEntity.bind(this);
        this.deleteEntity = this.deleteEntity.bind(this);
    }

    public getEntities(): Promise<LegalEntity[]>{
        return new Promise<LegalEntity[]>(resolve => {
            resolve(this.legalEntities);
        });
    }

    public updateEntity(entity:LegalEntity): Promise<LegalEntity[]>{
        this.legalEntities.forEach(l => {
            if (l.Id === entity.Id) {
                l.Title = entity.Title;
                l.Description = entity.Description;
            }
        });
        return new Promise<LegalEntity[]>(resolve => {
            resolve(this.legalEntities);
        });
    }

    public deleteEntity(entity:LegalEntity): Promise<LegalEntity[]>{
        this.legalEntities = this.legalEntities.filter(l => {
            return l.Id !== entity.Id;
        });
        return new Promise<LegalEntity[]>(resolve => {
            resolve(this.legalEntities);
        });
    }


    public addEntity(entity:LegalEntity): Promise<LegalEntity[]>{
        this.legalEntities.push(new LegalEntity(this.legalEntities.length + 1," Title "+this.legalEntities.length + 1," Description "+this.legalEntities.length + 1));
        return new Promise<LegalEntity[]>(resolve => {
            resolve(this.legalEntities);
        });
    }
    

}