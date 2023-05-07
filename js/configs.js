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
        {
            name: 'google',
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
             }
            }
            }
        ,
        {name: 'windows',
        
        functions:{
            objself:this,
            get animations() {return {animations: grid.themes[3].common.animations}},
            get congratsLose() {return grid.themes[3].common.congratsLose()}
        }},
        {name: 'pacman',
        functions:{
            get animations() {return {animations: grid.themes[3].common.animations}},
            get congratsLose() {return grid.themes[3].common.congratsLose()}
        }},
        {name: 'common',
        common: 
            {
                animations: {
                    animationCell: function(positionRep){},
                    bookmarkHeadAnimation: function(){},
                    cellAnimation: function(){},
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
                <option value='1'>Classic Windows (w.i.p)</option>  
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
                }

            }
        }]
    ,
    theme: {name: 'google',
    id: 0},
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
    btnFg: undefined,
    congrats: undefined,
    lose: undefined,
    menu: undefined,
    listeners :
    {

    }
}