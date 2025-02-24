import { $ } from '@wdio/globals'
import Page from '../page.js';

class CartPage extends Page {
    get cartItems() {
        return $$('.cart-item');
    }

    get cartMessage() {
        return $('.cart-msg');
    }

    get total() {
        return $('.total');
    }

    async findCartItem(productName) {
        for (const item of await this.cartItems) {
            const itemText = await item.$("td").getText();
            if (itemText.includes(productName)) {
                return item;
            }
        }

        throw new Error(`Product ${productName} not found in the cart.`);
    }

    async getProductPrice(cartItem) {
        const priceText = await cartItem.$("td:nth-child(2)").getText();
        return parseFloat(priceText.replace('$', ''));
    }

    async getProductQuantity(cartItem) {
        return parseInt(await cartItem.$("input[name='quantity']").getValue());     
    }

    async getProductSubTotal(cartItem) {
        const subTotalText = await cartItem.$("td:nth-child(4)").getText();
        return parseFloat(subTotalText.replace('$', ''));
    }

    async verifyProductPrice(productName, expectedPrice) {
        const cartItem = await this.findCartItem(productName);
        const price = await this.getProductPrice(cartItem);

        if(price != expectedPrice) {
            throw new Error(`Price for ${productName} is incorrect. Expected: ${expectedPrice}, Actual: ${price}`);
        }
    }

    async verifyProductSubTotal(productName, expectedSubTotal) {
        const cartItem = await this.findCartItem(productName);
        const subTotal = await this.getProductSubTotal(cartItem);
        
        if(subTotal != expectedSubTotal) {
            throw new Error(`Sub total for ${productName} is incorrect. Expected: ${expectedSubTotal}, Actual: ${subTotal}`);
        }
    }

    async verifyCartTotal(expectedTotal) {
        const totalText = await this.total.getText();
        const total = parseFloat(totalText.replace('Total: ', '').replace('$', ''));

        if(total != expectedTotal) {
            throw new Error(`Cart total is incorrect. Expected: ${expectedTotal}, Actual: ${total}`);
        }
    }
}

export default new CartPage();
