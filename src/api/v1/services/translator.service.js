"use strict";

class TranslatorService {
  static async translating(parserParam) {
    const queryForming = [];

    if (parserParam.keywordIdentify.selectIdentify) {
      queryForming.push("SELECT");
      if (parserParam.keywordIdentify.distinctIdentify) {
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
      parserParam.conditionIdentify.columnConditionIdentify.length > 0 &&
      parserParam.conditionIdentify.columnConditionIdentify[0].conditionValue
    ) {
      queryForming.push("WHERE");

      for (
        let index = 0;
        index < parserParam.conditionIdentify.columnConditionIdentify.length;
        index++
      ) {
        if (
          parserParam.conditionIdentify.columnConditionIdentify[index]
            .conditionValue !== undefined
        ) {
          if (
            parserParam.conditionIdentify.columnConditionIdentify[index]
              .operator === "kandung"
          ) {
            queryForming.push(
              parserParam.conditionIdentify.columnConditionIdentify[index]
                .view +
                "." +
                parserParam.conditionIdentify.columnConditionIdentify[index]
                  .column +
                " LIKE " +
                '"%' +
                parserParam.conditionIdentify.columnConditionIdentify[index]
                  .conditionValue +
                '%"'
            );
          } else if (
            parserParam.conditionIdentify.columnConditionIdentify[index]
              .operator === "awal"
          ) {
            queryForming.push(
              parserParam.conditionIdentify.columnConditionIdentify[index]
                .view +
                "." +
                parserParam.conditionIdentify.columnConditionIdentify[index]
                  .column +
                ' LIKE "' +
                parserParam.conditionIdentify.columnConditionIdentify[index]
                  .conditionValue +
                '%"'
            );
          } else if (
            parserParam.conditionIdentify.columnConditionIdentify[index]
              .operator === "akhir"
          ) {
            queryForming.push(
              parserParam.conditionIdentify.columnConditionIdentify[index]
                .view +
                "." +
                parserParam.conditionIdentify.columnConditionIdentify[index]
                  .column +
                ' LIKE "%' +
                parserParam.conditionIdentify.columnConditionIdentify[index]
                  .conditionValue +
                '"'
            );
          } else if (
            [">=", ">", "<=", "<", "=", "!="].includes(
              parserParam.conditionIdentify.columnConditionIdentify[index]
                .operator
            )
          ) {
            queryForming.push(
              `${parserParam.conditionIdentify.columnConditionIdentify[index].view}.${parserParam.conditionIdentify.columnConditionIdentify[index].column} ${parserParam.conditionIdentify.columnConditionIdentify[index].operator} "${parserParam.conditionIdentify.columnConditionIdentify[index].conditionValue}"`
            );
          } else if (
            parserParam.conditionIdentify.columnConditionIdentify[index]
              .operator === "default"
          ) {
            queryForming.push(
              parserParam.conditionIdentify.columnConditionIdentify[index]
                .view +
                "." +
                parserParam.conditionIdentify.columnConditionIdentify[index]
                  .column +
                ' = "' +
                parserParam.conditionIdentify.columnConditionIdentify[index]
                  .conditionValue +
                '"'
            );
          }

          if (
            parserParam.conditionIdentify.columnConditionIdentify[index + 1] !==
            undefined
          ) {
            switch (
              parserParam.conditionIdentify.logicOperatorIdentify[index]
            ) {
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

    if (parserParam.keywordIdentify.orderIdentify.length > 0) {
      queryForming.push("ORDER BY");

      let queryFormingOrder = [];

      for (
        let index = 0;
        index < parserParam.keywordIdentify.orderIdentify.length;
        index++
      ) {
        if (
          ["turun", "rendah"].includes(
            parserParam.keywordIdentify.orderIdentify[index].sortDirection
          )
        ) {
          queryFormingOrder.push(
            `${parserParam.keywordIdentify.orderIdentify[index].view}.${parserParam.keywordIdentify.orderIdentify[index].column} DESC`
          );
        } else {
          queryFormingOrder.push(
            `${parserParam.keywordIdentify.orderIdentify[index].view}.${parserParam.keywordIdentify.orderIdentify[index].column} ASC`
          );
        }
      }
      queryForming.push(queryFormingOrder.join(", "));
    }

    if (parserParam.keywordIdentify.limitIdentify) {
      queryForming.push(
        `LIMIT ${parserParam.keywordIdentify.limitIdentify.amount}`
      );
    }

    const translate = queryForming.join(" ");

    return translate;
  }
}

module.exports = TranslatorService;
