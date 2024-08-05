import React, { useState, useEffect } from 'react';
import './Cat.css'; // Asegúrate de tener un archivo CSS para los estilos

const Cat = () => {
  // Creamos un array con 9 valores, que pueden tomar T | F; empezando con el null
  const [data, setData] = useState(Array(9).fill(null));
  // Creamos la función que según el index pueda actualizar el estado del tablero (manejar clic)
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  // Maneja el clic en una casilla
  const handleClick = (index) => {
    if (data[index] || winner) return; // No hacer nada si la casilla ya está ocupada o si hay un ganador

    const newData = data.slice();
    newData[index] = currentPlayer; // Actualiza el estado del tablero con el jugador actual
    setData(newData);
  };

  // Verifica el ganador después de cada movimiento
  useEffect(() => {
    const Winner = checkWinner(data);
    if (Winner) {
      setWinner(Winner);
      alert(`Jugador ${Winner} gana!`);
    } else if (data.every(cell => cell)) {
      setWinner('Draw');
      alert('¡Es un empate!');
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  }, [data]);

  // La máquina hace su movimiento cuando es su turno
  useEffect(() => {
    if (currentPlayer === 'O' && !winner) {
      setTimeout(() => {
        makeMachineMove();
      }, 500); // Retraso para simular tiempo de respuesta de la máquina
    }
  }, [currentPlayer]);

  // Verifica si hay un ganador en el tablero
  const checkWinner = (board) => {
    const combinacionGanadora = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    // Recorre por todas las posibles combinaciones ganadoras
    for (const [a, b, c] of combinacionGanadora) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Devuelve el valor ganador
      }
    }
    return null;
  };

  // La máquina hace un movimiento al azar
  const makeMachineMove = () => {
    let emptyIndices = data.map((value, index) => value === null ? index : null).filter(index => index !== null);
    let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const newData = data.slice();
    newData[randomIndex] = 'O';
    setData(newData);
  };

  // Reinicia el juego
  const resetGame = () => {
    setData(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div className='game-container'>
      <h1>Tic Tac Toe</h1>
      <div className='board'>
        {data.map((value, index) => (
          <div 
            key={index}
            className={`cell ${value}`} // Añade una clase para el estilo según el valor
            onClick={() => handleClick(index)}
          >
            {value} {/* Muestra 'X' o 'O' en la casilla */}
          </div>
        ))}
      </div>
      {winner && (
        <div className='game-status'>
          {winner === 'Draw' ? '¡Es un empate!' : `Jugador ${winner} gana!`}
          <button onClick={resetGame}>Reiniciar Juego</button>
        </div>
      )}
    </div>
  );
};

export default Cat;
