import {faker} from "@faker-js/faker";

export class UserBuilder {

    addEmail(){
        this.email = faker.internet.email();
        return this;
    }
    addPassword(symbolsCount){
        this.password = faker.internet.password({ length: symbolsCount });
        return this;
    }
    addUsername(){
        this.username = faker.person.firstName();
        return this;
    }
    addBio(){
        this.userBio = faker.person.bio();
        return this;
    }
    generate(){
        return this
    }
}