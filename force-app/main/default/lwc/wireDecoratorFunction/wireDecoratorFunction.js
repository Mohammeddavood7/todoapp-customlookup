import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/WireDecorator.getAccounts';

const columns = [
    { label: "Account Id", fieldName: "Id" },
    { label: "Account Name", fieldName: "Name" },
    { label: "Account Industry", fieldName: "Industry" },
    { label: "Account Rating", fieldName: "Rating" }
];

export default class WireDecoratorFunction extends LightningElement {
    columns = columns;
    updateAccount;
    error;

    @wire(getAccounts)
    gettingAccounts({ error, data }) {
        if (data) {
             this.updateAccount = data.map(currentItem => ({ ...currentItem, Rating: currentItem.Rating ?? 'Warm' }))
        }else if (error) {
            this.updateAccount = undefined;
            this.error = error;
        }
    }
}
