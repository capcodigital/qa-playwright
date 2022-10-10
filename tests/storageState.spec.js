const {test , expect}= require('@playwright/test')
let webState;
const email = "mytest@gmail.com"

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }
 
test.beforeAll(async({browser})=>
{
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/client")
    await page.setViewportSize({width: 1520, height: 800})
    await page.locator("#userEmail").type(email)
    await page.locator("#userPassword").type("Practice@1")
    await page.locator("#login").click()
    await page.waitForLoadState('networkidle')
    await context.storageState({path:'newstate.json'})
    webState=await browser.newContext({storageState:'newstate.json'})
}
)

test("@API @web Use copied storage details for order activity ", async() => {
    
    const productName = "adidas original"
    const page = await webState.newPage()
    await page.goto("https://rahulshettyacademy.com/client")
    const products = page.locator(".card-body")
    
const count = await products.count()
console.log("Count : " ,count)
for (let i=0;i<count;i++)
{
  if(await products.nth(i).locator('b').textContent() === productName)
{
    console.log(await products.nth(i).locator('b').textContent())
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
console.log("Options count : " ,optionsCount)
for(let i=0;i<optionsCount;i++)
{
    const optionText = await dropdown.locator("button").nth(i).textContent()
    console.log(optionText)
    if(optionText === " Switzerland")
    {
    console.log("--------------")
    console.log(optionText)
    console.log("--------------")
        await dropdown.locator("[type='button']").nth(i).click()
        break
    }
}
console.log(await page.locator("div.user__name").textContent())
await expect(page.locator("div.user__name")).toContainText(email)
await page.locator(".action__submit").click()
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
console.log(orderId)
// right= orderId.split("| ")[1]
// finalOrder= right.split(" |")[0]
// console.log(finalOrder)
await page.locator(".btn-custom[routerlink='/dashboard/myorders']").click()
//await delay(2000)
await page.locator("tbody").waitFor()
const rows= await page.locator("tbody tr").count()
console.log("Rows: ",rows)
for(let i=0;i<rows;i++)
{
   const currentOderId=await page.locator("tbody tr").nth(i).locator("th").textContent()
   //console.log(currentOderId,finalOrder)
   //if(currentOderId === finalOrder)
   if(orderId.includes(currentOderId))
   {
       console.log("Hi")
       await page.locator("td .btn-primary").nth(i).click()
       break
   }
}
const orderdetail= await page.locator(".col-text").textContent()
expect(orderId.includes(orderdetail)).toBeTruthy()
}) 

    
    
test("@API @web Use copied storage details to Print titles", async()=> {
    const page = await webState.newPage()
    await page.goto("https://rahulshettyacademy.com/client")
    const titles= await page.locator(".card-body b").allTextContents()
    await page.waitForLoadState('networkidle')
    console.log(titles)
})