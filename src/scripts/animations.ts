import { animate, stagger } from 'animejs';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced){
  animate('.hero-copy>*',{opacity:[0,1],y:[32,0],duration:900,delay:stagger(115,{start:120}),ease:'out(3)'});
  animate('.hero-visual',{opacity:[0,1],scale:[.92,1],rotate:[3,0],duration:1300,delay:300,ease:'out(4)'});
  animate('.orbit-one',{rotate:[0,360],duration:26000,loop:true,ease:'linear'});animate('.orbit-two',{rotate:[360,0],duration:33000,loop:true,ease:'linear'});
  const reveal=(el:Element)=>animate(el,{opacity:[0,1],y:[42,0],duration:900,ease:'out(3)'});
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){if(e.target.matches('.approach-panels'))animate('.approach-panels article',{opacity:[0,1],y:[50,0],duration:850,delay:stagger(130),ease:'out(3)'});else if(e.target.matches('.meeting-options'))animate('.meeting-options article',{opacity:[0,1],y:[36,0],duration:800,delay:stagger(120),ease:'out(3)'});else reveal(e.target);observer.unobserve(e.target)} }),{threshold:.16});
  document.querySelectorAll('.manifesto-title,.manifesto-copy,.path-heading,.approach-panels,.profile-mark,.profile-copy,.meeting-intro,.meeting-form,.contact>*').forEach(el=>observer.observe(el));

  const stepsList=Array.from(document.querySelectorAll('.path-step'));
  const stepObserver=new IntersectionObserver(entries=>{
    const active=entries.filter(e=>e.isIntersecting);
    active.sort((a,b)=>stepsList.indexOf(a.target)-stepsList.indexOf(b.target));
    active.forEach((e,i)=>{
      animate(e.target,{opacity:[0,1],y:[45,0],duration:800,delay:i*180,ease:'out(3)'});
      stepObserver.unobserve(e.target);
    });
  },{threshold:.15});
  stepsList.forEach(el=>stepObserver.observe(el));

  const progress=document.querySelector<HTMLElement>('.path-progress'),section=document.querySelector<HTMLElement>('.path-section');
  if(progress&&section){const update=()=>{const r=section.getBoundingClientRect(),p=Math.max(0,Math.min(1,(innerHeight*.7-r.top)/(r.height+innerHeight*.4))),isDesktop=window.matchMedia('(min-width:901px)').matches;if(isDesktop){progress.style.width=`${p*100}%`;progress.style.height='100%'}else{progress.style.height=`${p*100}%`;progress.style.width='100%'}};addEventListener('scroll',update,{passive:true});update()}
}
