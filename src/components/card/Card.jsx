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
    <div className="game__card__card-wrapper">
      <div
        className={classNames}
        onClick={() => !isDisabled && onClickSelect()}
        id={id}
        data-currency={currency}
      >
        <div className="card-inner">
          <div className="card-front">
            <BrainIcon color="#fff" />
          </div>
          <div className="card-back">
            <img src={`./assets/crypto-icons/${currency}.svg`} alt={currency} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
