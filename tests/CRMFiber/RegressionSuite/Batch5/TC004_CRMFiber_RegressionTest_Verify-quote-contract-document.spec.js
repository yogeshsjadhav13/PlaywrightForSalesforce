const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const TestCaseName = 'TC004_CRMFiber_RegressionTest';


test('TC004_CRMFiber_RegressionTest_SOHO_NewSales-Verify-quote-contract-document', async function ({ browser }) {

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
var expectedText = `Halebop Fastighetsanslutning

Med Halebop får ni en supersnabb, stabil och framtidssäkrad bredbandsanslutning. Fastigheten ansluts till ett av Sveriges mest kraftfulla fibernät som levererar tjänster i världsklass.

Vi på Halebop är mästare på att ha nöjda kunder enligt Svenskt Kvalitetsindex och har en mycket uppskattad support. Vi är en del av Telia och delar samma stabila nät, drift och erfarenheter – men är ett enklare alternativ för er som bara behöver ett supersnabbt och stabilt bredband.





Därför är Telia en bra partner

Att ansluta Fastigheten till fiber är en långsiktig investering. Med längst erfarenhet på marknaden vet vi vad som krävs för att ert fibernät ska hålla i decennier framöver. Vi säkerställer drift och funktionalitet av nätet dygnet runt och felsöker proaktivt för att snabbt åtgärda eventuella fel. Dessutom har vi en egen kundtjänst för er som Fastighetsägare dit ni kan vända er med alla frågor som rör fiberanslutningen.



Följande ingår i denna offert: 

Vi ansluter befintligt Fastighetsnät till Telias Nät.  

Vi erbjuder Bredbandstjänster genom kollektiv anslutning.  





Vårt Erbjudande



ERBJUDANDE

TJÄNST

ANTAL

ENGÅNGSAVGIFT

MÅNADSAVGIFT



Antal portar





Totalt antal Bostäder

444 st









Totalt antal Lokaler

0 st









Totalt antal Övriga portar

0 st









Totalt antal anslutningar



444 st







Produkter





Kollektiv Installationshjälp

 7 st

0.00 kr

0.00 kr per anslutning 





Kollektiv hårdvara - Tv-box

 444 st

0.00 kr

0.00 kr per anslutning 





Kollektiv Tv & Streaming Start

 444 st

0.00 kr

8.00 kr per anslutning 





Kollektivt Halebop Bredband - 1000 Mbit/s

 7 st

0.00 kr

0.00 kr per anslutning 





Kollektiv Installationshjälp

 444 st

0.00 kr

0.00 kr per anslutning 





Kollektiv hårdvara - Tv-box

 444 st

0.00 kr

0.00 kr per anslutning 





Kollektiv Tv & Streaming Bas

 7 st

0.00 kr

0.00 kr per anslutning 





Kollektivt Halebop Bredband - 1000 Mbit/s

 7 st

0.00 kr

0.00 kr per anslutning 





Kollektiv hårdvara - TV-box

 7 st

0.00 kr

0.00 kr per anslutning 





Kollektiv Tv Allmänna utrymmen - Start

 7 st

0.00 kr

0.00 kr per anslutning 





Kollektiv TV - Must Carry

 7 st

0.00 kr

0.00 kr per anslutning 





Kollektiv TV - Stor

 7 st

0.00 kr

0.00 kr per anslutning 





Kollektivt Bredband Företag Start - 100/100 Mbit/s

 7 st

0.00 kr

0.00 kr per anslutning 





Kollektiv hårdvara - Bredbandsswitch

 7 st

0.00 kr

0.00 kr per anslutning 





Kollektiv hårdvara - TV-box

 7 st

0.00 kr

0.00 kr per anslutning 





Medieomvandlare

 7 st

2200.00 kr

0.00 kr per anslutning 















Summa





15400.00 kr

3552.00 kr



UPPKOPPLING UTAN KRÅNGEL



SAMMANSTÄLLNING



Med våra nätverk får du en uppkoppling baserat på den senaste tekniken kombinerat med vår långa erfarenhet inom området. Vi möter dina förväntningar på en uppkoppling utan krångel. Observera att Halebop bredband samt eventuell router faktureras via Halebop. Övriga poster faktureras via Telia.



TOTAL ENGÅNGSAVGIFT

15400.00 kr (exkl moms)                  





TOTAL MÅNADSAVGIFT

3552.00 kr/mån (exkl moms)





TOTAL MÅNADSAVGIFT PER ANSLUTNING

8.00 kr/mån (exkl moms)





AVTALSTID

5 år







Leveranstid:

Normal leveranstid är 4-8 månader efter det att underskriven offert kommit oss tillhanda. Kompletta adresslistor ska vara oss tillhanda senast två veckor efter underskriven offert för att vi i samråd med er ska kunna besluta om slutlig leveranstid.



Villkor och accept

Offertens giltighetstid är 8 veckor räknat från offertens datum. Innehållet i denna offert samt tillhörande bilagor utgör konfidentiell information och får inte spridas eller på annat sätt göras tillgängligt för utomstående utan skriftligt medgivande från behörig på Telia.

För att acceptera denna offert, eller ställa frågor, vänligen kontakta mig på telefon +91 1234567890 eller via mail yogesh.jadhav@teliacompany.com.Med vänliga hälsningar,

CRM Fiber Sales Rep${CreatedDate}







Avtal om Halebop Fastighetsanslutning





Telias Offertnummer





${QuoteNumber}



Detta avtal har ingåtts mellan följande parter

Telia Sverige AB (nedan ”Halebop” eller ”Telia”)

Org.nr 556430-0142

169 94 Solna

Mekonomen Billivet Albyberg AB (nedan kallad ”Fastighetsägaren”) Org.nr 5591498893

Box 14056, C/O Mekonomen Detaljist Ab20024, Malmö

Telia och Fastighetsägaren kallas fortsättningsvis även gemensamt ”Parterna” och var för sig ”Part”.

Omfattning och avtalshandlingar



Parterna har ingått avtal med avtalsnummer ${ActiveContractNumber} (”Ursprungsavtalet”). Ursprungsavtalet jämte eventuella tilläggsavtal till Ursprungsavtalet upphör att gälla och ersätts av detta Avtal i och med Telias driftsättning av tjänsterna enligt detta Avtal. 

Fastighetsägaren och Halebop har genom detta Avtal överenskommit att Halebop ska avseende Fastighet(er) (om fler så nedan gemensamt benämnda ”Fastigheten”) som anges i ”Bilaga: Fastighetsbeteckningar”, ansluta befintligt Fastighetsnät och Kundplacerad Utrustning till Telias Nät enligt närmare beskrivning i ”Bilaga: Installation”. 

Antal anslutningar i Telias Nät ska uppgå till 400 st. varav 400 st. befintliga och 0 st. tillkommande. Halebop kan erbjuda anslutning av ytterligare Bostäder/Lokaler till Telias Nät enligt särskild offert efter förfrågan från Fastighetsägaren. 



Parterna är överens om att Halebop och Telia ska leverera Bredbandstjänster till Boende/Företag i de anslutna Bostäderna/Lokalerna. Halebop och Telia ska leverera Bredbandstjänster genom kollektiv anslutning enligt vad som närmare framgår av punkten 3 nedan. Boende/Företag på Fastigheten kan dessutom teckna individuellt avtal med Telia om Telias vid var tid aktuella Bredbandstjänster.  

Parterna kan vidare överenskomma att Telia ska tillhandahålla service av Fastighetsnät m.m., fastighetsstyrningstjänster och/eller installationshjälp till Boende av kollektiva tjänster. Detta framgår i så fall under punkten 3 (”Tjänster och priser”) nedan.

En teknisk beskrivning av Fastighetsnät m.m. inklusive de krav som respektive Part åtar sig att säkerställa framgår av Bilaga: Kravspecifikation



Parternas respektive ansvar för service av Fastighetsnät m.m. framgår av Bilaga: Service.



Telia är inte skyldigt att erbjuda anslutning av Fastighet, Fastighetsnät och/eller Områdesnät till Telias Nät om Telias kostnad för sådan anslutning skulle bli oskäligt hög i förhållande till nyttan av investeringen för Telia. Det sagda gäller exempelvis i de fall, men inte begränsat till, det endast finns ett fåtal Bostäder/Lokaler på Fastigheten.



Förekommer mot varandra stridande villkor i Avtalet gäller villkoren i denna huvudtext före villkoren i bilagor och bilagorna sinsemellan i ordning. Senare tillkomna bilagor ska gälla före äldre bilagor av samma typ.



Personuppgiftsbehandling



För att Halebop/Telia ska kunna fullgöra sin del av Avtalet kan Telia komma att behöva tillträde till Bostäder/Lokaler som omfattas av Avtalet. I sådant fall åtar sig Fastighetsägaren att i samband med Avtalets ingående på Telias begäran förse Halebop/Telia med en lista över Bostäderna/Lokalerna på Fastigheten. Listan ska vara Telia tillhanda senast två (2) veckor efter beställningsdatum och ska innehålla fullständig information enligt följande. Om Lokaler: lokalbeteckning, våning, postnummer och postadress, Företagets namn och organisationsnummer samt telefonnummer som Företaget kan nås på. Av listan över Lokalerna ska framgå vilka Lokaler som är anslutna till Fastighetsnätet. Om Bostäder: lägenhetsnummer, våning, postnummer och postadress, namn samt telefonnummer. Av listan ska även framgå vilka Bostäder som är anslutna till Fastighetsnätet.

Om det behövs för att uppfylla Avtalet lämnar Halebop/Telia ut uppgifterna ovan till Halebops/Telias samarbetspartners och underleverantörer.



Fastighetsägaren ansvarar för att uppgifterna som lämnas till Halebop/Telia är korrekta och för att Fastighetsägaren har rätt att förse Halebop/Telia med sådan information. Fastighetsägaren ansvarar vidare för att de individer vars uppgifter överlämnats har informerats om att uppgifter om dem har lämnats till Halebop/Telia samt för vilka ändamål Halebop/Telia behandlar dessa uppgifter. Fastighetsägaren ska utan dröjsmål meddela Halebop/Telia eventuella ändringar i uppgifter som har överlämnats.



Parterna är överens om att den behandling av personuppgifter som sker inom ramen för Avtalet sker för respektive Parts eget ändamål och för egen räkning. Detta innebär att respektive Part är att anse som personuppgiftsansvarig för den behandling som sker och ansvarar således för att tillse att behandlingen sker i enlighet med tillämplig dataskyddslagstiftning. 



Tjänster och priser



I Avtalet ingår följande tjänster:



Anslutning av befintligt Fastighetsnät till Telias Nät i enlighet med ”Bilaga: Installation”. Antal anslutna Bostäder/Lokaler uppgår till 444 st. och antal Övriga portar uppgår till 0 st. varav antal Tillkommande portar uppgår till 0 st. För anslutning till Telias Nät utgår en engångsavgift om 15400.00 kr exklusive moms (avser befintliga anslutningar). 



Priset för de kollektiva tjänsterna ska faktureras successivt i takt med att Bredbandstjänsterna aktiveras i respektive Fastighet. Antal anslutna Bostäder uppgår till 444 st. 

Installationshjälp till Boende avseende kollektiva tjänster från Telia i enlighet med Bilaga: Installationshjälp.

Boende på Fastigheten i Bostad får tillgång till Bredbandstjänster genom kollektiv anslutning enligt nedan. För undvikande av missförstånd noteras att Lokaler aldrig ansluts till Tv från Telia. För kollektiva tjänster från Halebop utgår en månadsavgift om 0.00 kr/mån per Bostad. För kollektiva tjänster från Telia utgår en månadsavgift om 8.00 kr/mån per Bostad. Fakturering av Fastighetsägaren sker kvartalsvis. 

Telia Tv & Streaming Start till 444 st. anslutningar (för undvikande av missförstånd noteras att endast privatbostäder ansluts till Tv från Telia). Förteckning av vid var tid aktuella kanaler framgår av telia.se. Parterna är dock överens om att Telia förbehåller sig rätten att ändra sammansättningen av kanaler. 

Telia Tv & Streaming Bas levereras till 7 st. anslutningar (för undvikande av missförstånd noteras att endast privatbostäder ansluts till Tv från Telia). Förteckning av vid var tid aktuella kanaler framgår av telia.se. Parterna är dock överens om att Telia förbehåller sig rätten att ändra sammansättningen av kanaler. 

Telia Tv & Streaming Stor levereras till 7 st. anslutningar (för undvikande av missförstånd noteras att endast privatbostäder ansluts till Tv från Telia). Förteckning av vid var tid aktuella kanaler framgår av telia.se. Parterna är dock överens om att Telia förbehåller sig rätten att ändra sammansättningen av kanaler. 

Halebop Bredband 1000/1000 Mbit levereras till 7 st. 

Halebop Bredband 1000/1000 Mbit levereras till 7 st. 

Företag på Fastigheten i Lokal får tillgång till Bredbandstjänster genom kollektiv anslutning enligt nedan. För undvikande av missförstånd noteras att Företagslokaler aldrig ansluts till Tv från Telia. För kollektiva tjänster utgår en månadsavgift om 0.00 kr/mån per Lokal. Fakturering av Fastighetsägaren sker kvartalsvis.

Telia Bredband Start 100/100 Mbit levereras till 7 st. 

Allmänna utrymmen på Fastigheten i Lokal får tillgång till Bredbandstjänster genom kollektiv anslutning enligt nedan. För undvikande av missförstånd noteras att Företagslokaler aldrig ansluts till TV från Telia. För kollektiva tjänster utgår en månadsavgift om 0.00 kr/mån per Lokal. Fakturering av Fastighetsägaren sker kvartalsvis. 

Telia Tv Allmänna utrymmen Start levereras till 7 st.  

Telia har rätt att en gång per år göra en indexförändring av de priser och avgifter som anges i Avtalet. En prisjustering med stöd av indexförändring kan första gången ske tidigast sex (6) månader efter det att Avtalet ingåtts. Indextalet för den oktobermånad som infaller året före det år då Avtalet ingås (basmånad) utgör indexets bastal. Om indextalet i någon påföljande oktobermånad (avräkningstidpunkt) har stigit i förhållande till indexets bastal ska priser och avgifter i Avtalet justeras med hänsyn till detta. Om inte annat anges ska SCB:s Konsumentprisindex (KPI) (1980=100) vara tillämpligt index. Telia meddelar Kunden om den aktuella indexförändringen senast trettio (30) dagar innan förändringen träder i kraft. En indexförändring ger inte Kunden rätt att säga upp berörd Tjänst eller Avtalet. Eventuella ytterligare villkor för indexering och tillämpligt index (om annat än SCB:s Konsumentprisindex (KPI)) anges i Avtalet. 

Övriga vid var tid tillämpliga erbjudanden, aktuella priser och kampanjer framgår av halebop.se/fastighetsagare och telia.se.

Allmänna villkor



För Avtalet gäller Bilaga: Allmänna villkor.

Avtalstid



Avtalet gäller från och med undertecknandet för en initial period om 5 år räknat från det att Halebop/Telia driftsatt tjänsterna enligt detta avtal.



Har inte Avtalet sagts upp senast tolv (12) månader före den initiala avtalsperiodens slut, förlängs det automatiskt att gälla ytterligare två (2) år. Därefter förlängs Avtalet med två (2) år i taget med iakttagande av tolv (12) månaders uppsägningstid. Uppsägning ska vara skriftlig och behörigen undertecknad.





Avtalet har upprättats i två (2) exemplar av vilka Parterna tagit var sitt.







Datum

${CreatedDate}



Telia Sverige AB













Namnförtydligande

CRM Fiber Sales Rep



Datum

${CreatedDate}



Mekonomen Billivet Albyberg AB













Namnförtydligande

Test Yogesh Jadhav













Bilageförteckning



Bilaga: Definitioner

Bilaga: Fastighetsbeteckningar	

Bilaga: Installation

Bilaga: Installationshjälp

Bilaga: Kravspecifikation

Bilaga: Service 

Bilaga: Allmänna villkor



Bilaga: Definitioner 



Access-switch är en nätkomponent i Telias Nät som är gemensam för flera Slutkunder och till vilken Fastighetsnät ansluts för att leverera Bredbandstjänster till Boende/Företag. Access-switch placeras vanligtvis i Fastighetens Teknikutrymme, vid Nätanslutningspunkten.

Allmänna utrymmen är en Lokal som är belägen på Fastigheten men som inte disponeras av Företag. 

Avtalet är detta avtal om Telia Fastighetsanslutning, inklusive bilagor, mellan Telia och Fastighetsägaren.

Boende är boende i Bostad belägen på Fastigheten.

Bostad är en privatbostad som disponeras av en Boende.

Bostadsnät eller Lokalnät är fast installerad kabel med tillhörande LAN-uttag i Lokal. Bostadsnät/Lokalnät är installerat för stadigvarande bruk och används för att sprida Bredbandstjänster vidare från Överlämningspunkten. Bostadsnät/Lokalnät omfattas inte av Telias ansvar om inte annat framgår av Avtalet.

Bredbandsswitch är utrustning i Bostad/Lokal, som innehåller RJ45-portar genom vilka Tjänsteleverantör ges möjlighet att leverera Bredbandstjänst till Slutkund. Port på Bredbandsswitch eller Medieomvandlaren utgör Överlämningspunkt för Bredbandstjänst. Medieomvandlare i form av SFP är monterad i Bredbandsswitch i FTTH-nät. Bredbandsswitch ägs av Telia.

Bredbandstjänster är Tjänsteleverantörs vid var tid tillhandahållna slutkundstjänster, till exempel bredband och telefoni.

Enfamiljshus är byggnad på en enskilt ägd fastighet (villa, radhus, kedjehus, etc.) som utgör en Boendes privatbostad eller annan lokal på sådan Fastighet som disponeras av näringsidkare. 

Fastighet är den egendom som angivits i Avtalet. Som Fastighet anses även i förekommande fall byggnad på ofri grund.

Fastighetens Teknikutrymme är plats för Kundplacerad utrustning som Fastighetsägaren upplåter i Nätanslutningspunkt.

Fastighetsnät är kabel, anordning för terminering av kabel (t.ex. LAN-uttag) och kopplingspanel. Fastighetsnät används för att sammankoppla Överlämningspunkt i Bostad/Lokal med Access-switch via Nätanslutningspunkt. I FTTH-nät avslutas Fastighetsnät med ett opto-uttag i Bostad/Lokal alternativt med kontakt på inkommande fiber om opto-uttag saknas. I FTTB-nät avslutas Fastighetsnät i det första RJ45-uttaget i Lokalen. Fastighetsnät ägs av Fastighetsägaren och omfattas inte av Telias ansvar om inte annat framgår av Avtalet.

Fastighetsägare är fysisk eller juridisk person som, ensam eller tillsammans med andra, äger den eller de Fastigheter som omfattas av Avtalet. Fastighetsägare enligt Avtalet kan t.ex. vara en ekonomisk förening, samfällighet eller aktiebolag.

Fel är avvikelse som medför att Bredbandstjänst inte är tillgänglig för Slutkund, eller där Bredbandstjänstens funktion är så kraftigt nedsatt att den är att betrakta som obrukbar.

FTTB (Fibre To The Basement) är en nätrealisering där Bostaden/Lokalen ansluts med cat6/cat5e-kabel genom Fastighetsnät fram till Överlämningspunkt.

FTTH (Fibre To The Home) är en nätrealisering där Bostaden/Lokalen ansluts med fiberkabel fram till Överlämningspunkt.

Företag är näringsidkare som är nyttjanderättshavare till en Lokal på Fastigheten.

Företagslokal är en Lokal som disponeras av Företag.

Halebop är Telia Sverige AB.

Intag är kanalisation eller utrymme i en byggnads yttervägg som är avsedd att leda in Telias Nät i byggnaden. Telia fastställer punkt för terminering av nätet.

Kanalisation är rör avsett för indragning av kabel. Kanalisation ingår inte i Fastighetsnät. Fastighetsägaren äger och ansvarar för Kanalisation, dock har Telia fri dispositionsrätt till sådan Kanalisation.

Kundplacerad Utrustning är utrustning (inklusive programvara), som ägs eller tillhandahålls av Telia och som placeras på Fastigheten för att möjliggöra tillhandahållandet av Bredbandstjänster till boende/företag. Utrustning placerad hos Slutkund som ett resultat av individuellt avtal omfattas inte av denna definition.

Lokal är en företagslokal som disponeras av näringsidkare eller annan lokal som är belägen på Fastigheten.

Maximal åtgärdstid är den tidsperiod som det längst får ta att åtgärda ett Fel. Maximal åtgärdstid anges i timmar under gällande Servicetid och räknas fr.o.m. den tidpunkt då Telia mottagit felanmälan från Fastighetsägaren eller Telias tekniker gällande Fastighetsnätet t.o.m. den tidpunkt då Telia klarrapporterat anmält Fel.

Medieomvandlare är en nätkomponent i FTTH-nät som omvandlar den optiska signalen till elektrisk signal i Bostaden/Lokalen. Medieomvandlare är placerad vid Överlämningspunkt och kan vara en fristående enhet eller SFP monterad i Bredbandsswitch. Medieomvandlaren ägs av Telia. Servicevillkor för Medieomvandlare framgår av Avtalet.

Nätanslutningspunkt är punkt på Fastigheten där Fastighetsnätet/Områdesnätet ansluts till Telias Nät via Access-switch. Det kan finnas flera Nätanslutningspunkter inom en Fastighet. Fastighetsägaren upplåter plats för Kundplacerad utrustning i Nätanslutningspunkt.

Nätfel är en avvikelse som medför att samtliga Slutkunder anslutna till en Access-switch är drabbade av Fel. 

Områdesnät utgör en delmängd av accessnätet och består av nät mellan byggnader på gemensam Fastighet. Områdesnät omfattas inte av Telias ansvar om inte annat framgår av Avtalet.

RJ45-uttag är det uttag som, i FTTB-nät, är placerat i Bostaden/Lokalen, dvs. vid Överlämningspunkt. Servicevillkor för RJ45-uttag framgår av Avtalet.

Serviceansvar är ansvar för part att åtgärda Fel i angiven komponent, oavsett vem som ska bära kostnaden för åtgärden. Telias Serviceansvar innebär, förutom korrektiva åtgärder, preventiva åtgärder såsom uppgradering av mjukvara eller konfiguration.

Servicefönster är den tidsperiod, måndagar mellan kl 00.00 och 04.00, när Telia har rätt att genomföra planerade arbeten i Telias Nät som medför avbrott i Bredbandstjänst.

Servicetid är den tidsperiod inom vilken Telia åtagit sig att åtgärda Fel.

SFP är ”Small form-factor pluggable transceiver” vilket är en Medieomvandlare som monteras t.ex. i nätverksutrustning som Bredbandsswitch.

Slutkund är Boende eller Företag som ingått avtal med Tjänsteleverantör om individuell leverans av Bredbandstjänst.

Telia är Telia Sverige AB.

Telias Nät är de allmänna kommunikationsnät som ägs eller på annat sätt disponeras av bolag inom Telia-koncernen. Sådant bolag svarar för drift av Telias Nät. Telias Nät ansluts till Fastighetsnät via Kundplacerad Utrustning i en Nätanslutningspunkt.

Tjänsteleverantör är Telia eller den som ingått avtal med Telia om tillhandahållande av Bredbandstjänster till Slutkund i Överlämningspunkt.  

Tjänstespecifik hårdvara är hårdvara placerad efter Överlämningspunkt för Tjänsteleverantörs leverans av Bredbandstjänst t.ex. router, tv-box eller telefoniadapter. Villkor för Tjänstespecifik hårdvara framgår av avtal mellan Tjänsteleverantör och dennes avtalspart, vilket vid individuellt tecknade avtal är Slutkund. I de fall Fastighetsägare och Telia avtalar om kollektiv leverans framgår villkoren för den Tjänstespecifika hårdvaran av Avtalet.

Överlämningspunkt är den första punkt i Lokalen där Slutkund har möjlighet att ta emot Bredbandstjänst. I de fall Bredbandsswitch finns installerad utgör LAN-port på Bredbandsswitchen överlämningspunkt. Saknas Bredbandsswitch utgörs Överlämningspunkt av LAN-uttag (RJ45) på Medieomvandlare vid FTTH eller vid FTTB, första LAN-uttag.















Bilaga: Fastighetsbeteckningar



Nedan visas vilka fastighetsbeteckningar som omfattas av avtalet:



[ABCD]

Bilaga: Installation



Denna bilaga kompletteras av bestämmelserna i Bilaga: Allmänna villkor.



För detaljerad teknisk beskrivning se Bilaga: Kravspecifikation



Omfattning 



Om Parterna uttryckligen kommit överens om installation av Fastighetsnät genom punkten 3 (Tjänster och priser) i Avtalet, utförs installation av Fastighetsnät med CAT5E alternativt CAT6 för Bredbandstjänster eller i särskilda fall med fastighetsnät Fiber (FTTH). Vidare omfattar installationen av Fastighetsnät även leverans och montering av aktiv utrustning i av Fastighetsägaren tillhandahållet stativ eller skåp (dessa ska vara låsta för utomstående) samt installation av Kundplacerad Utrustning. Telia ansvarar för drift och underhåll av sådan utrustning under avtalstiden. 



Om Parterna inte uttryckligen kommit överens om installation av Fastighetsnät genom punkten 3 (Tjänster och priser) i Avtalet, omfattas installation av Fastighetsnät inte av Telias åtagande. Telias installationsåtagande omfattar under sådana omständigheter endast installation av Kundplacerad Utrustning. Telia ansvarar för drift och underhåll av sådan utrustning under avtalstiden.



Fastighetsnät med fiber (FTTH) ansluts i en Medieomvandlare med RJ45- gränssnitt. Nämnda Medieomvandlare kräver elmatning. Fastighetsägaren ansvarar för att eluttag finns tillgängligt där Medieomvandlare placeras, dvs. i närheten av entrédörr. För det fall Telia sedan tidigare har installerad Kundplacerad Utrustning på Fastigheten har Telia ingen skyldighet att installera Kundplacerad Utrustning. Medieomvandlare tillhandahålls och ägs av Telia.



För tydlighets skull anges nedan exempel på vad som inte ingår i installationen. Exemplifieringen är inte uttömmande. I installationen ingår t.ex. inte:



Installationshjälp av tjänster (om inte uttryckligen avtalats i detta Avtal).

Flytt av skrymmande föremål och möbler.

Kostnad för eventuella eluttag i Bostäder/Lokaler och i Fastighetens Teknikutrymme.

Installation av Fastighetsnät, Bostadsnät/Lokalnät och Områdesnät (om inte uttryckligen avtalats i detta Avtal).

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



Tillträde till Fastigheten



Fastighetsägaren ansvarar för att Telia skyndsamt och utan vidare dröjsmål får tillträde till samtliga utrymmen som omfattas av installationen. I de fall Telia inte bereds tillträde till nödvändiga utrymmen inom överenskommen tid, har Telia rätt att undanta dessa utrymmen från sitt åtagande att utföra installationen. Vid mer än två försök att få tillträde under installationstiden debiteras extra kostnad för arbetstid och restid.



Slutbesiktning



Slutbesiktning ska vid behov utföras i de fall Avtalet omfattar installation av Fastighetsnät. Syftet med en slutbesiktning är att kontrollera att installationen utförts i enlighet med Avtalet. Fastighetsägaren kallar Telia till slutbesiktningen om Fastighetsägaren anser att det finns behov av en slutbesiktning. Slutbesiktning ska, om inte annat avtalats, infalla sju (7) arbetsdagar före avtalad leveransdag. Med avtalad leveransdag avses den tidpunkt som Parterna skriftligen överenskommit. Är installationen försenad, ska slutbesiktning istället genomföras vid av Telia angiven tidpunkt för färdig installation.



Slutbesiktningen är okulär och omfattar endast de Bostäder/Lokaler som Fastighetsägaren skaffat tillträde till. Bostäder/Lokaler till vilka tillträde inte lämnats för slutbesiktning ska anses vara godkända och utan anmärkning. Vid slutbesiktningen ska ett särskilt slutbesiktningsprotokoll upprättas genom Fastighetsägarens försorg.



Eventuella fel och brister som Telia ansvarar för ska antecknas i slutbesiktningsprotokollet och kostnadsfritt åtgärdas av Telia inom skälig tid. Vidare ska i slutbesiktningsprotokollet antecknas om installationen är godkänd. Fel och brister av mindre betydelse ska inte utgöra hinder för godkännande. Sådana fel och brister ska avhjälpas av Telia senast två (2) månader efter godkänd installation.



För det fall Fastighetsägaren inte kallat Telia till slutbesiktning enligt vad som framgår ovan ska installationen anses godkänd av fastighetsägaren vid avtalad leveransdag. Är installationen försenad, ska installationen anses godkänd vid färdig installation. 



Telia ansvarar för att Fastighetsnät inte är behäftat med materialfel och att fel i utförda installationsarbeten inte föreligger. Detta ansvar gäller för fel som framträder under två (2) år efter godkänd installation.



Övrigt



Telia kommer vid behov att kalla till ett startmöte med Fastighetsägaren i syfte att gå igenom installationsprocessen samt andra relevanta frågor. Respektive part ska utse var sin kontaktman för att ansvara för att hantera löpande frågor rörande installationen. Vardera Parten ska bära sina respektive kostnader för startmötet. 



I samband med startmötet eller i god tid innan installationen påbörjas överenskommer parterna om detaljerad tidplan och former för arbetets utförande. Fastighetsägaren ska dessutom förse Telia med nödvändig information för installationen, t.ex. fastighetsbeskrivning, ritningar över Fastigheten och byggnader som omfattas av Avtalet, ritningar över kablage avsedda för el m.m. Fastighetsägaren ansvarar för att sådan information är korrekt och fullständig. Eventuella skador vid borrning betalas av Fastighetsägaren om inte korrekta ritningar erhålls.



Fastighetsägaren är ansvarig för Fastighetsnätet och de Överlämningspunkter som finns och att korrekt information rörande detta kommer Telia till handa.



Fastighetsägaren ansvarar för att informera Telia om denna har ingått avtal med andra aktörer om utrymmen på Fastigheten.



Fastighetsägaren ansvarar för att informera Boende/Företag om installationens omfattning och tidpunkter samt Boendes/Företags åtaganden i samband med installationen, t.ex. tillträde till Bostaden/Lokalen samt flytt av möbler.



En förutsättning för att Telia ska kunna genomföra installationen inom utlovad leveranstid är att Fastighetsägaren uppfyller sina åtaganden beträffande installationen inom angiven tid.



Bilaga: Installationshjälp

Om Parterna uttryckligen kommit överens om installationshjälp till Boende avseende kollektiva tjänster från Telia genom punkten 3 (Tjänster och priser) i Avtalet utförs installationshjälpen enligt nedan:

LAN-uttag eller medieomvandlare lokaliseras.

Om hårdvaran levererats till Fastighetsägaren, upphämtning av hårdvaran hos angiven person hos Fastighetsägaren.

Inkoppling av hårdvara till Bostadsnät 

Bredband: Inkoppling av en dator/surfplatta för att funktionstesta nätverket

Kom-igång-hjälp för telefoni ex. inkoppling av SIM-kort

Tv: Inkoppling av en (1) tv-box

Kontroll av att bredband, telefoni och Tv fungerar

Boende får endast tillgång till ett (1) tillfälle av installationshjälp.

När ny Boende flyttar in ges möjlighet till ett (1) tillfälle av installationshjälp.





Bilaga: Kravspecifikation



Kravspecifikation (FTTH & FTTB)



Detta dokument beskriver Telias kravspecifikation för byggnation samt installation av FTTH & FTTB nät.







Installation i större byggnad	Installation i mindre byggnad

DEFINITIONER:



Fastighetsnät

Avser kabel på och/eller i en fastighet.



Bostadsnät

Avser kabel i Bostad. Bostadsnätet börjar där Fastighetsnätet avslutas.



Områdesnät

Avser fiberkabel inom en eller mellan flera byggnader (såsom bostadsbyggnad, teknikutrymmen osv.) inom samma Fastighet.



Anslutningspunkt

Avser punkten där Telias nät och nät, tillhörande fastigheten, termineras.



Telias utrustning

Avser utrustning som ägs av Telia som t.ex. switch.



Avtalspartens teknikutrymme:

Avser det utrymme där Telia utrustning skall placeras.



GAP

Gruppanslutningspunkt. Fastighets- och områdesnätets centrala punkt. GAP består av stativ, kopplingspaneler samt aktiv utrustning.

Teknisk specifikation

Fastighetsnät (FTTH)

För Fastighetsnät FTTH, och i förekommande fall Områdesnät, ska kabeltypen vara singlemode-fiber av typ ITU-T G.652C eller D användas och vara utfört enligt Svensk Standard SS-EN 501 73-1 med bilagor.

Fibrerna termineras i Nätanslutningspunkt med skarvstycken avsedda för singlemode-kontakter. Uttagen i Nätanslutningspunkt ska vara märkta med unik lägenhetsidentifikation. I Bostaden avslutas fibern i här för avsett fiberuttag. Alla ingående kontakter ska vara av typ SC/UPC med max 0,5 dB kontaktdämpning och minst 50 dB reflexionsdämpning. Skarvar på fibrerna får dämpa max 0,5 dB.

Förläggning av kabel ska ske med hänsyn tagen till kabelns mekaniska och miljömässiga omgivningskrav.

Vid nyttjande av befintligt nät eller när Fastighetsägaren bygger nät ska dokumentation över anläggningen finnas. Panelkort, monteringsritningar ska finnas i respektive korskoppling samt nätschema fiber och godkänt mätprotokoll för Fastighetsnät och Områdesnät. Dokumentationen ska lämnas till Telias kontaktperson innan driftsättning kan ske. Fastighetsägaren ansvarar för att anläggningen uppfyller ställda krav.

Medieomvandlare

Medieomvandlare ska uppfylla kraven för standard 1000 Base-BX10-U (1310 nm TX/1550 nm RX;10 km). I det fall Medieomvandlare levereras av annan än Telia förbehåller sig Telia rätten att testa den föreslagna Medieomvandlaren. I annat fall kan inte leverans av Telias tjänster garanteras. 

Fastighetsnät (FTTB)

Fastighetsnät FTTB består av koppar in i Bostad respektive Enfamiljshus. 

Fastighetsnät ska ha ett funktionskrav om minst 1000 Mbit/s i enlighet med Svensk Standard SSEN50173-1 PL Class D eller E (Cat6). Inmätning i enlighet med SSEN50173-1 PL Class D eller E. Fastighetsnätet ska vara installerat med separata anslutningar till varje Bostad och Lokal. Det innebär att nätet ska vara stjärnkopplat. Fastighetsnätet ska uppfylla Ethernetstandard IEEE 802.3.

Installationen av kabel bör ske i Fastighetens befintliga kanalisation.

Kanalisation i nybyggnad bör utföras enl. SIS 437 0145; grundläggande dimensioneringsregler för elinstallationer i byggnader.

Dokumentation över anläggningen ska finnas. Panelkort och monteringsritningar ska finnas i respektive spridningspunkt.

Fastighetsnätet utgår från RJ45-uttag i kopplingspanelen (som placeras i 19" stativ) och avslutas med RJ45-uttag i varje Bostad. Uttagen ska vara märkta med unik identifikation.

Mätning av Fastighetsnät koppar ska uppfylla standard EN50173 PL Class D eller E (Cat6).

Om befintligt Fastighetsnät används är minimikravet på kabeltyp minst Cat5e, SS-EN 50173-1:2018. För testresultat som uppfyller ställda krav ansvarar Fastighetsägaren.

Kabeln för Fastighetsnät ska vara av halogenfritt material och oskärmad. Förläggning av kabel ska ske med hänsyn tagen till kabelns mekaniska och miljömässiga omgivningskrav.

Kabellängd

Fastighetsnätets totala längd per anslutning får ej överstiga 90 meter från korskopplingspanelen till uttag i Bostad.

Beskrivning av en anslutnings totala längd.

Bostadsnät

Vid befintligt Bostadsnät är minimikravet på kabeltyp minst Cat5e, SS-EN 50173-1:2018. Nya Bostadsnät ska vara utförda enligt Svensk Standard, SS-EN 501 73-1 med bilagor.

Områdesnät

Områdesnätet skall vara draget från Spridningspunkten och vara i form av ett stjärnformat fibernät som ansluter andra Fastighetsnät inom samma Fastighet.



Områdesnätet ska installeras med standard singlemode-fiber av typ ITU-T G.652C eller D. Fibrerna termineras i varje ända i en Nätanslutningspunkt med skarvstycken avsedda för singlemode-kontakter. Alla ingående kontakter skall vara av typ SC/UPC med max 0,5 dB kontaktdämpning och minst 50 dB reflexionsdämpning. Nätet ska innehålla minst 8 fiber (=4 par) till respektive teknikutrymme. Skarvar på fibrerna får dämpa max 0,5 dB. 



Teknikutrymmen

Teknikutrymmen ska både innehålla Nätanslutningspunkt samt kundplacerad Access-switch och ska vara centralt lokaliserat i respektive byggnad eller i området. Teknikutrymmet ska vara ett låsbart utrymme eller ett låsbart skåp för Kundplacerad Utrustning, placerat inomhus. Fastighetsägaren ansvarar för att utrymmet är låst och otillgängligt för obehöriga. Utrymmet ska dock vara så åtkomligt att Telia och Telias servicetekniker kan sköta drift och underhåll. 

I detta utrymme installeras ett eget 19"-stativ. På detta stativ ska Fastighetsnätets kopplingspaneler samt Telias utrustning, monteras. Generellt utrymmesbehov för 19"-stativet är bredd 60 cm, djup 50 cm och höjd minst 80 cm i ett stativ, beroende på anläggningens storlek. 

Beskrivning av 19"-stativ med kopplingspaneler och aktiv utrustning.



Utrymmet ska vara sådant att förhållandet mellan temperatur och fuktighet gör att kondens inte uppstår.

Utrymmet ska klara krav enligt ETS 300 019-1 klass 3. 

Driftstemp: +5° till +40°C

Luftfuktighet: 5% till 85%

Bakom stativet ska det alltid finnas minst ett jordat uttag per planerad switch, utöver detta, ska minst ett jordat dubbeluttag finnas för service.

Nätanslutningen ska vara 230-240 VAC, 50 Hz och ska avslutas på egen säkringsgrupp, 10 A. Eventuella jordfelsbrytare ska inte omfatta dessa uttag. Dessa ska endast användas av Telias utrustning. Stativet kan vara jordat. Placeras stativet i skåp ska utrymmet mellan stativfront och dörr vara minst 10 cm.

Kundplacerad utrustning

Kundplacerad utrustning ska placeras i Fastighetsägarens 19"-stativ/skåp där Fastighetsägaren ska lämna plats för utrustningen.

Access-switch samt inkommande fiberkabel (avslutas i Nätanslutningspunkt) och alla ingående patchkablar ingår i Telias åtagande.

Grävning och byggande av kanalisation i mark

Kanalisation skall förläggas enligt följande specifikation. För ytterligare information hänvisas till: (Anläggnings AMA 98), AMA anläggning 07.

Avtalsparten ansvarar för att förläggning sker på ett riktigt sätt. Vid intag över mark ansvarar avtalsparten för att Telias Kabel skyddas från åverkan på lämpligt sätt.



Ledningsgrav med kanalisationsrör.



Ledningsbädden skall vara 10 cm tjock, jämn och utföras med finkornigt, kompakterat materiel med max 8 mm diameter. Kringfyllningen görs till 10 cm ovanför kanalisationsröret och med samma materielkrav som ledningsbädden. Kompakteras. Markeringsnät läggs ovanpå kringfyllningen. Det skyddar kanalisationsröret och den inbyggda söktråden är till hjälp vid en kabelutsättning i samband med markarbeten. Resterande fyllning görs enligt markägarens önskemål.

Fyllningshöjd är avståndet mellan det översta kanalisationsröret och markytan. Följande avstånd gäller:

Körbana: min 0,55 m

Trottoar, cykelbana, parkmark o liknande: min 0,35 m 

Brukad mark (åker och skog): min 0,75 m fyllningshöjd

I övrig mark: min 0,65 m 

Kabelväg på Fastighet

Fastighetsägaren ansvarar för att kabelvägar finns tillgängliga mellan tomtgräns och Intag. Kabelvägen ska förläggas med rör med minst 21 mm innerdiameter samt förses med dragtråd.

Anslutning av Bostad och Lokal 

Anslutning sker mellan Telias och Fastighetsnätets kopplingspaneler. Denna anslutning sker genom att en patchkabel monteras i uttag på Telias utrustning till uttag för aktuell Bostad eller Lokal.

Dokumentation

Vid nybyggnation av fastighetsnät skall dessa dokumenteras i enlighet med Svensk Standard SS4551201 senaste utgåva. 

Redan etablerade fastighetsnät skall finnas dokumenterade i enlighet med SEK HB 455-2006





Bilaga: Service



Serviceansvar (FTTH & FTTB) 



Detta dokument beskriver Telias respektive Fastighetsägarens Serviceansvar för det fall Parterna ingått avtal.

Servicebeskrivning

Ägande och Serviceansvar FTTH-nät

Eventuellt Områdesnät ägs av Fastighetsägaren, som har Serviceansvar för detta.

Fastighetsnätet ägs av Fastighetsägaren, som har Serviceansvar för detta.  

Medieomvandlare vid respektive Slutkunds Överlämningspunkt ägs av Telia. Telia har Serviceansvar för Medieomvandlare, vilket innebär att Telia ersätter Medieomvandlare som är behäftad med Fel efter Felanmälan från Boende eller Fastighetsägare. Vid yttre åverkan på Medieomvandlare fakturerar Telia Fastighetsägaren för byte av Medieomvandlare enligt gällande prislista. Detta under förutsättning att Medieomvandlaren inte omfattas av leveransgaranti enligt Bilaga: Installation.

Eventuell Bredbandsswitch ägs av Telia som även har Serviceansvar för denna. Endast Telia har rätt att managera Bredbandsswitch, vilket innebär att endast Telia har rätt att logga in i denna, eller på annat sätt påverka dess konfiguration.

Tjänstespecifik hårdvara regleras avseende ägande och Serviceansvar beroende av kollektivt eller individuellt avtal med Telia. I kollektiva avtal äger Fastighetsägaren alternativt Telia tv-boxen, Telia har Serviceansvar under avtalstid. För individuella avtal gäller ägande och serviceansvar enligt avtal mellan Slutkund och Telia. Eventuell router som levererats av Halebop ingår inte i Telias eller Halebops serviceansvar utan hänvisas till produktleverantören.

I de fall Tjänstespecifik hårdvara tillhandahålls från Telia ansvarar Fastighetsägaren för att det finns en lämplig yta att placera denna på i respektive Bostad/Lokal. För de fall teknikskåp har byggts ansvarar Fastighetsägaren för att detta är byggt i ett material som exempelvis wifi-signal kan ta sig igenom, och inte till exempel i metall.





Access-switch

Fastighetsnät

Mediaomvandlare

Eventuell

Bredbandsswitch

Bostadsnät

Utrustning efter Överlämningspunkt

Placering

Nätanslutnings-punkt

I Fastighet

Överlämnings-punkt

Överlämnings-punkt

Bostad

Bostad

Ägare

Telia

Fastighetsägare

Telia

Telia

Fastighetsägare

Telia, Fastighetsägare, Slutkund

Ansvar utförande serviceåtgärd

Telia

Fastighetsägare

Telia

Telia

Fastighetsägare

Telia, Slutkund

Ansvar betalning serviceåtgärd

Telia

Fastighetsägare

Fastighetsägare

Telia

Fastighetsägare

Telia, Slutkund, Fastighetsägare



T.ex. tv-box















Access-switch

Fastighetsnät

Mediaomvandlare

Eventuell

Bredbandsswitch

Bostadsnät

Utrustning efterÖverlämningspunkt



Ägande och Serviceansvar FTTB-nät

Eventuellt Områdesnät ägs av Fastighetsägaren, som har Serviceansvar för detta.

Fastighetsnätet ägs av Fastighetsägaren, som har Serviceansvar för detta.  

RJ45-uttag vid respektive Slutkunds Överlämningspunkt ägs av Fastighetsägaren. Telia har Serviceansvar för RJ45-uttag, vilket innebär att Telia ersätter RJ45-uttag som är behäftad med Fel efter Felanmälan från Boende eller Fastighetsägare. I dessa fall fakturerar Telia Fastighetsägaren för felavhjälpning av RJ45-uttag, 700 kr exklusive moms per RJ45-uttag. Detta under förutsättning att RJ45-uttag inte omfattas av leveransgaranti enligt Bilaga: Installation.

Eventuell Bredbandsswitch ägs av Telia som även har Serviceansvar för denna. Endast Telia har rätt att managera Bredbandsswitch, vilket innebär att endast Telia har rätt att logga in i denna, eller på annat sätt påverka dess konfiguration.

Tjänstespecifik hårdvara regleras avseende ägande och Serviceansvar beroende av kollektivt eller individuellt avtal med Telia. I kollektiva avtal äger Fastighetsägaren alternativt Telia tv-boxen, Telia har Serviceansvar under avtalstid. För individuella avtal gäller ägande och serviceansvar enligt avtal mellan Slutkund och Telia. Eventuell router som levererats av Halebop ingår inte i Telias eller Halebops serviceansvar utan hänvisas till produktleverantören.

I de fall Tjänstespecifik hårdvara tillhandahålls från Telia ansvarar Fastighetsägaren för att det finns en lämplig yta att placera denna på i respektive Bostad/Lokal. För de fall teknikskåp har byggts ansvarar Fastighetsägaren för att detta är byggt i ett material som exempelvis wifi-signal kan ta sig igenom, och inte till exempel i metall.





Access-switch

Fastighetsnät

RJ45-uttag

Eventuell

Bredbandsswitch

Bostadsnät

Utrustning efter Överlämningspunkt

Placering

Nätanslutnings-punkt

I Fastighet

Överlämnings-punkt

Överlämnings-punkt

Bostad

Bostad

Ägare

Telia

Fastighetsägare

Fastighetsägare

Telia

Fastighetsägare

Telia, Fastighetsägare, Slutkund

Ansvar utförande serviceåtgärd

Telia

Fastighetsägare

Telia

Telia

Fastighetsägare

Telia, Slutkund

Ansvar betalning serviceåtgärd

Telia

Fastighetsägare

Fastighetsägare

Telia

Fastighetsägare

Telia, Slutkund, Fastighetsägare



T.ex. tv-box















Access-switch

Fastighetsnät

RJ45-uttag

Eventuell

Bredbandsswitch

Bostadsnät

Utrustning efterÖverlämningspunkt

Schematisk beskrivning av ägande och serviceansvar för kablage och utrustning placerad hos avtalspart respektive Slutkund. 

Felavhjälpning vid Fel som drabbar enskild Slutkund

Slutkunden felanmäler:

Tv till Telias privatkundtjänst.

Bredband till Halebops kundtjänst. 

I förekommande fall informerar Telia/Halebop om kända driftstörningar.

Telia/Halebop felsöker och åtgärdar vid behov sin tjänsteplattform, samt kontrollerar att Slutkundens inkoppling till tjänsten är korrekt och att Felet inte finns i Slutkundens egen utrustning eller handhavande av tjänsten. 

I de fall Felet inte kan avhjälpas fjärrmässigt bokar Telias servicetekniker tid med Slutkund och i vissa fall även med Fastighetsägarens tekniske kontaktperson. Telias servicetekniker genomför en felanalys och åtgärdar eventuella Fel som ligger inom Telias Serviceansvar, dvs. Fel i Access-switch eller Medieomvandlare.

Om Telias serviceteknikers felanalys visar att Felet ligger inom Fastighetsägarens Serviceansvar, exempelvis i Fastighetsnät, överlämnar Telia felärendet till Fastighetsägaren för åtgärd.

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

Telia har en aktiv övervakning av hela sitt bredbandsnät, dygnet runt, årets alla dagar. Övervakningen omfattar Access-switchar samt all övrig utrustning i Telias Nät. Telia tar hand om larm från nätet och genomför fjärrmässig analys och om möjligt fjärrmässig felavhjälpning. 

I de fall det krävs åtgärd av tekniker i fält har Telia tillgång till en rikstäckande organisation av tekniker som hanterar alla förekommande felsituationer. Vid större felsituationer arbetar dessa dygnet runt, med stöd av Telias expertis. 

I de fall reservdelar krävs har Telia avtal med logistikpartners som distribuerar reservdelar över hela landet. 



Telias hantering av nätfel

Telias utrustning larmar om samtliga Slutkunder anslutna till en Access-switch drabbas av Fel, dvs ett Nätfel uppstår. Detta gör det möjligt för Telia att ge sina Slutkunder information om ett pågående Nätfel, t.ex. när Felet beräknas vara åtgärdat. 

I de fall Telias analys visar att Nätfelet endast berör Access-switch kontaktas Fastighetsägarens tekniske kontaktperson för att verifiera om strömförsörjningen fungerar, eller om det finns andra omständigheter som förorsakat Nätfelet. Om så inte är fallet, och felet inte kan felavhjälpas fjärrmässigt, skickar Telia en tekniker för att felsöka.  

Prioritering av felavhjälpning av Nätfel som inte går att åtgärda fjärrmässigt är beroende av antal drabbade Slutkunder: fler drabbade Slutkunder medför högre prioritet. Maximal åtgärdstid för Nätfel är 24 timmar för privatkund respektive 12 timmar för företagskund inom ramen för Servicetid – se tabell ovan.

Planerade arbeten i Telias Nät

Telia arbetar kontinuerligt för att säkerställa hög kvalitet, säkerhet och rätt funktionalitet i Telias Nät. Detta innebär att det ibland krävs arbeten i nätet som stör Boendes användning av Bredbandstjänsterna, till exempel i samband med mjukvaruuppgraderingar eller kapacitetsutökningar. Arbeten i Telias Nät som innebär att Boendes användning av Bredbandstjänsterna störs, utförs så långt det är möjligt i Servicefönster, måndagar kl. 00.00-04.00. 

Fastighetsägarens ansvar

För att Telia ska kunna garantera service- och åtgärdstider krävs att Fastighetsägaren fullgör sitt ansvar enligt nedan. Fastighetsägaren ansvarar för att:

Telia har tillgång till aktuella kontaktuppgifter till person som kan ge Telia tillträde till nödvändiga fastighetsutrymmen vid serviceåtgärder. Ändring av kontaktuppgifter ska utan dröjsmål anmälas av Fastighetsägaren till Telias ingång för Fastighetsägare på telefon 020-30 00 60, val 1.

Inom 60 minuter från den tidpunkt då Telia kontaktat Fastighetsägaren ska Telias servicepersonal beredas tillträde till nödvändiga lokaler inom Fastigheten i samband med serviceåtgärder. Detta gäller alla dagar kl. 07.30-24.00. Behov av tillträde till utrymmen under andra tidpunkter än servicetider angivna i ovanstående avsnitt ”Felavhjälpning vid Fel som drabbar enskild Slutkund” gäller i huvudsak Nätfel.

Utföra kontroll av strömförsörjning av Access-switch inom 60 minuter efter Telias anmodan vid Nätfel som misstänks bero på problem med strömförsörjning av Access-switch då Fastighetsägaren ansvarar för denna strömförsörjning. Fastighetsägaren ska omgående informera Telia om resultatet av kontrollen, samt omedelbart agera för att avhjälpa identifierade problem. Detta gäller alla dagar kl. 07.30-22.00.

Informera Telia i god tid och senast 5 arbetsdagar innan arbete ska påbörjas som innebär att avbrott i Bredbandstjänst för anslutna Slutkunder planeras, t.ex. avbrott i strömförsörjning. Datum för avbrottet, starttid, sluttid, adress samt kontaktperson mailas till controlcenter.cm@teliacompany.com.	

Åtgärda Fel inom Fastighetsägarens ansvar som drabbar enskild Slutkund inom 24 timmars Maximal åtgärdstid mätt under Servicetid helgfri må-fre kl. 07.30-18.00 då Fel berör privatkund. I det fall Fel berör företagskund är Maximal åtgärdstid 12 timmar mätt under Servicetid 07.30-18.00 helgfri må-fre. Till denna kategori av fel hör bland annat Fel i Fastighetsnät orsakat av åverkan.

Åtgärda Fel inom Fastighetsägarens ansvarsområde som medför att samtliga kunder anslutna till Access-switch är drabbade av Fel med 8 timmars Maximal åtgärdstid mätt under servicetid 07.30-22.00 alla dagar. Till denna kategori av Fel hör bland annat Fel i Områdesnät samt fel i strömförsörjning av Access-switch som kan åtgärdas av Fastighetsägaren. 

Fastighetsnät, teknikutrymme m.m. uppfyller krav enligt Bilaga: Kravspecifikation. 

Telias utrustning i Nätanslutningspunkten är skyddad från allmänheten, vilket även innefattar att utrustning ej ska vara åtkomlig för Boende. Detsamma gäller även kopplingspunkter i Fastighetsnät och Områdesnät. 

I de fall Telia inte kunnat uppfylla sitt Serviceansvar inom Maximal Åtgärdstid pga. att Fastighetsägaren underlåtit att fullgöra sina skyldigheter enligt Avtalet har Telia rätt till ersättning från Fastighetsägaren för direkt och indirekt skada, exempelvis i form av berättigade ersättningsanspråk från Slutkunder.



Bilaga: Allmänna villkor 

Telias Integritetspolicy

Den personliga integriteten hos våra kunder är viktig för oss på Telia. I Telias integritetspolicy på www.telia.se finns mer information om vilka personuppgifter Telia behandlar, typ av behandling, ändamålet och den rättsliga grunden för behandlingen, uppgifternas lagringstid samt individens rätt till bl.a. information, rättelse, radering och rätten att göra invändningar. 



Inledning

Dessa allmänna villkor gäller då Telia till en Fastighetsägare möjliggör anslutning av Fastighetsnät för Bostäder/Lokaler till Telias Nät. Efter överenskommelse kan Telia även tillhandahålla andra tjänster, såsom installation av Fastighetsnät, service av Fastighetsnät, Telias Bredbandstjänster genom kollektiv anslutning till Boende/Företag på aktuella Fastigheter eller anslutning till Öppen Fiber. De tjänster som tillhandahålls specificeras i Avtalet.

Avtalet reglerar inte tillhandahållande av Bredbandstjänster i relationen direkt till Boende/Företag. Boende/Företaget kan få tillgång till Bredbandstjänst kollektivt via Fastighetsägaren eller individuellt genom att teckna ett särskilt avtal om Bredbandstjänst med en Tjänsteleverantör.

Boende/Företag som får möjlighet att tillgå tv-tjänst kollektivt från Telia genom Fastighetsägaren måste aktivera tv-tjänsten för att ta del av den. Tv-tjänsten aktiveras genom att Boenden/Företaget kontaktar Telia och uppger namn, adress och eventuell e-postadress. Genom att aktivera tv-tjänsten ingår Boenden/Företaget särskilt avtal med Telia om tv-tjänsten.

Telias åtaganden

Telia ska tillhandahålla aktuella tjänster på ett fackmässigt sätt i överensstämmelse med Avtalet.



Telia har rätt att anlita underleverantörer för att fullgöra sina åtaganden enligt Avtalet. Telia svarar i så fall för underleverantörens arbete såsom för eget arbete

Vid anslutning till Telias Nät av Fastighetsnät i befintlig bebyggelse ska anslutningen ske vid den tidpunkt som skriftligen överenskommits mellan Parterna. Telia ansvarar för leverans av kabel fram till Nätanslutningspunkten.

Vid fel i markförlagd kabel fram till Nätanslutningspunkten ansvarar Telia för schaktning, felrättning och återfyllnad under förutsättning att felet inte har förorsakats av Fastighetsägaren, någon som Fastighetsägaren svarar för, Boende, Företag eller besökare till Boenden eller Företaget. Innan grävning påbörjas inom Fastighet kontaktas Fastighetsägaren för samråd om det praktiska utförandet. 

Om Telias Bredbandstjänst tillhandahålls till Boende eller Företag kollektivt via Fastighetsägaren har Telia rätt att stänga eller begränsa Bredbandstjänsten för en eller flera Boenden eller Företag i den utsträckning som anges i Telias allmänna villkor för elektroniska kommunikationstjänster till företag samt Telias allmänna villkor för tjänster till konsument vid motsvarande förhållanden som där anges, oavsett om detta har sin grund i handlande eller underlåtenhet från Fastighetsägarens eller från Boendens/Företagets sida.

Fastighetsägarens åtaganden

Fastighetsägaren ska på egen bekostnad bereda Telia tillträde till Fastigheten. Med avseende på byggnation, installation och/eller anslutning av Fastighetsnät ska Telia ges tillträde skyndsamt och utan vidare dröjsmål. Med avseende på service ska Telia ges tillträde i enlighet med vad som framgår av Avtalet. Telia ska beredas fri framkomlighet där arbeten ska utföras. Flytt av möbler och liknande omfattas inte av Telias åtaganden. Fastighetsägaren ska vidare förse Telia med lista över kontaktpersoner avseende tillträde till Fastigheten.

Fastighetsägaren ansvarar för att eventuellt bygglov och andra myndighetstillstånd som avser Fastigheten i förekommande fall införskaffas för anläggning av det som ska installeras. Motsvarande gäller om Fastighetsnät ägs av annan än Fastighetsägaren och Telia behöver tillstånd från ägaren av nätet för att kunna utföra sina åtaganden enligt Avtalet. Fastighetsägaren ska bereda Telia nödvändigt bistånd och står för kostnaden nämnda sådant tillstånd. Om tillstånd inte medges, har Telia rätt att med omedelbar verkan frånträda Avtalet.

Fastighetsägaren ansvarar för att Fastighetsnätet uppfyller de krav som anges i bilaga: Kravspecifikation liksom i Avtalet i övrigt för att anslutning ska kunna ske, t.ex. att teknikutrymmen, eluttag, kanalisation mellan Nätanslutningspunkt och i förekommande fall Fastighetsnät, är etablerat innan anslutning påbörjas. Fastighetsägaren ansvarar för att nödvändig kanalisation förläggs på riktigt sätt. Vid Intag ovan mark ansvarar Fastighetsägaren för att kabeln skyddas från åverkan. För Fastighetsnät som ska användas för tillhandahållande av Kabel-tv ansvarar Fastighetsägaren särskilt för att Fastighetsnätet uppfyller den standard som anges i Avtalet. 

Fastighetsägaren ansvarar för drift och underhåll av Fastighetsnät och att sådant nät kontinuerligt uppfyller de krav som anges i Avtalet. Fastighetsägaren ansvarar för att utan oskäligt dröjsmål avhjälpa fel i Fastighetsnät. Om Parterna har avtalat att Telia ska tillhandahålla service av Fastighetsnät m.m. ska härutöver avsnitt 4 tillämpas.

Fastighetsägaren ansvarar för att el finns framdragen till Kundplacerad Utrustning senast den dag Parterna avtalat att installation av Fastighetsnät ska vara färdigställd. Om så inte sker, har Telia rätt att själv eller genom underleverantör företa sådan framdragning av el på Fastighetsägarens bekostnad. Fastighetsägaren ansvarar vidare för den strömförbrukning som är nödvändig för driften av Kundplacerad Utrustning.

Fastighetsägaren står risken för skada på eller förlust av Kundplacerad Utrustning från den tidpunkt då den Kundplacerade Utrustningen installerats. Kundplacerad Utrustning får inte utan Telias skriftliga medgivande flyttas från den plats där den installerats.

Fastighetsägaren får inte utan Telias skriftliga medgivande reparera, utföra service på, göra påbyggnader på eller ändringar i, eller ta bort delar eller märkning avseende ägandeförhållanden från Kundplacerad Utrustning. Fastighetsägaren ska följa de anvisningar som Telia från tid till annan utfärdar beträffande skötsel och användning av Kundplacerad Utrustning. Fastighetsägaren ansvarar vidare för att förhindra att obehörig person ges tillgång till Kundplacerad Utrustning och Fastighetsägaren ska omedelbart meddela Telia om så ändå sker.

Fastighetsägaren ska vidta alla rimliga åtgärder för att säkerställa att inte Boende/Företag eller annan vidtar åtgärder som medför störningar för Fastighetsnätet och Kundplacerad Utrustning. Fastighetsägaren svarar även för att utan oskäligt dröjsmål stoppa sådana störningar.

Installation av Fastighetsnät

Om Parterna överenskommit att Avtalet ska omfatta även installation av Fastighetsnät, gäller punkterna 4.2 – 4.5 nedan. Installation av Fastighetsnät omfattar anläggande av kabel och i förekommande fall kanalisation, inklusive nödvändiga anslutningar och uttag i byggnad på det sätt som anges i Avtalet.

Telia kallar Fastighetsägaren till ett startmöte i syfte att gå igenom installationsprocessen och andra relevanta frågor. Respektive Part ska utse var sin kontaktman för att ansvara och hantera löpande frågor rörande installationen. Vardera Parten ska bära sina respektive kostnader för startmötet. På startmötet ska Parterna överenskomma om detaljerad tidplan och former för arbetets utförande.

I god tid innan installationen påbörjas och senast vid startmötet ska Fastighetsägaren förse Telia med fastighetsbeskrivning, ritningar över Fastigheten och berörda byggnader utvisande nödvändig information för anslutning och installation. Fastighetsägaren ansvarar för att sådan information är korrekt och fullständig.

Installation och/eller anslutning av Fastighetsnät i såväl nybyggnation av byggnad som i befintlig bebyggelse ska ske vid den tidpunkt som skriftligen överenskommits mellan Parterna.

Fastighetsägaren ansvarar för kanalisation från tomtgränsen fram till Nätanslutningspunkten.

Ersättning

Fastighetsägaren ska betala i Avtalet överenskommen ersättning. Samtliga priser är exklusive mervärdesskatt. Fakturaavgift tillkommer för pappersfaktura.

Fastighetsägaren ska betala faktura inom trettio (30) dagar från fakturadatum i enlighet med anvisningar angivna på fakturan. Vid förskottsbetalning enligt punkt 5.5 ska betalning ske senast den dag Telia anger.

Debitering av i Avtalet ingående tjänster påbörjas vid tidpunkt som Parterna överenskommit i Avtalet eller annars på avtalad leveransdag eller, om leveransen är försenad av orsak enbart hänförlig till Telia, från den dag då leverans faktiskt sker.

Om Fastighetsägaren inte fullgjort betalningen senast på förfallodagen har Telia rätt till ersättning för betalningspåminnelser och inkassokostnader samt till dröjsmålsränta enligt lag. Om Fastighetsägaren, trots påminnelse och stängning av Tjänsten inte betalar förfallen faktura, ska övrig ersättning för Tjänsten som ännu inte har fakturerats anses förfallen till omedelbar betalning.

Telia har rätt att under avtalstiden begära förskottsbetalning eller att Fastighetsägaren ställer säkerhet för Avtalets rätta fullgörande om det till följd av kreditprövning framstår som befogat. Ränta utgår inte på förskotterat belopp. Telia har vidare rätt att ur förskotterat belopp eller ställd säkerhet tillgodogöra sig belopp motsvarande sina förfallna fordringar, inklusive sådana kostnader som avses i punkt 5.4.

Telia har rätt att överlåta sin rätt till betalning enligt Avtalet till annan.

Bestämmelserna i detta avsnitt 5 ska äga motsvarande tillämpning för det fall Fastighetsägaren inom ramen för avtalet tillhandahåller tjänster till Telia.

Äganderätt och nyttjanderätt

Om inte annat anges ska Fastighetsägaren inneha äganderätten till Fastighetsnätet och tillhörande Kanalisation.

Telias Nät ägs eller disponeras av bolag inom Telia-koncernen fram till och med Nätanslutningspunkten. Nätanslutningspunkten kan vara placerad vid fastighetsgränsen eller inne på Fastigheten. Om Nätanslutningspunkten är placerad inne på Fastigheten åtar sig Fastighetsägaren att på begäran av sådant Telia bolag teckna ett särskilt upplåtelseavtal i enlighet med särskild bilaga avseende rätt för bolaget att anlägga och bibehålla nät fram till och med Nätanslutningspunkten på Fastigheten samt i förekommande fall på gator, enskilt ägda fastigheter, etc. inom det område som omfattas av Avtalet.

Kundplacerad Utrustning, t.ex. Telias Access-switch, ägs av Telia som svarar för drift och underhåll av denna utrustning. Ägande och ansvar för annan utrustning som Telia installerat i Bostad/Lokal framgår av Avtalet. Telia förbehåller sig rätten att utföra konfigurationsändringar, uppgraderingar samt i övrigt disponera den Kundplacerade Utrustningen för utveckling av tjänster under den tid som utrustningen är ansluten mot Bredbandstjänst. Under omständighet att den Kundplacerade Utrustningen inte ägs av Telia, förbehåller sig Telia likväl rätten att utföra konfigurationsändringar, uppgraderingar samt i övrigt disponera sådan utrustning för utveckling av tjänster under den tid som utrustningen är ansluten mot Bredbandstjänst.

Fastighetsägaren ger Telia rätt att i den omfattning som behövs bygga ut Telias Nät inom Fastigheten fram till Nätanslutningspunkten.

Fastighetsägaren ger Telia rätt att under avtalstiden utan ersättning nyttja Fastighetens Teknikutrymme inklusive elektricitet, värme och kyla.

Avtalet innebär inte att äganderätten till Kundplacerad Utrustning övergår till Fastighetsägaren och Fastighetsägaren får inte sälja, pantsätta, hyra eller låna ut eller på annat sätt förfoga över sådan utrustning utan att Telia först lämnat skriftligt medgivande därtill.

Fastighetsägaren ska under avtalstiden tillförsäkra Telia en exklusiv nyttjanderätt till Fastighetsnätet och Kanalisationen för tillhandahållande av Bredbandstjänster.

Överlåtelse av rättigheter och skyldigheter

Med undantag för de särskilda fall som anges nedan, har Part inte rätt att överlåta sina rättigheter och skyldigheter enligt Avtalet utan den andre Partens skriftliga samtycke. Telia har dock rätt att överlåta sina rättigheter och skyldigheter enligt Avtalet till annat bolag inom Telias koncern. Telia ska skriftligen meddela Fastighetsägaren om detta sker.

Fastighetsägaren garanterar att denne vid överlåtelse av Fastigheten ska göra förbehåll för de nyttjanderätter och andra rättigheter som upplåts till Telia eller annat Telia bolag enligt Avtalet, så att Avtalet gäller mot förvärvare av Fastigheten. Fastighetsägaren ska vid överlåtelse av Fastigheten överlåta sina rättigheter och skyldigheter enligt Avtalet till förvärvare av Fastigheten.

Vad som sägs i punkt 7.2 ska gälla även vid annan fastighetsrättslig reglering eller vid överlåtelse av Fastighetsnätet eller del därav.

Förtida upphörande

Vardera Parten får säga upp Avtalet med omedelbar verkan om: 

den andra Parten inleder likvidationsförhandlingar, inger ansökan om företagsrekonstruktion, inleder ackord, försätts i konkurs eller eljest kan antas vara på obestånd, eller;

den andra Parten har gjort sig skyldig till väsentligt avtalsbrott som inte åtgärdats inom tio (10) arbetsdagar efter skriftlig begäran.

Uppsägning enligt punkt 8.1 ska ske skriftligen.

Definitionerna i Avtalets Bilaga samt bestämmelserna i dessa Allmänna villkor punkterna 3.4 - 3.6, 7.1 – 7.3, 9.1 – 9.4, 10.1 - 10.3, 11.1 – 11.3 samt 13.1 – 13.3 ska äga fortsatt giltighet även efter Avtalets upphörande till dess Telias avtal med Boende/Företaget om Bredbandstjänst upphört att gälla.

Skadestånd

Part har rätt till ersättning för direkt skada som motparten, eller någon för vilken motparten svarar, förorsakat genom vårdslöshet. Part har inte någon rätt till ersättning för indirekta skador, såsom utebliven handelsvinst, kostnader som blivit onyttiga eller andra följdskador. Parts ansvar är vidare för varje skadetillfälle begränsat till ett sammanlagt belopp motsvarande trettiofem (35) prisbasbelopp enligt lagen (1962:381) om allmän försäkring, om inte annat anges i Avtalet.

Oaktat vad som föreskrivs i punkt 9.1 ovan ansvarar Telia inte för skada som uppkommer för Fastighetsägaren till följd av innehåll i data eller annan information som förmedlas vid användning av tjänster enligt Avtalet, inte heller ansvarar Telia för skada orsakad av datavirus eller motsvarande, försening, förvanskning eller förlust av data eller för Fastighetsägaren eventuella ersättningsskyldighet gentemot tredje man.

Begränsningarna av Parts skadeståndsskyldighet gäller inte i fall av uppsåt eller grov vårdslöshet, vid personskada eller vid sådant ansvar som följer av tvingande lag. Begränsningarna av Parts skadeståndsskyldighet gäller vidare inte vid skada som uppkommit till följd av att Fastighetsägaren brutit mot punkt 7.2 eller 7.3.

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
var expectedText = `Konfidentiellt
${CreatedDate}
 Sidnr
2 (31)
Halebop Fastighetsanslutning
Med Halebop får ni en supersnabb, stabil och framtidssäkrad bredbandsanslutning. Fastigheten 
ansluts till ett av Sveriges mest kraftfulla fibernät som levererar tjänster i världsklass.
Vi på Halebop är mästare på att ha nöjda kunder enligt Svenskt Kvalitetsindex och har en mycket
uppskattad support. Vi är en del av Telia och delar samma stabila nät, drift och erfarenheter – 
men är ett enklare alternativ för er som bara behöver ett supersnabbt och stabilt bredband.
Därför är Telia en bra partner
Att ansluta Fastigheten till fiber är en långsiktig investering. Med längst erfarenhet på marknaden vet vi 
vad som krävs för att ert fibernät ska hålla i decennier framöver. Vi säkerställer drift och funktionalitet av 
nätet dygnet runt och felsöker proaktivt för att snabbt åtgärda eventuella fel. Dessutom har vi en egen 
kundtjänst för er som Fastighetsägare dit ni kan vända er med alla frågor som rör fiberanslutningen.
Följande ingår i denna offert: 
Vi ansluter befintligt Fastighetsnät till Telias Nät. 
Vi erbjuder Bredbandstjänster genom kollektiv anslutning.  

Konfidentiellt
${CreatedDate}
 Sidnr
3 (31)
Vårt Erbjudande
ERBJUDANDETJÄNSTANTALENGÅNGSAVGIFTMÅNADSAVGIFT
Antal portar
Totalt antal Bostäder444 st
Totalt antal Lokaler0 st
Totalt antal Övriga portar0 st
Totalt antal 
anslutningar444 st
Produkter
Kollektiv Installationshjälp 7 st0.00 kr0.00 kr per anslutning 
Kollektiv hårdvara - Tv-box 444 st0.00 kr0.00 kr per anslutning 
Kollektiv Tv & Streaming 
Start 444 st0.00 kr8.00 kr per anslutning 
Kollektivt Halebop Bredband 
- 1000 Mbit/s 7 st0.00 kr0.00 kr per anslutning 
Kollektiv Installationshjälp 444 st0.00 kr0.00 kr per anslutning 
Kollektiv hårdvara - Tv-box 444 st0.00 kr0.00 kr per anslutning 
Kollektiv Tv & Streaming Bas 7 st0.00 kr0.00 kr per anslutning 
Kollektivt Halebop Bredband 
- 1000 Mbit/s 7 st0.00 kr0.00 kr per anslutning 
Kollektiv hårdvara - TV-box 7 st0.00 kr0.00 kr per anslutning 
Kollektiv Tv Allmänna 
utrymmen - Start 7 st0.00 kr0.00 kr per anslutning 
Kollektiv TV - Must Carry 7 st0.00 kr0.00 kr per anslutning 
Kollektiv TV - Stor 7 st0.00 kr0.00 kr per anslutning 
Kollektivt Bredband Företag 
Start - 100/100 Mbit/s 7 st0.00 kr0.00 kr per anslutning 
Kollektiv hårdvara - 
Bredbandsswitch 7 st0.00 kr0.00 kr per anslutning 
Kollektiv hårdvara - TV-box 7 st0.00 kr0.00 kr per anslutning 
Medieomvandlare 7 st2200.00 kr0.00 kr per anslutning 

Konfidentiellt
${CreatedDate}
 Sidnr
4 (31)
Summa15400.00 kr3552.00 kr
UPPKOPPLING UTAN KRÅNGELSAMMANSTÄLLNING
TOTAL ENGÅNGSAVGIFT
15400.00 kr (exkl moms)     
TOTAL MÅNADSAVGIFT
3552.00 kr/mån (exkl 
moms)
TOTAL MÅNADSAVGIFT PER 
ANSLUTNING
8.00 kr/mån (exkl moms)
Med våra nätverk får du en uppkoppling 
baserat på den senaste tekniken 
kombinerat med vår långa erfarenhet 
inom området. Vi möter dina 
förväntningar på en uppkoppling utan 
krångel. 
Observera att Halebop bredband samt 
eventuell router faktureras via Halebop. 
Övriga poster faktureras via Telia.
AVTALSTID
5 år

Konfidentiellt
${CreatedDate}
 Sidnr
5 (31)
Leveranstid:
Normal leveranstid är 4-8 månader efter det att underskriven offert kommit oss tillhanda. Kompletta 
adresslistor ska vara oss tillhanda senast två veckor efter underskriven offert för att vi i samråd med er ska
kunna besluta om slutlig leveranstid.
Villkor och accept
Offertens giltighetstid är 8 veckor räknat från offertens datum. Innehållet i denna offert samt tillhörande 
bilagor utgör konfidentiell information och får inte spridas eller på annat sätt göras tillgängligt för 
utomstående utan skriftligt medgivande från behörig på Telia.
För att acceptera denna offert, eller ställa frågor, vänligen kontakta mig på telefon +91 1234567890 eller 
via mail yogesh.jadhav@teliacompany.com.
Med vänliga hälsningar,
CRM Fiber Sales Rep
${CreatedDate}

Konfidentiellt
${CreatedDate}
 Sidnr
6 (31)
Avtal om Halebop Fastighetsanslutning
Telias Offertnummer
${ContractNumber}
Detta avtal har ingåtts mellan följande parter
Telia Sverige AB (nedan ”Halebop” eller 
”Telia”)
Org.nr 556430-0142
169 94 Solna
Mekonomen Billivet Albyberg AB (nedan kallad 
”Fastighetsägaren”) Org.nr 5591498893
Box 14056, C/O Mekonomen Detaljist Ab
20024, Malmö
Telia och Fastighetsägaren kallas fortsättningsvis även gemensamt ”Parterna” och var för sig ”Part”.
1Omfattning och avtalshandlingar
Parterna har ingått avtal med avtalsnummer ${ActiveContractNumber} (”Ursprungsavtalet”). Ursprungsavtalet 
jämte eventuella tilläggsavtal till Ursprungsavtalet upphör att gälla och ersätts av detta Avtal i och 
med Telias driftsättning av tjänsterna enligt detta Avtal. 
Fastighetsägaren och Halebop har genom detta Avtal överenskommit att Halebop ska avseende 
Fastighet(er) (om fler så nedan gemensamt benämnda ”Fastigheten”) som anges i ”Bilaga: 
Fastighetsbeteckningar”, ansluta befintligt Fastighetsnät och Kundplacerad Utrustning till Telias Nät 
enligt närmare beskrivning i ”Bilaga: Installation”. 
Antal anslutningar i Telias Nät ska uppgå till 400 st. varav 400 st. befintliga och 0 st. tillkommande. 
Halebop kan erbjuda anslutning av ytterligare Bostäder/Lokaler till Telias Nät enligt särskild offert 
efter förfrågan från Fastighetsägaren. 
Parterna är överens om att Halebop och Telia ska leverera Bredbandstjänster till Boende/Företag i 
de anslutna Bostäderna/Lokalerna. Halebop och Telia ska leverera Bredbandstjänster genom 
kollektiv anslutning enligt vad som närmare framgår av punkten 3 nedan. Boende/Företag på 
Fastigheten kan dessutom teckna individuellt avtal med Telia om Telias vid var tid aktuella 
Bredbandstjänster.  
Parterna kan vidare överenskomma att Telia ska tillhandahålla service av Fastighetsnät m.m., 
fastighetsstyrningstjänster och/eller installationshjälp till Boende av kollektiva tjänster. Detta 
framgår i så fall under punkten 3 (”Tjänster och priser”) nedan.
En teknisk beskrivning av Fastighetsnät m.m. inklusive de krav som respektive Part åtar sig att 
säkerställa framgår av Bilaga: Kravspecifikation
Parternas respektive ansvar för service av Fastighetsnät m.m. framgår av Bilaga: Service.
Telia är inte skyldigt att erbjuda anslutning av Fastighet, Fastighetsnät och/eller Områdesnät till 
Telias Nät om Telias kostnad för sådan anslutning skulle bli oskäligt hög i förhållande till nyttan av 
investeringen för Telia. Det sagda gäller exempelvis i de fall, men inte begränsat till, det endast finns
ett fåtal Bostäder/Lokaler på Fastigheten.
Förekommer mot varandra stridande villkor i Avtalet gäller villkoren i denna huvudtext före 
villkoren i bilagor och bilagorna sinsemellan i ordning. Senare tillkomna bilagor ska gälla före äldre 
bilagor av samma typ.
2Personuppgiftsbehandling

Konfidentiellt
${CreatedDate}
 Sidnr
7 (31)
För att Halebop/Telia ska kunna fullgöra sin del av Avtalet kan Telia komma att behöva tillträde till 
Bostäder/Lokaler som omfattas av Avtalet. I sådant fall åtar sig Fastighetsägaren att i samband med 
Avtalets ingående på Telias begäran förse Halebop/Telia med en lista över Bostäderna/Lokalerna på 
Fastigheten. Listan ska vara Telia tillhanda senast två (2) veckor efter beställningsdatum och ska 
innehålla fullständig information enligt följande. Om Lokaler: lokalbeteckning, våning, postnummer 
och postadress, Företagets namn och organisationsnummer samt telefonnummer som Företaget 
kan nås på. Av listan över Lokalerna ska framgå vilka Lokaler som är anslutna till Fastighetsnätet. Om
Bostäder: lägenhetsnummer, våning, postnummer och postadress, namn samt telefonnummer. Av 
listan ska även framgå vilka Bostäder som är anslutna till Fastighetsnätet.
Om det behövs för att uppfylla Avtalet lämnar Halebop/Telia ut uppgifterna ovan till 
Halebops/Telias samarbetspartners och underleverantörer.
Fastighetsägaren ansvarar för att uppgifterna som lämnas till Halebop/Telia är korrekta och för att 
Fastighetsägaren har rätt att förse Halebop/Telia med sådan information. Fastighetsägaren ansvarar
vidare för att de individer vars uppgifter överlämnats har informerats om att uppgifter om dem har 
lämnats till Halebop/Telia samt för vilka ändamål Halebop/Telia behandlar dessa uppgifter. 
Fastighetsägaren ska utan dröjsmål meddela Halebop/Telia eventuella ändringar i uppgifter som har
överlämnats.
Parterna är överens om att den behandling av personuppgifter som sker inom ramen för Avtalet 
sker för respektive Parts eget ändamål och för egen räkning. Detta innebär att respektive Part är att 
anse som personuppgiftsansvarig för den behandling som sker och ansvarar således för att tillse att 
behandlingen sker i enlighet med tillämplig dataskyddslagstiftning. 
3Tjänster och priser
I Avtalet ingår följande tjänster:
Anslutning av befintligt Fastighetsnät till Telias Nät i enlighet med ”Bilaga: Installation”. Antal 
anslutna Bostäder/Lokaler uppgår till 444 st. och antal Övriga portar uppgår till 0 st. varav antal 
Tillkommande portar uppgår till 0 st. För anslutning till Telias Nät utgår en engångsavgift om 
15400.00 kr exklusive moms (avser befintliga anslutningar). 
Priset för de kollektiva tjänsterna ska faktureras successivt i takt med att Bredbandstjänsterna 
aktiveras i respektive Fastighet. Antal anslutna Bostäder uppgår till 444 st. 
Installationshjälp till Boende avseende kollektiva tjänster från Telia i enlighet med Bilaga: 
Installationshjälp.
Boende på Fastigheten i Bostad får tillgång till Bredbandstjänster genom kollektiv anslutning enligt 
nedan. För undvikande av missförstånd noteras att Lokaler aldrig ansluts till Tv från Telia. För 
kollektiva tjänster från Halebop utgår en månadsavgift om 0.00 kr/mån per Bostad. För kollektiva 
tjänster från Telia utgår en månadsavgift om 8.00 kr/mån per Bostad. Fakturering av 
Fastighetsägaren sker kvartalsvis. 
a)Telia Tv & Streaming Start till 444 st. anslutningar (för undvikande av missförstånd noteras att 
endast privatbostäder ansluts till Tv från Telia). Förteckning av vid var tid aktuella kanaler framgår
av telia.se. Parterna är dock överens om att Telia förbehåller sig rätten att ändra 
sammansättningen av kanaler. 
b)Telia Tv & Streaming Bas levereras till 7 st. anslutningar (för undvikande av missförstånd noteras 
att endast privatbostäder ansluts till Tv från Telia). Förteckning av vid var tid aktuella kanaler 
framgår av telia.se. Parterna är dock överens om att Telia förbehåller sig rätten att ändra 

