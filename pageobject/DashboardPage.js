class DashboardPage{
    constructor(page)
    {
        this.products = page.locator(".card-body")
        this.productText=  page.locator(".card-body b")
        this.cart= page.locator("[routerlink*='cart']")
    }

    async delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
     }

    async searchProducts(productName)
    {
        await this.delay(3000)
        console.log(await this.productText.allTextContents()) 
        const count = await this.products.count()
        console.log("Count : " ,count)
        for (let i=0;i<count;i++)
        {
        if(await this.products.nth(i).locator('b').textContent() === productName)
        {
        console.log(await this.products.nth(i).locator('b').textContent())
            await this.products.nth(i).locator("text=' Add To Cart'").click()
            break
        }
    }
       await this.cart.click()
    }
}

module.exports={DashboardPage}