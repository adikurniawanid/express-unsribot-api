"use strict";

class TranslatorService {
  static async translating(parserParam) {
    const queryForming = [];

    if (parserParam.selectIdentify === true) {
      queryForming.push("SELECT");
      if (parserParam.distinctIdentify === true) {
        queryForming.push("DISTINCT");
      }
    } else {
      throw {
        status: 404,
        message: "SELECT not found",
      };
    }

    if (parserParam.columnIdentify.length > 0) {
      queryForming.push(parserParam.columnIdentify.join(", "));
    }

    if (parserParam.viewIdentify.length > 0) {
      queryForming.push("FROM");
      queryForming.push(parserParam.viewIdentify.join(", "));
    } else {
      throw {
        status: 404,
        message: "View not found",
      };
    }

    if (
      parserParam.conditionIdentify.length > 0 &&
      parserParam.columnConditionIdentify.length > 0
    ) {
      queryForming.push("WHERE");
      queryFormConditionLoop: for (
        let index = 0;
        index < parserParam.columnConditionIdentify.length;
        index++
      ) {
        queryForming.push(parserParam.columnConditionIdentify[index]);
        if (parserParam.columnConditionIdentify[index + 1] !== undefined) {
          parserParam.logicOperatorIdentify[index]
            ? queryForming.push(parserParam.logicOperatorIdentify[index])
            : queryForming.push("AND");
        }
      }
    }

    if (parserParam.orderIdentify.length > 0) {
      queryForming.push("ORDER BY");
      queryForming.push(parserParam.orderIdentify.join(", "));
    }

    if (parserParam.limitIdentify.length) {
      queryForming.push(parserParam.limitIdentify);
    }

    const translate = queryForming.join(" ");

    return translate;
  }
}

module.exports = TranslatorService;
