

//grid
let columns = 20;
let rows = 20;
let cells = rows*columns;
let minesQuantity= 30;
let flagsQuantity = minesQuantity;
let elementStyle;
//positions vars
let minesPositions = [];
let numbersList= [];
let checkeds = [];
let GridComplete = [null]
let flagsPosition = []
let theme = "googleStyle"
templategen()
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
let timer = 0;
let control = setInterval(cronometro,1000)
document.querySelector('.timer').innerHTML = timer.toString()
document.querySelector('.mines').innerHTML = flagsQuantity.toString()
let butn = document.querySelector('.newGame')
//booleans
let loses = false;
let win = false;
let inexplode = false;
let invertClick = false;

//listeners buttons and selectors
let content = document.querySelector('.contenedor')
document.querySelector('.btn').addEventListener('click', function () {newGame()}, true)
content.addEventListener('click', function (event) { check(event, 'primary') }, true);
content.addEventListener('contextmenu', function (event) { check(event, 'secondary') }, true);
let fg = document.querySelector('.fg')
fg.addEventListener('click', function () {invert()}, true)

//grid creation
export function gridCreation() {
    for (let i = 1; i <= cells; i++) {
        numbersList.push(i)
    };
    for (let i = 1; i <= minesQuantity; i++) {
        let random = (Math.floor(Math.random() * numbersList.length))
        let addnumber = numbersList.splice(random, 1)
        minesPositions.push(addnumber[0])
    }
    minesPositions.sort((a, b) => a - b)
    for (let i = 0; i <= minesPositions.length; i++) {
        numbersList.splice(minesPositions[i - 1], 0, 'm')
    }
    numbersList.splice(0, 1, null)
    gridCompleteCreation()
}

function gridCompleteCreation(){
    for(let i = 1; i<=cells;i++){
       numbersPosition(i) 
    }
};

function numbersPosition(number){
    let n = number
    if(numbersList[number] == 'm'){
        GridComplete.push(numbersList[number])
        return ;
    }
    if(number >columns && number <columns*(rows-1)&& number%columns != 0 && number%columns != 1){
        return calc(n, 1, 2, 3, 4, 6, 7, 8, 9)
    }
    else{
        if (number == 1){
            return calc(n, 2, 3, 6)
        }
        if (number == columns){
            return calc(n, 1, 2, 4)
        }
        if (number == columns*(rows-1)+1){
            return calc(n, 6, 8, 9)
        }
        if (number == columns*rows){
            return calc(n, 4, 7, 8)
        }
        if (number<columns){
            return calc(n, 1, 2, 3, 4, 6)
        }
        if (number>columns*rows-columns){
            return calc(n, 4, 6, 7, 8, 9)
        }
        if (number%columns==0){
            return calc(n, 1, 2, 4, 7, 8)
        }
        if (number%columns==1){
            return calc(n, 2, 3, 6, 8, 9)
        }
    }
};

//check the position of the click and the invert button
function check(event, action){
    console.log('tiempo1')
    if(event.composedPath()[0].classList[0] == 'cell' || 
    event.composedPath()[0].classList[0] == 'number' || 
    event.composedPath()[0].classList[0] == 'flag'){
        const position = 
        parseInt(event.composedPath()[0].classList[1].match(/\d+/)) + 
        ((parseInt(event.composedPath()[1].classList[1].match(/\d+/))-1)*columns);

    if(checkeds.includes(position)){
        event.preventDefault();
        return lClick(position);
    }
    if (action == 'primary' && invertClick == false || action == 'secondary' && invertClick == true){
        event.preventDefault();
        return lClick(position);
    }

    if (action == 'secondary' && invertClick == false || action == 'primary' && invertClick == true){
        event.preventDefault()
        flags(position)
        return ;
    }
    }
    else{return ;}
};

function invert(){
if(fg.classList[1]== 'fg'){
    fg.classList.replace('fg','mn')
    invertClick = true;
}
else{fg.classList.replace('mn','fg')
    invertClick = false;
}

}

//function for timers
function stopTimer(){
    clearInterval(control)
}
function cronometro(){
    if (timer == 999 || loses || win){
        stopTimer()
        control = null;
        return
    }
    timer ++
    document.querySelector('.timer').innerHTML = timer.toString()

}

