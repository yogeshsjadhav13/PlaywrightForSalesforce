const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const TestCaseName = 'TC002_MCSales_RegressionTest';


test('TC002_MCSales_RegressionTest_SOHO_NewSales-Verify-quote-contract-document', async function ({ browser }) {

  //Setting up first browser page
  const context = await browser.newContext();
  const page = await context.newPage();


  //Test Object setup - Create Objects of pages to work with
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();


  //Test data setup - Read test case Data
  const utilityFunctionLocal = new UtilityFunctions(TestCaseName);
  const LocalTestData = await utilityFunctionLocal.ReadDataFromExcel();
  const secretsData = await utilityFunctionLocal.fetchEnvironmentCreds();

  
  //Step 1 - Login into Salesforce as admin
  await loginPage.adminUserLogin(utilityFunctionLocal);


  var AccountID = await utilityFunctionLocal.RunSOQLQuery("Select id from Account where Org_Nr__c = '" + LocalTestData.get("OrgNumber") + "'");
  var OpportunityID = await utilityFunctionLocal.RunSOQLQuery("select vlocity_cmt__OpportunityId__c from contract where AccountId ='" + AccountID + "' and (Status != 'Active') and (Status != 'Cancelled')");
  var ContractID = await utilityFunctionLocal.RunSOQLQuery("select id from contract where vlocity_cmt__OpportunityId__c = '" + OpportunityID + "'");
  var QuoteNumber = await utilityFunctionLocal.RunSOQLQuery("Select QuoteNumber from Quote where OpportunityId='" + OpportunityID + "' and Name like '%_Offer%'");
  var CreatedDateWithTime = await utilityFunctionLocal.RunSOQLQuery("select CreatedDate from contract where vlocity_cmt__OpportunityId__c = '" + OpportunityID + "'");
  var CreatedDate = CreatedDateWithTime.split("T")[0];
  var ContractNumber = await utilityFunctionLocal.RunSOQLQuery("select ContractNumber from contract where vlocity_cmt__OpportunityId__c = '" + OpportunityID + "'");
  var ContractStartDate = await utilityFunctionLocal.RunSOQLQuery("select StartDate from contract where vlocity_cmt__OpportunityId__c = '" + OpportunityID + "'");
  var ContractEndDate = await utilityFunctionLocal.RunSOQLQuery("select EndDate from contract where vlocity_cmt__OpportunityId__c = '" + OpportunityID + "'");


  await page.goto(secretsData.get("environmentURL") + "/" + OpportunityID);
  if (LocalTestData.get("OrgType") === "SOHO") {
    await page.locator("//span[text()='Details']//ancestor::a").click();
  }

  //Verify quote document content
var expectedText = `Quotation



DoNotUse_PlaywrightTestAccount 17917

Quotation date: ${CreatedDate}

This quotation is valid for 30 days from the date of quotation.

Quotation number: ${QuoteNumber}



















DoNotUse_PlaywrightTestAccount 17917

Telia Sverige AB

5599979076

556430-0142

Reg off: Stockholm

Address: 169 94 Solna

Test Yogesh Jadhav

Soho Ds SalesRep

yogesh.jadhav@teliacompany.com

dhanashri.ronge@teliacompany.com



+91 9505225143



Why Telia?

Telia has connected Sweden since 1853, and our commitment extends beyond just mobile subscriptions. We are dedicated to building a sustainable and digitized Sweden. Welcome to get to know us better!



Telia is a partner to grow with – we are Sweden’s leading operator with an award-winning network and comprehensive infrastructure covering the entire country. We are a reliable and experienced partner in digitalization for businesses, the public sector, and society as a whole. As an operator, we connect both small and large companies, lead the expansion of 5G, and develop innovative and sustainable solutions in areas such as connectivity, communication, and IT. Our networks and data centers are powered by renewable energy, and we take pride in being environmentally certified. Additionally, we constantly work on developing services that help our customers reduce their carbon footprint.



We offer holistic solutions in communication and IT, allowing your company to focus on core operations. Our services are future-proof and scalable, adapting to your changing needs.



With us, you’ll have a personal contact who is passionate about developing your business using digital technology. We assist you in finding products and services tailored to your specific requirements. You can reach out to us through our sales representatives, stores, and IT technicians located throughout the country.



The future is technology-driven, and we ensure that all businesses can benefit from the opportunities of digitalization.



Telia Framework Agreement – for a simpler IT everyday and digitalization journey

A Telia Framework Agreement opens up Telia’s broad portfolio of services for you. You can easily order services from the continuously updated service catalog, which you have access to without the need for separate agreements. All of this is designed to ensure that you, as a customer, have easy access to relevant services that support the digitalization of your company. From mobile subscriptions to on-site IT technicians, Telia’s Framework Agreement provides you with the simplicity and services you need – welcome to Telia!



Ordering services according to the quotation requires that you have a Framework Agreement with Telia. If you already have a Framework Agreement, please contact Telia to place your order. If you do not have a Framework Agreement yet, the next step is to sign a Framework Agreement where we specify the services to be included and the associated terms.



Discover MyBusiness: maximize the benefits for smooth business management 

To simplify and streamline your interaction with our business services, we have designed our portal, MyBusiness. Whether you need upgrades, new orders, or service cancellations to align with your changing needs, MyBusiness allows you to do so smoothly and quickly. The platform also provides a comprehensive overview of your invoices, making it easier for you to keep track of your costs.



By using MyBusiness, you can not only efficiently manage your business but also communicate directly with us. Ask your questions and track the status of your cases easily. MyBusiness is designed to make your management of business services as seamless as possible.



                                                                           

 



Needs













BUSINESS

MOBILE SUBSCRIPTIONS

SWITCHBOARD

IT









Test Automation Kundens behov - Verksamhet

Test Automation Kundens behov - Mobilabonnemang

Test Automation Kundens behov - Växel

Test Automation Kundens behov - IT





Proposed solutions 













BUSINESS

MOBILE SUBSCRIPTIONS

SWITCHBOARD

IT









Test Automation Lösning - Verksamhet

Test Automation Lösning - Mobilabonnemang

Test Automation Lösning - Växel

Test Automation Lösning - IT







Services proposed in the quotation

Telia Jobbmobil

SIMPLE AND COST-EFFECTIVE COMMUNICATION – BOTH AT HOME AND ABROAD

Mobile subscription for businesses

Sweden's best mobile network four years in a row and Sweden's most satisfied business customers. 

Surf volume according to needs from 1 GB to Unlimited. 

Call and send messages within the EU/EEA and home to Sweden for the same price as within Sweden when abroad. You use same surf package within the EU/EEA as in Sweden.

Read more about this service in Functional description 

Telia Smart Connect

EFFECTIVE COMMUNICATION IN ALL LOCATIONS

Cloud-based PBX solution that enables easy communication between employees and customers

Let employees work without limitations, wherever they are

Simple user interface in the platform and “drag-and-drop” functionality provides a good overview for the user and makes it easy to customize the solution 

See the status and availability of colleagues through calendar integration 

Access statistics in real-time for follow-ups

Read more about this service in Functional description 

Telia Operator Connect

SEAMLESS INTEGRATION WITH MICROSOFT TEAMS

With Operator Connect from Telia, all telephony – fixed and mobile - is seamlessly integrated with Microsoft Teams.

Easy administration via Teams Admin Center: Telia will automatically provision all numbers directly to Teams, so it can easily be assigned to users in the Microsoft Teams Admin Center. No engineering competence is needed!

Carrier grade voice quality: Telia is integrated directly to Microsoft's Cloud with full Quality of Service without calls over the Internet. This secures a carrier-grade telephone experience in Microsoft Teams.

Reliable support: For help with quality and incident issues you will get the help you need with combined resources from Telia and Microsoft.

Read more about this service in Functional description 

Telia Touchpoint Plus

WORK MORE EFFICIENTLY WITH A CLOUD-BASED PBX SOLUTION

Touchpoint Plus is a cloud-based PBX solution for slightly larger companies that can be tailored completely based on the Customer needs. The switchboard functions can be used in a mobile phone, telephone, tablet, or a computer. Let each user get what suits them the best.

Virtual - If you only need a connection in the cloud-based PBX solution

Basic - If you need a simple user

Mobile - For the mobile user

Unified - For freedom of choice of terminal and collective communication

The company does not have to think about the operation of the solution – Telia will take care of it.

Read more about this service in Functional description 

Telia Microsoft 365 

MAKES THE OFFICE AVAILABLE WHEREVER YOU WANT, WHENEVER YOU WANT

Subscription for Microsoft’s Office 365

Telia offers Swedish-speaking support by phone or e-mail as well as a web interface where you can increase and reduce user licences as needed.

Telia End-user Support

DEDICATED END-USER SUPPORT FOR THE WHOLE ORGANISATION

Competent and fast responding end-user support for Microsoft 365 and Mobile devices

All users in the organisation receives help for their mobile devices

All users in the organisation receives help for their Microsoft applications

Buy first line or second line end-user support for the whole organization

Telia Smart Security

PROTECT YOUR COMPANY FROM VIRUSES AND MALICIOUS CODE

Security service with cloud-based admin portal and secure clients for computers, mobiles, and servers.

Fast, scalable implementation. Distribute, manage and monitor the security of your clients and related services from an intuitive web interface 

Protects all your devices from different types of threats, such as hostage programs, hacking and malicious code 

Everything you need for mobile security in one package: anti-malware, theft protection and VPN that prevents outside access to e-mail and online communication

Telia IT Support Standard

IT SUPPORT FOR THE END-USER

Support online for the end-users IT – We assist your employees with all problems and questions about their devices (computer, mobile, tablet) and software such as Microsoft 365. 

Fast and personal – We are your IT support where you get access to a whole team of experts who are ready to give you full support and make sure that the users IT works as it should.

Cost control – Clear prices with a fixed monthly fee per user.

Read more about this service in Functional description 

Telia IT Support Plus

IT SUPPORT FOR BOTH THE END-USER AND YOUR SHARED IT ENVIRONMENT

Online support for the end-users IT – We assist your employees with all problems and questions about their devices (computer, mobile, tablet) and software such as Microsoft 365. 

Online support for your IT administrator – We assist your administrators and provide support on your shared systems, devices and networks as well as central parts of Microsoft 365 and Telia's other services. 

Fast and personal – We are your IT support where you get access to a whole team of experts who are ready to give you full support and ensure that both the users and the company's shared IT works as it should.

Cost control – Clear prices with a fixed monthly fee per user.

Read more about this service in Functional description 

Telia IT Support Premium – IT Department

MUCH MORE THAN IT-SUPPORT

Your own IT Department – Telia takes care of your IT and gives you time to focus on your business

Fast and personal – As your IT Department we work proactively with your IT and have a full team of experts ready to support you when needed.

Monitoring and surveillance – Telia monitors all your devide and IT equipment. We handle alarms and incidents.

Secure IT solutions – As your IT partner we work together with you to develop your IT solutions and create a secure IT environment based on your specific needs.

Cost control –Clear prices and fixed monthly fees

Telia IT Support Premium – IT Department Start

IT SUPPORT AND MONITORING WHEN YOU NEED

Your own IT department - Telia takes care  of your IT and give you time to focus on your business.

Fast and personal - As your IT department we work proactively with your IT and have a full team of experts ready to support you when needed. 

Monitoring and surveillance - Telia monitors all your device and IT equipment. We handle alarms and incidents.

Secure IT solutions - As your IT partner we work together with you to develop your IT solutions and create a secure IT environment based on your specific needs.

Let Telia take care of your IT – With the Start service you take the decision when Telia shall take action and you pay for the support and IT advice when you need it.

Telia Mobile phone Insurance

SMART PHONE, SMART INSURANCE

Mobile phone insurance without an age deduction.

Supplements your guarantee so that you get insurance cover for your mobile phone that covers loss of the most varied kinds

No deduction for the age of the phone

Three free months, to a value based on current price list



Telia Bredband Start  

FAST AND STABLE CONNECTION

Browse and send emails fast, use interactive services and download large files without any problem. 

Choose broadband speed up to 1 Gbps via fiber and up to 250 Mbps via wireless connection. 

A router is included in the service.

Telia Bredband Plus

A POWERFUL BROADBAND WITH GARANTEED BANDWIDTH 

Suitable for companies that have high demands on operational reliability and availability. 

Connection to TeliaNet, Telia’s own IP-network that reaches over 3000 locations in Sweden, and direct connection to Telia partners network that extends to most parts of Europe, the US and Asia. 

World-class service and on-site installation by a technician. Problems are rectified within 12 hours. 

Can be delivered to properties that are not connected to fiber.

Telia Bredband Pro 

HIGH QUALITY BROADBAND WITH A WORLD CLASS NETWORK 

Suitable for all kinds of solutions, even the most business critical. 

Connection to TeliaNet, Telia’s own IP-network that reaches over 3000 locations in Sweden, and direct connection to Telia partners network that extends to most parts of Europe, the US and Asia. 

Guaranteed broadband speed, fixed IP and prioritized traffic. Transmission capacity up to 10 Gbps.

Active monitoring around the clock all days of the year, and problems are rectified within 8 hours. On-site installation by technician.

Can be delivered to properties that are not connected to fiber.

Telia Datanet

FLEXIBLE GLOBAL COMMUNICATION SOLUTION TAILORED TO THE COMPANY'S NEEDS 

Connects geographically spread sites via a private IP-network. 

Secure and full access to all systems regardless of where in the world the company is located.

Unbeatable coverage, proactive monitoring and support around the clock. 

Add or remove features and services based on needs.

Read more about this service in Functional description 

Telia Cloud VPN Wifi/Lan

A FIRST CLASS WIFI FOR THE COMPANY’S EMPLOYEES AND GUESTS 

Wifi and fixed connection as a service, modular and easily expandable thanks to Wifi access points and fixed LAN switches with central management in the cloud. 

Wifi coverage is easily designed with the help of a two-dimensional floor plan. 

Guest network in Wifi with login portal.

New insights and increased management information thanks to a web portal that provides user statistics.

Read more about this service in Functional description 

Telia Cloud VPN SD-Wan/Firewall

THE NEXT GENERATION COMMUNICATION PLATFORM 

Cloud-managed network solution with SD-WAN and security, especially beneficial for the geographically dispersed business.

Traffic control and secure connection via automatic VPN over the internet. 

Firewall with best-practice as default.

Security license as an option for extended protection against malware, for intrusion protection and content filtering.

Monitoring and analysis in web portal.

Read more about this service in Functional description     



Prices (suggested solution)

Below we present a compilation of the services included in the proposed solution, as well as a monthly cost.

Offer

Service

Quantity

 One-time fee

Monthly 

fee

Comments



TELIA JOBBMOBIL (Number of users: 30, Agreement period: 36 months)















Jobbmobil 3 GB

5

0 SEK

0 SEK





Jobbmobil 5 GB

5

0 SEK

0 SEK





Add-Ons – Mobile











Till Europa

5

0 SEK

89 SEK





Till Grannland Företag

5

0 SEK

49 SEK





Till Utland Företag

5

0 SEK

5 SEK





Res Söderut

5

0 SEK

15 SEK





Res Österut

5

0 SEK

15 SEK





Res Västerut

5

0 SEK

15 SEK















Total





0 SEK

940 SEK





 Subscription Specific Services

Service

Jobbmobil

Bas

Jobbmobil

1-7 GB

Jobbmobil

10-25 GB

Jobbmobil

30-50 GB

Jobbmobil

80-Unlimited

Jobbmobil

Unlimited Plus



Ej vald i avtalet









Ej vald i avtalet

Surf i utlandet

- SEK/month

169 SEK/month

169 SEK/month

149 SEK/month

149 SEK/month

- SEK/month

Samtal i utlandet

- SEK/month

169 SEK/month

169 SEK/month

149 SEK/month

149 SEK/month

- SEK/month

Maxhastighet 1500Mbit/s

- SEK/month

75 SEK/month

75 SEK/month

65 SEK/month

65 SEK/month

0 SEK/month













Offer

Service

Quantity

One-time 

fee

Monthly fee

Comments



TELIA END-USER SUPPORT (Number of users: 30, Agreement period: 36 months)















END-USER SUPPORT – 1:ST LINE MOBILE

5

8 625 SEK

36 SEK















Total





8 625 SEK

179 SEK















COMMENTS



TOTAL



Test Automation Kommentarer offert







TOTAL ONE -TIME FEE 1

8 625 SEK



TOTAL MONTHLY FEE

1 119 SEK













1 Total one-time fee displays the actual cost after deducted one-time fee.

Ordering services according to the prices above assumes that you have a Framework Agreement with Telia. If you already have a Framework Agreement, contact Telia to order. If you do not have a Framework Agreement, the next step is to sign a Framework Agreement specifying which services shall be included and the terms and conditions.`;
  await utilityFunctionLocal.VerifyQuoteWordDocumentContent(page, expectedText);



  //LTAT-32328 - SFI upgrade issue
  await page.goto(secretsData.get("environmentURL") + "/" + ContractID);

  //Verify contract pdf content
var expectedText = `Telia Sverige AB, SE-169 94 Solna TC201734596 170629
Registered office: Stockholm
Corporate reg. no. 556430–0142, VAT reg. no. SE556430014201
Framework Agreement ID: RA-${ContractNumber}
Reference ID: ${ContractNumber}
Welcome to Telia
Framework Agreement for DoNotUse_PlaywrightTestAccount 17917 
services
Telia Sverige AB, SE-169 94 Solna                                                                                                                                             TC201734596 170629
Registered office: Stockholm   
Corporate reg. no. 556430–0142, VAT reg. no. SE556430014201
Framework Agreement ID: RA-${ContractNumber}
Reference ID: ${ContractNumber}

Telia Sverige AB, SE-169 94 Solna TC201734596 170629
Registered office: Stockholm
Corporate reg. no. 556430–0142, VAT reg. no. SE556430014201
Framework Agreement ID: RA-${ContractNumber}
Reference ID: ${ContractNumber}2
Framework Agreement for Telia Business Services
Framework Agreement RA-${ContractNumber} (Framework Agreement)
This Framework Agreement has been entered into between the following parties
Telia (hereinafter called Telia)Company (hereinafter called the Customer)
Telia Sverige AB
 
5564300142
DoNotUse_PlaywrightTestAccount 
17917
 
5599979076
SupplierCorporate registration 
number
CustomerCorporate registration 
number
Stjärntorget 116956Västra Varvsgatan 22 B97236
AddressPostcodeAddressPostcode
Solna Luleå 
Place
 
Place
 
Soho Ds SalesRep+91 9505225143Test Yogesh Jadhav
SellerTelephone numberContact personTelephone number
dhanashri.ronge@teliacompany.com yogesh.jadhav@teliacompany.com 
E-mail
 
 
E-mail
 
 
1 About the Framework Agreement
By signing this agreement (the Framework Agreement), the Customer has the option to order Services 
from Telia during the agreement period specified in chapter 5.
The Customer can order Services in Telia's sales channels with reference to the Framework Agreement. 
Telia provides the Services after having confirmed the order.
The Services (Services) that the Customer can order are listed in the Service Catalogue (Appendix 1). 
The prices applicable to the Services are specified in https://www.Telia.se/foretag/om/priser
The Service Catalogue and the Price List may change during the agreement period of the Framework 
Agreement. Services are provided in accordance with what is stated in the Service Catalogue and Price 
List prevailing at the time of ordering. Information about the current Service Catalogue and Price List is 
provided by Telia on request or at the time when the Customer orders.
The Customer and Telia can agree on specific prices that are unique to the Customer; see chapter 3.
Telia's current General Terms and Conditions for Services to Businesses Customers apply to the 
Framework Agreement and any Services (Appendix 4). However, the Service Description for a service 
may state that other general terms and conditions shall apply to a particular Service.
2 Service Catalogue and Service Description
The Services that are available for the Customer to order under the Framework Agreement are listed in 
the Service Catalogue (Appendix 1). The Service Catalogue and the content of the Services may vary 
during the agreement period, Telia shall notify the Customer of any changes at the time of the Customer's
order. 
The scope of a Service is further detailed in the following documents:
a)Functional Description that describes basic functions and optional functions for the Service.
b)Service Specification that describes the scope and limitations of the Service.
c)Detailed Service Description.
The Functional Description, Service Specification and Detailed Service Description are jointly referred to 
as the Service Description.
3 The Framework Agreement’s Price List and Customer Unique Prices
The prices for the Services that are available for the Customer to order under the Framework Agreement 
at any given time are specified in https://www.Telia.se/foretag/om/priser.

Telia Sverige AB, SE-169 94 Solna TC201734596 170629
Registered office: Stockholm
Corporate reg. no. 556430–0142, VAT reg. no. SE556430014201
Framework Agreement ID: RA-${ContractNumber}
Reference ID: ${ContractNumber}3
 
If the Customer and Telia agree on prices that are unique to the customer and as a result Service-specific
terms for a particular Service, this is stated in the appendix Customer Unique Prices (Appendix 2). 
All prices are exclusive of VAT. 
4 Companies entitled to call-offs
The companies listed in Appendix 3 to the Framework Agreement (Eligible Companies) have the right to 
place orders under the Framework Agreement.
5 Agreement Period and Termination
The Framework Agreement is valid for an initial agreement period from ${ContractStartDate} to ${ContractEndDate} 
inclusive.
Unless notice of termination has been given no later than three (3) months prior to the end of the initial 
agreement period, the Framework Agreement is automatically extended to apply until further notice with 
three (3) months’ notice. Termination of the Framework Agreement shall made be in writing and signed by
an authorised signatory.
An agreement on Customer-Unique Prices according to Appendix 2 may have a Service-specific Term 
that extends further in time than the agreement period applicable to the Framework Agreement. In such 
cases, the Framework Agreement shall continue to apply in all relevant parts until any such longer 
Service-specific Term according to Appendix 2 has expired.
Once the Framework Agreement has expired, the Services will continue to be provided. In these cases, 
Telia is entitled to apply standard price list at any given time until the Services are terminated or a new 
agreement is established.
6 List of Appendices
The appendices specified below form part of the Framework Agreement. Should there be any conflicting
conditions in the Framework Agreement, the terms of the main text of the Framework Agreement take
precedence over the conditions in the appendices and the appendices apply in the order in which they
appear in this List of Appendices. However, if there are specific Customer Unique Prices in Appendix 2, this
appendix always takes precedence over other appendices. Appendices added a later stage shall have
priority over older appendices of the same type. 
1.Service Catalogue
2.Customer Unique Prices
3.Eligible Companies
4.Telia’s General Terms and Conditions for Services to Business Customers
(www.telia.se/foretag/om/villkor)

Telia Sverige AB, SE-169 94 Solna TC201734596 170629
Registered office: Stockholm
Corporate reg. no. 556430–0142, VAT reg. no. SE556430014201
Framework Agreement ID: RA-${ContractNumber}
Reference ID: ${ContractNumber}4
The Framework Agreement has been prepared in two (2) copies, with each Party receiving one copy.
 
  
 
Place & DatePlace & Date
 
  
 
Telia's signature Customer's signature (authorised signatory)
 
  
 
Name printedName printed

Telia Sverige AB, SE-169 94 Solna TC201734596 170629
Registered office: Stockholm
Corporate reg. no. 556430–0142, VAT reg. no. SE556430014201
Framework Agreement ID: RA-${ContractNumber}
Reference ID: ${ContractNumber}5
 
Appendix 1 - Service Catalogue at signature of 
Agreement RA-${ContractNumber}
The Services covered by the Framework Agreement are listed in this service catalogue. The prices for 
services are available for the Customer to order under the Framework Agreement at any given time, are 
specified at https://www.Telia.se/foretag/om/priser. Customer Unique Prices agreed between the parties 
are specified in Appendix 2.
For each service there is a Service Description that is provided by Telia on request.
The Functional Description, Service Specification and Detailed Service Description are jointly referred to 
as the Service Description. 
a) The Functional Description describes the basic functions and optional functions included in the Service.
b) The Service Specification describes the scope and limitations of the Service.
c) Detailed Service Description.
The following services, grouped in four service groups, can be ordered at the time of signature of the 
agreement:
•Mobile and cloud communication
•Telia Jobbmobil
•Telia Mobilt Bredband Företag
•Telia Försäkring Mobiltelefon
•Telia Touchpoint Plus
•Telia Smart Connect
•Telia Operator Connect
•Collaboration services and IT solutions
•Telia Microsoft 365
•Telia Smart Säkerhet
•IT support and Helpdesk 
•Telia Slutanvändarsupport
•Telia IT Support Standard
•Telia IT Support Plus
•Telia IT Support Premium - Telia IT Department
•Telia IT Support Premium - Telia IT Department Start
•Network services 
•Telia Bredband Start
•Telia Bredband Plus
•Telia Bredband Pro
•Telia Datanet
•Telia Cloud VPN Wifi/Lan 
•Telia Cloud VPN SD-Wan/Firewall

Telia Sverige AB, SE-169 94 Solna TC201734596 170629
Registered office: Stockholm
Corporate reg. no. 556430–0142, VAT reg. no. SE556430014201
Framework Agreement ID: RA-${ContractNumber}
Reference ID: ${ContractNumber}6

Telia Jobbmobil
Simple and cost-effective communication – both at home and abroad
Mobile subscription for businesses
Sweden's best mobile network four years in a row and Sweden's most satisfied business 
customers. 
Surf volume according to needs from 1 GB to Unlimited. 
Call and send messages within the EU/EEA and home to Sweden for the same price as within 
Sweden when abroad. You use same surf package within the EU/EEA as in Sweden.
Telia Smart Connect
Effective communication in all locations 
Cloud-based PBX solution that enables easy communication between employees and customers.
Let employees work without limitations, wherever they are.
Simple user interface in the platform and “drag-and-drop” functionality provides a good overview 
for the user and makes it easy to customize the solution. 
See the status and availability of colleagues through calendar integration. 
Access statistics in real-time for follow-ups. 
Telia Operator Connect
Seamless integration with Microsoft Teams
With Operator Connect from Telia, all telephony – fixed and mobile - is seamlessly integrated with 
Microsoft Teams.
Easy administration via Teams Admin Center: Telia will automatically provision all numbers 
directly to Teams, so it can easily be assigned to users in the Microsoft Teams Admin Center. No 
engineering competence is needed!
Carrier-grade voice quality: Telia is integrated directly to Microsoft's Cloud with full Quality of 
Service without calls over the Internet. This secures a carrier-grade telephone experience in 
Microsoft Teams.
Reliable support: For help with quality and incident issues you will get the help you need with 
combined resources from Telia and Microsoft. 
Telia Touchpoint Plus
Work more efficiently with a cloud-based PBX solution
Touchpoint Plus is a cloud-based PBX solution for slightly larger companies that can be tailored 
completely based on the Customer needs. The switchboard functions can be used in a mobile phone, 
telephone, tablet, or a computer. Let each user get what suits them the best.
Virtual - If you only need a connection in the cloud-based PBX solution.
Basic - If you need a simple user
Mobile - For the mobile user
Unified - For freedom of choice of terminal and collective communication
The company does not have to think about the operation of the solution – Telia will take care of it. 
Telia Försäkring Mobiltelefon
Smart phone, smart insurance
Mobile phone insurance.
Supplement the guarantee so that with an insurance cover for your mobile phone that covers 
most claims of the most varied kinds.
No deduction for the age of the phone.
Three free months, to a value based on current price list. 

Telia Sverige AB, SE-169 94 Solna TC201734596 170629
Registered office: Stockholm
Corporate reg. no. 556430–0142, VAT reg. no. SE556430014201
Framework Agreement ID: RA-${ContractNumber}
Reference ID: ${ContractNumber}7
 
Telia Microsoft 365
Makes the office available wherever you want, whenever you want
Subscription for Microsoft’s Office 365
Telia Microsoft 365 includes the well-known Microsoft Office applications together with powerful 
cloud services at one price per month per user licence.
Telia offers Swedish-speaking support by phone or e-mail as well as a web interface where user 
licenses can be increased and reduced as needed.
Telia offers start-up services and on-site support for Office 365 at a fixed price per assignment. 
Telia End-user Support
Dedicated end-user support for the whole organisation
End-user support is for all users within the organization. Telia will help users with functionality, settings, 
problem solving and general questions to be able to utilize Microsoft 365 or Mobile devices.
Telia can deliver 1
st
 or 2
nd
 line support for the customer, depending on needs.
Opening hours are weekdays between 08am – 05pm CET.
Support is given in both Swedish and English.
Telia IT Support Standard
IT Support for the End User
Support online for the end users IT - We assist your employees with all problems and questions 
about their devices (computer, mobile, tablet) and software such as Microsoft 365.
Fast and personal - We are your IT support where you get access to a whole team of experts who
are ready to give you full support and make sure that the users' IT works as it should.
Cost control - Clear prices with a fixed monthly fee per user.
Telia IT Support Plus
IT Support for both the End User and your shared IT environment
Online support for the end users IT - We assist your employees with all problems and questions 
about their devices (computer, mobile, tablet) and software such as Microsoft 365. 
Online support for your IT administrator - We assist your administrators and provide support on 
your shared systems, devices, and networks as well as central parts of Microsoft 365 and Telia's 
other services. 
Fast and personal - We are your IT support where you get access to a whole team of experts who
are ready to give you full support and ensure that both the users and the company's shared IT 
works as it should.
Cost control - Clear prices with a fixed monthly fee per user.
Telia IT Support Premium – IT Department
Much more than IT-Support
Your own IT department - Telia takes care of your IT and give you time to focus on your business.
Fast and personal - As your IT department we work proactively with your IT and have a full team 
of ready to support you when needed.
Monitoring and surveillance - Telia monitors all your device and IT equipment. We handle alarms 
and incidents.
Secure IT solutions - As your IT partner we work together with you to develop your IT solutions 
and create a secure IT environment based on your specific needs.
Cost control- Clear prices with fixed monthly fees.
Telia IT Support Premium – IT Department Start
IT support and monitoring when you need
Your own IT department - Telia takes care of your IT and give you time to focus on your business.
Fast and personal - As your IT department we work proactively with your IT and have a full team 

Telia Sverige AB, SE-169 94 Solna TC201734596 170629
Registered office: Stockholm
Corporate reg. no. 556430–0142, VAT reg. no. SE556430014201
Framework Agreement ID: RA-${ContractNumber}
Reference ID: ${ContractNumber}8
of experts ready to support you when needed. 
Monitoring and surveillance - Telia monitors all your device and IT equipment. We handle alarms 
and incidents.
Secure IT solutions - As your IT partner we work together with you to develop your IT solutions 
and create a secure IT environment based on your specific needs.
Let Telia take care of your IT - With the Start service you take the decision when Telia shall take 
action and you pay for the support and IT advice when you need it.
Telia Smart Säkerhet
Protects the company from viruses and malicious code 
Security service with cloud-based admin portal and secure clients for computers, mobiles, and servers.
Fast, scalable implementation. Distributes, manages and monitors the security of clients and 
related services from an intuitive web interface.
Protects connected devices from different types of threats, such as hostage programs, hacking 
and malicious code.
Mobile security in one package: anti-malware, theft protection and VPN that prevents outside 
access to e-mail and online communication.
Network Access and Services
Network access and services is a portfolio of services that enables a coherent and secure network at and 
between the workplace/workplaces with Telia as the responsible supplier.
Select appropriate services and complement based on needs.
The network services are monitored 24/7 by Telia’s staff and preventive maintenance is 
performed to guarantee the service’s function during the contract period.
With extra high demands on availability, proactive alarm management and extended SLA can be 
added for many of the services.
Telia's Network access and services are agreed at a fixed price per month for a predictable 
function and cost.
Telia Bredband Start 
Fast and stable connection
Browse and send emails fast, use interactive services and download large files without any 
problem. 
Choose broadband speed up to 1 Gbps via fiber and up to 250 Mbps via wireless connection. 
A router is included in the service.
Telia Bredband Plus
A powerful broadband with guaranteed bandwidth 
Suitable for companies that have high demands on operational reliability and availability. 
Connection to TeliaNet, Telia’s own IP-network that reaches over 3000 locations in Sweden, and 
direct connection to Telia’s partners’ network that extends to most parts of Europe, the US and 
Asia. 
World-class service and on-site installation by a technician. Problems are rectified within 12 
hours. 
Can be delivered to properties that are not connected to fiber.
Telia Bredband Pro
High quality broadband with a world class network 
Suitable for all kinds of solutions, even the most business critical. 
Connection to TeliaNet, Telia’s own IP-network that reaches over 3000 locations in Sweden, and 
direct connection to Telia’s partners’ network that extends to most parts of Europe, the US and 
Asia. 
Guaranteed broadband speed, fixed IP and prioritized traffic. Transmission capacity up to 10 
Gbps.

Telia Sverige AB, SE-169 94 Solna TC201734596 170629
Registered office: Stockholm
Corporate reg. no. 556430–0142, VAT reg. no. SE556430014201
Framework Agreement ID: RA-${ContractNumber}
Reference ID: ${ContractNumber}9
 
Active monitoring around the clock all days of the year, and problems are rectified within 8 hours. 
On-site installation by technician.
Can be delivered to properties that are not connected to fiber.
Telia Datanet
Flexible global communication solution tailored to the company's needs 
Connects geographically spread sites via a private IP-network. 
Secure and full access to all systems regardless of where in the world the company is located.
Unbeatable coverage, proactive monitoring and support around the clock. 
Add or remove features and services based on needs.
Telia Cloud VPN Wifi/Lan
A first class Wifi for the company’s employees and guests
Wifi and fixed connection as a service, modular and easily expandable thanks to Wifi access 
points and fixed LAN switches with central management in the cloud. 
Wifi coverage is easily designed with the help of a two-dimensional floor plan. 
Guest network in Wifi with login portal. 
New insights and increased management information thanks to a web portal that provides user 
statistics. 
Telia Cloud VPN SD-Wan/Firewall
The next generation communication platform 
Cloud-managed network solution with SD-WAN and security, especially beneficial for the 
geographically dispersed business. 
Traffic control and secure connection via automatic VPN over the internet. 
Firewall with best-practice as default.
Security license as an option for extended protection against malware, for intrusion protection and
content filtering. 
Monitoring and analysis in web portal.

Telia Sverige AB, SE-169 94 Solna TC201734596 170629
Registered office: Stockholm
Corporate reg. no. 556430–0142, VAT reg. no. SE556430014201
Framework Agreement ID: RA-${ContractNumber}
Reference ID: ${ContractNumber}10
Appendix 2 – Customer-unique Prices RA-${ContractNumber}
Specified below are Customer-Unique Prices for agreed Services for the Framework Agreement RA-
${ContractNumber}.
Volume commitment refers to the volume of the Service that the Customer undertakes to buy during each
Service-specific Term.
For the subscriptions, functions, charges, etc. that are not covered by Customer-Unique Prices, the prices
for the services at any given time are specified at https://www.Telia.se/foretag/om/priser.
Once the Service-specific Term has expired, the Services will continue to be provided. In these cases, 
Telia is entitled to apply standard price list at any given time until the Services are terminated or a new 
agreement is established.
The Customer-Unique Prices apply to the Services provided according to the Service Description 
specified below.
Customer Unique Commercial Terms
Price comparison
The Parties’ intention is that the agreed pricing shall be market competitive. Telia shall, at the request of 
the Customer, conduct a price review once every calendar year. The first time a price review may be 
conducted is twenty four (24) months after signing of this Agreement. The scope of the price review is to 
compare the Customer’s pricing with the pricing in comparable Frame Agreements. Based on the 
comparison, the Parties may agree to change the agreed prices – however, new prices will not be applied
retroactively. If the Parties cannot agree upon new prices, the agreed prices shall continue to apply.

Telia Sverige AB, SE-169 94 Solna TC201734596 170629
Registered office: Stockholm
Corporate reg. no. 556430–0142, VAT reg. no. SE556430014201
Framework Agreement ID: RA-${ContractNumber}
Reference ID: ${ContractNumber}11
 
Telia Jobbmobil och Mobilt Bredband Företag
Service-specific Term${ContractStartDate} – ${ContractEndDate}
Volume commitmentBase level: 30
Special conditions The Customer Unique Prices specified in Appendix 2 apply to all the Telia-
subscriptions that the Customer has at the start of the Service-specific Term and 
to each new Telia Jobbmobil subscription that the Customer signs-up for during 
the Service-specific Term.
Telia Jobbmobil according to Appendix 2 replaces equivalent subscriptions and 
services at https://www.Telia.se/foretag/om/priser. It is thus only possible to 
order subscriptions and services according to Appendix 2 for Telia Jobbmobil 
during the Service-specific Term.
The Customer Unique Prices are valid from the start of the Service-specific 
Term, provided that the signed Appendix 2 is received by Telia no later than ten 
(10) working days before the beginning of the Service-specific Term.
The Customer Unique Prices are based on a base level agreed between the 
Parties. The base level (Base Level) means the number of mobile subscriptions 
that the Customer and Eligible Companies, agree to uphold under the 
Framework Agreement during the Service-specific Term. The Customer shall be 
compliant with the Base Level requirement no later than three(3)  months after 
the start of the Service-specific Term.
If the number of subscriptions at any time during the Service-specific Term is 
less than seventyfive (75) per cent of the Base Level, Telia is entitled, for each 
calendar month that the number of subscriptions is less than seventyfive (75) per
cent of the Base Level, to charge a fee per subscription for the difference 
between the actual number of subscriptions and the number of subscriptions 
according to the Base Level. The fee is SEK 300 (excluding VAT) per 
subscription per calendar month.
Payment terms for Jobbmobil are fortyfive (45) days.
Telia will not charge an invoice fee for paper invoices for Jobbmobil, but for a 
climate smarter option we recommend the digital alternative. Log in to 
MyBusiness to register for e-invoice or contact our helpdesk.
Version of Service 
Description
Functional description (click here
23
) v.2.0
Telia Jobbmobil
Surf, talk, send sms and mms at same price in countries within the EU/EEA as within Sweden 
1, 2
Subscription 
2, 3, 4
One-time feeMonthly fee
Jobbmobil 3 GB0 SEK0  SEK
Jobbmobil 5 GB0 SEK0  SEK
Jobbmobil 20 GB0 SEK339  SEK
Jobbmobil 50 GB0 SEK379  SEK
Jobbmobil Obegränsad0 SEK479  SEK

Telia Sverige AB, SE-169 94 Solna TC201734596 170629
Registered office: Stockholm
Corporate reg. no. 556430–0142, VAT reg. no. SE556430014201
Framework Agreement ID: RA-${ContractNumber}
Reference ID: ${ContractNumber}12
Voice calls 
1, 6, 8, 9
Call set-up feeCharge per minute
Voice calls Swedish Telia mobile subscriptions, to 
voicemail and to fixed telecom networks
0 SEK/call0 SEK/minute 
12
Voice calls to other Swedish mobile subscriptions0 SEK/call0 SEK/minute 
12
Messages to Swedish phone numbers 
1, 11
Charge per message
SMS, 24 hours0 SEK/message 
13
MMS, 24 hours0 SEK/message 
13
Additional services, to abroad and footnotes for Jobbmobil
Services includedActivationServices includedActivation
Caller Identificationfrom startSmsFrom start
Multiple Callsfrom startMmsFrom the device
Missed Call Alertsfrom startInternational call barringin MyBusiness
Call Waitingfrom the devicePremium rate call barringin MyBusiness
Call Forwarding 
14
from the deviceUnlisted numberin MyBusiness
Voice Mailfrom the deviceSIM card barringin MyBusiness
5G 
15
from start
Additional servicesTo be activatedFee per sub.
Datasim 
16
in MyBusiness179SEK/month
Anslutning Klocka 
17
in MyBusiness65SEK/month
Itemized Invoicein MyBusiness20SEK/spec
Invoice Splitby customer service20SEK/month
Calls Groupingby customer service10SEK/month
Number Reservation 
20
by customer service100SEK/nbr/year
Till Europa
18
in MyBusiness89SEK/month
Till Grannland Företag
18
in MyBusiness49SEK/month
Till Utland Företag
18
From start5SEK/month
Res Söderut
19
in MyBusiness15SEK/month
Res Västerut
19
in MyBusiness15SEK/month
Res Österut
19
in MyBusiness15SEK/month
Subscription Specific Services
ServiceJobbmobil
Bas
Jobbmobil
1-7 GB
Jobbmobil
10-25 GB
Jobbmobil
30-50 GB
Jobbmobil
80-Unlimited
Jobbmobil
Unlimited Plus
Not SelectedNot Selected
Surf i utlandet- SEK/month169 SEK/month169 SEK/month149 SEK/month149 SEK/month- SEK/month
Samtal i utlandet- SEK/month169 SEK/month169 SEK/month149 SEK/month149 SEK/month- SEK/month
Maxhastighet 
1500Mbit/s
- SEK/month75 SEK/month75 SEK/month65 SEK/month65 SEK/month0 SEK/month
International calls from Sweden 
21
Charges
Charges with Till
Utland Företag
Call set-up fee 0,59 SEK/call0,49 SEK/call
Nordic region: Denmark, Finland, Norway 0,99 SEK/minute0.59 SEK/minute
Europe 1: Belgium, Bulgaria, Cyprus, Estonia, France, 
Greece, Ireland, Iceland, Italy including the Vatican State, 
Croatia, Latvia, Liechtenstein, Lithuania, Luxemburg, Malta, 
Monaco, The Netherlands, Poland, Portugal, Roumania, 
1,19 SEK/minute0,99 SEK/minute

Telia Sverige AB, SE-169 94 Solna TC201734596 170629
Registered office: Stockholm
Corporate reg. no. 556430–0142, VAT reg. no. SE556430014201
Framework Agreement ID: RA-${ContractNumber}
Reference ID: ${ContractNumber}13
 
Switzerland, Slovakia, Slovenia, Spain, The United Kingdom, 
The Czech Republic, Germany, Hungary, Austria
Global 1: Australia, Hong Kong, Japan, Canada, China, New
Zealand, Singapore, South Korea, Taiwan, Thailand, USA
1,19 SEK/minute0,99 SEK/minute
Europe 2: Albania, Andorra, Bosnia-Herzegovina, Faroe 
Islands, Gibraltar, Macedonia, Moldova, Montenegro, Russia,
San Marino, Serbia, Turkey, Ukraine
Global 2: Argentina, Azerbaijan, Brazil, Chile, Dominican 
Republic, Egypt, Georgia, India, Indonesia, Israel, 
Kazakhstan, Malaysia, Mexico, Nepal, South Africa, 
Tajikistan, Uzbekistan
2,19 SEK/minute
2,19 SEK/minute
1,99 SEK/minute
1,99 SEK/minute
Global 3: Afghanistan, Algeria, Angola, Anguilla, Antigua and
Barbuda, Armenia, Aruba, Bahamas, Bahrain, Bangladesh, 
Barbados, Belize, Benin, Bermuda, Bhutan, Bolivia, 
Botswana, Brunei, Burkina Faso, Burundi, Cayman Islands, 
Comoros, Central African Republic, Colombia, Costa Rica, 
Djibouti, Dominica, Ecuador, Equatorial Guinea, Ivory Coast, 
El Salvador, Eritrea, Ethiopia, Fiji, Philippines, French 
Guiana, French Polynesia, United Arab Emirates, Gabon, 
Gambia, Ghana, Guadeloupe, Guam, Guinea, Grenada, 
Greenland, Guatemala, Guyana, Haiti, Honduras, Iraq, Iran, 
Jamaica, Jordan, Cambodia, Cameroon, Kenya, Kyrgyzstan, 
Congo, Congo Democratic Republic, Kosovo, Cuba, Kuwait, 
Laos, Lebanon, Libya, Morocco, Martinique, Mongolia, 
Mozambique, Myanmar, Namibia, Nicaragua, Niger, Nigeria, 
Oman, Pakistan, Palestine, Panama, Paraguay, Peru, Qatar, 
Rwanda, Saudi Arabia, Senegal, Sri Lanka, Sudan, Suriname
, South Sudan, Syria, Tanzania, Chad, Togo, Trinidad and 
Tobago, Tunisia, Turkmenistan, Uganda, Uruguay, 
Venezuela, Vietnam, Belarus, Yemen, Zambia, Zimbabwe
4,99 SEK/minute4,99 SEK/minute
Global 4: U.S. Virgin Islands, American Samoa, Ascension, 
Antarctica, British Virgin Islands, Cook Islands, Diego Garcia,
Falkland Islands, Guinea-Bissau, Cape Verde Islands, 
Kiribati, Lesotho, Liberia, Macao, Madagascar, Malawi, 
Maldives, Mali, Marshall Islands, Mauritania, Mauritius, 
Mayotte, Micronesia, Montserrat, Nauru, Dutch Antilles, Niue,
North Korea, Northern Mariana Islands, New Caledonia, 
Palau, Papua New Guinea, Puerto Rico, Reunion, Saint 
Lucia, Saint Helena, Saint Kitts and Nevis , Saint Pierre and 
Miquelon, Saint Vincent and the Grenadines, Samoa, Sao 
Tomé and Principe, Seychelles, Sierra Leone, Sint Maarten, 
Swaziland, Tonga, Solomon Islands, Somalia, Tokelau, Turks
and Caicos Islands, Tuvalu, Vanuatu, Wallis and Futuna 
Islands, East Timor
9,90 SEK/minute9,90 SEK/minute
Messages from Sweden to abroad 
20
Charge per 
message
Charges with
Till Utland Företag
SMS from Sweden to foreign telephone numbers1,29 SEK/message1,29 SEK/message
MMS from Sweden to foreign telephone numbers1,59 SEK/message1,59 SEK/message
Footnotes Telia Jobbmobil (footnote 5, 7, 10 only applicable for Jobbmobil BAS)
1 
Price per minute/sms/mms messages made/sent within/between countries within the EU/EEA are the same as the current price in the Customer's
existing subscriptions in Sweden. Indicated above does not apply for calls/sms/mms dialed/sent from Sweden. In the latter case the price list for 
international calls and messages will apply. 
2
 Surf within the EU/EES is available at same price and to the same extent as in Sweden. In subscriptions with a data bucket larger than 50 GB the
maximum amount of GB is limited to 50 GB within EU/EES, visit www.telia.se/foretag/utomlands
3
 Circuit switched data is not included in any data bucket. It is priced per minute, visit www.telia.se/jobbmobil
4
 Jobbmobil <10 GB: Data speed in 3G: <32 Mbit/s, normal speed 2-10 Mbit/s. Data speed in 4G and 5G: <100 Mbit/s, normal speed 10-40 
Mbit/s.
Jobbmobil 10 GB and larger surf limits: Data speed in 3G: <32 Mbit/s, normal speed 2-10 Mbit/s. Data speed in 4G and 5G: < 300 Mbit/s, 
normal speed 20-60 Mbit/s.

Telia Sverige AB, SE-169 94 Solna TC201734596 170629
Registered office: Stockholm
Corporate reg. no. 556430–0142, VAT reg. no. SE556430014201
Framework Agreement ID: RA-${ContractNumber}
Reference ID: ${ContractNumber}14
If the monthly allowance is exceeded, the possibility to surf will be throttled. There is an option to buy more data to avoid throttling. More 
information about data services and how to buy additional data is found at www.telia.se/jobbmobil 
Jobbmobil Obegränsad: Data speed in 3G: <32 Mbit/s, normal speed 2-10 Mbit/s. Data speed in 4G and 5G: < 300 Mbit/s, normal speed 20-60 
Mbit/s. 
Jobbmobil Obegränsad Plus: Data speed in 3G: <32 Mbit/s, normal speed 2-10 Mbit/s. Data speed in 4G and 5G: < 1500 Mbit/s, normal speed
20-60 Mbit/s.
In case the consumption for Jobbmobil Obegränsad and Jobbmobil Obegränsad Plus reaches 1TB, the speed is limited to 3Mbit/s.
5
 In case another Surf Option is chosen, this will replace the Basic service Jobbsurf Bas. 
Jobbsurf <15GB: Data speed in 3G: <32 Mbit/s, normal speed 2-10 Mbit/s. Data speed in 4G and 5G:  <100 Mbit/s, normal speed 10-40 Mbit/s. 
Jobbsurf 15GB and larger surf limits: Data speed in 3G: <32 Mbit/s, normal speed 2-10 Mbit/s. Data speed in 4G and 5G:  < 300 Mbit/s, 
normal speed 20-60 Mbit/s.
If the monthly allowance is exceeded, the possibility to surf will be throttled. There is an option to buy more data to avoid throttling. More 
information about data services and how to buy additional data is found at www.telia.se/jobbmobil
6
 Does not apply to calls to mediated services such as directory enquiries and other types of Premium rated numbers.
7
 Charged per 60 second interval.
8
 Also applies for calls dialed to Sweden from countries within the EU/EEA.
9
 Also applies for calls dialed within and between other EU/EEA countries other than Sweden.
10
 Internal calls apply to calls between the Customer’s mobile subscriptions, and to calls from the Customer’s mobile subscriptions to selected fixed 
numbers belonging to the Customer. All numbers must belong to the Customer. Does not apply to calls to mediated services such as directory 
enquiries and other types of Premium rated numbers.
11
 Does not apply to Premium rated SMS. Price per sms sent from Sweden to abroad will be found below the heading Messages from Sweden to 
abroad.
12
 Price is valid up to 44 640 minutes/month, then a charge of 0,29 SEK/minute, 0,39 SEK/call will apply.
13
 Price is valid up to 30 000 messages/month, then a charge of 0,49 SEK/sms and 1,59 SEK/mms will apply.
14
 Calls forwarding to Telia mobile subscriptions cost 0 SEK/minute, no Call set-up fee. No Call set-up fee for calls to fixed networks All other 
minutes and connections fees according to Appendix 2.
15
 Jobbmobil subscriptions are prepared for 5G at no extra charge. To use 5G, 5G coverage and 5G-compatible phone are required.
16
 Maximum five (5) Datasim can be linked to a Jobbmobil Subscription. The monthly fee is per Datasim. For Jobbmobil Unlimited Plus, one (1) 
Datasim is included at no extra charge.
17
 To access Anslutning Klocka, a suborder must first be approved by an authorized person in MyBusiness. For more information, visit 
www.telia.se/foretag/e-sim
18
 For more information about Telia’s International Calls services, visit www.telia.se/foretag/utomlands
19
 For more information about Telia’s roaming services, visit www.telia.se/res
20
 Number reservation is free for one (1) year after the reservation date, after which 100 SEK/number and year in case the Customer wants to 
extend their reservation.
21
 Price list for international calls and messages only applies on calls/messages from Sweden. For calls/messages made/sent from other EU/EEA-
countries to countries outside the EU/EEA and from any country outside the EU/EEA roaming charges from respective country will apply. For 
more information, visit www.telia.se/foretag/utomlands
22
 Maxhastighet 1500 Mbit/s is included in Jobbmobil Obegränsad Plus 
23 
https://creativehub.teliacompany.com/m/58ea772853d930a5/original/Functional-Description-Telia-Jobbmobil.pdf
Telia Mobilt Bredband Företag
Subscription 
1, 2, 3, 4
Maximum speedOne-time feeMonthly fee
Mobilt Bredband Företag 20 GB< 300 (Mbps) 
5
0 SEK189 SEK
Mobilt Bredband Företag 50 GB< 300 (Mbps) 
5
0 SEK259 SEK
Mobilt Bredband Företag 500 GB< 300 (Mbps) 
5
0 SEK359 SEK
Mobilt Bredband Företag 1000 GB< 300 (Mbps) 
5
0 SEK419 SEK
MessagesCharge per message
SMS to Swedish subscriptions 
6
0,60 SEK/message
SMS to foreign subscriptions 
7
1,20 SEK/message
Additional servicesCharge per subscription
Fixed IP address99 SEK/month
Footnotes Telia Mobilt Bredband Företag
1
 Works in Sweden only, cannot be used abroad.
2
 Circuit switched data is not included in any data bucket. It is priced per minute, visit www.telia.se/jobbmobil
3
 If the monthly allowance is exceeded, the possibility to surf will be throttled. There is an option to buy more data to avoid throttling. More 
information about data services and how to buy additional data is found at www.telia.se/jobbmobil
4
 Mobilt Bredband Företag subscriptions are prepared for 5G at no extra charge. To use 5G, 5G coverage and 5G-compatible hardware are 
required.
5
 Data speed in 3G: <32 Mbit/s, normal speed 2-10 Mbit/s. Data speed in 4G: < 300 Mbit/s, normal speed 20-60 Mbit/s.
6 
Applies to SMS sent to Swedish telephone numbers. Does not apply to Premium rated SMS.
 
7 
Applies to SMS sent to foreign telephone numbers. Does not apply to Premium rated SMS.
 
Telia End User Support

Telia Sverige AB, SE-169 94 Solna TC201734596 170629
Registered office: Stockholm
Corporate reg. no. 556430–0142, VAT reg. no. SE556430014201
Framework Agreement ID: RA-${ContractNumber}
Reference ID: ${ContractNumber}15
 
Special conditions For 1st line Mobile-and Microsoft Support, a volume commitment is agreed on 
a number of devices during the Service-specific Term. The customer shall 
provide Telia with information if the number of devices increases during the 
Service-specific Term. If the Customer exceeds the agreed number of devices, 
the exceeding number of devices will be charged separately.
Telia End-User Support - 1st line Mobile support
Service-specific Term${ContractStartDate} – ${ContractEndDate}
Volume commitment Number of devices: 30
Number of devicesOne-time feePrice per deviceMonthly fee
308 625 SEK35 SEK/month1 077 SEK

Telia Sverige AB, SE-169 94 Solna TC201734596 170629
Registered office: Stockholm
Corporate reg. no. 556430–0142, VAT reg. no. SE556430014201
Framework Agreement ID: RA-${ContractNumber}
Reference ID: ${ContractNumber}16
Appendix 3 – Eligible Companies RA-${ContractNumber}
The Customer’s corporate reg. number: 5599979076
In addition to the Customer, the following companies/corp. reg. nos. within the Customer’s group (as 
defined in Chapter 1 section 11 of the Swedish Companies Act) are entitled to make call-off orders 
according to the Framework Agreement. The customer can make changes to Eligible Companies through 
sales representative or via support channels. Telia reserves the right to carry out customary credit testing 
of Eligible Companies in connection with ordering.
Services that are not possible to call off for utilizers: 
Telia IT Support Premium – IT Department
Telia IT Support Premium – IT Department Start
Telia IT Support Standard
Telia IT Support Plus
These services require their own pre-condition control and are offered separately.
CompanyCorporate registration number

Telia Sverige AB, SE-169 94 Solna TC201734596 170629
Registered office: Stockholm
Corporate reg. no. 556430–0142, VAT reg. no. SE556430014201
Framework Agreement ID: RA-${ContractNumber}
Reference ID: ${ContractNumber}17
 
Appendix 4 – Telia’s General Terms and Conditions 
for Services to Business Customers RA-${ContractNumber}
https://www.telia.se/foretag/om/villkor`;
  await utilityFunctionLocal.VerifyContractPDFDocumentContent(page, expectedText);

  //Close all browserss
  await context.close();
});



