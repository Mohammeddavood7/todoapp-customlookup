import { api, LightningElement, wire } from 'lwc';
import getLookup from '@salesforce/apex/customLookup.getCustomLookup'
const DELAY = 300;
export default class CustomLookUp extends LightningElement {

   @api objectApiNamefield='';
    searchingName = '';
   @api standardIcon = '';
    cleanTimeOutValue ;
    showOperation = false;
    selectRecord ={
      selectedRecordId : '',
      selectedRecordName : ''
    }

 @wire(getLookup,{
    objectApiName:'$objectApiNamefield',
    searchingName : '$searchingName'
 }) outputData;

 get getStandardIcon() {
    return 'standard:' + this.objectApiNamefield.toLowerCase();
}

get getSelectedRecords(){
   return this.selectRecord.selectedRecordId === '' ? false : true;
}

searchHandler(event){
   window.clearTimeout(this.cleanTimeOutValue);
   let eValue = event.target.value;
   
   this.cleanTimeOutValue = setTimeout( ()=>{
      this.searchingName = eValue;
      this.showOperation = true;
   }, DELAY);

}



selectHandler(event){
   let sValue = event.currentTarget.dataset.item;
  console.log(sValue);
  let oValue = this.outputData.data.find( currentItem => currentItem.Id === sValue );

         this.showOperation = false;
         this.searchingName = '';
         this.selectRecord={
            selectedRecordId : oValue.Id ?? '',
            selectedRecordName : oValue.Name ??''
         }
        

}


removeSelectedValueHandler(event){
   console.log(event.target.value);
   this.selectRecord={
      selectedRecordId: '',
      selectedRecordName : ''
   }
}
}