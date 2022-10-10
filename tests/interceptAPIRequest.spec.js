const {test , request, expect}= require('@playwright/test')
const {APiUtils} = require('../utils/APiUtils')
const userDetailsPayload= {userEmail: "mytest@gmail.com", userPassword: "Practice@1"}
let token
//test.describe.configure({mode:'serial'})
test.beforeAll(async()=>
{
const APIcontext= await request.newContext()
const apiutils=new APiUtils(APIcontext,userDetailsPayload)
token= await apiutils.getToken()
})

test("@API Mock API request ", async({page}) => {
    page.addInitScript(value => {
        window.localStorage.setItem("token",value);
    }, token
    )

    await page.goto("https://rahulshettyacademy.com/client/")
    await page.setViewportSize({width: 1520, height: 800})
    await page.locator(".btn-custom[routerlink='/dashboard/myorders']").click()
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=63401e1dc4d0c51f4f37c613',
    route=>route.continue({url:'https://rahulshettyacademy.com/client/dashboard/order-details/630f7a77c4d0c51f4f136cab'})
    )
    await page.locator("button:has-text('View')").first().click()
    await expect(page.locator(".blink_me")).toContainText('You are not authorize to view this order')
    //await page.pause()
})