Konfidentiellt
${CreatedDate}
 Sidnr
8 (31)
sammansättningen av kanaler. 
c)Telia Tv & Streaming Stor levereras till 7 st. anslutningar (för undvikande av missförstånd noteras 
att endast privatbostäder ansluts till Tv från Telia). Förteckning av vid var tid aktuella kanaler 
framgår av telia.se. Parterna är dock överens om att Telia förbehåller sig rätten att ändra 
sammansättningen av kanaler. 
d)Halebop Bredband 1000/1000 Mbit levereras till 7 st. 
e)Halebop Bredband 1000/1000 Mbit levereras till 7 st. 
Företag på Fastigheten i Lokal får tillgång till Bredbandstjänster genom kollektiv anslutning enligt 
nedan. För undvikande av missförstånd noteras att Företagslokaler aldrig ansluts till Tv från Telia. 
För kollektiva tjänster utgår en månadsavgift om 0.00 kr/mån per Lokal. Fakturering av 
Fastighetsägaren sker kvartalsvis.
a)Telia Bredband Start 100/100 Mbit levereras till 7 st. 
Allmänna utrymmen på Fastigheten i Lokal får tillgång till Bredbandstjänster genom kollektiv 
anslutning enligt nedan. För undvikande av missförstånd noteras att Företagslokaler aldrig ansluts 
till TV från Telia. För kollektiva tjänster utgår en månadsavgift om 0.00 kr/mån per Lokal. 
Fakturering av Fastighetsägaren sker kvartalsvis. 
a)Telia Tv Allmänna utrymmen Start levereras till 7 st.  
Telia har rätt att en gång per år göra en indexförändring av de priser och avgifter som anges i 
Avtalet. En prisjustering med stöd av indexförändring kan första gången ske tidigast sex (6) månader
efter det att Avtalet ingåtts. Indextalet för den oktobermånad som infaller året före det år då 
Avtalet ingås (basmånad) utgör indexets bastal. Om indextalet i någon påföljande oktobermånad 
(avräkningstidpunkt) har stigit i förhållande till indexets bastal ska priser och avgifter i Avtalet 
justeras med hänsyn till detta. Om inte annat anges ska SCB:s Konsumentprisindex (KPI) (1980=100) 
vara tillämpligt index. Telia meddelar Kunden om den aktuella indexförändringen senast trettio (30) 
dagar innan förändringen träder i kraft. En indexförändring ger inte Kunden rätt att säga upp berörd 
Tjänst eller Avtalet. Eventuella ytterligare villkor för indexering och tillämpligt index (om annat än 
SCB:s Konsumentprisindex (KPI)) anges i Avtalet. 
Övriga vid var tid tillämpliga erbjudanden, aktuella priser och kampanjer framgår av 
halebop.se/fastighetsagare och telia.se.
4Allmänna villkor
För Avtalet gäller Bilaga: Allmänna villkor.
5Avtalstid
Avtalet gäller från och med undertecknandet för en initial period om 5 år räknat från det att 
Halebop/Telia driftsatt tjänsterna enligt detta avtal.
Har inte Avtalet sagts upp senast tolv (12) månader före den initiala avtalsperiodens slut, förlängs 
det automatiskt att gälla ytterligare två (2) år. Därefter förlängs Avtalet med två (2) år i taget med 
iakttagande av tolv (12) månaders uppsägningstid. Uppsägning ska vara skriftlig och behörigen 
undertecknad.
Avtalet har upprättats i två (2) exemplar av vilka Parterna tagit var sitt.

