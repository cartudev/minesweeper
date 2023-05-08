import { grid, selectors } from './configs'
import { functionsLogicLayout, functionsTimer } from './functions';


//restart
export function newGame(colsOptions = grid.columns, rowsOptions = grid.rows, minesOptions = grid.minesQuantity, themeOption = grid.theme.id){
    document.body.innerHTML = ''
    grid.columns = colsOptions;
    grid.rows = rowsOptions;
    grid.minesQuantity = minesOptions;
    grid.flagsQuantity = grid.minesQuantity;
    grid.minesPositions = [];
    grid.numbersList= [];
    grid.checkeds = [];
    grid.gridComplete = [null]
    grid.flagsPosition = []
    grid.theme.id = parseInt(themeOption);
    grid.theme.name = grid.themes[grid.theme.id].name
    functionsLogicLayout.gridCreation()
    functionsTimer.stopTimer();
    functionsTimer.stopTimeout();
    grid.timer = 0;

    grid.themes[grid.theme.id].functions.templategen()

    selectors.mines.innerHTML = grid.flagsQuantity.toString();
    selectors.timer.innerHTML = grid.timer.toString()
    grid.myTimeout = [];
    grid.control = setInterval(functionsTimer.cronometro,1000)

    //booleans
    grid.win = false;
    grid.loses = false;
    grid.inexplode = false;
    grid.invertClick = false;

    //listeners buttons and selectors
    selectors.newGameButtons = document.querySelectorAll('.newGame, .lose-retry-button, .congrats-retry-button')  //.addEventListener('click', function () {newGame()}, true)
    selectors.listeners.listenerNewGame();
    selectors.configbtn = document.querySelector('.config-btn');
    selectors.listeners.listenerConfigBtn();
    selectors.listeners.listenerContent();
    selectors.fg = document.querySelector('.fg');
    selectors.listeners.listenerFg();
}





