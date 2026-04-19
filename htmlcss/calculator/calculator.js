let calculation = "";
const display = document.getElementById("display");

// Safe expression evaluator (replaces dangerous eval())
function evaluateExpression(expr) {
  try {
    // Only allow numbers, operators, and decimal points
    if (!/^[\d+\-*/.\s()]*$/.test(expr)) {
      throw new Error("Invalid characters");
    }
    // Replace division and multiplication symbols
    expr = expr.replace(/×/g, '*').replace(/−/g, '-');
    // Use Function instead of eval for safer evaluation
    const result = Function('"use strict"; return (' + expr + ')')();
    return isFinite(result) ? result.toString() : "Error";
  } catch (e) {
    return "Error";
  }
}

function updateCalculation(value) {
  // Prevent multiple operators in a row
  const lastChar = calculation[calculation.length - 1];
  const operators = ['+', '-', '*', '/', '×', '−'];
  
  if (operators.includes(value) && operators.includes(lastChar)) {
    return;
  }
  
  // Prevent decimal point if one already exists in the current number
  if (value === '.') {
    const lastOperatorIndex = Math.max(
      calculation.lastIndexOf('+'),
      calculation.lastIndexOf('-'),
      calculation.lastIndexOf('*'),
      calculation.lastIndexOf('/')
    );
    const currentNumber = calculation.substring(lastOperatorIndex + 1);
    if (currentNumber.includes('.')) {
      return;
    }
  }
  
  calculation += value;
  display.value = calculation || "0";
}

function equal() {
  if (!calculation) return;
  const result = evaluateExpression(calculation);
  calculation = result !== "Error" ? result : "";
  display.value = calculation || "0";
}

function clearDisplay() {
  calculation = "";
  display.value = "0";
}

function deleteLastChar() {
  calculation = calculation.slice(0, -1);
  display.value = calculation || "0";
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (/[0-9+\-*/.]/i.test(e.key)) {
    updateCalculation(e.key);
  } else if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    equal();
  } else if (e.key === "Backspace") {
    e.preventDefault();
    deleteLastChar();
  } else if (e.key === "Escape") {
    clearDisplay();
  }
});

// Initialize display
window.addEventListener("load", () => {
  display.value = "0";
});