Konfidentiellt
${CreatedDate}
 Sidnr
9 (31)
Datum
${CreatedDate}
Telia Sverige AB
Datum
${CreatedDate}
Mekonomen Billivet Albyberg AB
Namnförtydligande
CRM Fiber Sales Rep
Namnförtydligande
Test Yogesh Jadhav

Konfidentiellt
${CreatedDate}
 Sidnr
10 (31)
Bilageförteckning
Bilaga: Definitioner
Bilaga: Fastighetsbeteckningar
Bilaga: Installation
Bilaga: Installationshjälp
Bilaga: Kravspecifikation
Bilaga: Service 
Bilaga: Allmänna villkor

Konfidentiellt
${CreatedDate}
 Sidnr
11 (31)
Bilaga: Definitioner 
Access-switch är en nätkomponent i Telias Nät som är gemensam för flera Slutkunder och till vilken 
Fastighetsnät ansluts för att leverera Bredbandstjänster till Boende/Företag. Access-switch placeras 
vanligtvis i Fastighetens Teknikutrymme, vid Nätanslutningspunkten.
Allmänna utrymmen är en Lokal som är belägen på Fastigheten men som inte disponeras av Företag. 
Avtalet är detta avtal om Telia Fastighetsanslutning, inklusive bilagor, mellan Telia och 
Fastighetsägaren.
Boende är boende i Bostad belägen på Fastigheten.
Bostad är en privatbostad som disponeras av en Boende.
Bostadsnät eller Lokalnät är fast installerad kabel med tillhörande LAN-uttag i Lokal. 
Bostadsnät/Lokalnät är installerat för stadigvarande bruk och används för att sprida Bredbandstjänster
vidare från Överlämningspunkten. Bostadsnät/Lokalnät omfattas inte av Telias ansvar om inte annat 
framgår av Avtalet.
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
Fastighetens Teknikutrymme är plats för Kundplacerad utrustning som Fastighetsägaren upplåter i 
Nätanslutningspunkt.
Fastighetsnät är kabel, anordning för terminering av kabel (t.ex. LAN-uttag) och kopplingspanel. 
Fastighetsnät används för att sammankoppla Överlämningspunkt i Bostad/Lokal med Access-switch via
Nätanslutningspunkt. I FTTH-nät avslutas Fastighetsnät med ett opto-uttag i Bostad/Lokal alternativt 
med kontakt på inkommande fiber om opto-uttag saknas. I FTTB-nät avslutas Fastighetsnät i det första
RJ45-uttaget i Lokalen. Fastighetsnät ägs av Fastighetsägaren och omfattas inte av Telias ansvar om 
inte annat framgår av Avtalet.
Fastighetsägare är fysisk eller juridisk person som, ensam eller tillsammans med andra, äger den eller 
de Fastigheter som omfattas av Avtalet. Fastighetsägare enligt Avtalet kan t.ex. vara en ekonomisk 
förening, samfällighet eller aktiebolag.
Fel är avvikelse som medför att Bredbandstjänst inte är tillgänglig för Slutkund, eller där 
Bredbandstjänstens funktion är så kraftigt nedsatt att den är att betrakta som obrukbar.
FTTB (Fibre To The Basement) är en nätrealisering där Bostaden/Lokalen ansluts med cat6/cat5e-kabel
genom Fastighetsnät fram till Överlämningspunkt.
FTTH (Fibre To The Home) är en nätrealisering där Bostaden/Lokalen ansluts med fiberkabel fram till 
Överlämningspunkt.
Företag är näringsidkare som är nyttjanderättshavare till en Lokal på Fastigheten.
Företagslokal är en Lokal som disponeras av Företag.
Halebop är Telia Sverige AB.

