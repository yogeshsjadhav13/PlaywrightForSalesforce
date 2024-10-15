class LoginPageObjects {

    constructor(page) {
        this.page = page;
        this.usernameTextbox = this.page.locator("#username");
        this.passwordTextbox = this.page.locator("#password");
        this.loginButton = this.page.locator("#Login");
    }
}
module.exports = { LoginPageObjects };