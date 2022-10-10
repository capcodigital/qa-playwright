const {test , request, expect}= require('@playwright/test')
const {APiUtils} = require('../utils/APiUtils')
const userDetailsPayload= {userEmail: "emptytest@gmail.com", userPassword: "Practice@1"}
const orderPayload= {orders:[{country:"Germany",productOrderedId:"6262e95ae26b7e1a10e89bf0"}]}
const fakebody= {data:[],message:"No Orders"}
let response
//test.describe.configure({mode:'serial'})
test.beforeAll(async()=>
{
const APIcontext= await request.newContext()
const apiutils=new APiUtils(APIcontext,userDetailsPayload)
response= await apiutils.createOrder(orderPayload)
})

test("@API Mock API response ", async({page}) => {
    page.addInitScript(value => {
        window.localStorage.setItem("token",value)
    }    , response.token
    )

    await page.goto("https://rahulshettyacademy.com/client/")
    await page.setViewportSize({width: 1520, height: 800})
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/633ef574c4d0c51f4f36f22d',
    async route => 
    {
    const realresponse= await page.request.fetch(route.request())
    console.log("body",fakebody)
    await route.fulfill({
        realresponse,
        fakebody,
    })
    
    })
    await page.locator(".btn-custom[routerlink='/dashboard/myorders']").click()
    await expect(page.locator(".mt-4")).toContainText(' You have No Orders to show at this time.')
})