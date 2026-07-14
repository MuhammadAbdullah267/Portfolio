document.addEventListener("DOMContentLoaded", () => {

    // Get Elements
    const loginForm = document.getElementById("loginForm");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const message = document.getElementById("message");

    // Form Submit
    loginForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const userValue = username.value.trim();
        const passValue = password.value.trim();

        // Empty Validation
        if(userValue === "" || passValue === ""){

            message.style.color = "red";
            message.innerText = "Please fill all fields!";
            return;
        }

        // Demo Login
        if(userValue === "admin" && passValue === "12345"){

            message.style.color = "lime";
            message.innerText = "Login Successful!";

            // Redirect
            setTimeout(() => {

                window.location.href = "dashboard.html";

            }, 1500);

        }else{

            message.style.color = "red";
            message.innerText = "Invalid Username or Password!";
        }

    });

});