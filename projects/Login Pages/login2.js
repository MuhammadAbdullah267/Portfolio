// script.js

document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // ELEMENTS
    // =========================

    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const loginBtn = document.getElementById("loginBtn");

    const inputs = document.querySelectorAll("input");

    // =========================
    // INPUT ANIMATION EFFECT
    // =========================

    inputs.forEach((input) => {

        input.addEventListener("focus", () => {
            input.style.transform = "scale(1.03)";
        });

        input.addEventListener("blur", () => {
            input.style.transform = "scale(1)";
        });

    });

    // =========================
    // ENTER KEY LOGIN
    // =========================

    document.addEventListener("keydown", (event) => {

        if(event.key === "Enter"){
            loginBtn.click();
        }

    });

    // =========================
    // LOGIN BUTTON CLICK
    // =========================

    loginBtn.addEventListener("click", () => {

        const userValue = username.value.trim();
        const passValue = password.value.trim();

        // EMPTY CHECK

        if(userValue === "" && passValue === ""){

            showMessage("Please enter username and password", "#ff3b3b");

            username.style.borderColor = "#ff3b3b";
            password.style.borderColor = "#ff3b3b";

            shakeForm();

            return;
        }

        if(userValue === ""){

            showMessage("Username is required", "#ff3b3b");

            username.style.borderColor = "#ff3b3b";

            username.focus();

            shakeForm();

            return;
        }

        if(passValue === ""){

            showMessage("Password is required", "#ff3b3b");

            password.style.borderColor = "#ff3b3b";

            password.focus();

            shakeForm();

            return;
        }

        // SUCCESS EFFECT

        username.style.borderColor = "#00ff88";
        password.style.borderColor = "#00ff88";

        loginBtn.innerHTML = "LOGGING IN...";

        loginBtn.style.background =
        "linear-gradient(135deg,#00c853,#00ff88)";

        // FAKE LOGIN DELAY

        setTimeout(() => {

            showMessage("Login Successful", "#00ff88");

            loginBtn.innerHTML = "SUCCESS";

        }, 1500);

    });

    // =========================
    // REMOVE ERROR ON TYPING
    // =========================

    inputs.forEach((input) => {

        input.addEventListener("input", () => {

            input.style.borderColor = "#666";

        });

    });

    // =========================
    // MESSAGE FUNCTION
    // =========================

    function showMessage(text, color){

        let oldMessage = document.querySelector(".message");

        if(oldMessage){
            oldMessage.remove();
        }

        const message = document.createElement("div");

        message.classList.add("message");

        message.innerText = text;

        message.style.color = color;

        message.style.marginTop = "15px";

        message.style.fontSize = "14px";

        message.style.fontWeight = "bold";

        message.style.letterSpacing = "1px";

        message.style.animation = "fadeIn 0.5s ease";

        document
        .querySelector(".login-container")
        .appendChild(message);

    }

    // =========================
    // SHAKE EFFECT
    // =========================

    function shakeForm(){

        const container = document.querySelector(".login-container");

        container.style.animation = "shake 0.3s";

        setTimeout(() => {
            container.style.animation = "";
        }, 300);

    }

    // =========================
    // CREATE CSS ANIMATIONS
    // =========================

    const style = document.createElement("style");

    style.innerHTML = `

        @keyframes shake {

            0%{ transform:translateX(0); }

            25%{ transform:translateX(-5px); }

            50%{ transform:translateX(5px); }

            75%{ transform:translateX(-5px); }

            100%{ transform:translateX(0); }

        }

        @keyframes fadeIn {

            from{
                opacity:0;
                transform:translateY(10px);
            }

            to{
                opacity:1;
                transform:translateY(0);
            }

        }

    `;

    document.head.appendChild(style);

});