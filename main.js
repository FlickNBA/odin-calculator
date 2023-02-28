const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};

const operate = (a, operator, b) => {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
};

let displayValue = 0;

const addToDisplay = (n) => {
  if (displayValue == 0) {
    displayValue = document.querySelector("#display").textContent = n;
  } else {
    displayValue = document.querySelector("#display").textContent += n;
  }
  document.querySelector("#display").textContent = displayValue;
};

let allButtons = document.querySelectorAll("#calculator div:not(#display)");

let numberButtons = [...allButtons].filter((button) => {
  if (button.innerText == "0") return true;
  if (button.innerText == ".") return true;
  if (Number(button.innerText)) return true;
});

numberButtons.forEach((button) => {
  console.log(button.innerText);
  button.addEventListener("click", () => {
    addToDisplay(button.innerText);
  });
});
