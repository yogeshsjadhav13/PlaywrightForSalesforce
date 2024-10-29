const { test, expect, request } = require('@playwright/test');
const { POManager } = require('../../main/utilities/POManager');
const { UtilityFunctions } = require('../../main/utilities/UtilityFunctions');
import * as fs from 'fs';
const TestCaseName = 'TC001_Ecommerce_RegressionTest';


test('TC001_Ecommerce_Create-Opportunity.spec.js', async function ({ request }) {

  //Step 1 - Test data setup - Read test case Data
  const utilityFunctionLocal = new UtilityFunctions(TestCaseName);
  const LocalTestData = await utilityFunctionLocal.ReadDataFromExcel();
  const secretsData = await utilityFunctionLocal.fetchEnvironmentCreds();
  const BaseURI = LocalTestData.get("BaseURI");


  //Step 2 - Authentication to Ecommerce application
  var response = await request.post(BaseURI + "/api/ecom/auth/login",
    { 
      headers:{"content-type": "application/json"},
      data: {userEmail: secretsData.get("eCommerceUsername"), userPassword: secretsData.get("eCommercePassword")}
  
  });
  var data = await response.json();
  const token = data.token;
  const userID = data.userId;
  console.log(data);


  //Step 3 - Add product in the Ecommerce application
  const fileBuffer = fs.readFileSync('./resources/TestDataFiles/ABCD.png');
  const formData = {
    productName: "Laptop",
    productAddedBy: userID, 
    productCategory: "fashion", 
    productSubCategory: "shirts", 
    productPrice: "11500", 
    productDescription: "Lenova", 
    productFor: "men",
    productImage: {
        name: 'ABCD.png',
        mimeType: 'image/png',
        buffer: fileBuffer,
    },
};
  response = await request.post(BaseURI + "/api/ecom/product/add-product",
    {
    headers:{"authorization":token},
    multipart:  formData
  });
  data = await response.json();
  const productId = data.productId;
  console.log(data);
  await utilityFunctionLocal.WriteDataToExcel("ProductId", productId);


  //Step 4 - Create order in the Ecommerce application
  response = await request.post(BaseURI + "/api/ecom/order/create-order",
    {
    headers:{"authorization":token},
    data:  {orders:[{country:"India",productOrderedId:productId}]}
  });
  data = await response.json();
  const orderID = data.orders[0];
  console.log(data);
  await utilityFunctionLocal.WriteDataToExcel("OrderID", orderID);


  //Step 5 - Delete order in the Ecommerce application
  response = await request.delete(BaseURI + "/api/ecom/order/delete-order/" + orderID,
    {
      headers:{"authorization":token, "content-type": "application/json"},
    });  
    data = await response.json();
    console.log(data);


  //Step 6 - Delete product in the Ecommerce application
  response = await request.delete(BaseURI + "/api/ecom/product/delete-product/" + productId,
    {
      headers:{"authorization":token, "content-type": "application/json"},
    });
    data = await response.json();
    console.log(data);


});


