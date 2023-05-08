import { grid, selectors } from './configs';

import { newGame } from './modified';

export let functionsLogicLayout = {
    gridCreation: function() {
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
        this.gridCompleteCreation()
    },
    gridCompleteCreation: function(){
        for(let i = 1; i<=grid.cells;i++){
           this.numbersPosition(i) 
        }
    },
    numbersPosition: function(number){
        let n = number
        if(grid.numbersList[number] == 'm'){
            grid.gridComplete.push(grid.numbersList[number])
            return ;
        }
        if(number >grid.columns && number <grid.columns*(grid.rows-1)&& number%grid.columns != 0 && number%grid.columns != 1){
            return this.calc(n, 1, 2, 3, 4, 6, 7, 8, 9)
        }
        else{
            if (number == 1){
                return this.calc(n, 2, 3, 6)
            }
            if (number == grid.columns){
                return this.calc(n, 1, 2, 4)
            }
            if (number == grid.columns*(grid.rows-1)+1){
                return this.calc(n, 6, 8, 9)
            }
            if (number == grid.columns*grid.rows){
                return this.calc(n, 4, 7, 8)
            }
            if (number<grid.columns){
                return this.calc(n, 1, 2, 3, 4, 6)
            }
            if (number>grid.columns*grid.rows-grid.columns){
                return this.calc(n, 4, 6, 7, 8, 9)
            }
            if (number%grid.columns==0){
                return this.calc(n, 1, 2, 4, 7, 8)
            }
            if (number%grid.columns==1){
                return this.calc(n, 2, 3, 6, 8, 9)
            }
        }
    },
    calc: function(position, ...args){
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
    },
    winfn: function(){
        selectors.btnNewGame.classList.replace('newGame', 'winbtn');
        grid.theme.name == grid.themes[0].name ? (document.querySelector('.congrats-container').style.display = 'block') : (document.querySelector('.congrats').style.display = 'block')
        grid.win = true;
    },
    losefn: function(number){
        if (grid.flagsPosition.indexOf(number) != -1){
            return;}
        grid.loses = true;
        grid.themes[grid.theme.id].functions.minesLose(number);
    }
}