function lClick(position){

    if (checkeds.includes(position) && inexplode){
        return ;
    }
    if (checkeds.includes(position) && !inexplode){
        checkmines(position)
        return ;
    }
    if(loses == true){
        return ;
    }
    if(GridComplete[position] == 'm'){
        losefn(position)
        return ;}
    let positionRep = content.children[parseInt((position-1)/columns)].children[(position-1)%columns]

    if(GridComplete[position] == 0){
        positionRep.classList.replace('cell','number');   
        explode(position)
    }
    if (flagsPosition.indexOf(position) != -1){
        return ;
    }
    else{
        
        positionRep.classList.replace('cell','number');
        if(!checkeds.includes(position)){
        positionRep.classList.add(`n${GridComplete[position]}`);
        if(theme == 'googleStyle'){
            animationCell(positionRep)
        }
    }
    }
    if (checkeds.includes(position)){
        return ;
    }
    else{
        checkeds.push(position)}
    if(checkeds.length == cells-minesQuantity){
        winfn()

        return;
    }
}



function flags(number){
    if (checkeds.includes(number)){
        return
    }
    if(loses == true){
        return
    }
    let myIndex = flagsPosition.indexOf(number);
    let positionRep = content.children[parseInt((number-1)/columns)].children[(number-1)%columns]
    
    myIndex == -1 ? (
        positionRep.classList.replace('cell','flag'),
        flagsPosition.push(number) ,
        flagsQuantity -= 1
    ) : (
        positionRep.classList.replace('flag','cell'),
        flagsPosition.splice(myIndex, 1),
        flagsQuantity += 1
    )
    document.querySelector('.mines').innerHTML = flagsQuantity.toString()
}
function winfn(){
    butn.classList.replace('newGame', 'winbtn')
    document.querySelector('.congrats').style.display = 'block';
    win = true;
}
function losefn(number){
    if (flagsPosition.indexOf(number) != -1){
        return;}
    loses = true;
    butn.classList.replace('newGame', 'losebtn')
    explodemines(number);
    document.querySelector('.lose').style.display = 'block'
}

function calc(position, ...args){
    let numbercell = 0

    // just idea
/*  setArgs={ 

    } */   
    
    
    if (args.includes(1) && numbersList[position+columns-1] == "m"){
        numbercell +=1
    }
    if (args.includes(2) && numbersList[position+columns] == "m"){
        numbercell +=1
    }
    if (args.includes(3) && numbersList[position+columns+1] == "m"){
        numbercell +=1
    }
    if (args.includes(4) && numbersList[position-1] == "m"){
        numbercell +=1
    }
    if (args.includes(6) && numbersList[position+1] == "m"){
        numbercell +=1
    }
    if (args.includes(7) && numbersList[position-columns-1] == "m"){
        numbercell +=1
    }
    if (args.includes(8) && numbersList[position-columns] == "m"){
        numbercell +=1
    }
    if (args.includes(9) && numbersList[position-columns+1] == "m"){
        numbercell +=1
    }
    GridComplete.push(numbercell)
}

function checkmines(position){
    let number = position;
    let flagsArround = 0;
    let calc = [];

    (number >columns && number <columns*(rows-1)&& number%columns != 0 && number%columns != 1)?
        calc = [1, 2, 3, 4, 6, 7, 8, 9]:
    (number == 1)?
        calc = [2, 3, 6]:
    (number == columns)?
        calc = [1, 2, 4]:
    (number == columns*(rows-1)+1)?
        calc = [6, 8, 9]:
    (number == columns*rows)?
        calc = [4, 7, 8]:
    (number<columns)?
        calc = [1, 2, 3, 4, 6]:
    (number>columns*rows-columns)?
        calc = [4, 6, 7, 8, 9]:
    (number%columns==0)?
        calc = [1, 2, 4, 7, 8]:
    (number%columns==1)?
        calc = [2, 3, 6, 8, 9]:
    null;


    if (calc.includes(1) && flagsPosition.includes(position+columns-1)){
        flagsArround +=1
    }
    if (calc.includes(2) && flagsPosition.includes(position+columns)){
        flagsArround +=1
    }
    if (calc.includes(3) && flagsPosition.includes(position+columns+1)){
        flagsArround +=1
    }
    if (calc.includes(4) && flagsPosition.includes(position-1)){
        flagsArround +=1
    }
    if (calc.includes(6) && flagsPosition.includes(position+1)){
        flagsArround +=1
    }
    if (calc.includes(7) && flagsPosition.includes(position-columns-1)){
        flagsArround +=1
    }
    if (calc.includes(8) && flagsPosition.includes(position-columns)){
        flagsArround +=1
    }
    if (calc.includes(9) && flagsPosition.includes(position-columns+1)){
        flagsArround +=1
    }
    if(flagsArround  == GridComplete[position]){
        return explode(position) ;
    }
}

