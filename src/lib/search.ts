import Fuse from 'fuse.js'

export function searchSites(input:string, data:string[]){
    const options = {
        includeScore: true
      }
      
      const fuse = new Fuse(data, options)
      
      const searchResult = fuse.search(input)
      const result:any = []

      searchResult.forEach((e) => result.push(e.item));
      // console.log(result)
      return result
}
