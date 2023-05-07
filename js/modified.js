import { grid, selectors } from './configs'
import { functionsLogicLayout, functionsGamePlay } from './functions';


templategen()
let myTimeout = []


let Colors = [['var(--exp_background1)', 'var(--exp_color1)'],
    ['var(--exp_background2)', 'var(--exp_color2)'],
    ['var(--exp_background3)', 'var(--exp_color3)'],
    ['var(--exp_background4)', 'var(--exp_color4)'],
    ['var(--exp_background5)', 'var(--exp_color5)'],
    ['var(--exp_background6)', 'var(--exp_color6)'],
    ['var(--exp_background7)', 'var(--exp_color7)'],
    ['var(--exp_background8)', 'var(--exp_color8)']];

    let bgCols = [['#277BCD','#2F569A'],
    ['#388E3C','#00582C'],
    ['#D32F2F','#8E2123'],
    ['#B648F2','#762F9D'],
    ['#FF8F00','#9F5608'],
    ['#48E6F1','#2F569A'],
    ['#F4C20D','#9F7E08'],
    ['#ED44B5','#9A2C76']]

//defaults options timer
let timerPause = false;
let timer = 0;
let control = setInterval(cronometro,1000)
selectors.timer.innerHTML = timer.toString()

selectors.mines.innerHTML = grid.flagsQuantity.toString()
//booleans

//listeners buttons and selectors
let newGameButtons = document.querySelectorAll('.newGame, .lose-retry-button, .congrats-retry-button')  //.addEventListener('click', function () {newGame()}, true)
let listenerNewGame = newGameButtons.forEach(x => 
    x.addEventListener('click', function () {newGame()}, true)
 );
let configbtn = document.querySelector('.config-btn')
configbtn.addEventListener('click', function ()  {config()}, true);
selectors.content.addEventListener('click', function (event) {functionsGamePlay.check(event, 'primary') }, true);
selectors.content.addEventListener('contextmenu', function (event) { functionsGamePlay.check(event, 'secondary') }, true);
let fg = document.querySelector('.fg')
fg.addEventListener('click', function () {functionsGamePlay.invert()}, true)

//function for timers
function stopTimer(){
    clearInterval(control)
}
function cronometro(){
    if (timer == 999 || grid.loses || grid.win){
        stopTimer()
        control = null;
        return
    }
    if(!timerPause){
    timer ++
    selectors.timer.innerHTML = timer.toString()
    }
}


//restart
export function newGame(colsOptions = grid.columns, rowsOptions = grid.rows, minesOptions = grid.minesQuantity, themeOption = grid.theme.id){
    document.body.innerHTML = ''
    for (var i=0; i<myTimeout.length; i++) {
    clearTimeout(myTimeout[i]);
      }

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
    stopTimer();
    timer = 0;

    templategen()

/* 
    win ? butn.classList.replace('winbtn', 'newGame'): null;
    loses ? butn.classList.replace('losebtn', 'newGame'): null;

 */
/*     let cellactive = document.querySelectorAll('.cell-active');
    for(let i = 0; i< cellactive.length;i++){cellactive[i].remove()}
 */    //positions vars
    //default options timer
    selectors.mines.innerHTML = grid.flagsQuantity.toString();
    selectors.timer.innerHTML = timer.toString()
    myTimeout = [];
    control = setInterval(cronometro,1000)
    //booleans
    grid.win = false;
    grid.loses = false;

    grid.inexplode = false;
    grid.invertClick = false;



    //listeners buttons and selectors
    newGameButtons = document.querySelectorAll('.newGame, .lose-retry-button, .congrats-retry-button')  //.addEventListener('click', function () {newGame()}, true)
    listenerNewGame = newGameButtons.forEach(x => 
        x.addEventListener('click', function () {newGame()}, true)
    );
    configbtn = document.querySelector('.config-btn')
    configbtn.addEventListener('click', function ()  {config()}, true);
    selectors.content.addEventListener('click', function (event) { functionsGamePlay.check(event, 'primary') }, true);
    selectors.content.addEventListener('contextmenu', function (event) { functionsGamePlay.check(event, 'secondary') }, true);
    fg = document.querySelector('.fg')
    fg.addEventListener('click', function () {functionsGamePlay.invert()}, true)


}

