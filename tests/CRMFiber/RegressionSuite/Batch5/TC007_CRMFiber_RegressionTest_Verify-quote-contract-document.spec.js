const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const TestCaseName = 'TC007_CRMFiber_RegressionTest';


test('TC007_CRMFiber_RegressionTest_SOHO_NewSales-Verify-quote-contract-document', async function ({ browser }) {

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
  var OpportunityID = await utilityFunctionLocal.RunSOQLQuery("select vlocity_cmt__OpportunityId__c from contract where AccountId ='" + AccountID + "' and (Status != 'Cancelled') ORDER BY CreatedDate DESC LIMIT 1");
  var ContractID = await utilityFunctionLocal.RunSOQLQuery("select id from contract where vlocity_cmt__OpportunityId__c = '" + OpportunityID + "'");
  var QuoteNumber = await utilityFunctionLocal.RunSOQLQuery("Select QuoteNumber from Quote where OpportunityId='" + OpportunityID + "'");
  var CreatedDateWithTime = await utilityFunctionLocal.RunSOQLQuery("select CreatedDate from contract where vlocity_cmt__OpportunityId__c = '" + OpportunityID + "'");
  var CreatedDate = CreatedDateWithTime.split("T")[0];
  var ContractNumber = await utilityFunctionLocal.RunSOQLQuery("select ContractNumber from contract where vlocity_cmt__OpportunityId__c = '" + OpportunityID + "'");
  var ActiveContractNumber = await utilityFunctionLocal.RunSOQLQuery("select TeliaSE_Previous_Contract_Number__c from contract where vlocity_cmt__OpportunityId__c = '" + OpportunityID + "'");
  
  await page.goto(secretsData.get("environmentURL") + "/" + OpportunityID);


  //Verify quote document content
var expectedText = `Välkommen till Telia 



Avtal för Fastighets AB Castellum Grundet 

Tv, streaming och bredband i ett nät av världsklass.

Telia Öppen Fiber

Avtal för Fastighets AB Castellum Grundet 

Tv, streaming ch bredband i ett nät av världsklass.

Med Telia Öppen Fiber får ni tillgång till en supersnabb, stabil och framtidssäkrad bredbandsanslutning. Fastighetsägare ansluts till ett av Sveriges mest kraftfulla fibernät som levererar tjänster i världsklass för tv, streaming och bredband.



Därför är Telia en bra partner

Att ansluta fastigheter till fiber är en långsiktig investering. Med längst erfarenhet på marknaden vet vi vad som krävs för att fibernätet ska hålla i decennier framöver. Vi säkerställer drift och funktionalitet av nätet dygnet runt och felsöker proaktivt för att snabbt åtgärda eventuella fel. Dessutom har vi en egen kundtjänst för er som styrelse dit ni kan vända er med alla frågor som rör fiberanslutningen.

Följande ingår i denna offert:

Vi ansluter aktuella Fastigheter till Telias Nät.  

Med Öppen Fiber har Boende/Företag valfriheten att själva välja vem som ska leverera tv, bredband och telefoni och plocka ihop ett utbud som passar just dem. 

Vi står för drift och underhåll.







Vårt Erbjudande



ERBJUDANDE

TJÄNST

ANTAL

ENGÅNGSAVGIFT

MÅNADSAVGIFT



Antal portar





Totalt antal Bostäder

777 st









Totalt antal Lokaler

0 st









Totalt antal Övriga portar

0 st







Totalt antal anslutningar



777 st







Produkter





Fastighetsanslutning med exklusivt LAN till villa

 7 st

63880.00 kr

0.00 kr per anslutning 





Fastighetsanslutning med Telia som exklusiv tjänsteleverantör

 7 st

0.00 kr

0.00 kr per anslutning 





Kollektiv Installationshjälp

 777 st

0.00 kr

0.00 kr per anslutning 





Kollektiv hårdvara - Trådlös Router

 777 st

0.00 kr

0.00 kr per anslutning 





Kollektiv hårdvara - Tv-box

 777 st

0.00 kr

0.00 kr per anslutning 





Kollektiv Telefoni

 7 st

0.00 kr

0.00 kr per anslutning 





Kollektiv TV - Lagom

 7 st

0.00 kr

10.00 kr per anslutning 





Kollektivt Bredband - 100 Mbit/s

 7 st

0.00 kr

22.00 kr per anslutning 





Fastighetsanslutning med Telia som exklusiv tjänsteleverantör

 7 st

63880.00 kr

0.00 kr per anslutning 





Fastighetsanslutning med Telia som exklusiv tjänsteleverantör

 7 st

-200.00 kr

0.00 kr per anslutning 





Kollektiv Installationshjälp

 7 st

0.00 kr

0.00 kr per anslutning 





Kollektivt Bredband - 1000 Mbit/s

 7 st

0.00 kr

34.00 kr per anslutning 





Kollektivt Bredband - 250 Mbit/s

 7 st

0.00 kr

22.00 kr per anslutning 















Summa





892920.00 kr

616.00 kr



UPPKOPPLING UTAN KRÅNGEL



SAMMANSTÄLLNING



Med våra nätverk får du en uppkoppling baserat på den senaste tekniken kombinerat med vår långa erfarenhet inom området. Vi möter dina förväntningar på en uppkoppling utan krångel.



TOTAL ENGÅNGSAVGIFT

892920.00 kr (exkl moms)                  





TOTAL MÅNADSAVGIFT

616.00 kr/mån (exkl moms)





TOTAL MÅNADSAVGIFT PER ANSLUTNING

88.00 kr/mån (exkl moms)





AVTALSTID

5 år



Leveranstid

Normal leveranstid är 4-8 månader efter det att underskriven offert kommit oss tillhanda. Kompletta adresslistor ska vara oss tillhanda senast två veckor efter underskriven offert för att vi i samråd med er ska kunna besluta om slutlig leveranstid.

Villkor och accept

Offertens giltighetstid är 8 veckor räknat från offertens datum. Innehållet i denna offert samt tillhörande bilagor utgör konfidentiell information och får inte spridas eller på annat sätt göras tillgängligt för utomstående utan skriftligt medgivande från behörig på Telia.

För att acceptera denna offert, eller ställa frågor, vänligen kontakta mig på telefon +91 1234567890eller via mail yogesh.jadhav@teliacompany.com.

Med vänliga hälsningar,

CRM Fiber Sales Rep${CreatedDate}





Avtal om Telia Öppen Fiber



Telias avtalsnummer







 ${QuoteNumber}





 Detta avtal har ingåtts mellan följande parter



 Telia Sverige AB (nedan kallad ”Telia”)

 Org.nr 556430-0142

 Stjärntorget 1

 169 94, Solna

 Fastighets AB Castellum Grundet (nedan kallad ”Fastighetsägaren”)

 Org.nr 5592026255

 Box 3158

 20022, Malmö



 Telia och Fastighetsägaren kallas fortsättningsvis även gemensamt ”Parterna” och var för sig ”Part”.

Omfattning och avtalshandlingar

Parterna har ingått avtal om fiberanslutning m.m. från Telia med avtalsnummer ${ActiveContractNumber} (”Ursprungsavtalet”). Ursprungsavtalet jämte eventuella tilläggsavtal till Ursprungsavtalet upphör att gälla och ersätts av detta Avtal i och med Telias driftsättning av tjänsterna enligt detta Avtal. 

Fastighetsägaren och Telia har genom detta Avtal (”Avtalet”) överenskommit att Telia ska avseende Fastighet(er) (om fler så nedan gemensamt benämnda ”Fastigheten”) som anges i Bilaga: Fastighetsbeteckningar, ansluta Fastigheter och Kundplacerad Utrustning till Telias Nät enligt närmare beskrivning i Bilaga: Installation. 

Antal anslutningar till Telias Nät ska uppgå till 400 st. varav 400 st. befintliga och 0 st. tillkommande. Telia kan erbjuda anslutning av ytterligare Bostäder/Lokaler till Telias Nät enligt särskild offert efter förfrågan från Fastighetsägaren. 

Telia ska ansluta Fastigheterna genom att anlägga fiberkabel och i förekommande fall Kanalisation samt tillhandahålla Medieomvandlare. En närmare beskrivning av installationen framgår av Bilaga Installation. Vem av Parterna som ansvarar för anläggning av Kanalisation framgår särskilt av punkten nedan.   

Telia ska anlägga Kanalisation.

Fibernätet som ansluter Bostäder/Lokaler på Fastigheter till Telias Nät inklusive Kanalisationen ägs och förvaltas av bolag inom Telia-koncernen. Fastighetsägaren åtar sig att på begäran av sådant Teliabolag teckna ett särskilt upplåtelseavtal avseende rätt för bolaget att anlägga och bibehålla fibernät och Kanalisation inom det område som omfattas av Avtalet. 

Telia är inte skyldigt att erbjuda anslutning av Fastighet till Telias Nät om Telias kostnad för sådan anslutning skulle bli oskäligt hög i förhållande till nyttan av investeringen för Telia. Det sagda gäller exempelvis i de fall, men inte begränsat till, det endast finns ett fåtal Bostäder/Lokaler i området.

Telia ska leverera en Medieomvandlare per Bostad/Lokal som ansluts till fibernätet. Medieomvandlare ägs av Telia. Telia ansvarar för installation av en Medieomvandlare i varje Bostad/Lokal enligt Bilaga Installation och för anslutning av Medieomvandlaren till Telias Nät. 

Parterna är överens om att Telia ska ansluta Fastigheter till Telias Nät genom Öppen Fiber. Inom Öppen Fiber möjliggör Telia för Tjänsteleverantörer att tillhandahålla Bredbandstjänster till Bostäder/Lokaler anslutna till Telias Nät. Tjänsteleverantörer som finns tillgängliga i Öppen Fiber framgår av www.bredbandswebben.se. Utbudet av Tjänsteleverantörer, tjänster och priser kan förändras över tid samt ha lokala avvikelser. 

Förekommer mot varandra stridande villkor i Avtalet gäller villkoren i denna huvudtext före villkoren i bilagor och bilagorna sinsemellan i den ordning som de presenteras i Bilageförteckningen. Senare tillkomna bilagor ska gälla före äldre bilagor av samma typ.

Personuppgiftsbehandling

För att Telia ska kunna fullgöra sin del av Avtalet kan Telia komma att behöva tillträde till Bostäder/Lokaler som omfattas av Avtalet. I sådant fall åtar sig Fastighetsägaren att i samband med Avtalets ingående på Telias begäran förse Telia med en lista över Bostäderna/Lokalerna på Fastigheten/Fastigheterna. Listan ska vara Telia tillhanda senast två (2) veckor efter beställningsdatum och ska innehålla fullständig information enligt följande. Om Lokaler: lokalbeteckning, våning, postnummer och postadress, Företagets namn och organisationsnummer samt telefonnummer som Företaget kan nås på. Av listan över Lokalerna ska framgå vilka Lokaler som ska anslutas. Om Bostäder: lägenhetsnummer, våning, postnummer och postadress, namn samt telefonnummer. Av listan ska även framgå vilka Bostäder som ska anslutas. 

Om det behövs för att uppfylla Avtalet lämnar Telia ut uppgifterna ovan till Telias samarbetspartners och underleverantörer.

Fastighetsägaren ansvarar för att uppgifterna som lämnas till Telia är korrekta och för att Fastighetsägaren har rätt att förse Telia med sådan information. Fastighetsägaren ansvarar vidare för att de individer vars uppgifter överlämnats har informerats om att uppgifter om dem har lämnats till Telia samt för vilka ändamål Telia behandlar dessa uppgifter. Fastighetsägaren ska utan dröjsmål meddela Telia eventuella ändringar i uppgifter som har överlämnats.

Parterna är överens om att den behandling av personuppgifter som sker inom ramen för Avtalet sker för respektive Parts eget ändamål och för egen räkning. Detta innebär att respektive Part är att anse som personuppgiftsansvarig för den behandling som sker och ansvarar således för att tillse att behandlingen sker i enlighet med tillämplig dataskyddslagstiftning.

Tjänster och priser

I Avtalet ingår följande tjänster: 

Installation av fiberkabel (FTTH) för anslutning av Bostäder/Lokaler till Telias Nät i enlighet med "Bilaga: Installation”. Antal anslutna Bostäder/Lokaler uppgår till 777 st. Övriga portar uppgår till 0 st. För anslutning till Telias Nät utgår en engångsavgift om 892920.00 kr exklusive moms.

Avgift för de kollektiva tjänsterna ska faktureras successivt i takt med att Bredbandstjänsterna aktiveras i respektive Fastighet. 

Installationshjälp till Boende avseende kollektiva tjänster från Telia i enlighet med Bilaga: Installationshjälp.

Boende får tillgång till Bredbandstjänster genom kollektiv anslutning enligt nedan. För undvikande av missförstånd noteras att Lokaler aldrig ansluts till Tv från Telia. För kollektiva tjänster utgår en månadsavgift om 0.79 kr/mån per Bostad. Fakturering av Fastighetsägaren sker kvartalsvis. 

Kollektivt Bredband - 100 Mbit/s levereras till 7 st. anslutningar. 

Kollektivt Bredband - 1000 Mbit/s levereras till 7 st. anslutningar. 

Kollektivt Bredband - 250 Mbit/s levereras till 7 st. anslutningar. 

Telia Telefoni levereras till 7 st. anslutningar. Parterna är överens om att samtalskostnader inte ingår i priset för den kollektiva tjänsten och att Boende ska betala ersättning till Telia för samtalskostnader enligt Telias vid var tid gällande prislista.

Telia Tv & Streaming Lagom levereras till 7 st. anslutningar (för undvikande av missförstånd noteras att endast privatbostäder ansluts till Tv från Telia). Förteckning av vid var tid aktuella kanaler framgår av telia.se. Parterna är dock överens om att Telia förbehåller sig rätten att ändra sammansättningen av kanaler. 

Boende/Företag på Fastigheten i Bostad/Lokal får tillgång till Bredbandstjänster genom Öppen Fiber och därmed möjlighet att välja mellan Tjänsteleverantörer. Boende/Företag ingår särskilt avtal med vald Tjänsteleverantör om priser och villkor för leverans av Bredbandstjänst. 

Telia har rätt att en gång per år göra en indexförändring av de priser och avgifter som anges i Avtalet. En prisjustering med stöd av indexförändring kan första gången ske tidigast sex (6) månader efter det att Avtalet ingåtts. Indextalet för den oktobermånad som infaller året före det år då Avtalet ingås (basmånad) utgör indexets bastal. Om indextalet i någon påföljande oktobermånad (avräkningstidpunkt) har stigit i förhållande till indexets bastal ska priser och avgifter i Avtalet justeras med hänsyn till detta. Om inte annat anges ska SCB:s Konsumentprisindex (KPI) (1980=100) vara tillämpligt index. Telia meddelar Kunden om den aktuella indexförändringen senast trettio (30) dagar innan förändringen träder i kraft. En indexförändring ger inte Kunden rätt att säga upp berörd Tjänst eller Avtalet. Eventuella ytterligare villkor för indexering och tillämpligt index (om annat än SCB:s Konsumentprisindex (KPI)) anges i Avtalet.

Övriga vid var tid tillämpliga erbjudanden, aktuella priser och kampanjer framgår av telia.se.

Allmänna villkor

För Avtalet gäller Bilaga: Allmänna villkor.

Avtalstid

Så länge avtalet är i kraft äger Fastighetsägaren inte rätt att upplösas. Om Fastighetsägaren går i konkurs, träder i likvidation eller annars medverkar till en frivillig avveckling, gör denne sig skyldig till väsentligt avtalsbrott.

Vid brott mot punkt 5.1 ovan äger Telia rätt att rikta krav mot Fastighetsägarens styrelse enligt Avtalet jämte Bilagor.

Avtalet gäller från och med undertecknandet för en initial period om 5 år räknat från det att Telia driftsatt tjänsterna enligt detta avtal.

Har inte Avtalet sagts upp senast tolv (12) månader före den initiala avtalsperiodens slut, förlängs det automatiskt att gälla ytterligare två (2) år. Därefter förlängs Avtalet med två (2) år i taget med iakttagande av tolv (12) månaders uppsägningstid. Uppsägning ska vara skriftlig och behörigen undertecknad.



Avtalet har upprättats i två (2) exemplar av vilka Parterna tagit var sitt.





***********************************************************************************









Datum

${CreatedDate}



Telia Sverige AB















Datum

${CreatedDate}



Fastighets AB Castellum Grundet

















Namnförtydligande

CRM Fiber Sales Rep

Namnförtydligande

Test Yogesh Jadhav







Bilageförteckning



Bilaga: Definitioner

Bilaga: Fastighetsbeteckningar

Bilaga: Installation

Bilaga: Installationshjälp

Bilaga: Service

Bilaga: Allmänna villkor

Bilaga: Definitioner 



Avtalet är detta avtal om Telia Fastighetsanslutning/Öppen Fiber, inklusive bilagor, mellan Telia och Fastighetsägaren.

Boende är boende i Enfamiljshus belägen i området.

Bostad är privatbostad som disponeras av en Boende.

Bostadsnät eller Lokalnät är fast installerad kabel med tillhörande LAN-uttag i Bostad/Lokal. Bostadsnät/Lokalnät är installerat för stadigvarande bruk och används för att sprida Bredbandstjänster vidare från Överlämningspunkten. Bostadsnät/Lokalnät omfattas inte av Telias ansvar om inte annat framgår av Avtalet.

Bredbandsswitch är utrustning i Bostad/Lokal, som innehåller RJ45-portar genom vilka Tjänsteleverantör ges möjlighet att leverera Bredbandstjänst till Slutkund. Port på Bredbandsswitch eller Medieomvandlaren utgör Överlämningspunkt för Bredbandstjänst. Medieomvandlare i form av SFP är monterad i Bredbandsswitch i FTTH-nät. Bredbandsswitch ägs av Telia.

Bredbandstjänster är Tjänsteleverantörs vid var tid tillhandahållna slutkundstjänster, till exempel bredband och telefoni.

Enfamiljshus är byggnad på en enskilt ägd fastighet (villa, radhus, kedjehus, etc.) som utgör en Boendes privatbostad eller annan lokal på sådan Fastighet som disponeras av näringsidkare. 

Fastighet är den egendom som angivits i Avtalet. Som Fastighet anses även i förekommande fall byggnad på ofri grund.

Fastighetsägare är fysisk eller juridisk person som, ensam eller tillsammans med andra, äger den eller de Fastigheter som omfattas av Avtalet. Fastighetsägare enligt Avtalet kan t.ex. vara en ekonomisk förening, samfällighet eller aktiebolag.

Fel är avvikelse som medför att Bredbandstjänst inte är tillgänglig för Slutkund, eller där Bredbandstjänstens funktion är så kraftigt nedsatt att den är att betrakta som obrukbar.

FTTH (Fibre To The Home) är en nätrealisering där Enfamiljshuset/Bostaden/Lokalen ansluts med fiberkabel fram till Överlämningspunkt.

Företag är näringsidkare som är nyttjanderättshavare till en Lokal på Fastigheten.

Intag är kanalisation eller utrymme i en byggnads yttervägg som är avsedd att leda in Telias Nät i byggnaden. Telia fastställer punkt för terminering av nätet.

Kanalisation är rör avsett för indragning av kabel. 

Kundplacerad Utrustning är utrustning (inklusive programvara), som ägs eller tillhandahålls av Telia och som placeras på Fastigheten för att möjliggöra tillhandahållandet av Bredbandstjänster till boende/företag. Utrustning placerad hos Slutkund som ett resultat av individuellt avtal omfattas inte av denna definition.

Lokal är företagslokal som disponeras av näringsidkare eller annan lokal som är belägen på Fastigheten.

Maximal åtgärdstid är den tidsperiod som det längst får ta att åtgärda ett Fel. Maximal åtgärdstid anges i timmar under gällande Servicetid och räknas fr.o.m. den tidpunkt då Telia mottagit felanmälan från Fastighetsägaren eller Telias tekniker gällande Fiberkabel (FTTH) t.o.m. den tidpunkt då Telia klarrapporterat anmält Fel.

Medieomvandlare är en nätkomponent i FTTH-nät som omvandlar den optiska signalen till elektrisk signal i Enfamiljshuset/Bostaden/Lokalen. Medieomvandlare är placerad vid Överlämningspunkt och kan vara en fristående enhet eller SFP monterad i Bredbandsswitch. Medieomvandlaren ägs av Telia. Servicevillkor för Medieomvandlare framgår av Avtalet.

Servicefönster är den tidsperiod, måndagar mellan kl 00.00 och 04.00, när Telia har rätt att genomföra planerade arbeten i Telias Nät som medför avbrott i Bredbandstjänst.

Servicetid är den tidsperiod inom vilken Telia åtagit sig att åtgärda Fel.

SFP är ”Small form-factor pluggable transceiver” vilket är en Medieomvandlare som monteras t.ex. i nätverksutrustning som Bredbandsswitch.

Slutkund är Boende eller Företag som ingått avtal med Tjänsteleverantör om individuell leverans av Bredbandstjänst.

Telia är Telia Sverige AB.

Telias Nät är de allmänna kommunikationsnät som ägs eller på annat sätt disponeras av bolag inom Telia-koncernen. Sådant bolag svarar för drift av Telias Nät. 

Tjänsteleverantör är Telia eller den som ingått avtal med Telia om tillhandahållande av Bredbandstjänster till Slutkund i Överlämningspunkt.  

Tjänstespecifik hårdvara är hårdvara placerad efter Överlämningspunkt för Tjänsteleverantörs leverans av Bredbandstjänst t.ex. router, tv-box eller telefoniadapter. Villkor för Tjänstespecifik hårdvara framgår av avtal mellan Tjänsteleverantör och dennes avtalspart, vilket vid individuellt tecknade avtal är Slutkund. I de fall Fastighetsägare och Telia avtalar om kollektiv leverans framgår villkoren för den Tjänstespecifika hårdvaran av Avtalet.

Överlämningspunkt är den första punkt i Bostad eller Lokalen där Slutkund har möjlighet att ta emot Bredbandstjänst. Överlämningspunkt utgörs av LAN-uttag (RJ45) på Medieomvandlare.



Bilaga: Fastighetsbeteckningar



Nedan visas vilka Fastigheter som omfattas av Avtalet:



[ABCD]

Bilaga: Installation



Denna bilaga kompletteras av bestämmelserna i Bilaga: Allmänna villkor.

Om Parterna inte uttryckligen kommit överens om installation av fiberkabel genom punkten 3 (Tjänster och priser) i Avtalet, omfattas installation av fiberkabel inte av Telias åtagande. Telias installationsåtagande omfattar under sådana omständigheter endast installation av Kundplacerad Utrustning. Telia ansvarar för drift och underhåll av sådan utrustning under avtalstiden.För det fall Telia sedan tidigare har installerad Kundplacerad Utrustning på Fastigheten har Telia ingen skyldighet att installera Kundplacerad Utrustning. Medieomvandlare tillhandahålls och ägs av Telia.

Vi drar fiberkablar från telestationen till Bostäderna/Lokalerna på de Fastigheter som ska anslutas. Installationen inom Fastigheten planeras utifrån förutsättningarna i varje enskilt fall och en individuell bedömning av respektive Fastighet utförs vid projekteringsmötet. 

Projekteringsmöte inför installationen

En tid efter avtalstecknande kontaktas Fastighetsägaren av entreprenören, för att boka tid för projekteringsmöte. Vid projekteringsmötet går entreprenören tillsammans med Fastighetsägaren igenom hur installationen ska genomföras på Fastigheten och i de enskilda Bostäderna/Lokalerna. I samband med projekteringsmötet ska Avtal om Fiberanläggning ingås mellan Fastighetsägaren och bolag inom Telia-koncernen. Avtalet reglerar upplåtelse och ansvar för den planerade installationen.

Inför projekteringsmötet är det viktigt att Fastighetsägaren förbereder följande:

Ha relevanta ritningar över Fastigheten tillgängliga.

Tillträde för att inspektera utrymmen där installationsarbete planeras, vid behov även till Bostäderna/Lokalerna.

Säkra samtycke från Boende/Lokalinnehavare, gällande installationen i Bostäderna/Lokalerna och placeringen av Medieomvandlaren. Boende/Lokalinnehavare får gärna delta vid projekteringen.

Installation

Fastighetsägaren kontaktas av entreprenören i god tid inför installationen. Fastighetsägaren ansvarar för informationen till Boende/Lokalinnehavare.

Utomhus: Fiberkabeln dras från en anslutningspunkt i gatan till den närmaste punkten i byggnaden, och därifrån in genom husets yttervägg. Fiberkabeln kan dras via grävning, luftledningar eller redan befintliga kabelrör och bestäms utifrån Fastighetens förutsättningar under projekteringsmötet med entreprenören. Om vi behöver gräva, blir diket ca 5-40 cm brett och ca 20-40 cm djupt. Röret kan ligga grundare beroende på specifika markförhållanden. Vi försöker göra så lite åverkan som möjligt på din tomt. När kabeln är dragen fyller vi igen diket, men ytskiktet på den enskilda tomten måste Fastighetsägaren själv återställa, t ex sådd av nytt gräs eller plattsättning.

Inomhus: Vid installation inne i byggnaden ska Fastighetsägaren finnas på plats för att vid behov låsa upp och ge entreprenören tillträde till nödvändiga utrymmen. Boende/Lokalinnehavare behöver vara hemma vid installation i respektive Bostad/Lokal, alternativt behöver nyckel finnas tillgänglig för att komma in i Bostaden/Lokalen. I varje Bostad/Lokal installeras ett fiberuttag. Från fiberuttaget drar vi fiber till den plats, upp till 5 meter in i boytan/lokalytan, där utrustningen ska placeras. Vi installerar Medieomvandlaren och Fastighetsägaren ansvarar för att det finns ett eluttag på överenskommen plats.

Vi tar hand om hela installationen.





Anslutning via luftledning







Luftburen kabel

Intag i husets yttervägg

Fiberuttag och Medieomvandlare

Anslutning via befintliga kabelrör







Kabelstråk i gatan

Om det finns färdiga kabelrör som går att nyttja används de, annars kan vi behöva gräva

Intag i husets yttervägg

Fiberuttag och Medieomvandlare





























För tydlighets skull anges nedan exempel på vad som inte ingår i installationen. Exemplifieringen är inte uttömmande. I installationen ingår t.ex. inte:



Installationshjälp av tjänster (om inte uttryckligen avtalats i detta Avtal).

Flytt av skrymmande föremål och möbler.

Kostnad för eventuella eluttag i Bostäder/Lokaler och i Fastighetens Teknikutrymme.

Installation av Fiberkabel (FTTH) och Bostadsnät/Lokalnät (om inte uttryckligen avtalats i detta Avtal).

Håltagning i känsliga material som kakel, sten m.m.

Arbete med miljöfarligt material, t.ex. asbest.

Merkostnad för installation i K-märkta byggnader.

Merkostnad vid tjäle i mark.

Merkostnad för målningsarbeten.

Kostnad förenlig med Fastighetens Teknikutrymme.

El-anslutning av ev. bredbandsskåp.

El-uttag

Installation av extrauttag (telefonjack) för anslutning till befintligt telefonnät.

Omkoppling eller flytt av telefonjack.

Test eller annat jobb i utrustning som ägs av kunden (t.ex. pc, tv, router, dvd, etc.). 



Bilaga: Installationshjälp

Om Parterna uttryckligen kommit överens om installationshjälp till Boende avseende kollektiva tjänster från Telia genom Avtalets huvuddokument, punkt 3 (Tjänster och priser) utförs installationshjälpen enligt nedan.



LAN-uttag eller Medieomvandlare lokaliseras.

Om hårdvaran levererats till Fastighetsägaren, upphämtning av hårdvaran hos angiven person hos Fastighetsägaren.

Inkoppling av hårdvara till bostadsnät. 

Bredband: Inkoppling av en dator/surfplatta för att funktionstesta Bredbandstjänst. 

Kom-igång-hjälp för telefoni ex. inkoppling av SIM-kort

Tv: Inkoppling av en (1) tv-box till Telia Tv.

Kontroll av att bredband, telefoni och Tv fungerar.



Boende får endast tillgång till ett (1) tillfälle av installationshjälp.

När ny Boende flyttar in ges möjlighet till ett (1) tillfälle av installationshjälp.

Bilaga: Service

Serviceansvar för Telia Fastighetsanslutning, Telia Öppen Fiber (FTTH) 

Detta dokument beskriver Telias serviceansvar för det fall Parterna ingått avtal om Telia Fastighetanslutning eller Telia Öppen Fiber.

Servicebeskrivning

Ägande och Serviceansvar FTTH-nät

Fiberkabel (FTTH) ägs av bolag inom Telia-koncernen. Telia har serviceansvar för detta. 

Medieomvandlare vid respektive Slutkunds Överlämningspunkt ägs av Telia. Telia har serviceansvar för Medieomvandlare, vilket innebär att Telia ersätter Medieomvandlare som är behäftad med Fel efter felanmälan från Tjänsteleverantör, Boende eller Fastighetsägare. Vid yttre åverkan på Medieomvandlare fakturerar Telia Fastighetsägaren för byte av Medieomvandlare enligt gällande prislista.

Eventuell Bredbandsswitch och Medieomvandlare ägs av Telia som även har serviceansvar för dessa. Endast Telia har rätt att managera Bredbandsswitch, vilket innebär att endast Telia har rätt att logga in i denna, eller på annat sätt påverka dess konfiguration.

Tjänstespecifik hårdvara regleras avseende ägande och serviceansvar beroende av kollektivt eller individuellt avtal med Tjänsteleverantör. I kollektiva avtal äger Fastighetsägaren tv-box och trådlös router, Telia har serviceansvar under avtalstid. För individuella avtal gäller ägande och serviceansvar enligt avtal mellan Slutkund och Tjänsteleverantör.

I de fall Tjänstespecifik hårdvara tillhandahålls från Telia ansvarar Fastighetsägaren för att det finns en lämplig yta att placera denna på i respektive Bostaden/Lokalen. För de fall teknikskåp har byggts ansvarar Fastighetsägaren för att detta är byggt i ett material som wifi-signal kan ta sig igenom och inte, till exempel i metall.

Felavhjälpning vid Fel som drabbar enskild Slutkund

Slutkunden felanmäler till Tjänsteleverantör.

I förekommande fall informerar Tjänsteleverantör om kända driftstörningar.

Telia felsöker och åtgärdar vid behov sin tjänsteplattform, samt kontrollerar att Slutkundens inkoppling till Bredbandstjänsten är korrekt och att Felet inte finns i Slutkundens egen utrustning eller handhavande av Bredbandstjänsten. 

Tjänsteleverantör felanmäler vid behov till Telia.

I de fall Felet inte kan avhjälpas fjärrmässigt bokar Telias servicetekniker tid med Slutkund och i vissa fall även med Fastighetsägarens tekniske kontaktperson. Telias servicetekniker genomför en felanalys och åtgärdar eventuella Fel som ligger inom Telias serviceansvar.

I nedanstående tabell framgår Servicetid och Maximal åtgärdstid för de fall privat- respektive företagskunder är drabbade av Fel. Servicetid och Maximal åtgärdstid räknas fr.o.m. den tidpunkt då Felet anmälts till av Telia angiven kontaktpunkt.

Telias felavhjälpning vid enskild kundfelanmälan

Servicetid

Maximal åtgärdstid

Fel som berör privatkund

Helgfri mån-fre 07.30-18.00

24 timmar inom ramen för servicetid

Fel som berör företagskund

Helgfri mån-fre 07.30-18.00

12 timmar inom ramen för servicetid

Felanmälansingång för Fastighetsägaren

Fel som berör minst tre Slutkunder på samma tjänst kan felanmälas av Fastighetsägaren till Telias Fastighetsägaringång på telefon 020-30 00 60, val 2. Vid Avtalets tecknande har Fastighetsägaringången följande öppettider.



Fastighetsägaringångens öppettider

Vardagar

08.00-16.00

Aktiv nätövervakning

Telia har en aktiv övervakning av hela sitt bredbandsnät, dygnet runt, årets alla dagar. Övervakningen omfattar all utrustning i Telias Nät. Telia tar hand om larm från nätet och genomför fjärrmässig analys och om möjligt fjärrmässig felavhjälpning. 

I de fall det krävs åtgärd av tekniker i fält har Telia tillgång till en rikstäckande organisation av tekniker som hanterar alla förekommande felsituationer. Vid större felsituationer arbetar dessa dygnet runt, med stöd av Telias expertis. 

I de fall reservdelar krävs har Telia avtal med logistikpartners som distribuerar reservdelar över hela landet. 

Planerade arbeten i Telias Nät

Telia arbetar kontinuerligt för att säkerställa hög kvalitet, säkerhet och rätt funktionalitet i Telias Nät. Detta innebär att det ibland krävs arbeten i nätet som stör Boendes användning av Bredbandstjänsterna, till exempel i samband med mjukvaruuppgraderingar eller kapacitetsutökningar. Arbeten i Telias Nät som innebär att Boendes användning av Bredbandstjänsterna störs, utförs så långt det är möjligt i Servicefönster, måndagar kl. 00.00-04.00. 

Fastighetsägarens ansvar

För att Telia ska kunna garantera service- och åtgärdstider krävs att Fastighetsägaren fullgör sitt ansvar enligt nedan. Fastighetsägaren ansvarar för att:

Telia har tillgång till aktuella kontaktuppgifter till person som kan ge Telia tillträde till nödvändiga fastighetsutrymmen vid serviceåtgärder. Ändring av kontaktuppgifter ska utan dröjsmål anmälas av Fastighetsägaren till Telias ingång för Fastighetsägare på telefon 020-30 00 60, val 1.

Inom 60 minuter från den tidpunkt då Telia kontaktat Fastighetsägaren ska Telias servicepersonal beredas tillträde till nödvändiga lokaler inom Fastigheten i samband med serviceåtgärder. Detta gäller alla dagar kl. 07.30-24.00. Behov av tillträde till utrymmen under andra tidpunkter än servicetider angivna i ovanstående avsnitt ”Felavhjälpning vid Fel som drabbar enskild Slutkund” gäller i huvudsak Nätfel.

Informera Telia i god tid och senast 5 arbetsdagar innan arbete ska påbörjas som innebär att avbrott i Bredbandstjänst för anslutna Slutkunder planeras, t.ex. avbrott i strömförsörjning. Datum för avbrottet, starttid, sluttid, adress samt kontaktperson mailas till controlcenter.cm@teliacompany.com.	

Fiberkabel (FTTH) inom fastighet är skyddad från allmänheten. 

I de fall Telia inte kunnat uppfylla sitt serviceansvar inom Maximal Åtgärdstid pga. att Fastighetsägaren underlåtit att fullgöra sina skyldigheter enligt Avtalet har Telia rätt till ersättning från Fastighetsägaren för direkt och indirekt skada, exempelvis i form av berättigade ersättningsanspråk från Slutkunder.

Bilaga: Allmänna villkor 

Telias Integritetspolicy

Den personliga integriteten hos våra kunder är viktig för oss på Telia. I Telias integritetspolicy på www.telia.se finns mer information om vilka personuppgifter Telia behandlar, typ av behandling, ändamålet och den rättsliga grunden för behandlingen, uppgifternas lagringstid samt individens rätt till bl.a. information, rättelse, radering och rätten att göra invändningar. 



Inledning

Dessa allmänna villkor gäller då Telia till en Fastighetsägare möjliggör anslutning av Bostäder/Lokaler till Telias Nät genom fiberkabel. Efter överenskommelse kan Telia även tillhandahålla andra tjänster, såsom  Telias Bredbandstjänster genom kollektiv anslutning till Boende/Företag på aktuella Fastigheter eller anslutning till Öppen Fiber. De tjänster som tillhandahålls specificeras i Avtalet.

Avtalet reglerar inte tillhandahållande av Bredbandstjänster i relationen direkt till Boende/Företag. Boende/Företaget kan få tillgång till Bredbandstjänst kollektivt via Fastighetsägaren eller individuellt genom att teckna ett särskilt avtal om Bredbandstjänst med en Tjänsteleverantör.

Boende/Företag som får möjlighet att tillgå Bredbandstjänst kollektivt från Telia genom Fastighetsägaren måste aktivera Bredbandstjänsten för att ta del av den. Bredbandstjänsten aktiveras genom att Boenden/Företaget kontaktar Telia och uppger namn, adress och eventuell e-postadress. Genom att aktivera Bredbandstjänsten ingår Boenden/Företaget särskilt avtal med Telia om Bredbandstjänsten.

Telias åtaganden

Telia ska tillhandahålla aktuella tjänster på ett fackmässigt sätt i överensstämmelse med Avtalet.

Telia har rätt att anlita underleverantörer för att fullgöra sina åtaganden enligt Avtalet. Telia svarar i så fall för underleverantörens arbete såsom för eget arbete.

Vid anslutning till Telias Nät i befintlig bebyggelse ska anslutningen ske vid den tidpunkt som skriftligen överenskommits mellan Parterna. Telia ansvarar för leverans av kabel fram till Överlämningspunkten.

Innan eventuell grävning påbörjas inom Fastighet kontaktas Fastighetsägaren för samråd om det praktiska utförandet. 

Om Telias Bredbandstjänst tillhandahålls till Boende eller Företag kollektivt via Fastighetsägaren har Telia rätt att stänga eller begränsa Bredbandstjänsten för en eller flera Boenden eller Företag i den utsträckning som anges i Telias allmänna villkor för tjänster till företag samt Telias allmänna villkor för tjänster till konsument vid motsvarande förhållanden som där anges, oavsett om detta har sin grund i handlande eller underlåtenhet från Fastighetsägarens eller från Boendens/Företagets sida.

Fastighetsägarens åtaganden

Fastighetsägaren ska på egen bekostnad bereda Telia tillträde till Fastigheten. Med avseende på installation och/eller anslutning av fiberkabel ska Telia ges tillträde skyndsamt och utan vidare dröjsmål. Med avseende på service ska Telia ges tillträde i enlighet med vad som framgår av Avtalet. Telia ska beredas fri framkomlighet där arbeten ska utföras. Flytt av möbler och liknande omfattas inte av Telias åtaganden. Fastighetsägaren ska vidare förse Telia med lista över kontaktpersoner avseende tillträde till Fastigheten.

Fastighetsägaren ansvarar för att eventuellt bygglov och andra myndighetstillstånd som avser Fastigheten i förekommande fall införskaffas för anläggning av det som ska installeras. Fastighetsägaren ska bereda Telia nödvändigt bistånd och står för kostnaden nämnda sådant tillstånd. Om tillstånd inte medges, har Telia rätt att med omedelbar verkan frånträda Avtalet.

Fastighetsägaren ansvarar för att el finns framdragen till Kundplacerad Utrustning senast den dag Parterna avtalat att installation av fiberkabel och Kundplacerad Utrustning ska vara färdigställd. Om så inte sker, har Telia rätt att själv eller genom underleverantör företa sådan framdragning av el på Fastighetsägarens bekostnad. Fastighetsägaren ansvarar vidare för den strömförbrukning som är nödvändig för driften av Kundplacerad Utrustning.

Fastighetsägaren står risken för skada på eller förlust av Kundplacerad Utrustning från den tidpunkt då den Kundplacerade Utrustningen installerats. Kundplacerad Utrustning får inte utan Telias skriftliga medgivande flyttas från den plats där den installerats.

Fastighetsägaren får inte utan Telias skriftliga medgivande reparera, utföra service på, göra påbyggnader på eller ändringar i, eller ta bort delar eller märkning avseende ägandeförhållanden från Kundplacerad Utrustning. Fastighetsägaren ska följa de anvisningar som Telia från tid till annan utfärdar beträffande skötsel och användning av Kundplacerad Utrustning. Fastighetsägaren ansvarar vidare för att förhindra att obehörig person ges tillgång till Kundplacerad Utrustning och Fastighetsägaren ska omedelbart meddela Telia om så ändå sker.

Fastighetsägaren ska vidta alla rimliga åtgärder för att säkerställa att inte Boende/Företag eller annan vidtar åtgärder som medför störningar för Kundplacerad Utrustning. Fastighetsägaren svarar även för att utan oskäligt dröjsmål stoppa sådana störningar.

Installation av fiberkabel och Kundplacerad Utrustning

Telia kallar Fastighetsägaren till ett startmöte i syfte att gå igenom installationsprocessen och andra relevanta frågor. Respektive Part ska utse var sin kontaktman för att ansvara och hantera löpande frågor rörande installationen. Vardera Parten ska bära sina respektive kostnader för startmötet. På startmötet ska Parterna överenskomma om detaljerad tidplan och former för arbetets utförande.

I god tid innan installationen påbörjas och senast vid startmötet ska Fastighetsägaren förse Telia med fastighetsbeskrivning, ritningar över Fastigheten och berörda byggnader utvisande nödvändig information för anslutning och installation. Fastighetsägaren ansvarar för att sådan information är korrekt och fullständig.

Ersättning

Fastighetsägaren ska betala i Avtalet överenskommen ersättning. Samtliga priser är exklusive mervärdesskatt. Fakturaavgift tillkommer för pappersfaktura.

Fastighetsägaren ska betala faktura inom trettio (30) dagar från fakturadatum i enlighet med anvisningar angivna på fakturan. Vid förskottsbetalning enligt punkt 5.5 ska betalning ske senast den dag Telia anger.

Debitering av i Avtalet ingående tjänster påbörjas vid tidpunkt som Parterna överenskommit i Avtalet eller annars på avtalad leveransdag eller, om leveransen är försenad av orsak enbart hänförlig till Telia, från den dag då leverans faktiskt sker.

Om Fastighetsägaren inte fullgjort betalningen senast på förfallodagen har Telia rätt till ersättning för betalningspåminnelser och inkassokostnader samt till dröjsmålsränta enligt lag. Om Fastighetsägaren, trots påminnelse och stängning av Tjänsten inte betalar förfallen faktura, ska övrig ersättning för Tjänsten som ännu inte har fakturerats anses förfallen till omedelbar betalning.

Telia har rätt att under avtalstiden begära förskottsbetalning eller att Fastighetsägaren ställer säkerhet för Avtalets rätta fullgörande om det till följd av kreditprövning framstår som befogat. Ränta utgår inte på förskotterat belopp. Telia har vidare rätt att ur förskotterat belopp eller ställd säkerhet tillgodogöra sig belopp motsvarande sina förfallna fordringar, inklusive sådana kostnader som avses i punkt 5.4.

Telia har rätt att överlåta sin rätt till betalning enligt Avtalet till annan.

Bestämmelserna i detta avsnitt 5 ska äga motsvarande tillämpning för det fall Fastighetsägaren inom ramen för avtalet tillhandahåller tjänster till Telia.

Äganderätt och nyttjanderätt

Kundplacerad Utrustning, ägs av Telia som svarar för drift och underhåll av denna utrustning. Ägande och ansvar för annan utrustning som Telia installerat i Bostad/Lokal framgår av Avtalet. Telia förbehåller sig rätten att utföra konfigurationsändringar, uppgraderingar samt i övrigt disponera den Kundplacerade Utrustningen för utveckling av tjänster under den tid som utrustningen är ansluten mot Bredbandstjänst. Under omständighet att den Kundplacerade Utrustningen inte ägs av Telia, förbehåller sig Telia likväl rätten att utföra konfigurationsändringar, uppgraderingar samt i övrigt disponera sådan utrustning för utveckling av tjänster under den tid som utrustningen är ansluten mot Bredbandstjänst.

Avtalet innebär inte att äganderätten till Kundplacerad Utrustning övergår till Fastighetsägaren och Fastighetsägaren får inte sälja, pantsätta, hyra eller låna ut eller på annat sätt förfoga över sådan utrustning utan att Telia först lämnat skriftligt medgivande därtill.

Överlåtelse av rättigheter och skyldigheter

Med undantag för de särskilda fall som anges nedan, har Part inte rätt att överlåta sina rättigheter och skyldigheter enligt Avtalet utan den andre Partens skriftliga samtycke. Telia har dock rätt att överlåta sina rättigheter och skyldigheter enligt Avtalet till annat bolag inom Telias koncern. Telia ska skriftligen meddela Fastighetsägaren om detta sker.

Fastighetsägaren garanterar att denne vid överlåtelse av Fastigheten ska göra förbehåll för de nyttjanderätter och andra rättigheter som upplåts till Telia eller annat Telia bolag enligt Avtalet, så att Avtalet gäller mot förvärvare av Fastigheten. Fastighetsägaren ska vid överlåtelse av Fastigheten överlåta sina rättigheter och skyldigheter enligt Avtalet till förvärvare av Fastigheten.

Förtida upphörande

Vardera Parten får säga upp Avtalet med omedelbar verkan om: 

den andra Parten inleder likvidationsförhandlingar, inger ansökan om företagsrekonstruktion, inleder ackord, försätts i konkurs eller eljest kan antas vara på obestånd, eller;

den andra Parten har gjort sig skyldig till väsentligt avtalsbrott som inte åtgärdats inom tio (10) arbetsdagar efter skriftlig begäran.

Uppsägning enligt punkt 8.1 ska ske skriftligen.

Definitionerna i Avtalets Bilaga Definitioner samt bestämmelserna i dessa Allmänna villkor punkterna 3.3 - 3.6, 7.1 – 7.2, 9.1 – 9.4, 10.1 - 10.3, 11.1 – 11.3 samt 13.1 – 13.3 ska äga fortsatt giltighet även efter Avtalets upphörande till dess Telias avtal med Boende/Företaget om Bredbandstjänst upphört att gälla.

Skadestånd

Part har rätt till ersättning för direkt skada som motparten, eller någon för vilken motparten svarar, förorsakat genom vårdslöshet. Part har inte någon rätt till ersättning för indirekta skador, såsom utebliven handelsvinst, kostnader som blivit onyttiga eller andra följdskador. Parts ansvar är vidare för varje skadetillfälle begränsat till ett sammanlagt belopp motsvarande trettiofem (35) prisbasbelopp enligt lagen (1962:381) om allmän försäkring, om inte annat anges i Avtalet.

Oaktat vad som föreskrivs i punkt 9.1 ovan ansvarar Telia inte för skada som uppkommer för Fastighetsägaren till följd av innehåll i data eller annan information som förmedlas vid användning av tjänster enligt Avtalet, inte heller ansvarar Telia för skada orsakad av datavirus eller motsvarande, försening, förvanskning eller förlust av data eller för Fastighetsägaren eventuella ersättningsskyldighet gentemot tredje man.

Begränsningarna av Parts skadeståndsskyldighet gäller inte i fall av uppsåt eller grov vårdslöshet, vid personskada eller vid sådant ansvar som följer av tvingande lag. Begränsningarna av Parts skadeståndsskyldighet gäller vidare inte vid skada som uppkommit till följd av att Fastighetsägaren brutit mot punkt 7.2.

Begäran om skadestånd skall, för att kunna göras gällande, framställas skriftligen senast två (2) månader efter det att felet, förseningen eller skadan upptäckts eller bort upptäckas.

Force majeure

Part är befriad från skyldighet att ersätta skada eller att fullgöra viss förpliktelse enligt Avtalet, om skadan eller underlåtenheten har sin grund i omständighet utanför Parts kontroll, av det slag som anges nedan ("Befriande Omständighet") och omständigheten förhindrar, avsevärt försvårar eller försenar fullgörande av sådan förpliktelse. Detsamma gäller om underlåtenheten har sin grund i försenade leveranser från Parts underleverantör som orsakats av Befriande Omständighet.

Såsom Befriande Omständighet ska anses bland annat myndighets åtgärd eller underlåtenhet, nytillkommen eller ändrad lagstiftning, arbetskonflikt, blockad, krig, upplopp, sabotage, extrema väderförhållanden, blixtnedslag, brand, explosion, översvämning, naturkatastrof, olyckshändelse eller kabelbrott som orsakats av tredje man.

Part som påkallar befrielse enligt punkt 10.1 ska utan dröjsmål underrätta andra Parten därom. Befrielsegrund anses föreligga så länge Befriande Omständighet utgör hinder för fullgörande, dock högst tre (3) månader. Därefter har vardera Parten rätt att frånträda Avtalet utan att några påföljder på grund av detta kan göras av den andra Parten.

Sekretess

Part förbinder sig att inte för tredje man avslöja Konfidentiell Information, vilken Part erhåller eller erhållit från den andra Parten. Med "Konfidentiell Information" avses varje upplysning - teknisk, kommersiell eller av annan art, förutsatt att sådan information rimligen kan anses vara av konfidentiell natur, oavsett om upplysningen dokumenteras eller inte - med undantag för:

upplysning, som är allmänt känd eller kommer till allmän kännedom på annat sätt än genom brott mot innehållet i Avtalet, eller,

upplysning, som Part kan visa att Part redan kände till innan han mottog den från den andra Parten, eller,

upplysning, som Part mottagit eller kommer att mottaga från tredje man utan att vara bunden av sekretessplikt i förhållande till denne.

Bestämmelserna i punkt 11.1 innebär inte hinder för Part att lämna ut Konfidentiell Information när sådant erfordras på grund av bestämmelse i lag eller på grund av domstols eller myndighets beslut.

Telia får lämna ut Konfidentiell Information till annat bolag inom Teliakoncernen. Därutöver får den Part som mottar Konfidentiell Information lämna ut informationen endast till sådana anställda, styrelseledamöter, konsulter och underleverantörer som behöver tillgång till informationen för att Avtalet ska kunna fullföljas. Mottagande Part ansvarar för att sådana personer före sådant utlämnande är medvetna om och följer bestämmelserna i Avtalet.

Övrigt

Ändringar av eller tillägg till Avtalet ska för att vara bindande vara skriftligen avfattade och undertecknade av Parterna.

Avtalet utgör Parternas fullständiga reglering av alla frågor som Avtalet berör. Alla skriftliga eller muntliga överenskommelser, åtaganden eller utfästelser som föregått Avtalet ska ersättas av innehållet i Avtalet.

I Avtalet angivna priser och överenskomna leveranstider förutsätter att dels de faktiska omständigheterna rörande Fastigheten överensstämmer med vad Fastighetsägaren uppgivit senast i samband med Avtalets ingående, dels att installations- och anslutningsarbetena inte i övrigt stöter på hinder som inte skäligen kunde förutses av Telia vid Avtalets ingående. I annat fall har Telia rätt till ersättning från Fastighetsägaren för eventuella tillkommande kostnader.

Telia utvecklar fortlöpande sina tjänster och tekniska plattformar. Telia äger rätt att ändra eller modifiera tjänsterna som levereras under detta Avtal, inklusive tekniska plattformar, under förutsättning att tjänsternas prestanda eller funktionalitet därmed inte försämras. Sådan ändring eller modifiering ska utföras på ett sådant sätt att eventuella störningar begränsas.

Tillämplig lag och tvist

Parternas rättigheter och skyldigheter vid tolkning och tillämpning av Avtalet ska bestämmas i enlighet med svensk lag.

Tvist i anledning av Avtalet ska slutligt avgöras i Stockholm genom skiljedom vid Stockholms Handelskammares Skiljedomsinstitut (”Institutet”).

Institutets Regler för Förenklat Skiljeförfarande ska gälla om inte Institutet med beaktande av målets svårighetsgrad, tvisteföremålets värde eller övriga omständigheter bestämmer att Reglerna för Stockholms Handelskammares Skiljedomsinstitut ska tillämpas på förfarandet. I sistnämnda fall ska Institutet också bestämma om skiljenämnden ska bestå av en eller tre skiljemän. Oaktat vad ovan anges har Part rätt att vända sig till svensk domstol eller annan behörig myndighet om tvistigt kapitalbelopp inte överstiger etthundratusen (100 000) EUR.`;
  await utilityFunctionLocal.VerifyQuoteWordDocumentContent(page, expectedText);


  await page.goto(secretsData.get("environmentURL") + "/" + ContractID);

  //Verify contract pdf content
var expectedText = `Tv, streaming och bredband 
i ett nät av världsklass.
Välkommen 
till Telia 
Avtal för Fastighets AB Castellum Grundet 

Konfidentiellt
${CreatedDate}
 Sidnr
2 (22)
Telia Öppen Fiber
Med Telia Öppen Fiberfår ni tillgång till en supersnabb, stabil och framtidssäkrad 
bredbandsanslutning. Fastighetsägare ansluts till ett av Sveriges mest kraftfulla fibernät som levererar 
tjänster i världsklass för tv, streaming och bredband.
Därför är Telia en bra partner
Att ansluta fastigheter till fiber är en långsiktig investering. Med längst erfarenhet på marknaden vet vi 
vad som krävs för att fibernätet ska hålla i decennier framöver. Vi säkerställer drift och funktionalitet av
nätet dygnet runt och felsöker proaktivt för att snabbt åtgärda eventuella fel. Dessutom har vi en egen 
kundtjänst för er som styrelse dit ni kan vända er med alla frågor som rör fiberanslutningen.
Följande ingår i denna offert:
Vi ansluter aktuella Fastigheter till Telias Nät. 
Med Öppen Fiber har Boende/Företag valfriheten att själva välja vem som ska leverera tv, 
bredband och telefoni och plocka ihop ett utbud som passar just dem. 
Vi står för drift och underhåll.
Tv, streaming ch bredband 
i ett nät av världsklass.
Avtal för Fastighets AB Castellum Grundet 

Konfidentiellt
${CreatedDate}
 Sidnr
3 (22)
Vårt Erbjudande
ERBJUDANDETJÄNSTANTALENGÅNGSAVGIFTMÅNADSAVGIFT
Antal portar
Totalt antal Bostäder777 st
Totalt antal Lokaler0 st
Totalt antal Övriga portar0 st
Totalt antal 
anslutningar777 st
Produkter
Fastighetsanslutning med 
exklusivt LAN till villa 7 st63880.00 kr0.00 kr per anslutning
Fastighetsanslutning med 
Telia som exklusiv 
tjänsteleverantör 7 st0.00 kr0.00 kr per anslutning
Kollektiv Installationshjälp 777 st0.00 kr0.00 kr per anslutning
Kollektiv hårdvara - Trådlös 
Router 777 st0.00 kr0.00 kr per anslutning
Kollektiv hårdvara - Tv-box 777 st0.00 kr0.00 kr per anslutning
Kollektiv Telefoni 7 st0.00 kr0.00 kr per anslutning
Kollektiv TV - Lagom 7 st0.00 kr
10.00 kr per 
anslutning 
Kollektivt Bredband - 100 
Mbit/s 7 st0.00 kr
22.00 kr per 
anslutning 
Fastighetsanslutning med 
Telia som exklusiv 
tjänsteleverantör 7 st63880.00 kr0.00 kr per anslutning
Fastighetsanslutning med 
Telia som exklusiv 
tjänsteleverantör 7 st-200.00 kr0.00 kr per anslutning
Kollektiv Installationshjälp 7 st0.00 kr0.00 kr per anslutning
Kollektivt Bredband - 1000 
Mbit/s 7 st0.00 kr
34.00 kr per 
anslutning 
Kollektivt Bredband - 250 
Mbit/s 7 st0.00 kr
22.00 kr per 
anslutning 
Summa892920.00 kr616.00 kr
UPPKOPPLING UTAN KRÅNGELSAMMANSTÄLLNING

Konfidentiellt
${CreatedDate}
 Sidnr
4 (22)
TOTAL ENGÅNGSAVGIFT
892920.00 kr (exkl moms)  
TOTAL MÅNADSAVGIFT
616.00 kr/mån (exkl moms)
TOTAL MÅNADSAVGIFT PER 
ANSLUTNING
88.00 kr/mån (exkl moms)
Med våra nätverk får du en uppkoppling 
baserat på den senaste tekniken 
kombinerat med vår långa erfarenhet 
inom området. Vi möter dina 
förväntningar på en uppkoppling utan 
krångel.
AVTALSTID
5 år

Konfidentiellt
${CreatedDate}
 Sidnr
5 (22)
Leveranstid
Normal leveranstid är 4-8 månader efter det att underskriven offert kommit oss tillhanda. Kompletta 
adresslistor ska vara oss tillhanda senast två veckor efter underskriven offert för att vi i samråd med er
ska kunna besluta om slutlig leveranstid.
Villkor och accept
Offertens giltighetstid är 8 veckor räknat från offertens datum. Innehållet i denna offert samt tillhörande
bilagor utgör konfidentiell information och får inte spridas eller på annat sätt göras tillgängligt för 
utomstående utan skriftligt medgivande från behörig på Telia.
För att acceptera denna offert, eller ställa frågor, vänligen kontakta mig på telefon +91 1234567890
eller via mail yogesh.jadhav@teliacompany.com.
Med vänliga hälsningar,
CRM Fiber Sales Rep
${CreatedDate}

Konfidentiellt
${CreatedDate}
 Sidnr
6 (22)
1.Omfattning och avtalshandlingar
Parterna har ingått avtal om fiberanslutning m.m. från Telia med avtalsnummer ${ActiveContractNumber} 
(”Ursprungsavtalet”). Ursprungsavtalet jämte eventuella tilläggsavtal till Ursprungsavtalet 
upphör att gälla och ersätts av detta Avtal i och med Telias driftsättning av tjänsterna enligt 
detta Avtal. 
Fastighetsägaren och Telia har genom detta Avtal (”Avtalet”) överenskommit att Telia ska 
avseende Fastighet(er) (om fler så nedan gemensamt benämnda ”Fastigheten”) som anges i 
Bilaga: Fastighetsbeteckningar, ansluta Fastigheter och Kundplacerad Utrustning till Telias 
Nät enligt närmare beskrivning i Bilaga: Installation. 
Antal anslutningar till Telias Nät ska uppgå till 400 st. varav  st. befintliga och 0 st. 
tillkommande. Telia kan erbjuda anslutning av ytterligare Bostäder/Lokaler till Telias Nät enligt 
särskild offert efter förfrågan från Fastighetsägaren. 
Telia ska ansluta Fastigheterna genom att anlägga fiberkabel och i förekommande fall 
Kanalisation samt tillhandahålla Medieomvandlare. En närmare beskrivning av installationen 
framgår av Bilaga Installation. Vem av Parterna som ansvarar för anläggning av Kanalisation 
framgår särskilt av punkten nedan.   
Telia ska anlägga Kanalisation.
Fibernätet som ansluter Bostäder/Lokaler på Fastigheter till Telias Nät inklusive 
Kanalisationen ägs och förvaltas av bolag inom Telia-koncernen. Fastighetsägaren åtar sig att
på begäran av sådant Teliabolag teckna ett särskilt upplåtelseavtal avseende rätt för bolaget 
att anlägga och bibehålla fibernät och Kanalisation inom det område som omfattas av Avtalet. 
Telia är inte skyldigt att erbjuda anslutning av Fastighet till Telias Nät om Telias kostnad för 
sådan anslutning skulle bli oskäligt hög i förhållande till nyttan av investeringen för Telia. Det 
sagda gäller exempelvis i de fall, men inte begränsat till, det endast finns ett fåtal 
Bostäder/Lokaler i området.
Telia ska leverera en Medieomvandlare per Bostad/Lokal som ansluts till fibernätet. 
Medieomvandlare ägs av Telia. Telia ansvarar för installation av en Medieomvandlare i varje 
Bostad/Lokal enligt Bilaga Installation och för anslutning av Medieomvandlaren till Telias Nät. 
Parterna är överens om att Telia ska ansluta Fastigheter till Telias Nät genom Öppen Fiber. 
Inom Öppen Fiber möjliggör Telia för Tjänsteleverantörer att tillhandahålla Bredbandstjänster 
till Bostäder/Lokaler anslutna till Telias Nät. Tjänsteleverantörer som finns tillgängliga i Öppen 
Fiber framgår av www.bredbandswebben.se. Utbudet av Tjänsteleverantörer, tjänster och 
priser kan förändras över tid samt ha lokala avvikelser. 
Förekommer mot varandra stridande villkor i Avtalet gäller villkoren i denna huvudtext före 
villkoren i bilagor och bilagorna sinsemellan i den ordning som de presenteras i 
Bilageförteckningen. Senare tillkomna bilagor ska gälla före äldre bilagor av samma typ.
Avtal om Telia Öppen Fiber
Telias avtalsnummer
 ${ContractNumber}
 Detta avtal har ingåtts mellan följande parter
 Telia Sverige AB (nedan kallad ”Telia”)
 Org.nr 556430-0142
 Stjärntorget 1
 169 94, Solna
 Fastighets AB Castellum Grundet (nedan kallad 
”Fastighetsägaren”)
 Org.nr 5592026255
 Box 3158
 20022, Malmö
 Telia och Fastighetsägaren kallas fortsättningsvis även gemensamt ”Parterna” och var för sig ”Part”.

Konfidentiellt
${CreatedDate}
 Sidnr
7 (22)
2.Personuppgiftsbehandling
För att Telia ska kunna fullgöra sin del av Avtalet kan Telia komma att behöva tillträde till 
Bostäder/Lokaler som omfattas av Avtalet. I sådant fall åtar sig Fastighetsägaren att i 
samband med Avtalets ingående på Telias begäran förse Telia med en lista över 
Bostäderna/Lokalerna på Fastigheten/Fastigheterna. Listan ska vara Telia tillhanda senast två
(2) veckor efter beställningsdatum och ska innehålla fullständig information enligt följande. Om
Lokaler: lokalbeteckning, våning, postnummer och postadress, Företagets namn och 
organisationsnummer samt telefonnummer som Företaget kan nås på. Av listan över 
Lokalerna ska framgå vilka Lokaler som ska anslutas. Om Bostäder: lägenhetsnummer, 
våning, postnummer och postadress, namn samt telefonnummer. Av listan ska även framgå 
vilka Bostäder som ska anslutas. 
Om det behövs för att uppfylla Avtalet lämnar Telia ut uppgifterna ovan till Telias 
samarbetspartners och underleverantörer.
Fastighetsägaren ansvarar för att uppgifterna som lämnas till Telia är korrekta och för att 
Fastighetsägaren har rätt att förse Telia med sådan information. Fastighetsägaren ansvarar 
vidare för att de individer vars uppgifter överlämnats har informerats om att uppgifter om dem 
har lämnats till Telia samt för vilka ändamål Telia behandlar dessa uppgifter. Fastighetsägaren
ska utan dröjsmål meddela Telia eventuella ändringar i uppgifter som har överlämnats.
Parterna är överens om att den behandling av personuppgifter som sker inom ramen för 
Avtalet sker för respektive Parts eget ändamål och för egen räkning. Detta innebär att 
respektive Part är att anse som personuppgiftsansvarig för den behandling som sker och 
ansvarar således för att tillse att behandlingen sker i enlighet med tillämplig 
dataskyddslagstiftning.
3.Tjänster och priser
I Avtalet ingår följande tjänster: 
Installation av fiberkabel (FTTH) för anslutning av Bostäder/Lokaler till Telias Nät i enlighet 
med "Bilaga: Installation”. Antal anslutna Bostäder/Lokaler uppgår till 777 st. Övriga portar 
uppgår till 0 st. För anslutning till Telias Nät utgår en engångsavgift om 892920.00 kr exklusive
moms.
Avgift för de kollektiva tjänsterna ska faktureras successivt i takt med att Bredbandstjänsterna 
aktiveras i respektive Fastighet. 
Installationshjälp till Boende avseende kollektiva tjänster från Telia i enlighet med Bilaga: 
Installationshjälp.
Boende får tillgång till Bredbandstjänster genom kollektiv anslutning enligt nedan. För 
undvikande av missförstånd noteras att Lokaler aldrig ansluts till Tv från Telia. För kollektiva 
tjänster utgår en månadsavgift om 0.79 kr/mån per Bostad. Fakturering av Fastighetsägaren 
sker kvartalsvis. 
a)Kollektivt Bredband - 100 Mbit/s levereras till 7 st. anslutningar. 
b)Kollektivt Bredband - 1000 Mbit/s levereras till 7 st. anslutningar. 
c)Kollektivt Bredband - 250 Mbit/s levereras till 7 st. anslutningar. 
d)Telia Telefoni levereras till 7 st. anslutningar. Parterna är överens om att 
samtalskostnader inte ingår i priset för den kollektiva tjänsten och att Boende ska betala 
ersättning till Telia för samtalskostnader enligt Telias vid var tid gällande prislista.
e)Telia Tv & Streaming Lagom levereras till 7 st. anslutningar (för undvikande av 
missförstånd noteras att endast privatbostäder ansluts till Tv från Telia). Förteckning av 
vid var tid aktuella kanaler framgår av telia.se. Parterna är dock överens om att Telia 
förbehåller sig rätten att ändra sammansättningen av kanaler. 

Konfidentiellt
${CreatedDate}
 Sidnr
8 (22)
Boende/Företag på Fastigheten i Bostad/Lokal får tillgång till Bredbandstjänster genom Öppen
Fiber och därmed möjlighet att välja mellan Tjänsteleverantörer. Boende/Företag ingår särskilt
avtal med vald Tjänsteleverantör om priser och villkor för leverans av Bredbandstjänst. 
Telia har rätt att en gång per år göra en indexförändring av de priser och avgifter som anges i 
Avtalet. En prisjustering med stöd av indexförändring kan första gången ske tidigast sex (6) 
månader efter det att Avtalet ingåtts. Indextalet för den oktobermånad som infaller året före 
det år då Avtalet ingås (basmånad) utgör indexets bastal. Om indextalet i någon påföljande 
oktobermånad (avräkningstidpunkt) har stigit i förhållande till indexets bastal ska priser och 
avgifter i Avtalet justeras med hänsyn till detta. Om inte annat anges ska SCB:s 
Konsumentprisindex (KPI) (1980=100) vara tillämpligt index. Telia meddelar Kunden om den 
aktuella indexförändringen senast trettio (30) dagar innan förändringen träder i kraft. En 
indexförändring ger inte Kunden rätt att säga upp berörd Tjänst eller Avtalet. Eventuella 
ytterligare villkor för indexering och tillämpligt index (om annat än SCB:s Konsumentprisindex 
(KPI)) anges i Avtalet.
Övriga vid var tid tillämpliga erbjudanden, aktuella priser och kampanjer framgår av telia.se.
4.Allmänna villkor
För Avtalet gäller Bilaga: Allmänna villkor.
5.Avtalstid
Så länge avtalet är i kraft äger Fastighetsägaren inte rätt att upplösas. Om Fastighetsägaren 
går i konkurs, träder i likvidation eller annars medverkar till en frivillig avveckling, gör denne sig
skyldig till väsentligt avtalsbrott.
Vid brott mot punkt 5.1 ovan äger Telia rätt att rikta krav mot Fastighetsägarens styrelse enligt 
Avtalet jämte Bilagor.
Avtalet gäller från och med undertecknandet för en initial period om 5 år räknat från det att 
Telia driftsatt tjänsterna enligt detta avtal.
Har inte Avtalet sagts upp senast tolv (12) månader före den initiala avtalsperiodens slut, 
förlängs det automatiskt att gälla ytterligare två (2) år. Därefter förlängs Avtalet med två (2) år i
taget med iakttagande av tolv (12) månaders uppsägningstid. Uppsägning ska vara skriftlig 
och behörigen undertecknad.
Avtalet har upprättats i två (2) exemplar av vilka Parterna tagit var sitt.
***********************************************************************************
Datum
${CreatedDate}
Telia Sverige AB
Datum
${CreatedDate}
Fastighets AB Castellum Grundet
Namnförtydligande
CRM Fiber Sales Rep
Namnförtydligande
Test Yogesh Jadhav

Konfidentiellt
${CreatedDate}
 Sidnr
9 (22)
Bilageförteckning
Bilaga: Definitioner
Bilaga: Fastighetsbeteckningar
Bilaga: Installation
Bilaga: Installationshjälp
Bilaga: Service
Bilaga: Allmänna villkor

Konfidentiellt
${CreatedDate}
 Sidnr
10 (22)
Bilaga: Definitioner 
Avtalet är detta avtal om Telia Fastighetsanslutning/Öppen Fiber, inklusive bilagor, mellan Telia 
och Fastighetsägaren.
Boende är boende i Enfamiljshus belägen i området.
Bostad är privatbostad som disponeras av en Boende.
Bostadsnät eller Lokalnät är fast installerad kabel med tillhörande LAN-uttag i Bostad/Lokal. 
Bostadsnät/Lokalnät är installerat för stadigvarande bruk och används för att sprida 
Bredbandstjänster vidare från Överlämningspunkten. Bostadsnät/Lokalnät omfattas inte av Telias 
ansvar om inte annat framgår av Avtalet.
Bredbandsswitch är utrustning i Bostad/Lokal, som innehåller RJ45-portar genom vilka 
Tjänsteleverantör ges möjlighet att leverera Bredbandstjänst till Slutkund. Port på Bredbandsswitch
eller Medieomvandlaren utgör Överlämningspunkt för Bredbandstjänst. Medieomvandlare i form av 
SFP är monterad i Bredbandsswitch i FTTH-nät. Bredbandsswitch ägs av Telia.
Bredbandstjänster är Tjänsteleverantörs vid var tid tillhandahållna slutkundstjänster, till exempel 
bredband och telefoni.
Enfamiljshus är byggnad på en enskilt ägd fastighet (villa, radhus, kedjehus, etc.) som utgör en 
Boendes privatbostad eller annan lokal på sådan Fastighet som disponeras av näringsidkare. 
Fastighet är den egendom som angivits i Avtalet. Som Fastighet anses även i förekommande fall 
byggnad på ofri grund.
Fastighetsägare är fysisk eller juridisk person som, ensam eller tillsammans med andra, äger den 
eller de Fastigheter som omfattas av Avtalet. Fastighetsägare enligt Avtalet kan t.ex. vara en 
ekonomisk förening, samfällighet eller aktiebolag.
Fel är avvikelse som medför att Bredbandstjänst inte är tillgänglig för Slutkund, eller där 
Bredbandstjänstens funktion är så kraftigt nedsatt att den är att betrakta som obrukbar.
FTTH (Fibre To The Home) är en nätrealisering där Enfamiljshuset/Bostaden/Lokalen ansluts med 
fiberkabel fram till Överlämningspunkt.
Företag är näringsidkare som är nyttjanderättshavare till en Lokal på Fastigheten.
Intag är kanalisation eller utrymme i en byggnads yttervägg som är avsedd att leda in Telias Nät i 
byggnaden. Telia fastställer punkt för terminering av nätet.
Kanalisation är rör avsett för indragning av kabel. 
Kundplacerad Utrustning är utrustning (inklusive programvara), som ägs eller tillhandahålls av 
Telia och som placeras på Fastigheten för att möjliggöra tillhandahållandet av Bredbandstjänster till
boende/företag. Utrustning placerad hos Slutkund som ett resultat av individuellt avtal omfattas inte
av denna definition.
Lokal är företagslokal som disponeras av näringsidkare eller annan lokal som är belägen på 
Fastigheten.
Maximal åtgärdstid är den tidsperiod som det längst får ta att åtgärda ett Fel. Maximal åtgärdstid 
anges i timmar under gällande Servicetid och räknas fr.o.m. den tidpunkt då Telia mottagit 
felanmälan från Fastighetsägaren eller Telias tekniker gällande Fiberkabel (FTTH) t.o.m. den 
tidpunkt då Telia klarrapporterat anmält Fel.
Medieomvandlare är en nätkomponent i FTTH-nät som omvandlar den optiska signalen till 
elektrisk signal i Enfamiljshuset/Bostaden/Lokalen. Medieomvandlare är placerad vid 
Överlämningspunkt och kan vara en fristående enhet eller SFP monterad i Bredbandsswitch. 
Medieomvandlaren ägs av Telia. Servicevillkor för Medieomvandlare framgår av Avtalet.
Servicefönster är den tidsperiod, måndagar mellan kl 00.00 och 04.00, när Telia har rätt att 
genomföra planerade arbeten i Telias Nät som medför avbrott i Bredbandstjänst.

Konfidentiellt
${CreatedDate}
 Sidnr
11 (22)
Servicetid är den tidsperiod inom vilken Telia åtagit sig att åtgärda Fel.
SFP är ”Small form-factor pluggable transceiver” vilket är en Medieomvandlare som monteras t.ex. 
i nätverksutrustning som Bredbandsswitch.
Slutkund är Boende eller Företag som ingått avtal med Tjänsteleverantör om individuell leverans 
av Bredbandstjänst.
Telia är Telia Sverige AB.
Telias Nät är de allmänna kommunikationsnät som ägs eller på annat sätt disponeras av bolag 
inom Telia-koncernen. Sådant bolag svarar för drift av Telias Nät. 
Tjänsteleverantör är Telia eller den som ingått avtal med Telia om tillhandahållande av 
Bredbandstjänster till Slutkund i Överlämningspunkt.  
Tjänstespecifik hårdvara är hårdvara placerad efter Överlämningspunkt för Tjänsteleverantörs 
leverans av Bredbandstjänst t.ex. router, tv-box eller telefoniadapter. Villkor för Tjänstespecifik 
hårdvara framgår av avtal mellan Tjänsteleverantör och dennes avtalspart, vilket vid individuellt 
tecknade avtal är Slutkund. I de fall Fastighetsägare och Telia avtalar om kollektiv leverans framgår
villkoren för den Tjänstespecifika hårdvaran av Avtalet.
Överlämningspunkt är den första punkt i Bostad eller Lokalen där Slutkund har möjlighet att ta 
emot Bredbandstjänst. Överlämningspunkt utgörs av LAN-uttag (RJ45) på Medieomvandlare.

Konfidentiellt
${CreatedDate}
 Sidnr
12 (22)
Bilaga: Fastighetsbeteckningar
Nedan visas vilka Fastigheter som omfattas av Avtalet:
[ABCD]

Konfidentiellt
${CreatedDate}
 Sidnr
13 (22)
Bilaga: Installation
Denna bilaga kompletteras av bestämmelserna i Bilaga: Allmänna villkor.
Om Parterna inte uttryckligen kommit överens om installation av fiberkabel genom punkten 3 (Tjänster
och priser) i Avtalet, omfattas installation av fiberkabel inte av Telias åtagande. Telias 
installationsåtagande omfattar under sådana omständigheter endast installation av Kundplacerad 
Utrustning. Telia ansvarar för drift och underhåll av sådan utrustning under avtalstiden.
För det fall Telia sedan tidigare har installerad Kundplacerad Utrustning på Fastigheten har Telia ingen
skyldighet att installera Kundplacerad Utrustning. Medieomvandlare tillhandahålls och ägs av Telia.
Vi drar fiberkablar från telestationen till Bostäderna/Lokalerna på de Fastigheter som ska anslutas. 
Installationen inom Fastigheten planeras utifrån förutsättningarna i varje enskilt fall och en individuell 
bedömning av respektive Fastighet utförs vid projekteringsmötet. 
Projekteringsmöte inför installationen
En tid efter avtalstecknande kontaktas Fastighetsägaren av entreprenören, för att boka tid för 
projekteringsmöte. Vid projekteringsmötet går entreprenören tillsammans med Fastighetsägaren 
igenom hur installationen ska genomföras på Fastigheten och i de enskilda Bostäderna/Lokalerna. I 
samband med projekteringsmötet ska Avtal om Fiberanläggning ingås mellan Fastighetsägaren och 
bolag inom Telia-koncernen. Avtalet reglerar upplåtelse och ansvar för den planerade installationen.
Inför projekteringsmötet är det viktigt att Fastighetsägaren förbereder följande:
Ha relevanta ritningar över Fastigheten tillgängliga.
Tillträde för att inspektera utrymmen där installationsarbete planeras, vid behov även till 
Bostäderna/Lokalerna.
Säkra samtycke från Boende/Lokalinnehavare, gällande installationen i Bostäderna/Lokalerna och 
placeringen av Medieomvandlaren. Boende/Lokalinnehavare får gärna delta vid projekteringen.
Installation
Fastighetsägaren kontaktas av entreprenören i god tid inför installationen. Fastighetsägaren ansvarar 
för informationen till Boende/Lokalinnehavare.
Utomhus: Fiberkabeln dras från en anslutningspunkt i gatan till den närmaste punkten i byggnaden, 
och därifrån in genom husets yttervägg. Fiberkabeln kan dras via grävning, luftledningar eller redan 
befintliga kabelrör och bestäms utifrån Fastighetens förutsättningar under projekteringsmötet med 
entreprenören. Om vi behöver gräva, blir diket ca 5-40 cm brett och ca 20-40 cm djupt. Röret kan ligga
grundare beroende på specifika markförhållanden. Vi försöker göra så lite åverkan som möjligt på din 
tomt. När kabeln är dragen fyller vi igen diket, men ytskiktet på den enskilda tomten måste 
Fastighetsägaren själv återställa, t ex sådd av nytt gräs eller plattsättning.
Inomhus: Vid installation inne i byggnaden ska Fastighetsägaren finnas på plats för att vid behov låsa
upp och ge entreprenören tillträde till nödvändiga utrymmen. Boende/Lokalinnehavare behöver vara 
hemma vid installation i respektive Bostad/Lokal, alternativt behöver nyckel finnas tillgänglig för att 
komma in i Bostaden/Lokalen. I varje Bostad/Lokal installeras ett fiberuttag. Från fiberuttaget drar vi 
fiber till den plats, upp till 5 meter in i boytan/lokalytan, där utrustningen ska placeras. Vi installerar 
Medieomvandlaren och Fastighetsägaren ansvarar för att det finns ett eluttag på överenskommen 
plats.
Vi tar hand om hela installationen.

Konfidentiellt
${CreatedDate}
 Sidnr
14 (22)
För tydlighets skull anges nedan exempel på vad som inte ingår i installationen. Exemplifieringen är 
inte uttömmande. I installationen ingår t.ex. inte:
Installationshjälp av tjänster (om inte uttryckligen avtalats i detta Avtal).
Flytt av skrymmande föremål och möbler.
Kostnad för eventuella eluttag i Bostäder/Lokaler och i Fastighetens Teknikutrymme.
Installation av Fiberkabel (FTTH) och Bostadsnät/Lokalnät (om inte uttryckligen avtalats i detta 
Avtal).
Håltagning i känsliga material som kakel, sten m.m.
Arbete med miljöfarligt material, t.ex. asbest.
Merkostnad för installation i K-märkta byggnader.
Merkostnad vid tjäle i mark.
Merkostnad för målningsarbeten.
Kostnad förenlig med Fastighetens Teknikutrymme.
El-anslutning av ev. bredbandsskåp.
El-uttag
Installation av extrauttag (telefonjack) för anslutning till befintligt telefonnät.
Omkoppling eller flytt av telefonjack.
Test eller annat jobb i utrustning som ägs av kunden (t.ex. pc, tv, router, dvd, etc.). 
Anslutning via befintliga kabelrör
1.Kabelstråk i gatan
2.Om det finns färdiga kabelrör som går att nyttja 
används de, annars kan vi behöva gräva
3.Intag i husets yttervägg
4.Fiberuttag och Medieomvandlare
Anslutning via luftledning
1.Luftburen kabel
2.Intag i husets yttervägg
3.Fiberuttag och Medieomvandlare

Konfidentiellt
${CreatedDate}
 Sidnr
15 (22)
Bilaga: Installationshjälp
Om Parterna uttryckligen kommit överens om installationshjälp till Boende avseende kollektiva 
tjänster från Telia genom Avtalets huvuddokument, punkt 3 (Tjänster och priser) utförs 
installationshjälpen enligt nedan.
LAN-uttag eller Medieomvandlare lokaliseras.
Om hårdvaran levererats till Fastighetsägaren, upphämtning av hårdvaran hos angiven person 
hos Fastighetsägaren.
Inkoppling av hårdvara till bostadsnät. 
Bredband: Inkoppling av en dator/surfplatta för att funktionstesta Bredbandstjänst. 
Kom-igång-hjälp för telefoni ex. inkoppling av SIM-kort
Tv: Inkoppling av en (1) tv-box till Telia Tv.
Kontroll av att bredband, telefoni och Tv fungerar.
Boende får endast tillgång till ett (1) tillfälle av installationshjälp.
När ny Boende flyttar in ges möjlighet till ett (1) tillfälle av installationshjälp.

Konfidentiellt
${CreatedDate}
 Sidnr
16 (22)
Bilaga: Service
Serviceansvar för Telia Fastighetsanslutning, Telia Öppen Fiber (FTTH) 
Detta dokument beskriver Telias serviceansvar för det fall Parterna ingått avtal om Telia 
Fastighetanslutning eller Telia Öppen Fiber.
Servicebeskrivning
Ägande och Serviceansvar FTTH-nät
Fiberkabel (FTTH) ägs av bolag inom Telia-koncernen. Telia har serviceansvar för detta. 
Medieomvandlare vid respektive Slutkunds Överlämningspunkt ägs av Telia. Telia har 
serviceansvar för Medieomvandlare, vilket innebär att Telia ersätter Medieomvandlare som är 
behäftad med Fel efter felanmälan från Tjänsteleverantör, Boende eller Fastighetsägare. Vid yttre
åverkan på Medieomvandlare fakturerar Telia Fastighetsägaren för byte av Medieomvandlare 
enligt gällande prislista.
Eventuell Bredbandsswitch och Medieomvandlare ägs av Telia som även har serviceansvar för 
dessa. Endast Telia har rätt att managera Bredbandsswitch, vilket innebär att endast Telia har 
rätt att logga in i denna, eller på annat sätt påverka dess konfiguration.
Tjänstespecifik hårdvara regleras avseende ägande och serviceansvar beroende av kollektivt 
eller individuellt avtal med Tjänsteleverantör. I kollektiva avtal äger Fastighetsägaren tv-box och 
trådlös router, Telia har serviceansvar under avtalstid. För individuella avtal gäller ägande och 
serviceansvar enligt avtal mellan Slutkund och Tjänsteleverantör.
I de fall Tjänstespecifik hårdvara tillhandahålls från Telia ansvarar Fastighetsägaren för att det 
finns en lämplig yta att placera denna på i respektive Bostaden/Lokalen. För de fall teknikskåp 
har byggts ansvarar Fastighetsägaren för att detta är byggt i ett material som wifi-signal kan ta sig
igenom och inte, till exempel i metall.
Felavhjälpning vid Fel som drabbar enskild Slutkund
1.Slutkunden felanmäler till Tjänsteleverantör.
2.I förekommande fall informerar Tjänsteleverantör om kända driftstörningar.
3.Telia felsöker och åtgärdar vid behov sin tjänsteplattform, samt kontrollerar att Slutkundens 
inkoppling till Bredbandstjänsten är korrekt och att Felet inte finns i Slutkundens egen utrustning 
eller handhavande av Bredbandstjänsten. 
4.Tjänsteleverantör felanmäler vid behov till Telia.
5.I de fall Felet inte kan avhjälpas fjärrmässigt bokar Telias servicetekniker tid med Slutkund och i 
vissa fall även med Fastighetsägarens tekniske kontaktperson. Telias servicetekniker genomför en 
felanalys och åtgärdar eventuella Fel som ligger inom Telias serviceansvar.
I nedanstående tabell framgår Servicetid och Maximal åtgärdstid för de fall privat- respektive 
företagskunder är drabbade av Fel. Servicetid och Maximal åtgärdstid räknas fr.o.m. den tidpunkt då 
Felet anmälts till av Telia angiven kontaktpunkt.
Telias felavhjälpning vid enskild 
kundfelanmälan
ServicetidMaximal åtgärdstid
Fel som berör privatkund
Helgfri mån-fre 
07.30-18.00
24 timmar inom ramen för 
servicetid
Fel som berör företagskund
Helgfri mån-fre 
07.30-18.00
12 timmar inom ramen för 
servicetid
Felanmälansingång för Fastighetsägaren
Fel som berör minst tre Slutkunder på samma tjänst kan felanmälas av Fastighetsägaren till Telias 
Fastighetsägaringång på telefon 020-30 00 60, val 2. Vid Avtalets tecknande har 
Fastighetsägaringången följande öppettider.

Konfidentiellt
${CreatedDate}
 Sidnr
17 (22)
Fastighetsägaringångens öppettider
Vardagar08.00-16.00
Aktiv nätövervakning
Telia har en aktiv övervakning av hela sitt bredbandsnät, dygnet runt, årets alla dagar. Övervakningen 
omfattar all utrustning i Telias Nät. Telia tar hand om larm från nätet och genomför fjärrmässig analys 
och om möjligt fjärrmässig felavhjälpning. 
I de fall det krävs åtgärd av tekniker i fält har Telia tillgång till en rikstäckande organisation av tekniker 
som hanterar alla förekommande felsituationer. Vid större felsituationer arbetar dessa dygnet runt, 
med stöd av Telias expertis. 
I de fall reservdelar krävs har Telia avtal med logistikpartners som distribuerar reservdelar över hela 
landet. 
Planerade arbeten i Telias Nät
Telia arbetar kontinuerligt för att säkerställa hög kvalitet, säkerhet och rätt funktionalitet i Telias Nät. 
Detta innebär att det ibland krävs arbeten i nätet som stör Boendes användning av 
Bredbandstjänsterna, till exempel i samband med mjukvaruuppgraderingar eller kapacitetsutökningar. 
Arbeten i Telias Nät som innebär att Boendes användning av Bredbandstjänsterna störs, utförs så 
långt det är möjligt i Servicefönster, måndagar kl. 00.00-04.00. 
Fastighetsägarens ansvar
För att Telia ska kunna garantera service- och åtgärdstider krävs att Fastighetsägaren fullgör sitt 
ansvar enligt nedan. Fastighetsägaren ansvarar för att:
Telia har tillgång till aktuella kontaktuppgifter till person som kan ge Telia tillträde till nödvändiga 
fastighetsutrymmen vid serviceåtgärder. Ändring av kontaktuppgifter ska utan dröjsmål anmälas 
av Fastighetsägaren till Telias ingång för Fastighetsägare på telefon 020-30 00 60, val 1.
Inom 60 minuter från den tidpunkt då Telia kontaktat Fastighetsägaren ska Telias servicepersonal
beredas tillträde till nödvändiga lokaler inom Fastigheten i samband med serviceåtgärder. Detta 
gäller alla dagar kl. 07.30-24.00. Behov av tillträde till utrymmen under andra tidpunkter än 
servicetider angivna i ovanstående avsnitt ”Felavhjälpning vid Fel som drabbar enskild Slutkund” 
gäller i huvudsak Nätfel.
Informera Telia i god tid och senast 5 arbetsdagar innan arbete ska påbörjas som innebär att 
avbrott i Bredbandstjänst för anslutna Slutkunder planeras, t.ex. avbrott i strömförsörjning. Datum 
för avbrottet, starttid, sluttid, adress samt kontaktperson mailas till 
controlcenter.cm@teliacompany.com.
Fiberkabel (FTTH) inom fastighet är skyddad från allmänheten. 
I de fall Telia inte kunnat uppfylla sitt serviceansvar inom Maximal Åtgärdstid pga. att 
Fastighetsägaren underlåtit att fullgöra sina skyldigheter enligt Avtalet har Telia rätt till ersättning från 
Fastighetsägaren för direkt och indirekt skada, exempelvis i form av berättigade ersättningsanspråk 
från Slutkunder.

Konfidentiellt
${CreatedDate}
 Sidnr
18 (22)
Bilaga: Allmänna villkor 
Telias Integritetspolicy
Den personliga integriteten hos våra kunder är viktig för oss på Telia. I Telias integritetspolicy på www.telia.se finns mer 
information om vilka personuppgifter Telia behandlar, typ av behandling, ändamålet och den rättsliga grunden för behandlingen, 
uppgifternas lagringstid samt individens rätt till bl.a. information, rättelse, radering och rätten att göra invändningar. 
1Inledning
1.1Dessa allmänna villkor gäller då Telia till en 
Fastighetsägare möjliggör anslutning av 
Bostäder/Lokaler till Telias Nät genom fiberkabel. 
Efter överenskommelse kan Telia även 
tillhandahålla andra tjänster, såsom  Telias 
Bredbandstjänster genom kollektiv anslutning till 
Boende/Företag på aktuella Fastigheter eller 
anslutning till Öppen Fiber. De tjänster som 
tillhandahålls specificeras i Avtalet.
1.2Avtalet reglerar inte tillhandahållande av 
Bredbandstjänster i relationen direkt till 
Boende/Företag. Boende/Företaget kan få tillgång 
till Bredbandstjänst kollektivt via Fastighetsägaren 
eller individuellt genom att teckna ett särskilt avtal 
om Bredbandstjänst med en Tjänsteleverantör.
1.3Boende/Företag som får möjlighet att tillgå 
Bredbandstjänst kollektivt från Telia genom 
Fastighetsägaren måste aktivera 
Bredbandstjänsten för att ta del av den. 
Bredbandstjänsten aktiveras genom att 
Boenden/Företaget kontaktar Telia och uppger 
namn, adress och eventuell e-postadress. Genom 
att aktivera Bredbandstjänsten ingår 
Boenden/Företaget särskilt avtal med Telia om 
Bredbandstjänsten.
2Telias åtaganden
2.1Telia ska tillhandahålla aktuella tjänster på ett 
fackmässigt sätt i överensstämmelse med Avtalet.
2.2Telia har rätt att anlita underleverantörer för att 
fullgöra sina åtaganden enligt Avtalet. Telia svarar i
så fall för underleverantörens arbete såsom för 
eget arbete.
2.3Vid anslutning till Telias Nät i befintlig bebyggelse 
ska anslutningen ske vid den tidpunkt som 
skriftligen överenskommits mellan Parterna. Telia 
ansvarar för leverans av kabel fram till 
Överlämningspunkten.
2.4Innan eventuell grävning påbörjas inom Fastighet 
kontaktas Fastighetsägaren för samråd om det 
praktiska utförandet. 
2.5Om Telias Bredbandstjänst tillhandahålls till 
Boende eller Företag kollektivt via 
Fastighetsägaren har Telia rätt att stänga eller 
begränsa Bredbandstjänsten för en eller flera 
Boenden eller Företag i den utsträckning som 
anges i Telias allmänna villkor för tjänster till 
företag samt Telias allmänna villkor för tjänster till 
konsument vid motsvarande förhållanden som där 
anges, oavsett om detta har sin grund i handlande 
eller underlåtenhet från Fastighetsägarens eller 
från Boendens/Företagets sida.
3Fastighetsägarens åtaganden
3.1Fastighetsägaren ska på egen bekostnad bereda 
Telia tillträde till Fastigheten. Med avseende på 
installation och/eller anslutning av fiberkabel ska 
Telia ges tillträde skyndsamt och utan vidare 
dröjsmål. Med avseende på service ska Telia ges 
tillträde i enlighet med vad som framgår av Avtalet. 
Telia ska beredas fri framkomlighet där arbeten 
ska utföras. Flytt av möbler och liknande omfattas 
inte av Telias åtaganden. Fastighetsägaren ska 
vidare förse Telia med lista över kontaktpersoner 
avseende tillträde till Fastigheten.
3.2Fastighetsägaren ansvarar för att eventuellt 
bygglov och andra myndighetstillstånd som avser 
Fastigheten i förekommande fall införskaffas för 
anläggning av det som ska installeras. 
Fastighetsägaren ska bereda Telia nödvändigt 
bistånd och står för kostnaden nämnda sådant 
tillstånd. Om tillstånd inte medges, har Telia rätt att
med omedelbar verkan frånträda Avtalet.
3.3Fastighetsägaren ansvarar för att el finns 
framdragen till Kundplacerad Utrustning senast 
den dag Parterna avtalat att installation av 
fiberkabel och Kundplacerad Utrustning ska vara 
färdigställd. Om så inte sker, har Telia rätt att själv 
eller genom underleverantör företa sådan 
framdragning av el på Fastighetsägarens 
bekostnad. Fastighetsägaren ansvarar vidare för 
den strömförbrukning som är nödvändig för driften 
av Kundplacerad Utrustning.
3.4Fastighetsägaren står risken för skada på eller 
förlust av Kundplacerad Utrustning från den 
tidpunkt då den Kundplacerade Utrustningen 
installerats. Kundplacerad Utrustning får inte utan 
Telias skriftliga medgivande flyttas från den plats 
där den installerats.
3.5Fastighetsägaren får inte utan Telias skriftliga 
medgivande reparera, utföra service på, göra 
påbyggnader på eller ändringar i, eller ta bort delar 
eller märkning avseende ägandeförhållanden från 
Kundplacerad Utrustning. Fastighetsägaren ska 
följa de anvisningar som Telia från tid till annan 
utfärdar beträffande skötsel och användning av 
Kundplacerad Utrustning. Fastighetsägaren 
ansvarar vidare för att förhindra att obehörig 
person ges tillgång till Kundplacerad Utrustning 
och Fastighetsägaren ska omedelbart meddela 
Telia om så ändå sker.
3.6Fastighetsägaren ska vidta alla rimliga åtgärder för 
att säkerställa att inte Boende/Företag eller annan 
vidtar åtgärder som medför störningar för 
Kundplacerad Utrustning. Fastighetsägaren svarar 

Konfidentiellt
${CreatedDate}
 Sidnr
19 (22)
även för att utan oskäligt dröjsmål stoppa sådana 
störningar.
4Installation av fiberkabel och Kundplacerad 
Utrustning
4.1Telia kallar Fastighetsägaren till ett startmöte i 
syfte att gå igenom installationsprocessen och 
andra relevanta frågor. Respektive Part ska utse 
var sin kontaktman för att ansvara och hantera 
löpande frågor rörande installationen. Vardera 
Parten ska bära sina respektive kostnader för 
startmötet. På startmötet ska Parterna 
överenskomma om detaljerad tidplan och former 
för arbetets utförande.
4.2I god tid innan installationen påbörjas och senast 
vid startmötet ska Fastighetsägaren förse Telia 
med fastighetsbeskrivning, ritningar över 
Fastigheten och berörda byggnader utvisande 
nödvändig information för anslutning och 
installation. Fastighetsägaren ansvarar för att 
sådan information är korrekt och fullständig.
5Ersättning
5.1Fastighetsägaren ska betala i Avtalet 
överenskommen ersättning. Samtliga priser är 
exklusive mervärdesskatt. Fakturaavgift tillkommer 
för pappersfaktura.
5.2Fastighetsägaren ska betala faktura inom trettio 
(30) dagar från fakturadatum i enlighet med 
anvisningar angivna på fakturan. Vid 
förskottsbetalning enligt punkt 5.5 ska betalning 
ske senast den dag Telia anger.
5.3Debitering av i Avtalet ingående tjänster påbörjas 
vid tidpunkt som Parterna överenskommit i Avtalet 
eller annars på avtalad leveransdag eller, om 
leveransen är försenad av orsak enbart hänförlig till
Telia, från den dag då leverans faktiskt sker.
5.4Om Fastighetsägaren inte fullgjort betalningen 
senast på förfallodagen har Telia rätt till ersättning 
för betalningspåminnelser och inkassokostnader 
samt till dröjsmålsränta enligt lag. Om 
Fastighetsägaren, trots påminnelse och stängning 
av Tjänsten inte betalar förfallen faktura, ska övrig 
ersättning för Tjänsten som ännu inte har 
fakturerats anses förfallen till omedelbar betalning.
5.5Telia har rätt att under avtalstiden begära 
förskottsbetalning eller att Fastighetsägaren ställer 
säkerhet för Avtalets rätta fullgörande om det till 
följd av kreditprövning framstår som befogat. Ränta
utgår inte på förskotterat belopp. Telia har vidare 
rätt att ur förskotterat belopp eller ställd säkerhet 
tillgodogöra sig belopp motsvarande sina förfallna 
fordringar, inklusive sådana kostnader som avses i 
punkt 5.4.
5.6Telia har rätt att överlåta sin rätt till betalning enligt 
Avtalet till annan.
5.7Bestämmelserna i detta avsnitt 5 ska äga 
motsvarande tillämpning för det fall 
Fastighetsägaren inom ramen för avtalet 
tillhandahåller tjänster till Telia.
6Äganderätt och nyttjanderätt
6.1Kundplacerad Utrustning, ägs av Telia som svarar 
för drift och underhåll av denna utrustning. Ägande 
och ansvar för annan utrustning som Telia 
installerat i Bostad/Lokal framgår av Avtalet. Telia 
förbehåller sig rätten att utföra 
konfigurationsändringar, uppgraderingar samt i 
övrigt disponera den Kundplacerade Utrustningen 
för utveckling av tjänster under den tid som 
utrustningen är ansluten mot Bredbandstjänst. 
Under omständighet att den Kundplacerade 
Utrustningen inte ägs av Telia, förbehåller sig Telia
likväl rätten att utföra konfigurationsändringar, 
uppgraderingar samt i övrigt disponera sådan 
utrustning för utveckling av tjänster under den tid 
som utrustningen är ansluten mot Bredbandstjänst.
6.2Avtalet innebär inte att äganderätten till 
Kundplacerad Utrustning övergår till 
Fastighetsägaren och Fastighetsägaren får inte 
sälja, pantsätta, hyra eller låna ut eller på annat 
sätt förfoga över sådan utrustning utan att Telia 
först lämnat skriftligt medgivande därtill.
7Överlåtelse av rättigheter och skyldigheter
7.1Med undantag för de särskilda fall som anges 
nedan, har Part inte rätt att överlåta sina rättigheter
och skyldigheter enligt Avtalet utan den andre 
Partens skriftliga samtycke. Telia har dock rätt att 
överlåta sina rättigheter och skyldigheter enligt 
Avtalet till annat bolag inom Telias koncern. Telia 
ska skriftligen meddela Fastighetsägaren om detta 
sker.
7.2Fastighetsägaren garanterar att denne vid 
överlåtelse av Fastigheten ska göra förbehåll för de
nyttjanderätter och andra rättigheter som upplåts 
till Telia eller annat Telia bolag enligt Avtalet, så att
Avtalet gäller mot förvärvare av Fastigheten. 
Fastighetsägaren ska vid överlåtelse av 
Fastigheten överlåta sina rättigheter och 
skyldigheter enligt Avtalet till förvärvare av 
Fastigheten.
8Förtida upphörande
8.1Vardera Parten får säga upp Avtalet med 
omedelbar verkan om: 
a)den andra Parten inleder 
likvidationsförhandlingar, inger ansökan om 
företagsrekonstruktion, inleder ackord, försätts i 
konkurs eller eljest kan antas vara på obestånd, 
eller;
b)den andra Parten har gjort sig skyldig till 
väsentligt avtalsbrott som inte åtgärdats inom tio
(10) arbetsdagar efter skriftlig begäran.
8.2Uppsägning enligt punkt 8.1 ska ske skriftligen.
8.3Definitionerna i Avtalets Bilaga Definitioner samt 
bestämmelserna i dessa Allmänna villkor 
punkterna 3.3 - 3.6, 7.1 – 7.2, 9.1 – 9.4, 10.1 - 
10.3, 11.1 – 11.3 samt 13.1 – 13.3 ska äga fortsatt 
giltighet även efter Avtalets upphörande till dess 

Konfidentiellt
${CreatedDate}
 Sidnr
20 (22)
Telias avtal med Boende/Företaget om 
Bredbandstjänst upphört att gälla.
9Skadestånd
9.1Part har rätt till ersättning för direkt skada som 
motparten, eller någon för vilken motparten svarar, 
förorsakat genom vårdslöshet. Part har inte någon 
rätt till ersättning för indirekta skador, såsom 
utebliven handelsvinst, kostnader som blivit 
onyttiga eller andra följdskador. Parts ansvar är 
vidare för varje skadetillfälle begränsat till ett 
sammanlagt belopp motsvarande trettiofem (35) 
prisbasbelopp enligt lagen (1962:381) om allmän 
försäkring, om inte annat anges i Avtalet.
9.2Oaktat vad som föreskrivs i punkt 9.1 ovan 
ansvarar Telia inte för skada som uppkommer för 
Fastighetsägaren till följd av innehåll i data eller 
annan information som förmedlas vid användning 
av tjänster enligt Avtalet, inte heller ansvarar Telia 
för skada orsakad av datavirus eller motsvarande, 
försening, förvanskning eller förlust av data eller för
Fastighetsägaren eventuella ersättningsskyldighet 
gentemot tredje man.
9.3Begränsningarna av Parts skadeståndsskyldighet 
gäller inte i fall av uppsåt eller grov vårdslöshet, vid
personskada eller vid sådant ansvar som följer av 
tvingande lag. Begränsningarna av Parts 
skadeståndsskyldighet gäller vidare inte vid skada 
som uppkommit till följd av att Fastighetsägaren 
brutit mot punkt 7.2.
9.4Begäran om skadestånd skall, för att kunna göras 
gällande, framställas skriftligen senast två (2) 
månader efter det att felet, förseningen eller 
skadan upptäckts eller bort upptäckas.
10Force majeure
10.1Part är befriad från skyldighet att ersätta skada 
eller att fullgöra viss förpliktelse enligt Avtalet, om 
skadan eller underlåtenheten har sin grund i 
omständighet utanför Parts kontroll, av det slag 
som anges nedan ("Befriande Omständighet") och 
omständigheten förhindrar, avsevärt försvårar eller 
försenar fullgörande av sådan förpliktelse. 
Detsamma gäller om underlåtenheten har sin 
grund i försenade leveranser från Parts 
underleverantör som orsakats av Befriande 
Omständighet.
10.2Såsom Befriande Omständighet ska anses bland 
annat myndighets åtgärd eller underlåtenhet, 
nytillkommen eller ändrad lagstiftning, 
arbetskonflikt, blockad, krig, upplopp, sabotage, 
extrema väderförhållanden, blixtnedslag, brand, 
explosion, översvämning, naturkatastrof, 
olyckshändelse eller kabelbrott som orsakats av 
tredje man.
10.3Part som påkallar befrielse enligt punkt 10.1 ska 
utan dröjsmål underrätta andra Parten därom. 
Befrielsegrund anses föreligga så länge Befriande 
Omständighet utgör hinder för fullgörande, dock 
högst tre (3) månader. Därefter har vardera Parten 
rätt att frånträda Avtalet utan att några påföljder på 
grund av detta kan göras av den andra Parten.
11Sekretess
11.1Part förbinder sig att inte för tredje man avslöja 
Konfidentiell Information, vilken Part erhåller eller 
erhållit från den andra Parten. Med "Konfidentiell 
Information" avses varje upplysning - teknisk, 
kommersiell eller av annan art, förutsatt att sådan 
information rimligen kan anses vara av konfidentiell
natur, oavsett om upplysningen dokumenteras eller
inte - med undantag för:
a)upplysning, som är allmänt känd eller kommer till
allmän kännedom på annat sätt än genom brott 
mot innehållet i Avtalet, eller,
b)upplysning, som Part kan visa att Part redan 
kände till innan han mottog den från den andra 
Parten, eller,
c)upplysning, som Part mottagit eller kommer att 
mottaga från tredje man utan att vara bunden av
sekretessplikt i förhållande till denne.
11.2Bestämmelserna i punkt 11.1 innebär inte hinder 
för Part att lämna ut Konfidentiell Information när 
sådant erfordras på grund av bestämmelse i lag 
eller på grund av domstols eller myndighets beslut.
11.3Telia får lämna ut Konfidentiell Information till annat
bolag inom Teliakoncernen. Därutöver får den Part 
som mottar Konfidentiell Information lämna ut 
informationen endast till sådana anställda, 
styrelseledamöter, konsulter och underleverantörer
som behöver tillgång till informationen för att 
Avtalet ska kunna fullföljas. Mottagande Part 
ansvarar för att sådana personer före sådant 
utlämnande är medvetna om och följer 
bestämmelserna i Avtalet.
12Övrigt
12.1Ändringar av eller tillägg till Avtalet ska för att vara 
bindande vara skriftligen avfattade och 
undertecknade av Parterna.
12.2Avtalet utgör Parternas fullständiga reglering av 
alla frågor som Avtalet berör. Alla skriftliga eller 
muntliga överenskommelser, åtaganden eller 
utfästelser som föregått Avtalet ska ersättas av 
innehållet i Avtalet.
12.3I Avtalet angivna priser och överenskomna 
leveranstider förutsätter att dels de faktiska 
omständigheterna rörande Fastigheten 
överensstämmer med vad Fastighetsägaren 
uppgivit senast i samband med Avtalets ingående, 
dels att installations- och anslutningsarbetena inte i
övrigt stöter på hinder som inte skäligen kunde 
förutses av Telia vid Avtalets ingående. I annat fall 
har Telia rätt till ersättning från Fastighetsägaren 
för eventuella tillkommande kostnader.
12.4Telia utvecklar fortlöpande sina tjänster och 
tekniska plattformar. Telia äger rätt att ändra eller 
modifiera tjänsterna som levereras under detta 
Avtal, inklusive tekniska plattformar, under 
förutsättning att tjänsternas prestanda eller 
funktionalitet därmed inte försämras. Sådan 

Konfidentiellt
${CreatedDate}
 Sidnr
21 (22)
ändring eller modifiering ska utföras på ett sådant 
sätt att eventuella störningar begränsas.
13Tillämplig lag och tvist
13.1Parternas rättigheter och skyldigheter vid tolkning 
och tillämpning av Avtalet ska bestämmas i 
enlighet med svensk lag.
13.2Tvist i anledning av Avtalet ska slutligt avgöras i 
Stockholm genom skiljedom vid Stockholms 
Handelskammares Skiljedomsinstitut (”Institutet”).
13.3Institutets Regler för Förenklat Skiljeförfarande ska 
gälla om inte Institutet med beaktande av målets 
svårighetsgrad, tvisteföremålets värde eller övriga 
omständigheter bestämmer att Reglerna för 
Stockholms Handelskammares Skiljedomsinstitut 
ska tillämpas på förfarandet. I sistnämnda fall ska 
Institutet också bestämma om skiljenämnden ska 
bestå av en eller tre skiljemän. Oaktat vad ovan 
anges har Part rätt att vända sig till svensk domstol
eller annan behörig myndighet om tvistigt 
kapitalbelopp inte överstiger etthundratusen 
(100 000) EUR.

Konfidentiellt
${CreatedDate}
 Sidnr
22 (22)`;
  await utilityFunctionLocal.VerifyContractPDFDocumentContent(page, expectedText);

  //Close all browserss
  await context.close();
});



