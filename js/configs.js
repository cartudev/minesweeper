export let grid = {
    columns : 16,
    rows : 16,
    get cells() { return (this.columns * this.rows)},
    minesQuantity : 40,
    flagsQuantity : 40,
    minesPositions : [],
    numbersList : [],
    checkeds : [],
    gridComplete : [null],
    flagsPosition : [],
    themes:['google', 'windows', 'pacman'],
    theme: 'google',
    headStyle: undefined,
    loses: false,
    win: false,
    inexplode: false,
    invertClick: false,
}


export let selectors = {
    content: undefined,
    timer: undefined,
    mines: undefined,

    listeners :
    {

    }
}