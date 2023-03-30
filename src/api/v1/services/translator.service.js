"use strict";

class TranslatorService {
  static async translating(parserParam) {
    const queryForming = [];
    const selectIdentify = parserParam.keywordIdentify.selectIdentify;
    const distinctIdentify = parserParam.keywordIdentify.distinctIdentify;
    const columnIdentify = parserParam.columnIdentify;
    const viewIdentify = parserParam.viewIdentify;
    const columnConditionIdentify =
      parserParam.conditionIdentify.columnConditionIdentify;
    const orderIdentify = parserParam.keywordIdentify.orderIdentify;
    const limitIdentify = parserParam.keywordIdentify.limitIdentify;

    const queryFormingSelect = () => {
      if (selectIdentify) {
        queryForming.push("SELECT");
      } else {
        throw {
          status: 404,
          message: "SELECT not found",
        };
      }
    };

    const queryFormingDistinct = () => {
      if (distinctIdentify) {
        queryForming.push("DISTINCT");
      }
    };

    const queryFormingColumn = () => {
      if (columnIdentify === "default") {
        queryForming.push("*");
      } else {
        const queryFormingColumn = [];
        for (let index = 0; index < columnIdentify.length; index++) {
          queryFormingColumn.push(
            `${columnIdentify[index].view}.${columnIdentify[index].column}`
          );
        }
        queryForming.push(queryFormingColumn.join(", "));
      }
    };

    const queryFormingView = () => {
      if (viewIdentify.length > 0) {
        queryForming.push("FROM");
        queryForming.push(viewIdentify.join(", "));
      } else {
        throw {
          status: 404,
          message: "View Table not found",
        };
      }
    };

    const queryFormingCondition = () => {
      if (
        columnConditionIdentify.length > 0 &&
        columnConditionIdentify[0].conditionValue
      ) {
        queryForming.push("WHERE");

        for (let index = 0; index < columnConditionIdentify.length; index++) {
          if (columnConditionIdentify[index].conditionValue !== undefined) {
            queryForming.push(
              columnConditionIdentify[index].view +
                "." +
                columnConditionIdentify[index].column
            );

            if (columnConditionIdentify[index].operator === "kandung") {
              queryForming.push(
                `ILIKE '%${columnConditionIdentify[index].conditionValue}%'`
              );
            } else if (columnConditionIdentify[index].operator === "awal") {
              queryForming.push(
                `ILIKE '${columnConditionIdentify[index].conditionValue}%'`
              );
            } else if (columnConditionIdentify[index].operator === "akhir") {
              queryForming.push(
                `ILIKE '%${columnConditionIdentify[index].conditionValue}'`
              );
            } else if (
              [">=", ">", "<=", "<", "=", "!="].includes(
                columnConditionIdentify[index].operator
              )
            ) {
              queryForming.push(
                `${columnConditionIdentify[index].operator} '${columnConditionIdentify[index].conditionValue}'`
              );
            } else {
              if (isNaN(columnConditionIdentify[index].conditionValue)) {
                queryForming.push(
                  `ILIKE '${columnConditionIdentify[index].conditionValue}'`
                );
              } else {
                queryForming.push(
                  `= '${columnConditionIdentify[index].conditionValue}'`
                );
              }
            }

            if (columnConditionIdentify[index + 1] !== undefined) {
              parserParam.conditionIdentify.logicOperatorIdentify[index] ===
              "atau"
                ? queryForming.push("OR")
                : queryForming.push("AND");
            }
          }
        }
      }
    };

    const queryFormingOrder = () => {
      if (parserParam.keywordIdentify.orderIdentify.length > 0) {
        queryForming.push("ORDER BY");

        const queryFormingOrder = [];

        for (let index = 0; index < orderIdentify.length; index++) {
          if (
            ["turun", "rendah"].includes(orderIdentify[index].sortDirection)
          ) {
            queryFormingOrder.push(
              `${orderIdentify[index].view}.${orderIdentify[index].column} DESC`
            );
          } else {
            queryFormingOrder.push(
              `${orderIdentify[index].view}.${orderIdentify[index].column} ASC`
            );
          }
        }
        queryForming.push(queryFormingOrder.join(", "));
      }
    };

    const queryFormingLimit = () => {
      if (limitIdentify) {
        queryForming.push(`LIMIT ${limitIdentify.amount}`);
      }
    };

    queryFormingSelect();
    queryFormingDistinct();
    queryFormingColumn();
    queryFormingView();
    queryFormingCondition();
    queryFormingOrder();
    queryFormingLimit();

    const translate = queryForming.join(" ");

    return translate;
  }
}

module.exports = TranslatorService;
