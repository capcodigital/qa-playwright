const {test, expect, request} = require('@playwright/test')
const {APiUtils} = require('../utils/APiUtils')
const userDetailsPayload= {userEmail: "mytest@gmail.com", userPassword: "Practice@1"}
const orderPayload= {orders:[{country:"Germany",productOrderedId:"6262e95ae26b7e1a10e89bf0"}]}
let response

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }


test.beforeAll(async()=>
{
const APIcontext= await request.newContext()
const apiutils=new APiUtils(APIcontext,userDetailsPayload)
response= await apiutils.createOrder(orderPayload)
})

test("@API @web Login and Create order by API call", async({page}) => {
    
    // const productName = "adidas original"
    // const email = "mytest@gmail.com"
    // const products = page.locator(".card-body")
    page.addInitScript(value => {
        window.localStorage.setItem("token",value)
    }    , response.token
    )

    await page.goto("https://rahulshettyacademy.com/client/")
    await page.setViewportSize({width: 1520, height: 800})
await page.locator(".btn-custom[routerlink='/dashboard/myorders']").click()

await page.locator("tbody").waitFor()
const rows= await page.locator("tbody tr").count()
console.log("Rows: ",rows)
for(let i=0;i<rows;i++)
{
   const currentOderId=await page.locator("tbody tr").nth(i).locator("th").textContent()
   if(response.orderId.includes(currentOderId))
   {
       console.log("Hi")
       await page.locator("td .btn-primary").nth(i).click()
       break
   }
}
const orderdetail= await page.locator(".col-text").textContent()
expect(response.orderId.includes(orderdetail)).toBeTruthy()
}) 