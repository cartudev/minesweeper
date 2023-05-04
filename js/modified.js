import { grid, selectors } from './configs'



/* let grid = {
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
    headStyle: undefined
} */



//grid
/* let columns = 16;
let rows = 16;
let cells = rows*columns;
let minesQuantity= 40;
let flagsQuantity = minesQuantity; */
//positions vars
/* let minesPositions = [];
let numbersList= [];
let checkeds = [];
let GridComplete = [null]
let flagsPosition = []
let theme = "google"
let headStyle;
 */templategen()
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

let butn = document.querySelector('.newGame')
//booleans

//listeners buttons and selectors
let newGameButtons = document.querySelectorAll('.newGame, .lose-retry-button, .congrats-retry-button')  //.addEventListener('click', function () {newGame()}, true)
let listenerNewGame = newGameButtons.forEach(x => 
    x.addEventListener('click', function () {newGame()}, true)
 );
let configbtn = document.querySelector('.config-btn')
configbtn.addEventListener('click', function ()  {config()}, true);
selectors.content.addEventListener('click', function (event) { check(event, 'primary') }, true);
selectors.content.addEventListener('contextmenu', function (event) { check(event, 'secondary') }, true);
let fg = document.querySelector('.fg')
fg.addEventListener('click', function () {invert()}, true)

//grid creation
export function gridCreation() {
    for (let i = 1; i <= grid.cells; i++) {
        grid.numbersList.push(i)
    };
    for (let i = 1; i <= grid.minesQuantity; i++) {
        let random = (Math.floor(Math.random() * grid.numbersList.length))
        let addnumber = grid.numbersList.splice(random, 1)
        grid.minesPositions.push(addnumber[0])
    }
    grid.minesPositions.sort((a, b) => a - b)
    for (let i = 0; i <= grid.minesPositions.length; i++) {
        grid.numbersList.splice(grid.minesPositions[i - 1], 0, 'm')
    }
    grid.numbersList.splice(0, 1, null)
    gridCompleteCreation()
}

function gridCompleteCreation(){
    for(let i = 1; i<=grid.cells;i++){
       numbersPosition(i) 
    }
};

function numbersPosition(number){
    let n = number
    if(grid.numbersList[number] == 'm'){
        grid.gridComplete.push(grid.numbersList[number])
        return ;
    }
    if(number >grid.columns && number <grid.columns*(grid.rows-1)&& number%grid.columns != 0 && number%grid.columns != 1){
        return calc(n, 1, 2, 3, 4, 6, 7, 8, 9)
    }
    else{
        if (number == 1){
            return calc(n, 2, 3, 6)
        }
        if (number == grid.columns){
            return calc(n, 1, 2, 4)
        }
        if (number == grid.columns*(grid.rows-1)+1){
            return calc(n, 6, 8, 9)
        }
        if (number == grid.columns*grid.rows){
            return calc(n, 4, 7, 8)
        }
        if (number<grid.columns){
            return calc(n, 1, 2, 3, 4, 6)
        }
        if (number>grid.columns*grid.rows-grid.columns){
            return calc(n, 4, 6, 7, 8, 9)
        }
        if (number%grid.columns==0){
            return calc(n, 1, 2, 4, 7, 8)
        }
        if (number%grid.columns==1){
            return calc(n, 2, 3, 6, 8, 9)
        }
    }
};

