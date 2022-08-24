"use strict";

const DictionaryService = require("./dictionary.service");

class ParserService {
  static async identifySelect(tokenParam) {
    const selectDictionary = await DictionaryService.getSelectList();
    for (let index = 0; index < tokenParam.length; index++) {
      if (selectDictionary.includes(tokenParam[index])) {
        return tokenParam[index];
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
        if (["atau", "dan"].includes(tokenParam[index])) {
          result.push(tokenParam[index]);
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
    const objectIdentifyColumn =
      await DictionaryService.getObjectColumnListByView(identifyViewParam);

    identifyColumnLoop: for (
      let index = 0;
      index < tokenParam.length;
      index++
    ) {
      if (tokenParam[index] === identifyWhereParam) {
        conditionStatus = true;
      }

      if (["urut", "batas"].includes(tokenParam[index])) {
        break identifyColumnLoop;
      }

      if (conditionStatus) {
        for (const key in objectIdentifyColumn) {
          if (objectIdentifyColumn[key].includes(tokenParam[index])) {
            if (
              ["kandung", "awal", "akhir", "<", ">", "<=", ">="].includes(
                tokenParam[index + 1]
              )
            ) {
              columnCondition.push({
                view: key,
                column: tokenParam[index],
                operator: tokenParam[index + 1],
                conditionValue: tokenParam[index + 2],
              });
              index += 2;
            } else {
              columnCondition.push({
                view: key,
                column: tokenParam[index],
                operator: "default",
                conditionValue: tokenParam[index + 1],
              });
              index += 1;
            }
          }
        }
      } else if (!conditionStatus) {
        for (const key in objectIdentifyColumn) {
          if (objectIdentifyColumn[key].includes(tokenParam[index])) {
            column.push({
              view: key,
              column: tokenParam[index],
            });
          }
        }
      }
    }

    if (column.length === 0) {
      column = "default";
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
          if (["turun", "rendah"].includes(tokenParam[index + 1])) {
            result.push({
              view: key,
              column: tokenParam[index],
              sortDirection: tokenParam[index + 1],
            });
            index++;
          } else if (
            ["naik", "tingkat", "tinggi", "ningkat"].includes(
              tokenParam[index + 1]
            )
          ) {
            result.push({
              view: key,
              column: tokenParam[index],
              sortDirection: tokenParam[index + 1],
            });
            index++;
          } else {
            result.push({
              view: key,
              column: tokenParam[index],
              sortDirection: "default",
            });
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
        result = {
          word: tokenParam[index],
          amount: tokenParam[index + 1],
        };
      }
    });
    return result;
  }

  static async identifyDistinct(tokenParam) {
    if (tokenParam.includes("unik")) {
      return "unik";
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
