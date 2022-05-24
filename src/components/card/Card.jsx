import "./card.css";
import { useEffect, useState } from "react";
import BrainIcon from "../brain-icon";

const Card = ({ id, currency, isFliped, isDisabled, onClickSelect }) => {
  const [isCardActive, setIsCardActive] = useState(false);
  useEffect(() => {
    setIsCardActive(isFliped);
  }, [isFliped]);
  const classNames = `card ${isCardActive ? "card--active" : "card--inactive"}`;
  return (
    <div className="game__card__card-wrapper" data-testid="game-card-container">
      <div
        className={classNames}
        onClick={() => !isDisabled && onClickSelect()}
        id={id}
        data-currency={currency}
        data-testid="game-card-wrapper"
      >
        <div className="card-inner" data-testid="game-card-inner">
          <div className="card-front">
            <BrainIcon color="#fff" />
          </div>
          <div className="card-back" data-testid="game-card-outer">
            <img
              src={`./assets/crypto-icons/${currency}.svg`}
              alt={currency}
              data-testid="game-card-currency-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
