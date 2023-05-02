(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function l(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=l(r);fetch(r.href,n)}})();let a=16,g=16,ee=g*a,D=40,x=D,W,C=[],v=[],k=[],_=[null],m=[],H="googleStyle";be();let U=[],ue=[["var(--exp_background1)","var(--exp_color1)"],["var(--exp_background2)","var(--exp_color2)"],["var(--exp_background3)","var(--exp_color3)"],["var(--exp_background4)","var(--exp_color4)"],["var(--exp_background5)","var(--exp_color5)"],["var(--exp_background6)","var(--exp_color6)"],["var(--exp_background7)","var(--exp_color7)"],["var(--exp_background8)","var(--exp_color8)"]],X=[["#277BCD","#2F569A"],["#388E3C","#00582C"],["#D32F2F","#8E2123"],["#B648F2","#762F9D"],["#FF8F00","#9F5608"],["#48E6F1","#2F569A"],["#F4C20D","#9F7E08"],["#ED44B5","#9A2C76"]],le=!1,O=0,re=setInterval(ge,1e3);document.querySelector(".timer").innerHTML=O.toString();document.querySelector(".mines").innerHTML=x.toString();let me=document.querySelector(".newGame"),K=!1,ie=!1,d=!1,R=!1,P=document.querySelector(".contenedor"),ne=document.querySelectorAll(".newGame, .lose-retry-button, .congrats-retry-button");ne.forEach(e=>e.addEventListener("click",function(){oe()},!0));let ae=document.querySelector(".config-btn");ae.addEventListener("click",function(){he()},!0);P.addEventListener("click",function(e){Y(e,"primary")},!0);P.addEventListener("contextmenu",function(e){Y(e,"secondary")},!0);let G=document.querySelector(".fg");G.addEventListener("click",function(){pe()},!0);function fe(){for(let e=1;e<=ee;e++)v.push(e);for(let e=1;e<=D;e++){let t=Math.floor(Math.random()*v.length),l=v.splice(t,1);C.push(l[0])}C.sort((e,t)=>e-t);for(let e=0;e<=C.length;e++)v.splice(C[e-1],0,"m");v.splice(0,1,null),Le()}function Le(){for(let e=1;e<=ee;e++)ke(e)}function ke(e){let t=e;if(v[e]=="m"){_.push(v[e]);return}if(e>a&&e<a*(g-1)&&e%a!=0&&e%a!=1)return A(t,1,2,3,4,6,7,8,9);if(e==1)return A(t,2,3,6);if(e==a)return A(t,1,2,4);if(e==a*(g-1)+1)return A(t,6,8,9);if(e==a*g)return A(t,4,7,8);if(e<a)return A(t,1,2,3,4,6);if(e>a*g-a)return A(t,4,6,7,8,9);if(e%a==0)return A(t,1,2,4,7,8);if(e%a==1)return A(t,2,3,6,8,9)}function Y(e,t){if(e.composedPath()[0].classList[0]=="cell"||e.composedPath()[0].classList[0]=="number"||e.composedPath()[0].classList[0]=="flag"){const l=parseInt(e.composedPath()[0].classList[1].match(/\d+/))+(parseInt(e.composedPath()[1].classList[1].match(/\d+/))-1)*a;if(k.includes(l)||t=="primary"&&R==!1||t=="secondary"&&R==!0)return e.preventDefault(),Z(l);if(t=="secondary"&&R==!1||t=="primary"&&R==!0){e.preventDefault(),se(l);return}}if(e.composedPath()[0].parentElement.children[0].classList[0]=="wait-to-kill"){e.preventDefault();return}if(e.composedPath()[1].classList[0]=="flag"){e.preventDefault();const l=parseInt(e.composedPath()[1].classList[1].match(/\d+/))+(parseInt(e.composedPath()[2].classList[1].match(/\d+/))-1)*a;se(l)}else return}function pe(){G.classList[1]=="fg"?(G.classList.replace("fg","mn"),R=!0):(G.classList.replace("mn","fg"),R=!1)}function ve(){clearInterval(re)}function ge(){if(O==999||K||ie){ve(),re=null;return}le||(O++,document.querySelector(".timer").innerHTML=O.toString())}function Z(e){if(k.includes(e)&&d)return;if(k.includes(e)&&!d){Ee(e);return}if(K==!0)return;if(_[e]=="m"){we(e);return}let t=P.children[parseInt((e-1)/a)].children[parseInt((e-1)%a)];if(console.log("aqui no rompe1"),_[e]==0&&(console.log("aqui no rompe2"),t.classList.replace("cell","number"),console.log("aqui no rompe3"),ye(e),console.log("aqui no rompe4")),m.indexOf(e)!=-1&&d){let l=m.indexOf(e);return t.classList.replace("flag","cell"),t.innerHTML="",m.splice(l,1),x+=1,document.querySelector(".mines").innerHTML=x.toString(),Z(e)}if(m.indexOf(e)==-1&&(t.classList.replace("cell","number"),k.includes(e)||(t.classList.add(`n${_[e]}`),H=="googleStyle"&&Ie(t)),!k.includes(e)&&(k.push(e),k.length==ee-D))){xe();return}}function se(e){if(k.includes(e)||K==!0)return;let t=m.indexOf(e),l=P.children[parseInt((e-1)/a)].children[(e-1)%a];t==-1?(l.classList.replace("cell","flag"),H=="googleStyle"?(l.innerHTML="",l.insertAdjacentHTML("beforeend",'<div class="f-animation" </div>')):console.log("nothing to do here"),m.push(e),x-=1):(l.classList.replace("flag","cell"),H=="googleStyle"?(l.innerHTML="",l.insertAdjacentHTML("beforeend",`<div class="f-animation" style="animation: cellAnim${o(1,15)} ${u(1,1.8,2)}s ease-in forwards; 
            -webkit-animation: cellAnim${o(1,15)} ${u(1,1.8,2)}s ease-in forwards"</div>`)):console.log(""),m.splice(t,1),x+=1),document.querySelector(".mines").innerHTML=x.toString()}function xe(){me.classList.replace("newGame","winbtn"),H=="googleStyle"?document.querySelector(".congrats-container").style.display="block":document.querySelector(".congrats").style.display="block",ie=!0}function we(e){m.indexOf(e)==-1&&(K=!0,me.classList.replace("newGame","losebtn"),qe(e),H=="googleStyle"?document.querySelector(".lose-container").style.display="block":document.querySelector(".lose").style.display="block")}function A(e,...t){let l=0;t.includes(1)&&v[e+a-1]=="m"&&(l+=1),t.includes(2)&&v[e+a]=="m"&&(l+=1),t.includes(3)&&v[e+a+1]=="m"&&(l+=1),t.includes(4)&&v[e-1]=="m"&&(l+=1),t.includes(6)&&v[e+1]=="m"&&(l+=1),t.includes(7)&&v[e-a-1]=="m"&&(l+=1),t.includes(8)&&v[e-a]=="m"&&(l+=1),t.includes(9)&&v[e-a+1]=="m"&&(l+=1),_.push(l)}function Ee(e){let t=e,l=0,i=[];if(t>a&&t<a*(g-1)&&t%a!=0&&t%a!=1?i=[1,2,3,4,6,7,8,9]:t==1?i=[2,3,6]:t==a?i=[1,2,4]:t==a*(g-1)+1?i=[6,8,9]:t==a*g?i=[4,7,8]:t<a?i=[1,2,3,4,6]:t>a*g-a?i=[4,6,7,8,9]:t%a==0?i=[1,2,4,7,8]:t%a==1&&(i=[2,3,6,8,9]),i.includes(1)&&m.includes(e+a-1)&&(l+=1),i.includes(2)&&m.includes(e+a)&&(l+=1),i.includes(3)&&m.includes(e+a+1)&&(l+=1),i.includes(4)&&m.includes(e-1)&&(l+=1),i.includes(6)&&m.includes(e+1)&&(l+=1),i.includes(7)&&m.includes(e-a-1)&&(l+=1),i.includes(8)&&m.includes(e-a)&&(l+=1),i.includes(9)&&m.includes(e-a+1)&&(l+=1),l==_[e])return ye(e)}async function ye(e){d=!0;let t=P.children[parseInt((e-1)/a)].children[(e-1)%a],l=m.indexOf(e),i=e,r=a,n=Z,c=i+r-1,y=i+r,N=i+r+1,w=i-1,E=i+1,M=i-r-1,L=i-r,T=i-r+1,f=e;if(k.includes(e)||k.push(e),l!=-1&&(t.classList.replace("flag","cell"),t.innerHTML="",m.splice(l,1),x+=1,document.querySelector(".mines").innerHTML=x.toString(),console.log(d)),f>a&&f<a*(g-1)&&f%a!=0&&f%a!=1){let s=Promise.resolve(n(c),n(y),n(N),n(w),n(E),n(M),n(L),n(T));console.log(d),await s,d=!1;return}else{if(f==1){let s=Promise.resolve(n(y),n(N),n(E));return console.log(d),await s,d=!1}if(f==a){let s=Promise.resolve(n(c),n(y),n(w));return console.log(d),await s,d=!1}if(f==a*(g-1)+1){let s=Promise.resolve(n(E),n(L),n(T));return console.log(d),await s,d=!1}if(f==a*g){let s=Promise.resolve(n(w),n(M),n(L));return console.log(d),await s,d=!1}if(f<a){let s=Promise.resolve(n(c),n(y),n(N),n(w),n(E));return console.log(d),await s,d=!1}if(f>a*g-a){let s=Promise.resolve(n(w),n(E),n(M),n(L),n(T));return console.log(d),await s,d=!1}if(f%a==0){let s=Promise.resolve(n(c),n(y),n(w),n(M),n(L));return console.log(d),await s,d=!1}if(f%a==1){let s=Promise.resolve(n(y),n(N),n(E),n(L),n(T));return console.log(d),await s,d=!1}}}function oe(e=16,t=16,l=40){document.body.innerHTML="";for(var i=0;i<U.length;i++)clearTimeout(U[i]);a=e,g=t,D=l,ee=g*a,x=D,C=[],v=[],k=[],_=[null],m=[],H="googleStyle",document.getElementsByTagName("head")[0].getElementsByTagName("style")[1].remove(),fe(),ve(),O=0,be(),document.querySelector(".mines").innerHTML=x.toString(),document.querySelector(".timer").innerHTML=O.toString(),U=[],re=setInterval(ge,1e3),ie=!1,K=!1,d=!1,R=!1,P=document.querySelector(".contenedor"),ne=document.querySelectorAll(".newGame, .lose-retry-button, .congrats-retry-button"),ne.forEach(r=>r.addEventListener("click",function(){oe()},!0)),ae=document.querySelector(".config-btn"),ae.addEventListener("click",function(){he()},!0),P.addEventListener("click",function(r){Y(r,"primary")},!0),P.addEventListener("contextmenu",function(r){Y(r,"secondary")},!0),G=document.querySelector(".fg"),G.addEventListener("click",function(){pe()},!0),H=="googleStyle"?(document.querySelector(".lose-container").style.display="none",document.querySelector(".lose-container").classList.remove("focussed"),document.querySelector(".congrats-container").style.display="none"):(document.querySelector(".congrats").style.display="none",document.querySelector(".lose").style.display="none")}function he(){le=!0;let e=document.querySelector(".menu-container");e.classList.add("toggle");let t=document.querySelectorAll('input[name="level"]'),l=document.querySelectorAll('input[type="range"]'),i=document.querySelectorAll('input[type="number"]');l.forEach(y=>y.addEventListener("click",function(){de()},!0)),i.forEach(y=>y.addEventListener("click",function(){de()},!0)),t.forEach(y=>y.addEventListener("click",function(){Se()},!0));let r=document.querySelector(".cancel-btn"),n=document.querySelector(".apply-btn");function c(){e.classList.remove("toggle"),le=!1}n.addEventListener("click",function(){c(),ce()},!0),r.addEventListener("click",function(){c()}),n.removeEventListener("click",function(){c(),ce()}),r.removeEventListener("click",function(){c()})}function ce(){let e=parseInt(document.getElementById("mines").children[0].value),t=parseInt(document.getElementById("rows").children[0].value),l=parseInt(document.getElementById("cols").children[0].value);return oe(l,t,e)}function de(){let e=document.querySelectorAll('input[name="level"]'),t=document.getElementById("mines").children,l=document.getElementById("rows").children,i=document.getElementById("cols").children;document.querySelector('input[name="level"]:checked').value!="custom"&&e[3].click(),t[0].setAttribute("max",l[0].value*i[0].value-1),t[1].setAttribute("max",l[0].value*i[0].value-1);let r=t[0].max;(t[0].max<t[1].value||t[1].max<t[1].value)&&(document.getElementById("mines").innerHTML='<input class="mines-quantity" type="range" name="minesRange" min="1" max="'+r+'" value="'+r+'" oninput="this.form.minesInput.value=this.value" /><input class="mines-input" type="number" name="minesInput" min="1" max="'+r+'" value="'+r+'" oninput="this.form.minesRange.value=this.value" />')}function Se(){let e=document.getElementById("mines").children,t=document.getElementById("rows").children,l=document.getElementById("cols").children,i=document.querySelector('input[name="level"]:checked').value;i=="easy"&&(t[0].value=9,t[1].value=9,l[0].value=9,l[1].value=9,e[0].setAttribute("max",t[0].value*l[0].value),e[1].setAttribute("max",t[0].value*l[0].value),e[0].value=10,e[1].value=10),i=="normal"&&(t[0].value=16,t[1].value=16,l[0].value=16,l[1].value=16,e[0].setAttribute("max",t[0].value*l[0].value),e[1].setAttribute("max",t[0].value*l[0].value),e[0].value=40,e[1].value=40),i=="hard"?(t[0].value=19,t[1].value=19,l[0].value=30,l[1].value=30,e[0].setAttribute("max",t[0].value*l[0].value),e[1].setAttribute("max",t[0].value*l[0].value),e[0].value=99,e[1].value=99):(e[0].setAttribute("max",t[0].value*l[0].value),e[1].setAttribute("max",t[0].value*l[0].value))}function be(){let e=document.getElementsByTagName("head");W=document.createElement("style"),e[0].appendChild(W);for(let b=1;b<=15;b++){let h=J(),V=J(),S=`${o(100,400)}`,$=Math.ceil(S/2),F=Math.ceil(S*.1),I=o(0,400),B=I*-1+o(0,200),z=Math.ceil(I*(o(92,98)*.01)),p=Math.ceil(I*(o(92,98)*.01)),q=o(90,400),j=Math.ceil(q/2),Q=o(1,3),$e=`
    @-webkit-keyframes cellAnim${b} {
        0% {
            webkit-transform: rotate(0) scale(1);
            transform: rotate(0) scale(1);
            left: 0%;
            top: 0%;
            visibility:visible;
            opacity: 1;
            }
        35%{
            top: -${z}%;
            left: ${h}${$-F}%;
        }
        50%{
            transform: rotate(${j}) scale(1.${o(2,8)});
            top: -${I}%;
                left: ${h}${$}%;
        }
    
        65%{
            top: -${p}%;
            left: ${h}${$+F}%;
        }
        90%{
            opacity: 0.${o(7,9)};
        }
        100% {
            webkit-transform: rotate(${q}deg) scale(0.${Q});
            opacity: 0;
            transform: rotate(${V}${q}deg) scale(0.${Q});
            left: ${h}${S+F}%;
            top:${B}%;
            filter: blur(${o(1,3)})
          visibility: hidden;
        }
      }
      @keyframes cellAnim${b} {
        0% {
            transform: rotate(0);
            scale: 1;
            left: 0%;
            top: 0%;
            visibility:visible;
            opacity: 1;
            }
    
        35%{
            top: -${z}%;
            left: ${h}${$-F}%;
        }

        50%{
            scale: 1.${o(1,3)};
            top: -${I}%;
            left: ${h}${$}%;
        }
        65%{
            top: -${p}%;
            left: ${h}${$+F}%;
        }
        90%{
            opacity: 0.${o(7,9)};
        }

        100% {
            transform: rotate(${V}${q}deg);
            scale: 0.${Q};
            left: ${h}${S}%;
            top:${B}%;
            opacity: 0;
            filter: blur(${o(1,3)})
          visibility: hidden;
        }
      }
    `;W.insertAdjacentHTML("beforeend",$e)}for(let b=1;b<=20;b++){let h=J(),V=J(),S=o(0,300),$=o(30,250),F=o(0,60),I=h==""?o(15,300):o(15,300)*-1,B=I*-1,z=o(0,80),p=V==""?o(20,62):o(20,62)*-1,q=o(1,150),j=o(30,220),Q=`
    @-webkit-keyframes bookmark-anim${b} {
        0% {
            visibility:visible;
            -webkit-transform-origin: ${S.toFixed(2)}% -${$*2.5}%;
            transform-origin: ${S}% -${$*2.5}%;
            left: ${F}%;
            top: ${$}%;
            opacity: 1;
            -webkit-transform: scale(0.3);
            transform: scale(0.3);
            transition: linear;
        }
        10%{
            top:-${q}%;
            left: ${I}%;
            -webkit-transform: scale(0.7)rotate(${p}deg)
            transform: scale(0.7)rotate(${p}deg)
        }
        50%{
            -webkit-transform: rotate(${(p*u(.7,1,1)).toFixed(2)*-1}deg);
            transform: rotate(${(p*u(.7,1,1)).toFixed(2)*-1}deg);
            left:${B}%;
            top: ${(q-j*u(.35,.65,2)).toFixed(2)}%;
        }
        83%{        
            -webkit-transform: scale(0.4) rotate(${(p*u(.4,.7,1)).toFixed(2)}deg);
            transform: scale(0.4) rotate(${(p*u(.4,.7,1)).toFixed(2)}deg);
            opacity: 1;
            left: ${(B*u(.3,.7,1)).toFixed(2)}%;
        }    
        99%{
            top:${j}%;
            left: ${z}%;
            -webkit-transform: scale(0.1) rotate(${(p*u(.1,.4,1)).toFixed(2)*-1}deg);
            transform: scale(0.1) rotate(${(p*u(.1,.4,1)).toFixed(2)*-1}deg);
            opacity: 0;

        }
    }
    @keyframes bookmark-anim${b} {
        0% {
            visibility:visible;
            -webkit-transform-origin: ${S.toFixed(2)}% -${$*2.5}%;
            transform-origin: ${S}% -${$*2.5}%;
            left: ${F}%;
            top: ${$}%;
            opacity: 1;
            -webkit-transform: scale(0.3);
            transform: scale(0.3);
            transition: linear;
        }
        10%{
            top:-${q}%;
            left: ${I}%;
            -webkit-transform: scale(0.7)rotate(${p}deg)
            transform: scale(0.7)rotate(${p}deg)
        }
        50%{
            -webkit-transform: rotate(${(p*u(.7,1,1)).toFixed(2)*-1}deg);
            transform: rotate(${(p*u(.7,1,1)).toFixed(2)*-1}deg);
            left:${B}%;
            top: ${(q-j*u(.35,.65,2)).toFixed(2)}%;
        }
        83%{        
            -webkit-transform: scale(0.4) rotate(${(p*u(.4,.7,1)).toFixed(2)}deg);
            transform: scale(0.4) rotate(${(p*u(.4,.7,1)).toFixed(2)}deg);
            left: ${(B*u(.3,.7,1)).toFixed(2)}%;
            opacity: 1;

        }    
        100%{
            top:${j}%;
            left: ${z}%;
            -webkit-transform: scale(0.1) rotate(${(p*u(.1,.4,1)).toFixed(2)*-1}deg);
            transform: scale(0.1) rotate(${(p*u(.1,.4,1)).toFixed(2)*-1}deg);
            opacity: 0;

        }
    }
`;W.insertAdjacentHTML("beforeend",Q)}let t=document.createElement("div"),l=document.createElement("header"),i=document.createElement("section");t.className="full-screen",document.body.appendChild(t);let r=document.createElement("div");r.className="container",t.appendChild(r),l.className="header",r.appendChild(l);let n=document.createElement("div");n.className="info",l.appendChild(n);let c=document.createElement("div");c.className="timer",c.innerText="999",n.appendChild(c);let y=document.createElement("div");y.className="btn newGame",n.appendChild(y);let N=document.createElement("div");N.className="config-btn",n.appendChild(N);let w=document.createElement("div");w.className="btn fg",n.appendChild(w);let E=document.createElement("div");E.className="mines",n.appendChild(E),i.className="section",r.appendChild(i);let M=document.createElement("div");M.className="contenedor",i.appendChild(M);let L,T;for(let b=1;b<=g;b++){L=document.createElement("div"),L.className=`row r${b}`,M.appendChild(L);for(let h=1;h<=a;h++)T=document.createElement("div"),T.className=`cell c${h}`,L.appendChild(T)}let f=document.createElement("div"),s=document.createElement("div");H=="googleStyle"?(s.addEventListener("click",function(){s.classList[1]!="focussed"|s.classList[0]!="focussed"&&s.classList.add("focussed")}),f.className="congrats-container focussed",s.className="lose-container",s.insertAdjacentHTML("beforeend",`
        <div class="lose">
        <div class="lose-content"></div>
        <div class="lose-bg"></div>
        <div class="lose-retry-button">
        <div class="lose-retry-icon"></div><p>Reintentar</p>
        </div>
        </div>
        `),f.insertAdjacentHTML("beforeend",`
        <div class="congrats">
        <div class="congrats-content"></div>
        <div class="congrats-bg"></div>
        <div class="congrats-retry-button">
        <div class="congrats-retry-icon"></div><p>Volver a jugar</p>
        </div>
        </div>
        `),r.appendChild(s),r.appendChild(f)):(f.className="lose",s.innerText="Lamentablemente has perdido",r.appendChild(s),f.className="congrats",f.innerText="Felicitaciones has ganado!",r.appendChild(f));let te=document.createElement("div");te.className="menu-container",r.appendChild(te),te.insertAdjacentHTML("beforeend",`
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
    <select>    
    <option value='google'>Google Theme</option>
    <option disabled value='windows'>Classic Windows (w.i.p)</option>  
    <option disabled value='pacman'>Pacman style (w.i.p)</option>
    </select>
    </div>
    <div class="buttons">
        <button class="apply-btn">Apply</button>
        <button class="cancel-btn">Cancel</button>
    </div>
    </div>
    `)}function J(){return Math.random()<.5?"-":""}function o(e,t){return Math.floor(Math.random()*(t-e+1)+e)}function u(e,t,l){return(Math.random()*(t-e)+e).toFixed(l)*1}function Ie(e){let t=document.createElement("div");t.className="cell-active",e.appendChild(t);let l=o(1,15);t.style.webkitAnimation=`cellAnim${l} ${u(1,1.8,2)}s ease-in forwards`,t.style.animation=`cellAnim${l} ${u(.8,1.2,2)}s ease-in forwards`}function qe(e){let t=document.querySelector(".contenedor"),l=o(0,7),i=o(0,1),r=t.children[parseInt((e-1)/a)].children[(e-1)%a];r.classList.replace("cell","number"),r.classList.add("nm"),r.insertAdjacentHTML("afterbegin",`<div class="nm-block" style="background-color:${X[l][0]}"></div>
    <div class="nm-mine" style="background-color:${X[l][1]}"></div>
    `);for(let c=1;c<=8;c++)i=o(0,1),r.insertAdjacentHTML("beforeend",`<div class="nm-confetti" style=" background-color: ${ue[l][i]};
    animation: bookmark-anim${o(1,20)} ${u(4.5,6.5,1)}s forwards ease-in;
    scale : ${u(.5,1.5,1)}"></div>
    `);let n=C.indexOf(e);C.splice(n,1);for(let c of m)C.includes(c)||(r=t.children[parseInt((c-1)/a)].children[(c-1)%a],r.classList.replace("flag","flagerror"),r.innerHTML="");for(let c of C)U.push(setTimeout(Ae,o(500,D*500),c))}function Ae(e){let t=document.querySelector(".contenedor"),l=o(0,7),i=o(0,1);if(!m.includes(e)){let r=t.children[parseInt((e-1)/a)].children[(e-1)%a];r.classList.replace("cell","number"),r.classList.add("nm"),r.insertAdjacentHTML("afterbegin",`<div class="nm-block" style="background-color:${X[l][0]}"></div>
        <div class="nm-mine" style="background-color:${X[l][1]}"></div>
        `);for(let n=1;n<=8;n++)i=o(0,1),r.insertAdjacentHTML("beforeend",`<div class="nm-confetti" style=" background-color: ${ue[l][i]};
        animation: bookmark-anim${o(1,20)} ${u(4.5,6.5,1)}s forwards ease-in-out;
        scale : ${u(.5,1.5,1)}"></div>
        `)}}fe();
