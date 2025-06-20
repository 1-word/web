export class Pagination {
  constructor() {}

  static getQueryParameter({current, lastId, wordBookId, searchText, memorization, lang, sort, seed, limit}) {
    const params = {
      current,
      lastId,
      wordBookId,
      searchText,
      memorization,
      lang,
      sort,
      seed,
      limit
    }

    return Object.keys(params).reduce((acc, key) => {
      const value = params[key];
      if (value === undefined || value === null) {
        return acc;
      } 
      const result = `${key}=${value}`;
      return acc + (acc=== ''? '?' : '&') + result;  
    }, '');
  }


  /**
   * 
   * @param  {...any} params {name: "name", value: "value"}
   * @returns {string} 쿼리 파라미터
   */
  static getPageParameter(params) {
    return params.reduce((acc, param, idx) => {
      if (param.value === undefined || param.value === null) {
        return acc;
      }
      const result = `${param.name}=${param.value}`;
      return acc + (acc=== ''? '?' : '&') + result; 
    },'');
  }
}