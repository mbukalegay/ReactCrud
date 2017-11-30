import * as React from 'react';
import styles from './ReactCrudSpfxWp.module.scss';
import { IReactCrudSpfxWpProps } from './IReactCrudSpfxWpProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { LegalEntity } from './Models/LegalEntity';
import { MockUserProfileService } from './Mocks/MockUserProfileService';

import {
  Persona,
  PersonaSize
} from 'office-ui-fabric-react/lib/Persona';

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';


import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { PnPLegalEntityService } from './Services/PnPLegalEntityService';
import {LegalEntityService} from './Services/LegalEntityService';

import { IUserProfileWpProps } from './IUserProfileWpProps'

import {PnpUserProfileService} from './Services/PnpUserProfileService';
import { IUserProfile, UserProfile} from './Models/IUserProfile';
import {IKeyValueProps} from './Models/IKeyValueProps';

export interface IUserProfileState{
  userProfile : UserProfile;
  kvp : IKeyValueProps[];
  _persona : {};
}



export default class UserProfileWp extends React.Component<IUserProfileWpProps,  IUserProfileState> {
 
  constructor(props){
    super(props);
    this.state = {
      userProfile : {Account:"",FirstName:"",LastName:"",SID:"",PictureURL:"", UserName :""},
      kvp : [{Key:"", Value:""}],
      _persona : {
        imageUrl: "https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=clement.nkamanyi@tstglobal.schindler.com&UA=0&size=HR64x64&sc=1512052696432",
        primaryText: 'Annie Lindqvist',
        secondaryText: 'Software Engineer',
      }
    }
  }

  componentWillMount(){
    console.log("Component will mount called");
    var reactHandler = this;
    if(Environment.type == EnvironmentType.Local){
      console.log("In mock environment");
       let service : MockUserProfileService = new MockUserProfileService();
      service.getCurrentUserProfileProperties().then((result : IKeyValueProps[]) =>{

        var up = new UserProfile("me","me","me","me","me", "me");
          reactHandler.setState({kvp : result}); 
          reactHandler.setState({userProfile : up}); 

      },(err : Error) =>{
        console.log(err.message);
      });
    }
    else{
      
     //PnP
     console.log("In real environment with pnp");
      
      let service : PnpUserProfileService = new PnpUserProfileService();
      service.getCurrentUserProfileProperties().then((result) =>{
        console.log("Got something");
        //console.log(result);
        //console.log(result[0].Value);
        var im = "https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email="+result[5].Value+"&UA=0&size=HR64x64&sc=1512052696432";
        var p = { "imageUrl" :im,"primaryText" :result[2].Value,"secondaryText" :result[3].Value};
        var up = new UserProfile("","me","me","me","me","me");
        reactHandler.setState({kvp : result}); 
        reactHandler.setState({userProfile : up}); 
        reactHandler.setState({_persona : p}); 
      },(err : Error) =>{
        console.log(err);
      }); 
    }
    
  }

  public render() : React.ReactElement<IUserProfileWpProps>{

    //var p = { "imageUrl" :this.state.kvp["PictureURL"],"primaryText" :this.state.kvp["FirstName"],"secondaryText" :this.state.kvp["LastName"]};
  return (
    <div>
       <h1>My Profiles</h1>
       <hr />
       <Persona
          { ...this.state._persona }
          size={ PersonaSize.large }
        /> 
      </div>
  )
}
}

      /* {this.state.kvp.map(function(item,key){
         return (
           <div className={styles.row} key={key}>
              <div className={styles.column}>{item.Key}</div>
              <div className={styles.column}>{item.Value}</div>
          </div>
         );
       })
       
      } */
