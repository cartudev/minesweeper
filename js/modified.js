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
export function newGame(colsOptions = grid.columns, rowsOptions = grid.rows, minesOptions = grid.minesQuantity, themeOption = grid.theme){
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
    grid.theme = themeOption;
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

    
    if(grid.theme == grid.themes[0].name)  {
        // console.log(),
    document.querySelector('.lose-container').style.display = 'none';
    document.querySelector('.lose-container').classList.remove('focussed');
    document.querySelector('.congrats-container').style.display = 'none';
    // document.querySelector('.win-container').classList.remove('focussed')

}

    else {
        document.querySelector('.congrats').style.display = 'none'
        document.querySelector('.lose').style.display = 'none'}
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

    for(let i=1; i<= 15;i++){
        let negative = negativefn();
        let negative2 = negativefn();
        let left = `${randomIntFromInterval(100,400)}`;
        let halfLeft = Math.ceil(left/2);
        let tenLeft= Math.ceil(left*.1);
        let topPos = randomIntFromInterval(0,400);
        let fall  = topPos*-1 + randomIntFromInterval(0,200);
        let almostTop = Math.ceil(topPos * (randomIntFromInterval(92,98)*0.01));
        let almostTop2 = Math.ceil(topPos * (randomIntFromInterval(92,98)*0.01));
        let rotate = randomIntFromInterval(90,400);
        let halfRotate = Math.ceil(rotate/2);
        let scale = randomIntFromInterval(1,3);
    
    let cellAnim = `
    @-webkit-keyframes cellAnim${i} {
        0% {
            webkit-transform: rotate(0) scale(1);
            transform: rotate(0) scale(1);
            left: 0%;
            top: 0%;
            visibility:visible;
            opacity: 1;
            }
        35%{
            top: -${almostTop}%;
            left: ${negative}${(halfLeft-tenLeft)}%;
        }
        50%{
            transform: rotate(${halfRotate}) scale(1.${randomIntFromInterval(2,8)});
            top: -${topPos}%;
                left: ${negative}${halfLeft}%;
        }
    
        65%{
            top: -${almostTop2}%;
            left: ${negative}${(halfLeft+tenLeft)}%;
        }
        90%{
            opacity: 0.${randomIntFromInterval(7,9)};
        }
        100% {
            webkit-transform: rotate(${rotate}deg) scale(0.${scale});
            opacity: 0;
            transform: rotate(${negative2}${rotate}deg) scale(0.${scale});
            left: ${negative}${(left+tenLeft)}%;
            top:${fall}%;
            filter: blur(${randomIntFromInterval(1,3)})
          visibility: hidden;
        }
      }
      @keyframes cellAnim${i} {
        0% {
            transform: rotate(0);
            scale: 1;
            left: 0%;
            top: 0%;
            visibility:visible;
            opacity: 1;
            }
    
        35%{
            top: -${almostTop}%;
            left: ${negative}${(halfLeft-tenLeft)}%;
        }

        50%{
            scale: 1.${randomIntFromInterval(1,3)};
            top: -${topPos}%;
            left: ${negative}${halfLeft}%;
        }
        65%{
            top: -${almostTop2}%;
            left: ${negative}${(halfLeft+tenLeft)}%;
        }
        90%{
            opacity: 0.${randomIntFromInterval(7,9)};
        }

        100% {
            transform: rotate(${negative2}${rotate}deg);
            scale: 0.${scale};
            left: ${negative}${left}%;
            top:${fall}%;
            opacity: 0;
            filter: blur(${randomIntFromInterval(1,3)})
          visibility: hidden;
        }
      }
    `
    selectors.headStyle.insertAdjacentHTML('beforeend', cellAnim);
    }
    for(let i=1; i<= 20;i++){
        let negative = negativefn();
        let negative2 = negativefn();
        let originHor = randomIntFromInterval(0,300);
        let top1 = randomIntFromInterval(30, 250);
        let top2 = randomIntFromInterval(30, 250);
        let horizontalStart = randomIntFromInterval(0,60);
        let horizontal = (negative == '') ?randomIntFromInterval(15,300):randomIntFromInterval(15,300)*-1;
        let negativehor = horizontal*-1 ;
        let horizontal2 = randomIntFromInterval(0,80);
        let deg = (negative2 == '') ?randomIntFromInterval(20, 62):randomIntFromInterval(20, 62)*-1;
        let up = randomIntFromInterval(1,150);
        let down = randomIntFromInterval(30,220);
    let bookmarkAnim = `
    @-webkit-keyframes bookmark-anim${i} {
        0% {
            visibility:visible;
            -webkit-transform-origin: ${originHor.toFixed(2)}% -${top1*2.5}%;
            transform-origin: ${originHor}% -${top1*2.5}%;
            left: ${horizontalStart}%;
            top: ${top1}%;
            opacity: 1;
            -webkit-transform: scale(0.3);
            transform: scale(0.3);
            transition: linear;
        }
        10%{
            top:-${up}%;
            left: ${horizontal}%;
            -webkit-transform: scale(0.7)rotate(${deg}deg)
            transform: scale(0.7)rotate(${deg}deg)
        }
        50%{
            -webkit-transform: rotate(${(deg*randomFloatInterval(0.7,1.0,1)).toFixed(2)*-1}deg);
            transform: rotate(${(deg*randomFloatInterval(0.7,1.0,1)).toFixed(2)*-1}deg);
            left:${negativehor}%;
            top: ${(up-down*randomFloatInterval(0.35,0.65,2)).toFixed(2)}%;
        }
        83%{        
            -webkit-transform: scale(0.4) rotate(${(deg*randomFloatInterval(0.4,0.7,1)).toFixed(2)}deg);
            transform: scale(0.4) rotate(${(deg*randomFloatInterval(0.4,0.7,1)).toFixed(2)}deg);
            left: ${(negativehor*randomFloatInterval(0.3,0.7,1)).toFixed(2)}%;
            opacity: 1;

        }    
        100%{
            top:${down}%;
            left: ${horizontal2}%;
            -webkit-transform: scale(0.1) rotate(${(deg*randomFloatInterval(0.1,0.4,1)).toFixed(2)*-1}deg);
            transform: scale(0.1) rotate(${(deg*randomFloatInterval(0.1,0.4,1)).toFixed(2)*-1}deg);
            opacity: 0;
        }
    }
    @keyframes bookmark-anim${i} {
        0% {
            visibility:visible;
            -webkit-transform-origin: ${originHor.toFixed(2)}% -${top1*2.5}%;
            transform-origin: ${originHor}% -${top1*2.5}%;
            left: ${horizontalStart}%;
            top: ${top1}%;
            opacity: 1;
            -webkit-transform: scale(0.3);
            transform: scale(0.3);
            transition: linear;
        }
        10%{
            top:-${up}%;
            left: ${horizontal}%;
            -webkit-transform: scale(0.7)rotate(${deg}deg)
            transform: scale(0.7)rotate(${deg}deg)
        }
        50%{
            -webkit-transform: rotate(${(deg*randomFloatInterval(0.7,1.0,1)).toFixed(2)*-1}deg);
            transform: rotate(${(deg*randomFloatInterval(0.7,1.0,1)).toFixed(2)*-1}deg);
            left:${negativehor}%;
            top: ${(up-down*randomFloatInterval(0.35,0.65,2)).toFixed(2)}%;
        }
        83%{        
            -webkit-transform: scale(0.4) rotate(${(deg*randomFloatInterval(0.4,0.7,1)).toFixed(2)}deg);
            transform: scale(0.4) rotate(${(deg*randomFloatInterval(0.4,0.7,1)).toFixed(2)}deg);
            left: ${(negativehor*randomFloatInterval(0.3,0.7,1)).toFixed(2)}%;
            opacity: 1;

        }    
        100%{
            top:${down}%;
            left: ${horizontal2}%;
            -webkit-transform: scale(0.1) rotate(${(deg*randomFloatInterval(0.1,0.4,1)).toFixed(2)*-1}deg);
            transform: scale(0.1) rotate(${(deg*randomFloatInterval(0.1,0.4,1)).toFixed(2)*-1}deg);
            opacity: 0;

        }
    }
`
selectors.headStyle.insertAdjacentHTML('beforeend', bookmarkAnim);

    };

    selectors.fullScreen = document.createElement('div');
    selectors.header = document.createElement('header');

    if (grid.theme == grid.themes[0].name){selectors.fullScreen.className ='full-screen google'}
    else if (grid.theme == grid.themes[1].name){selectors.fullScreen.className ='full-screen windows'}
    else if (grid.theme == grid.themes[2].name){selectors.fullScreen.className ='full-screen pacman'};
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
    let btnFg = document.createElement('div');
    btnFg.className = 'btn fg';
    info.appendChild(btnFg);
    
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


    let congrats = document.createElement('div');
    let lose = document.createElement('div');

    if (grid.theme == grid.themes[0].name){
        lose.addEventListener('click', function(){
            if(lose.classList[1] != 'focussed' | lose.classList[0] != 'focussed')
            {lose.classList.add('focussed')};
        });


        congrats.className = 'congrats-container focussed';
        lose.className = 'lose-container';
    
        lose.insertAdjacentHTML('beforeend', `
        <div class="lose">
        <div class="lose-content"></div>
        <div class="lose-bg"></div>
        <div class="lose-retry-button">
        <div class="lose-retry-icon"></div><p>Reintentar</p>
        </div>
        </div>
        `)
        congrats.insertAdjacentHTML('beforeend', `
        <div class="congrats">
        <div class="congrats-content"></div>
        <div class="congrats-bg"></div>
        <div class="congrats-retry-button">
        <div class="congrats-retry-icon"></div><p>Volver a jugar</p>
        </div>
        </div>
        `
        )
        selectors.container.appendChild(lose)
        selectors.container.appendChild(congrats);    
     }

    else {
    congrats.className = 'lose';
    lose.innerText = 'Lamentablemente has perdido';
    selectors.container.appendChild(lose)
    congrats.className = 'congrats';
    congrats.innerText = 'Felicitaciones has ganado!';
    selectors.container.appendChild(congrats)};

    let menu = document.createElement('div');
    menu.className = 'menu-container';
    selectors.container.appendChild(menu);
    menu.insertAdjacentHTML('beforeend', `
    <div class="menu">
    <p>level</p>
    <div class="level">
        <input class="radio-btn" type="radio" id="easy" name="level" value="easy"/>
        <label for="easy" class="accordion-tab">easy</label>
        <input class="radio-btn" checked="checked" type="radio" id="medium" name="level" value="normal"/>
        <label for="medium" class="accordion-tab">medium</label>
        <input class="radio-btn" type="radio" id="hard" name="level" value="hard"/>
        <label for="hard" class="accordion-tab">hard</label>
        <input class="radio-btn" type="radio" id="custom" name="level" value="custom"/>
        <label for="custom" class="accordion-tab">custom</label>
    </div>
    <div class="inputs">
    <form>
    <p>Columns</p>

    <div id="cols">
    <input class="cols-quantity" type="range" name="colsRange" min="8" max="30" value="16" oninput="this.form.colsInput.value=this.value" />
    <input class="cols-input" type="number" name="colsInput" min="8" max="30" value="16" oninput="this.form.colsRange.value=this.value" />
    </div>
    <p>Rows</p>  
    <div id="rows">
    <input class="rows-quantity" type="range" name="rowsRange" min="8" max="30" value="16" oninput="this.form.rowsInput.value=this.value" />
    <input class="rows-input" type="number" name="rowsInput" min="8" max="30" value="16" oninput="this.form.rowsRange.value=this.value" />
    </div>
    <p>Mines</p>
    <div id="mines">
    <input class="mines-quantity" type="range" name="minesRange" min="1" max="256" value="40" oninput="this.form.minesInput.value=this.value" />
    <input class="mines-input" type="number" name="minesInput" min="1" max="256" value="40" oninput="this.form.minesRange.value=this.value" />
    </div>
    </form>
    </div>

    <div data-dropup-auto="false" style="display: inline-block;" class="dropdown">
    <p>theme</p>
    <select id="theme">    
    <option value='google'>Google Theme</option>
    <option value='windows'>Classic Windows (w.i.p)</option>  
    <option value='pacman'>Pacman style (w.i.p)</option>
    </select>
    </div>
    <div class="buttons">
        <button class="apply-btn">Apply</button>
        <button class="cancel-btn">Cancel</button>
    </div>
    </div>
    `
    )}

