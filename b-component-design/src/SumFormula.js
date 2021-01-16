class SumFormula {
    constructor(cells){
        this.cells = cells;
    }
    calculate(){
        return this.cells.reduce((sum, current) => sum + current, 0);
    }
}

module.exports = SumFormula;