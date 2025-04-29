import {faker} from "@faker-js/faker";

export class ArticleBuilder {

    addTitle(){
        this.title = faker.lorem.words(2);
        return this;
    }
    addDescription(){
        this.description = faker.lorem.words(5);
        return this;
    }
    addContent(){
        this.content = faker.lorem.words(15);
        return this;
    }

    addTags(tagsCount){
        this.tags = []
        for (let i = 0; i < tagsCount; i++) {
            this.tags.push(...faker.lorem.word())
        }
        return this;
    }

    generate(){
        return this
    }
}