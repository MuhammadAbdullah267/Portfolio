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


// left right boxes

document.addEventListener("DOMContentLoaded", function () {

  const projects = document.querySelectorAll(".project");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  projects.forEach((project) => {
    observer.observe(project);
  });

});


// MY projects left right animation

document.addEventListener("DOMContentLoaded", function () {

  const cards = document.querySelectorAll(".card");

  // Assign random directions
  cards.forEach((card, index) => {
    const directions = ["left", "right", "top", "bottom"];
    const random = directions[index % directions.length];
    card.classList.add(random);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  cards.forEach((card) => {
    observer.observe(card);
  });

});