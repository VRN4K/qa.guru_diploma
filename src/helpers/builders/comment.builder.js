import {faker} from "@faker-js/faker";

export class CommentBuilder {

    addComment(wordsCount){
        this.content = faker.lorem.words(wordsCount);
        return this;
    }

    generate(){
        return this
    }
}