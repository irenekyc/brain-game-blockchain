import { useState, useEffect, useContext } from "react";
import Card from "../../components/card";
import ResultBanner from "../../components/result-banner";
import {
  WON,
  LOST,
  TRANSFER_PROGRESS_PENDING,
  TRANSFER_PROGRESS_NULL,
} from "../../constants";
import { BrainGameContext } from "../../context/BrainGameContext";

const GameCardsContainer = ({
  currenciesList,
  gameStep,
  showResult,
  difficultyLevel,
  gameRestart,
}) => {
  const [renderList, setRenderList] = useState([]);
  const [userSelectedPair, setUserSelectedPair] = useState([]);
  const [correctedPairs, setCorrectedPairs] = useState([]);

  const { transferProgress } = useContext(BrainGameContext);

  useEffect(() => {
    if (gameStep !== 5) return;
    if (transferProgress === TRANSFER_PROGRESS_PENDING && gameStep === 5) {
      gameRestart();
    }
  }, [transferProgress, gameStep, gameRestart]);

  useEffect(() => {
    // 1. copy currencies list
    let list = [];
    currenciesList.forEach((currency) => {
      const copy1 = {
        id: `${currency.currencyName}-1`,
        ...currency,
      };
      const copy2 = {
        id: `${currency.currencyName}-2`,
        ...currency,
      };
      list.push(copy1);
      list.push(copy2);
    });

    // 2. shuffle
    const shuffledList = list
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    setRenderList(shuffledList);
  }, [currenciesList]);

  useEffect(() => {
    if (userSelectedPair.length === 2) {
      // Check the pairs
      const currencyOne = userSelectedPair[0].split("-")[0];
      const currencyTwo = userSelectedPair[1].split("-")[0];

      if (currencyOne === currencyTwo) {
        setCorrectedPairs((prevState) => [...prevState, currencyOne]);
      }

      setTimeout(() => setUserSelectedPair([]), 800);
    }
  }, [userSelectedPair]);

  useEffect(() => {
    if (correctedPairs.length === 0 || currenciesList.length === 0) return;
    if (correctedPairs.length === currenciesList.length) {
      // Win!
      showResult();
    }
  }, [correctedPairs, currenciesList, showResult]);
  return (
    <>
      {renderList.map((currency) => (
        <Card
          key={currency.id}
          id={currency.id}
          currency={currency.currencyName}
          isFliped={
            gameStep === 3 ||
            userSelectedPair.includes(currency.id) ||
            correctedPairs.includes(currency.currencyName)
          }
          isDisabled={
            gameStep === 3 ||
            userSelectedPair.includes(currency.id) ||
            userSelectedPair.length === 2 ||
            gameStep === 5 ||
            correctedPairs.includes(currency.currencyName)
          }
          onClickSelect={() =>
            setUserSelectedPair([...userSelectedPair, currency.id])
          }
        />
      ))}
      {gameStep === 5 && transferProgress === TRANSFER_PROGRESS_NULL && (
        <ResultBanner
          result={correctedPairs.length === currenciesList.length ? WON : LOST}
          difficultyLevel={difficultyLevel}
        />
      )}
    </>
  );
};

export default GameCardsContainer;
