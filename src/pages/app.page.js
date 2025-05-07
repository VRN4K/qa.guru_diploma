import {ArticleCreationPage, ArticlePage, LoginPage, MainPage, RegisterPage, SettingsPage} from './index';

export class App {
    constructor(page,uiUrl) {
        this.register = new RegisterPage(page);
        this.login = new LoginPage(page);
        this.main = new MainPage(page, uiUrl);
        this.settings = new SettingsPage(page);
        this.article = new ArticlePage(page);
        this.articleCreation = new ArticleCreationPage(page);
    }
}