Konfidentiellt
${CreatedDate}
 Sidnr
12 (31)
Intag är kanalisation eller utrymme i en byggnads yttervägg som är avsedd att leda in Telias Nät i 
byggnaden. Telia fastställer punkt för terminering av nätet.
Kanalisation är rör avsett för indragning av kabel. Kanalisation ingår inte i Fastighetsnät. 
Fastighetsägaren äger och ansvarar för Kanalisation, dock har Telia fri dispositionsrätt till sådan 
Kanalisation.
Kundplacerad Utrustning är utrustning (inklusive programvara), som ägs eller tillhandahålls av Telia 
och som placeras på Fastigheten för att möjliggöra tillhandahållandet av Bredbandstjänster till 
boende/företag. Utrustning placerad hos Slutkund som ett resultat av individuellt avtal omfattas inte 
av denna definition.
Lokal är en företagslokal som disponeras av näringsidkare eller annan lokal som är belägen på 
Fastigheten.
Maximal åtgärdstid är den tidsperiod som det längst får ta att åtgärda ett Fel. Maximal åtgärdstid 
anges i timmar under gällande Servicetid och räknas fr.o.m. den tidpunkt då Telia mottagit felanmälan 
från Fastighetsägaren eller Telias tekniker gällande Fastighetsnätet t.o.m. den tidpunkt då Telia 
klarrapporterat anmält Fel.
Medieomvandlare är en nätkomponent i FTTH-nät som omvandlar den optiska signalen till elektrisk 
signal i Bostaden/Lokalen. Medieomvandlare är placerad vid Överlämningspunkt och kan vara en 
fristående enhet eller SFP monterad i Bredbandsswitch. Medieomvandlaren ägs av Telia. Servicevillkor 
för Medieomvandlare framgår av Avtalet.
Nätanslutningspunkt är punkt på Fastigheten där Fastighetsnätet/Områdesnätet ansluts till Telias Nät 
via Access-switch. Det kan finnas flera Nätanslutningspunkter inom en Fastighet. Fastighetsägaren 
upplåter plats för Kundplacerad utrustning i Nätanslutningspunkt.
Nätfel är en avvikelse som medför att samtliga Slutkunder anslutna till en Access-switch är drabbade 
av Fel. 
Områdesnät utgör en delmängd av accessnätet och består av nät mellan byggnader på gemensam 
Fastighet. Områdesnät omfattas inte av Telias ansvar om inte annat framgår av Avtalet.
RJ45-uttag är det uttag som, i FTTB-nät, är placerat i Bostaden/Lokalen, dvs. vid Överlämningspunkt. 
Servicevillkor för RJ45-uttag framgår av Avtalet.
Serviceansvar är ansvar för part att åtgärda Fel i angiven komponent, oavsett vem som ska bära 
kostnaden för åtgärden. Telias Serviceansvar innebär, förutom korrektiva åtgärder, preventiva 
åtgärder såsom uppgradering av mjukvara eller konfiguration.
Servicefönster är den tidsperiod, måndagar mellan kl 00.00 och 04.00, när Telia har rätt att genomföra
planerade arbeten i Telias Nät som medför avbrott i Bredbandstjänst.
Servicetid är den tidsperiod inom vilken Telia åtagit sig att åtgärda Fel.
SFP är ”Small form-factor pluggable transceiver” vilket är en Medieomvandlare som monteras t.ex. i 
nätverksutrustning som Bredbandsswitch.
Slutkund är Boende eller Företag som ingått avtal med Tjänsteleverantör om individuell leverans av 
Bredbandstjänst.
Telia är Telia Sverige AB.
Telias Nät är de allmänna kommunikationsnät som ägs eller på annat sätt disponeras av bolag inom 
Telia-koncernen. Sådant bolag svarar för drift av Telias Nät. Telias Nät ansluts till Fastighetsnät via 
Kundplacerad Utrustning i en Nätanslutningspunkt.
Tjänsteleverantör är Telia eller den som ingått avtal med Telia om tillhandahållande av 
Bredbandstjänster till Slutkund i Överlämningspunkt.  

