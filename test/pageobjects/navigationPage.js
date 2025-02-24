import { $ } from '@wdio/globals'
import Page from './page.js';

class NavigationPage extends Page {
    get home() {
        return $('#nav-home');
    }

    get shop() {
        return $('#nav-shop');
    }

    get contact() {
        return $('#nav-contact');
    }

    get cart() {
        return $('#nav-cart');
    }

    async navigateToCartPage() {
        await this.cart.click();
    }

    async navigateToContactPage() {
        await this.contact.click();
    }

    async navigateToShopPage() {
        await this.shop.click();
    }

    open() {
        return super.open();
    }
}

export default new NavigationPage();
