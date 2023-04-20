export const TURNS = {
    x: 'X',
    o: 'O'
  }
  
  
  
  
  export  const WINNER_COMBOS = [
    //Para saber las combinaciones ganadoras
    [0, 1, 2], //Horizontales
    [3, 4, 5],  
    [6, 7, 8],
    [0, 3, 6], //Verticales
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], //Diagonales
    [2, 4, 6]
  ];

  export const  checkWinner= (boardToCheck)=>{
    //revisamos todas las combinaciones ganadoras
    for(const combo of WINNER_COMBOS){
      const [a, b, c]= combo;
      if( 
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
        ){
          return boardToCheck[a]
        }
    }
    //si no hay ganador 
    return null;
   
  }
  