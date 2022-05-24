import { WON, TOKEN_REWARD } from "../../constants";

const ResultBanner = ({ result, difficultyLevel, transferToken }) => {
  return (
    <div className="game__modal-results" data-testid="result-banner">
      <div className="container game__modal-results__content">
        {result === WON ? (
          <>
            <p> You Won!</p>
            <button
              data-testid="claim-prize-button"
              onClick={transferToken(TOKEN_REWARD[difficultyLevel])}
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
