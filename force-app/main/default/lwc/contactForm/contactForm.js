import { LightningElement } from 'lwc';
import createContact from '@salesforce/apex/AccountContactController.createContact';

export default class ContactForm extends LightningElement {
    firstName = '';
    lastName = '';
    email = '';

    handleFirstName(event) {
        this.firstName = event.target.value;
    }

    handleLastName(event) {
        this.lastName = event.target.value;
    }

    handleEmail(event) {
        this.email = event.target.value;
    }

    handleSave() {
        createContact({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email
        })
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
        this.firstName = '';
        this.lastName = '';
        this.email = '';
    }
}