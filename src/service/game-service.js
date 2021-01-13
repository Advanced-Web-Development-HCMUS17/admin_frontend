
function refactorArray(history, row) {
    let array = Array(row * row).fill(null);
    for (let i = 0; i < history.length; i++) {
      array[history[i]] = (i % 2 === 0) ? 'X' : 'O';
    }
    return array;
  }
  
  function ulti(history, rowNow, colNow, xValue, yValue, sign, row) {
    //console.log(history)
    let i, j;
    let number;
    let array = [];
    const rowInit = rowNow - 4 * xValue;
    const colInit = colNow - 4 * yValue;
    for (i = rowInit, j = colInit, number = 0;
      Math.abs(i - rowInit) <= 8 && Math.abs(j - colInit) <= 8; i += xValue, j += yValue) {
      if (i < 0 || j < 0 || i >= row || j >= row) {
        continue;
      }
      if (history[row * i + j] === sign) {
        number++;
        array.push(row * i + j);
      } else {
        array = [];
        number = 0;
      }
      if (number === 5) {
        break;
      }
    }
    if (number === 5) {
      return array;
    } else {
      return null;
    }
  }
  
  function calculateWinner(newHistory, move, row) {
    const history = refactorArray(newHistory, row);
    const sign = history[move];
    const rowNow = Math.floor(move / row);
    const colNow = move - row * rowNow;
    const diagonal1 = ulti(history, rowNow, colNow, 1, 1, sign, row);
    if (diagonal1) {
      return diagonal1;
    } else {
      const diagonal2 = ulti(history, rowNow, colNow, -1, 1, sign, row);
      if (diagonal2)
        return diagonal2;
      else {
        const horizontal = ulti(history, rowNow, colNow, 1, 0, sign, row);
        if (horizontal) {
          return horizontal;
        } else {
          const vertical = ulti(history, rowNow, colNow, 0, 1, sign, row);
          if (vertical) {
            return vertical;
          }
        }
      }
    }
    return null;
  }
  
  const gameServices = { refactorArray, calculateWinner };
  
  export default gameServices;