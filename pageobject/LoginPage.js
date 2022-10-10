class LoginPage{
    constructor(page)
    {
        this.page=page
        this.email=page.locator("#userEmail")
        this.password=page.locator("#userPassword")
        this.signin=page.locator("#login")
    }

    async delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
     }

    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client")
        //await this.page.setViewportSize({width: 1520, height: 800})
    }

    async validateLogin(email,password)
    {
        await this.email.type(email)
        await this.password.type(password)
        await this.signin.click()
        await this.delay(2000)
     }
       // await this.page.waitForLoadState('networkidle')
    }

module.exports={LoginPage}