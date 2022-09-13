const getAvailabaleCells = (board) => {
  return board.filter((s) => s === null);
};

const getIndexOfAvailabaleCells = (board) => {
  let availableCells = [];
  for (let i = 0; i < 9; i++) {
    if (board[i] == null) {
      availableCells.push(i);
    }
  }
  return availableCells;
};

export { getAvailabaleCells, getIndexOfAvailabaleCells };
