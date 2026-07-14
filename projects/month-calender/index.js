const monthEl = document.querySelector(".date h1");
const fullDateEl = document.querySelector(".date p");
const daysEl = document.querySelector(".days");

const today = new Date();

const monthIndex = today.getMonth();
const year = today.getFullYear();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

monthEl.innerText = months[monthIndex];
fullDateEl.innerText = today.toDateString();

const firstDate = new Date(year, monthIndex, 1);

// Monday = first column
let firstDay = firstDate.getDay();
firstDay = firstDay === 0 ? 6 : firstDay - 1;

const lastDay = new Date(year, monthIndex + 1, 0).getDate();

let days = "";

// Empty boxes before month start
for (let i = 0; i < firstDay; i++) {
  days += `<div class="empty"></div>`;
}

// Dates
for (let i = 1; i <= lastDay; i++) {

  const isToday =
    i === today.getDate();

  days += `
    <div class="${isToday ? "today" : ""}">
      ${i}
    </div>
  `;
}

daysEl.innerHTML = days;