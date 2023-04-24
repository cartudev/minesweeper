(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();let l=20,p=20,Y=p*l,B=80,A=B,Q,M=[],m=[],v=[],H=[null],f=[];$e();let ee=[["var(--exp_background1)","var(--exp_color1)"],["var(--exp_background2)","var(--exp_color2)"],["var(--exp_background3)","var(--exp_color3)"],["var(--exp_background4)","var(--exp_color4)"],["var(--exp_background5)","var(--exp_color5)"],["var(--exp_background6)","var(--exp_color6)"],["var(--exp_background7)","var(--exp_color7)"],["var(--exp_background8)","var(--exp_color8)"]],U=[["#277BCD","#2F569A"],["#388E3C","#00582C"],["#D32F2F","#8E2123"],["#B648F2","#762F9D"],["#FF8F00","#9F5608"],["#48E6F1","#2F569A"],["#F4C20D","#9F7E08"],["#ED44B5","#9A2C76"]],G=0,Z=setInterval(ne,1e3);document.querySelector(".timer").innerHTML=G.toString();document.querySelector(".mines").innerHTML=A.toString();let V=document.querySelector(".newGame"),j=!1,W=!1,y=!1,O=!1,N=document.querySelector(".contenedor");document.querySelector(".btn").addEventListener("click",function(){pe()},!0);N.addEventListener("click",function(e){le(e,"primary")},!0);N.addEventListener("contextmenu",function(e){le(e,"secondary")},!0);let J=document.querySelector(".fg");J.addEventListener("click",function(){se()},!0);function te(){for(let e=1;e<=Y;e++)m.push(e);for(let e=1;e<=B;e++){let t=Math.floor(Math.random()*m.length),n=m.splice(t,1);M.push(n[0])}M.sort((e,t)=>e-t);for(let e=0;e<=M.length;e++)m.splice(M[e-1],0,"m");m.splice(0,1,null),ce()}function ce(){for(let e=1;e<=Y;e++)oe(e)}function oe(e){let t=e;if(m[e]=="m"){H.push(m[e]);return}if(e>l&&e<l*(p-1)&&e%l!=0&&e%l!=1)return E(t,1,2,3,4,6,7,8,9);if(e==1)return E(t,2,3,6);if(e==l)return E(t,1,2,4);if(e==l*(p-1)+1)return E(t,6,8,9);if(e==l*p)return E(t,4,7,8);if(e<l)return E(t,1,2,3,4,6);if(e>l*p-l)return E(t,4,6,7,8,9);if(e%l==0)return E(t,1,2,4,7,8);if(e%l==1)return E(t,2,3,6,8,9)}function le(e,t){if(console.log("tiempo1"),e.composedPath()[0].classList[0]=="cell"||e.composedPath()[0].classList[0]=="number"||e.composedPath()[0].classList[0]=="flag"){const n=parseInt(e.composedPath()[0].classList[1].match(/\d+/))+(parseInt(e.composedPath()[1].classList[1].match(/\d+/))-1)*l;if(v.includes(n)||t=="primary"&&O==!1||t=="secondary"&&O==!0)return e.preventDefault(),X(n);if(t=="secondary"&&O==!1||t=="primary"&&O==!0){e.preventDefault(),de(n);return}}else return}function se(){J.classList[1]=="fg"?(J.classList.replace("fg","mn"),O=!0):(J.classList.replace("mn","fg"),O=!1)}function re(){clearInterval(Z)}function ne(){if(G==999||j||W){re(),Z=null;return}G++,document.querySelector(".timer").innerHTML=G.toString()}function X(e){if(v.includes(e)&&y)return;if(v.includes(e)&&!y){me(e);return}if(j==!0)return;if(H[e]=="m"){ue(e);return}let t=N.children[parseInt((e-1)/l)].children[(e-1)%l];if(H[e]==0&&(t.classList.replace("cell","number"),ie(e)),f.indexOf(e)==-1&&(t.classList.replace("cell","number"),v.includes(e)||(t.classList.add(`n${H[e]}`),ge(t)),!v.includes(e)&&(v.push(e),v.length==Y-B))){fe();return}}function de(e){if(v.includes(e)||j==!0)return;let t=f.indexOf(e),n=N.children[parseInt((e-1)/l)].children[(e-1)%l];t==-1?(n.classList.replace("cell","flag"),f.push(e),A-=1):(n.classList.replace("flag","cell"),f.splice(t,1),A+=1),document.querySelector(".mines").innerHTML=A.toString()}function fe(){V.classList.replace("newGame","winbtn"),document.querySelector(".congrats").style.display="block",W=!0}function ue(e){f.indexOf(e)==-1&&(j=!0,V.classList.replace("newGame","losebtn"),he(e),document.querySelector(".lose").style.display="block")}function E(e,...t){let n=0;t.includes(1)&&m[e+l-1]=="m"&&(n+=1),t.includes(2)&&m[e+l]=="m"&&(n+=1),t.includes(3)&&m[e+l+1]=="m"&&(n+=1),t.includes(4)&&m[e-1]=="m"&&(n+=1),t.includes(6)&&m[e+1]=="m"&&(n+=1),t.includes(7)&&m[e-l-1]=="m"&&(n+=1),t.includes(8)&&m[e-l]=="m"&&(n+=1),t.includes(9)&&m[e-l+1]=="m"&&(n+=1),H.push(n)}function me(e){let t=e,n=0,a=[];if(t>l&&t<l*(p-1)&&t%l!=0&&t%l!=1?a=[1,2,3,4,6,7,8,9]:t==1?a=[2,3,6]:t==l?a=[1,2,4]:t==l*(p-1)+1?a=[6,8,9]:t==l*p?a=[4,7,8]:t<l?a=[1,2,3,4,6]:t>l*p-l?a=[4,6,7,8,9]:t%l==0?a=[1,2,4,7,8]:t%l==1&&(a=[2,3,6,8,9]),a.includes(1)&&f.includes(e+l-1)&&(n+=1),a.includes(2)&&f.includes(e+l)&&(n+=1),a.includes(3)&&f.includes(e+l+1)&&(n+=1),a.includes(4)&&f.includes(e-1)&&(n+=1),a.includes(6)&&f.includes(e+1)&&(n+=1),a.includes(7)&&f.includes(e-l-1)&&(n+=1),a.includes(8)&&f.includes(e-l)&&(n+=1),a.includes(9)&&f.includes(e-l+1)&&(n+=1),n==H[e])return ie(e)}function ie(e){y=!0;let t=N.children[parseInt((e-1)/l)].children[(e-1)%l],n=f.indexOf(e),a=e,i=l,r=X,s=a+i-1,k=a+i,I=a+i+1,x=a-1,b=a+1,w=a-i-1,L=a-i,T=a-i+1,u=e;if(v.includes(e)||v.push(e),n!=-1&&(t.classList.replace("flag","cell"),f.splice(n,1),A+=1,document.querySelector(".mines").innerHTML=A.toString()),u>l&&u<l*(p-1)&&u%l!=0&&u%l!=1)return r(s),r(k),r(I),r(x),r(b),r(w),r(L),r(T),y=!1;if(u==1)return r(k),r(I),r(b),y=!1;if(u==l)return r(s),r(k),r(x),y=!1;if(u==l*(p-1)+1)return r(b),r(L),r(T),y=!1;if(u==l*p)return r(x),r(w),r(L),y=!1;if(u<l)return r(s),r(k),r(I),r(x),r(b),y=!1;if(u>l*p-l)return r(x),r(b),r(w),r(L),r(T),y=!1;if(u%l==0)return r(s),r(k),r(x),r(w),r(L),y=!1;if(u%l==1)return r(k),r(I),r(b),r(L),r(T),y=!1}function pe(){W&&V.classList.replace("winbtn","newGame"),j&&V.classList.replace("losebtn","newGame");let e=document.querySelectorAll(".cell-active");console.log(e);for(let t=0;t<e.length;t++)e[t].remove();M=[],m=[],v=[],H=[null],f=[],A=B,re(),G=0,document.querySelector(".mines").innerHTML=A.toString(),document.querySelector(".timer").innerHTML=G.toString(),Z=setInterval(ne,1e3),W=!1,j=!1;for(let t=0;t<p;t++)for(let n=0;n<l;n++)N.children[t].children[n].classList.replace("flagerror","cell"),N.children[t].children[n].classList.replace("flag","cell"),N.children[t].children[n].classList.replace("number","cell"),N.children[t].children[n].classList.remove("n0","n1","n2","n3","n4","n5","n6","n7","n8","nm");te(),document.querySelector(".congrats").style.display="none",document.querySelector(".lose").style.display="none"}function $e(){let e=document.getElementsByTagName("head");Q=document.createElement("style"),e[0].appendChild(Q);for(let g=1;g<=15;g++){let $=K(),z=K(),F=`${c(100,400)}`,h=Math.ceil(F/2),q=Math.ceil(F*.1),C=c(0,400),_=C*-1+c(0,200),D=Math.ceil(C*(c(92,98)*.01)),d=Math.ceil(C*(c(92,98)*.01)),S=c(90,400),P=Math.ceil(S/2),R=c(1,3),ae=`
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
            transform: rotate(${P}) scale(1.${c(2,8)});
            top: -${C}%;
                left: ${$}${h}%;
        }
    
        65%{
            top: -${d}%;
            left: ${$}${h+q}%;
        }
        90%{
            opacity: 0.${c(7,9)};
        }
        100% {
            webkit-transform: rotate(${S}deg) scale(0.${R});
            opacity: 0;
            transform: rotate(${z}${S}deg) scale(0.${R});
            left: ${$}${F+q}%;
            top:${_}%;
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
            top: -${C}%;
            left: ${$}${h}%;
        }
        65%{
            top: -${d}%;
            left: ${$}${h+q}%;
        }
        90%{
            opacity: 0.${c(7,9)};
        }

        100% {
            transform: rotate(${z}${S}deg);
            scale: 0.${R};
            left: ${$}${F}%;
            top:${_}%;
            opacity: 0;
            filter: blur(${c(1,3)})
          visibility: hidden;
        }
      }
    `;Q.insertAdjacentHTML("beforeend",ae)}for(let g=1;g<=20;g++){let $=K(),z=K(),F=c(0,300),h=c(30,250),q=c(0,60),C=$==""?c(15,300):c(15,300)*-1,_=C*-1,D=c(0,80),d=z==""?c(20,62):c(20,62)*-1,S=c(1,150),P=c(30,220),R=`
    @-webkit-keyframes bookmark-anim${g} {
        0% {
            visibility:visible;
            -webkit-transform-origin: ${F.toFixed(2)}% -${h*2.5}%;
            transform-origin: ${F}% -${h*2.5}%;
            left: ${q}%;
            top: ${h}%;
            opacity: 1;
            -webkit-transform: scale(0.3);
            transform: scale(0.3);
            transition: linear;
        }
        10%{
            top:-${S}%;
            left: ${C}%;
            -webkit-transform: scale(0.7)rotate(${d}deg)
            transform: scale(0.7)rotate(${d}deg)
        }
        50%{
            -webkit-transform: rotate(${(d*o(.7,1,1)).toFixed(2)*-1}deg);
            transform: rotate(${(d*o(.7,1,1)).toFixed(2)*-1}deg);
            left:${_}%;
            top: ${(S-P*o(.35,.65,2)).toFixed(2)}%;
        }
        83%{        
            -webkit-transform: scale(0.4) rotate(${(d*o(.4,.7,1)).toFixed(2)}deg);
            transform: scale(0.4) rotate(${(d*o(.4,.7,1)).toFixed(2)}deg);
            opacity: 1;
            left: ${(_*o(.3,.7,1)).toFixed(2)}%;
        }    
        99%{
            top:${P}%;
            left: ${D}%;
            -webkit-transform: scale(0.1) rotate(${(d*o(.1,.4,1)).toFixed(2)*-1}deg);
            transform: scale(0.1) rotate(${(d*o(.1,.4,1)).toFixed(2)*-1}deg);
            opacity: 0;

        }
    }
    @keyframes bookmark-anim${g} {
        0% {
            visibility:visible;
            -webkit-transform-origin: ${F.toFixed(2)}% -${h*2.5}%;
            transform-origin: ${F}% -${h*2.5}%;
            left: ${q}%;
            top: ${h}%;
            opacity: 1;
            -webkit-transform: scale(0.3);
            transform: scale(0.3);
            transition: linear;
        }
        10%{
            top:-${S}%;
            left: ${C}%;
            -webkit-transform: scale(0.7)rotate(${d}deg)
            transform: scale(0.7)rotate(${d}deg)
        }
        50%{
            -webkit-transform: rotate(${(d*o(.7,1,1)).toFixed(2)*-1}deg);
            transform: rotate(${(d*o(.7,1,1)).toFixed(2)*-1}deg);
            left:${_}%;
            top: ${(S-P*o(.35,.65,2)).toFixed(2)}%;
        }
        83%{        
            -webkit-transform: scale(0.4) rotate(${(d*o(.4,.7,1)).toFixed(2)}deg);
            transform: scale(0.4) rotate(${(d*o(.4,.7,1)).toFixed(2)}deg);
            left: ${(_*o(.3,.7,1)).toFixed(2)}%;
            opacity: 1;

        }    
        100%{
            top:${P}%;
            left: ${D}%;
            -webkit-transform: scale(0.1) rotate(${(d*o(.1,.4,1)).toFixed(2)*-1}deg);
            transform: scale(0.1) rotate(${(d*o(.1,.4,1)).toFixed(2)*-1}deg);
            opacity: 0;

        }
    }
`;Q.insertAdjacentHTML("beforeend",R)}let t=document.createElement("div"),n=document.createElement("header"),a=document.createElement("section");t.className="full-screen",document.body.appendChild(t);let i=document.createElement("div");i.className="container",t.appendChild(i),n.className="header",i.appendChild(n);let r=document.createElement("div");r.className="info",n.appendChild(r);let s=document.createElement("div");s.className="timer",s.innerText="999",r.appendChild(s);let k=document.createElement("div");k.className="btn newGame",r.appendChild(k);let I=document.createElement("div");I.className="btn fg",r.appendChild(I);let x=document.createElement("div");x.className="mines",r.appendChild(x),a.className="section",i.appendChild(a);let b=document.createElement("div");b.className="contenedor",a.appendChild(b);let w,L;for(let g=1;g<=p;g++){w=document.createElement("div"),w.className=`row r${g}`,b.appendChild(w);for(let $=1;$<=l;$++)L=document.createElement("div"),L.className=`cell c${$}`,w.appendChild(L)}let T=document.createElement("div");T.className="congrats",T.innerText="Felicitaciones has ganado!",i.appendChild(T);let u=document.createElement("div");u.className="lose",u.innerText="Lamentablemente has perdido",i.appendChild(u)}function K(){return Math.random()<.5?"-":""}function c(e,t){return Math.floor(Math.random()*(t-e+1)+e)}function o(e,t,n){return(Math.random()*(t-e)+e).toFixed(n)*1}function ge(e){let t=document.createElement("div");t.className="cell-active",e.appendChild(t);let n=c(1,15);t.style.webkitAnimation=`cellAnim${n} ${o(1,1.8,2)}s ease-in forwards`,t.style.animation=`cellAnim${n} ${o(.8,1.2,2)}s ease-in forwards`}function he(e){let t=document.querySelector(".contenedor"),n=c(0,7),a=c(0,1),i=t.children[parseInt((e-1)/l)].children[(e-1)%l];i.classList.replace("cell","number"),i.classList.add("nm"),i.insertAdjacentHTML("afterbegin",`<div class="nm-block" style="background-color:${U[n][0]}"></div>
    <div class="nm-mine" style="background-color:${U[n][1]}"></div>
    `);for(let s=1;s<=8;s++)a=c(0,1),i.insertAdjacentHTML("beforeend",`<div class="nm-confetti" style=" background-color: ${ee[n][a]};
    animation: bookmark-anim${c(1,20)} ${o(4.5,6.5,1)}s forwards ease-in;
    scale : ${o(.5,1.5,1)}"></div>
    `);let r=M.indexOf(e);M.splice(r,1);for(let s of f)M.includes(s)||(i=t.children[parseInt((s-1)/l)].children[(s-1)%l],i.classList.replace("flag","flagerror"));for(let s of M)setTimeout(ye,c(500,B*500),s)}function ye(e){let t=document.querySelector(".contenedor"),n=c(0,7),a=c(0,1);if(!f.includes(e)){let i=t.children[parseInt((e-1)/l)].children[(e-1)%l];i.classList.replace("cell","number"),i.classList.add("nm"),i.insertAdjacentHTML("afterbegin",`<div class="nm-block" style="background-color:${U[n][0]}"></div>
        <div class="nm-mine" style="background-color:${U[n][1]}"></div>
        `);for(let r=1;r<=8;r++)a=c(0,1),i.insertAdjacentHTML("beforeend",`<div class="nm-confetti" style=" background-color: ${ee[n][a]};
        animation: bookmark-anim${c(1,20)} ${o(4.5,6.5,1)}s forwards ease-in-out;
        scale : ${o(.5,1.5,1)}"></div>
        `)}}te();
