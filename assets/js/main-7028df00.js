(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function l(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(o){if(o.ep)return;o.ep=!0;const s=l(o);fetch(o.href,s)}})();let w={gridCreation:function(){for(let n=1;n<=e.cells;n++)e.numbersList.push(n);for(let n=1;n<=e.minesQuantity;n++){let i=Math.floor(Math.random()*e.numbersList.length),l=e.numbersList.splice(i,1);e.minesPositions.push(l[0])}e.minesPositions.sort((n,i)=>n-i);for(let n=0;n<=e.minesPositions.length;n++)e.numbersList.splice(e.minesPositions[n-1],0,"m");e.numbersList.splice(0,1,null),this.gridCompleteCreation()},gridCompleteCreation:function(){for(let n=1;n<=e.cells;n++)this.numbersPosition(n)},numbersPosition:function(n){let i=n;if(e.numbersList[n]=="m"){e.gridComplete.push(e.numbersList[n]);return}if(n>e.columns&&n<e.columns*(e.rows-1)&&n%e.columns!=0&&n%e.columns!=1)return this.calc(i,1,2,3,4,6,7,8,9);if(n==1)return this.calc(i,2,3,6);if(n==e.columns)return this.calc(i,1,2,4);if(n==e.columns*(e.rows-1)+1)return this.calc(i,6,8,9);if(n==e.columns*e.rows)return this.calc(i,4,7,8);if(n<e.columns)return this.calc(i,1,2,3,4,6);if(n>e.columns*e.rows-e.columns)return this.calc(i,4,6,7,8,9);if(n%e.columns==0)return this.calc(i,1,2,4,7,8);if(n%e.columns==1)return this.calc(i,2,3,6,8,9)},calc:function(n,...i){let l=0;i.includes(1)&&e.numbersList[n+e.columns-1]=="m"&&(l+=1),i.includes(2)&&e.numbersList[n+e.columns]=="m"&&(l+=1),i.includes(3)&&e.numbersList[n+e.columns+1]=="m"&&(l+=1),i.includes(4)&&e.numbersList[n-1]=="m"&&(l+=1),i.includes(6)&&e.numbersList[n+1]=="m"&&(l+=1),i.includes(7)&&e.numbersList[n-e.columns-1]=="m"&&(l+=1),i.includes(8)&&e.numbersList[n-e.columns]=="m"&&(l+=1),i.includes(9)&&e.numbersList[n-e.columns+1]=="m"&&(l+=1),e.gridComplete.push(l)},winfn:function(){t.btnNewGame.classList.replace("newGame","winbtn"),e.theme.name==e.themes[0].name?document.querySelector(".congrats-container").style.display="block":document.querySelector(".congrats").style.display="block",e.win=!0},losefn:function(n){e.flagsPosition.indexOf(n)==-1&&(e.loses=!0,e.themes[e.theme.id].functions.minesLose(n))}},L={lClick:function(n){if(e.checkeds.includes(n)&&e.inexplode)return;if(e.checkeds.includes(n)&&!e.inexplode){this.checkmines(n);return}if(e.loses==!0)return;if(e.gridComplete[n]=="m"){w.losefn(n);return}let i=t.content.children[parseInt((n-1)/e.columns)].children[parseInt((n-1)%e.columns)];if(e.gridComplete[n]==0&&(i.classList.replace("cell","number"),L.explode(n)),e.flagsPosition.indexOf(n)!=-1&&e.inexplode){let l=e.flagsPosition.indexOf(n);i.classList.replace("flag","cell"),i.innerHTML="",e.flagsPosition.splice(l,1),e.flagsQuantity+=1,t.mines.innerHTML=e.flagsQuantity.toString(),L.lClick(n);return}if(e.flagsPosition.indexOf(n)==-1&&(i.classList.replace("cell","number"),e.checkeds.includes(n)||(i.classList.add(`n${e.gridComplete[n]}`),e.theme.name==e.themes[0].name&&e.themes[0].functions.animations.animationCell(i)),!e.checkeds.includes(n)&&(e.checkeds.push(n),e.checkeds.length==e.cells-e.minesQuantity))){w.winfn();return}},flags:function(n){if(e.checkeds.includes(n)||e.loses==!0)return;let i=e.flagsPosition.indexOf(n),l=t.content.children[parseInt((n-1)/e.columns)].children[(n-1)%e.columns];i==-1?(l.classList.replace("cell","flag"),e.theme.name==e.themes[0].name?(l.innerHTML="",l.insertAdjacentHTML("beforeend",'<div class="f-animation" </div>')):console.log(),e.flagsPosition.push(n),e.flagsQuantity-=1):(l.classList.replace("flag","cell"),e.theme.name==e.themes[0].name?(l.innerHTML="",l.insertAdjacentHTML("beforeend",`<div class="f-animation" style="animation: cellAnim${r.randomIntFromInterval(1,15)} ${r.randomFloatInterval(1,1.8,2)}s ease-in forwards; 
                -webkit-animation: cellAnim${r.randomIntFromInterval(1,15)} ${r.randomFloatInterval(1,1.8,2)}s ease-in forwards"</div>`)):console.log(""),e.flagsPosition.splice(i,1),e.flagsQuantity+=1),t.mines.innerHTML=e.flagsQuantity.toString()},checkmines:function(n){let i=n,l=0,a=[];if(i>e.columns&&i<e.columns*(e.rows-1)&&i%e.columns!=0&&i%e.columns!=1?a=[1,2,3,4,6,7,8,9]:i==1?a=[2,3,6]:i==e.columns?a=[1,2,4]:i==e.columns*(e.rows-1)+1?a=[6,8,9]:i==e.columns*e.rows?a=[4,7,8]:i<e.columns?a=[1,2,3,4,6]:i>e.columns*e.rows-e.columns?a=[4,6,7,8,9]:i%e.columns==0?a=[1,2,4,7,8]:i%e.columns==1&&(a=[2,3,6,8,9]),a.includes(1)&&e.flagsPosition.includes(n+e.columns-1)&&(l+=1),a.includes(2)&&e.flagsPosition.includes(n+e.columns)&&(l+=1),a.includes(3)&&e.flagsPosition.includes(n+e.columns+1)&&(l+=1),a.includes(4)&&e.flagsPosition.includes(n-1)&&(l+=1),a.includes(6)&&e.flagsPosition.includes(n+1)&&(l+=1),a.includes(7)&&e.flagsPosition.includes(n-e.columns-1)&&(l+=1),a.includes(8)&&e.flagsPosition.includes(n-e.columns)&&(l+=1),a.includes(9)&&e.flagsPosition.includes(n-e.columns+1)&&(l+=1),l==e.gridComplete[n]){L.explode(n);return}},invert:function(){t.btnFg.classList[1]=="fg"?(t.btnFg.classList.replace("fg","mn"),e.invertClick=!0):(t.btnFg.classList.replace("mn","fg"),e.invertClick=!1)},check:function(n,i){if(n.composedPath()[0].classList[0]=="cell"||n.composedPath()[0].classList[0]=="number"||n.composedPath()[0].classList[0]=="flag"){const l=parseInt(n.composedPath()[0].classList[1].match(/\d+/))+(parseInt(n.composedPath()[1].classList[1].match(/\d+/))-1)*e.columns;if(e.checkeds.includes(l)){n.preventDefault(),this.lClick(l);return}if(i=="primary"&&e.invertClick==!1||i=="secondary"&&e.invertClick==!0){n.preventDefault(),this.lClick(l);return}if(i=="secondary"&&e.invertClick==!1||i=="primary"&&e.invertClick==!0){n.preventDefault(),this.flags(l);return}}if(n.composedPath()[0].parentElement.children[0].classList[0]=="wait-to-kill"){n.preventDefault();return}if(n.composedPath()[1].classList[0]=="flag"){n.preventDefault();const l=parseInt(n.composedPath()[1].classList[1].match(/\d+/))+(parseInt(n.composedPath()[2].classList[1].match(/\d+/))-1)*e.columns;this.flags(l)}else return},explode:async function(n){e.inexplode=!0;let i=t.content.children[parseInt((n-1)/e.columns)].children[(n-1)%e.columns],l=e.flagsPosition.indexOf(n),a=n,o=e.columns,s=L.lClick,c=a+o-1,m=a+o,y=a+o+1,u=a-1,p=a+1,g=a-o-1,d=a-o,b=a-o+1,f=n;if(e.checkeds.includes(n)||e.checkeds.push(n),l!=-1&&(i.classList.replace("flag","cell"),i.innerHTML="",e.flagsPosition.splice(l,1),e.flagsQuantity+=1,t.mines.innerHTML=e.flagsQuantity.toString()),f>e.columns&&f<e.columns*(e.rows-1)&&f%e.columns!=0&&f%e.columns!=1){await Promise.resolve(s(c),s(m),s(y),s(u),s(p),s(g),s(d),s(b)),e.inexplode=!1;return}else{if(f==1)return await Promise.resolve(s(m),s(y),s(p)),e.inexplode=!1;if(f==e.columns)return await Promise.resolve(s(c),s(m),s(u)),e.inexplode=!1;if(f==e.columns*(e.rows-1)+1)return await Promise.resolve(s(p),s(d),s(b)),e.inexplode=!1;if(f==e.columns*e.rows)return await Promise.resolve(s(u),s(g),s(d)),e.inexplode=!1;if(f<e.columns)return await Promise.resolve(s(c),s(m),s(y),s(u),s(p)),e.inexplode=!1;if(f>e.columns*e.rows-e.columns)return await Promise.resolve(s(u),s(p),s(g),s(d),s(b)),e.inexplode=!1;if(f%e.columns==0)return await Promise.resolve(s(c),s(m),s(u),s(g),s(d)),e.inexplode=!1;if(f%e.columns==1)return await Promise.resolve(s(m),s(y),s(p),s(d),s(b)),e.inexplode=!1}}},h={levelselected:function(){let n=document.getElementById("mines").children,i=document.getElementById("rows").children,l=document.getElementById("cols").children;document.getElementById("theme").value=e.theme.id;let a=document.querySelector('input[name="level"]:checked').value;a=="easy"&&(i[0].value=9,i[1].value=9,l[0].value=9,l[1].value=9,n[0].setAttribute("max",i[0].value*l[0].value),n[1].setAttribute("max",i[0].value*l[0].value),n[0].value=10,n[1].value=10),a=="normal"&&(i[0].value=16,i[1].value=16,l[0].value=16,l[1].value=16,n[0].setAttribute("max",i[0].value*l[0].value),n[1].setAttribute("max",i[0].value*l[0].value),n[0].value=40,n[1].value=40),a=="hard"?(i[0].value=19,i[1].value=19,l[0].value=30,l[1].value=30,n[0].setAttribute("max",i[0].value*l[0].value),n[1].setAttribute("max",i[0].value*l[0].value),n[0].value=99,n[1].value=99):(n[0].setAttribute("max",i[0].value*l[0].value),n[1].setAttribute("max",i[0].value*l[0].value))},inputChange:function(){let n=document.querySelectorAll('input[name="level"]'),i=document.getElementById("mines").children,l=document.getElementById("rows").children,a=document.getElementById("cols").children;e.theme.id==1?n[3]:document.querySelector('input[name="level"]:checked').value!="custom"&&n[3].click(),i[0].setAttribute("max",l[0].value*a[0].value-1),i[1].setAttribute("max",l[0].value*a[0].value-1);let o=i[0].max;(i[0].max<i[1].value||i[1].max<i[1].value)&&(document.getElementById("mines").innerHTML='<input class="mines-quantity" type="range" name="minesRange" min="1" max="'+o+'" value="'+o+'" oninput="this.form.minesInput.value=this.value" /><input class="mines-input" type="number" name="minesInput" min="1" max="'+o+'" value="'+o+'" oninput="this.form.minesRange.value=this.value" />')},fastCheck:function(){let n,i=parseInt(document.getElementById("mines").children[0].value),l=parseInt(document.getElementById("rows").children[0].value),a=parseInt(document.getElementById("cols").children[0].value);return e.theme.id==1?n=e.theme.id:n=document.getElementById("theme").value,v(a,l,i,n)},config:function(){e.timerPause=!0,document.getElementById("theme").value=e.theme.id;let n=document.querySelector(".menu-container");n.classList.add("toggle");let i=document.querySelectorAll('input[name="level"]'),l=document.querySelectorAll('input[type="range"]'),a=document.querySelectorAll('input[type="number"]');l.forEach(m=>m.addEventListener("click",function(){h.inputChange()},!0)),a.forEach(m=>m.addEventListener("click",function(){h.inputChange()},!0)),i.forEach(m=>m.addEventListener("click",function(){h.levelselected()},!0));let o=document.querySelector(".cancel-btn"),s=document.querySelector(".apply-btn");function c(){n.classList.remove("toggle"),e.timerPause=!1}s.addEventListener("click",function(){c(),h.fastCheck()},!0),o.addEventListener("click",function(){c()}),s.removeEventListener("click",function(){c(),h.fastCheck()}),o.removeEventListener("click",function(){c()})},clicked:function(n){t.menuUpClick==!1?(t.menuUpClick=!0,h.menuDrop(n)):(t.menuUpClick=!1,t.menuUpChild[n].classList.replace("active","non-active"))},menuDrop:function(n){if(t.menuUpClick==!0)for(let i=0;i<t.menuUpChild.length;i++)n==i?t.menuUpChild[i].classList.replace("non-active","active"):t.menuUpChild[i].classList.replace("active","non-active")}},r={randomIntFromInterval:function(n,i){return Math.floor(Math.random()*(i-n+1)+n)},randomFloatInterval:function(n,i,l){return(Math.random()*(i-n)+n).toFixed(l)*1},negativefn:function(){return Math.random()<.5?"-":""}},k={stopTimer:function(){clearInterval(e.control)},cronometro:function(){if(e.timer==999||e.loses||e.win){k.stopTimer(),e.control=null;return}e.timerPause||(e.timer++,t.timer.innerHTML=e.timer.toString())},stopTimeout:function(){for(var n=0;n<e.myTimeout.length;n++)clearTimeout(e.myTimeout[n])}},e={columns:16,rows:16,get cells(){return this.columns*this.rows},minesQuantity:40,flagsQuantity:40,minesPositions:[],numbersList:[],checkeds:[],gridComplete:[null],flagsPosition:[],loses:!1,win:!1,inexplode:!1,invertClick:!1,timer:0,myTimeout:[],control:void 0,timerPause:!1,themes:[{name:"google",specials:{colors:[["var(--exp_background1)","var(--exp_color1)"],["var(--exp_background2)","var(--exp_color2)"],["var(--exp_background3)","var(--exp_color3)"],["var(--exp_background4)","var(--exp_color4)"],["var(--exp_background5)","var(--exp_color5)"],["var(--exp_background6)","var(--exp_color6)"],["var(--exp_background7)","var(--exp_color7)"],["var(--exp_background8)","var(--exp_color8)"]],bgCols:[["#277BCD","#2F569A"],["#388E3C","#00582C"],["#D32F2F","#8E2123"],["#B648F2","#762F9D"],["#FF8F00","#9F5608"],["#48E6F1","#2F569A"],["#F4C20D","#9F7E08"],["#ED44B5","#9A2C76"]]},functions:{animations:{animationCell:function(n){let i=document.createElement("div");i.className="cell-active",n.appendChild(i);let l=r.randomIntFromInterval(1,15);i.style.webkitAnimation=`cellAnim${l} ${r.randomFloatInterval(1,1.8,2)}s ease-in forwards`,i.style.animation=`cellAnim${l} ${r.randomFloatInterval(.8,1.2,2)}s ease-in forwards`},bookmarkHeadAnimation:function(){for(let n=1;n<=20;n++){let i=r.negativefn(),l=r.negativefn(),a=r.randomIntFromInterval(0,300),o=r.randomIntFromInterval(30,250),s=r.randomIntFromInterval(0,60),c=i==""?r.randomIntFromInterval(15,300):r.randomIntFromInterval(15,300)*-1,m=c*-1,y=r.randomIntFromInterval(0,80),u=l==""?r.randomIntFromInterval(20,62):r.randomIntFromInterval(20,62)*-1,p=r.randomIntFromInterval(1,150),g=r.randomIntFromInterval(30,220),d=`        0% {
                            visibility:visible;
                            -webkit-transform-origin: ${a.toFixed(2)}% -${o*2.5}%;
                            transform-origin: ${a}% -${o*2.5}%;
                            left: ${s}%;
                            top: ${o}%;
                            opacity: 1;
                            -webkit-transform: scale(0.3);
                            transform: scale(0.3);
                            transition: linear;
                        }
                        10%{
                            top:-${p}%;
                            left: ${c}%;
                            -webkit-transform: scale(0.7)rotate(${u}deg)
                            transform: scale(0.7)rotate(${u}deg)
                        }
                        50%{
                            -webkit-transform: rotate(${(u*r.randomFloatInterval(.7,1,1)).toFixed(2)*-1}deg);
                            transform: rotate(${(u*r.randomFloatInterval(.7,1,1)).toFixed(2)*-1}deg);
                            left:${m}%;
                            top: ${(p-g*r.randomFloatInterval(.35,.65,2)).toFixed(2)}%;
                        }
                        83%{        
                            -webkit-transform: scale(0.4) rotate(${(u*r.randomFloatInterval(.4,.7,1)).toFixed(2)}deg);
                            transform: scale(0.4) rotate(${(u*r.randomFloatInterval(.4,.7,1)).toFixed(2)}deg);
                            left: ${(m*r.randomFloatInterval(.3,.7,1)).toFixed(2)}%;
                            opacity: 1;
                
                        }    
                        100%{
                            top:${g}%;
                            left: ${y}%;
                            -webkit-transform: scale(0.1) rotate(${(u*r.randomFloatInterval(.1,.4,1)).toFixed(2)*-1}deg);
                            transform: scale(0.1) rotate(${(u*r.randomFloatInterval(.1,.4,1)).toFixed(2)*-1}deg);
                            opacity: 0;
                
                        }`,b=`@-webkit-keyframes bookmark-anim${n} {${d}}
                        @keyframes bookmark-anim${n} {${d}}`;t.headStyle.insertAdjacentHTML("beforeend",b)}},cellAnimation:function(){for(let n=1;n<=15;n++){let i=r.negativefn(),l=r.negativefn(),a=`${r.randomIntFromInterval(100,400)}`,o=Math.ceil(a/2),s=Math.ceil(a*.1),c=r.randomIntFromInterval(0,400),m=c*-1+r.randomIntFromInterval(0,200),y=Math.ceil(c*(r.randomIntFromInterval(92,98)*.01)),u=Math.ceil(c*(r.randomIntFromInterval(92,98)*.01)),p=r.randomIntFromInterval(90,400),g=r.randomIntFromInterval(1,3),d=`        0% {
                        transform: rotate(0);
                        scale: 1;
                        left: 0%;
                        top: 0%;
                        visibility:visible;
                        opacity: 1;
                        }
                
                    35%{
                        top: -${y}%;
                        left: ${i}${o-s}%;
                    }
                
                    50%{
                        scale: 1.${r.randomIntFromInterval(1,3)};
                        top: -${c}%;
                        left: ${i}${o}%;
                    }
                    65%{
                        top: -${u}%;
                        left: ${i}${o+s}%;
                    }
                    90%{
                        opacity: 0.${r.randomIntFromInterval(7,9)};
                    }
                
                    100% {
                        transform: rotate(${l}${p}deg);
                        scale: 0.${g};
                        left: ${i}${a}%;
                        top:${m}%;
                        opacity: 0;
                        filter: blur(${r.randomIntFromInterval(1,3)})
                      visibility: hidden;
                    }
                `,b=`@-webkit-keyframes cellAnim${n} {${d}}
                      @keyframes cellAnim${n} {${d}}
                    `;t.headStyle.insertAdjacentHTML("beforeend",b)}},animationExp:function(n){let i=e.themes[e.theme.id].specials.colors,l=e.themes[e.theme.id].specials.bgCols,a=t.content,o=r.randomIntFromInterval(0,7),s=r.randomIntFromInterval(0,1);if(!e.flagsPosition.includes(n)){let c=a.children[parseInt((n-1)/e.columns)].children[(n-1)%e.columns];c.classList.replace("cell","number"),c.classList.add("nm"),c.insertAdjacentHTML("afterbegin",`<div class="nm-block" style="background-color:${l[o][0]}"></div>
                        <div class="nm-mine" style="background-color:${l[o][1]}"></div>
                        `);for(let m=1;m<=8;m++)s=r.randomIntFromInterval(0,1),c.insertAdjacentHTML("beforeend",`<div class="nm-confetti" style=" background-color: ${i[o][s]};
                        animation: bookmark-anim${r.randomIntFromInterval(1,20)} ${r.randomFloatInterval(4.5,6.5,1)}s forwards ease-in-out;
                        scale : ${r.randomFloatInterval(.5,1.5,1)}"></div>
                        `)}}},congratsLose:function(){t.congrats=document.createElement("div"),t.lose=document.createElement("div"),t.lose.addEventListener("click",function(){t.lose.classList[1]!="focussed"|t.lose.classList[0]!="focussed"&&t.lose.classList.add("focussed")}),t.congrats.className="congrats-container focussed",t.lose.className="lose-container",t.lose.insertAdjacentHTML("beforeend",`
                <div class="lose">
                <div class="lose-content"></div>
                <div class="lose-bg"></div>
                <div class="lose-retry-button">
                <div class="lose-retry-icon"></div><p>Reintentar</p>
                </div>
                </div>
                `),t.congrats.insertAdjacentHTML("beforeend",`
                <div class="congrats">
                <div class="congrats-content"></div>
                <div class="congrats-bg"></div>
                <div class="congrats-retry-button">
                <div class="congrats-retry-icon"></div><p>Volver a jugar</p>
                </div>
                </div>
                `),t.container.appendChild(t.lose),t.container.appendChild(t.congrats)},minesLose:function(n){let i=t.content,l=i.children[parseInt((n-1)/e.columns)].children[(n-1)%e.columns];t.btnNewGame.classList.replace("newGame","losebtn"),document.querySelector(".lose-container").style.display="block",e.themes[e.theme.id].functions.animations.animationExp(n);let a=e.minesPositions.indexOf(n);e.minesPositions.splice(a,1);for(let o of e.flagsPosition)e.minesPositions.includes(o)||(l=i.children[parseInt((o-1)/e.columns)].children[(o-1)%e.columns],l.classList.replace("flag","flagerror"),l.innerHTML="");for(let o of e.minesPositions)e.myTimeout.push(setTimeout(e.themes[e.theme.id].functions.animations.animationExp,r.randomIntFromInterval(500,e.minesQuantity*500),o))},templategen:function(){return e.themes[3].common.templategen()}}},{name:"windows",functions:{animations:{animationCell:function(){return e.themes[3].common.animations.animationCell},bookmarkHeadAnimation:function(){return e.themes[3].common.animations.bookmarkHeadAnimation()},cellAnimation:function(){return e.themes[3].common.animations.cellAnimation}},menu:function(){t.menu=document.createElement("div"),t.menu.className="menu-container",t.container.appendChild(t.menu),t.menu.insertAdjacentHTML("beforeend",`
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
                `)},congratsLose:function(){return e.themes[3].common.congratsLose()},minesLose:function(){return e.themes[3].common.minesLose()},templategen:function(){t.headStyle=document.createElement("style"),t.headHTML[0].appendChild(t.headStyle),e.themes[e.theme.id].functions.animations.bookmarkHeadAnimation(),e.themes[e.theme.id].functions.animations.cellAnimation(),t.fullScreen=document.createElement("div"),t.header=document.createElement("header"),t.fullScreen.className=`full-screen ${e.theme.name}`,document.body.appendChild(t.fullScreen),t.section=document.createElement("section"),t.container=document.createElement("div"),t.container.className="container",t.fullScreen.appendChild(t.container),t.menuUp=document.createElement("div"),t.menuUp.className="menu-up",t.container.appendChild(t.menuUp),t.menuUp.insertAdjacentHTML("beforeend",`
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
                `),t.menuUpClick=!1,t.menuUpChild=t.menuUp.children,t.change=document.querySelector("#change");for(let o=0;o<t.menuUpChild.length;o++)t.menuUpChild[o].addEventListener("click",function(){h.clicked(o)},!0),t.menuUpChild[o].addEventListener("mouseenter",function(){h.menuDrop(o)},!0);document.querySelector("#new").addEventListener("click",function(){v()},!0),document.querySelector("#beginner").addEventListener("click",function(){v(9,9,10,1),document.querySelector(".selected").remove(),document.querySelector("#beginner").innerHTML='<span class="selected"></span>Beginner'},!0),document.querySelector("#intermediate").addEventListener("click",function(){v(16,16,40,1),document.querySelector(".selected").remove(),document.querySelector("#intermediate").innerHTML='<span class="selected"></span>Intermediate'},!0),document.querySelector("#expert").addEventListener("click",function(){v(30,19,99,1),document.querySelector(".selected").remove(),document.querySelector("#expert").innerHTML='<span class="selected"></span>Expert'},!0),document.querySelector("#custom").addEventListener("click",function(){h.config()},!0),document.querySelector("#windows").addEventListener("click",function(){v()},!0),document.querySelector("#google").addEventListener("click",function(){v(e.columns,e.rows,e.minesQuantity,0)},!0),document.querySelector("#pacman").addEventListener("click",function(){v(e.columns,e.rows,e.minesQuantity,2)},!0),t.header.className="header",t.container.appendChild(t.header);let n=document.createElement("div");n.className="info",t.header.appendChild(n),t.timer=document.createElement("div"),t.timer.className="timer",t.timer.innerText="0",n.appendChild(t.timer),t.btnNewGame=document.createElement("div"),t.btnNewGame.className="btn newGame",n.appendChild(t.btnNewGame);let i=document.createElement("div");i.className="config-btn",n.appendChild(i),t.btnFg=document.createElement("div"),t.btnFg.className="btn fg",n.appendChild(t.btnFg),t.mines=document.createElement("div"),t.mines.className="mines",n.appendChild(t.mines),t.section.className="section",t.container.appendChild(t.section),t.content=document.createElement("div"),t.content.className="contenedor",t.section.appendChild(t.content);let l,a;for(let o=1;o<=e.rows;o++){l=document.createElement("div"),l.className=`row r${o}`,t.content.appendChild(l);for(let s=1;s<=e.columns;s++)a=document.createElement("div"),a.className=`cell c${s}`,l.appendChild(a)}e.themes[e.theme.id].functions.congratsLose(),e.themes[e.theme.id].functions.menu()}}},{name:"pacman",functions:{animations:{animationCell:function(){return e.themes[3].common.animations.animationCell},bookmarkHeadAnimation:function(){return e.themes[3].common.animations.bookmarkHeadAnimation()},cellAnimation:function(){return e.themes[3].common.animations.cellAnimation}},congratsLose:function(){return e.themes[3].common.congratsLose()},minesLose:function(){return e.themes[3].common.minesLose()},templategen:function(){return e.themes[3].common.templategen()}}},{name:"common",common:{animations:{animationCell:function(n){},bookmarkHeadAnimation:function(){},cellAnimation:function(){}},menu:function(){t.menu=document.createElement("div"),t.menu.className="menu-container",t.container.appendChild(t.menu),t.menu.insertAdjacentHTML("beforeend",`
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
                <option value='2'>Pacman style</option>
                </select>
                </div>
                <div class="buttons">
                    <button class="apply-btn">Apply</button>
                    <button class="cancel-btn">Cancel</button>
                </div>
                </div>
                `)},congratsLose:function(){t.congrats=document.createElement("div"),t.lose=document.createElement("div"),t.lose.className="lose",t.lose.innerText="Lamentablemente has perdido",t.container.appendChild(t.lose),t.congrats.className="congrats",t.congrats.innerText="Felicitaciones has ganado!",t.container.appendChild(t.congrats)},minesLose:function(n){let i=t.content,l;t.btnNewGame.classList.replace("newGame","losebtn"),document.querySelector(".lose").style.display="block";for(let a of e.flagsPosition)e.minesPositions.includes(a)||(l=i.children[parseInt((a-1)/e.columns)].children[(a-1)%e.columns],l.classList.replace("flag","flagerror"),l.innerHTML="");for(let a of e.minesPositions)if(!e.flagsPosition.includes(a)){let o=i.children[parseInt((a-1)/e.columns)].children[(a-1)%e.columns];o.classList.replace("cell","number"),o.classList.add("nm")}},templategen:function(){t.headStyle=document.createElement("style"),t.headHTML[0].appendChild(t.headStyle),e.themes[e.theme.id].functions.animations.bookmarkHeadAnimation(),e.themes[e.theme.id].functions.animations.cellAnimation(),t.fullScreen=document.createElement("div"),t.header=document.createElement("header"),t.fullScreen.className=`full-screen ${e.theme.name}`,document.body.appendChild(t.fullScreen),t.section=document.createElement("section"),t.container=document.createElement("div"),t.container.className="container",t.fullScreen.appendChild(t.container),t.header.className="header",t.container.appendChild(t.header);let n=document.createElement("div");n.className="info",t.header.appendChild(n),t.timer=document.createElement("div"),t.timer.className="timer",t.timer.innerText="0",n.appendChild(t.timer),t.btnNewGame=document.createElement("div"),t.btnNewGame.className="btn newGame",n.appendChild(t.btnNewGame);let i=document.createElement("div");i.className="config-btn",n.appendChild(i),t.btnFg=document.createElement("div"),t.btnFg.className="btn fg",n.appendChild(t.btnFg),t.mines=document.createElement("div"),t.mines.className="mines",n.appendChild(t.mines),t.section.className="section",t.container.appendChild(t.section),t.content=document.createElement("div"),t.content.className="contenedor",t.section.appendChild(t.content);let l,a;for(let o=1;o<=e.rows;o++){l=document.createElement("div"),l.className=`row r${o}`,t.content.appendChild(l);for(let s=1;s<=e.columns;s++)a=document.createElement("div"),a.className=`cell c${s}`,l.appendChild(a)}e.themes[e.theme.id].functions.congratsLose(),e.themes[3].common.menu()}}}],theme:{name:"google",id:0}},t={headHTML:document.getElementsByTagName("head"),headStyle:void 0,content:void 0,header:void 0,mines:void 0,fullScreen:void 0,section:void 0,container:void 0,btnNewGame:void 0,btnFg:void 0,congrats:void 0,lose:void 0,menu:void 0,newGameButtons:void 0,configbtn:void 0,fg:void 0,listeners:{listenerNewGame:function(){t.newGameButtons.forEach(n=>n.addEventListener("click",function(){v()},!0))},listenerConfigBtn:function(){t.configbtn.addEventListener("click",function(){h.config()},!0)},listenerContent:function(){t.content.addEventListener("click",function(n){L.check(n,"primary")},!0),t.content.addEventListener("contextmenu",function(n){L.check(n,"secondary")},!0)},listenerFg:function(){t.fg.addEventListener("click",function(){L.invert()},!0)}}};function v(n=e.columns,i=e.rows,l=e.minesQuantity,a=e.theme.id){document.body.innerHTML="",e.columns=n,e.rows=i,e.minesQuantity=l,e.flagsQuantity=e.minesQuantity,e.minesPositions=[],e.numbersList=[],e.checkeds=[],e.gridComplete=[null],e.flagsPosition=[],e.theme.id=parseInt(a),e.theme.name=e.themes[e.theme.id].name,w.gridCreation(),k.stopTimer(),k.stopTimeout(),e.timer=0,e.themes[e.theme.id].functions.templategen(),t.mines.innerHTML=e.flagsQuantity.toString(),t.timer.innerHTML=e.timer.toString(),e.myTimeout=[],e.control=setInterval(k.cronometro,1e3),e.win=!1,e.loses=!1,e.inexplode=!1,e.invertClick=!1,t.newGameButtons=document.querySelectorAll(".newGame, .lose-retry-button, .congrats-retry-button"),t.listeners.listenerNewGame(),t.configbtn=document.querySelector(".config-btn"),t.listeners.listenerConfigBtn(),t.listeners.listenerContent(),t.fg=document.querySelector(".fg"),t.listeners.listenerFg()}v();
