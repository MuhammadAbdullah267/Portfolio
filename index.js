
// // Button go Dark or light karta ha

document.addEventListener("DOMContentLoaded", function () {

    const darkToggle = document.getElementById("darkModeToggle");

    darkToggle.addEventListener("change", function () {

        document.body.classList.toggle("dark-theme");

    });

});


// Big boxes go right aur left say atay hain 

document.addEventListener("DOMContentLoaded", function () {


    const boxes = document.querySelectorAll(".box-left, .box-right");

    function showBoxes() {

        const triggerBottom = window.innerHeight * 0.85;

        boxes.forEach(function (box) {

            const boxTop = box.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {

                box.classList.add("show");

            }

        });

    }

    window.addEventListener("scroll", showBoxes);

    showBoxes();


    /* =========================
       DARK MODE TOGGLE
    ========================== */

    const darkToggle = document.getElementById("darkModeToggle");

    darkToggle.addEventListener("change", function () {

        document.body.classList.toggle("dark-theme");

    });

});



    /* =========================
       DIV2 CARD ANIMATION
    ========================== */

    const cards = document.querySelectorAll("#div3, #div4, #div5");

    function showCards() {

        const triggerBottom = window.innerHeight * 0.85;

        cards.forEach(function(card){

            const cardTop = card.getBoundingClientRect().top;

            if(cardTop < triggerBottom){

                card.classList.add("show");

            }

        });

    }

    window.addEventListener("scroll", showCards);

    showCards();



    /* =========================
       DARK MODE TOGGLE
    ========================== */

    const darkToggle = document.getElementById("darkModeToggle");

    darkToggle.addEventListener("change", function () {

        document.body.classList.toggle("dark-theme");

    });


document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".project-card");

    function showCards() {

        cards.forEach((card) => {

            const triggerBottom = window.innerHeight - 100;

            const cardTop = card.getBoundingClientRect().top;

            if (cardTop < triggerBottom) {
                card.classList.add("show");
            }

        });

    }

    window.addEventListener("scroll", showCards);

    showCards();

});


document.addEventListener("DOMContentLoaded", function () {

    emailjs.init({
        publicKey: "oxuR4b8oEhbDMrq0Z"
    });

    document.getElementById("sendBtn").addEventListener("click", function (e) {

        e.preventDefault();

        const params = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };

       
        console.log("SERVICE:", "service_y1nmc9b");
        console.log("TEMPLATE:", "template_2wqn8kq");
        console.log("PARAMS:", params);

        emailjs.send(
            "service_y1nmc9b",
            "template_2wqn8kq",
            params
        )
        .then(function (response) {

            console.log("SUCCESS!", response);
            alert("Message Sent Successfully!");

        })
        .catch(function (error) {

            console.log("FAILED...", error);
            alert(JSON.stringify(error));

        });

    });

});