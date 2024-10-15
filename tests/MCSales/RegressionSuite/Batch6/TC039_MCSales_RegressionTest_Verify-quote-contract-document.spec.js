const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const TestCaseName = 'TC039_MCSales_RegressionTest';


test('TC039_MCSales_RegressionTest_SOHO_NewSales-Verify-quote-contract-document', async function ({ browser }) {

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
  var ActiveContractNumber = await utilityFunctionLocal.RunSOQLQuery("select TeliaSE_Parent_Agreement__c from contract where vlocity_cmt__OpportunityId__c = '" + OpportunityID + "'");
  var ActiveContractNumberWithoutRA = await utilityFunctionLocal.RunSOQLQuery("select ContractNumber from contract where TeliaSE_Parent_Agreement__c = '" + ActiveContractNumber + "' limit 1");
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



DoNotUse_PlaywrightTestAccount 49883

Offertdatum: ${CreatedDate}

Offerten är giltig i 30 dagar från offertdatum.

Offertnummer: ${QuoteNumber}



















DoNotUse_PlaywrightTestAccount 49883

Telia Sverige AB

5599975132

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



Nätverkstjänster

Nätverkstjänster är en portfölj av tjänster som möjliggör ett sammanhängande och säkert nät på och mellan arbetsplatsen/arbetsplatserna med Telia som ansvarig leverantör.

Välj de delar som passar och komplettera efter behov. 

Nätverkstjänsterna övervakas 24/7 av Telias personal och förebyggande underhåll utförs för att garantera tjänstens funktion under avtalstiden. 

Vid extra höga krav på tillgänglighet finns proaktiv alarmhantering och utökad SLA som tillval för många av tjänsterna.

Telias nätverkstjänster avtalas till ett fast pris per månad för en förutsägbar funktion och kostnad. 

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





TELIA SMART CONNECT (Antal för basnivå: 60, Avtalstid: 36 månader)















Smart Connect Standardanvändare

7

0 kr

0 kr















Summa





0 kr

0 kr





Erbjudande

Tjänst

Antal

Engångs-avgift

Månads-avgift

Kommentar



Telia operator connect (Antal för basnivå: 60, Avtalstid: 36 månader)



















Huvudabonnemang











Mobil användare

7

0 kr

69 kr





Fast användare

7

0 kr

0 kr





Servicenummer

7

0 kr

84 kr















Summa





0 kr

1 071 kr



















Erbjudande

Tjänst

Antal

Engångs-avgift

Månads-avgift

Kommentar





TELIA BREDBAND PRO 24 - MÅNADER BINDNINGSTID (Antal siter: 60, Avtalstid: 36 månader)















Bredband Pro 100 Mbit/s

7

2 500 kr

0 kr





Bredband Pro 1 Gbit/s

7

2 500 kr

0 kr





Tillval Sekundär Access











Bredband Pro 100 Mbit/s – Sekundär Access

7

2 500 kr

0 kr





Tillval Wireless Backup











Bredband Pro Wireless Basic Backup

7

2 500 kr

0 kr





Tillval Utökad SLA











Bredband Pro SLA C4

7

0 kr

0 kr





Bredband Pro SLA C8

7

0 kr

0 kr





Installation och Övriga Tillval











Bredband Pro QoS Real Time 10 Mbit/s

7

800 kr

0 kr















Summa





75 600 kr

0 kr























KOMMENTAR



SAMMANSTÄLLNING



Test Automation Kommentarer offert





TOTAL ENGÅNGSAVGIFT 1

75 600 KR



TOTAL MÅNADSAVGIFT

1 071 KR













1 Totala engångsavgiften visar den faktiska kostnaden efter avdragen engångsavgift.

Beställning av tjänster till ovan priser förutsätter att ni har ett Ramavtal med Telia. Om ni redan har ett Ramavtal så kontaktar ni Telia för att beställa. Om ni inte har ett Ramavtal så blir nästa steg att teckna ett Ramavtal där vi specificerar vilka tjänster som ska ingå och villkoren för detta. 



Leveransplatser



Leveransplats                                                                                                                                                                                                           

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
Ramavtals-ID: RA-${ActiveContractNumberWithoutRA}
Referens-ID: ${ContractNumber}1
Förändring av Bilaga 2 – Kundunika priser till avtal 
RA-${ActiveContractNumberWithoutRA}
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
Ramavtals-ID: RA-${ActiveContractNumberWithoutRA}
Referens-ID: ${ContractNumber}2
Telia Smart Connect
Tjänstespecifik 
avtalstid
${ContractStartDate} – ${ContractEndDate}
VolymåtagandeBasnivå: 60
Särskilda villkor För att erhålla avtalade priser måste avropsberättigade bolag beställa genom 
Kundens ansvariga säljare hos Telia. 
Prissättningen i Bilaga 2 är grundad på den mellan Parterna överenskomna 
basnivån för Smart Connect (Basnivån Smart Connect). Med basnivån för Smart 
Connect menas det antal användare som Kunden och i förekommande fall 
Avropsberättigade bolag, åtar sig att ha kopplade till Ramavtalet under den 
tjänstespecifika avtalstiden. Basnivån ska vara uppfylld senast tre (3) månader 
efter den tjänstespecifika avtalstidens början.
Om antalet Användare vid något tillfälle under den tjänstespecifika avtalstiden 
ovan skulle understiga sjuttiofem (75) procent av Basnivån Smart Connect äger 
Telia rätt att, för varje sådan kalendermånad som basnivån för Smart Connect 
understiger sjuttiofem (75) procent, debitera en avgift per Användare för 
mellanskillnaden mellan faktiskt antal Användare och antalet Användare enligt 
Basnivån Smart Connect. Avgiften är 50 kr (exkl. moms) per Användare och 
kalendermånad.
Betalningsvillkor för Smart Connect är trettio (30) dagar. 
För att minska klimatavtrycket tar Telia ut en faktureringsavgift för 
pappersfaktura på 39 kr för Smart Connect. För att bidra till en positiv 
klimatpåverkan och undvika faktureringsavgift, vänligen välj det digitala 
alternativet. Logga in på MyBusiness för att registrera för e-faktura eller kontakta
kundtjänst.
Version av 
Tjänstebeskrivning
För Funktionsbeskrivning (klicka här
9
) v.2.0 
För Tjänstespecifikation (klicka här
10
) v.1.0 
Smart Connect AnvändarpaketMånadsavgift
Smart Connect Standardanvändare0 kr
Tillval användare 
1
EngångsavgiftMånadsavgift
Softphone (WebRTC)0 kr29 kr
Extra telefonnummer0 kr19 kr
Tillval företag 
2
EngångsavgiftMånadsavgift
Funktionsnummer0 kr99 kr
Integrationstjänster 
3,4
EngångsavgiftMånadsavgift
Kalenderintegration0 kr19 kr
Implementering Kalenderintegration1 990 kr0 kr
AD-integration0 kr9 kr
Implementering AD-integration1 990 kr0 kr
API Access0 kr9 kr
Implementering API Access1 990 kr0 kr
Teamsintegration - Status0 kr9 kr
Implementering Teamsintegration1 990 kr0 kr

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumberWithoutRA}
Referens-ID: ${ContractNumber}3
Svarsservice 
5
EngångsavgiftMånadsavgift
Telia Svarsservice 100 kr4 380 kr
Telia Svarsservice 200 kr6 540 kr
Telia Svarsservice 400 kr10 920 kr
Telia Svarsservice 600 kr15 500 kr
Telia Svarsservice 800 kr19 770 kr
Telia Svarsservice 1000 kr22 440 kr
Telia Svarsservice Utökade Öppettider0 kr4 045 kr
Telia Svarsservice Administration, antal timmar per 
månad
0 kr635    kr/timme
Utbildningar och leveranstjänster 
6, 7, 8
EngångsavgiftMånadsavgift
Utbildning heldag9 990 kr0 kr
Utbildning halvdag5 990 kr0 kr
Vägledd leverans9 995 kr0 kr
Uppstartshjälp Smart Connect2 499 kr0 kr
Extra konfiguration599 kr0 kr
NummerserierEngångsavgiftMånadsavgift
Befintlig 10-nummerserie för fasta nummer0 kr0 kr
Befintlig 100-nummerserie för fasta nummer0 kr0 kr
Befintlig 1000-nummerserie för fasta nummer0 kr0 kr
Ny 10-nummerserie för fasta nummer1 000 kr0 kr
Ny 100-nummerserie för fasta nummer3 000 kr0 kr
Ny 1000-nummerserie för fasta nummer9 000 kr0 kr
Övriga tillvalAvgift
Konsulttjänst per timme1 265 kr/timme
Fotnoter Smart Connect 
1.Tillval för användaren faktureras som tillägg på mobilabonnemanget. Tillval på företagsnivå faktureras på företaget. 
2.Funktionsnummer  avser nummer som kopplas till antingen menyval eller köer.
3.Aktivering av tilläggstjänster på företagsnivå, behöver kompletteras med tilläggstjänster på användarnivå (gäller för implementering integrations 
API, implementering Teamsintegration, Implementering AD-integration och implementering Kalenderintegration). 
4.Tilläggstjänsten API Access omfattar alltid alla användare i lösningen och faktureras på företaget, pris per användare.
5.För implementation av Svarsservice krävs tillvalet väggledd leverans . Månadsavgiften för Telia Svarsservice Administration utgörs av timpriset 
multiplicerat med antalet timmar som beställs per månad 
Telia har rätt att göra en årlig indexuppräkning av priset för Telia Svarsservice baserat på branschavtal: Labour Cost Index för tjänstemän, privat 
sektor (LCI tjm), preliminär, SNI 2007, kolumn N. Källa: Statistiska centralbyrån (SCB). Prisförändringen baseras på den procentuella förändringen
mellan index kvartal två respektive år. Om index är lägre än föregående år görs ingen prisförändring.
6.Max fem Extra Konfigureringsärenden  kan köpas under uppsättning av kundimplementation.
7.I Utbildning halvdag/heldag ingår distansutbildning via Teams, upp till 3 timmar för halvdag och upp till 6 timmar för heldag. Önskas 
utbildningar på plats tillkommer kostnader för restidsersättning och faktiska resekostnader.
8.Vid vägledd leverans ingår 6 timmar i priset, för mer tid tillkommer 1265kr per timme.
9.https://www.telia.se/dam/jcr:0cbf037d-db83-436b-98ea-8633faa75314/telia-smart-connect-funktionsbeskrivning.pdf 
10.https://creativehub.teliacompany.com/m/359d77cc6bfe3d91/original/Tjanstespecifikation-Telia-Smart-Connect.pdf 
Avgifter för Smart Connect övrig trafik
Övrig trafik debiteras enligt nedan. Exempel på övrig trafik är om du vidarekopplar din stängda 
svarsgrupp till ett externt nummer, alltså extern trafik från ett gruppnummer eller utgående extern trafik 
från en Fristående telefon t.ex. en konferenstelefon.

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumberWithoutRA}
Referens-ID: ${ContractNumber}4
Samtalstrafik mellan användare och grupper i lösningen är kostnadsfria inom Sverige. Det gäller även 
samtalstrafik till tjänstens röstbrevlådor. Vid utgående trafik från anslutna användare gäller 
mobilabonnemangets samtalsavgifter.
Samtalsavgifter 
1, 2
Talsamtal till fasta telenät samt Telias mobilabonnemang
- dygnet runt0,39kr/min
- öppningsavgift0,45kr/samtal
Talsamtal till övriga mobilabonnemang inom Sverige 
1, 2
- dygnet runt 0,39kr/min
- öppningsavgift0,45kr/samtal
Internsamtal dygnet runt 
3
- till egna Telia mobilabg 0,00kr/min
- till egna fasta nummer 0,00kr/min
- öppningsavgift till egna Telia mobilabg0,00kr/samtal
- öppningsavgift till egna fasta nummer 0,00kr/samtal
Samtal till utlandet 
Enligt Utlandsprislista för avtalskunder
Fotnoter Avgifter för Smart Connect Övrig trafik 
1.
Gäller inte samtal till förmedlade tjänster som t.ex. nummerupplysning, betalnummer (t.ex. 099, 0771, 077, 0900, 0939, 0944).
2.
Debiteras per 60-sekunders intervall.
3.
Gäller övrig trafik till mobilnummer som tillhör men inte ingår i växellösningen. Gäller även övrig trafik till utvalda fasta nummer som tillhör Kunden.
Avgifter för Smart Connect SMS Center
Med SMS Centrets meddelandefunktion i Smart Connect kan du skicka SMS till grupper eller individer 
direkt från växellösningen med din PC, Mac, Surfplatta eller Softphone. I Smart Connect’s mobilapp kan du
även skicka SMS genom SMS Centret från menyn ”Meddelanden”. 
Anslutna användare med mobilabonnemang som skickar SMS utan att använda Smart Connect SMS 
Center (meddelandefunktion) debiteras enligt mobilabonnemangets SMS-avgifter.
SMS som skickats genom Smart Connect SMS Center debiteras enligt nedan:
SMS avgifter  för SMS Center
1
SMS till svenska telefonnummer (500 SMS/Månad ingår utan 
kostnad)
0,69kr/SMS
SMS till utländska telefonnummer (oavsett destination)1,29kr/SMS
Fotnoter Avgifter för Smart Connect SMS Center
1.Gäller ej Betal-SMS

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumberWithoutRA}
Referens-ID: ${ContractNumber}5
Telia O perator Connect
Tjänstespecifik 
avtalstid
${ContractStartDate} – ${ContractEndDate}
VolymåtagandeBasnivå: 60
Särskilda villkorFör att erhålla avtalade priser måste avropsberättigade bolag beställa genom 
Kundens ansvariga säljare hos Telia. 
Prissättningen i Bilaga 2 är grundad på den mellan Parterna överenskomna 
basnivån för Smart Connect (Basnivån Operator Connect). Med basnivån för 
Smart Connect menas det antal användare som Kunden och i förekommande 
fall Avropsberättigade bolag, åtar sig att ha kopplade till Ramavtalet under den 
tjänstespecifika avtalstiden. Basnivån ska vara uppfylld senast tre (3) månader 
efter den tjänstespecifika avtalstidens början.
Om antalet Användare vid något tillfälle under den tjänstespecifika avtalstiden 
ovan skulle understiga sjuttiofem (75) procent av Basnivån Operator Connect 
äger Telia rätt att, för varje sådan kalendermånad som basnivån för Operator 
Connect understiger sjuttiofem (75) procent, debitera en avgift per Användare 
för mellanskillnaden mellan faktiskt antal Användare och antalet Användare 
enligt Basnivån Operator Connect. Avgiften är 50 kr (exkl. moms) per 
Användare och kalendermånad.
Betalningsvillkor för Operator Connect är trettio (30) dagar. 
För att minska klimatavtrycket tar Telia ut en faktureringsavgift för 
pappersfaktura på 39 kr för Operator Connect. För att bidra till en positiv 
klimatpåverkan och undvika faktureringsavgift, vänligen välj det digitala 
alternativet. Logga in på MyBusiness för att registrera för e-faktura eller 
kontakta kundtjänst.
Version av 
Tjänstebeskrivning
För Funktionsbeskrivning (klicka här
8
) v.1.0
För Tjänstespecifikation (klicka här
9
) v.1.0
För Detaljerad tjänstespecifikation (klicka här
10
) v.1.0
Huvudabonnemang 
1,2,3
Månadsavgift
Mobil användare69kr
Fast användare0kr
Servicenummer84kr
Uppstartskostnader 
4,5,6
EngångsavgiftMånadsavgift
Uppstartskostnad5 000 kr0kr
Vägledd Pilot39 000 kr0kr
Teams konsultation, per timme1 290 kr0kr
NummerserierEngångsavgiftMånadsavgift
Inportering existerande nummerserie 0 kr0kr
Enstaka fasta nummer 200 kr0kr
Nummerserie, 10 nummer (fast) 1 000 kr0kr
Nummerserie, 100 nummer (fast) 3 000 kr0kr

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumberWithoutRA}
Referens-ID: ${ContractNumber}6
Nummerserie, 1000 nummer (fast) 9 000 kr0kr
Fotnoter Operator Connect
1.Mobil användare är ett tillägg till Telia Mobilabonnemang för företag, vilket innebär att ett Mobilabonnemang (som Telia JobbMobil) måste 
köpas separat och alla samtal som användaren ringer från Teams kommer att debiteras enligt abonnemangets prisplan.
2.Servicenummer används för Teams samtalsköer eller Teams Auto Attendants (IVR). I försäljningsobjektet Servicenummer ingår ett fast 
nummer med en dimensionerad kapacitet på 10 samtal samtidigt. Om kunden behöver högre kapacitet per Servicenummer behöver kunden 
informera Telia i leveransfasen. Telefonnumren som ska konfigureras som servicenummer måste anges i beställningen/leveransen
3.Minsta antalet användare (mobil- och fast användare) för den första beställningen måste vara 10 eller fler.
4.Uppstartskostnaden inkluderar uppstart av en "Teams tenant" till Telias tjänst.
- Importering av befintliga nummerserier från annan operatör (eller andra tjänster hos Telia)
- Tillhandahållande av nummer och samtalsprofiler till kundens "Teams Admin Center".
- Komma igång guide för hur man tilldelar användare för att ringa in Teams
- Ett leveranstillfälle, Om flera tillfällen behövs för aktivering av nummer under en tidsperiod, krävs en
- Omkonfigureringsavgift för varje tillfälle.
5.Guidad pilot av Telia inkluderar en 60 dagars pilotperiod för upp till 30 användare. Användarna kan vara en blandning av huvudabonnemang. 
Huvudabonnemang och trafikavgifter som genereras i piloten kommer att debiteras enligt ovanstående rutiner. Om kunden inte vill fortsätta 
efter pilotperioden måste dessa avslutas inom 15 dagar.
6.Teams rådgivning - Om konfigurationshjälp behövs i Microsoft Teams Admin Center kan en teknisk specialist från Telia erbjudas. Det kan till 
exempel vara migrering av ett stort antal användare/inställningar, initiering av samtalsköer eller konfigurering av telefoner. Arbetet kommer att
debiteras per time
7.https://creativehub.teliacompany.com/m/3a13ebca38bdc62e/original/Funktionsbeskrivning-Telia-Teams-Operator-Connect.pdf 
8.https://creativehub.teliacompany.com/m/897ac9a001f7fc9/original/Tjanstespecifikation-Telia-Teams-Operator-Connect.pdf  
9.https://creativehub.teliacompany.com/m/76a4dabeb9a86fd5/original/Detailed-Service-Description-Telia-Teams-Operator-Connect.pdf
Avgifter för Telia Operator Connect övrig trafik
Samtalstrafik mellan användare och grupper i lösningen är kostnadsfria inom Sverige. Det gäller även 
samtalstrafik till tjänstens röstbrevlådor. Vid utgående trafik från anslutna mobila användare gäller 
mobilabonnemangets samtalsavgifter. 
Övrig trafik debiteras enligt nedan. Exempel på övrig trafik är om du vidarekopplar servicenummer till ett 
externt nummer eller vid utgående samtal från en fast användare till externt nummer. 
Samtalsavgifter 
1,2
Talsamtal till fasta telenät samt Telias mobilabonnemang
- dygnet runt0,39 kr/min
   - öppningsavgift0,45 kr/samtal
