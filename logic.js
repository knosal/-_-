//Подготовка. Информациā об игроках хранитсā в массиве. Каждому игроку соответствует проставлāемýй символ на поле: 
  let players = ['x', 'o'];
  let activePlayer = 0;


//Создатþ игровое поле. Оно должно представлāтþ из себā массив массивов
  function createGameField() {
   return [
     ['', '', ''],
     ['', '', ''],
     ['', '', '']
   ];
  }

  function startGame() {
    gameField = createGameField();
    //Установитþ активного игрока
    activePlayer = 0;
    //Вýзватþ функциĀ renderBoard() длā отрисовки игрового полā
    renderBoard(gameField);
  }
  //Заглушка
  function isWinningSituation() {
   return false;
  }

//вýзýваетсā с двумā параметрами — номером строки и колонки āчейки, на которой произошел клик. 
  function click(row, column) {
   //Обновитþ игровое поле, записатþ в нужнуĀ āчейку символ игрока
   const playerSymbol = players[activePlayer];
   gameField[row][column] = playerSymbol;
   //Вýзватþ функциĀ renderBoard() длā отрисовки игрового полā
   renderBoard(gameField);
  
    //  Проверитþ, вýигрýшнаā ли сложиласþ ситуациā
   if (isWinningSituation()) {
     //Если ситуациā вýигрýшнаā, вýзватþ функциĀ showWinner() и передатþ в нее номер игрока
      showWinner(activePlayer);
   } 
   //Если нужно игратþ далþше, то передатþ ход следуĀщему игроку
    activePlayer = (activePlayer + 1) % players.length;
  }

  //Отрисовка символов
  function isWinningSequence(r0, r1, ri, c0, c1, ci) {
   let firstSymbol = null;
   for (
         let r = r0, c = c0;
         Math.abs(r1-r) > 0 && Math.abs(c1-c) > 0;
         r += ri, c += ci
   ) {
       const symbol = gameField[r][c];
       if (symbol === '') {
         return false;
       }
       if (firstSymbol === null) {
         firstSymbol = symbol;
         continue;
       }
       if (firstSymbol !== symbol) {
         return false;
       }
     }
   return true;
  }

  //Игрок побеждает, когда заполнāет своими символами:
  function isWinningSituation() {
    const N = gameField.length;

    //Целую строку
    for (let i = 0; i < N; ++i) {
      if (
        isWinningSequence(i, i+1, 0, 0, N, 1) ||
        isWinningSequence(0, N, 1, i, i+1, 0)
      ) {
        return true;
      }
    }
      if (
         isWinningSequence(0, N, 1, 0, N, 1) ||
         isWinningSequence(N-1, -1, -1, 0, N, 1)
       ) {
         return true;
       }
    return false;
  }
