import { LegalEntity } from '../Models/LegalEntity';
import { ILegalEntityService } from './ILegalEntityService';

import { SPHttpClient } from '@microsoft/sp-http';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import HttpClient from '@microsoft/sp-http/lib/httpClient/HttpClient';
import SPHttpClientResponse from '@microsoft/sp-http/lib/spHttpClient/SPHttpClientResponse';
import { ISPHttpClientOptions } from '@microsoft/sp-http/lib/spHttpClient/SPHttpClient';
import JsonUtilities from '@microsoft/sp-core-library/lib/JsonUtilities';

export class LegalEntityService implements ILegalEntityService{
    private legalEntities : LegalEntity[];
    private httpClient: SPHttpClient;
    private webAbsoluteUrl: string;

    public constructor(webPartContext : IWebPartContext){
        console.log("constructing");
        this.httpClient = webPartContext.spHttpClient;
        this.webAbsoluteUrl =  webPartContext.pageContext.web.absoluteUrl;
        this.legalEntities = new Array();    
        
        this.getEntities = this.getEntities.bind(this);
        this.addEntity= this.addEntity.bind(this);
        this.updateEntity= this.updateEntity.bind(this);
        this.deleteEntity= this.deleteEntity.bind(this);
        console.log("finished constructing");
    }

     public getEntities() : Promise<LegalEntity[]>{
        let url = this.webAbsoluteUrl + "/_api/Lists/getByTitle('LegalEntities')/items?select=Id,Title,Description";
        this.legalEntities = [];
        
        return this.httpClient.get(url,SPHttpClient.configurations.v1).then( (response : SPHttpClientResponse) =>
            {
                console.log("Got response for "+url);
                  return response.json().then((data) => {
                        data.value.forEach(l => {
                            this.legalEntities.push(new LegalEntity(l.Id,l.Title,l.Description));
                        });
                        return this.legalEntities;
                    }                    
                );

            }, (error : Error) =>{
                console.log(error.message);
                console.log(error);
            }
        );
    }

    //https://github.com/ScotHillier/Workshop2017/blob/master/WebParts/CrudSheet/src/webparts/crudSheet/components/ContactsService.ts
    public addEntity(entity:LegalEntity) : Promise<LegalEntity[]>{
        let url = this.webAbsoluteUrl + "/_api/Lists/getByTitle('LegalEntities')/items";
        this.legalEntities = [];
        const httpClientOptions : ISPHttpClientOptions = {
            body : JSON.stringify({
                Title : entity.Title,
                Description : entity.Title
            })
        };

        return this.httpClient.post(url,SPHttpClient.configurations.v1,httpClientOptions).then((response : SPHttpClientResponse) =>{
            return this.getEntities();
            }
        );
    }

    public deleteEntity(entity:LegalEntity){
        let url = this.webAbsoluteUrl +"/_api/Lists/getByTitle('LegalEntities')/getItemsByStringId('"+entity.Id+"')";
        const httpClientOptions : ISPHttpClientOptions = {};
        httpClientOptions.headers = {'IF-MATCH': '*'};
        httpClientOptions.method = "DELETE";

        return this.httpClient.fetch(url, SPHttpClient.configurations.v1,httpClientOptions).then((response : SPHttpClientResponse) =>{
            return this.getEntities();
            }
        );

    }

    public updateEntity(entity:LegalEntity){
        let url = this.webAbsoluteUrl +"/_api/Lists/getByTitle('LegalEntities')/getItemsByStringId('"+entity.Id+"')";
        const httpClientOptions : ISPHttpClientOptions = {
            body: JSON.stringify({
                Title : entity.Title,
                Desciption : entity.Description
            })
        };

        httpClientOptions.headers = {
            'If-Match':'*',
            'X-Http-Method' :'PATCH'
        };

        return this.httpClient.post(url, SPHttpClient.configurations.v1, httpClientOptions).then((response : SPHttpClientResponse) => {
            return this.getEntities();
            }

        );
    } 
}

