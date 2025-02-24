import { expect } from '@wdio/globals'
import CartPage from '../pageobjects/cart/cartPage.js'
import ContactPage from '../pageobjects/contact/contactPage.js'
import NavigationPage from '../pageobjects/navigationPage.js'
import ShopPage from '../pageobjects/shop/shopPage.js'

describe('Contact Page', () => {
    it('validation message should clear when mandatory fields have been filled', async () => {
        await NavigationPage.open()
        await NavigationPage.navigateToContactPage()

        await ContactPage.clickSubmitButton()
        await expect(ContactPage.validationFailureMessage).toHaveText(
            expect.stringContaining("We welcome your feedback - but we won't get it unless you complete the form correctly."))

        await ContactPage.fillMandatoryFieldsAndSubmitForm()
        await ContactPage.validationInfoMessage.waitForDisplayed()
        await expect(ContactPage.validationInfoMessage).toHaveText(
            expect.stringContaining("We welcome your feedback - tell it how it is."))
    })
})

describe('Contact Page', () => {
    it('successful submission message should display when mandatory fields have been filled during form submission', async () => {
        await NavigationPage.open()
        await NavigationPage.navigateToContactPage()

        await ContactPage.fillMandatoryFieldsAndSubmitForm()
        await ContactPage.validationSuccessMessage.waitForDisplayed()
        await expect(ContactPage.validationSuccessMessage).toHaveText(
            expect.stringContaining(", we appreciate your feedback."))
    })
})

describe('Cart Page', () => {
    it('verify price and subtotal for each product and total for all products', async () => {
        await NavigationPage.open()
        await NavigationPage.navigateToShopPage()

        await ShopPage.buyProduct('Stuffed Frog', 2);
        await ShopPage.buyProduct('Fluffy Bunny', 5);
        await ShopPage.buyProduct('Valentine Bear', 3);

        await NavigationPage.navigateToCartPage()
        await CartPage.cartMessage.waitForDisplayed();

        await CartPage.verifyProductSubTotal('Stuffed Frog', 21.98);
        await CartPage.verifyProductSubTotal('Fluffy Bunny',  49.95);
        await CartPage.verifyProductSubTotal('Valentine Bear', 44.97);

        await CartPage.verifyProductPrice('Stuffed Frog', 10.99);
        await CartPage.verifyProductPrice('Fluffy Bunny',  9.99);
        await CartPage.verifyProductPrice('Valentine Bear', 14.99);

        await CartPage.verifyCartTotal(116.90);
    })
})