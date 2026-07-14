document.addEventListener("DOMContentLoaded", () => {

    const display = document.getElementById("display");

    // Add value
    function appendValue(value) {
        display.value += value;
    }

    // Clear display
    function clearDisplay() {
        display.value = "";
    }

    // Delete last character
    function deleteLast() {
        display.value = display.value.slice(0, -1);
    }

    // Calculate
    function calculate() {

        if (display.value === "") return;

        try {

            let expression = display.value;

            let result = eval(expression);

            if (
                result === Infinity ||
                result === -Infinity ||
                isNaN(result)
            ) {
                display.value = "Error";
                return;
            }

            display.value = result;

        } catch {
            display.value = "Error";
        }
    }

    // Keyboard Support
    document.addEventListener("keydown", (e) => {

        const key = e.key;

        if ("0123456789+-*/.%".includes(key)) {
            appendValue(key);
        }

        if (key === "Enter") {
            e.preventDefault();
            calculate();
        }

        if (key === "Backspace") {
            deleteLast();
        }

        if (key === "Escape") {
            clearDisplay();
        }
    });

    // Global functions
    window.appendValue = appendValue;
    window.clearDisplay = clearDisplay;
    window.deleteLast = deleteLast;
    window.calculate = calculate;

});