import { LightningElement } from 'lwc';
import createAccount from '@salesforce/apex/AccountContactController.createAccount';

export default class AccountForm extends LightningElement {
    name = '';
    phone = '';

    handleName(event) {
        this.name = event.target.value;
    }

    handlePhone(event) {
        this.phone = event.target.value;
    }

    handleSave() {
        createAccount({ name: this.name, phone: this.phone })
            .then(() => {
                this.resetForm();
                this.dispatchEvent(new CustomEvent('back'));
            })
            .catch(error => {
                console.error(error);
            });
    }

    handleBack() {
        this.dispatchEvent(new CustomEvent('back'));
    }

    resetForm() {
        this.name = '';
        this.phone = '';
    }
}