export let functionsGamePlay = {
    lClick: function(position){

        if (grid.checkeds.includes(position) && grid.inexplode){
            return ;
        }
        if (grid.checkeds.includes(position) && !grid.inexplode ){
            this.checkmines(position)
            return ;
        }
        if(grid.loses == true){
            return ;
        }
        if(grid.gridComplete[position] == 'm'){
            functionsLogicLayout.losefn(position)
            return ;}
        let positionRep = selectors.content.children[parseInt((position-1)/grid.columns)].children[parseInt((position-1)%grid.columns)]
        if(grid.gridComplete[position] == 0){
    
            positionRep.classList.replace('cell','number');   
    
            functionsGamePlay.explode(position)
    
        }
        if (grid.flagsPosition.indexOf(position) != -1 && grid.inexplode){
            let myIndex = grid.flagsPosition.indexOf(position);
            positionRep.classList.replace('flag','cell'),
            positionRep.innerHTML = '',
            grid.flagsPosition.splice(myIndex, 1),
            grid.flagsQuantity += 1
            selectors.mines.innerHTML = grid.flagsQuantity.toString()
            functionsGamePlay.lClick(position);
            return ;
        }
        if (grid.flagsPosition.indexOf(position) != -1){
            return ;
        }
        else{
            
            positionRep.classList.replace('cell','number');
            if(!grid.checkeds.includes(position)){
            positionRep.classList.add(`n${grid.gridComplete[position]}`);
            if(grid.theme.name == grid.themes[0].name){
                grid.themes[0].functions.animations.animationCell(positionRep)
            }
        }
        }
        if (grid.checkeds.includes(position)){
            return ;
        }
        else{
            grid.checkeds.push(position)}
        if(grid.checkeds.length == grid.cells-grid.minesQuantity){
    
            functionsLogicLayout.winfn()       
            return;
        }
    },
    flags: function(number){
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
            grid.theme.name == grid.themes[0].name? (
            positionRep.innerHTML = '',
            positionRep.insertAdjacentHTML('beforeend',
            `<div class="f-animation" </div>`
            )) : (console.log()),
            grid.flagsPosition.push(number) ,
            grid.flagsQuantity -= 1
        ) : (
            positionRep.classList.replace('flag','cell'),
            grid.theme.name == grid.themes[0].name? (
                positionRep.innerHTML = '',
                positionRep.insertAdjacentHTML('beforeend',     
                `<div class="f-animation" style="animation: cellAnim${generalUse.randomIntFromInterval(1,15)} ${generalUse.randomFloatInterval(1,1.8,2)}s ease-in forwards; 
                -webkit-animation: cellAnim${generalUse.randomIntFromInterval(1,15)} ${generalUse.randomFloatInterval(1,1.8,2)}s ease-in forwards"</div>`)
            )
            :(console.log('')),
            grid.flagsPosition.splice(myIndex, 1),
            grid.flagsQuantity += 1
        )
        selectors.mines.innerHTML = grid.flagsQuantity.toString()
    },
    checkmines: function(position){
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
            functionsGamePlay.explode(position) ;
            return;
        }
    },

    invert: function(){
        if(selectors.btnFg.classList[1]== 'fg'){
            selectors.btnFg.classList.replace('fg','mn')
            grid.invertClick = true;
        }
        else{selectors.btnFg.classList.replace('mn','fg')
            grid.invertClick = false;
        }    
    },
    check: function(event, action){
        if(event.composedPath()[0].classList[0] == 'cell' || 
        event.composedPath()[0].classList[0] == 'number' || 
        event.composedPath()[0].classList[0] == 'flag'){
            const position = 
            parseInt(event.composedPath()[0].classList[1].match(/\d+/)) + 
            ((parseInt(event.composedPath()[1].classList[1].match(/\d+/))-1)*grid.columns);
    
        if(grid.checkeds.includes(position)){
            event.preventDefault();
            this.lClick(position);
            return;
        }
        if (action == 'primary' && grid.invertClick == false || action == 'secondary' && grid.invertClick == true){
            event.preventDefault();
            this.lClick(position);
            return;
        }
    
        if (action == 'secondary' && grid.invertClick == false || action == 'primary' && grid.invertClick == true){
            event.preventDefault()
            this.flags(position)
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
            this.flags(position)
        }
    
        else{return ;}
    },
    explode: async function(position){
        //    
        grid.inexplode = true;
        //position
        let positionRep = selectors.content.children[parseInt((position-1)/grid.columns)].children[(position-1)%grid.columns]
        let indexFlag = grid.flagsPosition.indexOf(position);
        //vars
        let p = position;
        let c = grid.columns;
        let np = functionsGamePlay.lClick
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
}

export let functionsConfig = {
    levelselected: function(){
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
    },
    inputChange: function(){
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
    },
    fastCheck: function(){
        let minesInput = parseInt(document.getElementById("mines").children[0].value)
        let rowsInput = parseInt(document.getElementById("rows").children[0].value)
        let colsInput = parseInt(document.getElementById("cols").children[0].value)
        let theme = document.getElementById("theme").value;
    return newGame(colsInput, rowsInput, minesInput, theme);   
    },
    config: function(){
        grid.timerPause = true;
        let menuContainer = document.querySelector('.menu-container');
        menuContainer.classList.add('toggle');
        let levels = document.querySelectorAll('input[name="level"]');
        let rangeInput = document.querySelectorAll('input[type="range"]');
        let numberInput = document.querySelectorAll('input[type="number"]');
    
        rangeInput.forEach(x => 
            x.addEventListener('click', function () {functionsConfig.inputChange()}, true)
         );
         numberInput.forEach(x => 
            x.addEventListener('click', function () {functionsConfig.inputChange()}, true)
         );
    
         
         
         levels.forEach(x => 
            x.addEventListener('click', function () {functionsConfig.levelselected()}, true)
            );
            
            let cancelBtn = document.querySelector('.cancel-btn');
        let applyBtn = document.querySelector('.apply-btn');
        function closing()
            {menuContainer.classList.remove('toggle')
            grid.timerPause = false
        }
        applyBtn.addEventListener('click', function() {
            closing();
            functionsConfig.fastCheck()}, true);
        cancelBtn.addEventListener('click', function() {closing()});
        
        
        
        
        applyBtn.removeEventListener('click', function() {
            closing();
            functionsConfig.fastCheck()});
            cancelBtn.removeEventListener('click', function() {closing()});
        }

}

export let generalUse = {
    randomIntFromInterval: function(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)},
    randomFloatInterval: function (min, max, decimalPlaces) {
        return (Math.random() * (max - min) + min).toFixed(decimalPlaces) * 1},
    negativefn :function(){
        if(Math.random() < 0.5){
            return '-'
        } 
            return '';
    }
}

export let functionsTimer = {
    stopTimer: function(){
        clearInterval(grid.control);
        return;
    },
    cronometro: function(){
        if (grid.timer == 999 || grid.loses || grid.win){
            functionsTimer.stopTimer()
            grid.control = null;
            return;
        }
        if(!grid.timerPause){
        grid.timer ++
        selectors.timer.innerHTML = grid.timer.toString()
        } return;
    },
    stopTimeout: function(){
        for (var i=0; i<grid.myTimeout.length; i++) {
            clearTimeout(grid.myTimeout[i]);
              }
    }
}
