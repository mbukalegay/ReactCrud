import * as React from 'react';
import styles from './ReactCrudSpfxWp.module.scss';
import { IReactCrudSpfxWpProps } from './IReactCrudSpfxWpProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { LegalEntity } from './Models/LegalEntity';
import { MockLegalEntityService } from '../../../../lib/webparts/reactCrudSpfxWp/components/Mocks/MockLegalEntityService';

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

let _columns: IColumn[] = [
  {
    key: 'column1',
    name: 'Id',
    fieldName: 'Id',
    minWidth: 50,
    maxWidth: 100,
    isResizable: true,
    ariaLabel: 'Operations for name'
  },
  {
    key: 'column2',
    name: 'Title',
    fieldName: 'Title',
    minWidth: 200,
    maxWidth: 300,
    isResizable: true,
    ariaLabel: 'Operations for value'
  },
  {
    key: 'column3',
    name: 'Description',
    fieldName: 'Description',
    minWidth: 300,
    maxWidth: 400,
    isResizable: true,
    ariaLabel: 'Operations for value'
  },
];

export interface ILegalEntitiesState{
  legalEntities : LegalEntity [];
  selectionDetails : string;
}

export default class ReactCrudSpfxWp extends React.Component<IReactCrudSpfxWpProps, ILegalEntitiesState> {
  private _selection: Selection;
  constructor(props){
    super(props);
    this.state = {
      legalEntities : [
        {
          "Id" : 0,
          "Title" : "Nothing",
          "Description" : "My description"
        }
      ],
      selectionDetails : ""
    }

    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
    });

  }

  componentWillMount(){
    console.log("Component will mount called");
    console.log(this.props.context);
    var reactHandler = this;
    if(Environment.type == EnvironmentType.Local){
      console.log("In mock environment");
      let entities : MockLegalEntityService = new MockLegalEntityService();
      entities.getEntities().then((result : LegalEntity[]) =>{
          reactHandler.setState({legalEntities : result})
      },(err : Error) =>{
        console.log(err.message);
      });
    }
    else{
      
     //PnP
     console.log("In real environment with pnp");
      
      let entities : PnPLegalEntityService = new PnPLegalEntityService();
      entities.getEntities().then((result : LegalEntity[]) =>{
        console.log("Got something");
          reactHandler.setState({legalEntities : result})
      },(err : Error) =>{
        console.log(err.message);
      }); 

/*       console.log("In real environment");
      
      let entities : LegalEntityService = new LegalEntityService(this.props.context);
      entities.getEntities().then((result : LegalEntity[]) =>{
        console.log("Got something");
          reactHandler.setState({legalEntities : result})
      },(err : Error) =>{
        console.log(err.message);
      }); */
    }
    
  }


  public render(): React.ReactElement<IReactCrudSpfxWpProps> {

    return (
/*      <div>
       <h1>My Legal Entities</h1>
       <hr />
       {this.state.legalEntities.map(function(item,key){
         return (
           <div className={styles.row} key={key}>
              <div className={styles.column}>{item.Id}</div>
              <div className={styles.column}>{item.Title}</div>
              <div className={styles.column}>{item.Description}</div>
          </div>
         );
       })
       
      }
      </div> */
      <div>
     <div>
     OK {this.state.selectionDetails }
     </div>
      <TextField
        label='Filter by Title:'
        onChanged={ this._onChanged }
      />
      <MarqueeSelection selection={ this._selection }>
        <DetailsList
          items={ this.state.legalEntities }
          columns={ _columns }
          setKey='set'
          layoutMode={ DetailsListLayoutMode.fixedColumns }
          selection={ this._selection }
          selectionPreservedOnEmptyClick={ true }
          ariaLabelForSelectionColumn='Toggle selection'
          ariaLabelForSelectAllCheckbox='Toggle selection for all items'
          onItemInvoked={ this._onItemInvoked }
        />
        </MarqueeSelection>

    </div>
    );
  }

  @autobind
  private _onChanged(text: any): void {
    this.setState({ legalEntities: text ? this.state.legalEntities.filter(i => i.Title.toLowerCase().indexOf(text) > -1) : this.state.legalEntities  });
  }

  private _onItemInvoked(item: any): void {
    alert(`Item invoked: ${item.Title}`);
  }

  private _getSelectionDetails(): string {
    let selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0] as any).name;
      default:
        return `${selectionCount} items selected`;
    }
  }
}
