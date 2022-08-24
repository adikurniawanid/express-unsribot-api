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

  static async identifyView(tokenParam) {
    const result = new Set();
    const viewDictionary = await DictionaryService.getViewList();

    for (let index = 0; index < tokenParam.length; index++) {
      if (viewDictionary.includes(tokenParam[index])) {
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
    identifyViewParam,
    identifyWhereParam
  ) {
    let column = [];
    const columnCondition = [];
    let conditionStatus = false;
    let orderStatus = false;
    const objectIdentifyColumn =
      await DictionaryService.getObjectColumnListByView(identifyViewParam);

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
                  ' "' +
                  tokenParam[index + 2] +
                  '"'
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

  static async identifyOrder(tokenParam, identifyViewParam) {
    const objectIdentifyColumn =
      await DictionaryService.getObjectColumnListByView(identifyViewParam);
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

  static async parsing(tokenParam) {
    const selectIdentify = await this.identifySelect(tokenParam);
    const viewIdentify = await this.identifyView(tokenParam);
    const conditionIdentify = await this.identifyWhere(tokenParam);
    const logicOperatorIdentify = await this.identifyLogicOperator(
      tokenParam,
      conditionIdentify
    );

    const [columnIdentify, columnConditionIdentify] =
      await ParserService.identifyColumn(
        tokenParam,
        viewIdentify,
        conditionIdentify
      );

    const orderIdentify = await this.identifyOrder(tokenParam, viewIdentify);
    const limitIdentify = await this.identifyLimit(tokenParam);
    const distinctIdentify = await this.identifyDistinct(tokenParam);

    return {
      selectIdentify,
      columnIdentify,
      viewIdentify,
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
