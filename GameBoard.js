import { Ship } from './Ship.js';

export class GameBoard {
  constructor() {
    this.ships = [];
    this.board = Array(10).fill(null).map(() => Array(10).fill(null)); // 10x10 board
  }

  // Places a ship on the board
  placeShip(ship) {
    let placed = false;

    while (!placed) {
      const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical'; // Randomly choose orientation
      const startRow = Math.floor(Math.random() * 10);
      const startCol = Math.floor(Math.random() * 10);

      let coordinates = [];

      for (let i = 0; i < ship.length; i++) {
        let row, col;

        if (orientation === 'horizontal') {
          row = startRow;
          col = startCol + i; // Move horizontally
        } else {
          row = startRow + i; // Move vertically
          col = startCol;
        }

        // Check if within board bounds and not overlapping
        if (row >= 10 || col >= 10 || this.board[row][col] !== null) {
          break; // Invalid placement, break out of the loop to retry
        }
        coordinates.push(String.fromCharCode(65 + row) + (col + 1)); // Convert to coordinate string
      }

      // If all checks pass, place the ship
      if (coordinates.length === ship.length) {
        ship.coordinates = coordinates;
        this.ships.push(ship);
        coordinates.forEach(coordinate => {
          const row = coordinate.charCodeAt(0) - 65; // Convert letter to index
          const col = parseInt(coordinate[1]) - 1; // Convert number to index
          this.board[row][col] = ship; // Mark ship on the board
          const cell = document.querySelector(`[data-coordinate="${coordinate}"]`); // Select the cell in the DOM
          if (cell) {
            cell.classList.add("ship-cell"); // Add the ship cell class
          }
        });
        placed = true; // Mark as placed
      }
    }
  }

  // Receives an attack on the specified coordinate
  receiveAttack(coordinate, cell) {
    const row = coordinate.charCodeAt(0) - 65; // Convert letter to index
    const col = parseInt(coordinate[1]) - 1; // Convert number to index

    const attackedShip = this.board[row][col];
    if (attackedShip) {
      attackedShip.gotHit(); // Mark the ship as hit
      cell.classList.add("hit-box"); // Add hit styling
      cell.textContent = "X"; // Mark the cell as hit
      console.log(`Hit on ${coordinate}`);
    } else {
      missed(cell); // Call the missed function if there's no ship
    }
  }

  // Checks if all ships are sunk
  allShipsSunk() {
    return this.ships.every(ship => ship.isSunk());
  }
}

// Missed function for styling missed shots
function missed(cell) {
  cell.classList.add("missed-box");
  cell.textContent = "•"; // Add a dot for a miss
  console.log("missed");
}
