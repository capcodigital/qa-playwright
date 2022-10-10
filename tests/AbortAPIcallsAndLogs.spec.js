const {test,expect, request}=require('@playwright/test')

test("@API Abort styles and Logging", async({browser})=> {
    const context= await browser.newContext()
    const page = await context.newPage()
    const userName = page.locator("#username")
    const passWord = page.locator("#password")
    page.route('**/*.{jpg,jpeg,png}',route=> route.abort())
    page.on("request",request=>console.log(request.url()))
    page.on("response",response=>console.log(response.url(),response.status()))
    const signIn = page.locator("[type='submit']")
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())
    await userName.type("Invaliduser")
    await passWord.type("learning")
    await signIn.click()
    console.log(await page.locator("[style*='block']").textContent())
    await expect(page.locator("[style*='block']")).toContainText("Incorrect")
    await userName.fill("")
    await userName.fill("rahulshettyacademy")
    await Promise.all(
        [
            page.waitForNavigation(),
            signIn.click(),
        ]
    )
    const titles= await page.locator(".card-title a").allTextContents()
    console.log(titles)
    await expect(page).toHaveTitle("ProtoCommerce")
    //await page.pause()
})