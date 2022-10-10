const {test,expect} = require('@playwright/test')

test("@web Partial and whole page Screenshots " ,async({page})=>
{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
await expect(page.locator("[name='show-hide']")).toBeVisible()
await page.locator("[name='show-hide']").screenshot({path:'screenshots/partialScreenshot.png'})
await page.locator("#hide-textbox").click()
await page.screenshot({path:'screenshots/pageScreenshot.png'})
await expect(page.locator("[name='show-hide']")).toBeHidden()

})

test("@web Visual testing",async({page})=>
{
  await page.goto("https://playwright.dev/")
  expect(await page.screenshot()).toMatchSnapshot('oldScreen.png')
})