function config(){
    timerPause = true;
    let menuContainer = document.querySelector('.menu-container');
    menuContainer.classList.add('toggle');
    let levels = document.querySelectorAll('input[name="level"]');
    let rangeInput = document.querySelectorAll('input[type="range"]');
    let numberInput = document.querySelectorAll('input[type="number"]');

    rangeInput.forEach(x => 
        x.addEventListener('click', function () {inputChange()}, true)
     );
     numberInput.forEach(x => 
        x.addEventListener('click', function () {inputChange()}, true)
     );

     
     
     levels.forEach(x => 
        x.addEventListener('click', function () {levelselected()}, true)
        );
        
        let cancelBtn = document.querySelector('.cancel-btn');
    let applyBtn = document.querySelector('.apply-btn');
    function closing()
        {menuContainer.classList.remove('toggle')
        timerPause = false
    }
    applyBtn.addEventListener('click', function() {
        closing();
        fastCheck()}, true);
    cancelBtn.addEventListener('click', function() {closing()});
    
    
    
    
    applyBtn.removeEventListener('click', function() {
        closing();
        fastCheck()});
        cancelBtn.removeEventListener('click', function() {closing()});
    }
    
    function fastCheck(){
        let minesInput = parseInt(document.getElementById("mines").children[0].value)
        let rowsInput = parseInt(document.getElementById("rows").children[0].value)
        let colsInput = parseInt(document.getElementById("cols").children[0].value)
        let theme = document.getElementById("theme").value;
    return newGame(colsInput, rowsInput, minesInput, theme);   
    }
    function inputChange(){
        let levels = document.querySelectorAll('input[name="level"]');

        let minesInput = document.getElementById("mines").children
        let rowsInput = document.getElementById("rows").children
        let colsInput = document.getElementById("cols").children
        if (document.querySelector('input[name="level"]:checked').value != 'custom'){
        levels[3].click()}
        minesInput[0].setAttribute("max", rowsInput[0].value*colsInput[0].value-1);
        minesInput[1].setAttribute("max", rowsInput[0].value*colsInput[0].value-1);
        let max = minesInput[0].max
        if(minesInput[0].max < minesInput[1].value || minesInput[1].max < minesInput[1].value){
            document.getElementById("mines").innerHTML = '<input class="mines-quantity" type="range" name="minesRange" min="1" max="'+max+'" value="'+max+'" oninput="this.form.minesInput.value=this.value" /><input class="mines-input" type="number" name="minesInput" min="1" max="'+max+'" value="'+max+'" oninput="this.form.minesRange.value=this.value" />'
        }
        return
    }


    function levelselected(){
        let minesInput = document.getElementById("mines").children
        let rowsInput = document.getElementById("rows").children
        let colsInput = document.getElementById("cols").children

        let level = document.querySelector('input[name="level"]:checked').value;
        if (level == 'easy'){
            
            rowsInput[0].value = 9;
            rowsInput[1].value = 9;
            
            colsInput[0].value = 9;
            colsInput[1].value = 9;

            minesInput[0].setAttribute("max", rowsInput[0].value*colsInput[0].value)
            minesInput[1].setAttribute("max", rowsInput[0].value*colsInput[0].value)
            
            minesInput[0].value = 10;
            minesInput[1].value = 10;
        }
        if (level == 'normal'){
            
            rowsInput[0].value = 16;
            rowsInput[1].value = 16;

            colsInput[0].value = 16;
            colsInput[1].value = 16;
            
            minesInput[0].setAttribute("max", rowsInput[0].value*colsInput[0].value)
            minesInput[1].setAttribute("max", rowsInput[0].value*colsInput[0].value)
            
            minesInput[0].value = 40;
            minesInput[1].value = 40;

        }
        if (level == 'hard'){
            
            rowsInput[0].value = 19;
            rowsInput[1].value = 19;
            
            colsInput[0].value = 30;
            colsInput[1].value = 30;

            minesInput[0].setAttribute("max", rowsInput[0].value*colsInput[0].value)
            minesInput[1].setAttribute("max", rowsInput[0].value*colsInput[0].value)
            
            minesInput[0].value = 99;
            minesInput[1].value = 99;
        }
        else {
            minesInput[0].setAttribute("max", rowsInput[0].value*colsInput[0].value)
            minesInput[1].setAttribute("max", rowsInput[0].value*colsInput[0].value)
        }

    return
    

}



