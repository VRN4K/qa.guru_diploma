import {replaceSpecificSymbolsForLink} from "../helpers/utils/replacements";

const ARTICTLE_PAGE_URL = 'https://realworld.qa.guru/#/article/';

export class ArticlePage {

    constructor(page) {
        this.page = page;

        this.articleTitle = page.locator('div.container h1');
        this.articleContent = page.locator('div.col-md-12 p');
        this.articleComment = page.locator('p.card-text');

        this.newCommentInputField = page.getByPlaceholder('Write a comment...');
        this.publishButton = page.getByRole('button', { name: 'Post Comment' });

    }

    async gotoArticlePage(articleTitle) {
       await this.page.goto(ARTICTLE_PAGE_URL + replaceSpecificSymbolsForLink(articleTitle));
    }

    async publishComment(comment){
       await this.newCommentInputField.click();
       await this.newCommentInputField.fill(comment);
       await this.publishButton.click();
    }
}