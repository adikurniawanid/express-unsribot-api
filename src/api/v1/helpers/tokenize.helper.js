"use strict";

module.exports = async (tokenParam) => {
  // return tokenParam.split(" ");
  const result = tokenParam.split(/(?!\(.*)\s(?![^(]*?\))/g);
  result.forEach((element, index) => {
    result[index] = element.replace(/([\(\)])/g, "");
  });

  return result;
};
