const { test, expect, request } = require('@playwright/test');
const { POManager } = require('../../main/utilities/POManager');
const { UtilityFunctions } = require('../../main/utilities/UtilityFunctions');
import * as fs from 'fs';
const TestCaseName = 'TC002_Ecommerce_RegressionTest';


test('TC002_Ecommerce_Dummyjson-APITest.spec.js', async function ({ request }) {

  var response = await request.fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'emilys',
      password: 'emilyspass',
      expiresInMins: 30, // optional, defaults to 60
    }),
    credentials: 'include' // Include cookies (e.g., accessToken) in the request
  });
  var data = await response.json();


  response = await request.fetch('https://dummyjson.com/products');
  data = await response.json();
  console.log(data);

  



});


