const {test , request, expect}= require('@playwright/test')
const {APiUtils} = require('../utils/APiUtils')
const userDetailsPayload= {userEmail: "mocking@gmail.com", userPassword: "Practice@1"}
const orderPayload= {orders:[{country:"Germany",productOrderedId:"6262e95ae26b7e1a10e89bf0"}]}
const fakebody= {data:[],message:"No Orders"}
let token
//test.describe.configure({mode:'serial'})
test.beforeAll(async()=>
{
const APIcontext= await request.newContext()
const apiutils=new APiUtils(APIcontext,userDetailsPayload)
token= await apiutils.getToken()
})

test("@API Mock API response ", async({page}) => {
    page.addInitScript(value => {
        window.localStorage.setItem("token",value)
    }    ,token
    )

    await page.goto("https://rahulshettyacademy.com/client/")
    await page.setViewportSize({width: 1520, height: 800})
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/63444774c4d0c51f4f3a6275',
    async route => 
    {
    const realresponse= await page.request.fetch(route.request())
    await route.fulfill({
        realresponse,
        fakebody,
    })
    
    })
    await page.locator(".btn-custom[routerlink='/dashboard/myorders']").click()
    await expect(page.locator(".mt-4")).toContainText(' You have No Orders to show at this time.')
})