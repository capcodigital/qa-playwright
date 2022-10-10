const {LoginPage}= require('./LoginPage')
const {DashboardPage}= require('./DashboardPage')
const {CheckoutPage}=require('./CheckoutPage')
const {OrderReviewPage}=require('./OrderReviewPage')
const {OrderConfirmationPage}=require('./OrderConfirmationPage')
const {OrderHistory}=require('./OrderHistory')

class POmanager{

    constructor(page)
    {
        this.page=page
 this.loginpage=new LoginPage(this.page)
 this.dashboardpage=new DashboardPage(this.page)
 this.checkoutpage=new CheckoutPage(this.page)
 this.ordereviewpage=new OrderReviewPage(this.page)
 this.orderconfirmationpage=new OrderConfirmationPage(this.page)
 this.orderhistorypage=new OrderHistory(this.page)
    }

    getLoginPage()
    {
        return this.loginpage
    }
    getDashboardPage()
    {
        return this.dashboardpage
    }
    getCheckoutPage()
    {
        return this.checkoutpage
    }
    getOrderReviewPage()
    {
        return this.ordereviewpage
    }
    getOrderConfirmationPage()
    {
        return this.orderconfirmationpage
    }
    getOrderHistoryPage()
    {
        return this.orderhistorypage
    }
}

module.exports= {POmanager}
