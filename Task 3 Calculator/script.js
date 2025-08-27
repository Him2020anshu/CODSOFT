const display = document.getElementById("display");
let currentInput = "";

function appendValue(value) {
  if (display.innerText === "0" && value !== ".") {
    currentInput = value;
  } else {
    currentInput += value;
  }
  updateDisplay();
}

function updateDisplay() {
  display.innerText = currentInput || "0";
}

function clearDisplay() {
  currentInput = "";
  updateDisplay();
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function toggleSign() {
  if (currentInput) {
    if (currentInput.charAt(0) === "-") {
      currentInput = currentInput.slice(1);
    } else {
      currentInput = "-" + currentInput;
    }
    updateDisplay();
  }
}

function calculate() {
  try {
    currentInput = eval(currentInput).toString();
    updateDisplay();
  } catch (error) {
    display.innerText = "Error";
  }
}

function applyFunction(func) {
  let num = parseFloat(currentInput);
  if (!isNaN(num)) {
    switch (func) {
      case "sqrt":
        currentInput = Math.sqrt(num).toString();
        break;
      case "sin":
        currentInput = Math.sin(toRadians(num)).toString();
        break;
      case "cos":
        currentInput = Math.cos(toRadians(num)).toString();
        break;
      case "tan":
        currentInput = Math.tan(toRadians(num)).toString();
        break;
    }
    updateDisplay();
  }
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function toggleTheme() {
  document.body.classList.toggle("light-theme");
}

function copyToClipboard() {
  navigator.clipboard.writeText(display.innerText);
  alert("Copied: " + display.innerText);
}

document.addEventListener("keydown", function (e) {
  const validKeys = "0123456789/*-+.%";
  if (validKeys.includes(e.key)) {
    appendValue(e.key);
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    deleteLast();
  }
});
