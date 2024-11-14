import { GameBoard } from './GameBoard.js';
import { Ship } from './Ship.js';

document.addEventListener("DOMContentLoaded", () => {
  let selfBoard = document.querySelector(".self table").tBodies[0];
  let rivalBoard = document.querySelector(".rival table").tBodies[0];
  let gameBoard = new GameBoard();

  let carrier = new Ship(5, ["A1", "B1", "C1", "D1", "E1"]);
  let battleship = new Ship(4, ["A2", "B2", "C2", "D2"]);
  let cruiser = new Ship(3, ["A3", "B3", "C3"]);
  let submarine = new Ship(3, ["A4", "B4", "C4"]);
  let destroyer = new Ship(2, ["A5", "B5"]);

  gameBoard.placeShip(carrier);
  gameBoard.placeShip(battleship);
  gameBoard.placeShip(cruiser);
  gameBoard.placeShip(submarine);
  gameBoard.placeShip(destroyer);

  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 10; col++) {
      const selfCell = selfBoard.rows[row].cells[col];
      const rivalCell = rivalBoard.rows[row].cells[col];

      const coordinate = String.fromCharCode(64 + row) + col;
      selfCell.setAttribute("data-coordinate", coordinate);
      rivalCell.setAttribute("data-coordinate", coordinate);

      rivalCell.addEventListener("click", () => {
        gameBoard.receiveAttack(coordinate, rivalCell, rivalBoard);

        if (gameBoard.allShipsSunk()) {
          console.log("All ships sunk!");
        }
      });
    }
  }
});
