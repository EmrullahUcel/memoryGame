import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const images = [
  { src: "./src/assets/berrin.jpg", matched: false },
  { src: "./src/assets/eylem.jpg", matched: false },
  { src: "./src/assets/feyza.jpg", matched: false },
  { src: "./src/assets/cukulatam.jpg", matched: false },
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((image) => ({ ...image, id: Math.random() }));
    setFirst(null);
    setSecond(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    first ? setSecond(card) : setFirst(card);
  };

  const resetTurn = () => {
    setFirst(null);
    setSecond(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };
  useEffect(() => {
    if (first && second) {
      setDisabled(true);
      if (first.src === second.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === first.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [first, second]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Match Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === first || card === second || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
};

export default App;
