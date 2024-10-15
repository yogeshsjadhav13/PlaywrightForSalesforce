const { test } = require('@playwright/test');
const { POManager } = require('../../../../main/utilities/POManager');
const { UtilityFunctions } = require('../../../../main/utilities/UtilityFunctions');
const TestCaseName = 'TC009_MCSales_RegressionTest';


test('TC009_MCSales_RegressionTest_SOHO_NewSales-Verify-quote-contract-document', async function ({ browser }) {

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
  var FAQuoteNumber = await utilityFunctionLocal.RunSOQLQuery("Select QuoteNumber from Quote where OpportunityId='" + OpportunityID + "' and (Name like '%_FA%' or Name like '%_RNGN_Version1%')");
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
var expectedText = `Offert



DoNotUse_PlaywrightTestAccount 37577

Offertdatum: ${CreatedDate}

Offerten är giltig i 30 dagar från offertdatum.

Offertnummer: ${QuoteNumber}



















DoNotUse_PlaywrightTestAccount 37577

Telia Sverige AB

5599920088

556430 - 0142

Säte: Stockholm

Adress: 169 94 Solna

Test Yogesh Jadhav

RA Sales Rep

yogesh.jadhav@teliacompany.com

dhanashri.ronge@teliacompany.com



+46 853684000



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















Jobbmobil 5 GB

5

0 kr

50 kr















Summa





0 kr

250 kr





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





Telia Touchpoint Plus (Antal för basnivå: 300, Avtalstid: 36 månader)















Användarpaket











Touchpoint Bas

5

0 kr

9 kr





Touchpoint Mobil

5

0 kr

14 kr





Statistik











Statistik Installation

1

900 kr

0 kr





Statistik Bas

1

0 kr

90 kr





Inspelning











Inspelning Installation

1

9 000 kr

0 kr





Inspelning per användare

5

0 kr

99 kr





Inspelning lagring 3 år, tillägg per användare

5

0 kr

49 kr





Svarsservice











Svarsservice 10

1

0 kr

4 380 kr





Övriga tillval











Webkatalog Månadsavgift

1

0 kr

780 kr





Webkatalog AD-integrerad installation

1

45 000 kr

0 kr





Utbildning











Administratörsutbildning Webb 3 timmar

1

5 990 kr

0 kr





Support











Slutanvändarsupport

10

0 kr

32 kr





Införande











Standardkonfiguration

1

0 kr

0 kr















Summa





60 890 kr

6 425 kr











TJÄNSTER SOM INGÅR VID STANDARDKONFIGURATION FÖR TOUCHPOINT PLUS



5 st

Max antal användargrupper

3 st

Max antal funktionsnummer (ACD/IVR/Sökgrupper)





Import av Användare



Tilldela nummer till röstbrevlåda





Ett driftuppsättningsställe



Skapa standardiserade samtalsregler





Uppläggning av en nummerserie



Inställningar för röstbrevlåda





Skapa ett huvudnummer



Ett fakturaställe





Skapa ett schema



En kontaktperson hos kunden



KOMMENTAR



SAMMANSTÄLLNING



Test Automation Kommentarer offert





TOTAL ENGÅNGSAVGIFT 1

60 890 KR



TOTAL MÅNADSAVGIFT

6 675 KR













1 Totala engångsavgiften visar den faktiska kostnaden efter avdragen engångsavgift.

Beställning av tjänster till ovan priser förutsätter att ni har ett Ramavtal med Telia. Om ni redan har ett Ramavtal så kontaktar ni Telia för att beställa. Om ni inte har ett Ramavtal så blir nästa steg att teckna ett Ramavtal där vi specificerar vilka tjänster som ska ingå och villkoren för detta.`;
  await utilityFunctionLocal.VerifyQuoteWordDocumentContent(page, expectedText);


  //LTAT-32328 - SFI upgrade issue
  await page.goto(secretsData.get("environmentURL") + "/" + ContractID);

  //Verify contract pdf content
var expectedText = `Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säter: Stockholm
Org. Nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: 
Referens-ID: ${ContractNumber}1
Välkommen till 
Telia
Ramavtal för DoNotUse_PlaywrightTestAccount 37577 tjänster hos Telia
Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}

Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}2
Ramavtal för kundens tjänster hos Telia
Ramavtal RA-${ContractNumber} (Ramavtalet)
Ramavtal har ingåtts mellan följande parter
Teliabolag (nedan kallat Telia)Företag (nedan kallad Kunden)
Telia Sverige AB 5564300142
DoNotUse_PlaywrightTestAccount 
37577 5599920088
LeverantörOrganisationsnummerKundOrganisationsnummer
Stjärntorget 116956Teknologgatan 441132
AdressPostnummerAdressPostnummer
Solna Göteborg 
Ort
 
Ort
 
RA Sales Rep+46 853684000Test Yogesh Jadhav
SäljareTelefonnummerKontaktpersonTelefonnummer
dhanashri.ronge@teliacompany.com yogesh.jadhav@teliacompany.com
 
E-post
  
E-post
  
1Allmänt om Ramavtalet
Genom att teckna detta avtal (Ramavtalet) har Kunden möjlighet att beställa Tjänster av Telia under den 
avtalstid som anges i punkt 5.
Kunden kan beställa Tjänster med referens till Ramavtalet i Telias olika försäljningskanaler. Telia 
tillhandahåller Tjänsterna efter bekräftad beställning.
De Tjänster (Tjänster) som Kunden kan beställa anges i Tjänstekatalogen (Bilaga 1). De priser som gäller 
för Tjänsterna finns på https://www.Telia.se/foretag/om/priser
Tjänstekatalogen och Prislistan kan förändras under Ramavtalets avtalstid. Beställning av Tjänster sker 
därför alltid enligt vid var tid gällande Tjänstekatalog och Prislista. Information om gällande Tjänstekatalog
och Prislista tillhandahålls av Telia på begäran eller annars vid Kundens beställning.
Kunden och Telia kan komma överens om särskilda kundunika priser, se punkt 3.
För Ramavtalet och beställda Tjänster gäller Telias vid var tid gällande Telias allmänna villkor för tjänster 
till företag (Bilaga 4). I en tjänsts Tjänstebeskrivning kan dock anges att ett annat allmänt villkor ska 
tillämpas för en viss Tjänst.
2Tjänstekatalog och Tjänstebeskrivning
I Tjänstekatalogen (Bilaga 1) anges de Tjänster som Kunden kan beställa enligt Ramavtalet. Eftersom 
Tjänstekatalogen och innehållet i Tjänsterna kan ändras under avtalstiden ska Telia meddela Kunden 
eventuella förändringar vid Kundens beställning. 
Omfattningen av en Tjänst beskrivs närmare i följande dokument:
a)Funktionsbeskrivning som beskriver grundfunktioner och tillvalsfunktioner för Tjänsten.
b)Tjänstespecifikation som anger omfattning och begränsningar för Tjänsten.
c)Detaljerad tjänstebeskrivning.
Funktionsbeskrivning, Tjänstespecifikation och Detaljerad tjänstebeskrivning benämns tillsammans som 
Tjänstebeskrivning.
3Ramavtalets Prislista och Kundunika priser
Vid var tid gällande priser för de Tjänster som Kunden kan beställa enligt Ramavtalet finns angivna på 
https://www.Telia.se/foretag/om/priser. 
Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}

Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}3
Om Kunden och Telia kommer överens om särskilda kundunika priser med en eventuell tjänstespecifik 
avtalstid för en viss Tjänst så anges detta i bilagan Kundunika priser (Bilaga 2). 
Alla priser är exklusive moms.
4Avropsberättigade bolag
De bolag som anges i Bilaga 3 till Ramavtalet (Avropsberättigade bolag) har rätt att avropa enligt 
Ramavtalet.
5Avtalstid och uppsägning
Ramavtalet gäller för en initial avtalstid från ${ContractStartDate} till och med ${ContractEndDate}.
Om inte Ramavtalet sagts upp senast tre (3) månader före den initiala avtalstidens slut, förlängs det 
automatiskt att gälla tillsvidare med tre (3) månaders uppsägningstid. Uppsägning av Ramavtalet ska vara 
skriftlig och behörigen undertecknad.
En överenskommelse om kundunika priser enligt Bilaga 2 kan ha en tjänstespecifik avtalstid som sträcker 
sig längre fram i tiden än den avtalstid som gäller för Ramavtalet. Ramavtalet ska i sådant fall fortsätta att 
gälla i tillämpliga delar till dess att även en eventuell längre tjänstespecifik avtalstid enligt Bilaga 2 löpt ut.
När Ramavtalet upphört fortsätter Tjänsterna att tillhandahållas. Telia äger i dessa fall rätt till att applicera 
vid var tid gällande ordinarie listprislista till dess att Tjänsterna sägs upp alternativt ny överenskommelse 
upprättats.
6Bilageförteckning
Till Ramavtalet hör de bilagor som anges nedan. Förekommer mot varandra stridande villkor i Ramavtalet 
gäller villkoren i Ramavtalets huvudtext före villkoren i bilagorna och bilagorna sinsemellan i den ordning 
som anges i denna bilageförteckning. Om det finns särskilda kundunika priser i Bilaga 2 gäller denna 
bilaga dock alltid med företräde framför övriga bilagor. Senare tillkomna bilagor ska gälla före äldre 
bilagor av samma typ.
1.Tjänstekatalog
2.Kundunika priser
3.Avropsberättigade bolag
4.Telias allmänna villkor för tjänster till företag (www.telia.se/foretag/om/villkor )

Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}4
Ramavtalet har upprättats i två (2) exemplar, av vilka Parterna tagit var sitt.
    
Ort & DatumOrt & Datum
    
Telias underskrift Kundens underskrift (behörig företrädare)
    
NamnförtydligandeNamnförtydligande

Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}5
Bilaga 1 - Tjänstekatalog vid avtalstecknande till avtal 
RA-${ContractNumber}
De tjänster som omfattas av Ramavtalet framgår av denna tjänstekatalog. Vid var tid gällande priser för 
Tjänsterna anges på https://www.Telia.se/foretag/om/priser. Kundunika priser som avtalat mellan parterna
framgår av Bilaga 2.
För varje tjänst finns en Tjänstebeskrivning som tillhandahålls av Telia på begäran.
Funktionsbeskrivning, Tjänstespecifikation och Detaljerad Tjänstebeskrivning benämns tillsammans 
Tjänstebeskrivning. 
a) Funktionsbeskrivning som beskriver grundfunktioner och tillvalsfunktioner för Tjänsten.
b) Tjänstespecifikation som anger omfattning och begränsningar för Tjänsten.
c) Detaljerad Tjänstebeskrivning.
Följande tjänster, grupperade i fyra tjänstegrupper, går att beställa vid tidpunkt för avtalstecknande:
•Mobilt och växel
•Telia Jobbmobil
•Telia Mobilt Bredband Företag
•Telia Försäkring Mobiltelefon
•Telia Touchpoint Plus
•Telia Smart Connect
•Telia Operator Connect
•Samarbetstjänster och IT-lösningar
•Telia Microsoft 365
•Telia Smart Säkerhet
•Operativ IT och Helpdesk 
•Telia Slutanvändarsupport
•Telia IT-support Standard
•Telia IT-support Plus
•Telia IT-support Premium - Telia IT-avdelning
•Telia IT-support Premium - Telia IT-avdelning Start
•Nätverkstjänster 
•Telia Bredband Start
•Telia Bredband Plus
•Telia Bredband Pro
•Telia Datanet
•Telia Cloud VPN Wifi/Lan 
•Telia Cloud VPN SD-Wan/Firewall

Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}6
Telia Jobbmobil
Enkel och kostnadseffektiv kommunikation – både hemma och utomlands
Mobilabonnemang för företag.
•Sveriges bästa mobilnät fyra år i rad samt Sveriges nöjdaste företagskunder.
•Surfmängd efter behov från 1 GB upp till obegränsat.
•Ring och skicka meddelanden inom EU/EES samt hem till Sverige för samma pris som inom 
Sverige när ni är utomlands. Ni använder samma surfpaketering inom EU/EES som i Sverige.
Telia Smart Connect
Effektiv kommunikation oavsett plats
Molnbaserad växellösning som säkerställer kontakten mellan anställda och kunder och möjliggör enkel 
kommunikation.
•Låt anställda arbeta utan begränsningar där de är. 
•Enkla gränssnitt i plattformen och ”drag-and-drop” funktionalitet ger en bra överblick och gör det 
enkelt att anpassa lösningen efter behov.
•Se status och tillgänglighet hos medarbetare genom kalenderintegration. 
•Tillgång till statistik och uppföljning både i realtid och i efterhand.
Telia Operator Connect
Fast och mobilt direkt i Microsoft Teams
Med Operator Connect integreras all telefoni – fast och mobilt direkt in i Microsoft Teams.
•Enkel administration via Teams Admin Center: Telia kommer automatiskt att provisionera alla 
nummer direkt till Teams, så att det enkelt kan tilldelas användare i Microsoft Teams Admin 
Center.
•Telefoni i operatörsklass: Telia är integrerade direkt i Microsofts moln med full redundans. 
Detta säkerställer en telefonupplevelse i operatörsklass direkt i Microsoft Teams
•Pålitlig support: För att få hjälp med kvalitets-och incidentproblem får du den hjälp du behöver 
med kombinerade resurser från Telia och Microsoft.
Telia Touchpoint Plus
Jobba effektivare med molnväxel
Touchpoint Plus är en molnbaserad växellösning för lite större bolag som kan skräddarsys helt utifrån 
Kundens behov. Växelfunktionerna kan användas i både mobil, telefon, surfplatta eller dator. Låt varje 
användare få det som passar bäst. 
•Virtuell – Vid behov av anknytning i växeln
•Bas – Vid behov av en enkel användare
•Mobil – För den mobila användaren
•Unified – För valfrihet av terminal och samlad kommunikation
Företaget slipper tänka på driften – den sköter Telia. 
Telia Försäkring Mobiltelefon
Smart telefon, smart försäkring
Försäkring för mobiltelefon.
•Komplettera garantin med ett försäkringsskydd för mobiltelefon som täcker de flesta skador av de
mest varierande karaktärer.
•Inget åldersavdrag.

Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}7
•Tre fria månader, till ett värde utifrån aktuell prislista. 
Telia Microsoft 365
Gör kontoret tillgängligt var som helst, när som helst
Abonnemang för Microsoft 365.
•Telia Microsoft 365 innehåller de välkända Microsoft Office applikationerna tillsammans med 
kraftfulla molntjänster till ett pris per månad och användarlicens.
•Telia erbjuder svensktalandesupport via telefon eller e-post samt ett webbgränssnitt där Kunden 
själv kan öka och minska användarlicenser efter behov.
•Telia erbjuder uppstartstjänster och support på plats för Microsoft 365 till ett fast pris per 
uppdrag. 
Telia Slutanvändarsupport
Dedikerad slutanvändarsupport för hela företaget
Slutanvändarsupport är för företagets alla. Användare kan få hjälp med funktionalitet, inställningar, 
hanteringsproblem och allmän hjälp för att kunna använda Microsoft 365 eller mobila enheter.
•Telia kan agera 1:a eller 2:a linjens support åt Kunden beroende på hur behovet ser ut. 
•Ordinarie öppettider är helgfria vardagar kl. 08.00 – 17.00 CET.
•Support sker på svenska och engelska. 
Telia IT-support Standard
Er IT-support för användaren
•Support online för användarnas IT - Vi hjälper era medarbetare med alla problem och frågor kring 
deras enheter (dator, mobil, surfplatta) och mjukvara såsom Microsoft 365. 
•Snabbt och personligt - Vi är er IT-support där ni får tillgång till ett helt expertteam som är redo att
ge er full support och ser till att användarnas IT fungerar som det ska.
•Få koll på kostnaderna - Tydliga priser med fast månadsavgift per användare.
Telia IT-support Plus
Er IT-support för både användaren och er gemensamma IT-miljö
•Support online för användarnas IT - Vi hjälper era medarbetare med alla problem och frågor kring 
deras enheter (dator, mobil, surfplatta) och mjukvara såsom Microsoft 365. 
•Support online för er IT-administratör - Vi stöttar och ger support till era administratörer på era 
gemensamma system, enheter och nätverk samt centrala delar i Microsoft 365 och Telias övriga 
tjänster. 
•Snabbt och personligt - Vi är er IT-support där ni får tillgång till ett helt expertteam som är redo att
ge er full support och ser till att både användarnas och företagets gemensamma IT fungerar som 
det ska.
•Få koll på kostnaderna - Tydliga priser med fasta månadsavgifter per användare.  
Telia IT-support Premium – IT-avdelning
Mycket mer än bara IT-support
•Er egen IT-avdelning - Telia har full koll på er IT-miljö.
•Snabbt och personligt - Telia har ett helt expertteam som ger er full support och arbetar proaktivt 
med er IT-miljö.
•Monitorering och övervakning - Telia har koll på era enheter och hanterar larm och incidenter. 

Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}8
•Säker IT-miljö - Som er IT-partner arbetar vi aktivt tillsammans med er för att utveckla er IT-miljö 
och skapa en säker IT-miljö utifrån era behov.  
Få koll på kostnaderna - Tydliga priser med fasta månadskostnader. 
Telia IT-support Premium – IT-avdelning Start
IT-support och monitorering när ni behöver
•Er egen IT-avdelning - Telia har full koll på er IT-miljö.
•Snabbt och personligt - Telia IT-avdelning arbetar proaktivt och har ett helt expertteam som är 
redo att ge er full support.
•Monitorering och övervakning - Telia har koll på era enheter och hanterar larm och incidenter. 
•Låt Telia ta hand om er IT - Med Start-tjänsten avgör ni när Telia ska agera och ni betalar för 
support och IT-rådgivning när ni behöver det.
Telia Smart Säkerhet
Skydda företaget mot virus och skadlig kod
Säkerhetstjänst med molnbaserad adminportal och skyddsklienter för datorer, mobiler, och servrar.
•Snabb, skalbar implementering. Distribuerar, hanterar och övervakar säkerheten för klienter och 
relaterade tjänster från ett intuitivt webbgränssnitt.
•Skyddar anslutna enheter mot olika typer av hot, såsom gisslanprogram, dataintrång och skadlig 
kod.
•Mobilsäkerhet i ett paket: anti-malware, stöldskydd och VPN som förhindrar avlyssning av e-post 
och onlinekommunikation.
Nätverkstjänster
Nätverkstjänster är en portfölj av tjänster som möjliggör ett sammanhängande och säkert nät på och 
mellan arbetsplatsen/arbetsplatserna med Telia som ansvarig leverantör.
•Välj de delar som passar och komplettera efter behov. 
•Nätverkstjänsterna övervakas 24/7 av Telias personal och förebyggande underhåll utförs för att 
garantera tjänstens funktion under avtalstiden. 
•Vid extra höga krav på tillgänglighet finns proaktiv alarmhantering och utökad SLA som tillval för 
många av tjänsterna.
•Telias nätverkstjänster avtalas till ett fast pris per månad för en förutsägbar funktion och kostnad. 
Telia Bredband Start
Snabb och stabil uppkoppling
•Surfa och skicka e-post blixtsnabbt, använd interaktiva tjänster och ladda ner stora filer utan 
problem.
•Välj hastigheter upp till 1 Gbit/s via fiber och upp till 250 Mbit/s via mobilnätet.
•Router ingår i tjänsten.
Telia Bredband Plus
Ett kraftfullt bredband med garanterad bandbredd
•Tjänsten passar företag som har höga krav på driftsäkerhet, tillgänglighet och tillförlitlighet.
•Anslutning till TeliaNet, Telias eget IP-nät som når över 3000 orter i Sverige och direktkoppling 
mot Telias samarbetspartners nätverk som sträcker sig till de flesta delar av Europa, USA och 
Asien.
•Service i världsklass och installation på plats av tekniker. Fel åtgärdas inom 12 timmar.
•Kan levereras till fastigheter som inte är fiberanslutna.

Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}9
Telia Bredband Pro
Högkvalitativt bredband med ett nät i världsklass
•Lämpad för alla slags lösningar, även de mest verksamhetskritiska.
•Anslutning till TeliaNet, Telias eget IP-nät som når över 3000 orter i Sverige och direktkoppling 
mot Telias samarbetspartners nätverk som sträcker sig till de flesta delar av Europa, USA och 
Asien.
•Garanterade hastigheter, fast IP och prioriterad trafik. Överföringskapacitet upp till 10 Gbit/s.
•Aktiv övervakning dygnet runt alla dagar på året och fel åtgärdas inom 8 timmar. Installation på 
plats av tekniker.
•Kan levereras till fastigheter som inte är fiberanslutna.
Telia Datanet
Flexibel global kommunikationslösning skräddarsydd efter företagets behov
•Länkar samman geografiskt spridda kontor via ett privat IP-nätverk.
•Säker och full tillgång till alla system oberoende var i världen företaget återfinns.
•Oslagbar täckning, proaktiv övervakning och support dygnet runt.
Lägg till eller ta bort funktioner och tjänster efter behov.
Telia Cloud VPN Wifi/LAN
Ett förstklassigt Wifi för företagets anställda och gäster
•Wifi och fast uppkoppling som tjänst, modulär och lätt utbyggningsbar tack vare Wifi 
accesspunkter och fasta LAN switchar med central hantering i molnet.
•Wifi täckning designas enkelt med hjälp av en tvådimensionell ritning över lokalen.
•Gästnät i Wifi med inloggningsportal.
•Nya insikter och utökade beslutsunderlag tack vare webbportal som ger statistik över användning. 
Telia Cloud VPN SD-WAN/Firewall
Nästa generations kommunikationsplattform
•Molnmanagerad nätlösning med SD-WAN och säkerhet, speciellt fördelaktig för den geografiskt 
spridda verksamheten.
•Trafikstyrning och säker uppkoppling genom automatiskt VPN över internet.
•Brandvägg med best-practise standardinställning.
•Säkerhetslicens som val för utökat skydd mot malware, för intrångsskydd och filtrering av innehåll.
•Övervakning och analyser i webbportal.

Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}10
Bilaga 2 – Kundunika Priser RA-${ContractNumber}
Nedan anges kundunika priser för överenskomna Tjänster till Ramavtal RA-${ContractNumber}.
Med volymåtagande avses den volym av Tjänsten som Kunden förbinder sig att köpa under den 
tjänstespecifika avtalstiden.
För de abonnemang, funktioner, avgifter, osv. som inte omfattas av kundunika priser gäller vid var tid 
gällande priser som finns angivna på https://www.Telia.se/foretag/om/priser.
När den tjänstespecifika avtalstiden upphört fortsätter Tjänsterna att tillhandahållas. Telia äger i dessa fall 
rätt till att applicera vid var tid gällande ordinarie listprislista till dess att Tjänsterna sägs upp alternativt ny 
överenskommelse upprättats.
De kundunika priserna gäller för Tjänst som tillhandahålls enligt den Tjänstebeskrivning som anges nedan.
Telia har rätt att en gång per år justera de priser och avgifter som anges i denna bilaga med hänsyn till 
förändringar i följande index: SCB:s Konsumentprisindex (KPI) (1980 = 100). En prisjustering med stöd av 
indexförändring kan första gången ske tidigast sex (6) månader efter det att parterna ingått avtal för den 
relevanta Tjänsten. Telia meddelar Kunden om den aktuella indexförändringen senast trettio (30) dagar 
innan förändringen träder i kraft. Indextalet för den oktobermånad som infaller året före det år då den 
relevanta Tjänsten ingås (basmånad för den Tjänsten) utgör indexets bastal för den aktuella Tjänsten. Om 
indextalet i någon påföljande oktobermånad (avräkningstidpunkt) har stigit i förhållande till indexets 
bastal ska priser och avgifter i denna bilaga justeras för den aktuella Tjänsten med hänsyn till detta.

Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}11
Telia Jobbmobil och Mobilt Bredband Företag
Tjänstespecifik 
avtalstid
${ContractStartDate} – ${ContractEndDate}
VolymåtagandeBasnivå: 300
Särskilda villkorDe kundunika priser som anges i Bilaga 2 gäller för de abonnemang som 
Kunden har hos Telia vid den tjänstespecifika avtalstidens början och för varje
nytt Telia Jobbmobil-abonnemang Kunden därefter beställer.
Telia Jobbmobil enligt Bilaga 2 ersätter motsvarande abonnemang och 
tjänster som finns angivna på https://www.Telia.se/foretag/om/priser. Det är 
endast möjligt att beställa Telia Jobbmobil-abonnemang enligt Bilaga 2 under
den tjänstespecifika avtalstiden.
De kundunika priserna gäller från och med den tjänstespecifika avtalstidens 
början under förutsättning att Bilaga 2 kommit Telia tillhanda senast tio (10) 
arbetsdagar före den tjänstespecifika avtalstidens början.
Prissättningen i Bilaga 2 är grundad på den mellan Parterna överenskomna 
basnivån. Med basnivån (Basnivån) menas det antal Telia Jobbmobil 
abonnemang som Kunden och i förekommande fall Avropsberättigade bolag 
åtar sig att ha kopplade till Ramavtalet under den tjänstespecifika avtalstiden. 
Basnivån ska vara uppfylld senast tre (3) månader efter den tjänstespecifika 
avtalstidens början.
Om antalet abonnemang vid något tillfälle under den tjänstespecifika 
avtalstiden skulle understiga sjuttiofem (75) procent av Basnivån äger Telia 
rätt att, för varje sådan kalendermånad som Basnivån understiger sjuttiofem 
(75) procent, debitera en avgift per abonnemang för mellanskillnaden mellan 
faktiskt antal abonnemang och antalet abonnemang enligt Basnivån. Avgiften 
är 300 kr (exkl. moms) per abonnemang och kalendermånad.
Betalningsvillkor för Jobbmobil är trettio (30) dagar.
För att minska klimatavtrycket tar Telia ut en faktureringsavgift för 
pappersfaktura på 39 kr för Jobbmobil. För att bidra till en positiv 
klimatpåverkan och undvika faktureringsavgift, vänligen välj det digitala 
alternativet. Logga in på MyBusiness för att registrera för e-faktura eller 
kontakta kundtjänst.
Version av 
Tjänstebeskrivning
För Funktionsbeskrivning (klicka här
23
) v.2.0
Telia Jobbmobil
Surfa, ring, sms:a och mms:a för samma pris i länder inom EU/EES som inom Sverige 1, 2
Abonnemang 
2,3,4
EngångsavgiftMånadsavgift
Jobbmobil 5 GB0 kr50 kr
Jobbmobil 20 GB0 kr299 kr
Jobbmobil 50 GB0 kr339 kr

Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}12
Jobbmobil Obegränsad0 kr439 kr
Samtal 
1,6,8,9
ÖppningsavgiftMinutavgift
Talsamtal till Telias svenska mobilabonnemang, till 
mobilsvar samt till fasta telenät i Sverige 
0 kr/samtal0 kr/minut
 12
Talsamtal till mobilabonnemang hos övriga svenska 
operatörer 
1, 6, 9
0 kr/samtal0 kr/minut
 12
Meddelanden till svenska mobilabonnemang 
1,11
Avgift per meddelande
SMS, dygnet runt0 kr/meddelande 
13
MMS, dygnet runt0 kr/meddelande 
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
i MyBusiness89kr/månad
Anslutning Klocka 
17
i MyBusiness59kr/månad
Detaljspecifikationi MyBusiness20kr/spec
Fakturadelningav kundtjänst20kr/månad
Samtalsgrupperingav kundtjänst10kr/månad
Nummerreservationav kundtjänst100kr/nr/år
Till Europa
18
i MyBusiness89kr/månad
Till Grannland Företag
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
80-Obegränsad
Jobbmobil
Obegränsad Plus
Ej vald i avtaletEj vald i avtalet
Surf i utlandet- kr/månad199 kr/månad199 kr/månad199 kr/månad199 kr/månad- kr/månad
Samtal i utlandet- kr/månad199 kr/månad199 kr/månad199 kr/månad199 kr/månad- kr/månad
Maxhastighet 
1500Mbit/s
- kr/månad99 kr/månad99 kr/månad99 kr/månad99 kr/månad0 kr/månad
Samtal från Sverige till utlandet 
21
Pris
Till Utland 
Företag

Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}13
Öppningsavgift 0,59 kr/samtal0,49 kr/samtal
Norden: Danmark, Finland, Norge0,99 kr/minut0,59 kr/minut
Europa 1: Belgien, Bulgarien, Cypern, Estland, Frankrike, Grekland, 
Irland, Island, Italien inkl. Vatikanstaten, Kroatien, Lettland, 
Liechtenstein, Litauen, Luxemburg, Malta, Monaco, Nederländerna, 
Polen, Portugal, Rumänien, Schweiz, Slovakien, Slovenien, Spanien, 
Storbritannien, Tjeckien, Tyskland, Ungern, Österrike
Världen 1: Australien, Hong Kong, Japan, Kanada, Kina, Nya Zeeland, 
Singapore, Sydkorea, Taiwan, Thailand, USA
1,19 kr/minut
1,19 kr/minut
0,99 kr/minut
0,99 kr/minut
Europa 2: Albanien, Andorra, Bosnien-Hercegovina, Färöarna, 
Gibraltar, Makedonien, Moldavien, Montenegro, Ryssland, San Marino, 
Serbien, Turkiet, Ukraina
Världen 2: Argentina, Azerbajdzjan, Brasilien, Chile, Dominikanska 
Rep., Egypten, Georgien, Indien, Indonesien, Israel, Kazakstan, 
Malaysia, Mexiko, Nepal, Sydafrika, Tadjikistan, Uzbekistan
2,19 kr/minut
2,19 kr/minut
1,99 kr/minut
1,99 kr/minut
Världen 3: Afghanistan, Algeriet, Angola, Anguilla, Antigua och 
Barbuda, Armenien, Aruba, Bahamas, Bahrain, Bangladesh, Barbados, 
Belize, Benin, Bermuda, Bhutan, Bolivia, Botswana, Brunei, Burkina 
Faso, Burundi, Caymanöarna, Comorerna, Centralafrikanska Rep., 
Colombia, Costa Rica, Djibouti, Dominica, Ecuador, Ekvatorialguinea, 
Elfenbenskusten, El Salvador, Eritrea, Etiopien, Fijiöarna, Filippinerna, 
Franska Guyana, Franska Polynesien, Förenade Arabemiraten, Gabon, 
Gambia, Ghana, Guadeloupe, Guam, Guinea, Grenada, Grönland, 
Guatemala, Guyana, Haiti, Honduras, Irak, Iran, Jamaica, Jordanien, 
Kambodja, Kamerun, Kenya, Kirgizistan, Kongo, Kongo Dem. Rep., 
Kosovo, Kuba, Kuwait, Laos, Libanon, Libyen, Marocko, Martinique, 
Mongoliet, Mocambique, Myanmar, Namibia, Nicaragua, Niger, 
Nigeria, Oman, Pakistan, Palestina, Panama, Paraguay, Peru, Qatar, 
Rwanda, Saudiarabien, Senegal, Sri Lanka, Sudan, Surinam, Syd Sudan,
Syrien, Tanzania, Tchad, Togo, Trinidad och Tobago, Tunisien, 
Turkmenistan, Uganda, Uruguay, Venezuela, Vietnam, Vitryssland, 
Yemen, Zambia, Zimbabwe
4,99 kr/minut4,99 kr/minut
Världen 4: Amerikanska Jungfruöarna, Amerikanska Samoa, 
Ascension, Antarktis, Brittiska Jungfruöarna, Cooköarna, Diego Garcia, 
Falklandsöarna, Guinea Bissau, Kap Verdeöarna, Kiribati, Lesotho, 
Liberia, Macao, Madagaskar, Malawi, Maldiverna, Mali, Marshallöarna, 
Mauretanien, Mauritius, Mayotte, Mikronesien, Montserrat, Nauru, 
Nederländska Antillerna, Niue, Nordkorea, Norra Marianaöarna, Nya 
Kaledonien, Palau, Papua Nya Guinea, Puerto Rico, Reunion, Saint 
Lucia, Saint Helena, Saint Kitts och Nevis, Saint Pierre och Miquelon, 
Saint Vincent och Grenadinerna, Samoa, Sao Tome och Principe, 
Seychellerna, Sierra Leone, Sint Maarten, Swaziland, Tonga, 
Salomonöarna, Somalia, Tokelau, Turks och Caicosöarna, Tuvalu, 
Vanuatu, Wallis och Futunaöarna, Östtimor
9,90 kr/minut9,90 kr/minut
Meddelanden från Sverige till utlandetPrisTill Utland Företag
SMS från Sverige till utländska telefonnummer 
(oavsett destination)
1,29 kr/meddelande1,29 kr/meddelande
MMS från Sverige till utländska telefonnummer 
(oavsett destination)
1,59 kr/meddelande1,59 kr/meddelande

Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}14
Fotnoter Telia Jobbmobil (fotnot 5, 7, 10 gäller endast Jobbmobil BAS)
1.Pris per minut/sms/mms som rings/skickas inom/mellan länder inom EU/EES styrs av aktuellt pris i för Kunden befintliga abonnemang i Sverige. 
Vad som anges ovan gäller emellertid inte för samtal/sms/mms som rings/skickas från Sverige. I sistnämnda fall gäller istället prislistan för samtal 
och meddelanden från Sverige till utlandet.
2.Surf inom EU/EES kan göras för samma pris och i samma utsträckning som i Sverige. För abonnemang med en surftjänst större än 50 GB är dock 
den maximala surfmängden inom EU/EES begränsad till 50 GB, se www.telia.se/foretag/utomlands 
3.Kretskopplad data ingår ej i vald surfmängd utan prissätts per minut, se www.telia.se/jobbmobil
4.Jobbmobil <10 GB: Surfhastighet i 3G <32 Mbit/s, normal hastighet 2–10 Mbit/s. Surfhastighet i 4G och 5G: <100 Mbit/s, normal hastighet 10–40 
Mbit/s. Jobbmobil 10 GB och högre surfmängd: Surfhastighet i 3G <32 Mbit/s, normal hastighet 2–10 Mbit/s. Surfhastighet i 4G och 5G: <300 
Mbit/s, normal hastighet 20–60 Mbit/s. Om surfmängden förbrukas upphör möjligheten att fortsätta surfa. Vid uppnådd surfmängd ges möjlighet
att fortsätta surfa genom att köpa till extra surfmängd. Information om surftjänster och möjlighet att köpa till extra surfmängd finns på 
www.telia.se/jobbmobil 
Jobbmobil Obegränsad: Surfhastighet i 3G <32 Mbit/s, normal hastighet 2–10 Mbit/s. Surfhastighet i 4G och 5G <300 Mbit/s, normal hastighet 
20-60 Mbit/s. 
Jobbmobil Obegränsad Plus: Surfhastigheten i 3G < 32 Mbit/s, normal hastighet 2–10 Mbit/s. Surfhastigheten i 4G och 5G: < 1500 Mbit/s, normal
hastighet 20–60 Mbit/s.
I de fall förbrukningen av surf för Jobbmobil Obegränsad och Jobbmobil Obegränsad Plus uppgår till 1TB, sänks hastigheten till 3Mbit/s.
5.I de fall annan surftjänst väljs, ersätter denna grundtjänsten Jobbsurf Bas. Jobbsurf <15GB: Surfhastighet i 3G <32 Mbit/s, normal hastighet 2–10 
Mbit/s. Surfhastighet i 4G och 5G: <100 Mbit/s, normal hastighet 10–40 Mbit/s. Jobbsurf 15GB och högre surfmängd: Surfhastighet i 3G <32 
Mbit/s, normal hastighet 2–10 Mbit/s. Surfhastighet i 4G och 5G: <300 Mbit/s, normal hastighet 20–60 Mbit/s. Om surfmängden förbrukas 
upphör möjligheten att fortsätta surfa. Vid uppnådd surfmängd ges möjlighet att fortsätta surfa genom att köpa till extra surfmängd. Information 
om surftjänster och möjlighet att köpa till extra surfmängd finns på www.telia.se/jobbmobil 
6.Gäller ej för samtal till förmedlade tjänster såsom t.ex. nummerupplysning och andra typer av betalnummer.
7.Debiteras per 60-sekunders intervall.
8.Gäller även för samtal ringda till Sverige från länder inom EU/EES.
9.Gäller även för samtal ringda inom och mellan andra EU/EES-länder än Sverige.
10.Internsamtal gäller för samtal ringda mellan Kundens mobilabonnemang i Sverige och för samtal ringda i Sverige från Kundens 
mobilabonnemang till utvalda fasta nummer som tillhör Kunden. Samtliga nummer måste tillhöra Kunden. Gäller ej för samtal till förmedlade 
tjänster såsom t.ex. nummerupplysning och andra typer av betalnummer.
11.Gäller ej Betal-sms. Pris för meddelanden skickade från Sverige till utländska telefonnummer återfinns under rubriken Meddelanden från Sverige 
till utlandet.
12.Priset gäller upp till 44 640 minuter/månad, därefter debiteras 0,29 kr/minut, öppningsavgift 0,39 kr/samtal.
13.Priset gäller upp till 30 000 meddelanden/månad, därefter debiteras 0,49 kr/sms och 1,59 kr/mms.
14.Vidarekoppling till Telias mobilabonnemang kostar 0 kr/minut samt 0 kr/samtal i öppningsavgift, till fasta nätet 0 kr/samtal i öppningsavgift, 
övriga minut- och öppningsavgifter enligt Bilaga 2.
15.Jobbmobilabonnemangen är förberedda för 5G utan extra kostnad. För att nyttja 5G krävs 5G-täckning och 5G-kompatibel telefon.
16.Upp till fem (5) Datasim kan kopplas till ett Jobbmobilabonnemang. Månadsavgiften gäller per Datasim. För Jobbmobil Obegränsad Plus ingår 
ett (1) Datasim utan extra avgift.
17.För att få tillgång till Anslutning Klocka måste avrop av tjänster först godkännas av behörig beställare via MyBusiness. För mer information, se 
www.telia.se/foretag/e-sim 
18.För mer information om Telias tilläggstjänster för samtal till utlandet, se www.telia.se/foretag/utomlands 
19.För mer information om Telias roamingtjänster, se www.telia.se/res 
20.Fri nummerreservation gäller ett (1) år från reservationsdatum därefter debiteras 100 kr/nummer och år i de fall Kunden vill förlänga sin 
reservation.
21.Prislistorna för samtal respektive meddelanden från Sverige till utlandet gäller bara för samtal/meddelanden ringda/skickade från Sverige. För 
samtal/meddelanden som rings/skickas från andra EU/EES-länder till länder utanför EU/EES samt från länder utanför EU/EES oavsett destination 
gäller roamingavgift från respektive land. För mer information, se www.telia.se/foretag/utomlands
22.Maxhastighet 1500 Mbit/s är inkluderad i Jobbmobil Obegränsad Plus 
23.https://creativehub.teliacompany.com/m/4bfbbcfce3ec39f1/original/Funktionsbeskrivning-Telia-Jobbmobil.pdf

Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}15
Telia Mobilt bredband företag
Abonnemang 
1, 2, 3, 4
MaxhastighetEngångsavgiftMånadsavgift
Mobilt Bredband Företag 20 GB< 300 (Mbit/s) 40 kr159 kr
Mobilt Bredband Företag 50 GB< 300 (Mbit/s) 40 kr189 kr
Mobilt Bredband Företag 500 GB< 300 (Mbit/s) 40 kr289 kr
Mobilt Bredband Företag 1000 GB< 300 (Mbit/s) 40 kr369 kr
Meddelanden
Avgift per meddelande
SMS till svenska telefonnummer 
6
0,60 kr/meddelande
SMS till utländska telefonnummer 
7
1,20 kr/meddelande
Tillvalstjänster
Avgift per abonnemang
Fast IP adress99 kr/månad
Fotnoter Telia Mobilt Bredband Företag
1.Fungerar enbart i Sverige, går inte att använda utomlands.
2.Kretskopplad data ingår ej i vald surfmängd utan prissätts per minut, se www.telia.se/jobbmobil
3.Om surfmängden förbrukas upphör möjligheten att fortsätta surfa. Vid uppnådd surfmängd ges möjlighet att fortsätta surfa genom att köpa till 
extra surfmängd. Information om surftjänster och möjlighet att köpa till extra surfmängd finns på www.telia.se/jobbmobil
4.Mobilt Bredband Företag abonnemang är förberedda för 5G utan extra kostnad. För att använda 5G krävs 5G täckning och 5G-kompatibel 
hårdvara.
5.Surfhastigheten i 3G < 32 Mbit/s, normal hastighet 2–10 Mbit/s. Surfhastigheten i 4G: < 300 Mbit/s, normal hastighet 20–60 Mbit/s.
6.Gäller sms skickade till svenska mobilnummer. Gäller inte betal-sms. 
7.Gäller sms skickade till utländska mobilnummer. Gäller inte betal-sms.

Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}16
Telia Touchpoint Plus
Tjänstespecifik 
avtalstid
${ContractStartDate} – ${ContractEndDate}
Volymåtagande300 användarpaket (se detaljerat volymåtagande enligt #${FAQuoteNumber})
Särskilda villkorKunden kan minska antalet användarpaket med upp till 10 % från avtalad volym
under den Tjänstespecifika avtalstiden. Om minskningen är större än 10 % har 
Telia rätt att fakturera motsvarande 90 % från avtalad volym.
Avropsberättigade bolag med fristående Touchpoint Plus lösningar som 
tecknats före den Tjänstespecifika avtalstidens start har rätt att omförhandla 
befintlig lösning och erhålla avtalade priser och villkor (Bilaga 2) genom att 
kontakta ansvarig säljare hos Telia.
Kunden ansvarar för att deras egna miljö är förberedd för Touchpoint Plus 
tjänsten, enligt tjänstebeskrivning ”Site Environment Requirements Telia 
Touchpoint Plus”.
Version av 
Tjänstebeskrivning
Funktionsbeskrivning (klicka här
1
) v.4.0
Tjänstespecifikation (klicka här
2
) v.6.0
Detaljerad tjänstespecifikation (klicka här
3
) v.10.0
Detaljerad tjänstespecifikation Telia Svarsservice (klicka här
4
) v.1.0
Site Environment Requirements Telia Touchpoint Plus (klicka här
5
) v.3.40
Fotnoter Touchpoint Plus Tjänstebeskrivning
1.https://www.telia.se/dam/jcr:057c6650-fd23-4c81-87ea-84fc2a11aad2/Funktionsbeskrivning-Telia-Touchpoint-Plus
2.https://www.telia.se/dam/jcr:1804ab7d-cdd7-4d21-9e19-525fb558bf1e/Tjänstespecifikation-Telia-Touchpoint-Plus
3.https://creativehub.teliacompany.com/m/71d3177b0214e3fe/original/Detaljerad-TJanstebeskrivning-Telia-Touchpoint-Plus.pdf 
4.https://www.telia.se/dam/jcr:1a4e61de-0c50-4a36-84bd-f3644312839d/Detaljerad-Tjänstebeskrivning-Telia-Svarsservice
5.https://creativehub.teliacompany.com/m/786fa97aa7843155/original/TPP-SE-Site-Environment-Requirements.pdf 
AnvändarpaketEngångsavgiftMånadsavgift
Touchpoint Virtuell0 kr10 kr
Touchpoint Bas0 kr9 kr
Touchpoint Mobil0 kr14 kr
Touchpoint Unified0 kr93 kr
Tillval Gruppnummer/ACDEngångsavgiftMånadsavgift
ACD Light-agent0 kr50 kr
ACD-agent0 kr250 kr
ACD-administratör (Ej för ACD-light)0 kr250 kr
Callback i ACD0 kr39 kr
ACD-prioritering per ACD0 kr39 kr
Tillval Telefonist 
1, 2
EngångsavgiftMånadsavgift
Attendant0 kr487 kr
Advanced Attendant0 kr870 kr
Advanced Attendant Installation12 920 kr0 kr
Advanced Attendant - Extra kundingång2 800 kr60 kr
Sms 1000 (Advanced Attendant)0 kr590 kr

Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}17
Tillval StatistikEngångsavgiftMånadsavgift
Statistik Installation900 kr0 kr
Statistik Bas0 kr90 kr
Statistik Utökad0 kr144 kr
Wallboard Installation2 000 kr0 kr
Wallboard, paket för 10 köer0 kr1 000 kr
Tillval InspelningEngångsavgiftMånadsavgift
Inspelning Installation9 000 kr0 kr
Inspelning per användare0 kr99 kr
Inspelning lagring 3 år, tillägg per användare0 kr49 kr
Inspelning lagring 7 år, tillägg per användare0 kr89 kr
Tillval Svarsservice 
5
EngångsavgiftMånadsavgift
Svarsservice 100 kr4 380 kr
Svarsservice 200 kr6 540 kr
Svarsservice 400 kr10 920 kr
Svarsservice 600 kr15 500 kr
Svarsservice 800 kr19 770 kr
Svarsservice 1000 kr22 440 kr
Svarsservice, Utökade öppettider0 kr4 045 kr
Svarsservice, Administration0 kr635 kr
Tillval Integrationer & API:erEngångsavgiftMånadsavgift
AD-integration0 kr1 kr
AD-integration Installation3 145 kr0 kr
Kalenderintegration per användare0 kr6 kr
Kalenderintegration installation, per server/domän3 495 kr0 kr
Skype for Business Presence per användare0 kr6 kr
Skype for Business Presence & Voice per användare0 kr16 kr
Skype for Business Integration per server19 000 kr0 kr
Skype for Business Privat certifikat10 000 kr500 kr
Utökad Skype Access 10 kanaler0 kr395 kr
Teamsintegration Presence per anv.0 kr6 kr
Teamsintegration Presence & Voice per anv.0 kr22 kr
Teamsintegration Installation3 495 kr0 kr
Utökad Teams Access 10 kanaler0 kr395 kr
Web API2 000 kr200 kr
Click-to-call Web API2 000 kr200 kr

Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}18
Tillval NummerEngångsavgiftMånadsavgift
Nummerserie, 10-nummer (Fast)0 kr0 kr
Nummerserie, 100-nummer (Fast)0 kr0 kr
Nummerserie, 1000-nummer (Fast)0 kr0 kr
Nummerserie, 10-nummer, utökning (Fast)1 000 kr0 kr
Nummerserie, 100-nummer, utökning (Fast)3 000 kr0 kr
Nummerserie, 1000-nummer, utökning (Fast)9 000 kr0 kr
Enstaka Nummer (Fast)0 kr0 kr
Enstaka Nummer, utökning (Fast)200 kr0 kr
Övriga tillval 
1
EngångsavgiftMånadsavgift
Telefonkonferens0 kr5 kr
Automatisk telefonist namnposter om 20 paket0 kr88 kr
Automatisk telefonist Installation3 000 kr0 kr
Webkatalog Månadsavgift0 kr780 kr
Webkatalog AD-integrerad installation45 000 kr0 kr
Webkatalog Fristående utan IP-filter installation15 000 kr0 kr
Webkatalog Fristående med IP-filter installation8 750 kr0 kr
FAX via e-post per nummer, inklusive kryptering0 kr235 kr
FAX via e-post, extra e-postadress0 kr39 kr
FAX via e-post, domän 1-20 anställda0 kr495 kr
FAX via e-post, domän 21-100 anställda0 kr995 kr
FAX via e-post, domän 101-1000 anställda0 kr1 995 kr
FAX via e-post, domän över 1000 anställda0 kr2 495 kr
FAX via e-post, eget domännamn engångsavg.995 kr0 kr
Besökssystem, Grundpaket62 250 kr1 350 kr
Besökssystem, Avisering SMS och e-post0 kr1 450 kr
Besökssystem, Express Check-in0 kr1 450 kr
Besökssystem, Utrymningslista0 kr725 kr
Besökssystem, Visit kiosk50 750 kr0 kr
Tillval HårdvaraEngångsavgiftMånadsavgift
IP-telefon SNOM D7171 948 kr0 kr
IP-telefon SNOM D7352 228 kr0 kr
IP-telefon SNOM D7852 788 kr0 kr
Konferenstelefon Mitel6 690 kr0 kr
Strömadapter Mitel IP-telefon178 kr0 kr
Strömadapter Mitel konferenstelefon748 kr0 kr
Analogkonverter Mediatrix 2 portar2 890 kr0 kr

Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}19
Analogkonverter Mediatrix 8 portar10 327 kr0 kr
Analogkonverter Mediatrix 24 portar27 423 kr0 kr
Tillval Utbildning 
3
EngångsavgiftMånadsavgift
Administratörsutbildning Webb 3 timmar5 990 kr0 kr
Användarutbildning Webb 2 timmar4 990 kr0 kr
Användarutbildning Webb inkl. telefonist 3 timmar5 990 kr0 kr
Telefonistutbildning, Webb 3 timmar5 990 kr0 kr
Användarutbildning Statistik bas 1 timme2 800 kr0 kr
Användarutbildning Statistik utökad 1,5 timme3 890 kr0 kr
Användarutbildning Adv Attendant, 3 timmar9 600 kr0 kr
På plats utbildning, heldag10 990 kr0 kr
På plats utbildning, halvdag6 990 kr0 kr
Tillval SupportEngångsavgiftMånadsavgift
Slutanvändarsupport0 kr32 kr
Aktiv förvaltning paket 10 tim/månad0 kr14 750 kr
Aktiv förvaltning paket 15 tim/månad0 kr21 375 kr
Aktiv förvaltning paket 20 tim/månad0 kr27 500 kr
Aktiv förvaltning paket 25 tim/månad0 kr33 125 kr
Administratörssupport - Rörlig per påbörjad halvtimme635 kr0 kr
Införande 
4
EngångsavgiftMånadsavgift
Standardkonfiguration0 kr0 kr
Projektledning1 190 kr0 kr
Införandestöd1 190 kr0 kr
Kundanpassad konfiguration per timme1 475 kr0 kr
Röstinspelning promptar paket upp till 5 promptar1 495 kr0 kr
Avgift per Dotterbolag10 000 kr500 kr
Fotnoter Prissammanställning Telia Touchpoint Plus
1.Engångsavgiften för Advanced Attendant, Automatisk telefonist Start, Webkatalog Månadsavgift, Webkatalog AD-integrerad installation, 
Webkatalog Fristående utan IP-filter installation och Webkatalog Fristående med IP-filter installation är per organisation.
2.Sms extra: 0,69 kr/Sms för Sms 1000 (Advanced Attendant).
3.Användarutbildning Adv Attendant, 3 timmar och Administratörsutbildning Adv Attendant, 2 timmar ges även på plats. Distanskostnader såsom 
resekostnader, traktamente, parkeringskostnader och hotellrum tillkommer för utbildning på plats. Faktiska kostnader debiteras. Restid debiteras 
enligt följande timtaxa: Helgfri vardag 08-18, 633 SEK. Vardagar 18-20, 949 SEK, och vardagar 20-08 samt helger och helgdagar 1 265 SEK.
4.Engångsavgiften för Projektledning och Införandestöd är per timme.
5.Telia har rätt att göra en årlig indexuppräkning av priset för Telia Svarsservice baserat på branschavtal: Labour Cost Index för tjänstemän, privat 
sektor (LCI tjm), preliminär, SNI 2007, kolumn N. Källa: Statistiska centralbyrån (SCB). Prisförändringen baseras på den procentuella förändringen 
mellan index kvartal två respektive år. Om index är lägre än föregående år görs ingen prisförändring
Avgifter för Touchpoint Plus övrig trafik
Övrig trafik debiteras enligt nedan. Exempel på övrig trafik är om du vidarekopplar din stängda svarsgrupp
till ett externt nummer, alltså extern trafik från ett gruppnummer eller utgående extern trafik från en 
Fristående telefon t.ex. en konferenstelefon.

Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}20
Samtalstrafik mellan användare och grupper i lösningen är kostnadsfria inom Sverige. Det gäller även 
samtalstrafik till tjänstens röstbrevlådor. Vid utgående trafik från anslutna användare gäller 
mobilabonnemangets samtalsavgifter.
Samtalsavgifter 
1,2
Talsamtal till fasta telenät samt Telias mobilabonnemang
- dygnet runt0,39kr/min
   - öppningsavgift0,45kr/samtal
Talsamtal till övriga mobilabonnemang inom Sverige 
1, 2
- dygnet runt0,39kr/min
- öppningsavgift0,45kr/samtal
Internsamtal dygnet runt 
3
- till egna Telia mobilabg0,00kr/min
- till egna fasta nummer0,00kr/min
- öppningsavgift till egna Telia mobilabg0,00kr/samtal
- öppningsavgift till egna fasta nummer0,00kr/samtal
Samtal till utlandet
Enligt Utlandsprislista för avtalskunder
Fotnoter Avgifter för Touchpoint Plus Övrig trafik
1.Gäller inte samtal till förmedlade tjänster som t.ex. nummerupplysning, betalnummer (t.ex. 099, 0771, 077, 0900, 0939, 0944).
2.Debiteras per 60-sekunders intervall.
3.Gäller övrig trafik till mobilnummer som tillhör er men inte ingår i er växellösning. Gäller även övrig trafik till utvalda fasta nummer som tillhör er.

Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}21
Bilaga 3 – Avropsberättigade bolag RA-${ContractNumber}
Kundens organisationsnummer: 5599920088
Förutom Kunden har nedan angivna företag/org.nr inom Kundens koncern (enligt definition i 1 kap. 11§ 
Aktiebolagslagen) rätt att avropa enligt angivet Ramavtal. Kunden kan göra förändringar av 
avropsberättigade bolag via säljare alternativt via supportkanal. Telia förbehåller sig rätten att göra 
sedvanlig kreditprövning av avropsberättigade bolag i samband med beställning.
Tjänster som inte är möjliga att avropa för avropsberättigade bolag: 
•Telia IT-support Premium – IT-avdelning
•Telia IT-support Premium – IT-avdelning Start
•Telia IT-support Standard
•Telia IT-support Plus
Dessa tjänster kräver egen förutsättningskontroll och offereras separat.
FöretagOrganisationsnummer
 DoNotUse_PlaywrightTestAccount 430365599982948

Telia Sverige AB, SE-169 94 SolnaTC201734596 170629
Styrelsens säte: Stockholm
Org. nr 556430-0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}22
Bilaga 4 – Telias allmänna villkor för tjänster till företag 
RA-${ContractNumber}
https://www.telia.se/foretag/om/villkor`;
  await utilityFunctionLocal.VerifyContractPDFDocumentContent(page, expectedText);


  //Verify contract pdf content
var expectedText = `Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430–0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}1
Beställning
#${FAQuoteNumber}
Detta dokument dokumenterar en beställning av Tjänster enligt Ramavtal RA-
${ContractNumber}.
De tjänster, avgifter och volymer som anges i beställningen följer de villkor som anges i Ramavtalet. 
Beställning har överenskommits mellan följande parter:
Teliabolag (nedan kallat Telia)Företag (nedan kallad Kunden)
Telia Sverige AB
 
5564300142Åse Viste Sparbank
 
5690006670
LeverantörOrganisations-
nummer
KundOrganisations-
nummer
Stjärntorget 116956BOX 21046723
AdressPostnummerAdressPostnummer
Solna GRÄSTORP 
Ort
 
Ort
 
RA Sales Rep
+46 
853684000Test Yogesh Jadhav
SäljareTelefonnummerKontaktpersonTelefonnummer
pagadala.ramesh@capgemini.com yogesh.jadhav@teliacompany.com 
E-post
 
 
E-post
 
 
Dokumentet är endast giltigt om Ramavtal RA-${ContractNumber}  är signerat av båda parter. 
Orderläggning av Tjänst genomförs när dokumentet är signerat. Kunden förbinder sig att tillhandahålla
kompletterande information för orderläggningen till Telia vid behov.

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430–0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}2
Telia Touchpoint Plus
Leveranstid 
Vid beställning av en ny Touchpoint Plus-lösning kommer Telia att kontakta Kunden för att boka en 
leveransworkshop. Under leveransworkshopen bestämmer Kunden och Telias leveranstekniker i 
samråd leveransdatum för den nya lösningen. 
Vid omförhandling av en befintlig Touchpoint Plus-lösning som även innehåller förändringar av 
befintliga tjänster kommer Telia att kontakta Kunden för en kunddatainsamling i nästa steg. När 
kunddatainsamlingen är komplett bestämmer Kunden och Telia i samråd ett leveransdatum.
Priser
TjänstAntalEngångsavgiftMånadsavgift
Användarpaket
Touchpoint Bas50 kr9 kr 
Touchpoint Mobil50 kr14 kr 
Statistik
Statistik Installation1900 kr0 kr 
Statistik Bas10 kr90 kr 
Inspelning
Inspelning Installation19 000 kr0 kr 
Inspelning per användare50 kr99 kr 
Inspelning lagring 3 år, tillägg per användare50 kr49 kr 
Svarsservice
Svarsservice 1010 kr4 380 kr 
Övriga tillval
Webkatalog Månadsavgift10 kr780 kr 
Webkatalog AD-integrerad installation145 000 kr0 kr 
Utbildning
Administratörsutbildning Webb 3 timmar15 990 kr0 kr 
Support
Slutanvändarsupport100 kr32 kr 
Införande
Standardkonfiguration10 kr0 kr 
KOMMENTARSAMMANSTÄLLNING
TOTAL ENGÅNGSAVGIFT60 890 kr
TOTAL MÅNADSAVGIFT6 425 kr 

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430–0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}3
Avropande bolag som ingår i Touchpoint Plus-beställningen
Nedan angivna företag avropar Touchpoint Plus-lösningen.
FöretagOrganisationsnummer
Piri-Piri in Scandinavia Handelsbolag9697013036

Telia Sverige AB, SE-169 94 Solna 
Styrelsens säte: Stockholm
Org. nr 556430–0142, Momsreg.nr. SE556430014201
Ramavtals-ID: RA-${ContractNumber}
Referens-ID: ${ContractNumber}4
Dokumentet har upprättats i två (2) exemplar, av vilka Parterna tagit var sitt. 
    
Ort & DatumOrt & Datum
    
Telias underskrift Kundens underskrift (behörig 
företrädare)
    
NamnförtydligandeNamnförtydligande`;
  await utilityFunctionLocal.VerifyInitialOrderPDFDocumentContent(page, expectedText);
      


  //Close all browserss
  await context.close();  
});