//check the position of the click and the invert button
function check(event, action){
    if(event.composedPath()[0].classList[0] == 'cell' || 
    event.composedPath()[0].classList[0] == 'number' || 
    event.composedPath()[0].classList[0] == 'flag'){
        const position = 
        parseInt(event.composedPath()[0].classList[1].match(/\d+/)) + 
        ((parseInt(event.composedPath()[1].classList[1].match(/\d+/))-1)*grid.columns);

    if(grid.checkeds.includes(position)){
        event.preventDefault();
        return lClick(position);
    }
    if (action == 'primary' && grid.invertClick == false || action == 'secondary' && grid.invertClick == true){
        event.preventDefault();
        return lClick(position);
    }

    if (action == 'secondary' && grid.invertClick == false || action == 'primary' && grid.invertClick == true){
        event.preventDefault()
        flags(position)
        return ;
    }
    }
    if(event.composedPath()[0].parentElement.children[0].classList[0] == 'wait-to-kill'){
        event.preventDefault()
        return;
    }

    if(event.composedPath()[1].classList[0] == 'flag'){
        event.preventDefault()
        const position = 
        parseInt(event.composedPath()[1].classList[1].match(/\d+/)) + 
        ((parseInt(event.composedPath()[2].classList[1].match(/\d+/))-1)*grid.columns);

        flags(position)
    }

    else{return ;}
};

function invert(){
if(fg.classList[1]== 'fg'){
    fg.classList.replace('fg','mn')
    grid.invertClick = true;
}
else{fg.classList.replace('mn','fg')
    grid.invertClick = false;
}

}

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

function lClick(position){

    if (grid.checkeds.includes(position) && grid.inexplode){
        return ;
    }
    if (grid.checkeds.includes(position) && !grid.inexplode ){
        checkmines(position)
        return ;
    }
    if(grid.loses == true){
        return ;
    }
    if(grid.gridComplete[position] == 'm'){
        losefn(position)
        return ;}
    let positionRep = selectors.content.children[parseInt((position-1)/grid.columns)].children[parseInt((position-1)%grid.columns)]
    if(grid.gridComplete[position] == 0){

        positionRep.classList.replace('cell','number');   

        explode(position)

    }
    if (grid.flagsPosition.indexOf(position) != -1 && grid.inexplode){
        let myIndex = grid.flagsPosition.indexOf(position);
        positionRep.classList.replace('flag','cell'),
        positionRep.innerHTML = '',
        grid.flagsPosition.splice(myIndex, 1),
        grid.flagsQuantity += 1
        selectors.mines.innerHTML = grid.flagsQuantity.toString()
        return lClick(position)
    }
    if (grid.flagsPosition.indexOf(position) != -1){
        return ;
    }
    else{
        
        positionRep.classList.replace('cell','number');
        if(!grid.checkeds.includes(position)){
        positionRep.classList.add(`n${grid.gridComplete[position]}`);
        if(grid.theme == grid.themes[0]){
            animationCell(positionRep)
        }
    }
    }
    if (grid.checkeds.includes(position)){
        return ;
    }
    else{
        grid.checkeds.push(position)}
    if(grid.checkeds.length == grid.cells-grid.minesQuantity){

        winfn()       
        return;
    }
}



function flags(number){
    if (grid.checkeds.includes(number)){
        return
    }
    if(grid.loses == true){
        return
    }
    let myIndex = grid.flagsPosition.indexOf(number);
    let positionRep = selectors.content.children[parseInt((number-1)/grid.columns)].children[(number-1)%grid.columns]
    
    myIndex == -1 ? (
        positionRep.classList.replace('cell','flag'),
        grid.theme == grid.themes[0]? (
        positionRep.innerHTML = '',
        positionRep.insertAdjacentHTML('beforeend',
        `<div class="f-animation" </div>`
        )) : (console.log()),
        grid.flagsPosition.push(number) ,
        grid.flagsQuantity -= 1
    ) : (
        positionRep.classList.replace('flag','cell'),
        grid.theme == grid.themes[0]? (
            positionRep.innerHTML = '',
            positionRep.insertAdjacentHTML('beforeend',     
            `<div class="f-animation" style="animation: cellAnim${randomIntFromInterval(1,15)} ${randomFloatInterval(1,1.8,2)}s ease-in forwards; 
            -webkit-animation: cellAnim${randomIntFromInterval(1,15)} ${randomFloatInterval(1,1.8,2)}s ease-in forwards"</div>`)
        )
        :(console.log('')),
        grid.flagsPosition.splice(myIndex, 1),
        grid.flagsQuantity += 1
    )
    selectors.mines.innerHTML = grid.flagsQuantity.toString()
}
function winfn(){
    butn.classList.replace('newGame', 'winbtn');
    grid.theme == grid.themes[0] ? (document.querySelector('.congrats-container').style.display = 'block') : (document.querySelector('.congrats').style.display = 'block')
    grid.win = true;
}
function losefn(number){
    if (grid.flagsPosition.indexOf(number) != -1){
        return;}
    grid.loses = true;
    butn.classList.replace('newGame', 'losebtn')
    explodemines(number);
    grid.theme == grid.themes[0] ? (document.querySelector('.lose-container').style.display = 'block') : (document.querySelector('.lose').style.display = 'block')
}

