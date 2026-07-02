import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    view = 'home';

    get isHome() {
        return this.view === 'home';
    }

    get isAccount() {
        return this.view === 'account';
    }

    get isContact() {
        return this.view === 'contact';
    }

    handleAccount() {
        this.view = 'account';
    }

    handleContact() {
        this.view = 'contact';
    }

    handleBack() {
        this.view = 'home';
    }
}