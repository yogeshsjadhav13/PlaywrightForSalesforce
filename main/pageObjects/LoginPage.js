class LoginPage {

    constructor(page) {
        this.page = page;
        this.usernameTextbox = page.locator("#username");
        this.passwordTextbox = page.locator("#password");
        this.loginButton = page.locator("#Login");
    }



    async adminUserLogin(utilityFunction) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        await this.page.goto(secretsData.get("environmentURL"));
        await this.usernameTextbox.type(secretsData.get("username"));
        await this.passwordTextbox.type(secretsData.get("password"));
        await this.loginButton.click();
        //await this.page.getByRole('link', { name: 'Home', exact: true }).click();
        await this.page.getByTitle('Home Tab').click();
        await this.page.goto(secretsData.get("environmentURL") + "/home/home.jsp");
        await this.page.goto(secretsData.get("environmentURL") + "/lightning/page/home");
        await this.page.getByRole('button', { name: 'App Launcher' }).click();
        await this.page.getByPlaceholder('Search apps and items...').click();
        await this.page.getByPlaceholder('Search apps and items...').fill('Sales');
        await this.page.getByRole('option', { name: 'Sales', exact: true }).click();
        await this.page.getByRole('link', { name: 'Home' }).click();
    }



    async loginAsUser(utilityFunction, user, SalesApplication) {
        const secretsData = await utilityFunction.fetchEnvironmentCreds();
        const orgID = await utilityFunction.RunSOQLQuery("select id from Organization");
        const userID = await utilityFunction.RunSOQLQuery("select id from user where name = \'"+user+"\'");
        const userLoginURL = secretsData.get("environmentURL") + "/servlet/servlet.su?oid=" + orgID + "&suorgadminid=" + userID + "&retURL=%2F" + userID + "%3Fnoredirect%3D1%26isUserEntityOverride%3D1&targetURL=%2Fhome%2Fhome.jsp";
        var updatedData = {
            LanguageLocaleKey: "sv"
        };
        await utilityFunction.RunUpdateDML("User", userID, updatedData);
        await this.page.goto(userLoginURL);
        await this.page.getByRole('button', { name: 'Appstartare' }).click();
        await this.page.getByPlaceholder('Sök appar och objekt...').click();
        await this.page.getByPlaceholder('Sök appar och objekt...').fill(SalesApplication);
        await this.page.getByRole('option', { name: SalesApplication }).first().click();
        await this.page.getByRole('link', { name: 'Startsida', exact: true }).click();
        await this.page.getByRole('link', { name: 'Konton', exact: true }).click();
    }


    
}
module.exports = { LoginPage };