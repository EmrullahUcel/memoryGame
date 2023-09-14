import pati from "/public/pati.png";

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          onClick={handleClick}
          className="back"
          src={pati}
          alt="card back"
        />
      </div>
    </div>
  );
};

export default SingleCard;
