const hour =
document.querySelector(".hour");


const minute =
document.querySelector(".minute");


const second =
document.querySelector(".second");



function clock(){


const now=new Date();


let s=now.getSeconds();

let m=now.getMinutes();

let h=now.getHours();



let sd=s*6;

let md=m*6+s*0.1;

let hd=(h%12)*30+m*.5;



second.style.transform=
`rotate(${sd}deg)`;


minute.style.transform=
`rotate(${md}deg)`;


hour.style.transform=
`rotate(${hd}deg)`;



}



clock();

setInterval(clock,1000);