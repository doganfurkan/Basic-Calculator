document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("expression");

    function press(val) {
        const lastChar = inputField.value.slice(-1);

        // Convert displayed operators to actual math symbols
        if (val === "×") val = "*";
        if (val === "÷") val = "/";

        // Prevent multiple operators in a row
        if ("+-*/.".includes(lastChar) && "+-*/.".includes(val)) {
            return;
        }

        inputField.value += val;
    }

    function clearInput() {
        inputField.value = "";
    }

    function calculate() {
        try {
            // Replace displayed symbols before evaluation
            const expression = inputField.value
                .replace(/×/g, '*')
                .replace(/÷/g, '/');

            // Evaluate the expression
            const result = math.evaluate(expression);
            
            // Display the result
            inputField.value = result;
        } catch (error) {
            inputField.value = "Error";
        }
    }

    // **Handle Button Clicks**
    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", () => press(button.textContent.trim()));
    });

    document.getElementById("btn-clear").addEventListener("click", clearInput);
    document.getElementById("btn-equal").addEventListener("click", calculate);

    // **Handle Keyboard Input**
    document.addEventListener("keydown", (event) => {
        const key = event.key;

        if (!isNaN(key) || "+-*/().".includes(key)) {
            press(key);
        } else if (key === "Enter") {
            calculate();
        } else if (key === "Backspace") {
            inputField.value = inputField.value.slice(0, -1);
        } else if (key === "Escape") {
            clearInput();
        }
    });
});
