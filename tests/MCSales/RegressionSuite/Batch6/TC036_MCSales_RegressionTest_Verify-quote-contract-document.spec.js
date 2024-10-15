const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const TestCaseName = 'TC036_MCSales_RegressionTest';


test('TC036_MCSales_RegressionTest_SOHO_NewSales-Verify-quote-contract-document', async function ({ browser }) {

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
var expectedText = `Offert



DoNotUse_PlaywrightTestAccount 55239

Offertdatum: ${CreatedDate}

Offerten är giltig i 30 dagar från offertdatum.

Offertnummer: ${QuoteNumber}



















DoNotUse_PlaywrightTestAccount 55239

Telia Sverige AB

5599927976

556430 - 0142

Säte: Stockholm

Adress: 169 94 Solna

Test Yogesh Jadhav

Soho Ds SalesRep

yogesh.jadhav@teliacompany.com

dhanashri.ronge@teliacompany.com



+91 9505225143



Varför Telia?

Telia har kopplat upp Sverige sedan 1853 och vårt engagemang sträcker sig bortom bara mobilabonnemang. Vi är dedikerade till att bygga upp ett hållbart och digitaliserat Sverige. Välkommen att lära känna oss närmare!

Telia är en partner att växa med – vi är Sveriges främsta operatör med ett prisbelönt nätverk och en omfattande infrastruktur som täcker hela landet. Vi är en pålitlig och erfaren partner inom digitalisering för näringslivet, den offentliga sektorn och samhället som helhet. Som operatör ansluter vi både små och stora företag, leder utbyggnaden av 5G och utvecklar innovativa samt hållbara lösningar inom områden som konnektivitet, kommunikation och IT. Våra nät och datahallar drivs självklart med förnybar energi, och vi är stolta över att vara miljöcertifierade. Dessutom arbetar vi ständigt med att utveckla tjänster som hjälper våra kunder att minska sina klimatavtryck.

Vi erbjuder helhetslösningar inom kommunikation och IT för att låta ert företag fokusera på kärnverksamheten. Våra tjänster är framtidssäkrade och skalbara, och de kan anpassas när era behov förändras.



Hos oss får ni en personlig kontakt som brinner för att utveckla er verksamhet med den digitala tekniken. Vi hjälper er att hitta produkter och tjänster som passar just er. Ni får kontakt med oss via våra säljare, butiker och IT-tekniker som finns i hela landet.



Framtiden är teknikdriven och vi säkerställer att alla företag kan ta del av digitaliseringens möjligheter.



Telia Ramavtal – för en enklare IT-vardag och digitaliseringsresa

Telia Ramavtal öppnar upp Telias breda portfölj av tjänster för er. Ni beställer enkelt tjänster ifrån den ständigt uppdaterade tjänstekatalogen, som ni har tillgång till utan behov av separata avtal. Allt för att ni som kund ska ha nära till relevanta tjänster som stöttar digitaliseringen av ert företag. Från mobilabonnemang till IT-tekniker på plats; Telias Ramavtal ger er enkelheten och tjänsterna ni behöver – välkommen till oss på Telia!



Beställning av tjänster enligt offerten förutsätter att ni har ett Ramavtal med Telia. Om ni redan har ett Ramavtal så kontaktar ni Telia för att beställa. Om ni inte har ett Ramavtal så blir nästa steg att teckna ett Ramavtal där vi specificerar vilka tjänster som ska ingå och villkoren för detta.



Upptäck MyBusiness: maximera fördelarna för smidig företagshantering

För att förenkla och effektivisera er interaktion med våra företagstjänster har vi utformat vår portal,  MyBusiness. Oavsett om ni behöver uppgradera, göra nya beställningar eller avsluta tjänster i enlighet med era skiftande behov, ger MyBusiness er möjligheten att göra detta smidigt och snabbt. Plattformen ger er även en omfattande översikt över era fakturor, vilket underlättar för er att ha full koll på era kostnader.



Genom att använda MyBusiness kan ni inte bara effektivt sköta er företagshantering utan också direkt kommunicera med oss. Ställ era frågor och följ statusen på era ärenden på ett enkelt sätt. MyBusiness är utformad för att göra er hantering av företagstjänster så smidig som möjligt.





                                                                           





Behov













VERKSAMHET

MOBILABONNEMANG

VÄXEL

IT









Test Automation Kundens behov - Verksamhet

Test Automation Kundens behov - Mobilabonnemang

Test Automation Kundens behov - Växel

Test Automation Kundens behov - IT





Lösningsförslag













VERKSAMHET

MOBILABONNEMANG

VÄXEL

IT









Test Automation Lösning - Verksamhet

Test Automation Lösning - Mobilabonnemang

Test Automation Lösning - Växel

Test Automation Lösning - IT





I offerten föreslagna tjänster

Telia Jobbmobil

ENKEL OCH KOSTNADSEFFEKTIV KOMMUNIKATION – BÅDE HEMMA OCH UTOMLANDS

Mobilabonnemang för företag

Sveriges bästa mobilnät fyra år i rad samt Sveriges nöjdaste företagskunder.

Surfmängd efter behov från 1 GB upp till obegränsat.

Ring och skicka meddelanden inom EU/EES samt hem till Sverige för samma pris som inom Sverige när ni är utomlands. Ni använder samma surfpaketering inom EU/EES som i Sverige.

Läs mer om denna tjänst i Funktionsbeskrivning 

Telia Smart Connect 

EFFEKTIV KOMMUNIKATION OAVSETT PLATS

Molnbaserad växellösning som säkerställer kontakten mellan anställda och kunder och möjliggör enkel kommunikation

Låt anställda arbeta utan begränsningar där de är

Enkla gränssnitt i plattformen och ”drag-and-drop” funktionalitet ger en bra överblick och gör det enkelt att anpassa lösningen efter behov

Se status och tillgänglighet hos medarbetare genom kalenderintegration

Tillgång till statistik och uppföljning i både realtid och i efterhand 

Läs mer om denna tjänst i Funktionsbeskrivning 

Telia Operator Connect 

FAST OCH MOBILT DIREKT I MICROSOFT TEAMS

Med Operator Connect integreras all telefoni – fast och mobilt direkt in i Microsoft Teams

Enkel administration via Teams AdminCenter: Telia kommer automatiskt att provisionera alla nummer direkt till Teams, så att det enkelt kan tilldelas användare i Microsoft Teams AdminCenter.

Telefoni i operatörsklass: Telia är integrerade direkt i Microsofts moln med full redundans. Detta säkerställer en telefonupplevelse i operatörsklass direkt i Microsoft Teams

Pålitlig support: För att få hjälp med kvalitets-och incidentproblem får du den hjälp du behöver med kombinerade resurser från Telia och Microsoft. 

Läs mer om denna tjänst i Funktionsbeskrivning 

Telia Touchpoint Plus

JOBBA EFFEKTIVARE MED MOLNVÄXEL

Touchpoint Plus är en molnbaserad växellösning för lite större bolag som kan skräddarsys helt utifrån Kundens behov. Växelfunktionerna kan användas i både mobil, telefon, surfplatta eller dator. Låt varje användare få det som passar bäst.

Virtuell – Vid behov av anknytning i växeln

Bas – Vid behov av en enkel användare

Mobil – För den mobila användaren

Unified – För valfrihet av terminal och samlad kommunikation

Företaget slipper tänka på driften – den sköter Telia

Läs mer om denna tjänst i Funktionsbeskrivning 

Telia Microsoft 365

GÖR KONTORET TILLGÄNGLIGT VAR NI VILL, NÄR NI VILL

Abonnemang för Microsofts Office 365

Telia erbjuder svensktalande support via telefon eller e-post samt ett webbgränssnitt där ni själva kan öka och minska användarlicenser efter behov

Läs mer om denna tjänst i Funktionsbeskrivning 

Telia Slutanvändarsupport

DEDIKERAD SLUTANVÄNDARSUPPORT FÖR HELA FÖRETAGET

Snabb och kompetent slutanvändarsupport för Microsoft 365 applikationer och Mobila enheter

Alla användare får hjälp att nyttja sina mobila enheter

Alla användare får hjälp i Microsofts applikationer

Köp en första linjen eller en andra linjen slutanvändarsupport till företaget

Läs mer om denna tjänst i dessa dokument Funktionsbeskrivning 

Telia Smart Säkerhet

SKYDDA ERT FÖRETAG MOT VIRUS OCH SKADLIG KOD

Säkerhetstjänst med molnbaserad administrationsportal och skyddsklienter för datorer, mobiler, och servrar.

Snabb, skalbar implementering. Distribuera, hantera och övervaka säkerheten för era klienter och relaterade tjänster från ett intuitivt webbgränssnitt 

Skyddar alla era enheter mot olika typer av hot, såsom gisslanprogram, dataintrång och skadlig kod 

Allt som behövs för mobilsäkerhet i ett paket: anti-malware, stöldskydd och VPN som förhindrar avslyssning av e-post och onlinekommunikation 

Telia IT-support Standard

ER IT-SUPPORT FÖR ANVÄNDAREN

Support online för användarnas IT – Vi hjälper era medarbetare med alla problem och frågor kring deras enheter (dator, mobil, surfplatta) och mjukvara såsom Microsoft 365. 

Snabbt och personligt – Vi är er IT-support där ni får tillgång till ett helt expertteam som är redo att ge er full support och ser till att användarnas IT fungerar som det ska.

Få koll på kostnaderna – Tydliga priser med fast månadsavgift per användare. 

Läs mer om denna tjänst i Funktionsbeskrivning 

Telia IT-support Plus

ER IT-SUPPORT FÖR BÅDE ANVÄNDAREN OCH ER GEMENSAMMA IT-MILJÖ

Support online för användarnas IT – Vi hjälper era medarbetare med alla problem och frågor kring deras enheter (dator, mobil, surfplatta) och mjukvara såsom Microsoft 365. 

Support online för er IT-administratör – Vi stöttar och ger support till era administratörer på era gemensamma system, enheter och nätverk samt centrala delar i Microsoft 365 och Telias övriga tjänster. 

Snabbt och personligt – Vi är er IT-support där ni får tillgång till ett helt expertteam som är redo att ge er full support och ser till att både användarnas och företagets gemensamma IT fungerar som det ska.

Få koll på kostnaderna – Tydliga priser med fasta månadsavgifter per användare. 

Läs mer om denna tjänst i Funktionsbeskrivning 

Telia IT-support Premium – IT-avdelning

MYCKET MER ÄN BARA IT-SUPPORT

Er egen IT-avdelning - Telia har full koll på er IT-miljö.

Snabbt och personligt - Telia har ett helt expertteam som ger er full support och arbetar proaktivt med er IT-miljö.

Monitorering och övervakning - Telia har koll på era enheter och hanterar larm och incidenter. 

Säker IT-miljö - Som er IT-partner arbetar vi aktivt tillsammans med er för att utveckla er IT-miljö och skapa en säker IT-miljö utifrån era behov.  

Få koll på kostnaderna - Tydliga priser med fasta månadskostnader.

Läs mer om denna tjänst i Funktionsbeskrivning 

Telia IT-support Premium – IT-avdelning Start

IT-SUPPORT OCH MONITORERING NÄR NI BEHÖVER

Er egen IT-avdelning - Telia har full koll på er IT-miljö.

Snabbt och personligt - Telia IT-avdelning arbetar proaktivt och har ett helt expertteam som är redo att ge er full support.

Monitorering och övervakning - Telia har koll på era enheter och hanterar larm och incidenter. 

Säker IT-miljö - Som er IT-partner arbetar vi aktivt tillsammans med er för att utveckla er IT-miljö och skapa en säker IT-miljö utifrån era behov.  

Låt Telia ta hand om er IT - Med Start-tjänsten avgör ni när Telia ska agera och ni betalar för support och IT-rådgivning när ni behöver det.

Läs mer om denna tjänst i Funktionsbeskrivning 

Telia Försäkring Mobiltelefon

SMART TELEFON, SMART FÖRSÄKRING

Försäkring för mobiltelefon utan åldersavdrag.

Kompletterar er garanti så att ni får ett försäkringsskydd för er mobiltelefon som täcker de flesta skador av de mest varierande karaktärer

Inget åldersavdrag

Tre fria månader, till ett värde utifrån aktuell prislista



Telia Bredband Start  

SNABB OCH STABIL UPPKOPPLING

Surfa och skicka e-post blixtsnabbt, använd interaktiva tjänster och ladda ner stora filer utan problem.

Välj hastigheter upp till 1 Gbit/s via fiber och upp till 250 Mbit/s via mobilnätet.

Router ingår i tjänsten.

Läs mer om denna tjänst i Funktionsbeskrivning 

Telia Bredband Plus

ETT KRAFTFULLT BREDBAND MED GARANTERAD BANDBREDD

Tjänsten passar företag som har höga krav på driftsäkerhet, tillgänglighet och tillförlitlighet.

Anslutning till TeliaNet, Telias eget IP-nät som når över 3000 orter i Sverige och direktkoppling mot Telias samarbetspartners nätverk som sträcker sig till de flesta delar av Europa, USA och Asien.

Service i världsklass och installation på plats av tekniker. Fel åtgärdas inom 12 timmar.

Kan levereras till fastigheter som inte är fiberanslutna. 

Läs mer om denna tjänst i Funktionsbeskrivning 

Telia Bredband Pro 

HÖGKVALITATIVT BREDBAND MED ETT NÄT I VÄRLDSKLASS

Lämpad för alla slags lösningar, även de mest verksamhetskritiska.

Anslutning till TeliaNet, Telias eget IP-nät som når över 3000 orter i Sverige och direktkoppling mot Telias samarbetspartners nätverk som sträcker sig till de flesta delar av Europa, USA och Asien.

Garanterade hastigheter, fast IP och prioriterad trafik. Överföringskapacitet upp till 10 Gbit/s.

Aktiv övervakning dygnet runt alla dagar på året och fel åtgärdas inom 8 timmar. Installation på plats av tekniker.

Kan levereras till fastigheter som inte är fiberanslutna.

Läs mer om denna tjänst i Funktionsbeskrivning 

Telia Datanet

FLEXIBEL GLOBAL KOMMUNIKATIONSLÖSNING SKRÄDDARSYDD EFTER FÖRETAGETS BEHOV

Länkar samman geografiskt spridda kontor via ett privat IP-nätverk.

Säker och full tillgång till alla system oberoende var i världen företaget återfinns.

Oslagbar täckning, proaktiv övervakning och support dygnet runt.

Lägg till eller ta bort funktioner och tjänster efter behov. 

Läs mer om denna tjänst i Funktionsbeskrivning 

Telia Cloud VPN Wifi/Lan

ETT FÖRSTKLASSIGT WIFI FÖR FÖRETAGETS ANSTÄLLDA OCH GÄSTER

Wifi och fast uppkoppling som tjänst, modulär och lätt utbyggningsbar tack vare Wifi accesspunkter och fasta LAN switchar med central hantering i molnet.

Wifi täckning designas enkelt med hjälp av en tvådimensionell ritning över lokalen.

Gästnät i Wifi med inloggningsportal.

Nya insikter och utökade beslutsunderlag tack vare webbportal som ger statistik över användning. 

Läs mer om denna tjänst i Funktionsbeskrivning 

Telia Cloud VPN SD-Wan/Firewall

NÄSTA GENERATIONS KOMMUNIKATIONSPLATTFORM

Molnmanagerad nätlösning med SD-WAN och säkerhet, speciellt fördelaktig för den geografiskt spridda verksamheten.

Trafikstyrning och säker uppkoppling genom automatiskt VPN över internet.

Brandvägg med best-practise standardinställning.

Säkerhetslicens som val för utökat skydd mot malware, för intrångsskydd och filtrering av innehåll.

Övervakning och analyser i webbportal.

Läs mer om denna tjänst i Funktionsbeskrivning 





Prisbild (lösningsförslag)

Nedan presenterar vi en sammanställning av de tjänster som ingår i lösningsförslaget samt en månadsavgift.

Erbjudande

Tjänst

Antal

Engångs-avgift

Månads-avgift

Kommentar



TELIA JOBBMOBIL (Antal för basnivå: 300, Avtalstid: 36 månader)















Jobbmobil 1 GB

7

0 kr

229 kr





Jobbmobil 3 GB

7

0 kr

249 kr





Jobbmobil 5 GB

5

0 kr

269 kr





Jobbmobil 15 GB

7

0 kr

299 kr





Jobbmobil 20 GB

7

0 kr

309 kr





Jobbmobil 30 GB

7

0 kr

329 kr





Jobbmobil 40 GB

7

0 kr

339 kr





Jobbmobil 50 GB

7

0 kr

349 kr





Jobbmobil 120 GB

7

0 kr

419 kr





Jobbmobil Obegränsad

7

0 kr

449 kr





Jobbmobil Datasim

7

0 kr

149 kr





Anslutning Klocka

7

0 kr

59 kr





Tillval - Mobilt











Till Europa

7

0 kr

89 kr





Res Österut

7

0 kr

19 kr















Summa





0 kr

24 354 kr





 Abonnemangsunika tillvalstjänster

Tjänst

Jobbmobil

Bas

Jobbmobil

1-7 GB

Jobbmobil

10-25 GB

Jobbmobil

30-50 GB

Jobbmobil

80- Obegränsad

Jobbmobil

Obegränsad Plus



Ej vald i avtalet









Ej vald i avtalet

Surf i utlandet

- kr/månad

199 kr/månad

199 kr/månad

199 kr/månad

199 kr/månad

- kr/månad 

Samtal i utlandet

- kr/månad

199 kr/månad

199 kr/månad

199 kr/månad

199 kr/månad

- kr/månad 

Maxhastighet 1500Mbit/s

- kr/månad

99 kr/månad

99 kr/månad

99 kr/månad

99 kr/månad

0 kr/månad 





Erbjudande

Tjänst

Antal

Engångs-avgift

Månads-avgift

Kommentar



TELIA MOBILT BREDBAND FÖRETAG (Antal för basnivå: 300, Avtalstid: 36 månader)















Mobilt Bredband Företag 20 GB

7

0 kr

169 kr





Mobilt Bredband Företag 50 GB

7

0 kr

229 kr





Mobilt Bredband Företag 500 GB

7

0 kr

329 kr





Tillval - Mobilt BB











Fast IP adress

7

0 kr

99 kr















Summa





0 kr

5 782 kr

















































KOMMENTAR



SAMMANSTÄLLNING



Test Automation Kommentarer offert





TOTAL ENGÅNGSAVGIFT 1

0 KR



TOTAL MÅNADSAVGIFT

30 136 KR













1 Totala engångsavgiften visar den faktiska kostnaden efter avdragen engångsavgift.

Beställning av tjänster till ovan priser förutsätter att ni har ett Ramavtal med Telia. Om ni redan har ett Ramavtal så kontaktar ni Telia för att beställa. Om ni inte har ett Ramavtal så blir nästa steg att teckna ett Ramavtal där vi specificerar vilka tjänster som ska ingå och villkoren för detta.`;
  await utilityFunctionLocal.VerifyQuoteWordDocumentContent(page, expectedText);


  //LTAT-32328 - SFI upgrade issue
  await page.goto(secretsData.get("environmentURL") + "/" + ContractID);

  //Verify contract pdf content
var expectedText = `Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumber}
Referens-ID: ${ContractNumber}1
Förändring av Bilaga 2 – Kundunika priser till avtal 
RA-${ActiveContractNumber}
Genom att signera denna handling bekräftar Kunden följande förändring av innehållet i Bilaga 2*. 
Förändringen kan bestå i att parterna har kommit överens om nya Tjänster och priser eller förändrade 
priser för befintliga Tjänster. Utöver de förändringar som beskrivs nedan gäller innehållet i Bilaga 2* 
oförändrat. (* Har ni ett ramavtal tecknat innan 2023-05-14 så skall denna bilaga utgöra ny Bilaga 5)
Tjänster markerat med blått har förändrats och tjänster markerat med grönt är tillägg till avtalet.
Telia har rätt att en gång per år justera de priser och avgifter som anges i denna bilaga med hänsyn till 
förändringar i följande index: SCB:s Konsumentprisindex (KPI) (1980 = 100). En prisjustering med stöd av 
indexförändring kan första gången ske tidigast sex (6) månader efter det att parterna ingått avtal för den 
relevanta Tjänsten. Telia meddelar Kunden om den aktuella indexförändringen senast trettio (30) dagar 
innan förändringen träder i kraft. Indextalet för den oktobermånad som infaller året före det år då den 
relevanta Tjänsten ingås (basmånad för den Tjänsten) utgör indexets bastal för den aktuella Tjänsten. Om 
indextalet i någon påföljande oktobermånad (avräkningstidpunkt) har stigit i förhållande till indexets 
bastal ska priser och avgifter i denna bilaga justeras för den aktuella Tjänsten med hänsyn till detta.

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumber}
Referens-ID: ${ContractNumber}2
Telia Jobbmobil och Mobilt Bredband Företag
Tjänstespecifik 
avtalstid
${ContractStartDate} – ${ContractEndDate}
VolymåtagandeBasnivå: 300
Särskilda villkor De kundunika priser som anges i Bilaga 2 gäller för de abonnemang som Kunden 
har hos Telia vid den tjänstespecifika avtalstidens början och för varje nytt Telia 
Jobbmobil-abonnemang Kunden därefter beställer.
Telia Jobbmobil enligt Bilaga 2 ersätter motsvarande abonnemang och tjänster i 
Bilaga 2. Det är endast möjligt att beställa Telia Jobbmobil-abonnemang enligt 
Bilaga 2 under den tjänstespespecifika avtalstiden.
De kundunika priserna gäller från och med den tjänstespecifika avtalstidens början
under förutsättning att Bilaga 2 kommit Telia tillhanda senast tio (10) arbetsdagar 
före den tjänstespecifika avtalstidens början.
Prissättningen i Bilaga 2 är grundad på den mellan Parterna överenskomna 
basnivån. Med basnivån (Basnivån) menas det antal Telia Jobbmobil abonnemang 
som Kunden och i förekommande fall Avropsberättigade bolag åtar sig att ha 
kopplade till Ramavtalet under den tjänstespecifika avtalstiden. Basnivån ska vara 
uppfylld senast tre (3) månader efter den tjänstespecifika avtalstidens början.
Om antalet abonnemang vid något tillfälle under den tjänstespecifika avtalstiden 
skulle understiga sjuttiofem (75) procent av Basnivån äger Telia rätt att, för varje 
sådan kalendermånad som Basnivån understiger sjuttiofem (75) procent, debitera 
en avgift per abonnemang för mellanskillnaden mellan faktiskt antal abonnemang 
och antalet abonnemang enligt Basnivån. Avgiften är 300 kr (exkl. moms) per 
abonnemang och kalendermånad.
Betalningsvillkor för Jobbmobil är trettio (30) dagar. 
Version av 
Tjänstebeskrivning
För Funktionsbeskrivning (klicka här) v.2.0
Telia Jobbmobil
Surfa, ring, sms:a och mms:a för samma pris i länder inom EU/EES som inom Sverige 
1, 2
Abonnemang 
2, 3, 4
EngångsavgiftMånadsavgift
Jobbmobil 1 GB0 kr229 kr
Jobbmobil 3 GB0 kr249 kr
Jobbmobil 15 GB0 kr299 kr
Jobbmobil 30 GB0 kr329 kr
Jobbmobil 40 GB0 kr339 kr
Jobbmobil 120 GB0 kr419 kr
Jobbmobil 5 GB0 kr269 kr
Jobbmobil 20 GB0 kr309 kr
Jobbmobil 50 GB0 kr349 kr
Jobbmobil Obegränsad0 kr449 kr
SamtalÖppningsavgiftMinutavgift

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumber}
Referens-ID: ${ContractNumber}3
Talsamtal till Telias svenska mobilabonnemang, till
mobilsvar samt till fasta telenät i Sverige 
0 kr/samtal0 kr 
12
Talsamtal till mobilabonnemang hos övriga 
svenska operatörer 
1, 6, 9
0 kr/samtal0 kr 
12
Meddelanden till svenska mobilabonnemang 
1, 11
Avgift per meddelande
SMS, dygnet runt0 kr 
13
MMS, dygnet runt0 kr 
13
Tillvalstjänster, till utlandet och fotnoter för Jobbmobil
Tjänster som ingårAktiverad/AktiverasTjänster som ingårAktiverad/Aktiveras
Nummerpresentationfrån startSmsfrån start
Gruppsamtalfrån startMmsfrån telefonen
Visa missade samtalfrån startSpärr Utlandi MyBusiness
Samtal Väntarfrån telefonenSpärr Betalsamtali MyBusiness
Vidarekoppling 
14
från telefonenHemligt Nummeri MyBusiness
Mobilsvarfrån telefonenStöldspärri MyBusiness
5G 
15
från start
Valbara tjänsterAktiverasAvgift per abg
Datasim 
16
i MyBusiness149kr/månad
Anslutning Klocka 
17
i MyBusiness59kr/månad
Detaljspecifikationi MyBusiness20kr/spec
Fakturadelningav kundtjänst20kr/månad
Samtalsgrupperingav kundtjänst10kr/månad
Nummerreservation 
20
av kundtjänst100kr/nr/år
Till Europa
18
i MyBusiness89kr/månad
Till Grannland 
Företag
18
i MyBusiness49kr/månad
Till Utland Företag
18
i MyBusiness19kr/månad
Res Söderut
19
i MyBusiness19kr/månad
Res Västerut
19
i MyBusiness19kr/månad
Res Österut
19
i MyBusiness19kr/månad
 Abonnemangsunika Tillval
Jobbmobil
Bas
Jobbmobil
1-7 GB
Jobbmobil
10-25 GB
Jobbmobil
30-50 GB
Jobbmobil
80- Obegränsad
Jobbmobil
Obegränsad Plus
Ej vald i avtaletEj vald i avtalet
Surf i utlandet – kr/månad 199 kr/månad199 kr/månad199 kr/månad199 kr/månad  - kr/månad 
Samtal i utlandet – kr/månad 199 kr/månad199 kr/månad199 kr/månad199 kr/månad  - kr/månad 
Maxhastighet 
1500Mbit/s
 – kr/månad 99 kr/månad99 kr/månad99 kr/månad99 kr/månad  0 kr/månad 
Samtal från Sverige till utlandet 
21
PrisTill Utland Företag
Öppningsavgift0,59 kr/samtal0,49 kr/samtal
Norden: Danmark, Finland, Norge 0,99 kr/minut0,59 kr/minut
Europa 1: Belgien, Bulgarien, Cypern, Estland, Frankrike, 
Grekland, Irland, Island, Italien inkl. Vatikanstaten, Kroatien, 
Lettland, Liechtenstein, Litauen, Luxemburg, Malta, Monaco, 
Nederländerna, Polen, Portugal, Rumänien, Schweiz, Slovakien, 
Slovenien, Spanien, Storbritannien, Tjeckien, Tyskland, Ungern, 
Österrike
1,19 kr/minut0,99 kr/minut

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumber}
Referens-ID: ${ContractNumber}4
Världen 1: Australien, Hong Kong, Japan, Kanada, Kina, Nya 
Zeeland, Singapore, Sydkorea, Taiwan, Thailand, USA
1,19 kr/minut0,99 kr/minut
Europa 2: Albanien, Andorra, Bosnien-Hercegovina, Färöarna, 
Gibraltar, Makedonien, Moldavien, Montenegro, Ryssland, San 
Marino, Serbien, Turkiet, Ukraina
Världen 2: Argentina, Azerbajdzjan, Brasilien, Chile, 
Dominikanska Rep., Egypten, Georgien, Indien, Indonesien, 
Israel, Kazakstan, Malaysia, Mexiko, Nepal, Sydafrika, 
Tadjikistan, Uzbekistan
2,19 kr/minut
2,19 kr/minut
1,99 kr/minut
1,99 kr/minut
Världen 3: Afghanistan, Algeriet, Angola, Anguilla, Antigua och 
Barbuda, Armenien, Aruba, Bahamas, Bahrain, Bangladesh, 
Barbados, Belize, Benin, Bermuda, Bhutan, Bolivia, Botswana, 
Brunei, Burkina Faso, Burundi, Caymanöarna, Comorerna, 
Centralafrikanska Rep., Colombia, Costa Rica, Djibouti, 
Dominica, Ecuador, Ekvatorialguinea, Elfenbenskusten, El 
Salvador, Eritrea, Etiopien, Fijiöarna, Filippinerna, Franska 
Guyana, Franska Polynesien, Förenade Arabemiraten, Gabon, 
Gambia, Ghana, Guadeloupe, Guam, Guinea, Grenada, 
Grönland, Guatemala, Guyana, Haiti, Honduras, Irak, Iran, 
Jamaica, Jordanien, Kambodja, Kamerun, Kenya, Kirgizistan, 
Kongo, Kongo Dem. Rep., Kosovo, Kuba, Kuwait, Laos, 
Libanon, Libyen, Marocko, Martinique, Mongoliet, 
Mocambique, Myanmar, Namibia, Nicaragua, Niger, Nigeria, 
Oman, Pakistan, Palestina, Panama, Paraguay, Peru, Qatar, 
Rwanda, Saudiarabien, Senegal, Sri Lanka, Sudan, Surinam, Syd
Sudan, Syrien, Tanzania, Tchad, Togo, Trinidad och Tobago, 
Tunisien, Turkmenistan, Uganda, Uruguay, Venezuela, Vietnam,
Vitryssland, Yemen, Zambia, Zimbabwe
4,99 kr/minut4,99 kr/minut
Världen 4: Amerikanska Jungfruöarna, Amerikanska Samoa, 
Ascension, Antarktis, Brittiska Jungfruöarna, Cooköarna, Diego 
Garcia, Falklandsöarna, Guinea-Bissau, Kap Verdeöarna, 
Kiribati, Lesotho, Liberia, Macao, Madagaskar, Malawi, 
Maldiverna, Mali, Marshallöarna, Mauretanien, Mauritius, 
Mayotte, Mikronesien, Montserrat, Nauru, Nederländska 
Antillerna, Niue, Nordkorea, Norra Marianaöarna, Nya 
Kaledonien, Palau, Papua Nya Guinea, Puerto Rico, Réunion, 
Saint Lucia, Saint Helena, Saint Kitts och Nevis, Saint Pierre och
Miquelon, Saint Vincent och Grenadinerna, Samoa, Sao Tomé 
och Príncipe, Seychellerna, Sierra Leone, Sint Maarten, 
Swaziland, Tonga, Salomonöarna, Somalia, Tokelau, Turks och 
Caicosöarna, Tuvalu, Vanuatu, Wallis och Futunaöarna, 
Östtimor
9,90 kr/minut9,90 kr/minut
Meddelanden från Sverige till utlandetPrisTill Utland Företag
SMS från Sverige till utländska telefonnummer (oavsett 
destination)
1,29 kr/meddelande1,29 kr/meddelande
MMS från Sverige till utländska telefonnummer (oavsett 
destination)
1,59 kr/meddelande1,59 kr/meddelande
Fotnoter Telia Jobbmobil (fotnot 5, 7, 10 gäller endast Jobbmobil BAS)
1
 Pris per minut/sms/mms som rings/skickas inom/mellan länder inom EU/EES styrs av aktuellt pris i för Kunden befintliga abonnemang i Sverige. 
Vad som anges ovan gäller emellertid inte för samtal/sms/mms som rings/skickas från Sverige. I sistnämnda fall gäller istället prislistan för samtal
och meddelanden från Sverige till utlandet.
2
 Surf inom EU/EES kan göras för samma pris och i samma utsträckning som i Sverige. För abonnemang med en surftjänst större än 50 GB är 
dock den maximala surfmängden inom EU/EES begränsad till 50 GB, se www.telia.se/foretag/utomlands
3
 Kretskopplad data ingår ej i vald surfmängd utan prissätts per minut, se www.telia.se/jobbmobil
4
 Jobbmobil <10 GB: Surfhastighet i 3G <32 Mbit/s, normal hastighet 2–10 Mbit/s. Surfhastighet i 4G och 5G: <100 Mbit/s, normal hastighet 10–40 
Mbit/s. Jobbmobil 10 GB och högre surfmängd: Surfhastighet i 3G <32 Mbit/s, normal hastighet 2–10 Mbit/s. Surfhastighet i 4G och 5G: <300 
Mbit/s, normal hastighet 20–60 Mbit/s. Om surfmängden förbrukas upphör möjligheten att fortsätta surfa. Vid uppnådd surfmängd ges möjlighet att 
fortsätta surfa genom att köpa till extra surfmängd. Information om surftjänster och möjlighet att köpa till extra surfmängd finns på 
www.telia.se/jobbmobil
Jobbmobil Obegränsad: Surfhastighet i 3G <32 Mbit/s, normal hastighet 2–10 Mbit/s. Surfhastighet i 4G och 5G <300 Mbit/s, normal hastighet 20-
60 Mbit/s. 

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumber}
Referens-ID: ${ContractNumber}5
Jobbmobil Obegränsad Plus: Surfhastigheten i 3G < 32 Mbit/s, normal hastighet 2–10 Mbit/s. Surfhastigheten i 4G och 5G: < 1 500 Mbit/s, normal 
hastighet 20–60 Mbit/s.
I de fall förbrukningen av surf för Jobbmobil Obegränsad och Jobbmobil Obegränsad Plus uppgår till 1TB, sänks hastigheten till 3Mbit/s.
5
 I de fall annan surftjänst väljs, ersätter denna grundtjänsten Jobbsurf Bas.
Jobbsurf <15GB: Surfhastighet i 3G <32 Mbit/s, normal hastighet 2–10 Mbit/s. Surfhastighet i 4G och 5G: <100 Mbit/s, normal hastighet 10–40 
Mbit/s.
Jobbsurf 15GB och högre surfmängd: Surfhastighet i 3G <32 Mbit/s, normal hastighet 2–10 Mbit/s. Surfhastighet i 4G och 5G: <300 Mbit/s, normal
hastighet 20–60 Mbit/s. Om surfmängden förbrukas upphör möjligheten att fortsätta surfa. Vid uppnådd surfmängd ges möjlighet att fortsätta surfa 
genom att köpa till extra surfmängd. Information om surftjänster och möjlighet att köpa till extra surfmängd finns på www.telia.se/jobbmobil
6
 Gäller ej för samtal till förmedlade tjänster såsom t.ex. nummerupplysning och andra typer av betalnummer.
7
 Debiteras per 60-sekunders intervall.
8
 Gäller även för samtal ringda till Sverige från länder inom EU/EES.
9
 Gäller även för samtal ringda inom och mellan andra EU/EES-länder än Sverige.
10
 Internsamtal gäller för samtal ringda mellan Kundens mobilabonnemang i Sverige och för samtal ringda i Sverige från Kundens 
mobilabonnemang till utvalda fasta nummer som tillhör Kunden. Samtliga nummer måste tillhöra Kunden. Gäller ej för samtal till förmedlade 
tjänster såsom t.ex. nummerupplysning och andra typer av betalnummer.
11
 Gäller ej Betal-sms. Pris för meddelanden skickade från Sverige till utländska telefonnummer återfinns under rubriken Meddelanden från Sverige
till utlandet.
12
 Priset gäller upp till 44 640 minuter/månad, därefter debiteras 0,29 kr/minut, öppningsavgift 0,39 kr/samtal.
13
 Priset gäller upp till 30 000 meddelanden/månad, därefter debiteras 0,49 kr/sms och 1,59 kr/mms.
14
 Vidarekoppling till Telias mobilabonnemang kostar 0 kr/minut samt 0 kr/samtal i öppningsavgift, till fasta nätet 0 kr/samtal i öppningsavgift, övriga
minut- och öppningsavgifter enligt Bilaga 2.
15
 Jobbmobilabonnemangen är förberedda för 5G utan extra kostnad. För att nyttja 5G krävs 5G-täckning och 5G-kompatibel telefon.
16
 Upp till fem (5) Datasim kan kopplas till ett Jobbmobilabonnemang. Månadsavgiften gäller per Datasim. För Jobbmobil Obegränsad Plus ingår ett 
(1) Datasim utan extra avgift.
17
 För att få tillgång till Anslutning Klocka måste avrop av tjänster först godkännas av behörig beställare via MyBusiness. För mer information, se 
www.telia.se/foretag/e-sim
18
 För mer information om Telias tilläggstjänster för samtal till utlandet, se www.telia.se/foretag/utomlands
19
 För mer information om Telias roamingtjänster, se www.telia.se/res
20
 Fri nummerreservation gäller ett (1) år från reservationsdatum därefter debiteras 100 kr/nummer och år i de fall Kunden vill förlänga sin 
reservation.
21
 Prislistorna för samtal respektive meddelanden från Sverige till utlandet gäller bara för samtal/meddelanden ringda/skickade från Sverige. För 
samtal/meddelanden som rings/skickas från andra EU/EES-länder till länder utanför EU/EES samt från länder utanför EU/EES oavsett 
destination gäller roamingavgift från respektive land. För mer information, se www.telia.se/foretag/utomlands
22
 Maxhastighet 1500 Mbit/s är inkluderad i Jobbmobil Obegränsad Plus  
23
 https://creativehub.teliacompany.com/m/4bfbbcfce3ec39f1/original/Funktionsbeskrivning-Telia-Jobbmobil.pdf
Telia Mobilt Bredband Företag
Abonnemang 
1, 2, 3
MaxhastighetEngångsavgiftMånadsavgift
Mobilt Bredband Företag 20 GB< 300 (Mbit/s) 
4
0 kr169 kr
Mobilt Bredband Företag 50 GB< 300 (Mbit/s) 
4
0 kr229 kr
Mobilt Bredband Företag 500 GB< 300 (Mbit/s) 
4
0 kr329 kr
Mobilt Bredband Företag 1000 GB< 300 (Mbit/s) 
4
0 kr399 kr
MeddelandenAvgift per meddelande
SMS till svenska telefonnummer 
5
0,60 kr/meddelande
SMS till utländska telefonnummer 
6
1,20 kr/meddelande
TillvalstjänsterAvgift per abonnemang
Fast IP adress99 kr/månad
Fotnoter Telia Mobilt Bredband Företag
1
 Fungerar enbart i Sverige, går inte att använda utomlands.
2
 Kretskopplad data ingår ej i vald surfmängd utan prissätts per minut, se www.telia.se/jobbmobil
3
 Om surfmängden förbrukas upphör möjligheten att köpa till extra surfmängd finns på www.telia.se/jobbmobil
4
 Surfhastigheten i 3G < 32 Mbit/s, normal hastighet 2–10 Mbit/s. Surfhastigheten i 4G: < 300 Mbit/s, normal hastighet 20–60 Mbit/s.
5
 Gäller sms skickade till svenska mobilnummer. Gäller inte betal-sms. 
6
 Gäller sms skickade till utländska mobilnummer. Gäller inte betal-sms.

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumber}
Referens-ID: ${ContractNumber}6
Ort & Datum
 
Kundens underskrift (firmatecknare/behörig företrädare)
 
Namnförtydligande`;
  await utilityFunctionLocal.VerifyContractPDFDocumentContent(page, expectedText);



  //Close all browserss
  await context.close();  
});



