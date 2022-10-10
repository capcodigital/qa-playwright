const {expect}= require('@playwright/test')

class OrderReviewPage{
    constructor(page)
    {
        this.username= page.locator(".user__name")
        this.submit= page.locator(".action__submit")
    }

    async orderReview(email)
    {
        await expect(this.username).toContainText(email)
        await this.submit.click()
    }
}

module.exports={OrderReviewPage}