function explode(position){
    //    
    inexplode = true;
    //position
    let positionRep = content.children[parseInt((position-1)/columns)].children[(position-1)%columns]
    let indexFlag = flagsPosition.indexOf(position);
    //vars
    let p = position;
    let c = columns;
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

    if (checkeds.includes(position)){

    }
    else{
    checkeds.push(position)
    }
    if(indexFlag != -1){
        positionRep.classList.replace('flag','cell');
        flagsPosition.splice(indexFlag, 1)
        flagsQuantity += 1
        document.querySelector('.mines').innerHTML = flagsQuantity.toString()
    }
    if(number >columns && number <columns*(rows-1)&& number%columns != 0 && number%columns != 1){
        np(p1); np(p2); np(p3); np(p4); np(p6); np(p7); np(p8); np(p9);
        return inexplode = false;
    }
    else{
        if (number == 1){
            np(p2); np(p3); np(p6);
            return inexplode = false;
        }
        if (number == columns){
            np(p1); np(p2); np(p4);
            return inexplode = false;
        }
        if (number == columns*(rows-1)+1){
            np(p6); np(p8); np(p9);
            return inexplode = false;
        }
        if (number == columns*rows){
            np(p4); np(p7); np(p8);
            return inexplode = false;
        }
        if (number<columns){
            np(p1); np(p2); np(p3); np(p4); np(p6);
            return inexplode = false;
        }
        if (number>columns*rows-columns){
            np(p4); np(p6); np(p7); np(p8); np(p9);
            return inexplode = false;
        }
        if (number%columns==0){
            np(p1); np(p2); np(p4); np(p7); np(p8);
            return inexplode = false;
        }
        if (number%columns==1){
            np(p2); np(p3); np(p6); np(p8); np(p9);
            return inexplode = false;
        }
    }
}
//restart
function newGame(){
    win ? butn.classList.replace('winbtn', 'newGame'): null;
    loses ? butn.classList.replace('losebtn', 'newGame'): null;
    let cellactive = document.querySelectorAll('.cell-active');
    console.log(cellactive)

    for(let i = 0; i< cellactive.length;i++){cellactive[i].remove()}
    //positions vars
    minesPositions = [];
    numbersList= [];
    checkeds = [];
    GridComplete = [null]
    flagsPosition = []
    flagsQuantity = minesQuantity;
    //default options timer
    stopTimer();
    timer = 0;
    document.querySelector('.mines').innerHTML = flagsQuantity.toString();
    document.querySelector('.timer').innerHTML = timer.toString()
    control = setInterval(cronometro,1000)
    //booleans
    win = false;
    loses = false;
    //reset all
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < columns; j++){
            content.children[i].children[j].classList.replace('flagerror','cell');
            content.children[i].children[j].classList.replace('flag','cell');
            content.children[i].children[j].classList.replace('number','cell');
            content.children[i].children[j].classList.remove("n0", "n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "nm");
        }
    }
    gridCreation()

    document.querySelector('.congrats').style.display = 'none'
    document.querySelector('.lose').style.display = 'none'
}



