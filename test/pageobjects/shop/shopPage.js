import { $ } from '@wdio/globals'
import Page from '../page.js';

class ShopPage extends Page {
    get productContainer () {
        return $('.products');
    }

    async getProduct(productName) {
        return this.productContainer.$(`.product-title=${productName}`).parentElement();
    }

    async buyProduct(productName, quantity) {
        const product = await this.getProduct(productName);
        const btnBuy = product.$('.btn.btn-success');

        for(let i = 0; i < quantity; i++) {
            await btnBuy.click();
        }
    }
}

export default new ShopPage();
