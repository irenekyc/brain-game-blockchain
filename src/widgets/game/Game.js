import "./game.css";
import { useState, useContext } from "react";

import CountDown from "../../components/count-down";
import { getCurrenciesList } from "../../helpers/currencies";
import GameCardsContainer from "../game-cards-container";
import { TOKEN_REWARD } from "../../constants";
import { BrainGameContext } from "../../context/BrainGameContext";

let gameTimes = {
  2: 3,
  3: 10,
  4: 60,
  5: undefined,
};

let difficultyLevelNumber = {
  easy: 8,
  medium: 12,
  hard: 18,
};

const Game = ({ stopGame }) => {
  const [gameStep, setGameStep] = useState(1);
  const [currenciesList, setCurrenciesList] = useState([]);
  const [difficultyLevel, setDifficultyLevel] = useState(undefined);
  const { gameReset, createGameHistoryEntry } = useContext(BrainGameContext);

  const selectDifficultyLevel = (e) => {
    const level = e.target.getAttribute("data-difficulty-level");
    setGameStep(2);
    setCurrenciesList(getCurrenciesList(difficultyLevelNumber[level]));
    setDifficultyLevel(level);
  };
  const goToNextStep = () => {
    setGameStep(gameStep + 1);
    if (gameStep + 1 === 5) {
      // need to refactor later

      createGameHistoryEntry({ status: "lost", difficultyLevel });
    }
  };

  const showResult = () => {
    setGameStep(5);

    createGameHistoryEntry({ status: "win", difficultyLevel });
  };

  const gameRestart = () => {
    gameReset();
    stopGame();
    setGameStep(1);
  };

  const renderHeading = () => {
    switch (gameStep) {
      case 1:
        return "1. Choose a level";
      case 3:
        return "2. Memorizing!";
      case 4:
        return "3. Find the pair match!";
      case 5:
        return "Result";
      default:
        return "";
    }
  };

  return (
    <>
      <h2>{renderHeading()}</h2>
      {gameStep === 1 && (
        <div>
          <button className="button--outline" onClick={stopGame}>
            Back to instructions
          </button>
          <p>There are three difficulty levels</p>
          <ul>
            <li>
              {" "}
              <p>
                Easy : You will receive {TOKEN_REWARD.easy} token by winning.
              </p>
            </li>
            <li>
              <p>
                Medium : You will receive {TOKEN_REWARD.medium} tokens by
                winning.
              </p>
            </li>
            <li>
              <p>
                Hard : You will receive {TOKEN_REWARD.hard} tokens by winning.
              </p>
            </li>
          </ul>
          <p>
            You will be given 10 seconds to memorizing the location of each card
          </p>
          <p>Locate all pair matches within one mintue!</p>

          <button
            data-difficulty-level="easy"
            onClick={selectDifficultyLevel}
            className="game__level-button"
          >
            Easy
          </button>
          <button
            className="game__level-button"
            data-difficulty-level="medium"
            onClick={selectDifficultyLevel}
          >
            Medium
          </button>
          <button
            className="game__level-button"
            data-difficulty-level="hard"
            onClick={selectDifficultyLevel}
          >
            Hard
          </button>
          {/* <button
            data-difficulty-level="nightmare"
            onClick={selectDifficultyLevel}
          >
            Nightmare
          </button> */}
        </div>
      )}
      {gameStep === 2 && (
        <div className="game__modal-countdown">
          <div className="game__modal-countdown__content">
            <CountDown
              countDown={3}
              goToNextStep={goToNextStep}
              shouldStopClock={false}
              gameStep={gameStep}
            />
          </div>
        </div>
      )}
      {gameStep >= 3 && (
        <>
          <p>
            <CountDown
              countDown={gameTimes[gameStep]}
              goToNextStep={goToNextStep}
              shouldStopClock={gameStep === 5}
              gameStep={gameStep}
              withText
            />
          </p>
          <div className="game__cards-container">
            <GameCardsContainer
              difficultyLevel={difficultyLevel}
              currenciesList={currenciesList}
              gameStep={gameStep}
              showResult={showResult}
              gameRestart={gameRestart}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Game;
