const {test, expect} = require('@playwright/test')
const {POmanager}=require('../pageobject/POmanager')
const dataSet=JSON.parse(JSON.stringify(require('../utils/TestData.json')))
// convert json file --> string --> Javascript object
const {customtest}=require('../utils/fixture')
//test.describe.configure({mode:'serial'})

for(const data of dataSet) 
{
test(`@web End to End test for product ${data.productName}`, async({page}) => {
const pomanage=new POmanager(page)
const loginpage=pomanage.getLoginPage()
const dashboardpage=pomanage.getDashboardPage()
const check=pomanage.getCheckoutPage()
const review=pomanage.getOrderReviewPage()
const confirm=pomanage.getOrderConfirmationPage()
const history=pomanage.getOrderHistoryPage()
await loginpage.goTo()
await loginpage.validateLogin(data.email,data.password)
//https://playwright.dev/docs/actionability
//allTextContents() - do not have auto wait option
await dashboardpage.searchProducts(data.productName)
await check.validateProductname(data.productName)
await check.out(data.countryCode,data.country)
await review.orderReview(data.email)
const orderID= await confirm.orderConfirmation()
//await delay(2000)
await history.orderhistory(orderID)
}) 
}

customtest("@web Get test data from fixture file", async({page,testdata}) => {
    const pomanage=new POmanager(page)
    const loginpage=pomanage.getLoginPage()
    const dashboardpage=pomanage.getDashboardPage()
    const check=pomanage.getCheckoutPage()
    const review=pomanage.getOrderReviewPage()
    await loginpage.goTo()
    await loginpage.validateLogin(testdata.email,testdata.password)
    await dashboardpage.searchProducts(testdata.productName)
    await check.validateProductname(testdata.productName)
    await check.out(testdata.countryCode,testdata.country)
    await review.orderReview(testdata.email)
})