function calc(position, ...args){
    let numbercell = 0

    // just idea
/*  setArgs={ 

    } */   
    
    
    if (args.includes(1) && grid.numbersList[position+grid.columns-1] == "m"){
        numbercell +=1
    }
    if (args.includes(2) && grid.numbersList[position+grid.columns] == "m"){
        numbercell +=1
    }
    if (args.includes(3) && grid.numbersList[position+grid.columns+1] == "m"){
        numbercell +=1
    }
    if (args.includes(4) && grid.numbersList[position-1] == "m"){
        numbercell +=1
    }
    if (args.includes(6) && grid.numbersList[position+1] == "m"){
        numbercell +=1
    }
    if (args.includes(7) && grid.numbersList[position-grid.columns-1] == "m"){
        numbercell +=1
    }
    if (args.includes(8) && grid.numbersList[position-grid.columns] == "m"){
        numbercell +=1
    }
    if (args.includes(9) && grid.numbersList[position-grid.columns+1] == "m"){
        numbercell +=1
    }
    grid.gridComplete.push(numbercell)
}

function checkmines(position){
    let number = position;
    let flagsArround = 0;
    let calc = [];

    (number >grid.columns && number <grid.columns*(grid.rows-1)&& number%grid.columns != 0 && number%grid.columns != 1)?
        calc = [1, 2, 3, 4, 6, 7, 8, 9]:
    (number == 1)?
        calc = [2, 3, 6]:
    (number == grid.columns)?
        calc = [1, 2, 4]:
    (number == grid.columns*(grid.rows-1)+1)?
        calc = [6, 8, 9]:
    (number == grid.columns*grid.rows)?
        calc = [4, 7, 8]:
    (number<grid.columns)?
        calc = [1, 2, 3, 4, 6]:
    (number>grid.columns*grid.rows-grid.columns)?
        calc = [4, 6, 7, 8, 9]:
    (number%grid.columns==0)?
        calc = [1, 2, 4, 7, 8]:
    (number%grid.columns==1)?
        calc = [2, 3, 6, 8, 9]:
    null;


    if (calc.includes(1) && grid.flagsPosition.includes(position+grid.columns-1)){
        flagsArround +=1
    }
    if (calc.includes(2) && grid.flagsPosition.includes(position+grid.columns)){
        flagsArround +=1
    }
    if (calc.includes(3) && grid.flagsPosition.includes(position+grid.columns+1)){
        flagsArround +=1
    }
    if (calc.includes(4) && grid.flagsPosition.includes(position-1)){
        flagsArround +=1
    }
    if (calc.includes(6) && grid.flagsPosition.includes(position+1)){
        flagsArround +=1
    }
    if (calc.includes(7) && grid.flagsPosition.includes(position-grid.columns-1)){
        flagsArround +=1
    }
    if (calc.includes(8) && grid.flagsPosition.includes(position-grid.columns)){
        flagsArround +=1
    }
    if (calc.includes(9) && grid.flagsPosition.includes(position-grid.columns+1)){
        flagsArround +=1
    }
    if(flagsArround  == grid.gridComplete[position]){
        return explode(position) ;
    }
}

