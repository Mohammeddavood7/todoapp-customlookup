import { api, LightningElement, wire } from 'lwc';
import { getRecord,getFieldValue, getRecords } from 'lightning/uiRecordApi';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_REVENUE from '@salesforce/schema/Account.AnnualRevenue';
import CONTACT_PHONE from '@salesforce/schema/Contact.Phone';
export default class GetRecordUI extends LightningElement {
  
  /*
    @api recordId;
   output;
   error;

        //using getRecord method from uiRecordApi
    @wire(getRecord,{
        recordId:'$recordId',
        fields:[ACCOUNT_NAME]
    }) outputRecords({data, error}){
     if(data){
        this.output = data;
        console.log('data', data);
        this.error = undefined;        
     }else{
        this.output = undefined;
        this.error = error;
     }
    }

    get getName(){
       return this.output?.fields?.Name?.value ?? '';
    }

     //using getRecord with getFieldValue method from uiRecordApi
     @wire(getRecord,{recordId:'$recordId', fields:[ACCOUNT_REVENUE]}) vOutput;

    get getAnnualRevenue(){
        let gValue = getFieldValue(this.vOutput.data,ACCOUNT_REVENUE);
         return gValue;
    }
   */

    //using getRecords from uiRecordApi
   output;
   error;

   @wire(getRecords,{
    records: [
        {
            recordIds: ['001fj00001ACkLlAAL','001fj00001K4EgTAAV'],
            fields: [ACCOUNT_NAME, ACCOUNT_REVENUE]
        },
        {
            recordIds : ['003fj00000uOg2fAAC'],
            fields : [CONTACT_PHONE]
        }
   ]})getRecordsOutput({ data, error }) {  
        if (data) {
    this.accountData = data.results
        .filter(item => { return (item.result.fields.Name && item.result.fields.AnnualRevenue)  || item.result.fields.Phone} )
        .map(item => ({
            Id: item.result.id,
            Name: item.result.fields.Name?.value ?? item.result.fields.Phone?.value,
            Revenue: item.result.fields.AnnualRevenue?.value ?? ''
        }));
} else if (error) {
            console.error('Batch Error:', error);
            this.error = error;
            this.output = undefined;
        }
    }

    accountData =[{
        Id: '',
        Name: '',
        Revenue: ''
    }];
   
   



}