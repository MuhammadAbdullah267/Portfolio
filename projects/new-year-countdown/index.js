const day =
  document.getElementById("day");

const hour =
  document.getElementById("hour");

const minute =
  document.getElementById("minute");

const second =
  document.getElementById("second");



const target =
  new Date("January 1, 2027 00:00:00")
    .getTime();



function timer() {


  let now =
    new Date().getTime();


  let gap =
    target - now;



  let d =
    Math.floor(
      gap / (1000 * 60 * 60 * 24)
    );



  let h =
    Math.floor(
      gap % (1000 * 60 * 60 * 24)
      /
      (1000 * 60 * 60)
    );



  let m =
    Math.floor(
      gap % (1000 * 60 * 60)
      /
      (1000 * 60)
    );



  let s =
    Math.floor(
      gap % (1000 * 60)
      / 1000
    );



  day.innerHTML =
    String(d).padStart(2, "0");


  hour.innerHTML =
    String(h).padStart(2, "0");


  minute.innerHTML =
    String(m).padStart(2, "0");


  second.innerHTML =
    String(s).padStart(2, "0");


}



setInterval(timer, 1000);

timer();