const {expect}=require('@playwright/test')

class OrderConfirmationPage{
    constructor(page)
    {
        this.header=page.locator(".hero-primary")
        this.orderId=page.locator(".em-spacer-1 .ng-star-inserted")
        this.myorders=page.locator(".btn-custom[routerlink='/dashboard/myorders']")
    }

    async orderConfirmation(){
        await expect(this.header).toHaveText(" Thankyou for the order. ")
        const orderId = await this.orderId.textContent()
        // right= orderId.split("| ")[1]
        // finalOrder= right.split(" |")[0]
        await this.myorders.click()
        return orderId
    }
}

module.exports={OrderConfirmationPage}