Konfidentiellt
${CreatedDate}
 Sidnr
13 (31)
Tjänstespecifik hårdvara är hårdvara placerad efter Överlämningspunkt för Tjänsteleverantörs 
leverans av Bredbandstjänst t.ex. router, tv-box eller telefoniadapter. Villkor för Tjänstespecifik 
hårdvara framgår av avtal mellan Tjänsteleverantör och dennes avtalspart, vilket vid individuellt 
tecknade avtal är Slutkund. I de fall Fastighetsägare och Telia avtalar om kollektiv leverans framgår 
villkoren för den Tjänstespecifika hårdvaran av Avtalet.
Överlämningspunkt är den första punkt i Lokalen där Slutkund har möjlighet att ta emot 
Bredbandstjänst. I de fall Bredbandsswitch finns installerad utgör LAN-port på Bredbandsswitchen 
överlämningspunkt. Saknas Bredbandsswitch utgörs Överlämningspunkt av LAN-uttag (RJ45) på 
Medieomvandlare vid FTTH eller vid FTTB, första LAN-uttag.

Konfidentiellt
${CreatedDate}
 Sidnr
14 (31)
Bilaga: Fastighetsbeteckningar
Nedan visas vilka fastighetsbeteckningar som omfattas av avtalet:
[ABCD]

