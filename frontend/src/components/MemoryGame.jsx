import React, { useState, useEffect } from "react";

const MemoryGame = () => {
  const symbols = ["🌿", "🌊", "⭐", "☀️", "🍂", "🌻", "🔥", "🌙"];
  const [cards, setCards] = useState([...symbols, ...symbols].sort(() => Math.random() - 0.5));
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isWin, setIsWin] = useState(false);

  // Flip card logic
  const flipCard = (index) => {
    if (selectedCards.length < 2 && !selectedCards.includes(index) && !matchedCards.includes(index)) {
      setSelectedCards([...selectedCards, index]);

      if (selectedCards.length === 1) {
        setMoves(moves + 1);
        checkMatch(index);
      }
    }
  };

  // Check if cards match
  const checkMatch = (index) => {
    const [firstIndex] = selectedCards;
    if (cards[firstIndex] === cards[index]) {
      setMatchedCards([...matchedCards, firstIndex, index]);
      setSelectedCards([]);

      if (matchedCards.length + 2 === cards.length) {
        setIsWin(true);
      }
    } else {
      setTimeout(() => {
        setSelectedCards([]);
      }, 800);
    }
  };

  // Restart game
  const restartGame = () => {
    setCards([...symbols, ...symbols].sort(() => Math.random() - 0.5));
    setSelectedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setIsWin(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 font-poppins">
      <div className="text-center bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-green-400 mb-4">🌿 Memory Flow 🌊</h1>
        <p className="text-white mb-4">Moves: <span className="font-bold">{moves}</span></p>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {cards.map((symbol, index) => (
            <div
              key={index}
              onClick={() => flipCard(index)}
              className={`w-20 h-20 flex items-center justify-center text-3xl rounded-lg cursor-pointer transition-all duration-300 ${
                selectedCards.includes(index) || matchedCards.includes(index)
                  ? "bg-green-400 transform rotate-y-180"
                  : "bg-gray-600 hover:bg-gray-500 hover:scale-110"
              }`}
            >
              {selectedCards.includes(index) || matchedCards.includes(index) ? symbol : "❓"}
            </div>
          ))}
        </div>

        <button
          onClick={restartGame}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          🔄 Restart Game
        </button>

        {isWin && (
          <p className="text-yellow-400 mt-4 text-xl">
            🎉 You Won in <span className="font-bold">{moves}</span> moves!
          </p>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;