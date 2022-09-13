const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const getWinnerWay = (board) => {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return lines[i];
    }
  }
  return null;
};

const p2mWinner = (player, board) => {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }
  return false;
};

export { getWinnerWay, p2mWinner };