Konfidentiellt
${CreatedDate}
 Sidnr
15 (31)
Bilaga: Installation
Denna bilaga kompletteras av bestämmelserna i Bilaga: Allmänna villkor.
För detaljerad teknisk beskrivning se Bilaga: Kravspecifikation
1Omfattning 
Om Parterna uttryckligen kommit överens om installation av Fastighetsnät genom punkten 3 (Tjänster 
och priser) i Avtalet, utförs installation av Fastighetsnät med CAT5E alternativt CAT6 för Bredbandstjänster
eller i särskilda fall med fastighetsnät Fiber (FTTH). Vidare omfattar installationen av Fastighetsnät även 
leverans och montering av aktiv utrustning i av Fastighetsägaren tillhandahållet stativ eller skåp (dessa ska
vara låsta för utomstående) samt installation av Kundplacerad Utrustning. Telia ansvarar för drift och 
underhåll av sådan utrustning under avtalstiden. 
Om Parterna inte uttryckligen kommit överens om installation av Fastighetsnät genom punkten 3 
(Tjänster och priser) i Avtalet, omfattas installation av Fastighetsnät inte av Telias åtagande. Telias 
installationsåtagande omfattar under sådana omständigheter endast installation av Kundplacerad 
Utrustning. Telia ansvarar för drift och underhåll av sådan utrustning under avtalstiden.
Fastighetsnät med fiber (FTTH) ansluts i en Medieomvandlare med RJ45- gränssnitt. Nämnda 
Medieomvandlare kräver elmatning. Fastighetsägaren ansvarar för att eluttag finns tillgängligt där 
Medieomvandlare placeras, dvs. i närheten av entrédörr. För det fall Telia sedan tidigare har installerad 
Kundplacerad Utrustning på Fastigheten har Telia ingen skyldighet att installera Kundplacerad Utrustning. 
Medieomvandlare tillhandahålls och ägs av Telia.
För tydlighets skull anges nedan exempel på vad som inte ingår i installationen. Exemplifieringen är inte 
uttömmande. I installationen ingår t.ex. inte:
Installationshjälp av tjänster (om inte uttryckligen avtalats i detta Avtal).
Flytt av skrymmande föremål och möbler.
Kostnad för eventuella eluttag i Bostäder/Lokaler och i Fastighetens Teknikutrymme.
Installation av Fastighetsnät, Bostadsnät/Lokalnät och Områdesnät (om inte uttryckligen avtalats i 
detta Avtal).
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
2Tillträde till Fastigheten
Fastighetsägaren ansvarar för att Telia skyndsamt och utan vidare dröjsmål får tillträde till samtliga 
utrymmen som omfattas av installationen. I de fall Telia inte bereds tillträde till nödvändiga utrymmen 
inom överenskommen tid, har Telia rätt att undanta dessa utrymmen från sitt åtagande att utföra 
installationen. Vid mer än två försök att få tillträde under installationstiden debiteras extra kostnad för 

Konfidentiellt
${CreatedDate}
 Sidnr
16 (31)
arbetstid och restid.
3Slutbesiktning
Slutbesiktning ska vid behov utföras i de fall Avtalet omfattar installation av Fastighetsnät. Syftet med en 
slutbesiktning är att kontrollera att installationen utförts i enlighet med Avtalet. Fastighetsägaren kallar 
Telia till slutbesiktningen om Fastighetsägaren anser att det finns behov av en slutbesiktning. 
Slutbesiktning ska, om inte annat avtalats, infalla sju (7) arbetsdagar före avtalad leveransdag. Med 
avtalad leveransdag avses den tidpunkt som Parterna skriftligen överenskommit. Är installationen 
försenad, ska slutbesiktning istället genomföras vid av Telia angiven tidpunkt för färdig installation.
Slutbesiktningen är okulär och omfattar endast de Bostäder/Lokaler som Fastighetsägaren skaffat tillträde
till. Bostäder/Lokaler till vilka tillträde inte lämnats för slutbesiktning ska anses vara godkända och utan 
anmärkning. Vid slutbesiktningen ska ett särskilt slutbesiktningsprotokoll upprättas genom 
Fastighetsägarens försorg.
Eventuella fel och brister som Telia ansvarar för ska antecknas i slutbesiktningsprotokollet och 
kostnadsfritt åtgärdas av Telia inom skälig tid. Vidare ska i slutbesiktningsprotokollet antecknas om 
installationen är godkänd. Fel och brister av mindre betydelse ska inte utgöra hinder för godkännande. 
Sådana fel och brister ska avhjälpas av Telia senast två (2) månader efter godkänd installation.
För det fall Fastighetsägaren inte kallat Telia till slutbesiktning enligt vad som framgår ovan ska 
installationen anses godkänd av fastighetsägaren vid avtalad leveransdag. Är installationen försenad, ska 
installationen anses godkänd vid färdig installation. 
Telia ansvarar för att Fastighetsnät inte är behäftat med materialfel och att fel i utförda 
installationsarbeten inte föreligger. Detta ansvar gäller för fel som framträder under två (2) år efter 
godkänd installation.
4Övrigt
Telia kommer vid behov att kalla till ett startmöte med Fastighetsägaren i syfte att gå igenom 
installationsprocessen samt andra relevanta frågor. Respektive part ska utse var sin kontaktman för att 
ansvara för att hantera löpande frågor rörande installationen. Vardera Parten ska bära sina respektive 
kostnader för startmötet. 
I samband med startmötet eller i god tid innan installationen påbörjas överenskommer parterna om 
detaljerad tidplan och former för arbetets utförande. Fastighetsägaren ska dessutom förse Telia med 
nödvändig information för installationen, t.ex. fastighetsbeskrivning, ritningar över Fastigheten och 
byggnader som omfattas av Avtalet, ritningar över kablage avsedda för el m.m. Fastighetsägaren ansvarar 
för att sådan information är korrekt och fullständig. Eventuella skador vid borrning betalas av 
Fastighetsägaren om inte korrekta ritningar erhålls.
Fastighetsägaren är ansvarig för Fastighetsnätet och de Överlämningspunkter som finns och att korrekt 
information rörande detta kommer Telia till handa.
Fastighetsägaren ansvarar för att informera Telia om denna har ingått avtal med andra aktörer om 
utrymmen på Fastigheten.
Fastighetsägaren ansvarar för att informera Boende/Företag om installationens omfattning och 
tidpunkter samt Boendes/Företags åtaganden i samband med installationen, t.ex. tillträde till 

Konfidentiellt
${CreatedDate}
 Sidnr
17 (31)
Bostaden/Lokalen samt flytt av möbler.
En förutsättning för att Telia ska kunna genomföra installationen inom utlovad leveranstid är att 
Fastighetsägaren uppfyller sina åtaganden beträffande installationen inom angiven tid.

Konfidentiellt
${CreatedDate}
 Sidnr
18 (31)
Bilaga: Installationshjälp
Om Parterna uttryckligen kommit överens om installationshjälp till Boende avseende kollektiva tjänster 
från Telia genom punkten 3 (Tjänster och priser) i Avtalet utförs installationshjälpen enligt nedan:
LAN-uttag eller medieomvandlare lokaliseras.
Om hårdvaran levererats till Fastighetsägaren, upphämtning av hårdvaran hos angiven person hos 
Fastighetsägaren.
Inkoppling av hårdvara till Bostadsnät 
Bredband: Inkoppling av en dator/surfplatta för att funktionstesta nätverket
Kom-igång-hjälp för telefoni ex. inkoppling av SIM-kort
Tv: Inkoppling av en (1) tv-box
Kontroll av att bredband, telefoni och Tv fungerar
Boende får endast tillgång till ett (1) tillfälle av installationshjälp.
När ny Boende flyttar in ges möjlighet till ett (1) tillfälle av installationshjälp.

Bilaga: Kravspecifikation
Kravspecifikation (FTTH & FTTB)
Detta dokument beskriver Telias kravspecifikation för byggnation samt installation av FTTH & FTTB nät.
Installation i större byggnadInstallation i mindre byggnad
DEFINITIONER:
Fastighetsnät
Avser kabel på och/eller i en fastighet.
Bostadsnät
Avser kabel i Bostad. Bostadsnätet börjar där Fastighetsnätet avslutas.
Områdesnät
Avser fiberkabel inom en eller mellan flera byggnader (såsom bostadsbyggnad, teknikutrymmen osv.) inom 
samma Fastighet.
Anslutningspunkt
Avser punkten där Telias nät och nät, tillhörande fastigheten, termineras.
Telias utrustning
Avser utrustning som ägs av Telia som t.ex. switch.
Avtalspartens teknikutrymme:
Avser det utrymme där Telia utrustning skall placeras.
GAP
Gruppanslutningspunkt. Fastighets- och områdesnätets centrala punkt. GAP består av stativ, kopplingspaneler 
samt aktiv utrustning.
Teknisk specifikation
1.1 Fastighetsnät (FTTH)
För Fastighetsnät FTTH, och i förekommande fall Områdesnät, ska kabeltypen vara singlemode-
fiber av typ ITU-T G.652C eller D användas och vara utfört enligt Svensk Standard SS-EN 501 73-

Konfidentiellt
${CreatedDate}
 Sidnr