async function explode(position){
    //    
    grid.inexplode = true;
    //position
    let positionRep = selectors.content.children[parseInt((position-1)/grid.columns)].children[(position-1)%grid.columns]
    let indexFlag = grid.flagsPosition.indexOf(position);
    //vars
    let p = position;
    let c = grid.columns;
    let np = lClick;
    //positions
    let p1 = p+c-1;
    let p2 = p+c;
    let p3 = p+c+1;
    let p4 = p-1;
    let p6 = p+1;
    let p7 = p-c-1;
    let p8 = p-c;
    let p9 = p-c+1;
    let number = position;
    let results;
    if (grid.checkeds.includes(position)){

    }
    else{
    grid.checkeds.push(position)
    }
    if(indexFlag != -1){
        positionRep.classList.replace('flag','cell');
        positionRep.innerHTML = '';
        grid.flagsPosition.splice(indexFlag, 1)
        grid.flagsQuantity += 1
        selectors.mines.innerHTML = grid.flagsQuantity.toString()
    }

    if(number >grid.columns && number <grid.columns*(grid.rows-1)&& number%grid.columns != 0 && number%grid.columns != 1){
        let promise = Promise.resolve(np(p1), np(p2), np(p3), np(p4), np(p6), np(p7), np(p8), np(p9))
        results = await promise
        grid.inexplode = false;
        return ;
    }
    else{
        if (number == 1){
            let promise = Promise.resolve(np(p2), np(p3), np(p6));
            results = await promise
            return grid.inexplode = false;
        }
        if (number == grid.columns){
            let promise = Promise.resolve(np(p1), np(p2), np(p4));
            results = await promise
            return grid.inexplode = false;
        }
        if (number == grid.columns*(grid.rows-1)+1){
            let promise = Promise.resolve(np(p6), np(p8), np(p9));
            results = await promise
            return grid.inexplode = false;
        }
        if (number == grid.columns*grid.rows){
            let promise = Promise.resolve(np(p4), np(p7), np(p8));
            results = await promise
            return grid.inexplode = false;
        }
        if (number<grid.columns){
            let promise = Promise.resolve(np(p1), np(p2), np(p3), np(p4), np(p6));
            results = await promise

            return grid.inexplode = false;
        }
        if (number>grid.columns*grid.rows-grid.columns){
            let promise = Promise.resolve(np(p4), np(p6), np(p7), np(p8), np(p9));
            results = await promise

            return grid.inexplode = false;
        }
        if (number%grid.columns==0){
            let promise = Promise.resolve(np(p1), np(p2), np(p4), np(p7), np(p8));
            results = await promise

            return grid.inexplode = false;
        }
        if (number%grid.columns==1){
            let promise = Promise.resolve(np(p2), np(p3), np(p6), np(p8), np(p9));
            results = await promise

            return grid.inexplode = false;
        }
    }
}
//restart
function newGame(colsOptions = grid.columns, rowsOptions = grid.rows, minesOptions = grid.minesQuantity, themeOption = grid.theme){
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
    grid.headStyle = ''
    gridCreation()
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

    //reset all
/*     for (let i = 0; i < grid.rows; i++){
        for (let j = 0; j < grid.columns; j++){
            content.children[i].children[j].classList.replace('flagerror','cell');
            content.children[i].children[j].classList.replace('flag','cell');
            content.children[i].children[j].classList.replace('number','cell');
            content.children[i].children[j].innerHTML = '';
            content.children[i].children[j].classList.remove("n0", "n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "nm");
        }
    } */

    //listeners buttons and selectors
    newGameButtons = document.querySelectorAll('.newGame, .lose-retry-button, .congrats-retry-button')  //.addEventListener('click', function () {newGame()}, true)
    listenerNewGame = newGameButtons.forEach(x => 
        x.addEventListener('click', function () {newGame()}, true)
    );
    configbtn = document.querySelector('.config-btn')
    configbtn.addEventListener('click', function ()  {config()}, true);
    selectors.content.addEventListener('click', function (event) { check(event, 'primary') }, true);
    selectors.content.addEventListener('contextmenu', function (event) { check(event, 'secondary') }, true);
    fg = document.querySelector('.fg')
    fg.addEventListener('click', function () {invert()}, true)

    
    if(grid.theme == grid.themes[0])  {
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
    let head = document.getElementsByTagName('head');
    grid.headStyle = document.createElement('style');
    head[0].appendChild(grid.headStyle);

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
    grid.headStyle.insertAdjacentHTML('beforeend', cellAnim);
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
            opacity: 1;
            left: ${(negativehor*randomFloatInterval(0.3,0.7,1)).toFixed(2)}%;
        }    
        99%{
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
grid.headStyle.insertAdjacentHTML('beforeend', bookmarkAnim);

    };

    let divfs = document.createElement('div');
    let header = document.createElement('header');
    let section = document.createElement('section');
    if (grid.theme == grid.themes[0]){divfs.className ='full-screen google'}
    else if (grid.theme == grid.themes[1]){divfs.className ='full-screen windows'}
    else if (grid.theme == grid.themes[2]){divfs.className ='full-screen pacman'};
    document.body.appendChild(divfs);
    let container = document.createElement('div');
    container.className = 'container';
    divfs.appendChild(container);
    header.className = 'header';
    container.appendChild(header);
    let info = document.createElement('div');
    info.className = 'info';
    header.appendChild(info);
    selectors.timer = document.createElement('div');
    selectors.timer.className = 'timer';
    selectors.timer.innerText = '999'
    info.appendChild(selectors.timer);
    let btnNewGame = document.createElement('div');
    btnNewGame.className = 'btn newGame';
    info.appendChild(btnNewGame);
    let btnConfig = document.createElement('div');
    btnConfig.className = 'config-btn';
    info.appendChild(btnConfig);
    let btnFg = document.createElement('div');
    btnFg.className = 'btn fg';
    info.appendChild(btnFg);
    
    selectors.mines = document.createElement('div');
    selectors.mines.className = 'mines';
    info.appendChild(selectors.mines);

    section.className = 'section';
    container.appendChild(section);


    
    selectors.content = document.createElement('div');
    selectors.content.className = 'contenedor';
    section.appendChild(selectors.content);
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

    if (grid.theme == grid.themes[0]){
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
        container.appendChild(lose)
        container.appendChild(congrats);    
     }

    else {
    congrats.className = 'lose';
    lose.innerText = 'Lamentablemente has perdido';
    container.appendChild(lose)
    congrats.className = 'congrats';
    congrats.innerText = 'Felicitaciones has ganado!';
    container.appendChild(congrats)};

    let menu = document.createElement('div');
    menu.className = 'menu-container';
    container.appendChild(menu);
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

function animationCell(positionRep){
    let anim = document.createElement('div');
    anim.className = 'cell-active';
    positionRep.appendChild(anim);
    let animNum = randomIntFromInterval(1,15)
    anim.style.webkitAnimation = `cellAnim${animNum} ${randomFloatInterval(1,1.8,2)}s ease-in forwards`;
    anim.style.animation = `cellAnim${animNum} ${randomFloatInterval(0.8,1.2,2)}s ease-in forwards`;
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
        for(let i=1; i<= 8;i++){
        bg2 = randomIntFromInterval(0,1);
        
        positionRep.insertAdjacentHTML('beforeend',     
        `<div class="nm-confetti" style=" background-color: ${Colors[bg1][bg2]};
        animation: bookmark-anim${randomIntFromInterval(1,20)} ${randomFloatInterval(4.5,6.5,1)}s forwards ease-in-out;
        scale : ${randomFloatInterval(0.5,1.5,1)}"></div>
        `);
    }

    }
}
