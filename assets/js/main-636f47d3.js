(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function l(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(a){if(a.ep)return;a.ep=!0;const r=l(a);fetch(a.href,r)}})();let n=20,p=20,Z=p*n,B=80,H=B,Q,T=[],m=[],v=[],P=[null],u=[];he();let J=[],le=[["var(--exp_background1)","var(--exp_color1)"],["var(--exp_background2)","var(--exp_color2)"],["var(--exp_background3)","var(--exp_color3)"],["var(--exp_background4)","var(--exp_color4)"],["var(--exp_background5)","var(--exp_color5)"],["var(--exp_background6)","var(--exp_color6)"],["var(--exp_background7)","var(--exp_color7)"],["var(--exp_background8)","var(--exp_color8)"]],V=[["#277BCD","#2F569A"],["#388E3C","#00582C"],["#D32F2F","#8E2123"],["#B648F2","#762F9D"],["#FF8F00","#9F5608"],["#48E6F1","#2F569A"],["#F4C20D","#9F7E08"],["#ED44B5","#9A2C76"]],G=0,ee=setInterval(ce,1e3);document.querySelector(".timer").innerHTML=G.toString();document.querySelector(".mines").innerHTML=H.toString();let W=document.querySelector(".newGame"),O=!1,X=!1,y=!1,j=!1,k=document.querySelector(".contenedor"),ne=document.querySelectorAll(".newGame, .lose-retry-button");ne.forEach(e=>e.addEventListener("click",function(){ge()},!0));console.log(ne);k.addEventListener("click",function(e){ie(e,"primary")},!0);k.addEventListener("contextmenu",function(e){ie(e,"secondary")},!0);let U=document.querySelector(".fg");U.addEventListener("click",function(){ue()},!0);function re(){for(let e=1;e<=Z;e++)m.push(e);for(let e=1;e<=B;e++){let t=Math.floor(Math.random()*m.length),l=m.splice(t,1);T.push(l[0])}T.sort((e,t)=>e-t);for(let e=0;e<=T.length;e++)m.splice(T[e-1],0,"m");m.splice(0,1,null),de()}function de(){for(let e=1;e<=Z;e++)fe(e)}function fe(e){let t=e;if(m[e]=="m"){P.push(m[e]);return}if(e>n&&e<n*(p-1)&&e%n!=0&&e%n!=1)return S(t,1,2,3,4,6,7,8,9);if(e==1)return S(t,2,3,6);if(e==n)return S(t,1,2,4);if(e==n*(p-1)+1)return S(t,6,8,9);if(e==n*p)return S(t,4,7,8);if(e<n)return S(t,1,2,3,4,6);if(e>n*p-n)return S(t,4,6,7,8,9);if(e%n==0)return S(t,1,2,4,7,8);if(e%n==1)return S(t,2,3,6,8,9)}function ie(e,t){if(e.composedPath()[0].classList[0]=="cell"||e.composedPath()[0].classList[0]=="number"||e.composedPath()[0].classList[0]=="flag"){const l=parseInt(e.composedPath()[0].classList[1].match(/\d+/))+(parseInt(e.composedPath()[1].classList[1].match(/\d+/))-1)*n;if(v.includes(l)||t=="primary"&&j==!1||t=="secondary"&&j==!0)return e.preventDefault(),Y(l);if(t=="secondary"&&j==!1||t=="primary"&&j==!0){e.preventDefault(),te(l);return}}if(e.composedPath()[0].parentElement.children[0].classList[0]=="wait-to-kill"){e.preventDefault();return}if(e.composedPath()[1].classList[0]=="flag"){e.preventDefault();const l=parseInt(e.composedPath()[1].classList[1].match(/\d+/))+(parseInt(e.composedPath()[2].classList[1].match(/\d+/))-1)*n;te(l)}else return}function ue(){U.classList[1]=="fg"?(U.classList.replace("fg","mn"),j=!0):(U.classList.replace("mn","fg"),j=!1)}function ae(){clearInterval(ee)}function ce(){if(G==999||O||X){ae(),ee=null;return}G++,document.querySelector(".timer").innerHTML=G.toString()}function Y(e){if(v.includes(e)&&y)return;if(v.includes(e)&&!y){$e(e);return}if(O==!0)return;if(P[e]=="m"){pe(e);return}let t=k.children[parseInt((e-1)/n)].children[(e-1)%n];if(P[e]==0&&(t.classList.replace("cell","number"),se(e)),u.indexOf(e)==-1&&(t.classList.replace("cell","number"),v.includes(e)||(t.classList.add(`n${P[e]}`),ye(t)),!v.includes(e)&&(v.push(e),v.length==Z-B))){me();return}}function te(e){if(v.includes(e)||O==!0)return;let t=u.indexOf(e),l=k.children[parseInt((e-1)/n)].children[(e-1)%n];t==-1?(l.classList.replace("cell","flag"),l.innerHTML="",l.insertAdjacentHTML("beforeend",'<div class="f-animation" </div>'),u.push(e),H-=1):(console.log("aqui deberias de salir"),l.classList.replace("flag","cell"),l.innerHTML="",l.insertAdjacentHTML("beforeend",`<div class="f-animation" style="animation: cellAnim${c(1,15)} ${s(1,1.8,2)}s ease-in forwards; 
            -webkit-animation: cellAnim${c(1,15)} ${s(1,1.8,2)}s ease-in forwards"</div>`),u.splice(t,1),H+=1),document.querySelector(".mines").innerHTML=H.toString()}function me(){W.classList.replace("newGame","winbtn"),document.querySelector(".congrats").style.display="block",X=!0}function pe(e){u.indexOf(e)==-1&&(O=!0,W.classList.replace("newGame","losebtn"),ve(e),document.querySelector(".lose-container").style.display="block")}function S(e,...t){let l=0;t.includes(1)&&m[e+n-1]=="m"&&(l+=1),t.includes(2)&&m[e+n]=="m"&&(l+=1),t.includes(3)&&m[e+n+1]=="m"&&(l+=1),t.includes(4)&&m[e-1]=="m"&&(l+=1),t.includes(6)&&m[e+1]=="m"&&(l+=1),t.includes(7)&&m[e-n-1]=="m"&&(l+=1),t.includes(8)&&m[e-n]=="m"&&(l+=1),t.includes(9)&&m[e-n+1]=="m"&&(l+=1),P.push(l)}function $e(e){let t=e,l=0,i=[];if(t>n&&t<n*(p-1)&&t%n!=0&&t%n!=1?i=[1,2,3,4,6,7,8,9]:t==1?i=[2,3,6]:t==n?i=[1,2,4]:t==n*(p-1)+1?i=[6,8,9]:t==n*p?i=[4,7,8]:t<n?i=[1,2,3,4,6]:t>n*p-n?i=[4,6,7,8,9]:t%n==0?i=[1,2,4,7,8]:t%n==1&&(i=[2,3,6,8,9]),i.includes(1)&&u.includes(e+n-1)&&(l+=1),i.includes(2)&&u.includes(e+n)&&(l+=1),i.includes(3)&&u.includes(e+n+1)&&(l+=1),i.includes(4)&&u.includes(e-1)&&(l+=1),i.includes(6)&&u.includes(e+1)&&(l+=1),i.includes(7)&&u.includes(e-n-1)&&(l+=1),i.includes(8)&&u.includes(e-n)&&(l+=1),i.includes(9)&&u.includes(e-n+1)&&(l+=1),l==P[e])return se(e)}function se(e){y=!0;let t=k.children[parseInt((e-1)/n)].children[(e-1)%n],l=u.indexOf(e),i=e,a=n,r=Y,o=i+a-1,x=i+a,N=i+a+1,w=i-1,b=i+1,F=i-a-1,L=i-a,A=i-a+1,d=e;if(v.includes(e)||v.push(e),l!=-1&&(t.classList.replace("flag","cell"),u.splice(l,1),H+=1,document.querySelector(".mines").innerHTML=H.toString()),d>n&&d<n*(p-1)&&d%n!=0&&d%n!=1)return r(o),r(x),r(N),r(w),r(b),r(F),r(L),r(A),y=!1;if(d==1)return r(x),r(N),r(b),y=!1;if(d==n)return r(o),r(x),r(w),y=!1;if(d==n*(p-1)+1)return r(b),r(L),r(A),y=!1;if(d==n*p)return r(w),r(F),r(L),y=!1;if(d<n)return r(o),r(x),r(N),r(w),r(b),y=!1;if(d>n*p-n)return r(w),r(b),r(F),r(L),r(A),y=!1;if(d%n==0)return r(o),r(x),r(w),r(F),r(L),y=!1;if(d%n==1)return r(x),r(N),r(b),r(L),r(A),y=!1}function ge(){X&&W.classList.replace("winbtn","newGame"),O&&W.classList.replace("losebtn","newGame");let e=document.querySelectorAll(".cell-active");for(let l=0;l<e.length;l++)e[l].remove();T=[],m=[],v=[],P=[null],u=[],H=B,ae(),G=0,document.querySelector(".mines").innerHTML=H.toString(),document.querySelector(".timer").innerHTML=G.toString(),ee=setInterval(ce,1e3);for(var t=0;t<J.length;t++)clearTimeout(J[t]);J=[],X=!1,O=!1;for(let l=0;l<p;l++)for(let i=0;i<n;i++)k.children[l].children[i].classList.replace("flagerror","cell"),k.children[l].children[i].classList.replace("flag","cell"),k.children[l].children[i].classList.replace("number","cell"),k.children[l].children[i].innerHTML="",k.children[l].children[i].classList.remove("n0","n1","n2","n3","n4","n5","n6","n7","n8","nm");re(),document.querySelector(".congrats").style.display="none",document.querySelector(".lose-container").style.display="none",document.querySelector(".lose-container").classList.remove("focussed")}function he(){let e=document.getElementsByTagName("head");Q=document.createElement("style"),e[0].appendChild(Q);for(let g=1;g<=15;g++){let $=K(),z=K(),M=`${c(100,400)}`,h=Math.ceil(M/2),q=Math.ceil(M*.1),E=c(0,400),I=E*-1+c(0,200),D=Math.ceil(E*(c(92,98)*.01)),f=Math.ceil(E*(c(92,98)*.01)),C=c(90,400),_=Math.ceil(C/2),R=c(1,3),oe=`
    @-webkit-keyframes cellAnim${g} {
        0% {
            webkit-transform: rotate(0) scale(1);
            transform: rotate(0) scale(1);
            left: 0%;
            top: 0%;
            visibility:visible;
            opacity: 1;
            }
        35%{
            top: -${D}%;
            left: ${$}${h-q}%;
        }
        50%{
            transform: rotate(${_}) scale(1.${c(2,8)});
            top: -${E}%;
                left: ${$}${h}%;
        }
    
        65%{
            top: -${f}%;
            left: ${$}${h+q}%;
        }
        90%{
            opacity: 0.${c(7,9)};
        }
        100% {
            webkit-transform: rotate(${C}deg) scale(0.${R});
            opacity: 0;
            transform: rotate(${z}${C}deg) scale(0.${R});
            left: ${$}${M+q}%;
            top:${I}%;
            filter: blur(${c(1,3)})
          visibility: hidden;
        }
      }
      @keyframes cellAnim${g} {
        0% {
            transform: rotate(0);
            scale: 1;
            left: 0%;
            top: 0%;
            visibility:visible;
            opacity: 1;
            }
    
        35%{
            top: -${D}%;
            left: ${$}${h-q}%;
        }

        50%{
            scale: 1.${c(1,3)};
            top: -${E}%;
            left: ${$}${h}%;
        }
        65%{
            top: -${f}%;
            left: ${$}${h+q}%;
        }
        90%{
            opacity: 0.${c(7,9)};
        }

        100% {
            transform: rotate(${z}${C}deg);
            scale: 0.${R};
            left: ${$}${M}%;
            top:${I}%;
            opacity: 0;
            filter: blur(${c(1,3)})
          visibility: hidden;
        }
      }
    `;Q.insertAdjacentHTML("beforeend",oe)}for(let g=1;g<=20;g++){let $=K(),z=K(),M=c(0,300),h=c(30,250),q=c(0,60),E=$==""?c(15,300):c(15,300)*-1,I=E*-1,D=c(0,80),f=z==""?c(20,62):c(20,62)*-1,C=c(1,150),_=c(30,220),R=`
    @-webkit-keyframes bookmark-anim${g} {
        0% {
            visibility:visible;
            -webkit-transform-origin: ${M.toFixed(2)}% -${h*2.5}%;
            transform-origin: ${M}% -${h*2.5}%;
            left: ${q}%;
            top: ${h}%;
            opacity: 1;
            -webkit-transform: scale(0.3);
            transform: scale(0.3);
            transition: linear;
        }
        10%{
            top:-${C}%;
            left: ${E}%;
            -webkit-transform: scale(0.7)rotate(${f}deg)
            transform: scale(0.7)rotate(${f}deg)
        }
        50%{
            -webkit-transform: rotate(${(f*s(.7,1,1)).toFixed(2)*-1}deg);
            transform: rotate(${(f*s(.7,1,1)).toFixed(2)*-1}deg);
            left:${I}%;
            top: ${(C-_*s(.35,.65,2)).toFixed(2)}%;
        }
        83%{        
            -webkit-transform: scale(0.4) rotate(${(f*s(.4,.7,1)).toFixed(2)}deg);
            transform: scale(0.4) rotate(${(f*s(.4,.7,1)).toFixed(2)}deg);
            opacity: 1;
            left: ${(I*s(.3,.7,1)).toFixed(2)}%;
        }    
        99%{
            top:${_}%;
            left: ${D}%;
            -webkit-transform: scale(0.1) rotate(${(f*s(.1,.4,1)).toFixed(2)*-1}deg);
            transform: scale(0.1) rotate(${(f*s(.1,.4,1)).toFixed(2)*-1}deg);
            opacity: 0;

        }
    }
    @keyframes bookmark-anim${g} {
        0% {
            visibility:visible;
            -webkit-transform-origin: ${M.toFixed(2)}% -${h*2.5}%;
            transform-origin: ${M}% -${h*2.5}%;
            left: ${q}%;
            top: ${h}%;
            opacity: 1;
            -webkit-transform: scale(0.3);
            transform: scale(0.3);
            transition: linear;
        }
        10%{
            top:-${C}%;
            left: ${E}%;
            -webkit-transform: scale(0.7)rotate(${f}deg)
            transform: scale(0.7)rotate(${f}deg)
        }
        50%{
            -webkit-transform: rotate(${(f*s(.7,1,1)).toFixed(2)*-1}deg);
            transform: rotate(${(f*s(.7,1,1)).toFixed(2)*-1}deg);
            left:${I}%;
            top: ${(C-_*s(.35,.65,2)).toFixed(2)}%;
        }
        83%{        
            -webkit-transform: scale(0.4) rotate(${(f*s(.4,.7,1)).toFixed(2)}deg);
            transform: scale(0.4) rotate(${(f*s(.4,.7,1)).toFixed(2)}deg);
            left: ${(I*s(.3,.7,1)).toFixed(2)}%;
            opacity: 1;

        }    
        100%{
            top:${_}%;
            left: ${D}%;
            -webkit-transform: scale(0.1) rotate(${(f*s(.1,.4,1)).toFixed(2)*-1}deg);
            transform: scale(0.1) rotate(${(f*s(.1,.4,1)).toFixed(2)*-1}deg);
            opacity: 0;

        }
    }
`;Q.insertAdjacentHTML("beforeend",R)}let t=document.createElement("div"),l=document.createElement("header"),i=document.createElement("section");t.className="full-screen",document.body.appendChild(t);let a=document.createElement("div");a.className="container",t.appendChild(a),l.className="header",a.appendChild(l);let r=document.createElement("div");r.className="info",l.appendChild(r);let o=document.createElement("div");o.className="timer",o.innerText="999",r.appendChild(o);let x=document.createElement("div");x.className="btn newGame",r.appendChild(x);let N=document.createElement("div");N.className="btn fg",r.appendChild(N);let w=document.createElement("div");w.className="mines",r.appendChild(w),i.className="section",a.appendChild(i);let b=document.createElement("div");b.className="contenedor",i.appendChild(b);let F,L;for(let g=1;g<=p;g++){F=document.createElement("div"),F.className=`row r${g}`,b.appendChild(F);for(let $=1;$<=n;$++)L=document.createElement("div"),L.className=`cell c${$}`,F.appendChild(L)}let A=document.createElement("div");A.className="congrats",A.innerText="Felicitaciones has ganado!",a.appendChild(A);let d=document.createElement("div");d.addEventListener("click",function(){d.classList[1]!="focussed"|d.classList[0]!="focussed"&&d.classList.add("focussed")}),d.className="lose-container",d.insertAdjacentHTML("beforeend",`
        <div class="lose">
        <div class="lose-content"></div>
        <div class="lose-bg"></div>
        <div class="lose-retry-button">
        <div class="lose-retry-icon"></div><p>Reintentar</p>
        </div>
        </div>
        `),a.appendChild(d)}function K(){return Math.random()<.5?"-":""}function c(e,t){return Math.floor(Math.random()*(t-e+1)+e)}function s(e,t,l){return(Math.random()*(t-e)+e).toFixed(l)*1}function ye(e){let t=document.createElement("div");t.className="cell-active",e.appendChild(t);let l=c(1,15);t.style.webkitAnimation=`cellAnim${l} ${s(1,1.8,2)}s ease-in forwards`,t.style.animation=`cellAnim${l} ${s(.8,1.2,2)}s ease-in forwards`}function ve(e){let t=document.querySelector(".contenedor"),l=c(0,7),i=c(0,1),a=t.children[parseInt((e-1)/n)].children[(e-1)%n];a.classList.replace("cell","number"),a.classList.add("nm"),a.insertAdjacentHTML("afterbegin",`<div class="nm-block" style="background-color:${V[l][0]}"></div>
    <div class="nm-mine" style="background-color:${V[l][1]}"></div>
    `);for(let o=1;o<=8;o++)i=c(0,1),a.insertAdjacentHTML("beforeend",`<div class="nm-confetti" style=" background-color: ${le[l][i]};
    animation: bookmark-anim${c(1,20)} ${s(4.5,6.5,1)}s forwards ease-in;
    scale : ${s(.5,1.5,1)}"></div>
    `);let r=T.indexOf(e);T.splice(r,1);for(let o of u)T.includes(o)||(a=t.children[parseInt((o-1)/n)].children[(o-1)%n],a.classList.replace("flag","flagerror"),a.innerHTML="");for(let o of T)J.push(setTimeout(be,c(500,B*500),o))}function be(e){let t=document.querySelector(".contenedor"),l=c(0,7),i=c(0,1);if(!u.includes(e)){let a=t.children[parseInt((e-1)/n)].children[(e-1)%n];a.classList.replace("cell","number"),a.classList.add("nm"),a.insertAdjacentHTML("afterbegin",`<div class="nm-block" style="background-color:${V[l][0]}"></div>
        <div class="nm-mine" style="background-color:${V[l][1]}"></div>
        `);for(let r=1;r<=8;r++)i=c(0,1),a.insertAdjacentHTML("beforeend",`<div class="nm-confetti" style=" background-color: ${le[l][i]};
        animation: bookmark-anim${c(1,20)} ${s(4.5,6.5,1)}s forwards ease-in-out;
        scale : ${s(.5,1.5,1)}"></div>
        `)}}re();
