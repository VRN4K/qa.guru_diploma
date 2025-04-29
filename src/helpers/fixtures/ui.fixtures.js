import { test as base } from '@playwright/test';
import {App} from "../../pages/app.page";
import {UserBuilder} from "../builders";


export const test = base.extend({
    webApp: async ({ page }, use) => {
        const app = new App(page);
        await app.main.gotoMainPage();
        await use(app);
    },
    user: async ({ page }, use) => {
        const user = new UserBuilder().addUsername().addEmail().addPassword().generate();
        const app = new App(page);
        await app.main.gotoRegister();
        await app.register.register(user.username, user.email, user.password);
        await use(user);
    }
});