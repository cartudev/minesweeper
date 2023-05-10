import { generalUse, functionsConfig, functionsGamePlay } from "./functions";
import { newGame } from './modified';


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
    loses: false,
    win: false,
    inexplode: false,
    invertClick: false,
    timer: 0,
    myTimeout: [],
    control: undefined,
    timerPause: false,
    themes:[
        {name: 'google',
            specials:{
                colors: [['var(--exp_background1)', 'var(--exp_color1)'],
                        ['var(--exp_background2)', 'var(--exp_color2)'],
                        ['var(--exp_background3)', 'var(--exp_color3)'],
                        ['var(--exp_background4)', 'var(--exp_color4)'],
                        ['var(--exp_background5)', 'var(--exp_color5)'],
                        ['var(--exp_background6)', 'var(--exp_color6)'],
                        ['var(--exp_background7)', 'var(--exp_color7)'],
                        ['var(--exp_background8)', 'var(--exp_color8)']],

                bgCols: [['#277BCD','#2F569A'],
                        ['#388E3C','#00582C'],
                        ['#D32F2F','#8E2123'],
                        ['#B648F2','#762F9D'],
                        ['#FF8F00','#9F5608'],
                        ['#48E6F1','#2F569A'],
                        ['#F4C20D','#9F7E08'],
                        ['#ED44B5','#9A2C76']]
            },
            functions: {
                animations: {
                    animationCell: function(positionRep){
                        let anim = document.createElement('div');
                        anim.className = 'cell-active';
                    positionRep.appendChild(anim);
                    let animNum = generalUse.randomIntFromInterval(1,15)
                    anim.style.webkitAnimation = `cellAnim${animNum} ${generalUse.randomFloatInterval(1,1.8,2)}s ease-in forwards`;
                    anim.style.animation = `cellAnim${animNum} ${generalUse.randomFloatInterval(0.8,1.2,2)}s ease-in forwards`;
                   },
                bookmarkHeadAnimation: function(){
                    for(let i=1; i<= 20;i++){
                        let negative = generalUse.negativefn();
                        let negative2 = generalUse.negativefn();
                        let originHor = generalUse.randomIntFromInterval(0,300);
                        let top1 = generalUse.randomIntFromInterval(30, 250);
                        let top2 = generalUse.randomIntFromInterval(30, 250);
                        let horizontalStart = generalUse.randomIntFromInterval(0,60);
                        let horizontal = (negative == '') ?generalUse.randomIntFromInterval(15,300): generalUse.randomIntFromInterval(15,300)*-1;
                        let negativehor = horizontal*-1 ;
                        let horizontal2 = generalUse.randomIntFromInterval(0,80);
                        let deg = (negative2 == '') ?generalUse.randomIntFromInterval(20, 62):generalUse.randomIntFromInterval(20, 62)*-1;
                        let up = generalUse.randomIntFromInterval(1,150);
                        let down = generalUse.randomIntFromInterval(30,220);
                        let bookmarkCode = `        0% {
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
                            -webkit-transform: rotate(${(deg*generalUse.randomFloatInterval(0.7,1.0,1)).toFixed(2)*-1}deg);
                            transform: rotate(${(deg*generalUse.randomFloatInterval(0.7,1.0,1)).toFixed(2)*-1}deg);
                            left:${negativehor}%;
                            top: ${(up-down*generalUse.randomFloatInterval(0.35,0.65,2)).toFixed(2)}%;
                        }
                        83%{        
                            -webkit-transform: scale(0.4) rotate(${(deg*generalUse.randomFloatInterval(0.4,0.7,1)).toFixed(2)}deg);
                            transform: scale(0.4) rotate(${(deg*generalUse.randomFloatInterval(0.4,0.7,1)).toFixed(2)}deg);
                            left: ${(negativehor*generalUse.randomFloatInterval(0.3,0.7,1)).toFixed(2)}%;
                            opacity: 1;
                
                        }    
                        100%{
                            top:${down}%;
                            left: ${horizontal2}%;
                            -webkit-transform: scale(0.1) rotate(${(deg*generalUse.randomFloatInterval(0.1,0.4,1)).toFixed(2)*-1}deg);
                            transform: scale(0.1) rotate(${(deg*generalUse.randomFloatInterval(0.1,0.4,1)).toFixed(2)*-1}deg);
                            opacity: 0;
                
                        }`
                
                        let bookmarkAnim = `@-webkit-keyframes bookmark-anim${i} {${bookmarkCode}}
                        @keyframes bookmark-anim${i} {${bookmarkCode}}`
                
                    selectors.headStyle.insertAdjacentHTML('beforeend', bookmarkAnim);
                
                    };
                },
                cellAnimation: function(){
                    for(let i=1; i<= 15;i++){
                        let negative = generalUse.negativefn();
                        let negative2 = generalUse.negativefn();
                        let left = `${generalUse.randomIntFromInterval(100,400)}`;
                        let halfLeft = Math.ceil(left/2);
                        let tenLeft= Math.ceil(left*.1);
                        let topPos = generalUse.randomIntFromInterval(0,400);
                        let fall  = topPos*-1 + generalUse.randomIntFromInterval(0,200);
                        let almostTop = Math.ceil(topPos * (generalUse.randomIntFromInterval(92,98)*0.01));
                        let almostTop2 = Math.ceil(topPos * (generalUse.randomIntFromInterval(92,98)*0.01));
                        let rotate = generalUse.randomIntFromInterval(90,400);
                        let halfRotate = Math.ceil(rotate/2);
                        let scale = generalUse.randomIntFromInterval(1,3);
                    let animCode = `        0% {
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
                        scale: 1.${generalUse.randomIntFromInterval(1,3)};
                        top: -${topPos}%;
                        left: ${negative}${halfLeft}%;
                    }
                    65%{
                        top: -${almostTop2}%;
                        left: ${negative}${(halfLeft+tenLeft)}%;
                    }
                    90%{
                        opacity: 0.${generalUse.randomIntFromInterval(7,9)};
                    }
                
                    100% {
                        transform: rotate(${negative2}${rotate}deg);
                        scale: 0.${scale};
                        left: ${negative}${left}%;
                        top:${fall}%;
                        opacity: 0;
                        filter: blur(${generalUse.randomIntFromInterval(1,3)})
                      visibility: hidden;
                    }
                `
                
                    let cellAnim = `@-webkit-keyframes cellAnim${i} {${animCode}}
                      @keyframes cellAnim${i} {${animCode}}
                    `
                
                    selectors.headStyle.insertAdjacentHTML('beforeend', cellAnim);
                    }
                },
                animationExp: function(explode){

                    let Colors = grid.themes[grid.theme.id].specials.colors
                    let bgCols = grid.themes[grid.theme.id].specials.bgCols
                
                    let cont = selectors.content;
                    let bg1 = generalUse.randomIntFromInterval(0,7);
                    let bg2 = generalUse.randomIntFromInterval(0,1);
                    let bg3 = generalUse.randomIntFromInterval(0,1);
                    if( !grid.flagsPosition.includes(explode)){ // no se el porque esto.
                
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
                
                },
            congratsLose : function(){
                selectors.congrats = document.createElement('div');
                selectors.lose = document.createElement('div');
                selectors.lose.addEventListener('click', function(){
                    if(selectors.lose.classList[1] != 'focussed' | selectors.lose.classList[0] != 'focussed')
                    {selectors.lose.classList.add('focussed')};
                });
        
        
                selectors.congrats.className = 'congrats-container focussed';
                selectors.lose.className = 'lose-container';
            
                selectors.lose.insertAdjacentHTML('beforeend', `
                <div class="lose">
                <div class="lose-content"></div>
                <div class="lose-bg"></div>
                <div class="lose-retry-button">
                <div class="lose-retry-icon"></div><p>Reintentar</p>
                </div>
                </div>
                `)
                selectors.congrats.insertAdjacentHTML('beforeend', `
                <div class="congrats">
                <div class="congrats-content"></div>
                <div class="congrats-bg"></div>
                <div class="congrats-retry-button">
                <div class="congrats-retry-icon"></div><p>Volver a jugar</p>
                </div>
                </div>
                `
                )
                selectors.container.appendChild(selectors.lose)
                selectors.container.appendChild(selectors.congrats);    
             },
            minesLose: function(number){
                
                let cont = selectors.content;
                let positionRep = cont.children[parseInt((number-1)/grid.columns)].children[(number-1)%grid.columns];

                selectors.btnNewGame.classList.replace('newGame', 'losebtn')
                document.querySelector('.lose-container').style.display = 'block';
                grid.themes[grid.theme.id].functions.animations.animationExp(number);

                let deletenum = grid.minesPositions.indexOf(number);
                grid.minesPositions.splice(deletenum, 1);
            
                for (let flag of grid.flagsPosition){
                    if(!grid.minesPositions.includes(flag)){
                        positionRep = cont.children[parseInt((flag-1)/grid.columns)].children[(flag-1)%grid.columns];
                        positionRep.classList.replace('flag','flagerror');
                        positionRep.innerHTML = ''
                    }
                }
            
                for (let explode of grid.minesPositions){
                grid.myTimeout.push(setTimeout(grid.themes[grid.theme.id].functions.animations.animationExp, generalUse.randomIntFromInterval(500,(grid.minesQuantity*500)), explode));
                }
            },
            templategen: function() {return grid.themes[3].common.templategen()},

 
            }
            }
        ,
        {name: 'windows',
        
        functions:{
            animations: {
                animationCell: function() {return grid.themes[3].common.animations.animationCell},
                bookmarkHeadAnimation: function() {return grid.themes[3].common.animations.bookmarkHeadAnimation()},
                cellAnimation: function() {return grid.themes[3].common.animations.cellAnimation},
            },
            menu: function() {
                selectors.menu = document.createElement('div');
                selectors.menu.className = 'menu-container';
                selectors.container.appendChild(selectors.menu);
                selectors.menu.insertAdjacentHTML('beforeend', `
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
                <div class="buttons">
                <button class="apply-btn">Apply</button>
                <button class="cancel-btn">Cancel</button>
                </div>
                `)
                return 
            },
            congratsLose: function() {return grid.themes[3].common.congratsLose()},
            minesLose: function() {return grid.themes[3].common.minesLose()},
            templategen: function(){
                selectors.headStyle = document.createElement('style');
                selectors.headHTML[0].appendChild(selectors.headStyle);
                grid.themes[grid.theme.id].functions.animations.bookmarkHeadAnimation()
                grid.themes[grid.theme.id].functions.animations.cellAnimation()
            
                selectors.fullScreen = document.createElement('div');
                selectors.header = document.createElement('header');
            
                selectors.fullScreen.className = `full-screen ${grid.theme.name}`
            
                document.body.appendChild(selectors.fullScreen);
                selectors.section = document.createElement('section');
                selectors.container = document.createElement('div');
            
                selectors.container.className = 'container';
                selectors.fullScreen.appendChild(selectors.container);
                
                
                selectors.menuUp = document.createElement('div');
                selectors.menuUp.className = 'menu-up';
                selectors.container.appendChild(selectors.menuUp);

                selectors.menuUp.insertAdjacentHTML('beforeend', `
                <div class="game non-active">Game
                <div id='change' class="menu-content">
                    <div id="new">New</div>
                    <div class="hr"></div>
                    <div id="beginner">Beginner</div>
                    <div id="intermediate">Intermediate</div>
                    <div id="expert">Expert</div>
                    <div id="custom"><span class="selected"></span>Custom</div>
                </div>
                </div>
                <div class="help non-active">Help
                <div class="menu-content">
                <div id="about">About</div>
                </div>
                </div>
                <div class="extras non-active">Extras
                <div class="menu-content">
                <div id="windows"><span></span>Skin windows</div>
                <div id="google">Skin google</div>
                <div id="pacman">Skin pacman</div>
                </div>
                </div>
                `);
                selectors.menuUpClick = false;
                selectors.menuUpChild = selectors.menuUp.children;
                selectors.change = document.querySelector('#change')
                for (let i = 0; i < selectors.menuUpChild.length; i++) {
                    selectors.menuUpChild[i].addEventListener('click', function () {functionsConfig.clicked(i)}, true);
                    selectors.menuUpChild[i].addEventListener('mouseenter', function () {functionsConfig.menuDrop(i)}, true);
                
                  }
                document.querySelector('#new').addEventListener('click', function () {newGame()}, true)
                document.querySelector('#beginner').addEventListener('click', function () {newGame(9, 9, 10, 1)
                    document.querySelector('.selected').remove()
                    document.querySelector('#beginner').innerHTML = `<span class="selected"></span>Beginner`
                    }, true);
                document.querySelector('#intermediate').addEventListener('click', function () {newGame(16, 16, 40, 1)
                    document.querySelector('.selected').remove()
                    document.querySelector('#intermediate').innerHTML = `<span class="selected"></span>Intermediate`
                }, true)
                document.querySelector('#expert').addEventListener('click', function () {newGame(30, 19, 99, 1)
                    document.querySelector('.selected').remove()
                    document.querySelector('#expert').innerHTML = `<span class="selected"></span>Expert`
                    }, true);
                document.querySelector('#custom').addEventListener('click', function () {
                    functionsConfig.config()
                }, true)

                document.querySelector('#windows').addEventListener('click', function () {newGame()}, true)
                document.querySelector('#google').addEventListener('click', function () {newGame(grid.columns, grid.rows, grid.minesQuantity, 0)}, true)
                document.querySelector('#pacman').addEventListener('click', function () {newGame(grid.columns, grid.rows, grid.minesQuantity, 2)}, true)


                selectors.header.className = 'header';
                selectors.container.appendChild(selectors.header);
            
                let info = document.createElement('div');
                info.className = 'info';
                selectors.header.appendChild(info);
                selectors.timer = document.createElement('div');
                selectors.timer.className = 'timer';
                selectors.timer.innerText = '0'
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
            
                grid.themes[grid.theme.id].functions.congratsLose()
                grid.themes[grid.theme.id].functions.menu()
            },
        },
    },
        {name: 'pacman',
        functions:{
            animations: {
                animationCell: function() {return grid.themes[3].common.animations.animationCell},
                bookmarkHeadAnimation: function() {return grid.themes[3].common.animations.bookmarkHeadAnimation()},
                cellAnimation: function() {return grid.themes[3].common.animations.cellAnimation},
            },
            congratsLose: function() {return grid.themes[3].common.congratsLose()},
            minesLose: function() {return grid.themes[3].common.minesLose()},
            templategen: function() {return grid.themes[3].common.templategen()},
        }},
        {name: 'common',
        common: 
            {
                animations: {
                    animationCell: function(positionRep){return},
                    bookmarkHeadAnimation: function(){return},
                    cellAnimation: function(){return},
                },
                menu : function(){
                selectors.menu = document.createElement('div');
                selectors.menu.className = 'menu-container';
                selectors.container.appendChild(selectors.menu);
                selectors.menu.insertAdjacentHTML('beforeend', `
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
                <option value='0'>Google Theme</option>
                <option value='1'>Classic Windows</option>  
                <option value='2'>Pacman style (w.i.p)</option>
                </select>
                </div>
                <div class="buttons">
                    <button class="apply-btn">Apply</button>
                    <button class="cancel-btn">Cancel</button>
                </div>
                </div>
                `
                )
                },
                congratsLose: function(){
                    selectors.congrats = document.createElement('div');
                    selectors.lose = document.createElement('div');
                    selectors.lose.className = 'lose';
                    selectors.lose.innerText = 'Lamentablemente has perdido';
                    selectors.container.appendChild(selectors.lose)
                    selectors.congrats.className = 'congrats';
                    selectors.congrats.innerText = 'Felicitaciones has ganado!';
                    selectors.container.appendChild(selectors.congrats)
                },
                minesLose: function(number){
                    let cont = selectors.content;
                    let positionRep ;
                    selectors.btnNewGame.classList.replace('newGame', 'losebtn')
                    document.querySelector('.lose').style.display = 'block'
                    for (let flag of grid.flagsPosition){
                        if(!grid.minesPositions.includes(flag)){
                            positionRep = cont.children[parseInt((flag-1)/grid.columns)].children[(flag-1)%grid.columns];
                            positionRep.classList.replace('flag','flagerror');
                            positionRep.innerHTML = ''
                        }
                    }
                    for (let explode of grid.minesPositions){
                        if( !grid.flagsPosition.includes(explode)){ // no se el porque esto.
                        let positionRep = cont.children[parseInt((explode-1)/grid.columns)].children[(explode-1)%grid.columns];            
                        positionRep.classList.replace('cell','number');
                        positionRep.classList.add('nm');}

                    }
                },
                templategen: function(){
                    selectors.headStyle = document.createElement('style');
                    selectors.headHTML[0].appendChild(selectors.headStyle);
                    grid.themes[grid.theme.id].functions.animations.bookmarkHeadAnimation()
                    grid.themes[grid.theme.id].functions.animations.cellAnimation()
                
                    selectors.fullScreen = document.createElement('div');
                    selectors.header = document.createElement('header');
                
                    selectors.fullScreen.className = `full-screen ${grid.theme.name}`
                
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
                    selectors.timer.innerText = '0'
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
                
                    grid.themes[grid.theme.id].functions.congratsLose()
                    grid.themes[3].common.menu()
                },
            }
        }]
    ,
    theme: {name: 'windows',
    id: 1},

}

export let selectors = {
    headHTML: document.getElementsByTagName('head'),
    headStyle: undefined,
    content: undefined,
    header: undefined,
    mines: undefined,
    fullScreen: undefined,
    section: undefined,
    container: undefined,
    btnNewGame: undefined,
    btnFg: undefined,
    congrats: undefined,
    lose: undefined,
    menu: undefined,
    newGameButtons: undefined,
    configbtn: undefined,
    fg: undefined,
    listeners :
    {
        listenerNewGame: function(){selectors.newGameButtons.forEach(x => 
            x.addEventListener('click', function () {newGame()}, true)
        );
        return},
        listenerConfigBtn: function() {selectors.configbtn.addEventListener('click', function ()  { functionsConfig.config()}, true); return},
        listenerContent: function() {selectors.content.addEventListener('click', function (event) { functionsGamePlay.check(event, 'primary') }, true);
        selectors.content.addEventListener('contextmenu', function (event) { functionsGamePlay.check(event, 'secondary') }, true); 
        return},
        listenerFg: function() {selectors.fg.addEventListener('click', function () {functionsGamePlay.invert()}, true); return},
    }
}