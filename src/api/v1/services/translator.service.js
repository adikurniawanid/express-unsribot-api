"use strict";

class TranslatorService {
  static async run(parserParam) {
    const queryForming = [];

    if (parserParam.selectIdentify === true) {
      queryForming.push("SELECT");
    }

    if (parserParam.columnIdentify.length > 0) {
      queryForming.push(parserParam.columnIdentify.join(", "));
    }

    if (parserParam.tableIdentify.length > 0) {
      queryForming.push("FROM");
      queryForming.push(parserParam.tableIdentify.join(", "));
    }

    if (
      parserParam.conditionIdentify.length > 0 &&
      parserParam.conditionIdentify.length > 0
    ) {
      queryForming.push("WHERE");
      queryFormConditionLoop: for (
        let index = 0;
        index < parserParam.columnConditionIdentify.length;
        index++
      ) {
        queryForming.push(parserParam.columnConditionIdentify[index]);
        if (parserParam.columnConditionIdentify[index + 1] !== undefined) {
          queryForming.push(parserParam.logicOperatorIdentify[index]);
        }
      }
    }

    const query = queryForming.join(" ");

    return query;
  }
}

module.exports = TranslatorService;
