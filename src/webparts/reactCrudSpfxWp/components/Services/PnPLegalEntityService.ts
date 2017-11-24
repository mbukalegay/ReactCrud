import { LegalEntity } from '../Models/LegalEntity';
import { ILegalEntityService } from './ILegalEntityService';

import { SPHttpClient } from '@microsoft/sp-http';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import HttpClient from '@microsoft/sp-http/lib/httpClient/HttpClient';
import SPHttpClientResponse from '@microsoft/sp-http/lib/spHttpClient/SPHttpClientResponse';
import { ISPHttpClientOptions } from '@microsoft/sp-http/lib/spHttpClient/SPHttpClient';
import JsonUtilities from '@microsoft/sp-core-library/lib/JsonUtilities';
import {Constants} from '../Models/Constants';

import $pnp from 'sp-pnp-js';
import * as $ from 'jquery';

export class LegalEntityService implements ILegalEntityService{
    private legalEntities : LegalEntity[];
    private httpClient: SPHttpClient;
    private webAbsoluteUrl: string;

    public constructor(webPartContext : IWebPartContext){
        this.httpClient = webPartContext.spHttpClient;
        this.webAbsoluteUrl =  webPartContext.pageContext.web.absoluteUrl;
        this.legalEntities = new Array();  
        
        this.getEntities = this.getEntities.bind(this);
        this.addEntity= this.addEntity.bind(this);
        this.updateEntity= this.updateEntity.bind(this);
        this.deleteEntity= this.deleteEntity.bind(this);
    }

     public getEntities() : Promise<LegalEntity[]>{

        this.legalEntities = [];
    
        return $pnp.sp.web.lists.getByTitle("LegalEntities").items.select("Id","Title",).get().then((response) => 
            {
                response.data.forEach(element => {
                    this.legalEntities.push(new LegalEntity(element.Id, element.Title, element.Description));
                });
                return this.legalEntities;
            }
        
        );        
        
     }

    //https://github.com/ScotHillier/Workshop2017/blob/master/WebParts/CrudSheet/src/webparts/crudSheet/components/ContactsService.ts
    public addEntity(entity:LegalEntity) : Promise<LegalEntity[]>{
        this.legalEntities = [];
        return $pnp.sp.web.lists.getByTitle("LegalEntities").items.getById(entity.Id).delete().then((response) =>{
            console.log(response);
            return this.getEntities();
            }
        );
    }

    public deleteEntity(entity:LegalEntity) : Promise<LegalEntity[]> {
       return $pnp.sp.web.lists.getByTitle("LegalEntities").items.getById(entity.Id).delete().then((response) =>{
            console.log(response);
            return this.getEntities();
            }
        );

    }

    public updateEntity(entity:LegalEntity) : Promise<LegalEntity[]> {
        return $pnp.sp.web.lists.getByTitle("LegalEntities").items.getById(entity.Id).update({
            Title : entity.Title,
            Description : entity.Description
        }).then((response) =>{
            console.log(response);
            //this result will have two properties "data" and "item" // data is what was returned from SharePoint after the update operation // and item is an object of type item representing the REST query to that item//    // so you can immediately chain off that
            return this.getEntities();
            }
        );

    } 
}

