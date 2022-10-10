const {expect} = require('@playwright/test')
class CheckoutPage {

    constructor(page)
    {
        this.page=page
    this.items = page.locator("div ul").first()
    this.checkout = page.locator("text='Checkout'")
    this.country = page.locator("[placeholder*='Country']")
    this.dropdown = page.locator(".ta-results")
    }

    async delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
     }
getproductname(productName)
{

    return this.page.locator("h3:has-text('"+productName+"')")
}

async validateProductname(productName)
{
    await this.items.waitFor()
    const booleanResult=await this.getproductname(productName).isVisible()
    expect(booleanResult).toBeTruthy()
}
    async out(countryCode,country)
    {
    await this.checkout.click()
    await this.country.type(countryCode,{delay:400})
    await this.delay(2000)
    await this.dropdown.waitFor()
    const optionsCount = await this.dropdown.locator("button").count()
    console.log("Options count : " ,optionsCount)
    for(let i=0;i<optionsCount;i++)
    {
        const optionText = await this.dropdown.locator("button").nth(i).textContent()
        console.log(optionText)
        if(optionText === country)
        {
        console.log("--------------")
        console.log(optionText)
        console.log("--------------")
            await this.dropdown.locator("[type='button']").nth(i).click()
            break
        }
    }
    }
}

module.exports= {CheckoutPage}
