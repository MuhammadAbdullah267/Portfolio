document.addEventListener('DOMContentLoaded', () => {

const m = document.querySelector('.menu');
const t = m.querySelector('p');
const l = document.querySelector('.social-lists');

m.onclick = e => {
    e.stopPropagation();
    l.classList.toggle('show');
    m.classList.toggle('rotate');
};

l.onclick = e => {
    e.stopPropagation();

    const li = e.target.closest('li');
    if (!li) return;

    const u = li.dataset.url;
    const i = li.querySelector('i');

    t.innerHTML = `<i class="${i.className}" style="color:${i.style.color};font-size:1.5rem;margin-right:8px"></i><span>${li.querySelector('span').textContent}</span>`;

    l.classList.remove('show');
    m.classList.remove('rotate');

    setTimeout(() => window.open(u, '_blank'), 200);
};

document.onclick = () => {
    l.classList.remove('show');
    m.classList.remove('rotate');
};

document.onkeydown = e => {
    if (e.key === 'Escape') {
        l.classList.remove('show');
        m.classList.remove('rotate');
    }
};

});

document.addEventListener("DOMContentLoaded", function () {


const socialLinks = document.querySelectorAll(".social-lists li");


socialLinks.forEach(item => {


    item.addEventListener("click", function(){


        let url = this.getAttribute("data-url");


        if(url.startsWith("mailto:")){

            window.location.href = url;

        }
        else{

            window.open(url, "_blank");

        }


    });


});


});