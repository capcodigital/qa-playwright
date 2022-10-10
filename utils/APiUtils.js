class APiUtils
{
    constructor(APIcontext,userDetailsPayload)
    {
      this.APIcontext=APIcontext
      this.userDetailsPayload=userDetailsPayload
    }
    async getToken() {
        const loginResponse= await this.APIcontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:this.userDetailsPayload
        })
        const loginresponseJson = await loginResponse.json()
        const token=loginresponseJson.token
        return token
    }

    async createOrder(orderPayload)
    {
       let response = {}
       response.token=await this.getToken()
        const orderResponse= await this.APIcontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
    data: orderPayload ,
    headers: {
    'Authorization':response.token,
    'Content-Type':'application/json'
},


})
const orderResponseJson=await orderResponse.json()
const orderId=orderResponseJson.orders[0];
response.orderId=orderId
return response
    }
}
module.exports={APiUtils}