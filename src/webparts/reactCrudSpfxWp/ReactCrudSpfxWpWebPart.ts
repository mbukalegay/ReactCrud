import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactCrudSpfxWpWebPartStrings';
import ReactCrudSpfxWp from './components/ReactCrudSpfxWp';
import { IReactCrudSpfxWpProps } from './components/IReactCrudSpfxWpProps';
import { IWebPartContext } from '@microsoft/sp-webpart-base';

import {IUserProfileWpProps} from './components/IUserProfileWpProps'
import UserProfileWp  from './components/UserProfileWp';

export interface IReactCrudSpfxWpWebPartProps {
  description: string;
  context : IWebPartContext;
}

export default class ReactCrudSpfxWpWebPart extends BaseClientSideWebPart<IReactCrudSpfxWpWebPartProps> {

  public render(): void {
    
/*     const element: React.ReactElement<IReactCrudSpfxWpProps > = React.createElement(
      ReactCrudSpfxWp,
      {
        description: this.properties.description,
        context : this.context
      }
    );
 */
const element : React.ReactElement<IUserProfileWpProps> = React.createElement(
  UserProfileWp,
  {
    description : this.properties.description
  }
)
    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
