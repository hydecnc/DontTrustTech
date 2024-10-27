import { writable } from "svelte/store";
export const domainData = writable(getSites())
export const domainStringData = writable(getStringSites())

import { ResultObject } from "./ResultObject";

export async function getSites() {
    try {
        const response = await fetch("/websites.txt");
        const data = await response.text();
        // console.log(data)

        let domains = data.split("\n")
        // return data.split("\n")
        console.log(domains)
        // domainData.set = domains;
        let results: ResultObject[] = []

        domains.forEach(
            (domain) => {
                // console.log(domain)
                var matches = domain.match(/^.*[^.]/)
                if (matches == null) {
                    var name = ''
                }
                else {
                    name = matches[0]
                }
                // var logo = `https://www.google.com/s2/favicons?domain=${domain}&sz=$128`
                results.push(new ResultObject(name, 'logo', domain, ''))
            }
        )

        return results
    }
    catch (error) {
        console.error(error);
    }


}

export async function getStringSites() {
    try {
        const response = await fetch("/websites.txt");
        const data = await response.text();
        console.log(data)

        let domains = data.split("\n")
        // return data.split("\n")
        return domains
    }
    catch (error) {
        console.error(error);
    }


}