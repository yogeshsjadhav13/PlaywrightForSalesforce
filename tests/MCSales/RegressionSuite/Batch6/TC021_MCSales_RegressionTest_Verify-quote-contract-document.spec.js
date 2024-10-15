const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const TestCaseName = 'TC021_MCSales_RegressionTest';


test('TC021_MCSales_RegressionTest_SOHO_NewSales-Verify-quote-contract-document', async function ({ browser }) {

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
  var ActiveContractNumber = await utilityFunctionLocal.RunSOQLQuery("select ContractNumber from contract where Org_Nr__c = '" + LocalTestData.get("OrgNumber") + "' and Status = 'Active' and Contract_Record_Type__c = 'Ramavtal' ");
  var ContractID = await utilityFunctionLocal.RunSOQLQuery("select id from contract where vlocity_cmt__OpportunityId__c = '" + OpportunityID + "'");
  var QuoteNumber = await utilityFunctionLocal.RunSOQLQuery("Select QuoteNumber from Quote where OpportunityId='" + OpportunityID + "' and Name like '%_Offer%'");
  var FAQuoteNumber = await utilityFunctionLocal.RunSOQLQuery("Select QuoteNumber from Quote where OpportunityId='" + OpportunityID + "' and (Name like '%_FA%' or Name like '%_RNGN_Version1%')");
  var CreatedDateWithTime = await utilityFunctionLocal.RunSOQLQuery("select CreatedDate from contract where vlocity_cmt__OpportunityId__c = '" + OpportunityID + "'");
  var CreatedDate = CreatedDateWithTime.split("T")[0];
  var ContractNumber = await utilityFunctionLocal.RunSOQLQuery("select ContractNumber from contract where vlocity_cmt__OpportunityId__c = '" + OpportunityID + "'");
  var ContractStartDate = await utilityFunctionLocal.RunSOQLQuery("select StartDate from contract where vlocity_cmt__OpportunityId__c = '" + OpportunityID + "'");
      ContractStartDate = await utilityFunctionLocal.RunSOQLQuery("select TeliaSE_Start_Date__c from vlocity_cmt__ContractLineItem__c where vlocity_cmt__ContractId__c = '" + ContractID + "' limit 1");
  var ContractEndDate = await utilityFunctionLocal.RunSOQLQuery("select EndDate from contract where vlocity_cmt__OpportunityId__c = '" + OpportunityID + "'");


  await page.goto(secretsData.get("environmentURL") + "/" + OpportunityID);
  if (LocalTestData.get("OrgType") === "SOHO") {
    await page.locator("//span[text()='Details']//ancestor::a").click();
  }


  //Verify quote document content
var expectedText = `Quotation



Dägt PHBC 90453 AB

Quotation date: ${CreatedDate}

This quotation is valid for 30 days from the date of quotation.

Quotation number: ${QuoteNumber}



















Dägt PHBC 90453 AB

Telia Sverige AB

5565198461

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



Network Access and Services

Network access and services is a portfolio of services that enables a coherent and secure network at and between the workplace/workplaces with Telia as the responsible supplier.

Select appropriate services and complement based on needs.

The network services are monitored 24/7 by Telia’s staff and preventive maintenance is performed to guarantee the service’s function during the contract period.

With extra high demands on availability, proactive alarm management and extended SLA can be added for many of the services.

Telia's Network access and services are agreed at a fixed price per month for a predictable function and cost.

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















Jobbmobil 50 GB

7

0 SEK

241 SEK





Jobbmobil Obegränsad

5

0 SEK

459 SEK





Jobbmobil Datasim

5

0 SEK

179 SEK





Anslutning Klocka

5

0 SEK

65 SEK















Total





0 SEK

5 202 SEK







Subscription Specific Services

Service

Jobbmobil 30-50 GB

Jobbmobil 80-Unlimited

Jobbmobil Unlimited Plus







Ej vald i avtalet

Surf i utlandet

199 SEK/month

199 SEK/month

- SEK/month

Samtal i utlandet

199 SEK/month

199 SEK/month

- SEK/month

Maxhastighet 1500Mbit/s

99 SEK/month

99 SEK/month

0 SEK/month



International calls from Sweden

Service

Price

Call set-up fee

0,53 SEK/call

Nordic region

0,89 SEK/minute

Europe 1/World 1

1,07 SEK/minute

Europe 2/World 2

1,97 SEK/minute

World 3

4,49 SEK/minute

World 4

8,91 SEK/minute



Offer

Service

Quantity

One-time fee

Monthly fee

Comments



TELIA MOBILT BREDBAND FÖRETAG (Number of users: 30, Agreement period: 36 months)















Mobilt Bredband Företag 20 GB

5

0 SEK

189 SEK





Mobilt Bredband Företag 50 GB

5

0 SEK

259 SEK





Mobilt Bredband Företag 500 GB

5

0 SEK

359 SEK





Mobilt Bredband Företag 1000 GB

5

0 SEK

419 SEK















Total





0 SEK

6 130 SEK







Offer

Service

Quantity

One-time fee

Monthly 

fee

Comments



Telia operator connect (Number of users: 30, Agreement period: 36 months)



















Main Subscription











Mobile User

7

0 SEK

79 SEK





Service Number

7

0 SEK

84 SEK





Onboarding fees











Guided Pilot

7

33 150 SEK

0 SEK















Total





232 050 SEK

1 141 SEK







Offer

Service

Quantity

One-time 

fee

Monthly fee

Comments



TELIA BREDBAND PLUS 24 - MONTHS BINDING TIME (Number of sites: 30, Agreement period: 24 months)















Bredband Plus 100 Mbit/s

5

0 SEK

1 362 SEK















Total





0 SEK

6 810 SEK



Offer

Service

Quantity

One-time 

fee

Monthly fee

Comments



TELIA BREDBAND PRO 24 - MONTHS BINDING TIME (Number of sites: 30, Agreement period: 36 months)















Bredband Pro 100 Mbit/s

7

5 000 SEK

1 672 SEK





Add-on Enhanced SLA











Bredband Pro SLA C4

7

0 SEK

1 314 SEK





Bredband Pro SLA C8

7

0 SEK

986 SEK















Total





35 000 SEK

27 804 SEK



Offer

Service

Quantity

One-time 

fee

Monthly fee

Comments



TELIA DATANET 36 - MONTHS BINDING TIME (Number of sites: 30, Agreement period: 36 months)















Access Multi 100 Mbit/s

7

0 SEK

1 902 SEK





Access Multi 1 Gbit/s

7

0 SEK

6 502 SEK





Add-on Enhanced SLA











Datanet SLA C4

7

0 SEK

1 095 SEK















Total





0 SEK

66 493 SEK





Offer

Service

Quantity

One-time 

fee

Monthly 

fee

Comments



NETWORK EXPANSION AND DELIVERY FEES FOR ACCESS

The monthly fee will be included in the total monthly fee for the current site.

















EVENEMANGSGATAN  18 

 SOLNA



Primary Access

1

100 SEK

10 SEK





EVENEMANGSGATAN  18 

 SOLNA



Secondary Access

1

200 SEK

20 SEK





EVENEMANGSGATAN  24 

 SOLNA



Primary Access

1

100 SEK

10 SEK





EVENEMANGSGATAN  24 

 SOLNA



Secondary Access

1

200 SEK

20 SEK

















Total







600 SEK

60 SEK













COMMENTS



TOTAL



Test Automation Kommentarer offert







TOTAL ONE -TIME FEE 1

267 650 SEK



TOTAL MONTHLY FEE

113 640 SEK













1 Total one-time fee displays the actual cost after deducted one-time fee.

Ordering services according to the prices above assumes that you have a Framework Agreement with Telia. If you already have a Framework Agreement, contact Telia to order. If you do not have a Framework Agreement, the next step is to sign a Framework Agreement specifying which services shall be included and the terms and conditions. 



Sites



Site                                                                                                                                                                                                             

SLA C4 MÖJLIGT

EVENEMANGSGATAN 18 SOLNA                                                                                                                  

Ja

EVENEMANGSGATAN 24 SOLNA                                                                                                                  

Ja`;
  await utilityFunctionLocal.VerifyQuoteWordDocumentContent(page, expectedText);



  //LTAT-32328 - SFI upgrade issue
  await page.goto(secretsData.get("environmentURL") + "/" + ContractID);

  //Verify contract pdf content
var expectedText = `Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumber}
Referens-ID: ${ContractNumber}1
Changes in Appendix 2 – Customer unique prices 
RA-${ActiveContractNumber}
By signing this document, the Customer confirms the following change in the content of Appendix 2*. The 
change may consist of the parties agreeing on new Services and prices or changes to prices for existing 
Services. Other than the changes described below, the content of Appendix 2* applies unchanged.
(* If you have a framework agreement signed before 2023-05-14, then this Appendix shall be considered 
as a new Appendix 5)
Services highlighted in blue have changed and services highlighted in green are additions to the 
agreement.
Customer unique commercial terms
Price comparison
The Parties’ intention is that the agreed pricing shall be market competitive. Telia shall, at the request of 
the Customer, conduct a price review once every calendar year. The first time a price review may be 
conducted is twenty four (24) months after signing of this Agreement. The scope of the price review is to 
compare the Customer’s pricing with the pricing in comparable Frame Agreements. Based on the 
comparison, the Parties may agree to change the agreed prices – however, new prices will not be applied 
retroactively. If the Parties cannot agree upon new prices, the agreed prices shall continue to apply.

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumber}
Referens-ID: ${ContractNumber}2
Telia Jobbmobil och Mobilt Bredband Företag
Service-specific 
Term
${ContractStartDate} – ${ContractEndDate}
Volume 
commitment
Base level: 30
Special conditions The Customer Unique Prices specified in Appendix 2 apply to all the Telia-
subscriptions that the Customer has at the start of the Service-specific Term and 
to each new Telia Jobbmobil subscription that the Customer signs-up for during 
the Service-specific Term.
Telia Jobbmobil according to Appendix 2 replaces equivalent subscriptions and 
services in Appendix 2. It is thus only possible to order subscriptions and services
according to Appendix 2 for Telia Jobbmobil during the Service-specific Term.
The Customer Unique Prices are valid from the start of the Service-specific Term,
provided that the signed Appendix 2 is received by Telia no later than ten (10) 
working days before the beginning of the Service-specific Term.
The Customer Unique Prices are based on a base level agreed between the 
Parties. The base level (Base Level) means the number of mobile subscriptions 
that the Customer and Eligible Companies, agree to uphold under the 
Framework Agreement during the Service-specific Term. The Customer shall be 
compliant with the Base Level requirement no later than three (3) months after 
the start of the Service-specific Term.
If the number of subscriptions at any time during the Service-specific Term is less
than seventyfive (75) per cent of the Base Level, Telia is entitled, for each 
calendar month that the number of subscriptions is less than seventyfive (75) per
cent of the Base Level, to charge a fee per subscription for the difference 
between the actual number of subscriptions and the number of subscriptions 
according to the Base Level. The fee is SEK 300 (excluding VAT) per 
subscription per calendar month.
Payment terms for Jobbmobil are fortyfive (45) days. 
 Telia will not charge an invoice fee for paper invoice for Jobbmobil, but for a 
climate smarter option we recommend the digital alternative. Log in to 
MyBusiness to register for e-invoice or contact our helpdesk.
Version of Service 
Description
Functional description (click here) v.2.0
Telia Jobbmobil
Surf, talk, send sms and mms at same price in countries within the EU/EEA as within Sweden 
1, 2
Subscription 
2, 3, 4
One-time feeMonthly fee
Jobbmobil 50 GB0 SEK241 SEK
Jobbmobil Obegränsad0 SEK459 SEK
Voice callsCall set-up feeCharge per minute
Voice calls Swedish Telia mobile subscriptions, to 
voicemail and to fixed telecom networks 
1, 6, 8
0 SEK/call0 SEK 
12
Voice calls to other Swedish mobile subscriptions 
1,6,9
0 SEK/call0 SEK 
12

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumber}
Referens-ID: ${ContractNumber}3
Messages to Swedish phone numbers 
1, 11
Charge per message
SMS, 24 hours0 SEK 
13
MMS, 24 hours0 SEK 
13
Additional services, to abroad and footnotes for Jobbmobil
Services includedActivationServices includedActivation
Caller Identificationfrom startSmsFrom start
Multiple Callsfrom startMmsFrom the device
Missed Call Alertsfrom start
International call 
barring
in MyBusiness
Call Waitingfrom the device
Premium rate call 
barring
in MyBusiness
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
Till Grannland 
Företag
18
in MyBusiness49SEK/month
Till Utland Företag
18
in MyBusiness19SEK/month
Res Söderut
19
in MyBusiness19SEK/month
Res Västerut
19
in MyBusiness19SEK/month
Res Österut
19
in MyBusiness19SEK/month
Subscription Specific Services
Jobbmobil 30-50 GBJobbmobil 80-Unlimited Jobbmobil Unlimited Plus
Not Selected
Surf i utlandet199 SEK/month199 SEK/month  - SEK/month
Samtal i utlandet199 SEK/month199 SEK/month  - SEK/month
Maxhastighet 1500Mbit/s99 SEK/month99 SEK/month  0 SEK/month
International calls from Sweden 
21
Charges
Charges with the 
serviceTill Utland 
Företag
Call set-up fee0,59 SEK/call0,49 SEK/call
Nordic region: Denmark, Finland, Norway 0,99 SEK/minute0.59 SEK/minute
Europe 1: Belgium, Bulgaria, Cyprus, Estonia, France, Greece, 
Ireland, Iceland, Italy including the Vatican State, Croatia, 
Latvia, Liechtenstein, Lithuania, Luxemburg, Malta, Monaco, 
The Netherlands, Poland, Portugal, Roumania, Switzerland, 
Slovakia, Slovenia, Spain, The United Kingdom, The Czech 
Republic, Germany, Hungary, Austria
Global 1: Australia, Hong Kong, Japan, Canada, China, New 
Zealand, Singapore, South Korea, Taiwan, Thailand, USA
1,19 SEK/minute0,99 SEK/minute

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumber}
Referens-ID: ${ContractNumber}4
Europe 2: Albania, Andorra, Bosnia-Herzegovina, Faroe 
Islands, Gibraltar, Macedonia, Moldova, Montenegro, Russia, 
San Marino, Serbia, Turkey, Ukraine
Global 2: Argentina, Azerbaijan, Brazil, Chile, Dominican 
Republic, Egypt, Georgia, India, Indonesia, Israel, Kazakhstan, 
Malaysia, Mexico, Nepal, South Africa, Tajikistan, Uzbekistan
2,19 SEK/minute1,99 SEK/minute
Global 3: Afghanistan, Algeria, Angola, Anguilla, Antigua and 
Barbuda, Armenia, Aruba, Bahamas, Bahrain, Bangladesh, 
Barbados, Belize, Benin, Bermuda, Bhutan, Bolivia, Botswana, 
Brunei, Burkina Faso, Burundi, Cayman Islands, Comoros, 
Central African Republic, Colombia, Costa Rica, Djibouti, 
Dominica, Ecuador, Equatorial Guinea, Ivory Coast, El 
Salvador, Eritrea, Ethiopia, Fiji, Philippines, French Guiana, 
French Polynesia, United Arab Emirates, Gabon, Gambia, 
Ghana, Guadeloupe, Guam, Guinea, Grenada, Greenland, 
Guatemala, Guyana, Haiti, Honduras, Iraq, Iran, Jamaica, 
Jordan, Cambodia, Cameroon, Kenya, Kyrgyzstan, Congo, 
Congo Democratic Republic, Kosovo, Cuba, Kuwait, Laos, 
Lebanon, Libya, Morocco, Martinique, Mongolia, 
Mozambique, Myanmar, Namibia, Nicaragua, Niger, Nigeria, 
Oman, Pakistan, Palestine, Panama, Paraguay, Peru, Qatar, 
Rwanda, Saudi Arabia, Senegal, Sri Lanka, Sudan, Suriname , 
South Sudan, Syria, Tanzania, Chad, Togo, Trinidad and 
Tobago, Tunisia, Turkmenistan, Uganda, Uruguay, Venezuela,
Vietnam, Belarus, Yemen, Zambia, Zimbabwe
4,99 SEK/minute4,99 SEK/minute
Global 4: U.S. Virgin Islands, American Samoa, Ascension, 
Antarctica, British Virgin Islands, Cook Islands, Diego Garcia, 
Falkland Islands, Guinea-Bissau, Cape Verde Islands, Kiribati, 
Lesotho, Liberia, Macao, Madagascar, Malawi, Maldives, Mali, 
Marshall Islands, Mauritania, Mauritius, Mayotte, Micronesia, 
Montserrat, Nauru, Dutch Antilles, Niue, North Korea, 
Northern Mariana Islands, New Caledonia, Palau, Papua New 
Guinea, Puerto Rico, Reunion, Saint Lucia, Saint Helena, Saint 
Kitts and Nevis , Saint Pierre and Miquelon, Saint Vincent and 
the Grenadines, Samoa, Sao Tomé and Principe, Seychelles, 
Sierra Leone, Sint Maarten, Swaziland, Tonga, Solomon 
Islands, Somalia, Tokelau, Turks and Caicos Islands, Tuvalu, 
Vanuatu, Wallis and Futuna Islands, East Timor
9,90 SEK/minute9,90 SEK/minute
Messages from Sweden to abroad 
20
Charge per 
message
Charges with the 
service Till Utland 
Företag
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
 Jobbmobil <10 GB: Data speed in 3G: <32 Mbit/s, normal speed 2-10 Mbit/s. Data speed in 4G and 5G: <100 Mbit/s, normal speed 10-40 Mbit/s.
Jobbmobil 10 GB and larger surf limits: Data speed in 3G: <32 Mbit/s, normal speed 2-10 Mbit/s. Data speed in 4G and 5G: < 300 Mbit/s, normal
speed 20-60 Mbit/s.
If the monthly allowance is exceeded, the possibility to surf will be throttled. There is an option to buy more data to avoid throttling. More 
information about data services and how to buy additional data is found at www.telia.se/jobbmobil 
Jobbmobil Obegränsad: Data speed in 3G: <32 Mbit/s, normal speed 2-10 Mbit/s. Data speed in 4G and 5G: < 300 Mbit/s, normal speed 20-60 
Mbit/s. 
Jobbmobil Obegränsad Plus: Data speed in 3G: <32 Mbit/s, normal speed 2-10 Mbit/s. Data speed in 4G and 5G: < 1 500 Mbit/s, normal speed 
20-60 Mbit/s.
In case the consumption for Jobbmobil Obegränsad and Jobbmobil Obegränsad Plus reaches 1TB, the speed is limited to 3Mbit/s.

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumber}
Referens-ID: ${ContractNumber}5
5
 In case another Surf Option is chosen, this will replace the Basic service Jobbsurf Bas. 
Jobbsurf <15GB: Data speed in 3G: <32 Mbit/s, normal speed 2-10 Mbit/s. Data speed in 4G and 5G:  <100 Mbit/s, normal speed 10-40 Mbit/s. 
Jobbsurf 15GB and larger surf limits: Data speed in 3G: <32 Mbit/s, normal speed 2-10 Mbit/s. Data speed in 4G and 5G:  < 300 Mbit/s, normal 
speed 20-60 Mbit/s.
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
 Number reservation is free for one (1) year after the reservation date, after which 100 SEK/number and year in case the Customer wants to extend
their reservation.
21
 Price list for international calls and messages only applies on calls/messages from Sweden. For calls/messages made/sent from other EU/EEA-
countries to countries outside the EU/EEA and from any country outside the EU/EEA roaming charges from respective country will apply. For 
more information, visit www.telia.se/foretag/utomlands
Telia Mobilt Bredband Företag
Subscription 
1, 2, 3
Maximum speedOne-time feeMonthly fee
Mobilt Bredband Företag 20 GB< 300 (Mbit/s) 
4
0 SEK189 SEK
Mobilt Bredband Företag 50 GB< 300 (Mbit/s) 
4
0 SEK259 SEK
Mobilt Bredband Företag 500 GB< 300 (Mbit/s) 
4
0 SEK359 SEK
Mobilt Bredband Företag 1000 GB< 300 (Mbit/s) 
4
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
 

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumber}
Referens-ID: ${ContractNumber}6
Telia Operator Connect
Service-specific Term${ContractStartDate} – ${ContractEndDate}
Volume commitmentBase level: 30
Special conditionsIn order to receive agreed prices, Eligible Companies must order through the 
Customer's sales representative at Telia. 
The Customer Unique Prices are based on a base level for Operator Connect 
agreed between the Parties. The base level for Operator Connect refers to the 
number of users that the Customer and Eligible Companies, agree to uphold under
the Framework Agreement during the Service-specific Term. The Customer shall 
be compliant with the Base Level requirement no later than three (3) months after 
the start of the Service-specific Term.
If the number of users at any time during the Service-specific Term is less than 
seventyfive (75) percent of the Operator Connect, Telia is entitled, for each 
calendar month that the number of users is less than seventyfive (75) percent of 
the Base Level Smart Connect, to charge a fee per user for the difference between 
the actual number of users and the number of users according to Operator 
Connect. The fee is SEK 50 (excluding VAT) per user per calendar month.
Payment terms for Operator Connect are fortyfive (45) days. 
Telia will not charge an invoice fee for paper invoices for Operator Connect, but for
a climate smarter option we recommend the digital alternative. Log in to 
MyBusiness to register for e-invoice or contact our helpdesk.
Version of Service 
Description
For Functional Description (Press here
8
) v.1.0
For Service Specification (Press here
9
) v.1.0
For Detailed Service Description (Press here
10
) v.1.0
Main Subscriptions 
1,2,3
Monthly fee
Mobile User79 SEK
Fixed User39 SEK
Service Number84 SEK
Onboarding Fees 
4,5,6
One-time feeMonthly fee
Onboarding Fee5 000 SEK0 SEK
Guided Pilot33 150 SEK0 SEK
Teams Consulting, Per hour1 290 SEK0 SEK
Number SeriesOne-time feeMonthly fee
Port-in existing number Series 0 SEK0 SEK
1 single number 200 SEK0 SEK
Block of 10 numbers 1 000 SEK0 SEK
Block of 100 numbers 3 000 SEK0 SEK
Block of 1000 numbers 9 000 SEK0 SEK
Footnotes Operator Connect
1.Mobile Teams User is an add on to the Telia Mobile Subscription for Businesses, which means a Mobile subscription (like Telia JobbMobil) 
needs to be purchased separately and all calls that the user makes from Teams will be charged according to that price plan.
2.Service Number is used for Teams Call Queues or Teams Auto Attendants (IVR). The sales object Service number includes one fixed number 
with a dimensioned capacity of 10 simultaneously calls. If the customer needs higher capacity per Service Number, the customer needs to 
inform Telia in the delivery phase. The phone numbers that shall be configured as a Service Numbers needs to be specified in the 
order/delivery.
3.The minimum numbers of users (Mobile & Fixed Number users) for the initial order needs to be 10 or more.
4.Onboarding fee includes:
- Onboarding of one customer Teams tenant to Telia's service.

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumber}
Referens-ID: ${ContractNumber}7
- Port-In existing number series from other operator (or other services at Telia)
- Provisioning of numbers and call profiles to customers "Teams Admin Center".
- Getting started guide for how to assign users for calling in Teams
- One delivery occasion. If several occasions are needed for activation of numbers over a time period, a 
- Reconfiguration fee is needed for each occasion.
5.Guided pilot by Telia includes a 60 days pilot period for up to 30 users. The users can be a mix of the Main Subscriptions. The main 
subscriptions and traffic fees generated in the pilot will be charged according to above routines. If the customer doesn't want to continue after
the pilot period these needs to be terminated within 15 days.
6.If configuration help is needed in Microsoft Teams Admin Center, a technical specialist from Telia can be offered. It can for example be 
migration of a large number of users/settings, initiating Call Queues, or configuration of telephones. The work will be charged per hour
7.https://www.telia.se/dam/jcr:60352ced-382f-40e6-b7f8-0182e3298c7b/functional-description-telia-teams-operator-connect.pdf   
8.https://www.telia.se/dam/jcr:682833f4-5f46-40b0-9ac8-44200ff79874/service-specification-telia-teams-operator-connect.pdf     
9.https://www.telia.se/dam/jcr:a11d606b-1b56-4530-8347-8e5e78a5264b/detailed-service-description-telia-teams-operator-connect.pdf   
Fees for Telia Operator Connect additional traffic
Call traffic between users and groups in the solution is free of charge within Sweden. This also applies to 
call traffic to the service's voicemails. In the case of outbound traffic from connected mobile users, the 
mobile subscription call fees apply.
Additional traffic will be charged as below. Additional traffic includes traffic if you forward a service 
number to an external number or for outgoing calls from a fixed user to an external number. 
Call charges 
1, 2
Calls to fixed telecom networks and Telia’s mobile subscriptions
- around the clock0,39 SEK/min 
- opening fee0,45 SEK/call
Calls to other mobile subscriptions within Sweden 
1, 2
- around the clock0,39 SEK/min
- opening fee0,45 SEK/call
Calls abroad 
According to the abroad price list for agreement customers 
Footnotes Operator Connect additional traffic
1. Does not apply to calls to intermediary services such as number information, toll number (e.g. 099, 0771, 077, 0900, 0939, 0944).
2. Charge per 60-second intervall.

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumber}
Referens-ID: ${ContractNumber}8
Network access and services  
Volume 
commitment
30 site(s)
Special conditionsNetwork access and services in this appendix can be agreed with a binding time 
during which the Customer undertakes to pay for the services for a certain 
period, in accordance with current prices in Appendix 2.
Eligible companies with Network access and services signed before the start of 
the Service-specific Term have the right to renegotiate the existing solution and 
obtain agreed prices and conditions (Appendix 2) by contacting responsible 
seller at Telia.
 Payment terms for Network access and services are  fortyfive (45)days. This also
applies to Eligible Companies that are included in the Framework Agreement at 
its creation. 
Telia Bredband Pro
Service-specific 
Term
${ContractStartDate} – ${ContractEndDate}
Version of Service 
Description
For the Detailed service description (click here
5
)
Service 
1
Monthly fee
Bredband Pro 100 Mbit/s1 221 SEK
The monthly fee for the services above applies at 12, 24 or 36 months binding time.
The one-time fee forBredband Pro 100 Mbit/s up to 10 Gbit/s is SEK 10 000 at 12 months, SEK 5 000 at 
24 months, and SEK 0 at 36 months binding time. 
The one-time fee for Bredband Pro Wireless Basic is SEK 5 000 at 12 months, SEK 2 500 at 24 months, 
and SEK 0 at 36 months binding time.
Add-on Secondary AccessMonthly fee
Bredband Pro 100 Mbit/s – Secondary Access4 350 SEK
Bredband Pro 200 Mbit/s – Secondary Access4 350 SEK
Bredband Pro 500 Mbit/s – Secondary Access4 350 SEK
Bredband Pro 1 Gbit/s – Secondary Access6 000 SEK
Bredband Pro 2 Gbit/s – Secondary Access8 000 SEK
Bredband Pro 5 Gbit/s – Secondary Access8 000 SEK
Bredband Pro 10 Gbit/s – Secondary Access8 000 SEK
The monthly fee for the services above applies at 12, 24 or 36 months binding time.
    The one-time fee is SEK 10 000 for 12 months, SEK 5 000 for 24 months, and SEK 0 for 36 months 
binding time.                                       
Add-on Backup 
2
Monthly fee
Bredband Pro Wireless Premium Backup 100 Mbit/s1 350 SEK
Bredband Pro Wireless Premium Backup 250 Mbit/s1 850 SEK

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumber}
Referens-ID: ${ContractNumber}9
Bredband Pro Wireless Premium Backup 500 Mbit/s2 750 SEK
Bredband Pro Wireless Basic Backup1 200 SEK
Bredband Pro Wireless Basic Backup Combo CPE400 SEK
The monthly fee for the services above applies at 12, 24 or 36 months binding time.
The one-time fee forBredband Pro Wireless Basic Backup is SEK 5 000 at 12 months, SEK 2 500 24 
months, and SEK 0 at 36 months binding time. 
The one-time fee for Bredband Pro Wireless Basic Backup Combo CPE is 3 000 at 12 months,  SEK 1 500 
at 24 months, and SEK 0 at 36 months binding time.
Add-on Enhanced SLA
4
One-time feeMonthly fee
Bredband Pro SLA C40 SEK
1 314 SEK
Bredband Pro SLA C80 SEK
986 SEK
Bredband Pro SLA D150 SEK
2 000 SEK
Installation and Other Add-ons
 3
One-time feeMonthly fee
Bredband Pro Quick Launch Wireless 
Premium Termination 100 Mbit/s
10 000 SEK1 950 SEK
Bredband Pro Quick Launch Wireless 
Premium Termination 250 Mbit/s
10 000 SEK2 550 SEK
Bredband Pro Quick Launch Wireless 
Premium Backup 100 Mbit/s
0 SEK1 350 SEK
Bredband Pro Quick Launch Wireless 
Premium Backup 250 Mbit/s
0 SEK1 850 SEK
Bredband Pro Quick Launch Wireless 
Premium Backup 500 Mbit/s
0 SEK2 750 SEK
Bredband Pro QoS Real Time 10 Mbit/s1 000 SEK500 SEK
Bredband Pro QoS Real Time 20 Mbit/s1 000 SEK1 000 SEK
Bredband Pro QoS Real Time 50 Mbit/s1 000 SEK2 200 SEK
Bredband Pro QoS Real Time 100 Mbit/s1 000 SEK4 200 SEK
Bredband Pro QoS Real Time 200 Mbit/s1 000 SEK6 300 SEK
Bredband Pro QoS Basic1 000 SEK0 SEK
Bredband Pro Quick Launch Termination10 000 SEK1 700 SEK
Bredband Pro Quick Launch Backup0 SEK1 200 SEK
Bredband Pro Quick Launch Combo 
Backup
0 SEK400 SEK
Connection in Real Estate Networks7 500 SEK0 SEK
The monthly fee for Bredband Pro Quick Launch Backup and Bredband Pro Quick Launch Combo Backup
apply at 12, 24 or 36 months binding time. 
The one-time fee for Bredband Pro Quick Launch Backup is SEK 5 000 at 12 months, and SEK 2 5000 at 
24 and SEK 0 at 36 months binding time.
The one-time fee for Bredband Pro Quick Launch Combo Backup is SEK 3 000 at 12 months, and SEK 1 
500 at 24 and SEK 0 at 36 months binding time.
Footnotes Telia Bredband Pro
1.Before delivery to a site, a pre-check needs to be performed. Network expansion costs may apply at the time of ordering, which are 
communicated before ordering.
2.Bredband Plus 4G Backup Combo CPE can only be called-off when ordering a new access.
3.When ordering the service Connection in Real Estate Networks for fiber connections, Telia performs a site visit before the delivery date to ensure
that the work can be carried out. If the cost exceeds the fixed price of SEK 7500, a quote on work and materials will be received. Thus, additional
costs may apply. Read more about what is included in the fixed price at: telia.se/anslutningifastighetsnat.
4.Variations in regional availability of SLA C4 may occur. If SLA C4 is not available, SLA C8 is delivered. Prerequisites are checked for availability at 
the current address
5.https://creativehub.teliacompany.com/m/78fa704445c9bbff/original/Detailed-Service-Description-Telia-Prolane.pdf 

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumber}
Referens-ID: ${ContractNumber}10
Telia Bredband Plus
Service-specific 
Term
2024-02-15 – 2026-02-15
Service 
1
Monthly fee
Bredband Plus 100 Mbit/s1 362 SEK
The Monthly fee for the services above apply at 0 or 24 Months binding time. 
The one-time fee is SEK 1 500 for 1 Month and SEK 0 for 24 Months binding time.
Add-on Backup 
2
Monthly fee
Bredband Plus 4G Backup895 SEK
Bredband Plus 4G Backup Combo CPE200 SEK
The Monthly fee for the services above apply at 0 or 24 Months binding time.
The one-time fee for Bredband Plus 4G Backup is SEK 1 500 at 1 Month and SEK 0 at 24 Months binding 
time.
The one-time fee for Broadband Plus 4G Backup Combo CPE is SEK 1 000 at 1 Month and SEK 700 at 24 
Months binding time.
Installation and Other Add-ons 
3
One-time feeMonthly fee
Bredband Plus QoS Real Time 1 Mbit/s0 SEK200 SEK
Bredband Plus QoS Real Time 3 Mbit/s0 SEK300 SEK
Bredband Plus Quick Launch 
Termination
1 500 SEK1 200 SEK
Bredband Plus Quick Launch Backup1 500 SEK800 SEK
Bredband Plus Quick Launch Combo 
Backup
1 500 SEK200 SEK
Connection in Real Estate Networks7 500 SEK0 SEK
Technician installation is included.
Footnotes Telia Bredband Plus
1
 Access via fiber. Can be offered to most properties in Sweden. Before delivery to a site, a pre-check 
needs to be performed. Network expansion costs may apply at the time of ordering, which are 
communicated before ordering.
2
 Bredband Plus 4G Backup Combo CPE can only be called-off when ordering a new access.
3
 When ordering the service Connection in Real Estate Networks for fiber connections, Telia performs a 
site visit before the delivery date to ensure that the work can be carried out. If the cost exceeds the 
fixed price of SEK 7500, a quote on work and materials will be received. Thus, additional costs may 
apply. Read more about what is included in the fixed price at: telia.se/anslutningifastighetsnat.
Telia Datanet
Service-specific 
Term
${ContractStartDate} – ${ContractEndDate}
Version of Service 
Description
For the Functional description (click here
6
) v.5.0
For the Service specification (click here
7
) v.10.0

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumber}
Referens-ID: ${ContractNumber}11
For the Detailed service description (click here
8
) v.16.0
Service 
1
Monthly fee
Access Multi 100 Mbit/s1 388 SEK
Access Multi 1 Gbit/s4 746 SEK
The monthly fee for the services above applies at 12, 24 or 36 months binding time.
The one-time fee for Access Multi is SEK 6 000 at 12 months, SEK 5 000 at 24 months, and SEK 0 at 36 
months binding time.
The one-time fee forWireless Basic is SEK 3 000 at 12 months, SEK 2 500 at 24 months, and SEK 0 at 36 
months binding time.
Add-on Backup 
2
Monthly fee
Wireless Premium Backup 100 Mbit/s
1 350 SEK
Wireless Premium Backup 250 Mbit/s
1 850 SEK
Wireless Premium Backup 500 Mbit/s
2 750 SEK
Wireless Basic Backup1 200 SEK
Wireless Basic Backup Combo CPE400 SEK
The monthly fee for the services above applies at 12, 24 or 36 months binding time.
The one-time fee forWireless Basic Backup is SEK 3 000 at 12 months, SEK 2 500 at 24 months, and SEK 
0 at 36 months binding time.
The one-time fee for Wireless Basic Backup Combo CPE is SEK 1 500 at 12 months, and SEK 0 at 24 and 
36 months binding time.
Add-on Secondary AccessMonthly fee
Access Multi 10 Mbit/s – Secondary Access3 000 SEK
Access Multi 100 Mbit/s – Secondary Access3 000 SEK
Access Multi 200 Mbit/s – Secondary Access4 000 SEK
Access Multi 500 Mbit/s – Secondary Access6 000 SEK
Access Multi 1 Gbit/s – Secondary Access6 000 SEK
Access Multi 2 Gbit/s – Secondary Access10 000 SEK
Access Multi 5 Gbit/s – Secondary Access18 000 SEK
Access Multi 10 Gbit/s – Secondary Access18 000 SEK
The monthly fee for the services above applies at 12, 24 or 36 months binding time.
The one-time fee is SEK 6 000 at 12 months, SEK 5 000 at 24 months, and SEK 0 at 36 months binding 
time. 
Add-on Enhanced SLA
5
One-time feeMonthly fee
Datanet SLA C40 SEK
1 095 SEK
Datanet SLA C80 SEK
1 500 SEK
Datanet SLA D150 SEK
2 000 SEK

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumber}
Referens-ID: ${ContractNumber}12
Add-on Service Center Connection (SCC)One-time feeMonthly fee
SCC ACE0 SEK0 SEK
SCC Cloud Connect 100 Mbit/s10 000 SEK5 250 SEK
SCC Cloud Connect 300 Mbit/s10 000 SEK8 700 SEK
SCC Cloud Connect 500 Mbit/s10 000 SEK11 500 SEK
SCC Cloud Connect 1 Gbit/s10 000 SEK17 900 SEK
SCC Cygate0 SEK0 SEK
SCC Managed Security 10 Mbit/s0 SEK500 SEK
SCC Managed Security 100 Mbit/s0 SEK2 500 SEK
SCC Managed Security 300 Mbit/s0 SEK2 900 SEK
SCC Managed Security 500 Mbit/s0 SEK3 300 SEK
SCC Managed Security 1 Gbit/s0 SEK4 500 SEK
SCC SIP Entry0 SEK0 SEK
SCC vPBX Telco Cloud0 SEK0 SEK
SCC TPP/MUCA0 SEK0 SEK
Installation and Other Add-ons 
3, 4
One-time feeMonthly fee
Quick Launch Termination Wireless 
Premium 100 Mbit/s
10 000 SEK1 950 SEK
Quick Launch Termination Wireless 
Premium 250 Mbit/s
10 000 SEK2 550 SEK
Quick Launch Backup Wireless Premium 
100 Mbit/s
0 SEK1 350 SEK
Quick Launch Backup Wireless Premium 
250 Mbit/s
0 SEK1 850 SEK
Quick Launch Backup Wireless Premium 
500 Mbit/s
0 SEK2 750 SEK
SNMP read access1 000 SEK0 SEK
Multiple VPN0 SEK1 000 SEK
Internet Access on Customer Connection2 000 SEK0 SEK
QoS Real Time 1 Mbit/s1 000 SEK140 SEK
QoS Real Time 10 Mbit/s1 000 SEK500 SEK
QoS Real Time 20 Mbit/s1 000 SEK900 SEK
QoS Real Time 50 Mbit/s1 000 SEK2 200 SEK
QoS Real Time 100 Mbit/s1 000 SEK3 500 SEK
QoS Real Time 200 Mbit/s1 000 SEK6 300 SEK
QoS Basic1 000 SEK0 SEK
QoS Premium1 000 SEK0 SEK
Quick Launch Termination10 000 SEK1 700 SEK
Quick Launch Backup0 SEK1 200 SEK
Quick Launch Combo Backup0 SEK400 SEK
Stat Bas1 000 SEK25 SEK
Stat QoS1 000 SEK25 SEK
Stat CoS1 000 SEK15 SEK
Connection in Real Estate Networks7 500 SEK0 SEK

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumber}
Referens-ID: ${ContractNumber}13
The monthly fee for Quick Launch Termination, Quick Launch Backup and Quick Launch Combo Backup 
apply at 12, 24 or 36 months binding time.
The one-time fee for Quick Launch Termination is SEK 6 000 at 12 months, SEK 3 000 at 24 months, and 
SEK 1 500 at 36 months binding time.
The one-time fee for Quick Launch Backup and Quick Launch Combo Backup is SEK 3 000 at 12 months, 
SEK 1 500 at 24 months, and SEK 0 at 36 months binding time.
Footnotes Telia Datanet
1.Before delivery to a site, a pre-check needs to be performed. Network expansion costs may apply at the time of ordering, which are 
communicated before ordering.
2.Bredband Plus 4G Backup Combo CPE can only be called-off when ordering a new access.
3.When ordering Internet Access on Customer Connection, a central Firewall in Datanet is required at an additional cost. The cost depends on the 
selected internet capacity. 
4.When ordering the service Connection in Real Estate Networks for fiber connections, Telia performs a site visit before the delivery date to ensure
that the work can be carried out. If the cost exceeds the fixed price of SEK 7500, a quote on work and materials will be received. Thus, additional
costs may apply. Read more about what is included in the fixed price at: telia.se/anslutningifastighetsnat.
5.Variations in regional availability of SLA C4 may occur. If SLA C4 is not available, SLA C8 is delivered. Prerequisites are checked for availability at 
the current address
6.https://creativehub.teliacompany.com/m/7e5e83aa05696688/original/Functional-Description-TELIA-DataNet.pdf 
7.https://creativehub.teliacompany.com/m/997aa9cf12ca0e4/original/Service-Specification-TELIA-DataNet.pdf 
8.https://creativehub.teliacompany.com/m/6566257b836ac8d5/original/Detailed-Service-description-TELIA-DataNet.pdf

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumber}
Referens-ID: ${ContractNumber}14
Place & Date
 
Customer’s signature (authorised signatory)
 
Name printed`;
  await utilityFunctionLocal.VerifyContractPDFDocumentContent(page, expectedText);


  //Verify contract pdf content
var expectedText = `Telia Sverige AB, SE-169 94 Solna 
Registered office: Stockholm
Corporate reg. no. 556430–0142, VAT reg. no. SE556430014201
Framework Agreement ID: RA-${ActiveContractNumber}
Reference ID: ${ContractNumber}1
Order
#${FAQuoteNumber}
This document details an order of Services according to Framework Agreement RA-
${ActiveContractNumber}.
The services, fees and quantities specified in the order follows the special terms in the Framework 
Agreement.
The order has been agreed between the following parties:
Telia (hereinafter called Telia)Company (hereinafter called the Customer)
Telia Sverige AB 5564300142Dägt PHBC 90453 AB 5565198461
SupplierCorporate 
registration number
CustomerCorporate 
registration number
Stjärntorget 116956Box 12086, 15117504840241
AddressPostcodeAddressPostcode
Solna GÖTEBORG 
Place
 
Place
 
Soho Ds SalesRep
+91 
9505225143Test Yogesh Jadhav
SellerTelephone numberContact personTelephone number
dhanashri.ronge@teliacompany.co
m yogesh.jadhav@teliacompany.com 
E-mail
  
E-mail
  
This document is only valid if Framework Agreement RA-${ActiveContractNumber}  is signed by both parties. 
Ordering of Service is carried out when the document is signed. The Customer commits to provide 
supplementary information for the ordering to Telia if necessary. 

Telia Sverige AB, SE-169 94 Solna 
Registered office: Stockholm
Corporate reg. no. 556430–0142, VAT reg. no. SE556430014201
Framework Agreement ID: RA-${ActiveContractNumber}
Reference ID: ${ContractNumber}2
Network Access and Services
Delivery time
Telia estimates that delivery of Network access and services will take place as soon as possible after 
this document is signed, provided that Telia has received the necessary delivery information from the 
Customer. Detailed information about what is required for delivery can be found in the service 
description for each ordered service, which is linked in Appendix 2 of the framework agreement.
The delivery can be delivered in partial deliveries. The delivery may be delayed if there are obstacles at
the delivery site.
The estimated delivery date will be specified in the order confirmation.
Prices
ServiceQuantityOne-time feeMonthly fee
TELIA BREDBAND PLUS 24 - MONTHS BINDING TIME
Bredband Plus 100 Mbit/s50 SEK1 362 SEK
Total0 SEK6 810 SEK 
TELIA BREDBAND PRO  24 - MONTHS BINDING TIME
Bredband Pro 100 Mbit/s75 000 SEK1 221 SEK
Add-on Enhanced SLA
Bredband Pro SLA C470 SEK1 314 SEK 
Bredband Pro SLA C870 SEK986 SEK 
Total
35 000 SE
K
24 647 SEK 
TELIA DATANET 36 - MONTHS BINDING TIME
Access Multi 100 Mbit/s70 SEK1 902 SEK
Access Multi 1 Gbit/s70 SEK6 502 SEK
Add-on Enhanced SLA
Datanet SLA C470 SEK1 095 SEK 
Total0 SEK66 493 SEK 
NETWORK EXPANSION AND DELIVERY FEES FOR ACCESS
EVENEMANGSGATAN  18 , SOLNAPrimary Access1100 SEK10 SEK 
EVENEMANGSGATAN  18 , SOLNA
Secondary 
Access
1200 SEK20 SEK 
EVENEMANGSGATAN  24 , SOLNAPrimary Access1100 SEK10 SEK 
EVENEMANGSGATAN  24 , SOLNA
Secondary 
Access
1200 SEK20 SEK 
Total600 SEK60 SEK 

Telia Sverige AB, SE-169 94 Solna 
Registered office: Stockholm
Corporate reg. no. 556430–0142, VAT reg. no. SE556430014201
Framework Agreement ID: RA-${ActiveContractNumber}
Reference ID: ${ContractNumber}3
COMMENTSTOTAL
TOTAL ONE -TIME FEE35 600 SEK
TOTAL MONTHLY FEE98 010 SEK

Telia Sverige AB, SE-169 94 Solna 
Registered office: Stockholm
Corporate reg. no. 556430–0142, VAT reg. no. SE556430014201
Framework Agreement ID: RA-${ActiveContractNumber}
Reference ID: ${ContractNumber}4
Sites
Site                                                                                                            SLA C4 MÖJLIGT
EVENEMANGSGATAN 24 , SOLNA                                                Ja
EVENEMANGSGATAN 18 , SOLNA                                                Ja

Telia Sverige AB, SE-169 94 Solna 
Registered office: Stockholm
Corporate reg. no. 556430–0142, VAT reg. no. SE556430014201
Framework Agreement ID: RA-${ActiveContractNumber}
Reference ID: ${ContractNumber}5
The Framework Agreement has been prepared in two (2) copies, with each Party receiving one copy.
 
  
 
Place & DatePlace & Date
 
  
 
Telia's signature Customer's signature (authorised signatory)
 
  
 
Name printedName printed`;
  await utilityFunctionLocal.VerifyInitialOrderPDFDocumentContent(page, expectedText);
     
  
  //Close all browserss
  await context.close();  
});



