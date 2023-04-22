(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))i(c);new MutationObserver(c=>{for(const l of c)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function n(c){const l={};return c.integrity&&(l.integrity=c.integrity),c.referrerPolicy&&(l.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?l.credentials="include":c.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(c){if(c.ep)return;c.ep=!0;const l=n(c);fetch(c.href,l)}})();let r=20,$=20,X=$*r,V=30,q=V,z,_=[],p=[],v=[],P=[null],f=[];pe();let G=[["var(--exp_background1)","var(--exp_color1)"],["var(--exp_background2)","var(--exp_color2)"],["var(--exp_background3)","var(--exp_color3)"],["var(--exp_background4)","var(--exp_color4)"],["var(--exp_background5)","var(--exp_color5)"],["var(--exp_background6)","var(--exp_color6)"],["var(--exp_background7)","var(--exp_color7)"],["var(--exp_background8)","var(--exp_color8)"]],Z=["#277BCD","#388E3C","#D32F2F","#B648F2","#FF8F00","#48E6F1","#F4C20D","#ED44B5"],j=0,Y=setInterval(re,1e3);document.querySelector(".timer").innerHTML=j.toString();document.querySelector(".mines").innerHTML=q.toString();let J=document.querySelector(".newGame"),D=!1,U=!1,b=!1,O=!1,N=document.querySelector(".contenedor");document.querySelector(".btn").addEventListener("click",function(){me()},!0);N.addEventListener("click",function(e){te(e,"primary")},!0);N.addEventListener("contextmenu",function(e){te(e,"secondary")},!0);let K=document.querySelector(".fg");K.addEventListener("click",function(){oe()},!0);function ee(){for(let e=1;e<=X;e++)p.push(e);for(let e=1;e<=V;e++){let t=Math.floor(Math.random()*p.length),n=p.splice(t,1);_.push(n[0])}_.sort((e,t)=>e-t);for(let e=0;e<=_.length;e++)p.splice(_[e-1],0,"m");p.splice(0,1,null),ae()}function ae(){for(let e=1;e<=X;e++)ce(e)}function ce(e){let t=e;if(p[e]=="m"){P.push(p[e]);return}if(e>r&&e<r*($-1)&&e%r!=0&&e%r!=1)return M(t,1,2,3,4,6,7,8,9);if(e==1)return M(t,2,3,6);if(e==r)return M(t,1,2,4);if(e==r*($-1)+1)return M(t,6,8,9);if(e==r*$)return M(t,4,7,8);if(e<r)return M(t,1,2,3,4,6);if(e>r*$-r)return M(t,4,6,7,8,9);if(e%r==0)return M(t,1,2,4,7,8);if(e%r==1)return M(t,2,3,6,8,9)}function te(e,t){if(console.log("tiempo1"),e.composedPath()[0].classList[0]=="cell"||e.composedPath()[0].classList[0]=="number"||e.composedPath()[0].classList[0]=="flag"){const n=parseInt(e.composedPath()[0].classList[1].match(/\d+/))+(parseInt(e.composedPath()[1].classList[1].match(/\d+/))-1)*r;if(v.includes(n)||t=="primary"&&O==!1||t=="secondary"&&O==!0)return e.preventDefault(),W(n);if(t=="secondary"&&O==!1||t=="primary"&&O==!0){e.preventDefault(),se(n);return}}else return}function oe(){K.classList[1]=="fg"?(K.classList.replace("fg","mn"),O=!0):(K.classList.replace("mn","fg"),O=!1)}function le(){clearInterval(Y)}function re(){if(j==999||D||U){le(),Y=null;return}j++,document.querySelector(".timer").innerHTML=j.toString()}function W(e){if(v.includes(e)&&b)return;if(v.includes(e)&&!b){ue(e);return}if(D==!0)return;if(P[e]=="m"){fe(e);return}let t=N.children[parseInt((e-1)/r)].children[(e-1)%r];if(P[e]==0&&(t.classList.replace("cell","number"),ne(e)),f.indexOf(e)==-1&&(t.classList.replace("cell","number"),v.includes(e)||(t.classList.add(`n${P[e]}`),$e(t)),!v.includes(e)&&(v.push(e),v.length==X-V))){de();return}}function se(e){if(v.includes(e)||D==!0)return;let t=f.indexOf(e),n=N.children[parseInt((e-1)/r)].children[(e-1)%r];t==-1?(n.classList.replace("cell","flag"),f.push(e),q-=1):(n.classList.replace("flag","cell"),f.splice(t,1),q+=1),document.querySelector(".mines").innerHTML=q.toString()}function de(){J.classList.replace("newGame","winbtn"),document.querySelector(".congrats").style.display="block",U=!0}function fe(e){f.indexOf(e)==-1&&(D=!0,J.classList.replace("newGame","losebtn"),ge(e),document.querySelector(".lose").style.display="block")}function M(e,...t){let n=0;t.includes(1)&&p[e+r-1]=="m"&&(n+=1),t.includes(2)&&p[e+r]=="m"&&(n+=1),t.includes(3)&&p[e+r+1]=="m"&&(n+=1),t.includes(4)&&p[e-1]=="m"&&(n+=1),t.includes(6)&&p[e+1]=="m"&&(n+=1),t.includes(7)&&p[e-r-1]=="m"&&(n+=1),t.includes(8)&&p[e-r]=="m"&&(n+=1),t.includes(9)&&p[e-r+1]=="m"&&(n+=1),P.push(n)}function ue(e){let t=e,n=0,i=[];if(t>r&&t<r*($-1)&&t%r!=0&&t%r!=1?i=[1,2,3,4,6,7,8,9]:t==1?i=[2,3,6]:t==r?i=[1,2,4]:t==r*($-1)+1?i=[6,8,9]:t==r*$?i=[4,7,8]:t<r?i=[1,2,3,4,6]:t>r*$-r?i=[4,6,7,8,9]:t%r==0?i=[1,2,4,7,8]:t%r==1&&(i=[2,3,6,8,9]),i.includes(1)&&f.includes(e+r-1)&&(n+=1),i.includes(2)&&f.includes(e+r)&&(n+=1),i.includes(3)&&f.includes(e+r+1)&&(n+=1),i.includes(4)&&f.includes(e-1)&&(n+=1),i.includes(6)&&f.includes(e+1)&&(n+=1),i.includes(7)&&f.includes(e-r-1)&&(n+=1),i.includes(8)&&f.includes(e-r)&&(n+=1),i.includes(9)&&f.includes(e-r+1)&&(n+=1),n==P[e])return ne(e)}function ne(e){b=!0;let t=N.children[parseInt((e-1)/r)].children[(e-1)%r],n=f.indexOf(e),i=e,c=r,l=W,u=i+c-1,d=i+c,A=i+c+1,w=i-1,k=i+1,F=i-c-1,x=i-c,T=i-c+1,m=e;if(v.includes(e)||v.push(e),n!=-1&&(t.classList.replace("flag","cell"),f.splice(n,1),q+=1,document.querySelector(".mines").innerHTML=q.toString()),m>r&&m<r*($-1)&&m%r!=0&&m%r!=1)return l(u),l(d),l(A),l(w),l(k),l(F),l(x),l(T),b=!1;if(m==1)return l(d),l(A),l(k),b=!1;if(m==r)return l(u),l(d),l(w),b=!1;if(m==r*($-1)+1)return l(k),l(x),l(T),b=!1;if(m==r*$)return l(w),l(F),l(x),b=!1;if(m<r)return l(u),l(d),l(A),l(w),l(k),b=!1;if(m>r*$-r)return l(w),l(k),l(F),l(x),l(T),b=!1;if(m%r==0)return l(u),l(d),l(w),l(F),l(x),b=!1;if(m%r==1)return l(d),l(A),l(k),l(x),l(T),b=!1}function me(){U&&J.classList.replace("winbtn","newGame"),D&&J.classList.replace("losebtn","newGame");let e=document.querySelectorAll(".cell-active");console.log(e);for(let t=0;t<e.length;t++)e[t].remove();_=[],p=[],v=[],P=[null],f=[],q=V,le(),j=0,document.querySelector(".mines").innerHTML=q.toString(),document.querySelector(".timer").innerHTML=j.toString(),Y=setInterval(re,1e3),U=!1,D=!1;for(let t=0;t<$;t++)for(let n=0;n<r;n++)N.children[t].children[n].classList.replace("flagerror","cell"),N.children[t].children[n].classList.replace("flag","cell"),N.children[t].children[n].classList.replace("number","cell"),N.children[t].children[n].classList.remove("n0","n1","n2","n3","n4","n5","n6","n7","n8","nm");ee(),document.querySelector(".congrats").style.display="none",document.querySelector(".lose").style.display="none"}function pe(){let e=document.getElementsByTagName("head");z=document.createElement("style"),e[0].appendChild(z);for(let h=1;h<=15;h++){let g=Q(),B=Q(),S=`${a(100,400)}`,y=Math.ceil(S/2),C=Math.ceil(S*.1),L=a(0,400),R=L*-1+a(0,200),s=Math.ceil(L*(a(92,98)*.01)),I=Math.ceil(L*(a(92,98)*.01)),E=a(90,400),H=a(1,3),ie=`
    @-webkit-keyframes cellAnim${h} {
        0% {
            webkit-transform: rotate(0) scale(1);
            transform: rotate(0) scale(1);
            left: 0%;
            top: 0%;
            visibility:visible;
            opacity: 1;
            }
        35%{
            top: -${s}%;
            left: ${g}${y-C}%;
        }
        50%{
            transform: scale(1.${a(1,5)})
            top: -${L}%;
                left: ${g}${y}%;
        }
    
        65%{
            top: -${I}%;
            left: ${g}${y+C}%;
        }
        90%{
            opacity: 0.${a(7,9)};
        }
        100% {
            webkit-transform: rotate(${E}deg) scale(0.${H});
            opacity: 0;
            transform: rotate(${B}${E}deg) scale(0.${H});
            left: ${g}${S+C}%;
            top:${R}%;
            filter: blur(${a(1,3)})
          visibility: hidden;
        }
      }
      @keyframes cellAnim${h} {
        0% {
            webkit-transform: rotate(0) scale(1);
            transform: rotate(0) scale(1);
            left: 0%;
            top: 0%;
            visibility:visible;
            opacity: 1;
            }
    
        35%{
            top: -${s}%;
            left: ${g}${y-C}%;
        }

        50%{
            transform: scale(1.${a(1,5)})
            top: -${L}%;
            left: ${g}${y}%;
        }
        65%{
            top: -${I}%;
            left: ${g}${y+C}%;
        }
        90%{
            opacity: 0.${a(7,9)};
        }

        100% {
            webkit-transform: rotate(${E}deg) scale(0.${H});
            transform: rotate(${B}${E}deg) scale(0.${H});
            left: ${g}${S}%;
            top:${R}%;
            opacity: 0;
            filter: blur(${a(1,3)})
          visibility: hidden;
        }
      }
    `;z.insertAdjacentHTML("beforeend",ie)}for(let h=1;h<=20;h++){let g=Q(),B=Q(),S=a(0,300),y=a(30,250),C=g==""?a(15,300):a(15,300)*-1,L=C*-1,R=a(0,80),s=B==""?a(20,62):a(20,62)*-1,I=a(1,150),E=a(30,220),H=`
    @-webkit-keyframes bookmark-anim${h} {
        0% {
            visibility:visible;
            -webkit-transform-origin: ${S.toFixed(2)}% -${y*2.5}%;
            transform-origin: ${S}% -${y*2.5}%;
            top: ${y}%;
            opacity: 1;
            -webkit-transform: scale(0.3);
            transform: scale(0.3);
            transition: linear;
        }
        10%{
            top:-${I}%;
            left: ${C}%;
            -webkit-transform: scale(0.7)rotate(${s}deg)
            transform: scale(0.7)rotate(${s}deg)
        }
        50%{
            -webkit-transform: rotate(${(s*o(.7,1,1)).toFixed(2)*-1}deg);
            transform: rotate(${(s*o(.7,1,1)).toFixed(2)*-1}deg);
            left:${L}%;
            top: ${(I-E*o(.35,.65,2)).toFixed(2)}%;
        }
        83%{        
            -webkit-transform: scale(0.4) rotate(${(s*o(.4,.7,1)).toFixed(2)}deg);
            transform: scale(0.4) rotate(${(s*o(.4,.7,1)).toFixed(2)}deg);
            left: ${(L*o(.3,.7,1)).toFixed(2)}%;
        }    
        100%{
            top:${E}%;
            left: ${R}%;
            -webkit-transform: scale(0.1) rotate(${(s*o(.1,.4,1)).toFixed(2)*-1}deg);
            transform: scale(0.1) rotate(${(s*o(.1,.4,1)).toFixed(2)*-1}deg);
        }
    }
    @keyframes bookmark-anim${h} {
        0% {
            visibility:visible;
            -webkit-transform-origin: ${S.toFixed(2)}% -${y*2.5}%;
            transform-origin: ${S}% -${y*2.5}%;
            top: ${y}%;
            opacity: 1;
            -webkit-transform: scale(0.3);
            transform: scale(0.3);
            transition: linear;
        }
        10%{
            top:-${I}%;
            left: ${C}%;
            -webkit-transform: scale(0.7)rotate(${s}deg)
            transform: scale(0.7)rotate(${s}deg)
        }
        50%{
            -webkit-transform: rotate(${(s*o(.7,1,1)).toFixed(2)*-1}deg);
            transform: rotate(${(s*o(.7,1,1)).toFixed(2)*-1}deg);
            left:${L}%;
            top: ${(I-E*o(.35,.65,2)).toFixed(2)}%;
        }
        83%{        
            -webkit-transform: scale(0.4) rotate(${(s*o(.4,.7,1)).toFixed(2)}deg);
            transform: scale(0.4) rotate(${(s*o(.4,.7,1)).toFixed(2)}deg);
            left: ${(L*o(.3,.7,1)).toFixed(2)}%;
        }    
        100%{
            top:${E}%;
            left: ${R}%;
            -webkit-transform: scale(0.1) rotate(${(s*o(.1,.4,1)).toFixed(2)*-1}deg);
            transform: scale(0.1) rotate(${(s*o(.1,.4,1)).toFixed(2)*-1}deg);
        }
    }
`;z.insertAdjacentHTML("beforeend",H)}let t=document.createElement("div"),n=document.createElement("header"),i=document.createElement("section");t.className="full-screen",document.body.appendChild(t);let c=document.createElement("div");c.className="container",t.appendChild(c),n.className="header",c.appendChild(n);let l=document.createElement("div");l.className="info",n.appendChild(l);let u=document.createElement("div");u.className="timer",u.innerText="999",l.appendChild(u);let d=document.createElement("div");d.className="btn newGame",l.appendChild(d);let A=document.createElement("div");A.className="btn fg",l.appendChild(A);let w=document.createElement("div");w.className="mines",l.appendChild(w),i.className="section",c.appendChild(i);let k=document.createElement("div");k.className="contenedor",i.appendChild(k);let F,x;for(let h=1;h<=$;h++){F=document.createElement("div"),F.className=`row r${h}`,k.appendChild(F);for(let g=1;g<=r;g++)x=document.createElement("div"),x.className=`cell c${g}`,F.appendChild(x)}let T=document.createElement("div");T.className="congrats",T.innerText="Felicitaciones has ganado!",c.appendChild(T);let m=document.createElement("div");m.className="lose",m.innerText="Lamentablemente has perdido",c.appendChild(m)}function Q(){return Math.random()<.5?"-":""}function a(e,t){return Math.floor(Math.random()*(t-e+1)+e)}function o(e,t,n){return(Math.random()*(t-e)+e).toFixed(n)*1}function $e(e){let t=document.createElement("div");t.className="cell-active",e.appendChild(t);let n=a(1,15);t.style.webkitAnimation=`cellAnim${n} ${o(1,1.8,2)}s ease-in forwards`,t.style.animation=`cellAnim${n} ${o(1,1.8,2)}s ease-in forwards`}function ge(e){let t=document.querySelector(".contenedor"),n=a(0,7),i=a(0,1),c=a(0,1),l=t.children[parseInt((e-1)/r)].children[(e-1)%r];l.classList.replace("cell","number"),l.classList.add("nm"),l.style.setProperty("--exp_background1",`${Z[n]}`),l.insertAdjacentHTML("afterbegin",`<div style="background-color:${G[n][1]}"></div>
    <div></div>`);for(let d=1;d<=4;d++)i=a(0,1),c=a(0,1),l.insertAdjacentHTML("beforeend",`<div style="--exp_background1: ${G[n][i]};
    --exp_background2: ${G[n][c]};
    --animation1: bookmark-anim${a(1,20)};
    --animation2: bookmark-anim${a(1,20)};
    --time1: ${o(4.5,6.5,1)}s;
    --time2: ${o(4.5,6.5,1)}s;
    scale : ${o(.5,1.5,1)}"></div>
    `);let u=_.indexOf(e);_.splice(u,1);for(let d of f)_.includes(d)||(l=t.children[parseInt((d-1)/r)].children[(d-1)%r],l.classList.replace("flag","flagerror"));for(let d of _)setTimeout(he,a(1e3,75e3),d)}function he(e){let t=document.querySelector(".contenedor"),n=a(0,7),i=a(0,1),c=a(0,1);if(!f.includes(e)){let l=t.children[parseInt((e-1)/r)].children[(e-1)%r];l.classList.replace("cell","number"),l.classList.add("nm"),l.style.setProperty("--exp_background1",`${Z[n]}`),l.insertAdjacentHTML("afterbegin",`<div style="background-color:${G[n][1]}"></div>
        <div></div>`);for(let u=1;u<=4;u++)i=a(0,1),c=a(0,1),l.insertAdjacentHTML("beforeend",`<div style="--exp_background1: ${G[n][i]};
        --exp_background2: ${G[n][c]};
        --animation1: bookmark-anim${a(1,20)};
        --animation2: bookmark-anim${a(1,20)};
        --time1: ${o(4.5,6.5,1)}s;
        --time2: ${o(4.5,6.5,1)}s;
        scale : ${o(.5,1.5,1)}"></div>
        `)}}ee();