Talsamtal till övriga mobilabonnemang inom Sverige 
1, 2
- dygnet runt0,39 kr/min
- öppningsavgift0,45 kr/samtal
Samtal till utlandet
Enligt Utlandsprislista för avtalskunder
Fotnoter Avgifter för Operator Connect Övrig Trafik
1. Gäller inte samtal till förmedlade tjänster som t.ex. nummerupplysning, betalnummer (t.ex. 099, 0771, 077, 0900, 0939, 0944).
2. Debiteras per 60-sekunders intervall.

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumberWithoutRA}
Referens-ID: ${ContractNumber}7
Nätverkstjänster
Volymåtagande30 leveransplats(er)
Särskilda villkorNätverkstjänster i denna bilaga kan avtalas med en bindningstid varunder 
Kunden åtar sig att erlägga betalning för tjänsterna under viss tid, enligt gällande
priser i Bilaga 2.
Avropsberättigade bolag med Nätverkstjänster som tecknats före den 
Tjänstespecifika avtalstidens start har rätt att uppdatera befintlig lösning och 
erhålla avtalade priser (Bilaga 2) genom att kontakta ansvarig säljare hos Telia.
Telia Bredband Pro
Tjänstespecifik 
avtalstid
${ContractStartDate} – ${ContractEndDate}
Version av 
Tjänstebeskrivning
För Funktionsbeskrivning (klicka här
5
) v.4.0
För Tjänstespecifikation (klicka här
6
) v.7.0
För Detaljerad tjänstebeskrivning (klicka här
7
)
Tjänst 
1
Månadsavgift
Bredband Pro 100 Mbit/s0 kr
Bredband Pro 1 Gbit/s0 kr
Månadsavgiften för tjänsterna ovan gäller vid 12, 24 eller 36 månader bindningstid.
Engångsavgiften för Bredband Pro 100 Mbit/s till 10 Gbit/s är 10 000 kr vid 12 månader, 2 500 kr vid 24 
månader och 0 kr vid 36 månader bindningstid.
Engångsavgiften för Bredband Pro Wireless Basic är 5 000 kr vid 12 månader,  2 500 kr vid 24 månader 
och 0 kr vid 36 månader bindningstid.
Engångsavgiften för Bredband Pro Wireless Premium 100 Mbit/s till 500 Mbit/s är 10 000 kr vid 12 
månader, 5 000 kr vid 24 månader och 0 kr vid 36 månader bindningstid.
Tillval Sekundär AccessMånadsavgift
Bredband Pro 100 Mbit/s – Sekundär Access0 kr
Bredband Pro 200 Mbit/s – Sekundär Access4 350 kr
Bredband Pro 500 Mbit/s – Sekundär Access4 350 kr
Bredband Pro 1 Gbit/s – Sekundär Access6 000 kr
Bredband Pro 2 Gbit/s – Sekundär Access8 000 kr
Bredband Pro 5 Gbit/s – Sekundär Access8 000 kr
Bredband Pro 10 Gbit/s – Sekundär Access8 000 kr
Månadsavgiften för tjänsterna ovan gäller vid 12, 24 eller 36 månader bindningstid.
Engångsavgiften är 10 000 kr vid 12 månader 2 500 kr vid 24 månader och 0 kr vid 36 
månaderbindningstid.

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumberWithoutRA}
Referens-ID: ${ContractNumber}8
Tillval Wireless Backup 
2
Månadsavgift
Bredband Pro Wireless Basic Backup0 kr
Bredband Pro Wireless Basic Backup Combo CPE400 kr
Bredband Pro Wireless Premium Backup 100 Mbit/s1 350 kr
Bredband Pro Wireless Premium Backup 250 Mbit/s1 850 kr
Bredband Pro Wireless Premium Backup 500 Mbit/s2 750 kr
Månadsavgiften för tjänsterna ovan gäller vid 12, 24 eller 36 månader bindningstid.
Engångsavgiften för Bredband Pro Wireless Basic Backup är 5 000 kr vid 12 månader, 2 500 kr vid 24 
månader och 0 kr vid 36 månader bindningstid.
Engångsavgiften för Bredband Pro Wireless Basic Backup Combo CPE är 3 000 kr vid 12 månader och 
1 500 kr vid 24 månader och 0 kr vid 36 månader bindningstid. 
Engångsavgiften för Bredband Pro Wireless Premium Backup 100 Mbit/s till 500 Mbit/s är 10 000 kr vid 
12 månader, 5 000 kr vid 24 månader och 0 kr vid 36 månader bindningstid.
Tillval Utökad SLAEngångsavgiftMånadsavgift
Bredband Pro SLA C40 kr
0 kr
Bredband Pro SLA C80 kr
0 kr
Bredband Pro SLA D150 kr
2 000 kr
Installation och Övriga Tillval 
3
EngångsavgiftMånadsavgift
Bredband Pro QoS Real Time 10 Mbit/s800 kr0 kr
Bredband Pro QoS Real Time 20 Mbit/s1 000 kr1 000 kr
Bredband Pro QoS Real Time 50 Mbit/s1 000 kr2 200 kr
Bredband Pro QoS Real Time 100 Mbit/s1 000 kr4 200 kr
Bredband Pro QoS Real Time 200 Mbit/s1 000 kr6 300 kr
Bredband Pro QoS Basic1 000 kr0 kr
Bredband Pro Quick Launch Termination10 000 kr1 700 kr
Bredband Pro Quick Launch Wireless 
Premium Termination 100 Mbit/s
10 000 kr1 950 kr
Bredband Pro Quick Launch Wireless 
Premium Termination 250 Mbit/s
10 000 kr2 550 kr
Bredband Pro Quick Launch Backup0 kr1 200 kr
Bredband Pro Quick Launch Wireless 
Premium Backup 100 Mbit/s
0 kr1 350 kr
Bredband Pro Quick Launch Wireless 
Premium Backup 250 Mbit/s
0 kr1 850 kr
Bredband Pro Quick Launch Wireless 
Premium Backup 500 Mbit/s
0 kr2 750 kr
Bredband Pro Quick Launch Combo Backup0 kr400 kr
Anslutning i fastighetsnät7 500 kr0 kr
Månadsavgiften för Bredband Pro Quick Launch Backup, Bredband Pro Quick Launch Wireless Premium 
Backup 100 Mbit/s to 500 Mbit/s och Bredband Pro Quick Launch Combo Backup gäller vid 12, 24 eller 
36 månader bindningstid. 
Engångsavgiften för Bredband Pro Quick Launch Backup är 5 000 kr vid 12 månader och 2 500 kr vid 24 
månader och 0 kr vid 36 månader bindningstid.

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumberWithoutRA}
Referens-ID: ${ContractNumber}9
Engångsavgiften för Bredband Pro Quick Launch Wireless Premium Backup 100 Mbit/s till 500 Mbit/s är 
10 000 kr vid 12 månader, 5 000 kr vid 24 månader och 0 kr vid 36 månader bindningstid.
Engångsavgiften för Bredband Pro Quick Launch Combo Backup är 3 000 kr vid 12 månader och 1 500 kr 
vid 24 månader och 0 kr vid 36 månader bindningstid.
Fotnoter Telia Bredband Pro
1.Före leverans till en leveransplats måste förutsättningskontroll utföras. Nätutbyggnadskostnader kan tillkomma vid beställningstillfället och 
redovisas innan beställning.
2.Backup Combo kan endast avropas vid nyetablering.
3.Vid beställning av tjänsten Anslutning i fastighetsnät för fiberanslutningar utför Telia ett platsbesök innan leveransdag för att säkerställa 
förutsättningarna för det arbete som ska genomföras. Om förutsättningarna för det fasta priset av Telias tjänst Anslutning i fastighetsnät inte 
mötas erhålls en offert på arbete och material. Ytterligare kostnader kan därmed tillkomma för detta arbete. Läs mer om vad som ingår i det 
fasta priset på: telia.se/anslutningifastighetsnat.
4.Avvikelser i regional tillgänglighet av SLA C4 kan förekomma. Om SLA C4 ej är tillgängligt levereras SLA C8. Förutsättningskontroll görs för 
tillgänglighet på aktuell adress
5.https://creativehub.teliacompany.com/m/4862f186142e32b9/original/Funktionsbeskrivning-Prolane.pdf
6.https://www.telia.se/dam/jcr:90b00b8b-25f0-4270-90a2-9428cf7621d4/Detaljerad-Tjänstebeskrivning-ProLane
7.https://creativehub.teliacompany.com/m/4862f186142e32b9/original/Funktionsbeskrivning-Prolane.pdf 

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumberWithoutRA}
Referens-ID: ${ContractNumber}10
Ort & Datum
 
