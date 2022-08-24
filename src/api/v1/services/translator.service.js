"use strict";

class TranslatorService {
  static async translating(parserParam) {
    const queryForming = [];

    if (parserParam.selectIdentify) {
      queryForming.push("SELECT");
      if (parserParam.distinctIdentify) {
        queryForming.push("DISTINCT");
      }
    } else {
      throw {
        status: 404,
        message: "SELECT not found",
      };
    }

    if (parserParam.columnIdentify === "default") {
      queryForming.push("*");
    } else {
      const queryFormingColumn = [];
      for (let index = 0; index < parserParam.columnIdentify.length; index++) {
        queryFormingColumn.push(
          `${parserParam.columnIdentify[index].view}.${parserParam.columnIdentify[index].column}`
        );
      }
      queryForming.push(queryFormingColumn.join(", "));
    }

    if (parserParam.viewIdentify.length > 0) {
      queryForming.push("FROM");
      queryForming.push(parserParam.viewIdentify.join(", "));
    } else {
      throw {
        status: 404,
        message: "Table not found",
      };
    }

    if (
      parserParam.conditionIdentify.length > 0 &&
      parserParam.columnConditionIdentify.length > 0 &&
      parserParam.columnConditionIdentify[0].conditionValue
    ) {
      queryForming.push("WHERE");

      for (
        let index = 0;
        index < parserParam.columnConditionIdentify.length;
        index++
      ) {
        if (
          parserParam.columnConditionIdentify[index].conditionValue !==
          undefined
        ) {
          if (
            parserParam.columnConditionIdentify[index].operator === "kandung"
          ) {
            queryForming.push(
              parserParam.columnConditionIdentify[index].view +
                "." +
                parserParam.columnConditionIdentify[index].column +
                " LIKE " +
                '"%' +
                parserParam.columnConditionIdentify[index].conditionValue +
                '%"'
            );
          } else if (
            parserParam.columnConditionIdentify[index].operator === "awal"
          ) {
            queryForming.push(
              parserParam.columnConditionIdentify[index].view +
                "." +
                parserParam.columnConditionIdentify[index].column +
                ' LIKE "' +
                parserParam.columnConditionIdentify[index].conditionValue +
                '%"'
            );
          } else if (
            parserParam.columnConditionIdentify[index].operator === "akhir"
          ) {
            queryForming.push(
              parserParam.columnConditionIdentify[index].view +
                "." +
                parserParam.columnConditionIdentify[index].column +
                ' LIKE "%' +
                parserParam.columnConditionIdentify[index].conditionValue +
                '"'
            );
          } else if (
            [">=", ">", "<=", "<", "=", "!="].includes(
              parserParam.columnConditionIdentify[index].operator
            )
          ) {
            queryForming.push(
              `${parserParam.columnConditionIdentify[index].view}.${parserParam.columnConditionIdentify[index].column} ${parserParam.columnConditionIdentify[index].operator} "${parserParam.columnConditionIdentify[index].conditionValue}"`
            );
          } else if (
            parserParam.columnConditionIdentify[index].operator === "default"
          ) {
            queryForming.push(
              parserParam.columnConditionIdentify[index].view +
                "." +
                parserParam.columnConditionIdentify[index].column +
                ' = "' +
                parserParam.columnConditionIdentify[index].conditionValue +
                '"'
            );
          }

          if (parserParam.columnConditionIdentify[index + 1] !== undefined) {
            switch (parserParam.logicOperatorIdentify[index]) {
              case "dan":
                queryForming.push("AND");
                break;
              case "atau":
                queryForming.push("OR");
                break;
              default:
                queryForming.push("AND");
                break;
            }
          }
        }
      }
    }

    if (parserParam.orderIdentify.length > 0) {
      queryForming.push("ORDER BY");

      let queryFormingOrder = [];

      for (let index = 0; index < parserParam.orderIdentify.length; index++) {
        if (
          ["turun", "rendah"].includes(
            parserParam.orderIdentify[index].sortDirection
          )
        ) {
          queryFormingOrder.push(
            `${parserParam.orderIdentify[index].view}.${parserParam.orderIdentify[index].column} DESC`
          );
        } else {
          queryFormingOrder.push(
            `${parserParam.orderIdentify[index].view}.${parserParam.orderIdentify[index].column} ASC`
          );
        }
      }
      queryForming.push(queryFormingOrder.join(", "));
    }

    if (parserParam.limitIdentify) {
      queryForming.push(`LIMIT ${parserParam.limitIdentify.amount}`);
    }

    const translate = queryForming.join(" ");

    return translate;
  }
}

module.exports = TranslatorService;
