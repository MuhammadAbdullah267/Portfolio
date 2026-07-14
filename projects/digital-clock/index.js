document.addEventListener("DOMContentLoaded", function () {

  const hourEl = document.getElementById("hour");
  const minuteEl = document.getElementById("minutes");
  const secondEl = document.getElementById("seconds");
  const ampmEl = document.getElementById("ampm");

  function updateClock() {

    // Pakistan Time
    const pakistanTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Karachi"
    });

    const date = new Date(pakistanTime);

    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    let ampm = h >= 12 ? "PM" : "AM";

    h = h % 12;
    h = h ? h : 12;

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    hourEl.innerText = h;
    minuteEl.innerText = m;
    secondEl.innerText = s;
    ampmEl.innerText = ampm;

    setTimeout(updateClock, 1000);
  }

  updateClock();

});