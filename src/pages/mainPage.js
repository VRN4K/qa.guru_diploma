export class MainPage {
	URl_UI = 'https://realworld.qa.guru/';

	constructor(page) {
		this.page = page;

		this.signupButton = page.getByRole('link', { name: 'Sign up' });
		this.signinButton = page.getByRole('link', { name: 'Login' });

		this.dropownMenu = page.locator('div.nav-link.dropdown-toggle.cursor-pointer');
		this.dropDownMenuProfileButton = page.locator('a.dropdown-item', { hasText: "Profile" });
		this.dropDownMenuSettingsButton = page.locator('a.dropdown-item', { hasText: "Settings" });
		this.dropDownMenuLogoutButton = page.locator('a.dropdown-item', { hasText: "Logout" });
	}

	async gotoLogin() {
		await this.signinButton.click();
	}

	async gotoRegister() {
		await this.signupButton.click();
	}

	async gotoLogOut() {
		await this.dropownMenu.click();
		await this.dropDownMenuLogoutButton.click();
	}

	async gotoSettings() {
		await this.dropownMenu.click();
		await this.dropDownMenuSettingsButton.click();
	}

	async gotoMainPage() {
		await this.page.goto(this.URl_UI);
	}
}
