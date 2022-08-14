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
    let result = false;
    const coditionDictionary = await DictionaryService.getConditionList();
    for (let index = 0; index < tokenParam.length; index++) {
      if (coditionDictionary.includes(tokenParam[index]) && !result) {
        result = tokenParam[index];
      } else if (coditionDictionary.includes(tokenParam[index]) && result) {
        tokenParam.splice(index, 1);
        index--;
      }
    }
    return result;
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
    let orderStatus = false;
    const objectIdentifyColumn =
      await DictionaryService.getObjectColumnListByTable(identifyTableParam);

    for (let index = 0; index < tokenParam.length; index++) {
      if (tokenParam[index] === identifyWhereParam) {
        conditionStatus = true;
      }
      if (tokenParam[index] === "urut") {
        orderStatus = true;
      }

      if (conditionStatus && !orderStatus) {
        for (const key in objectIdentifyColumn) {
          if (objectIdentifyColumn[key].includes(tokenParam[index])) {
            if (tokenParam[index + 1] === "kandung") {
              columnCondition.push(
                key +
                  "." +
                  tokenParam[index] +
                  " LIKE " +
                  '"%' +
                  tokenParam[index + 2] +
                  '%"'
              );
              index += 2;
            } else if (tokenParam[index + 1] === "awal") {
              columnCondition.push(
                key +
                  "." +
                  tokenParam[index] +
                  " LIKE " +
                  '"' +
                  tokenParam[index + 2] +
                  '%"'
              );
              index += 2;
            } else if (tokenParam[index + 1] === "akhir") {
              columnCondition.push(
                key +
                  "." +
                  tokenParam[index] +
                  " LIKE " +
                  '"%' +
                  tokenParam[index + 2] +
                  '"'
              );
              index += 2;
            } else if (
              tokenParam[index + 1] === "<" ||
              tokenParam[index + 1] === ">" ||
              tokenParam[index + 1] === "<=" ||
              tokenParam[index + 1] === ">="
            ) {
              columnCondition.push(
                key +
                  "." +
                  tokenParam[index] +
                  " " +
                  tokenParam[index + 1] +
                  " " +
                  tokenParam[index + 2]
              );
              index += 2;
            } else {
              columnCondition.push(
                key +
                  "." +
                  tokenParam[index] +
                  " = " +
                  '"' +
                  tokenParam[index + 1] +
                  '"'
              );
              index += 1;
            }
          }
        }
      } else if (!conditionStatus && !orderStatus) {
        for (const key in objectIdentifyColumn) {
          if (objectIdentifyColumn[key].includes(tokenParam[index])) {
            column.push(key + "." + tokenParam[index]);
          }
        }
      }
    }

    if (column.length === 0) {
      column = ["*"];
    }

    return [column, columnCondition];
  }

  static async identifyOrder(tokenParam, identifyTableParam) {
    const objectIdentifyColumn =
      await DictionaryService.getObjectColumnListByTable(identifyTableParam);
    const result = [];

    orderLoop: for (
      let index = tokenParam.findIndex((element) => element === "urut");
      index < tokenParam.length;
      index++
    ) {
      if (index === -1) {
        break orderLoop;
      }
      for (const key in objectIdentifyColumn) {
        if (objectIdentifyColumn[key].includes(tokenParam[index])) {
          if (
            tokenParam[index + 1] === "turun" ||
            tokenParam[index + 1] === "rendah"
          ) {
            result.push(key + "." + tokenParam[index] + " DESC");
            index++;
          } else {
            result.push(key + "." + tokenParam[index] + " ASC");
            index++;
          }
        }
      }
    }
    return result;
  }

  static async identifyLimit(tokenParam) {
    let result = false;
    tokenParam.forEach((element, index) => {
      if (
        element === "batas" &&
        typeof Number(tokenParam[index + 1]) == "number" &&
        !isNaN(Number(tokenParam[index + 1]))
      ) {
        result = "LIMIT " + Number(tokenParam[index + 1]);
      }
    });
    return result;
  }

  static async identifyDistinct(tokenParam) {
    if (tokenParam.includes("unik")) {
      return true;
    }
    return false;
  }

  static async run(tokenParam) {
    const selectIdentify = await this.identifySelect(tokenParam);
    const tableIdentify = await this.identifyTable(tokenParam);
    const conditionIdentify = await this.identifyWhere(tokenParam);
    const logicOperatorIdentify = await this.identifyLogicOperator(
      tokenParam,
      conditionIdentify
    );

    const [columnIdentify, columnConditionIdentify] =
      await ParserService.identifyColumn(
        tokenParam,
        tableIdentify,
        conditionIdentify
      );

    const orderIdentify = await this.identifyOrder(tokenParam, tableIdentify);
    const limitIdentify = await this.identifyLimit(tokenParam);
    const distinctIdentify = await this.identifyDistinct(tokenParam);

    return {
      selectIdentify,
      columnIdentify,
      tableIdentify,
      conditionIdentify,
      columnConditionIdentify,
      logicOperatorIdentify,
      orderIdentify,
      limitIdentify,
      distinctIdentify,
    };
  }
}

module.exports = ParserService;
