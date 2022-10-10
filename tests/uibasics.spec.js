const {test, expect} = require('@playwright/test')
//test.describe.configure({mode:'parallel'})
//test.describe.configure({mode:'serial'})
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }
// Page object model is not used in this spec. This spec is for understanding playwright basics
test("@web Valid and Invalid Login", async({browser})=> {
    // *** This test covers using browser fixture and Wait for non API call to complete before executing next step
    const context= await browser.newContext()
    const page = await context.newPage()
    const userName = page.locator("#username")
    const passWord = page.locator("#password")
    const signIn = page.locator("[type='submit']")
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/")
    await userName.type("FakeUsername")
    await passWord.type("learning")
    await signIn.click()
    await expect(page.locator("[style*='block']")).toContainText("Incorrect")
    await userName.fill("")
    await userName.fill("rahulshettyacademy")
    //allTextContents()- do not have auto wait option
    //waitForNavigation() - wait for the page load to complete for the next step signIn.click()
    await Promise.all(
        [
            page.waitForNavigation(),
            signIn.click(),
        ]
    )
    const titles= await page.locator(".card-title a").allTextContents()
    await expect(page).toHaveTitle("ProtoCommerce")
})

test("@web page fixture test and Radio button, Dropdown , Checkbox , Blink class/Attibute", async({page}) => {
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/")
    await page.locator(".radiotextsty").nth(1).click()
    await page.locator("#okayBtn").click()
    await expect(page.locator(".radiotextsty").last()).toBeChecked()
    console.log(await page.locator(".radiotextsty").last().isChecked())
    await page.locator("select.form-control").selectOption("consult")
    await page.locator("#terms").check()
    expect(await page.locator("#terms").isChecked()).toBeTruthy()
    await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class","blinkingText")
})

test("@web wait for all Service/API call to complete ", async({page}) => {
    
    const productName = "adidas original"
    const email = "mytest@gmail.com" // use your email id registered in this website
    const products = page.locator(".card-body")
await page.goto("https://rahulshettyacademy.com/client")
await page.setViewportSize({width: 1520, height: 800})
await page.locator("#userEmail").type(email)
await page.locator("#userPassword").type("Practice@1") // Use valid password for this website
await page.locator("#login").click()
await page.waitForLoadState('networkidle')
//https://playwright.dev/docs/actionability
//allTextContents() do not have auto wait option
await delay(3000)
const count = await products.count()
for (let i=0;i<count;i++)
{
  if(await products.nth(i).locator('b').textContent() === productName)
{
    await products.nth(i).locator("text=' Add To Cart'").click()
    break
}
}
await page.locator("[routerlink*='cart']").click()
await page.locator("div ul").first().waitFor()
const booleanResult=await page.locator("h3:has-text('adidas original')").isVisible()
expect(booleanResult).toBeTruthy()
await page.locator("text='Checkout'").click()
await page.locator("[placeholder*='Country']").type("sw",{delay:400})
await delay(2000)
const dropdown = page.locator(".ta-results")
await dropdown.waitFor()
const optionsCount = await dropdown.locator("button").count()
for(let i=0;i<optionsCount;i++)
{
    const optionText = await dropdown.locator("button").nth(i).textContent()
    if(optionText === " Switzerland")
    {
        await dropdown.locator("[type='button']").nth(i).click()
        break
    }
}
await expect(page.locator(".user__name")).toContainText(email)
await page.locator(".action__submit").click()
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
await page.locator(".btn-custom[routerlink='/dashboard/myorders']").click()
//await delay(2000)
await page.locator("tbody").waitFor()
const rows= await page.locator("tbody tr").count()
for(let i=0;i<rows;i++)
{
   const currentOderId=await page.locator("tbody tr").nth(i).locator("th").textContent()
   if(orderId.includes(currentOderId))
   {
       await page.locator("td .btn-primary").nth(i).click()
       break
   }
}
await delay(2000)
const orderdetail= await page.locator(".col-text").textContent()
expect(orderId.includes(orderdetail)).toBeTruthy()
}) 

test("@web Child tabs", async({browser}) => {
    const context= await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/")
    const documentLink= page.locator("[href*='documents-request']")
    const [newpage] =await Promise.all( // To avoid race condition
    
        [
            context.waitForEvent("page"),//wait for the page in context(Browser) before click
            documentLink.click(),
        ]

    )
    const copyrightText= await newpage.locator(".copyright").textContent()
    const right=copyrightText.split("Reserved ")[1]
    let userName=right.split(" ©")[0]
    await page.locator("#username").type(userName)
})

test("@web Hide , Visible , Goback , Go forward , Dialog , Frames" ,async({page})=>
{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
//await page.goto("https://google.com")
//await page.goBack()
//await page.goForward()
await expect(page.locator("[name='show-hide']")).toBeVisible()
await page.locator("#hide-textbox").click()
await expect(page.locator("[name='show-hide']")).toBeHidden()
page.on("dialog",dialog =>dialog.accept())
await page.locator("#confirmbtn").click()
//Frames
await page.locator('#mousehover').hover();
const framePage = page.frameLocator("#courses-iframe")
//await framePage.locator("[href='lifetime-access']:visible").click()
await framePage.locator(".header-upper [href='lifetime-access']").click()
const users= await framePage.locator(".text h2").textContent()
console.log(users.split(" ")[1])
})