2 (31)
1 med bilagor.
Fibrerna termineras i Nätanslutningspunkt med skarvstycken avsedda för singlemode-
kontakter. Uttagen i Nätanslutningspunkt ska vara märkta med unik lägenhetsidentifikation. I 
Bostaden avslutas fibern i här för avsett fiberuttag. Alla ingående kontakter ska vara av typ 
SC/UPC med max 0,5 dB kontaktdämpning och minst 50 dB reflexionsdämpning. Skarvar på 
fibrerna får dämpa max 0,5 dB.
Förläggning av kabel ska ske med hänsyn tagen till kabelns mekaniska och miljömässiga 
omgivningskrav.
Vid nyttjande av befintligt nät eller när Fastighetsägaren bygger nät ska dokumentation över 
anläggningen finnas. Panelkort, monteringsritningar ska finnas i respektive korskoppling samt 
nätschema fiber och godkänt mätprotokoll för Fastighetsnät och Områdesnät. 
Dokumentationen ska lämnas till Telias kontaktperson innan driftsättning kan ske. 
Fastighetsägaren ansvarar för att anläggningen uppfyller ställda krav.
1.2 Medieomvandlare
Medieomvandlare ska uppfylla kraven för standard 1000 Base-BX10-U (1310 nm TX/1550 nm 
RX;10 km). I det fall Medieomvandlare levereras av annan än Telia förbehåller sig Telia rätten 
att testa den föreslagna Medieomvandlaren. I annat fall kan inte leverans av Telias tjänster 
garanteras. 
1.3 Fastighetsnät (FTTB)
Fastighetsnät FTTB består av koppar in i Bostad respektive Enfamiljshus. 
Fastighetsnät ska ha ett funktionskrav om minst 1000 Mbit/s i enlighet med Svensk Standard 
SSEN50173-1 PL Class D eller E (Cat6). Inmätning i enlighet med SSEN50173-1 PL Class D eller E. 
Fastighetsnätet ska vara installerat med separata anslutningar till varje Bostad och Lokal. Det 
innebär att nätet ska vara stjärnkopplat. Fastighetsnätet ska uppfylla Ethernetstandard IEEE 
802.3.
Installationen av kabel bör ske i Fastighetens befintliga kanalisation.
Kanalisation i nybyggnad bör utföras enl. SIS 437 0145; grundläggande dimensioneringsregler 
för elinstallationer i byggnader.
Dokumentation över anläggningen ska finnas. Panelkort och monteringsritningar ska finnas i 
respektive spridningspunkt.
Fastighetsnätet utgår från RJ45-uttag i kopplingspanelen (som placeras i 19" stativ) och avslutas
med RJ45-uttag i varje Bostad. Uttagen ska vara märkta med unik identifikation.
Mätning av Fastighetsnät koppar ska uppfylla standard EN50173 PL Class D eller E (Cat6).
Om befintligt Fastighetsnät används är minimikravet på kabeltyp minst Cat5e, SS-EN 50173-
1:2018. För testresultat som uppfyller ställda krav ansvarar Fastighetsägaren.
Kabeln för Fastighetsnät ska vara av halogenfritt material och oskärmad. Förläggning av kabel 
ska ske med hänsyn tagen till kabelns mekaniska och miljömässiga omgivningskrav.
1.4 Kabellängd
Fastighetsnätets totala längd per anslutning får ej överstiga 90 meter från 
korskopplingspanelen till uttag i Bostad.

Konfidentiellt
${CreatedDate}
 Sidnr
3 (31)
Beskrivning av en anslutnings totala längd.
1.5 Bostadsnät
Vid befintligt Bostadsnät är minimikravet på kabeltyp minst Cat5e, SS-EN 50173-1:2018. Nya 
Bostadsnät ska vara utförda enligt Svensk Standard, SS-EN 501 73-1 med bilagor.
1.6 Områdesnät
Områdesnätet skall vara draget från Spridningspunkten och vara i form av ett stjärnformat fibernät som 
ansluter andra Fastighetsnät inom samma Fastighet.
Områdesnätet ska installeras med standard singlemode-fiber av typ ITU-T G.652C eller D. Fibrerna termineras i 
varje ända i en Nätanslutningspunkt med skarvstycken avsedda för singlemode-kontakter. Alla ingående 
kontakter skall vara av typ SC/UPC med max 0,5 dB kontaktdämpning och minst 50 dB reflexionsdämpning. 
Nätet ska innehålla minst 8 fiber (=4 par) till respektive teknikutrymme. Skarvar på fibrerna får dämpa max 0,5 
dB. 
1.7 Teknikutrymmen
Teknikutrymmen ska både innehålla Nätanslutningspunkt 
samt kundplacerad Access-switch och ska vara centralt 
lokaliserat i respektive byggnad eller i området. 
Teknikutrymmet ska vara ett låsbart utrymme eller ett 
låsbart skåp för Kundplacerad Utrustning, placerat 
inomhus. Fastighetsägaren ansvarar för att utrymmet är 
låst och otillgängligt för obehöriga. Utrymmet ska dock vara
så åtkomligt att Telia och Telias servicetekniker kan sköta 
drift och underhåll. 
I detta utrymme installeras ett eget 19"-stativ. På detta 
stativ ska Fastighetsnätets kopplingspaneler samt Telias 
utrustning, monteras. Generellt utrymmesbehov för 
19"-stativet är bredd 60 cm, djup 50 cm och höjd minst 
80 cm i ett stativ, beroende på anläggningens storlek. 
Utrymmet ska vara sådant att förhållandet mellan 
temperatur och fuktighet gör att kondens inte uppstår.
Utrymmet ska klara krav enligt ETS 300 019-1 klass 3. 
Driftstemp: +5° till +40°C
Luftfuktighet: 5% till 85%
Bakom stativet ska det alltid finnas minst ett jordat uttag per planerad switch, utöver detta, ska
minst ett jordat dubbeluttag finnas för service.
Nätanslutningen ska vara 230-240 VAC, 50 Hz och ska avslutas på egen säkringsgrupp, 10 A. 
Eventuella jordfelsbrytare ska inte omfatta dessa uttag. Dessa ska endast användas av Telias 
utrustning. Stativet kan vara jordat. Placeras stativet i skåp ska utrymmet mellan stativfront 
och dörr vara minst 10 cm.
1.8 Kundplacerad utrustning
Kundplacerad utrustning ska placeras i Fastighetsägarens 19"-stativ/skåp där Fastighetsägaren 
ska lämna plats för utrustningen.
Access-switch samt inkommande fiberkabel (avslutas i Nätanslutningspunkt) och alla ingående 
patchkablar ingår i Telias åtagande.
1.9 Grävning och byggande av kanalisation i mark
Kanalisation skall förläggas enligt följande specifikation. För ytterligare information hänvisas 
till: (Anläggnings AMA 98), AMA anläggning 07.
Beskrivning av 19"-stativ 
med kopplingspaneler 
och aktiv utrustning.

Konfidentiellt
${CreatedDate}
 Sidnr
4 (31)
Avtalsparten ansvarar för att förläggning sker på ett riktigt sätt. Vid intag över mark ansvarar 
avtalsparten för att Telias Kabel skyddas från åverkan på lämpligt sätt.
Ledningsgrav med kanalisationsrör.
Ledningsbädden skall vara 10 cm tjock, jämn och utföras med finkornigt, kompakterat materiel 
med max 8 mm diameter. Kringfyllningen görs till 10 cm ovanför kanalisationsröret och med 
samma materielkrav som ledningsbädden. Kompakteras. Markeringsnät läggs ovanpå 
kringfyllningen. Det skyddar kanalisationsröret och den inbyggda söktråden är till hjälp vid en 
kabelutsättning i samband med markarbeten. Resterande fyllning görs enligt markägarens 
önskemål.
Fyllningshöjd är avståndet mellan det översta kanalisationsröret och markytan. Följande 
avstånd gäller:
Körbana: min 0,55 m
Trottoar, cykelbana, parkmark o liknande: min 0,35 m 
Brukad mark (åker och skog): min 0,75 m fyllningshöjd
I övrig mark: min 0,65 m 
1.10 Kabelväg på Fastighet
Fastighetsägaren ansvarar för att kabelvägar finns tillgängliga mellan tomtgräns och Intag. 
Kabelvägen ska förläggas med rör med minst 21 mm innerdiameter samt förses med dragtråd.
1.11 Anslutning av Bostad och Lokal 
Anslutning sker mellan Telias och Fastighetsnätets kopplingspaneler. Denna anslutning sker 
genom att en patchkabel monteras i uttag på Telias utrustning till uttag för aktuell Bostad eller 
Lokal.
1.12 Dokumentation
Vid nybyggnation av fastighetsnät skall dessa dokumenteras i enlighet med Svensk Standard 
SS4551201 senaste utgåva. 
Redan etablerade fastighetsnät skall finnas dokumenterade i enlighet med SEK HB 455-2006

Bilaga: Service
Serviceansvar (FTTH & FTTB) 
Detta dokument beskriver Telias respektive Fastighetsägarens Serviceansvar för det fall Parterna ingått avtal.
Servicebeskrivning
Ägande och Serviceansvar FTTH-nät
Eventuellt Områdesnät ägs av Fastighetsägaren, som har Serviceansvar för detta.
Fastighetsnätet ägs av Fastighetsägaren, som har Serviceansvar för detta.  
Medieomvandlare vid respektive Slutkunds Överlämningspunkt ägs av Telia. Telia har Serviceansvar för 
Medieomvandlare, vilket innebär att Telia ersätter Medieomvandlare som är behäftad med Fel efter 
Felanmälan från Boende eller Fastighetsägare. Vid yttre åverkan på Medieomvandlare fakturerar Telia 
Fastighetsägaren för byte av Medieomvandlare enligt gällande prislista. Detta under förutsättning att 
Medieomvandlaren inte omfattas av leveransgaranti enligt Bilaga: Installation.
Eventuell Bredbandsswitch ägs av Telia som även har Serviceansvar för denna. Endast Telia har rätt att 
managera Bredbandsswitch, vilket innebär att endast Telia har rätt att logga in i denna, eller på annat sätt 
påverka dess konfiguration.
Tjänstespecifik hårdvara regleras avseende ägande och Serviceansvar beroende av kollektivt eller 
individuellt avtal med Telia. I kollektiva avtal äger Fastighetsägaren alternativt Telia tv-boxen, Telia har 
Serviceansvar under avtalstid. För individuella avtal gäller ägande och serviceansvar enligt avtal mellan 
Slutkund och Telia. Eventuell router som levererats av Halebop ingår inte i Telias eller Halebops 
serviceansvar utan hänvisas till produktleverantören.
I de fall Tjänstespecifik hårdvara tillhandahålls från Telia ansvarar Fastighetsägaren för att det finns en 
lämplig yta att placera denna på i respektive Bostad/Lokal. För de fall teknikskåp har byggts ansvarar 
Fastighetsägaren för att detta är byggt i ett material som exempelvis wifi-signal kan ta sig igenom, och inte
till exempel i metall.
Access-switchFastighetsnätMediaomvandlare
Eventuell
Bredbandsswitch
Bostadsnät
Utrustning efter 
Överlämningspunkt
Placering
Nätanslutnings-
punkt
I Fastighet
Överlämnings-
punkt
Överlämnings-
punkt
BostadBostad
ÄgareTeliaFastighetsägareTeliaTeliaFastighetsägare
Telia, Fastighetsägare, 
Slutkund
Ansvar 
utförande 
serviceåtgärd
TeliaFastighetsägareTeliaTeliaFastighetsägareTelia, Slutkund
Ansvar 
betalning 
serviceåtgärd
TeliaFastighetsägareFastighetsägareTeliaFastighetsägare
Telia, Slutkund, 
Fastighetsägare
Access-switchFastighetsnätMediaomvandlare
Eventuell
Bredbandsswitch
Bostadsnät
Utrustning efter
Överlämningspunkt
Ägande och Serviceansvar FTTB-nät
Eventuellt Områdesnät ägs av Fastighetsägaren, som har Serviceansvar för detta.
Fastighetsnätet ägs av Fastighetsägaren, som har Serviceansvar för detta.  
RJ45-uttag vid respektive Slutkunds Överlämningspunkt ägs av Fastighetsägaren. Telia har Serviceansvar 
för RJ45-uttag, vilket innebär att Telia ersätter RJ45-uttag som är behäftad med Fel efter Felanmälan från 
Boende eller Fastighetsägare. I dessa fall fakturerar Telia Fastighetsägaren för felavhjälpning av RJ45-
uttag, 700 kr exklusive moms per RJ45-uttag. Detta under förutsättning att RJ45-uttag inte omfattas av 
T.ex. tv-box

Konfidentiellt
${CreatedDate}
 Sidnr
2 (31)
leveransgaranti enligt Bilaga: Installation.
Eventuell Bredbandsswitch ägs av Telia som även har Serviceansvar för denna. Endast Telia har rätt att 
managera Bredbandsswitch, vilket innebär att endast Telia har rätt att logga in i denna, eller på annat sätt 
påverka dess konfiguration.
Tjänstespecifik hårdvara regleras avseende ägande och Serviceansvar beroende av kollektivt eller 
individuellt avtal med Telia. I kollektiva avtal äger Fastighetsägaren alternativt Telia tv-boxen, Telia har 
Serviceansvar under avtalstid. För individuella avtal gäller ägande och serviceansvar enligt avtal mellan 
Slutkund och Telia. Eventuell router som levererats av Halebop ingår inte i Telias eller Halebops 
serviceansvar utan hänvisas till produktleverantören.
I de fall Tjänstespecifik hårdvara tillhandahålls från Telia ansvarar Fastighetsägaren för att det finns en 
lämplig yta att placera denna på i respektive Bostad/Lokal. För de fall teknikskåp har byggts ansvarar 
Fastighetsägaren för att detta är byggt i ett material som exempelvis wifi-signal kan ta sig igenom, och inte
till exempel i metall.
Access-switchFastighetsnätRJ45-uttag
Eventuell
Bredbandsswitch
Bostadsnät
Utrustning efter 
Överlämningspunkt
Placering
Nätanslutnings-
punkt
I Fastighet
Överlämnings-
punkt
Överlämnings-
punkt
BostadBostad
ÄgareTeliaFastighetsägareFastighetsägareTeliaFastighetsägare
Telia, Fastighetsägare, 
Slutkund
Ansvar 
utförande 
serviceåtgärd
TeliaFastighetsägareTeliaTeliaFastighetsägareTelia, Slutkund
Ansvar 
betalning 
serviceåtgärd
TeliaFastighetsägareFastighetsägareTeliaFastighetsägare
Telia, Slutkund, 
Fastighetsägare
Access-switchFastighetsnätRJ45-uttag
Eventuell
Bredbandsswitch
Bostadsnät
Utrustning efter
Överlämningspunkt
Schematisk beskrivning av ägande och serviceansvar för kablage och utrustning placerad hos avtalspart 
respektive Slutkund. 
Felavhjälpning vid Fel som drabbar enskild Slutkund
1.Slutkunden felanmäler:
oTv till Telias privatkundtjänst.
oBredband till Halebops kundtjänst. 
2.I förekommande fall informerar Telia/Halebop om kända driftstörningar.
3.Telia/Halebop felsöker och åtgärdar vid behov sin tjänsteplattform, samt kontrollerar att Slutkundens 
inkoppling till tjänsten är korrekt och att Felet inte finns i Slutkundens egen utrustning eller handhavande av
tjänsten. 
4.I de fall Felet inte kan avhjälpas fjärrmässigt bokar Telias servicetekniker tid med Slutkund och i vissa fall 
även med Fastighetsägarens tekniske kontaktperson. Telias servicetekniker genomför en felanalys och 
åtgärdar eventuella Fel som ligger inom Telias Serviceansvar, dvs. Fel i Access-switch eller 
Medieomvandlare.
5.Om Telias serviceteknikers felanalys visar att Felet ligger inom Fastighetsägarens Serviceansvar, exempelvis 
i Fastighetsnät, överlämnar Telia felärendet till Fastighetsägaren för åtgärd.
I nedanstående tabell framgår Servicetid och Maximal åtgärdstid för de fall privat- respektive företagskunder är
drabbade av Fel. Servicetid och Maximal åtgärdstid räknas fr.o.m. den tidpunkt då Felet anmälts till av Telia 
angiven kontaktpunkt.
Telias felavhjälpning vid enskild 
kundfelanmälan
ServicetidMaximal åtgärdstid
Fel som berör privatkund
Helgfri mån-fre 
07.30-18.00
24 timmar inom ramen för 
servicetid
T.ex. tv-box

Konfidentiellt
${CreatedDate}
 Sidnr
3 (31)
Fel som berör företagskund
Helgfri mån-fre 
07.30-18.00
12 timmar inom ramen för 
servicetid
Felanmälansingång för Fastighetsägaren
Fel som berör minst tre Slutkunder på samma tjänst kan felanmälas av Fastighetsägaren till Telias 
Fastighetsägaringång på telefon 020-30 00 60, val 2. Vid Avtalets tecknande har Fastighetsägaringången 
följande öppettider.
Fastighetsägaringångens öppettider
Vardagar08.00-16.00
Aktiv nätövervakning
Telia har en aktiv övervakning av hela sitt bredbandsnät, dygnet runt, årets alla dagar. Övervakningen omfattar 
Access-switchar samt all övrig utrustning i Telias Nät. Telia tar hand om larm från nätet och genomför 
fjärrmässig analys och om möjligt fjärrmässig felavhjälpning. 
I de fall det krävs åtgärd av tekniker i fält har Telia tillgång till en rikstäckande organisation av tekniker som 
hanterar alla förekommande felsituationer. Vid större felsituationer arbetar dessa dygnet runt, med stöd av 
Telias expertis. 
I de fall reservdelar krävs har Telia avtal med logistikpartners som distribuerar reservdelar över hela landet. 
Telias hantering av nätfel
1.Telias utrustning larmar om samtliga Slutkunder anslutna till en Access-switch drabbas av Fel, dvs ett Nätfel 
uppstår. Detta gör det möjligt för Telia att ge sina Slutkunder information om ett pågående Nätfel, t.ex. när 
Felet beräknas vara åtgärdat. 
2.I de fall Telias analys visar att Nätfelet endast berör Access-switch kontaktas Fastighetsägarens tekniske 
kontaktperson för att verifiera om strömförsörjningen fungerar, eller om det finns andra omständigheter 
som förorsakat Nätfelet. Om så inte är fallet, och felet inte kan felavhjälpas fjärrmässigt, skickar Telia en 
tekniker för att felsöka.  
3.Prioritering av felavhjälpning av Nätfel som inte går att åtgärda fjärrmässigt är beroende av antal drabbade 
Slutkunder: fler drabbade Slutkunder medför högre prioritet. Maximal åtgärdstid för Nätfel är 24 timmar för
privatkund respektive 12 timmar för företagskund inom ramen för Servicetid – se tabell ovan.
Planerade arbeten i Telias Nät
Telia arbetar kontinuerligt för att säkerställa hög kvalitet, säkerhet och rätt funktionalitet i Telias Nät. Detta 
innebär att det ibland krävs arbeten i nätet som stör Boendes användning av Bredbandstjänsterna, till exempel 
i samband med mjukvaruuppgraderingar eller kapacitetsutökningar. Arbeten i Telias Nät som innebär att 
Boendes användning av Bredbandstjänsterna störs, utförs så långt det är möjligt i Servicefönster, måndagar kl. 
00.00-04.00. 
Fastighetsägarens ansvar
För att Telia ska kunna garantera service- och åtgärdstider krävs att Fastighetsägaren fullgör sitt ansvar enligt 
nedan. Fastighetsägaren ansvarar för att:
Telia har tillgång till aktuella kontaktuppgifter till person som kan ge Telia tillträde till nödvändiga 
fastighetsutrymmen vid serviceåtgärder. Ändring av kontaktuppgifter ska utan dröjsmål anmälas av 
Fastighetsägaren till Telias ingång för Fastighetsägare på telefon 020-30 00 60, val 1.
Inom 60 minuter från den tidpunkt då Telia kontaktat Fastighetsägaren ska Telias servicepersonal beredas 
tillträde till nödvändiga lokaler inom Fastigheten i samband med serviceåtgärder. Detta gäller alla dagar 
kl. 07.30-24.00. Behov av tillträde till utrymmen under andra tidpunkter än servicetider angivna i 
ovanstående avsnitt ”Felavhjälpning vid Fel som drabbar enskild Slutkund” gäller i huvudsak Nätfel.

Konfidentiellt
${CreatedDate}
 Sidnr
4 (31)
Utföra kontroll av strömförsörjning av Access-switch inom 60 minuter efter Telias anmodan vid Nätfel som
misstänks bero på problem med strömförsörjning av Access-switch då Fastighetsägaren ansvarar för 
denna strömförsörjning. Fastighetsägaren ska omgående informera Telia om resultatet av kontrollen, 
samt omedelbart agera för att avhjälpa identifierade problem. Detta gäller alla dagar kl. 07.30-22.00.
Informera Telia i god tid och senast 5 arbetsdagar innan arbete ska påbörjas som innebär att avbrott i 
Bredbandstjänst för anslutna Slutkunder planeras, t.ex. avbrott i strömförsörjning. Datum för avbrottet, 
starttid, sluttid, adress samt kontaktperson mailas till controlcenter.cm@teliacompany.com.
Åtgärda Fel inom Fastighetsägarens ansvar som drabbar enskild Slutkund inom 24 timmars Maximal 
åtgärdstid mätt under Servicetid helgfri må-fre kl. 07.30-18.00 då Fel berör privatkund. I det fall Fel berör 
företagskund är Maximal åtgärdstid 12 timmar mätt under Servicetid 07.30-18.00 helgfri må-fre. Till 
denna kategori av fel hör bland annat Fel i Fastighetsnät orsakat av åverkan.
Åtgärda Fel inom Fastighetsägarens ansvarsområde som medför att samtliga kunder anslutna till Access-
switch är drabbade av Fel med 8 timmars Maximal åtgärdstid mätt under servicetid 07.30-22.00 alla 
dagar. Till denna kategori av Fel hör bland annat Fel i Områdesnät samt fel i strömförsörjning av Access-
switch som kan åtgärdas av Fastighetsägaren. 
Fastighetsnät, teknikutrymme m.m. uppfyller krav enligt Bilaga: Kravspecifikation. 
Telias utrustning i Nätanslutningspunkten är skyddad från allmänheten, vilket även innefattar att 
utrustning ej ska vara åtkomlig för Boende. Detsamma gäller även kopplingspunkter i Fastighetsnät och 
Områdesnät. 
I de fall Telia inte kunnat uppfylla sitt Serviceansvar inom Maximal Åtgärdstid pga. att Fastighetsägaren 
underlåtit att fullgöra sina skyldigheter enligt Avtalet har Telia rätt till ersättning från Fastighetsägaren för 
direkt och indirekt skada, exempelvis i form av berättigade ersättningsanspråk från Slutkunder.

Konfidentiellt
${CreatedDate}
 Sidnr
5 (31)
Bilaga: Allmänna villkor 
Telias Integritetspolicy
Den personliga integriteten hos våra kunder är viktig för oss på Telia. I Telias integritetspolicy på www.telia.se finns mer 
information om vilka personuppgifter Telia behandlar, typ av behandling, ändamålet och den rättsliga grunden för behandlingen, 
uppgifternas lagringstid samt individens rätt till bl.a. information, rättelse, radering och rätten att göra invändningar. 
1Inledning
1.1Dessa allmänna villkor gäller då Telia till en 
Fastighetsägare möjliggör anslutning av 
Fastighetsnät för Bostäder/Lokaler till Telias Nät. 
Efter överenskommelse kan Telia även 
tillhandahålla andra tjänster, såsom installation av 
Fastighetsnät, service av Fastighetsnät, Telias 
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
1.3Boende/Företag som får möjlighet att tillgå tv-tjänst
kollektivt från Telia genom Fastighetsägaren måste
aktivera tv-tjänsten för att ta del av den. Tv-tjänsten
aktiveras genom att Boenden/Företaget kontaktar 
Telia och uppger namn, adress och eventuell e-
postadress. Genom att aktivera tv-tjänsten ingår 
Boenden/Företaget särskilt avtal med Telia om tv-
tjänsten.
2Telias åtaganden
2.1Telia ska tillhandahålla aktuella tjänster på ett 
fackmässigt sätt i överensstämmelse med Avtalet.
2.2Telia har rätt att anlita underleverantörer för att 
fullgöra sina åtaganden enligt Avtalet. Telia svarar i
så fall för underleverantörens arbete såsom för 
eget arbete
2.3Vid anslutning till Telias Nät av Fastighetsnät i 
befintlig bebyggelse ska anslutningen ske vid den 
tidpunkt som skriftligen överenskommits mellan 
Parterna. Telia ansvarar för leverans av kabel fram
till Nätanslutningspunkten.
2.4Vid fel i markförlagd kabel fram till 
Nätanslutningspunkten ansvarar Telia för 
schaktning, felrättning och återfyllnad under 
förutsättning att felet inte har förorsakats av 
Fastighetsägaren, någon som Fastighetsägaren 
svarar för, Boende, Företag eller besökare till 
Boenden eller Företaget. Innan grävning påbörjas 
inom Fastighet kontaktas Fastighetsägaren för 
samråd om det praktiska utförandet. 
2.5Om Telias Bredbandstjänst tillhandahålls till 
Boende eller Företag kollektivt via 
Fastighetsägaren har Telia rätt att stänga eller 
begränsa Bredbandstjänsten för en eller flera 
Boenden eller Företag i den utsträckning som 
anges i Telias allmänna villkor för elektroniska 
kommunikationstjänster till företag samt Telias 
allmänna villkor för tjänster till konsument vid 
motsvarande förhållanden som där anges, oavsett 
om detta har sin grund i handlande eller 
underlåtenhet från Fastighetsägarens eller från 
Boendens/Företagets sida.
3Fastighetsägarens åtaganden
3.1Fastighetsägaren ska på egen bekostnad bereda 
Telia tillträde till Fastigheten. Med avseende på 
byggnation, installation och/eller anslutning av 
Fastighetsnät ska Telia ges tillträde skyndsamt och
utan vidare dröjsmål. Med avseende på service 
ska Telia ges tillträde i enlighet med vad som 
framgår av Avtalet. Telia ska beredas fri 
framkomlighet där arbeten ska utföras. Flytt av 
möbler och liknande omfattas inte av Telias 
åtaganden. Fastighetsägaren ska vidare förse 
Telia med lista över kontaktpersoner avseende 
tillträde till Fastigheten.
3.2Fastighetsägaren ansvarar för att eventuellt 
bygglov och andra myndighetstillstånd som avser 
Fastigheten i förekommande fall införskaffas för 
anläggning av det som ska installeras. 
Motsvarande gäller om Fastighetsnät ägs av annan
än Fastighetsägaren och Telia behöver tillstånd 
från ägaren av nätet för att 
kunna utföra sina åtaganden enligt Avtalet. 
Fastighetsägaren ska bereda Telia nödvändigt 
bistånd och står för kostnaden nämnda sådant 
tillstånd. Om tillstånd inte medges, har Telia rätt att
med omedelbar verkan frånträda Avtalet.
3.3Fastighetsägaren ansvarar för att Fastighetsnätet 
uppfyller de krav som anges i bilaga: 
Kravspecifikation liksom i Avtalet i övrigt för att 
anslutning ska kunna ske, t.ex. att teknikutrymmen,
eluttag, kanalisation mellan Nätanslutningspunkt 
och i förekommande fall Fastighetsnät, är etablerat
innan anslutning påbörjas. Fastighetsägaren 
ansvarar för att nödvändig kanalisation förläggs på 
riktigt sätt. Vid Intag ovan mark ansvarar 
Fastighetsägaren för att kabeln skyddas från 
åverkan. För Fastighetsnät som ska användas för 
tillhandahållande av Kabel-tv ansvarar 
Fastighetsägaren särskilt för att Fastighetsnätet 
uppfyller den standard som anges i Avtalet. 
3.4Fastighetsägaren ansvarar för drift och underhåll 
av Fastighetsnät och att sådant nät kontinuerligt 
uppfyller de krav som anges i Avtalet. 
Fastighetsägaren ansvarar för att utan oskäligt 
dröjsmål avhjälpa fel i Fastighetsnät. Om Parterna 
har avtalat att Telia ska tillhandahålla service av 
Fastighetsnät m.m. ska härutöver avsnitt 4 
tillämpas.
3.5Fastighetsägaren ansvarar för att el finns 
framdragen till Kundplacerad Utrustning senast 
den dag Parterna avtalat att installation av 
Fastighetsnät ska vara färdigställd. Om så inte 
sker, har Telia rätt att själv eller genom 
underleverantör företa sådan framdragning av el 
på Fastighetsägarens bekostnad. 
Fastighetsägaren ansvarar vidare för den 
strömförbrukning som är nödvändig för driften av 
Kundplacerad Utrustning.
3.6Fastighetsägaren står risken för skada på eller 
förlust av Kundplacerad Utrustning från den 
tidpunkt då den Kundplacerade Utrustningen 
installerats. Kundplacerad Utrustning får inte utan 
Telias skriftliga medgivande flyttas från den plats 

Konfidentiellt
${CreatedDate}
 Sidnr
6 (31)
där den installerats.
3.7Fastighetsägaren får inte utan Telias skriftliga 
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
3.8Fastighetsägaren ska vidta alla rimliga åtgärder för 
att säkerställa att inte Boende/Företag eller annan 
vidtar åtgärder som medför störningar för 
Fastighetsnätet och Kundplacerad Utrustning. 
Fastighetsägaren svarar även för att utan oskäligt 
dröjsmål stoppa sådana störningar.
4Installation av Fastighetsnät
4.1Om Parterna överenskommit att Avtalet ska omfatta 
även installation av Fastighetsnät, gäller punkterna 
4.2 – 4.5 nedan. Installation av Fastighetsnät 
omfattar anläggande av kabel och i förekommande 
fall kanalisation, inklusive nödvändiga anslutningar 
och uttag i byggnad på det sätt som anges i Avtalet.
4.2Telia kallar Fastighetsägaren till ett startmöte i 
syfte att gå igenom installationsprocessen och 
andra relevanta frågor. Respektive Part ska utse 
var sin kontaktman för att ansvara och hantera 
löpande frågor rörande installationen. Vardera 
Parten ska bära sina respektive kostnader för 
startmötet. På startmötet ska Parterna 
överenskomma om detaljerad tidplan och former 
för arbetets utförande.
4.3I god tid innan installationen påbörjas och senast 
vid startmötet ska Fastighetsägaren förse Telia 
med fastighetsbeskrivning, ritningar över 
Fastigheten och berörda byggnader utvisande 
nödvändig information för anslutning och 
installation. Fastighetsägaren ansvarar för att 
sådan information är korrekt och fullständig.
4.4Installation och/eller anslutning av Fastighetsnät i 
såväl nybyggnation av byggnad som i befintlig 
bebyggelse ska ske vid den tidpunkt som 
skriftligen överenskommits mellan Parterna.
4.5Fastighetsägaren ansvarar för kanalisation från 
tomtgränsen fram till Nätanslutningspunkten.
5Ersättning
5.1Fastighetsägaren ska betala i Avtalet 
överenskommen ersättning. Samtliga priser är 
exklusive mervärdesskatt. Fakturaavgift tillkommer 
för pappersfaktura.
5.2Fastighetsägaren ska betala faktura inom trettio (30)
dagar från fakturadatum i enlighet med anvisningar 
angivna på fakturan. Vid förskottsbetalning enligt 
punkt 5.5 ska betalning ske senast den dag Telia 
anger.
5.3Debitering av i Avtalet ingående tjänster påbörjas vid
tidpunkt som Parterna överenskommit i Avtalet eller 
annars på avtalad leveransdag eller, om leveransen 
är försenad av orsak enbart hänförlig till Telia, från 
den dag då leverans faktiskt sker.
5.4Om Fastighetsägaren inte fullgjort betalningen 
senast på förfallodagen har Telia rätt till ersättning 
för betalningspåminnelser och inkassokostnader 
samt till dröjsmålsränta enligt lag. Om 
Fastighetsägaren, trots påminnelse och stängning 
av Tjänsten inte betalar förfallen faktura, ska övrig 
ersättning för Tjänsten som ännu inte har fakturerats
anses förfallen till omedelbar betalning.
5.5Telia har rätt att under avtalstiden begära 
förskottsbetalning eller att Fastighetsägaren ställer 
säkerhet för Avtalets rätta fullgörande om det till följd
av kreditprövning framstår som befogat. Ränta utgår 
inte på förskotterat belopp. Telia har vidare rätt att ur
förskotterat belopp eller ställd säkerhet tillgodogöra 
sig belopp motsvarande sina förfallna fordringar, 
inklusive sådana kostnader som avses i punkt 5.4.
5.6Telia har rätt att överlåta sin rätt till betalning enligt 
Avtalet till annan.
5.7Bestämmelserna i detta avsnitt 5 ska äga 
motsvarande tillämpning för det fall 
Fastighetsägaren inom ramen för avtalet 
tillhandahåller tjänster till Telia.
6Äganderätt och nyttjanderätt
6.1Om inte annat anges ska Fastighetsägaren inneha 
äganderätten till Fastighetsnätet och tillhörande 
Kanalisation.
6.2Telias Nät ägs eller disponeras av bolag inom Telia-
koncernen fram till och med Nätanslutningspunkten. 
Nätanslutningspunkten kan vara placerad vid 
fastighetsgränsen eller inne på Fastigheten. Om 
Nätanslutningspunkten är placerad inne på 
Fastigheten åtar sig Fastighetsägaren att på 
begäran av sådant Telia bolag teckna ett särskilt 
upplåtelseavtal i enlighet med särskild bilaga 
avseende rätt för bolaget att anlägga och bibehålla 
nät fram till och med Nätanslutningspunkten på 
Fastigheten samt i förekommande fall på gator, 
enskilt ägda fastigheter, etc. inom det område som 
omfattas av Avtalet.
6.3Kundplacerad Utrustning, t.ex. Telias Access-switch,
ägs av Telia som svarar för drift och underhåll av 
denna utrustning. Ägande och ansvar för annan 
utrustning som Telia installerat i Bostad/Lokal 
framgår av Avtalet. Telia förbehåller sig rätten att 
utföra konfigurationsändringar, uppgraderingar samt 
i övrigt disponera den Kundplacerade Utrustningen 
för utveckling av tjänster under den tid som 
utrustningen är ansluten mot Bredbandstjänst. 
Under omständighet att den Kundplacerade 
Utrustningen inte ägs av Telia, förbehåller sig Telia 
likväl rätten att utföra konfigurationsändringar, 
uppgraderingar samt i övrigt disponera sådan 
utrustning för utveckling av tjänster under den tid 
som utrustningen är ansluten mot Bredbandstjänst.
6.4Fastighetsägaren ger Telia rätt att i den omfattning 
som behövs bygga ut Telias Nät inom Fastigheten 
fram till Nätanslutningspunkten.
6.5Fastighetsägaren ger Telia rätt att under avtalstiden 
utan ersättning nyttja Fastighetens Teknikutrymme 
inklusive elektricitet, värme och kyla.
6.6Avtalet innebär inte att äganderätten till 
Kundplacerad Utrustning övergår till 
Fastighetsägaren och Fastighetsägaren får inte 
sälja, pantsätta, hyra eller låna ut eller på annat sätt 
förfoga över sådan utrustning utan att Telia först 
lämnat skriftligt medgivande därtill.
6.7Fastighetsägaren ska under avtalstiden tillförsäkra 
Telia en exklusiv nyttjanderätt till Fastighetsnätet och
Kanalisationen för tillhandahållande av 
Bredbandstjänster.

Konfidentiellt
${CreatedDate}
 Sidnr
7 (31)
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
nyttjanderätter och andra rättigheter som upplåts till 
Telia eller annat Telia bolag enligt Avtalet, så att 
Avtalet gäller mot förvärvare av Fastigheten. 
Fastighetsägaren ska vid överlåtelse av Fastigheten 
överlåta sina rättigheter och skyldigheter enligt 
Avtalet till förvärvare av Fastigheten.
7.3Vad som sägs i punkt 7.2 ska gälla även vid annan 
fastighetsrättslig reglering eller vid överlåtelse av 
Fastighetsnätet eller del därav.
8Förtida upphörande
8.1Vardera Parten får säga upp Avtalet med omedelbar
verkan om: 
a)den andra Parten inleder 
likvidationsförhandlingar, inger ansökan om
företagsrekonstruktion, inleder ackord, 
försätts i konkurs eller eljest kan antas vara
på obestånd, eller;
b)den andra Parten har gjort sig skyldig till 
väsentligt avtalsbrott som inte åtgärdats 
inom tio (10) arbetsdagar efter skriftlig 
begäran.
8.2Uppsägning enligt punkt 8.1 ska ske skriftligen.
8.3Definitionerna i Avtalets Bilaga samt 
bestämmelserna i dessa Allmänna villkor punkterna 
3.4 - 3.6, 7.1 – 7.3, 9.1 – 9.4, 10.1 - 10.3, 11.1 – 11.3
samt 13.1 – 13.3 ska äga fortsatt giltighet även efter 
Avtalets upphörande till dess Telias avtal med 
Boende/Företaget om Bredbandstjänst upphört att 
gälla.
9Skadestånd
9.1Part har rätt till ersättning för direkt skada som 
motparten, eller någon för vilken motparten svarar, 
förorsakat genom vårdslöshet. Part har inte någon 
rätt till ersättning för indirekta skador, såsom 
utebliven handelsvinst, kostnader som blivit onyttiga 
eller andra följdskador. Parts ansvar är vidare för 
varje skadetillfälle begränsat till ett sammanlagt 
belopp motsvarande trettiofem (35) prisbasbelopp 
enligt lagen (1962:381) om allmän försäkring, om 
inte annat anges i Avtalet.
9.2Oaktat vad som föreskrivs i punkt 9.1 ovan ansvarar 
Telia inte för skada som uppkommer för 
Fastighetsägaren till följd av innehåll i data eller 
annan information som förmedlas vid användning av 
tjänster enligt Avtalet, inte heller ansvarar Telia för 
skada orsakad av datavirus eller motsvarande, 
försening, förvanskning eller förlust av data eller för 
Fastighetsägaren eventuella ersättningsskyldighet 
gentemot tredje man.
9.3Begränsningarna av Parts skadeståndsskyldighet 
gäller inte i fall av uppsåt eller grov vårdslöshet, vid 
personskada eller vid sådant ansvar som följer av 
tvingande lag. Begränsningarna av Parts 
skadeståndsskyldighet gäller vidare inte vid skada 
som uppkommit till följd av att Fastighetsägaren 
brutit mot punkt 7.2 eller 7.3.
9.4Begäran om skadestånd skall, för att kunna göras 
gällande, framställas skriftligen senast två (2) 
månader efter det att felet, förseningen eller skadan 
upptäckts eller bort upptäckas.
10Force majeure
10.1Part är befriad från skyldighet att ersätta skada eller 
att fullgöra viss förpliktelse enligt Avtalet, om skadan 
eller underlåtenheten har sin grund i omständighet 
utanför Parts kontroll, av det slag som anges nedan 
("Befriande Omständighet") och omständigheten 
förhindrar, avsevärt försvårar eller försenar 
fullgörande av sådan förpliktelse. Detsamma gäller 
om underlåtenheten har sin grund i försenade 
leveranser från Parts underleverantör som orsakats 
av Befriande Omständighet.
10.2Såsom Befriande Omständighet ska anses bland 
annat myndighets åtgärd eller underlåtenhet, 
nytillkommen eller ändrad lagstiftning, arbetskonflikt, 
blockad, krig, upplopp, sabotage, extrema 
väderförhållanden, blixtnedslag, brand, explosion, 
översvämning, naturkatastrof, olyckshändelse eller 
kabelbrott som orsakats av tredje man.
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
11.2Bestämmelserna i punkt 11.1 innebär inte hinder för 
Part att lämna ut Konfidentiell Information när sådant
erfordras på grund av bestämmelse i lag eller på 
grund av domstols eller myndighets beslut.
11.3Telia får lämna ut Konfidentiell Information till annat 
bolag inom Teliakoncernen. Därutöver får den Part 
som mottar Konfidentiell Information lämna ut 
informationen endast till sådana anställda, 
styrelseledamöter, konsulter och underleverantörer 
som behöver tillgång till informationen för att Avtalet 
ska kunna fullföljas. Mottagande Part ansvarar för att
sådana personer före sådant utlämnande är 
medvetna om och följer bestämmelserna i Avtalet.

