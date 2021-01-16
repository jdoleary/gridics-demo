const Cell = require("../Cell.js");

describe("Cell", () => {
  describe("toString", () => {
    it("should print the value of it's contents when cast to a string", () => {
      const a = new Cell(7);
      expect(a.toString()).toEqual(7);
    });
  });
  describe("change", () => {
    it("should update the internal value", () => {
      const initialValue = 7;
      const newValue = 2;
      const a = new Cell(initialValue);
      a.change(newValue);
      const actual = a.valueOf();
      const expected = newValue;
      expect(actual).toEqual(expected);
    });
  });
});
