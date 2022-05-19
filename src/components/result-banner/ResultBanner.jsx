import { WON, TOKEN_REWARD } from "../../constants";
import { BrainGameContext } from "../../context/BrainGameContext";
import { useContext } from "react";

const ResultBanner = ({ result, difficultyLevel }) => {
  const { transferToken } = useContext(BrainGameContext);

  return (
    <div className="game__modal-results">
      <div className="container game__modal-results__content">
        {result === WON ? (
          <>
            <p> You Won!</p>
            <button
              onClick={() => transferToken(TOKEN_REWARD[difficultyLevel])}
            >
              Claim your prize
            </button>
          </>
        ) : (
          <>
            <p>You Lost!</p>
            <p>Come Again tomorrow</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultBanner;