Konfidentiellt
${CreatedDate}
 Sidnr
8 (31)
12Övrigt
12.1Ändringar av eller tillägg till Avtalet ska för att vara 
bindande vara skriftligen avfattade och 
undertecknade av Parterna.
12.2Avtalet utgör Parternas fullständiga reglering av alla 
frågor som Avtalet berör. Alla skriftliga eller muntliga 
överenskommelser, åtaganden eller utfästelser som 
föregått Avtalet ska ersättas av innehållet i Avtalet.
12.3I Avtalet angivna priser och överenskomna 
leveranstider förutsätter att dels de faktiska 
omständigheterna rörande Fastigheten 
överensstämmer med vad Fastighetsägaren uppgivit
senast i samband med Avtalets ingående, dels att 
installations- och anslutningsarbetena inte i övrigt 
stöter på hinder som inte skäligen kunde förutses av 
Telia vid Avtalets ingående. I annat fall har Telia rätt 
till ersättning från Fastighetsägaren för eventuella 
tillkommande kostnader.
12.4Telia utvecklar fortlöpande sina tjänster och tekniska
plattformar. Telia äger rätt att ändra eller modifiera 
tjänsterna som levereras under detta Avtal, inklusive
tekniska plattformar, under förutsättning att 
tjänsternas prestanda eller funktionalitet därmed inte
försämras. Sådan ändring eller modifiering ska 
utföras på ett sådant sätt att eventuella störningar 
begränsas.
13Tillämplig lag och tvist
13.1Parternas rättigheter och skyldigheter vid tolkning 
och tillämpning av Avtalet ska bestämmas i enlighet 
med svensk lag.
13.2Tvist i anledning av Avtalet ska slutligt avgöras i 
Stockholm genom skiljedom vid Stockholms 
Handelskammares Skiljedomsinstitut (”Institutet”).

Konfidentiellt
${CreatedDate}
 Sidnr
9 (31)
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
(100 000) EUR.`;
  await utilityFunctionLocal.VerifyContractPDFDocumentContent(page, expectedText);

  //Close all browserss
  await context.close();
});



