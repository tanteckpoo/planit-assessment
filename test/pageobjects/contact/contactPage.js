import { $ } from '@wdio/globals'
import Page from '../page.js';

class ContactPage extends Page {
    get email () {
        return $('#email');
    }

    get forename () {
        return $('#forename');
    }

    get message () {
        return $('#message');
    }

    get validationFailureMessage () {
        return $('.alert.alert-error.ng-scope');
    }

    get validationInfoMessage () {
        return $('.alert.alert-info.ng-scope');
    }

    get validationSuccessMessage () {
        return $('.alert.alert-success');
    }

    get btnSubmit () {
        return $('=Submit');
    }

    async clickSubmitButton () {
        await this.btnSubmit.click();
    }

    async fillMandatoryFieldsAndSubmitForm () {
        var forenameValue = 'Test';
        var emailAddress = 'test@test.com';
        var messageValue = 'This is a simple test';

        await this.forename.setValue(forenameValue);
        await this.email.setValue(emailAddress);
        await this.message.setValue(messageValue);
        await this.clickSubmitButton();
    }
}

export default new ContactPage();