function templategen(){

    selectors.headStyle = document.createElement('style');
    selectors.headHTML[0].appendChild(selectors.headStyle);
    console.log(grid.themes[grid.theme.id].functions.animations.bookmarkHeadAnimation)
    grid.themes[grid.theme.id].functions.animations.bookmarkHeadAnimation
    grid.themes[grid.theme.id].functions.animations.cellAnimation



    selectors.fullScreen = document.createElement('div');
    selectors.header = document.createElement('header');

    if (grid.theme.name == grid.themes[0].name){selectors.fullScreen.className ='full-screen google'}
    else if (grid.theme.name == grid.themes[1].name){selectors.fullScreen.className ='full-screen windows'}
    else if (grid.theme.name == grid.themes[2].name){selectors.fullScreen.className ='full-screen pacman'};
    document.body.appendChild(selectors.fullScreen);
    selectors.section = document.createElement('section');
    selectors.container = document.createElement('div');

    selectors.container.className = 'container';
    selectors.fullScreen.appendChild(selectors.container);
    selectors.header.className = 'header';
    selectors.container.appendChild(selectors.header);

    let info = document.createElement('div');
    info.className = 'info';
    selectors.header.appendChild(info);
    selectors.timer = document.createElement('div');
    selectors.timer.className = 'timer';
    selectors.timer.innerText = '999'
    info.appendChild(selectors.timer);
    selectors.btnNewGame = document.createElement('div');
    selectors.btnNewGame.className = 'btn newGame';
    info.appendChild(selectors.btnNewGame);
    let btnConfig = document.createElement('div');
    btnConfig.className = 'config-btn';
    info.appendChild(btnConfig);
    selectors.btnFg = document.createElement('div');
    selectors.btnFg.className = 'btn fg';
    info.appendChild(selectors.btnFg);
    
    selectors.mines = document.createElement('div');
    selectors.mines.className = 'mines';
    info.appendChild(selectors.mines);

    selectors.section.className = 'section';
    selectors.container.appendChild(selectors.section);


    
    selectors.content = document.createElement('div');
    selectors.content.className = 'contenedor';
    selectors.section.appendChild(selectors.content);
    let row;
    let cellcont; 


    for(let i = 1; i<=grid.rows; i++){
        row = document.createElement('div');
        row.className = `row r${i}`;
        selectors.content.appendChild(row);
        for(let j = 1; j<=grid.columns; j++){
            cellcont = document.createElement('div');
            cellcont.className = `cell c${j}`;
            row.appendChild(cellcont);
        }
    }

    console.log(grid.theme.id)
    grid.themes[grid.theme.id].functions.congratsLose

    grid.themes[3].common.menu()

}



function explodemines(number){

    let cont = selectors.content;
    let bg1 = generalUse.randomIntFromInterval(0,7);
    let bg2 = generalUse.randomIntFromInterval(0,1);
    let bg3 = generalUse.randomIntFromInterval(0,1);


    let positionRep = cont.children[parseInt((number-1)/grid.columns)].children[(number-1)%grid.columns];


    positionRep.classList.replace('cell','number');
    positionRep.classList.add('nm');
    // positionRep.style.setProperty(`background-color`,`${bgCols[bg1][0]}`);
    // console.log(bgCols[bg1][1]);   
    positionRep.insertAdjacentHTML('afterbegin', 
    `<div class="nm-block" style="background-color:${bgCols[bg1][0]}"></div>
    <div class="nm-mine" style="background-color:${bgCols[bg1][1]}"></div>
    `)
for(let i=1; i<= 8;i++){
    bg2 = generalUse.randomIntFromInterval(0,1);
    
    positionRep.insertAdjacentHTML('beforeend',     
    `<div class="nm-confetti" style=" background-color: ${Colors[bg1][bg2]};
    animation: bookmark-anim${generalUse.randomIntFromInterval(1,20)} ${generalUse.randomFloatInterval(4.5,6.5,1)}s forwards ease-in;
    scale : ${generalUse.randomFloatInterval(0.5,1.5,1)}"></div>
    `);

}    let deletenum = grid.minesPositions.indexOf(number);
    grid.minesPositions.splice(deletenum, 1);

    for (let flag of grid.flagsPosition){
        if(!grid.minesPositions.includes(flag)){
            positionRep = cont.children[parseInt((flag-1)/grid.columns)].children[(flag-1)%grid.columns];

            positionRep.classList.replace('flag','flagerror');
            positionRep.innerHTML = ''
        }


    }
    for (let explode of grid.minesPositions){
    myTimeout.push(setTimeout(animationExp, generalUse.randomIntFromInterval(500,(grid.minesQuantity*500)), explode));

    }
}


function animationExp(explode){

    let cont = selectors.content;
    let bg1 = generalUse.randomIntFromInterval(0,7);
    let bg2 = generalUse.randomIntFromInterval(0,1);
    let bg3 = generalUse.randomIntFromInterval(0,1);
    if( !grid.flagsPosition.includes(explode)){

        let positionRep = cont.children[parseInt((explode-1)/grid.columns)].children[(explode-1)%grid.columns];


        positionRep.classList.replace('cell','number');
        positionRep.classList.add('nm');
        // positionRep.style.setProperty(`background-color`,`${bgCols[bg1][0]}`);
        positionRep.insertAdjacentHTML('afterbegin', 
        `<div class="nm-block" style="background-color:${bgCols[bg1][0]}"></div>
        <div class="nm-mine" style="background-color:${bgCols[bg1][1]}"></div>
        `)
        for(let i=1; i<= 8;i++){explode
        bg2 = generalUse.randomIntFromInterval(0,1);
        
        positionRep.insertAdjacentHTML('beforeend',     
        `<div class="nm-confetti" style=" background-color: ${Colors[bg1][bg2]};
        animation: bookmark-anim${generalUse.randomIntFromInterval(1,20)} ${generalUse.randomFloatInterval(4.5,6.5,1)}s forwards ease-in-out;
        scale : ${generalUse.randomFloatInterval(0.5,1.5,1)}"></div>
        `);
    }

    }
}
