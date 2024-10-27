// Result.ts
export class ResultObject {
    name: string;
    logo: string;
    domain: string;
    description: string;


    constructor(name: string, logo: string, address: string, description: string = '') {
        this.name = name;
        this.logo = logo;
        this.domain = address;
        this.description = description;

    }
}

