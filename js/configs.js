import { generalUse } from "./functions";

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
    themes:[
        {name: 'google',
        functions: {
            animations: {
                animationCell: function(positionRep){
                    let anim = document.createElement('div');
                    anim.className = 'cell-active';
                    positionRep.appendChild(anim);
                    let animNum = generalUse.randomIntFromInterval(1,15)
                    anim.style.webkitAnimation = `cellAnim${animNum} ${generalUse.randomFloatInterval(1,1.8,2)}s ease-in forwards`;
                    anim.style.animation = `cellAnim${animNum} ${generalUse.randomFloatInterval(0.8,1.2,2)}s ease-in forwards`;
                   }
                }
            }
        },
        {name: 'windows'},
        {name: 'pacman'},
        {common: {

            }
        }
    ],
    theme: 'google',
    headStyle: undefined,
    loses: false,
    win: false,
    inexplode: false,
    invertClick: false,
}


export let selectors = {
    headHTML: document.getElementsByTagName('head'),
    headStyle: undefined,
    content: undefined,
    header: undefined,
    timer: undefined,
    mines: undefined,
    fullScreen: undefined,
    section: undefined,
    container: undefined,
    btnNewGame: undefined,
    listeners :
    {

    }
}