import { LightningElement, wire} from 'lwc';
import getAccounts from '@salesforce/apex/WireDecorator.getAccounts'


const columns = [
  { label: "Account Id", fieldName: "Id" },
  { label: "Account Name", fieldName: "Name" },
  { label: "Account Industry", fieldName: "Industry" },
  { label: "Account Rating", fieldName: "Rating" }
 ];

export default class WireDecoratorWithProperty extends LightningElement {

   columns = columns;

  @wire(getAccounts) acc;

   
}