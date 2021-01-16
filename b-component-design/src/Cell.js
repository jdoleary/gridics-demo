class Cell {
  constructor(contents) {
    this.change(contents);
  }
  change(contents) {
    if (typeof contents == "object") {
      this.formula = contents;
    } else if (typeof contents == "number") {
      this.number = contents;
    } else {
      throw new Error(`${contents} is not a valid value for Cell`);
    }
  }
  valueOf() {
    if (this.formula) {
      return this.formula.calculate();
    } else {
      return this.number;
    }
  }
  toString() {
    return this.valueOf();
  }
}

module.exports = Cell;
