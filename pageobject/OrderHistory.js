const {expect}=require('@playwright/test')
class OrderHistory{
    constructor(page)
    {
    this.table=page.locator("tbody")
    this.row=page.locator("tbody tr")
    this.primary=page.locator("td .btn-primary")
    this.order=page.locator(".col-text")
    }

    async orderhistory(OrderId)
    {
        await this.table.waitFor()
        const rows= await this.row.count()
        for(let i=0;i<rows;i++)
        {
           const currentOderId=await this.row.nth(i).locator("th").textContent()
           if(OrderId.includes(currentOderId))
           {
               await this.primary.nth(i).click()
               break
           }
        }
        const orderdetail= await this.order.textContent()
        expect(OrderId.includes(orderdetail)).toBeTruthy()
    }
}

module.exports={OrderHistory}