const inputField = document.getElementById("expression");
document.addEventListener("DOMContentLoaded", function () {
  function press(val) {
    const lastChar = inputField.value.slice(-1);

    if (val === "." || val === ",") {
      const lastValue = inputField.value.split(/[+\-−*/]/).pop();

      if (lastValue.includes(".")) {
        return;
      }
    }

    if (val === "*") val = "×";
    if (val === "/") val = "÷";
    if (val === ",") val = ".";
    if (val === "-") val = "−";

    if ("+-*/.,".includes(lastChar) && "+-*/.,".includes(val)) {
      return;
    }

    if (inputField.value === "0" && !"+-*/.".includes(val)) {
      inputField.value = val;
      return;
    }

    inputField.value += val;
  }

  function clearInput() {
    inputField.value = "0";
    document.getElementById("btn-clear").blur();
  }

  async function calculate() {
    try {
      // Replace displayed symbols before evaluation
      const expression = inputField.value
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-");
      console.log(expression);

      // Evaluate the expression
      const result = await math.evaluate(String(expression));

      // Display the result
      inputField.value = String(Math.round(Number(result)*100)/100);
    } catch (error) {
      inputField.value = "Error";
    }
  }

  // **Handle Button Clicks**
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", () => {
      press(button.textContent.trim());
      button.blur();
    });
  });

  document.getElementById("btn-clear").addEventListener("click", clearInput);
  document.getElementById("btn-equal").addEventListener("click", calculate);
  document.getElementById("btn-backspace").addEventListener("click", () => {
    inputField.value = inputField.value.slice(0, -1);
    ifEmpty();
  });

  // **Handle Keyboard Input**
  document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key) || "+-*/().,".includes(key)) {
      press(key);
    } else if (key === "Enter") {
      calculate();
    } else if (key === "Backspace") {
      inputField.value = inputField.value.slice(0, -1);
    } else if (key === "c" || key === "C") {
      clearInput();
    }
    ifEmpty();
  });
});

function ifEmpty() {
  if (inputField.value == "") {
    inputField.value = "0";
  }
}
