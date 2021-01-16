const Cell = require('../Cell.js');
const SumFormula = require('../SumFormula.js');

describe("SumFormula", () => {
  it("should sum the values within the cells", () => {
    const a1 = new Cell(7);
    const a2 = new Cell(3);
    const a3 = new Cell(5);
    const a4 = new Cell(new SumFormula([a1, a2, a3]));
    let actual = a4.toString();
    let expected = 15;
    expect(actual).toEqual(expected);
    a3.change(-2);
    actual = a4.toString();
    expected = 8;
    expect(actual).toEqual(expected);
  });
});
