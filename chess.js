const boardEl = document.getElementById("chessboard");

let board = [
  ["♜","♞","♝","♛","♚","♝","♞","♜"],
  ["♟","♟","♟","♟","♟","♟","♟","♟"],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["♙","♙","♙","♙","♙","♙","♙","♙"],
  ["♖","♘","♗","♕","♔","♗","♘","♖"]
];

let selected = null;
let validMoves = [];

function drawBoard() {
  boardEl.innerHTML = "";
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.classList.add((r + c) % 2 === 0 ? "light" : "dark");
      square.dataset.row = r;
      square.dataset.col = c;
      square.textContent = board[r][c];

      if (selected?.r === r && selected?.c === c) {
        square.classList.add("selected");
      }
      if (validMoves.some(m => m.r === r && m.c === c)) {
        square.classList.add("valid");
      }

      square.addEventListener("click", () => onSquareClick(r, c));
      boardEl.appendChild(square);
    }
  }
}

function onSquareClick(r, c) {
  let piece = board[r][c];

  if (!selected && piece === "") return;

  if (!selected) {
    selected = { r, c };
    validMoves = getValidMoves(r, c);
  } else {
    if (validMoves.some(m => m.r === r && m.c === c)) {
      board[r][c] = board[selected.r][selected.c];
      board[selected.r][selected.c] = "";
    }
    selected = null;
    validMoves = [];
  }

  drawBoard();
}

function getValidMoves(r, c) {
  const piece = board[r][c];
  const moves = [];
  const isWhite = "♙♖♘♗♕♔".includes(piece);

  // Pawn Movement
  if (piece === "♙") {
    if (r > 0 && board[r - 1][c] === "") moves.push({ r: r - 1, c });
  }
  if (piece === "♟") {
    if (r < 7 && board[r + 1][c] === "") moves.push({ r: r + 1, c });
  }

  // Rook
  if ("♖♜".includes(piece)) {
    addDirectionalMoves(r, c, moves, [[1,0],[-1,0],[0,1],[0,-1]]);
  }

  // Bishop
  if ("♗♝".includes(piece)) {
    addDirectionalMoves(r, c, moves, [[1,1],[1,-1],[-1,1],[-1,-1]]);
  }

  // Queen
  if ("♕♛".includes(piece)) {
    addDirectionalMoves(r, c, moves, [
      [1,0],[-1,0],[0,1],[0,-1],
      [1,1],[1,-1],[-1,1],[-1,-1]
    ]);
  }

  // Knight
  if ("♘♞".includes(piece)) {
    const jumps = [
      [2,1],[2,-1],[-2,1],[-2,-1],
      [1,2],[1,-2],[-1,2],[-1,-2]
    ];
    jumps.forEach(([dr, dc]) => {
      const nr = r + dr, nc = c + dc;
      if (nr>=0 && nr<8 && nc>=0 && nc<8) moves.push({r:nr,c:nc});
    });
  }

  return moves;
}

function addDirectionalMoves(r, c, moves, directions) {
  for (let [dr, dc] of directions) {
    let nr = r + dr, nc = c + dc;
    while (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
      if (board[nr][nc] !== "") break;
      moves.push({ r: nr, c: nc });
      nr += dr;
      nc += dc;
    }
  }
}

drawBoard();