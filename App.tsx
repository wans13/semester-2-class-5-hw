import { useState } from "react";
import "./App.css";

interface Cell {
  status: string;
}

interface Row {
  row: Cell[];
}

interface TicTacToe {
  rows: Row[];
  turn: number;
  winner?: string;
}

function App() {
  const [board, setBoard] = useState<TicTacToe>({
    rows: [
      { row: [{ status: " " }, { status: " " }, { status: " " }] },
      { row: [{ status: " " }, { status: " " }, { status: " " }] },
      { row: [{ status: " " }, { status: " " }, { status: " " }] },
    ],
    turn: 1,
  });
  function checkWinner(board: TicTacToe, player: string) {
    for (let row = 0; row < board.rows.length; row++) {
      let rowcount = 0;
      for (let cell = 0; cell < board.rows[row].row.length; cell++) {
        if (board.rows[row].row[cell].status == player) {
          rowcount++;
        }
        if (rowcount == board.rows.length) {
          return true;
        }
      }
    }
    for (let cell = 0; cell < board.rows.length; cell++) {
      let columncount = 0;
      for (let col = 0; col < board.rows[cell].row.length; col++) {
        if (board.rows[col].row[cell].status == player) {
          columncount++;
        }
        if (columncount == board.rows.length) {
          return true;
        }
      }
    }
    let diagcount = 0;
    for (let cell = 0; cell < board.rows.length; cell++) {
      if (board.rows[cell].row[cell].status == player) {
        diagcount++;
      }
      if (diagcount == board.rows.length) {
        return true;
      }
    }
    let otherdiagcount = 0;
    for (let cell = 0; cell < board.rows.length; cell++) {
      if (board.rows[cell].row[board.rows.length - 1 - cell].status == player) {
        otherdiagcount++;
      }
      if (otherdiagcount == board.rows.length) {
        return true;
      }
    }
    return false;
  }

  function changeStatus(row: number, cell: number) {
    const copy = { ...board };
    const status = copy.rows[row].row[cell].status;
    if (status == "x" || status == "o") return;
    {
      copy.turn % 2 == 0
        ? (copy.rows[row].row[cell].status = "o")
        : (copy.rows[row].row[cell].status = "x");
    }
    copy.turn++;
    if (checkWinner(copy, "x") == true) {
      copy.winner = "Player 1";
    }
    if (checkWinner(copy, "o") == true) {
      copy.winner = "Player 2";
    }
    checkWinner(copy, "o");
    setBoard(copy);
  }
  function restartGame() {
    setBoard({
      rows: [
        { row: [{ status: " " }, { status: " " }, { status: " " }] },
        { row: [{ status: " " }, { status: " " }, { status: " " }] },
        { row: [{ status: " " }, { status: " " }, { status: " " }] },
      ],
      turn: 1,
    });
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Turn {board.turn}</h1>
      {board.rows.map((row, rowIndex) => {
        return (
          <div style={{ display: "flex" }}>
            {row.row.map((cell, cellIndex) => {
              return (
                <p
                  style={{
                    margin: 0,
                    border: "solid 1px",
                    fontSize: "42px",
                    width: "100px",
                    height: "100px",
                  }}
                  onClick={() => changeStatus(rowIndex, cellIndex)}
                >
                  {cell.status}
                </p>
              );
            })}
          </div>
        );
      })}
      <h1>Player {board.turn % 2 == 0 ? "2" : "1"}'s turn</h1>
      {board.winner !== undefined && (
        <div
          style={{
            position: "fixed",
            zIndex: "1",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4",
          }}
          onClick={restartGame}
        >
          <div
            style={{
              backgroundColor: "rgb(255,255,255)",
              width: "40%",
              margin: "30% auto",
              padding: "25px",
              borderRadius: "50px",
            }}
          >
            <h1>{board.winner + " wins!"}</h1>
            <button onClick={restartGame}>New Game</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
