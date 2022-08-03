"use strict";

const DictionaryService = require("./dictionary.service");

class ParserService {
  static async identifySelect(tokenParam) {
    const selectDictionary = await DictionaryService.getSelectList();
    for (let index = 0; index < tokenParam.length; index++) {
      if (selectDictionary.includes(tokenParam[index])) {
        return true;
      }
    }
    return false;
  }

  static async identifyTable(tokenParam) {
    const result = new Set();
    const tableDictionary = await DictionaryService.getTableList();

    for (let index = 0; index < tokenParam.length; index++) {
      if (tableDictionary.includes(tokenParam[index])) {
        result.add(tokenParam[index]);
      }
    }
    return Array.from(result);
  }

  static async identifyWhere(tokenParam) {
    const coditionDictionary = await DictionaryService.getConditionList();
    for (let index = 0; index < tokenParam.length; index++) {
      if (coditionDictionary.includes(tokenParam[index])) {
        return tokenParam[index];
      }
    }
    return false;
  }

  static async identifyLogicOperator(tokenParam, identifyWhereParam) {
    let conditionStatus = false;
    const result = [];
    for (let index = 0; index < tokenParam.length; index++) {
      if (tokenParam[index] === identifyWhereParam) {
        conditionStatus = true;
      }
      if (conditionStatus) {
        if (tokenParam[index] === "atau") {
          result.push("OR");
        } else if (tokenParam[index] === "dan") {
          result.push("AND");
        }
      }
    }
    return result;
  }

  static async identifyColumn(
    tokenParam,
    identifyTableParam,
    identifyWhereParam
  ) {
    let column = [];
    const columnCondition = [];
    let conditionStatus = false;
    const objectIdentifyColumn =
      await DictionaryService.getObjectColumnListByTable(identifyTableParam);

    for (let index = 0; index < tokenParam.length; index++) {
      if (tokenParam[index] === identifyWhereParam) {
        conditionStatus = true;
      }
      if (conditionStatus) {
        for (const key in objectIdentifyColumn) {
          if (objectIdentifyColumn[key].includes(tokenParam[index])) {
            columnCondition.push(
              key +
                "." +
                tokenParam[index] +
                " LIKE " +
                '"' +
                tokenParam[index + 1] +
                '"'
            );
          }
        }
      } else {
        for (const key in objectIdentifyColumn) {
          if (objectIdentifyColumn[key].includes(tokenParam[index])) {
            column.push(key + "." + tokenParam[index]);
          }
        }
      }
    }

    if (column.length === 0) {
      column = "*";
    }

    return [column, columnCondition];
  }

  static async run(tokenParam) {
    const selectIdentify = await this.identifySelect(tokenParam);
    const tableIdentify = await this.identifyTable(tokenParam);
    const conditionIdentify = await this.identifyWhere(tokenParam);
    const objectColumnByTableIdentify =
      await DictionaryService.getObjectColumnListByTable(tableIdentify);
    const logicOperatorIdentify = await this.identifyLogicOperator(
      tokenParam,
      conditionIdentify
    );
    const identifyingColumn = await ParserService.identifyColumn(
      tokenParam,
      tableIdentify,
      conditionIdentify
    );
    const columnIdentify = identifyingColumn[0];
    const columnConditionIdentify = identifyingColumn[1];

    return {
      selectIdentify,
      columnIdentify,
      tableIdentify,
      conditionIdentify,
      columnConditionIdentify,
      logicOperatorIdentify,
    };
  }
}

module.exports = ParserService;
