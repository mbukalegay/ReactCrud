import { ILegalEntity } from '../Models/LegalEntity';
export interface ILegalEntityService{
    getEntities() :  Promise<ILegalEntity[]>;
    updateEntity(entity:ILegalEntity): Promise<ILegalEntity[]>;
    deleteEntity(entity:ILegalEntity): Promise<ILegalEntity[]>;
    addEntity(entity:ILegalEntity): Promise<ILegalEntity[]>;
}