const reader = require("xlsx");

module.exports = (dirname) => {
  const file = reader.readFile(dirname);

  let result = {};

  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    const series = file.SheetNames[i];

    allDone = 0;
    while (temp) {
      let products = temp.splice(0, 1);
      const idx = temp.findIndex((el) => el["Name"] !== undefined);
      products = [
        ...products,
        ...temp.splice(0, idx === -1 ? temp.length : idx),
      ];
      const name = products[0]["Name"];
      const description = products[0]["Description"];
      const specifications = products.reduce(
        (acc, { Type, Value }) =>
          Type && Value ? (acc = [...acc, { type: Type, value: Value }]) : acc,
        []
      );
      const features = products.reduce(
        (acc, { Features }) => (Features ? (acc = [...acc, Features]) : acc),
        []
      );
      let suitable = products.reduce(
        (acc, { Suitable }) => (Suitable ? (acc = [...acc, Suitable]) : acc),
        []
      );
      if (suitable.length === 1) {
        if (
          !specifications.find((el) => el["type"].toLowerCase() === "usage")
        ) {
          specifications.push({ type: "Usage", value: suitable[0] });
          suitable = [];
        }
      }
      const product = {
        name,
        description,
        specifications,
        features,
        suitable,
      };

      result[series] = result[series]
        ? [...result[series], product]
        : [product];

      if (idx === -1) break;
    }
  }

  return result;
};