function templategen(){
    let head = document.getElementsByTagName('head');
    elementStyle = document.createElement('style');
    head[0].appendChild(elementStyle);

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
    elementStyle.insertAdjacentHTML('beforeend', cellAnim);
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
elementStyle.insertAdjacentHTML('beforeend', bookmarkAnim);

    };

    let divfs = document.createElement('div');
    let header = document.createElement('header');
    let section = document.createElement('section');
    divfs.className ='full-screen';
    document.body.appendChild(divfs);
    let container = document.createElement('div');
    container.className = 'container';
    divfs.appendChild(container);
    header.className = 'header';
    container.appendChild(header);
    let info = document.createElement('div');
    info.className = 'info';
    header.appendChild(info);
    let timer = document.createElement('div');
    timer.className = 'timer';
    timer.innerText = '999'
    info.appendChild(timer);
    let btnNewGame = document.createElement('div');
    btnNewGame.className = 'btn newGame';
    info.appendChild(btnNewGame);
    let btnFg = document.createElement('div');
    btnFg.className = 'btn fg';
    info.appendChild(btnFg);
    let mines = document.createElement('div');
    mines.className = 'mines';
    info.appendChild(mines);
    section.className = 'section';
    container.appendChild(section);
    let contenedor = document.createElement('div');
    contenedor.className = 'contenedor';
    section.appendChild(contenedor);
    let row;
    let cellcont; 


    for(let i = 1; i<=rows; i++){
        row = document.createElement('div');
        row.className = `row r${i}`;
        contenedor.appendChild(row);
        for(let j = 1; j<=columns; j++){
            cellcont = document.createElement('div');
            cellcont.className = `cell c${j}`;
            row.appendChild(cellcont);
        }
    }


    let congrats = document.createElement('div');
    congrats.className = 'congrats';
    congrats.innerText = 'Felicitaciones has ganado!';
    container.appendChild(congrats);
    let lose = document.createElement('div');
    lose.className = 'lose';
    lose.innerText = 'Lamentablemente has perdido';
    container.appendChild(lose);

}
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

    let cont = document.querySelector('.contenedor');
    let bg1 = randomIntFromInterval(0,7);
    let bg2 = randomIntFromInterval(0,1);
    let bg3 = randomIntFromInterval(0,1);


    let positionRep = cont.children[parseInt((number-1)/columns)].children[(number-1)%columns];


    positionRep.classList.replace('cell','number');
    positionRep.classList.add('nm');
    positionRep.style.setProperty(`background-color`,`${bgCols[bg1][0]}`);
    console.log(bgCols[bg1][1]);   
    positionRep.insertAdjacentHTML('afterbegin', 
    `<div style="background-color:${bgCols[bg1][1]}"></div>
    `)
    for(let i=1; i<= 8;i++){
    bg2 = randomIntFromInterval(0,1);
    
    positionRep.insertAdjacentHTML('beforeend',     
    `<div style=" background-color: ${Colors[bg1][bg2]};
    animation: bookmark-anim${randomIntFromInterval(1,20)} ${randomFloatInterval(4.5,6.5,1)}s forwards ease-in;
    scale : ${randomFloatInterval(0.5,1.5,1)}"></div>
    `);

}    let deletenum = minesPositions.indexOf(number);
    minesPositions.splice(deletenum, 1);

    for (let flag of flagsPosition){
        if(!minesPositions.includes(flag)){
            positionRep = cont.children[parseInt((flag-1)/columns)].children[(flag-1)%columns];

            positionRep.classList.replace('flag','flagerror');
        }


    }
    for (let explode of minesPositions){
        let myTimeout = setTimeout(animationExp, randomIntFromInterval(500,(minesQuantity*500)), explode);
        

    }




}


function animationExp(explode){

    let cont = document.querySelector('.contenedor');
    let bg1 = randomIntFromInterval(0,7);
    let bg2 = randomIntFromInterval(0,1);
    let bg3 = randomIntFromInterval(0,1);
    if( !flagsPosition.includes(explode)){

        let positionRep = cont.children[parseInt((explode-1)/columns)].children[(explode-1)%columns];


        positionRep.classList.replace('cell','number');
        positionRep.classList.add('nm');
        // positionRep.style.setProperty(`background-color`,`${bgCols[bg1][0]}`);
        positionRep.insertAdjacentHTML('afterbegin', 
        `<div style="background-color:${bgCols[bg1][1]}"></div>
        `)
        for(let i=1; i<= 8;i++){
        bg2 = randomIntFromInterval(0,1);
        
        positionRep.insertAdjacentHTML('beforeend',     
        `<div style=" background-color: ${Colors[bg1][bg2]};
        animation: bookmark-anim${randomIntFromInterval(1,20)} ${randomFloatInterval(4.5,6.5,1)}s forwards ease-in-out;
        scale : ${randomFloatInterval(0.5,1.5,1)}"></div>
        `);
    }

    }
}