Kundens underskrift (firmatecknare/behörig företrädare)
 
Namnförtydligande`;
  await utilityFunctionLocal.VerifyContractPDFDocumentContent(page, expectedText);



  //Verify contract pdf content
var expectedText = `Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430–0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumberWithoutRA}
Referens-ID: ${ContractNumber}1
Beställning
#${FAQuoteNumber}
Detta dokument dokumenterar en beställning av Tjänster enligt Ramavtal RA-
${ActiveContractNumberWithoutRA}.
De tjänster, avgifter och volymer som anges i beställningen följer de villkor som anges i Ramavtalet. 
Beställning har överenskommits mellan följande parter:
Teliabolag (nedan kallat Telia)Företag (nedan kallad Kunden)
Telia Sverige AB
 
5564300142
DoNotUse_PlaywrightTestAccount 
49883
 
5599975132
LeverantörOrganisations-
nummer
KundOrganisations-
nummer
Stjärntorget 116956Östanlidsvägen 370375
AdressPostnummerAdressPostnummer
Solna Örebro 
Ort
 
Ort
 
Soho Ds SalesRep
+91 
9505225143Test Yogesh Jadhav
SäljareTelefonnummerKontaktpersonTelefonnummer
dhanashri.ronge@teliacompany.co
m yogesh.jadhav@teliacompany.com 
E-post
 
 
E-post
 
 
Dokumentet är endast giltigt om Ramavtal RA-${ActiveContractNumberWithoutRA}  är signerat av båda parter. 
Orderläggning av Tjänst genomförs när dokumentet är signerat. Kunden förbinder sig att tillhandahålla
kompletterande information för orderläggningen till Telia vid behov.

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430–0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumberWithoutRA}
Referens-ID: ${ContractNumber}2

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430–0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumberWithoutRA}
Referens-ID: ${ContractNumber}3
Nätverkstjänster
Leveranstid
Leverans av Nätverkstjänster kommer att ske snarast möjligt efter undertecknande av detta dokument 
och under förutsättning att Telia fått nödvändig leveransinformation från Kunden. Detaljerad 
information om vad som krävs för leverans finns i tjänstebeskrivningen för respektive beställd tjänst, 
som finns länkade i bilaga 2 av ramavtalet. Leveransen kan ske i delleveranser.
Beräknat leveransdatum kommer specificeras i samband med beställningsbekräftelsen.
Priser
TjänstAntal
Engångs-
avgift
Månads-
avgift
TELIA BREDBAND PRO  24 - MÅNADER BINDNINGSTID
Bredband Pro 100 Mbit/s72 500 kr0 kr
Bredband Pro 1 Gbit/s72 500 kr0 kr
Tillval Sekundär Access
Bredband Pro 100 Mbit/s – Sekundär 
Access
72 500 kr0 kr 
Tillval Wireless Backup
Bredband Pro Wireless Basic Backup72 500 kr0 kr 
Tillval Utökad SLA
Bredband Pro SLA C470 kr0 kr 
Bredband Pro SLA C870 kr0 kr 
Installation och Övriga Tillval
Bredband Pro QoS Real Time 10 Mbit/s7800 kr0 kr 
Summa75 600 kr0 kr 
KOMMENTARSAMMANSTÄLLNING
TOTAL ENGÅNGSAVGIFT75 600 kr
TOTAL MÅNADSAVGIFT0 kr

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430–0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumberWithoutRA}
Referens-ID: ${ContractNumber}4
Leveransplatser
Leveransplats                                                                                                                                       SLA C4 MÖJLIGT
EVENEMANGSGATAN 24 , SOLNA                                                                                             Ja
EVENEMANGSGATAN 18 , SOLNA                                                                                             Ja
Dokumentet har upprättats i två (2) exemplar, av vilka Parterna tagit var sitt. 
    
Ort & DatumOrt & Datum
    

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430–0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ActiveContractNumberWithoutRA}
Referens-ID: ${ContractNumber}5
Telias underskrift Kundens underskrift (behörig 
företrädare)
    
NamnförtydligandeNamnförtydligande`;
  await utilityFunctionLocal.VerifyInitialOrderPDFDocumentContent(page, expectedText);
   
  
  
  //Close all browserss
  await context.close();  
});



