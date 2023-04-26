(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function l(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(a){if(a.ep)return;a.ep=!0;const r=l(a);fetch(a.href,r)}})();let n=20,p=20,ee=p*n,z=1,N=z,K,S=[],m=[],b=[],_=[null],f=[];ve();let J=[],ne=[["var(--exp_background1)","var(--exp_color1)"],["var(--exp_background2)","var(--exp_color2)"],["var(--exp_background3)","var(--exp_color3)"],["var(--exp_background4)","var(--exp_color4)"],["var(--exp_background5)","var(--exp_color5)"],["var(--exp_background6)","var(--exp_color6)"],["var(--exp_background7)","var(--exp_color7)"],["var(--exp_background8)","var(--exp_color8)"]],W=[["#277BCD","#2F569A"],["#388E3C","#00582C"],["#D32F2F","#8E2123"],["#B648F2","#762F9D"],["#FF8F00","#9F5608"],["#48E6F1","#2F569A"],["#F4C20D","#9F7E08"],["#ED44B5","#9A2C76"]],O=0,te=setInterval(se,1e3);document.querySelector(".timer").innerHTML=O.toString();document.querySelector(".mines").innerHTML=N.toString();let X=document.querySelector(".newGame"),D=!1,Y=!1,v=!1,G=!1,L=document.querySelector(".contenedor"),re=document.querySelectorAll(".newGame, .lose-retry-button, .congrats-retry-button");re.forEach(e=>e.addEventListener("click",function(){he()},!0));console.log(re);L.addEventListener("click",function(e){ae(e,"primary")},!0);L.addEventListener("contextmenu",function(e){ae(e,"secondary")},!0);let U=document.querySelector(".fg");U.addEventListener("click",function(){me()},!0);function ie(){for(let e=1;e<=ee;e++)m.push(e);for(let e=1;e<=z;e++){let t=Math.floor(Math.random()*m.length),l=m.splice(t,1);S.push(l[0])}S.sort((e,t)=>e-t);for(let e=0;e<=S.length;e++)m.splice(S[e-1],0,"m");m.splice(0,1,null),fe()}function fe(){for(let e=1;e<=ee;e++)ue(e)}function ue(e){let t=e;if(m[e]=="m"){_.push(m[e]);return}if(e>n&&e<n*(p-1)&&e%n!=0&&e%n!=1)return E(t,1,2,3,4,6,7,8,9);if(e==1)return E(t,2,3,6);if(e==n)return E(t,1,2,4);if(e==n*(p-1)+1)return E(t,6,8,9);if(e==n*p)return E(t,4,7,8);if(e<n)return E(t,1,2,3,4,6);if(e>n*p-n)return E(t,4,6,7,8,9);if(e%n==0)return E(t,1,2,4,7,8);if(e%n==1)return E(t,2,3,6,8,9)}function ae(e,t){if(e.composedPath()[0].classList[0]=="cell"||e.composedPath()[0].classList[0]=="number"||e.composedPath()[0].classList[0]=="flag"){const l=parseInt(e.composedPath()[0].classList[1].match(/\d+/))+(parseInt(e.composedPath()[1].classList[1].match(/\d+/))-1)*n;if(b.includes(l)||t=="primary"&&G==!1||t=="secondary"&&G==!0)return e.preventDefault(),Z(l);if(t=="secondary"&&G==!1||t=="primary"&&G==!0){e.preventDefault(),le(l);return}}if(e.composedPath()[0].parentElement.children[0].classList[0]=="wait-to-kill"){e.preventDefault();return}if(e.composedPath()[1].classList[0]=="flag"){e.preventDefault();const l=parseInt(e.composedPath()[1].classList[1].match(/\d+/))+(parseInt(e.composedPath()[2].classList[1].match(/\d+/))-1)*n;le(l)}else return}function me(){U.classList[1]=="fg"?(U.classList.replace("fg","mn"),G=!0):(U.classList.replace("mn","fg"),G=!1)}function ce(){clearInterval(te)}function se(){if(O==999||D||Y){ce(),te=null;return}O++,document.querySelector(".timer").innerHTML=O.toString()}function Z(e){if(b.includes(e)&&v)return;if(b.includes(e)&&!v){$e(e);return}if(D==!0)return;if(_[e]=="m"){ge(e);return}let t=L.children[parseInt((e-1)/n)].children[(e-1)%n];if(_[e]==0&&(t.classList.replace("cell","number"),oe(e)),f.indexOf(e)==-1&&(t.classList.replace("cell","number"),b.includes(e)||(t.classList.add(`n${_[e]}`),ye(t)),!b.includes(e)&&(b.push(e),b.length==ee-z))){pe();return}}function le(e){if(b.includes(e)||D==!0)return;let t=f.indexOf(e),l=L.children[parseInt((e-1)/n)].children[(e-1)%n];t==-1?(l.classList.replace("cell","flag"),l.innerHTML="",l.insertAdjacentHTML("beforeend",'<div class="f-animation" </div>'),f.push(e),N-=1):(console.log("aqui deberias de salir"),l.classList.replace("flag","cell"),l.innerHTML="",l.insertAdjacentHTML("beforeend",`<div class="f-animation" style="animation: cellAnim${c(1,15)} ${s(1,1.8,2)}s ease-in forwards; 
            -webkit-animation: cellAnim${c(1,15)} ${s(1,1.8,2)}s ease-in forwards"</div>`),f.splice(t,1),N+=1),document.querySelector(".mines").innerHTML=N.toString()}function pe(){X.classList.replace("newGame","winbtn"),document.querySelector(".congrats-container").style.display="block",Y=!0}function ge(e){f.indexOf(e)==-1&&(D=!0,X.classList.replace("newGame","losebtn"),be(e),document.querySelector(".lose-container").style.display="block")}function E(e,...t){let l=0;t.includes(1)&&m[e+n-1]=="m"&&(l+=1),t.includes(2)&&m[e+n]=="m"&&(l+=1),t.includes(3)&&m[e+n+1]=="m"&&(l+=1),t.includes(4)&&m[e-1]=="m"&&(l+=1),t.includes(6)&&m[e+1]=="m"&&(l+=1),t.includes(7)&&m[e-n-1]=="m"&&(l+=1),t.includes(8)&&m[e-n]=="m"&&(l+=1),t.includes(9)&&m[e-n+1]=="m"&&(l+=1),_.push(l)}function $e(e){let t=e,l=0,i=[];if(t>n&&t<n*(p-1)&&t%n!=0&&t%n!=1?i=[1,2,3,4,6,7,8,9]:t==1?i=[2,3,6]:t==n?i=[1,2,4]:t==n*(p-1)+1?i=[6,8,9]:t==n*p?i=[4,7,8]:t<n?i=[1,2,3,4,6]:t>n*p-n?i=[4,6,7,8,9]:t%n==0?i=[1,2,4,7,8]:t%n==1&&(i=[2,3,6,8,9]),i.includes(1)&&f.includes(e+n-1)&&(l+=1),i.includes(2)&&f.includes(e+n)&&(l+=1),i.includes(3)&&f.includes(e+n+1)&&(l+=1),i.includes(4)&&f.includes(e-1)&&(l+=1),i.includes(6)&&f.includes(e+1)&&(l+=1),i.includes(7)&&f.includes(e-n-1)&&(l+=1),i.includes(8)&&f.includes(e-n)&&(l+=1),i.includes(9)&&f.includes(e-n+1)&&(l+=1),l==_[e])return oe(e)}function oe(e){v=!0;let t=L.children[parseInt((e-1)/n)].children[(e-1)%n],l=f.indexOf(e),i=e,a=n,r=Z,o=i+a-1,k=i+a,q=i+a+1,x=i-1,w=i+1,T=i-a-1,y=i-a,A=i-a+1,u=e;if(b.includes(e)||b.push(e),l!=-1&&(t.classList.replace("flag","cell"),f.splice(l,1),N+=1,document.querySelector(".mines").innerHTML=N.toString()),u>n&&u<n*(p-1)&&u%n!=0&&u%n!=1)return r(o),r(k),r(q),r(x),r(w),r(T),r(y),r(A),v=!1;if(u==1)return r(k),r(q),r(w),v=!1;if(u==n)return r(o),r(k),r(x),v=!1;if(u==n*(p-1)+1)return r(w),r(y),r(A),v=!1;if(u==n*p)return r(x),r(T),r(y),v=!1;if(u<n)return r(o),r(k),r(q),r(x),r(w),v=!1;if(u>n*p-n)return r(x),r(w),r(T),r(y),r(A),v=!1;if(u%n==0)return r(o),r(k),r(x),r(T),r(y),v=!1;if(u%n==1)return r(k),r(q),r(w),r(y),r(A),v=!1}function he(){Y&&X.classList.replace("winbtn","newGame"),D&&X.classList.replace("losebtn","newGame");let e=document.querySelectorAll(".cell-active");for(let l=0;l<e.length;l++)e[l].remove();S=[],m=[],b=[],_=[null],f=[],N=z,ce(),O=0,document.querySelector(".mines").innerHTML=N.toString(),document.querySelector(".timer").innerHTML=O.toString(),te=setInterval(se,1e3);for(var t=0;t<J.length;t++)clearTimeout(J[t]);J=[],Y=!1,D=!1;for(let l=0;l<p;l++)for(let i=0;i<n;i++)L.children[l].children[i].classList.replace("flagerror","cell"),L.children[l].children[i].classList.replace("flag","cell"),L.children[l].children[i].classList.replace("number","cell"),L.children[l].children[i].innerHTML="",L.children[l].children[i].classList.remove("n0","n1","n2","n3","n4","n5","n6","n7","n8","nm");ie(),document.querySelector(".lose-container").style.display="none",document.querySelector(".lose-container").classList.remove("focussed"),document.querySelector(".congrats-container").style.display="none"}function ve(){let e=document.getElementsByTagName("head");K=document.createElement("style"),e[0].appendChild(K);for(let $=1;$<=15;$++){let g=V(),Q=V(),F=`${c(100,400)}`,h=Math.ceil(F/2),H=Math.ceil(F*.1),M=c(0,400),P=M*-1+c(0,200),R=Math.ceil(M*(c(92,98)*.01)),d=Math.ceil(M*(c(92,98)*.01)),C=c(90,400),j=Math.ceil(C/2),B=c(1,3),de=`
    @-webkit-keyframes cellAnim${$} {
        0% {
            webkit-transform: rotate(0) scale(1);
            transform: rotate(0) scale(1);
            left: 0%;
            top: 0%;
            visibility:visible;
            opacity: 1;
            }
        35%{
            top: -${R}%;
            left: ${g}${h-H}%;
        }
        50%{
            transform: rotate(${j}) scale(1.${c(2,8)});
            top: -${M}%;
                left: ${g}${h}%;
        }
    
        65%{
            top: -${d}%;
            left: ${g}${h+H}%;
        }
        90%{
            opacity: 0.${c(7,9)};
        }
        100% {
            webkit-transform: rotate(${C}deg) scale(0.${B});
            opacity: 0;
            transform: rotate(${Q}${C}deg) scale(0.${B});
            left: ${g}${F+H}%;
            top:${P}%;
            filter: blur(${c(1,3)})
          visibility: hidden;
        }
      }
      @keyframes cellAnim${$} {
        0% {
            transform: rotate(0);
            scale: 1;
            left: 0%;
            top: 0%;
            visibility:visible;
            opacity: 1;
            }
    
        35%{
            top: -${R}%;
            left: ${g}${h-H}%;
        }

        50%{
            scale: 1.${c(1,3)};
            top: -${M}%;
            left: ${g}${h}%;
        }
        65%{
            top: -${d}%;
            left: ${g}${h+H}%;
        }
        90%{
            opacity: 0.${c(7,9)};
        }

        100% {
            transform: rotate(${Q}${C}deg);
            scale: 0.${B};
            left: ${g}${F}%;
            top:${P}%;
            opacity: 0;
            filter: blur(${c(1,3)})
          visibility: hidden;
        }
      }
    `;K.insertAdjacentHTML("beforeend",de)}for(let $=1;$<=20;$++){let g=V(),Q=V(),F=c(0,300),h=c(30,250),H=c(0,60),M=g==""?c(15,300):c(15,300)*-1,P=M*-1,R=c(0,80),d=Q==""?c(20,62):c(20,62)*-1,C=c(1,150),j=c(30,220),B=`
    @-webkit-keyframes bookmark-anim${$} {
        0% {
            visibility:visible;
            -webkit-transform-origin: ${F.toFixed(2)}% -${h*2.5}%;
            transform-origin: ${F}% -${h*2.5}%;
            left: ${H}%;
            top: ${h}%;
            opacity: 1;
            -webkit-transform: scale(0.3);
            transform: scale(0.3);
            transition: linear;
        }
        10%{
            top:-${C}%;
            left: ${M}%;
            -webkit-transform: scale(0.7)rotate(${d}deg)
            transform: scale(0.7)rotate(${d}deg)
        }
        50%{
            -webkit-transform: rotate(${(d*s(.7,1,1)).toFixed(2)*-1}deg);
            transform: rotate(${(d*s(.7,1,1)).toFixed(2)*-1}deg);
            left:${P}%;
            top: ${(C-j*s(.35,.65,2)).toFixed(2)}%;
        }
        83%{        
            -webkit-transform: scale(0.4) rotate(${(d*s(.4,.7,1)).toFixed(2)}deg);
            transform: scale(0.4) rotate(${(d*s(.4,.7,1)).toFixed(2)}deg);
            opacity: 1;
            left: ${(P*s(.3,.7,1)).toFixed(2)}%;
        }    
        99%{
            top:${j}%;
            left: ${R}%;
            -webkit-transform: scale(0.1) rotate(${(d*s(.1,.4,1)).toFixed(2)*-1}deg);
            transform: scale(0.1) rotate(${(d*s(.1,.4,1)).toFixed(2)*-1}deg);
            opacity: 0;

        }
    }
    @keyframes bookmark-anim${$} {
        0% {
            visibility:visible;
            -webkit-transform-origin: ${F.toFixed(2)}% -${h*2.5}%;
            transform-origin: ${F}% -${h*2.5}%;
            left: ${H}%;
            top: ${h}%;
            opacity: 1;
            -webkit-transform: scale(0.3);
            transform: scale(0.3);
            transition: linear;
        }
        10%{
            top:-${C}%;
            left: ${M}%;
            -webkit-transform: scale(0.7)rotate(${d}deg)
            transform: scale(0.7)rotate(${d}deg)
        }
        50%{
            -webkit-transform: rotate(${(d*s(.7,1,1)).toFixed(2)*-1}deg);
            transform: rotate(${(d*s(.7,1,1)).toFixed(2)*-1}deg);
            left:${P}%;
            top: ${(C-j*s(.35,.65,2)).toFixed(2)}%;
        }
        83%{        
            -webkit-transform: scale(0.4) rotate(${(d*s(.4,.7,1)).toFixed(2)}deg);
            transform: scale(0.4) rotate(${(d*s(.4,.7,1)).toFixed(2)}deg);
            left: ${(P*s(.3,.7,1)).toFixed(2)}%;
            opacity: 1;

        }    
        100%{
            top:${j}%;
            left: ${R}%;
            -webkit-transform: scale(0.1) rotate(${(d*s(.1,.4,1)).toFixed(2)*-1}deg);
            transform: scale(0.1) rotate(${(d*s(.1,.4,1)).toFixed(2)*-1}deg);
            opacity: 0;

        }
    }
`;K.insertAdjacentHTML("beforeend",B)}let t=document.createElement("div"),l=document.createElement("header"),i=document.createElement("section");t.className="full-screen",document.body.appendChild(t);let a=document.createElement("div");a.className="container",t.appendChild(a),l.className="header",a.appendChild(l);let r=document.createElement("div");r.className="info",l.appendChild(r);let o=document.createElement("div");o.className="timer",o.innerText="999",r.appendChild(o);let k=document.createElement("div");k.className="btn newGame",r.appendChild(k);let q=document.createElement("div");q.className="config-btn",r.appendChild(q);let x=document.createElement("div");x.className="btn fg",r.appendChild(x);let w=document.createElement("div");w.className="mines",r.appendChild(w),i.className="section",a.appendChild(i);let T=document.createElement("div");T.className="contenedor",i.appendChild(T);let y,A;for(let $=1;$<=p;$++){y=document.createElement("div"),y.className=`row r${$}`,T.appendChild(y);for(let g=1;g<=n;g++)A=document.createElement("div"),A.className=`cell c${g}`,y.appendChild(A)}let u=document.createElement("div"),I=document.createElement("div");I.addEventListener("click",function(){I.classList[1]!="focussed"|I.classList[0]!="focussed"&&I.classList.add("focussed")}),u.className="congrats-container focussed",I.className="lose-container",I.insertAdjacentHTML("beforeend",`
        <div class="lose">
        <div class="lose-content"></div>
        <div class="lose-bg"></div>
        <div class="lose-retry-button">
        <div class="lose-retry-icon"></div><p>Reintentar</p>
        </div>
        </div>
        `),u.insertAdjacentHTML("beforeend",`
        <div class="congrats">
        <div class="congrats-content"></div>
        <div class="congrats-bg"></div>
        <div class="congrats-retry-button">
        <div class="congrats-retry-icon"></div><p>Volver a jugar</p>
        </div>
        </div>
        `),a.appendChild(I),a.appendChild(u)}function V(){return Math.random()<.5?"-":""}function c(e,t){return Math.floor(Math.random()*(t-e+1)+e)}function s(e,t,l){return(Math.random()*(t-e)+e).toFixed(l)*1}function ye(e){let t=document.createElement("div");t.className="cell-active",e.appendChild(t);let l=c(1,15);t.style.webkitAnimation=`cellAnim${l} ${s(1,1.8,2)}s ease-in forwards`,t.style.animation=`cellAnim${l} ${s(.8,1.2,2)}s ease-in forwards`}function be(e){let t=document.querySelector(".contenedor"),l=c(0,7),i=c(0,1),a=t.children[parseInt((e-1)/n)].children[(e-1)%n];a.classList.replace("cell","number"),a.classList.add("nm"),a.insertAdjacentHTML("afterbegin",`<div class="nm-block" style="background-color:${W[l][0]}"></div>
    <div class="nm-mine" style="background-color:${W[l][1]}"></div>
    `);for(let o=1;o<=8;o++)i=c(0,1),a.insertAdjacentHTML("beforeend",`<div class="nm-confetti" style=" background-color: ${ne[l][i]};
    animation: bookmark-anim${c(1,20)} ${s(4.5,6.5,1)}s forwards ease-in;
    scale : ${s(.5,1.5,1)}"></div>
    `);let r=S.indexOf(e);S.splice(r,1);for(let o of f)S.includes(o)||(a=t.children[parseInt((o-1)/n)].children[(o-1)%n],a.classList.replace("flag","flagerror"),a.innerHTML="");for(let o of S)J.push(setTimeout(Le,c(500,z*500),o))}function Le(e){let t=document.querySelector(".contenedor"),l=c(0,7),i=c(0,1);if(!f.includes(e)){let a=t.children[parseInt((e-1)/n)].children[(e-1)%n];a.classList.replace("cell","number"),a.classList.add("nm"),a.insertAdjacentHTML("afterbegin",`<div class="nm-block" style="background-color:${W[l][0]}"></div>
        <div class="nm-mine" style="background-color:${W[l][1]}"></div>
        `);for(let r=1;r<=8;r++)i=c(0,1),a.insertAdjacentHTML("beforeend",`<div class="nm-confetti" style=" background-color: ${ne[l][i]};
        animation: bookmark-anim${c(1,20)} ${s(4.5,6.5,1)}s forwards ease-in-out;
        scale : ${s(.5,1.5,1)}"></div>
        `)}}ie();
