import {faker} from "@faker-js/faker";

export class TodoBuilder {

    addId(number){
        this.id = number;
        return this;
    }
    addTitle(wordsCount){
        this.title = faker.lorem.words(wordsCount) || faker.lorem.word();
        return this;
    }

    addDescription(wordsCount){
        this.description = faker.lorem.words(wordsCount) || faker.lorem.word();
        return this;
    }

    addDoneStatus(status){
        this.doneStatus = status;
        return this;
    }

    generate(){
        return this
    }
}