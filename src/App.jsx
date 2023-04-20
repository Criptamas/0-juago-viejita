import confetti from 'canvas-confetti';
import { useState } from "react";
import { Square } from './components/Square.jsx';
import { TURNS, checkWinner} from './components/Constants.jsx'; 

function App() {

  const [board, setBoard] = useState(()=>{
    console.log('Inicializar estado del board');
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) :  Array(9).fill(null)
  });


  const [turn, setTurn]= useState(()=>{
    console.log('Inicializar estado del turno');
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.x
  
    TURNS.x
  });
  
  const [winner, setWinner] = useState(null);



//Funcion para reiniciar el juego 
  const resetGame= ()=>{
    setBoard(Array(9).fill(null));
    setTurn(TURNS.x);
    setWinner(null);
  }
  //Funcion para saber si el juego termino
  const checkEndGame = (boardToCheck)=>{
    return boardToCheck.every(square => square !== null)

   window.localStorage.removeItem('board');
   window.localStorage.removeItem('turn');
  }

  const updateBoard = (index)=>{
    if(board[index] || winner) return;

    const newBoard = [ ... board];
    newBoard[index] = turn;
    setBoard(newBoard);
    
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn)
    //Guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn',newTurn);
    const newWinner = checkWinner(newBoard);
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }

  }

  return (

    
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reiniciar partida</button>
    <section className="game">
        {
          board.map((_, index)=>{
            return (
             <Square
             key={index}
             index={index}
             updateBoard={updateBoard}>
            {board[index]}
             </Square>
            )
          })
        }
     
    </section>
    
    <section className="turn">
  <Square isSelected={turn === TURNS.x} >{TURNS.x}</Square>
  <Square isSelected={turn === TURNS.o} >{TURNS.o}</Square> 
</section>

        {
          winner !== null && (
            <section className="winner">
              <div className="text"> 
              <h2>
                {
              winner === false
              ? 'Empate'
              : `Ganador: ${winner}` 
                }
              </h2>
              <header className="win">
                 {winner && <Square>{winner}</Square>}
              </header>
                <footer>
                  <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
              </div>
            </section>
          )
        }

    </main>
    )}

export default App
