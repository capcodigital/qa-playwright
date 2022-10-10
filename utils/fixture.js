const base = require('@playwright/test')
exports.customtest= base.test.extend(

    {
        testdata:
            {
                productName : "zara coat 3",
                email : "mytest@gmail.com",
                password : "Practice@1",
                countryCode : "ind",
                country : " India"
            }
    }
   

)