function negativefn(){
    if(Math.random() < 0.5){
        return '-'
    } 
    return '';
}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)}

function randomFloatInterval(min, max, decimalPlaces) {
    return (Math.random() * (max - min) + min).toFixed(decimalPlaces) * 1;
}



function explodemines(number){

    let cont = selectors.content;
    let bg1 = randomIntFromInterval(0,7);
    let bg2 = randomIntFromInterval(0,1);
    let bg3 = randomIntFromInterval(0,1);


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
    bg2 = randomIntFromInterval(0,1);
    
    positionRep.insertAdjacentHTML('beforeend',     
    `<div class="nm-confetti" style=" background-color: ${Colors[bg1][bg2]};
    animation: bookmark-anim${randomIntFromInterval(1,20)} ${randomFloatInterval(4.5,6.5,1)}s forwards ease-in;
    scale : ${randomFloatInterval(0.5,1.5,1)}"></div>
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
    myTimeout.push(setTimeout(animationExp, randomIntFromInterval(500,(grid.minesQuantity*500)), explode));

    }
}


function animationExp(explode){

    let cont = selectors.content;
    let bg1 = randomIntFromInterval(0,7);
    let bg2 = randomIntFromInterval(0,1);
    let bg3 = randomIntFromInterval(0,1);
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
        bg2 = randomIntFromInterval(0,1);
        
        positionRep.insertAdjacentHTML('beforeend',     
        `<div class="nm-confetti" style=" background-color: ${Colors[bg1][bg2]};
        animation: bookmark-anim${randomIntFromInterval(1,20)} ${randomFloatInterval(4.5,6.5,1)}s forwards ease-in-out;
        scale : ${randomFloatInterval(0.5,1.5,1)}"></div>
        `);
    }

    }
}
