import currenciesData from "../data/currencies.json";

export const getCurrenciesList = (numOfCurrencies) => {
  let randomIds = [];
  let drawedCurrencies = [];
  let i = 0;
  const totalNumOfCurrencies = currenciesData["crypto-currencies"].length;
  console.log(currenciesData);

  do {
    const drawedNumber = Math.floor(Math.random() * totalNumOfCurrencies - 1);
    let isDrawedNumberExisted = randomIds.includes(drawedNumber);
    if (!isDrawedNumberExisted) {
      randomIds[i] = drawedNumber;
      drawedCurrencies[i] = currenciesData["crypto-currencies"][drawedNumber];
      i++;
    }
  } while (randomIds.length < numOfCurrencies);

  return drawedCurrencies;
};
