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

let displayValue;

let allButtons = document.querySelectorAll("#numbers div");

let numberButtons = [...allButtons].filter((button) => {
  if (button.innerHTML == "0") return true;
  if (button.innerHTML == ".") return true;
  if (Number(button.innerHTML)) return true;
});

numberButtons.forEach((button) => {
  console.log(button.innerHTML);
});
