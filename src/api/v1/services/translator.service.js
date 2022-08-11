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

    const query = queryForming.join(" ");

    return query;
  }
}

module.exports = TranslatorService;
