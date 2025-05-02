# Test info

- Name: Статьи >> Создание новой статьи
- Location: /home/runner/work/qa.guru_diploma/qa.guru_diploma/tests/ui_tests/pageObject.spec.js:51:9

# Error details

```
Error: expect(locator).toHaveText(expected)

Locator: locator('div.container h1')
Expected string: "bis terror"
Received: <element(s) not found>
Call log:
  - expect.toHaveText with timeout 50000ms
  - waiting for locator('div.container h1')
    2 × locator resolved to <h1></h1>
      - unexpected value ""

    at /home/runner/work/qa.guru_diploma/qa.guru_diploma/tests/ui_tests/pageObject.spec.js:61:51
```

# Page snapshot

```yaml
- heading "404 Not Found" [level=1]
- link "Go to home page":
  - /url: "#/"
```

# Test source

```ts
   1 | import {expect} from '@playwright/test';
   2 | import {test} from '../../src/helpers/fixtures/ui.fixtures';
   3 | import {ArticleBuilder, CommentBuilder, UserBuilder} from "../../src/helpers/builders";
   4 |
   5 | test.use({storageState: {cookies: [], origins: []}});
   6 |
   7 | test.describe('Настройки', () => {
   8 |
   9 |     test('Зарегистрировать нового пользователя', async ({webApp}) => {
  10 |         const user = new UserBuilder().addUsername().addEmail().addPassword().generate();
  11 |
  12 |         await webApp.main.gotoRegister();
  13 |         await webApp.register.register(user.username, user.email, user.password);
  14 |         await expect(webApp.main.dropownMenu).toHaveText(user.username);
  15 |     });
  16 |
  17 |     test('Сменить пароль пользователя', async ({webApp, user}) => {
  18 |         let newPassword = new UserBuilder().addPassword(10).generate();
  19 |
  20 |         await webApp.main.gotoSettings();
  21 |
  22 |         await webApp.settings.updatePassword(newPassword.password);
  23 |         await expect(webApp.settings.updateSettingsButton).toBeHidden();
  24 |
  25 |         await webApp.main.gotoLogOut();
  26 |         await webApp.main.gotoLogin();
  27 |
  28 |         await webApp.login.login(user.email, newPassword.password);
  29 |     });
  30 |
  31 |     test('Изменить имя пользователя', async ({webApp, user }) => {
  32 |         let userInfo = new UserBuilder().addUsername().generate();
  33 |
  34 |         await webApp.main.gotoSettings();
  35 |         await webApp.settings.updateUsername(userInfo.username);
  36 |         await webApp.settings.saveChanges();
  37 |
  38 |         await expect(webApp.settings.updateSettingsButton).toBeHidden();
  39 |         await expect(await webApp.settings.usernameField.inputValue()).toBe(userInfo.username);
  40 |     });
  41 | });
  42 |
  43 | test.describe('Статьи', () => {
  44 |
  45 |     test.beforeEach(async ({webApp, user}) => {
  46 |         await webApp.main.gotoLogin();
  47 |         await webApp.login.login(user.email, user.password);
  48 |         await webApp.main.gotoMainPage();
  49 |     });
  50 |
  51 |     test('Создание новой статьи', async ({webApp}) => {
  52 |         const articleBuilder = new ArticleBuilder().addTitle().addContent()
  53 |             .addDescription().addTags(1).generate();
  54 |
  55 |         await webApp.articleCreation.gotoArticleCreation();
  56 |         await webApp.articleCreation.createNewArticle(articleBuilder.title, articleBuilder.description,
  57 |             articleBuilder.content, articleBuilder.tags);
  58 |
  59 |         await webApp.article.gotoArticlePage(articleBuilder.title);
  60 |
> 61 |         await expect(webApp.article.articleTitle).toHaveText(articleBuilder.title);
     |                                                   ^ Error: expect(locator).toHaveText(expected)
  62 |         await expect(webApp.article.articleContent).toHaveText(articleBuilder.content);
  63 |     });
  64 |
  65 |     test('Публикация коментария к статье', async ({ webApp }) => {
  66 |         const articleBuilder = new ArticleBuilder().addTitle().addContent().addDescription().addTags(1).generate();
  67 |         const commentBuilder = new CommentBuilder().addComment(7);
  68 |
  69 |         await webApp.articleCreation.gotoArticleCreation();
  70 |         await webApp.articleCreation.createNewArticle(articleBuilder.title, articleBuilder.description, articleBuilder.content, articleBuilder.tags);
  71 |
  72 |         await webApp.article.gotoArticlePage(articleBuilder.title);
  73 |         await webApp.article.publishComment(commentBuilder.content);
  74 |
  75 |         await expect(webApp.article.articleComment).toHaveText(commentBuilder.content);
  76 |     });
  77 | });
  78 |
  79 |
```