export class SettingsPage {
    constructor(page) {
        this.passwordField = page.getByPlaceholder('Password');
        this.usernameField = page.getByPlaceholder('Your Name');
        this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });
    }

    async updatePassword(newPassword) {
        await this.passwordField.click();
        await this.passwordField.fill(newPassword);

        await this.updateSettingsButton.click();
    }

    async updateUsername(username) {
        await this.usernameField.click();
        await this.usernameField.fill(username);
    }

    async saveChanges() {
        await this.updateSettingsButton.click();
    }
}
