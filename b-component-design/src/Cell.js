class Cell {
    constructor(contents){
        this.contents = contents;
    }
    change(newValue){
        this.contents = newValue;
    }
    toString(){
        if(typeof this.contents === 'object'){
            return this.contents.calculate();
        }
        return this.contents;

    }
}

module.exports = Cell;