export class Ship {
    constructor(length, coordinates) {
      this.length = length;
      this.hits = 0;
      this.sunk = false;
      this.coordinates = coordinates;
    }
    gotHit() {
      this.hits++;
    }
    isSunk() {
      this.sunk = this.hits >= this.length;
  }
}