export const getStyleObject = styleString =>
  styleString
    .substring(0, styleString.length - 1)
    .split(";")
    .map(el => el.trim())
    .reduce((acc, currentValue) => {
      const val = currentValue.split(":");

      acc[val[0]] = parseInt(val[1]);

      return acc;
    }, {});
