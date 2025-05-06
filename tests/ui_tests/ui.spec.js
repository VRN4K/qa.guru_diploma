import {expect} from '@playwright/test';
import {test} from '../../src/helpers/fixtures/ui.fixtures';
import {ArticleBuilder, CommentBuilder, UserBuilder} from "../../src/helpers/builders";

test.describe('Настройки', () => {

    test('Зарегистрировать нового пользователя', async ({webApp}) => {
        const user = new UserBuilder().addUsername().addEmail().addPassword().generate();

        await webApp.main.gotoRegister();
        await webApp.register.register(user.username, user.email, user.password);
        await expect(webApp.main.dropownMenu).toHaveText(user.username);
    });

    test('Сменить пароль пользователя', async ({webApp, user}) => {
        let newPassword = new UserBuilder().addPassword(10).generate();

        await webApp.main.gotoSettings();

        await webApp.settings.updatePassword(newPassword.password);
        await expect(webApp.settings.updateSettingsButton).toBeHidden();

        await webApp.main.gotoLogOut();
        await webApp.main.gotoLogin();

        await webApp.login.login(user.email, newPassword.password);
    });

    test('Изменить имя пользователя', async ({webApp, user }) => {
        let userInfo = new UserBuilder().addUsername().generate();

        await webApp.main.gotoSettings();
        await webApp.settings.updateUsername(userInfo.username);
        await webApp.settings.saveChanges();

        await expect(webApp.settings.updateSettingsButton).toBeHidden();
        await expect(await webApp.settings.usernameField.inputValue()).toBe(userInfo.username);
    });
});

test.describe('Статьи', () => {

    test.beforeEach(async ({webApp, user}) => {
        await webApp.main.gotoLogin();
        await webApp.login.login(user.email, user.password);
        await webApp.main.gotoMainPage();
    });

    test('Создание новой статьи', async ({webApp}) => {
        const articleBuilder = new ArticleBuilder().addTitle().addContent()
            .addDescription().addTags(1).generate();

        await webApp.articleCreation.gotoArticleCreation();
        await webApp.articleCreation.createNewArticle(articleBuilder.title, articleBuilder.description,
            articleBuilder.content, articleBuilder.tags);

        await webApp.article.gotoArticlePage(articleBuilder.title);

        await expect(webApp.article.articleTitle).toHaveText(articleBuilder.title);
        await expect(webApp.article.articleContent).toHaveText(articleBuilder.content);
    });

    test('Публикация коментария к статье', async ({ webApp }) => {
        const articleBuilder = new ArticleBuilder().addTitle().addContent().addDescription().addTags(1).generate();
        const commentBuilder = new CommentBuilder().addComment(7).generate();

        await webApp.articleCreation.gotoArticleCreation();
        await webApp.articleCreation.createNewArticle(articleBuilder.title, articleBuilder.description, articleBuilder.content, articleBuilder.tags);

        await webApp.article.gotoArticlePage(articleBuilder.title);
        await webApp.article.publishComment(commentBuilder.content);

        await expect(webApp.article.articleComment).toHaveText(commentBuilder.content);
    });
});

