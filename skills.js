document.addEventListener("DOMContentLoaded", function () {

    const box = document.querySelector(".div3");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(box);

});


// email send 
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


// boxes left right

document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".skill-card");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });
    }, {
        threshold: 0.2
    });

    cards.forEach((card, index) => {

        // pattern for directions
        if (index % 3 === 0) {
            card.classList.add("left");
        }
        else if (index % 3 === 1) {
            card.classList.add("right");
        }
        else {
            card.classList.add("top");
        }

        observer.observe(card);
    });

});
