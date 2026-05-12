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

});