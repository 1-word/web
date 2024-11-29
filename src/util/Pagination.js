export class Pagination {
  constructor() {

  }

  static isEnd({page}) {
    if (page?.hasNext) {
      return false;
    }
    return true;
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