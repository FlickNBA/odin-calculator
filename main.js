const add = (a, b) => {
  return Number(a) + Number(b);
};

const subtract = (a, b) => {
  return Number(a) - Number(b);
};

const multiply = (a, b) => {
  return Number(a) * Number(b);
};

const divide = (a, b) => {
  return Number(a) / Number(b);
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
let currentA = false;
let currentB = false;
let currentOperator = false;
let anyButtonActive = false;
let functionalButtons;

const startOperating = (a, operator) => {
  currentA = a;
  currentOperator = operator;
  console.log(`Starting math operation: ${a} ${operator}`);
  displayValue = "";
};

const finishOperating = (b, operator = false, equalCalled = false) => {
  currentB = b;
  console.log(`Finishing math operation: ${currentA} ${currentOperator} ${currentB} = ${operate(currentA, currentOperator, currentB)}`);
  displayValue = operate(currentA, currentOperator, currentB);
  roundDisplay(displayValue);
  anyButtonActive = false;

  if (!equalCalled) {
    console.log("!equal");
    currentA = displayValue;
    currentB = false;
    displayValue = ""; // Z TYM DZIAŁA CHAINING
    currentOperator = operator;
  } else {
    console.log("equal!!!!!!!");
    currentA = false;
    currentB = false;
    currentOperator = false;
  }

  //   if (!operator == "=") {
  //     displayValue = "";
  //     currentOperator = operator;
  //   } else {
  //     currentOperator = false;
  //   }
};

const removeActiveFromButtons = (a) => {
  a.forEach((button) => {
    button.classList.remove("active");
  });
  anyButtonActive = false;
};

const initialSetup = () => {
  let calculatorDiv = document.querySelector("#calculator");
  let targetButton = document.querySelectorAll("#calculator div")[3];
  let deleteButton = document.querySelector("#delete");
  deleteButton.style["width"] = `${targetButton.offsetWidth}px`;
  deleteButton.style["height"] = `${targetButton.offsetHeight}px`;
  deleteButton.style["left"] = `${calculatorDiv.offsetLeft + calculatorDiv.offsetWidth - 8}px`;
  deleteButton.style["top"] = `${calculatorDiv.offsetTop - targetButton.offsetHeight + 8}px`;
  deleteButton.addEventListener("click", () => {
    removeFromDisplay();
  });
  let allButtons = document.querySelectorAll("#calculator div:not(#display)");

  functionalButtons = [...allButtons].filter((button) => {
    if (button.innerText == "/") return true;
    if (button.innerText == "*") return true;
    if (button.innerText == "-") return true;
    if (button.innerText == "+") return true;
  });

  functionalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      removeActiveFromButtons(functionalButtons);
      anyButtonActive = true;
      button.classList.add("active");
      //DECIDE WHAT TO DO, START OR FINISH OPERATING
      // startOperating(displayValue, button.innerText);
      console.log(`btn func clicked => ${button.innerText}`);

      if (currentA !== false && currentB !== false) {
        console.log("fin");
        finishOperating(displayValue, button.innerText);
      } else {
        console.log("sta");
        startOperating(displayValue, button.innerText);
      }
    });
  });

  let equalsButton = [...allButtons].find((button) => {
    return button.innerText == "=";
  });

  equalsButton.addEventListener("click", () => {
    finishOperating(displayValue, false, true);
    removeActiveFromButtons(functionalButtons);
  });

  let dotButton = [...allButtons].find((button) => {
    return button.innerText == ".";
  });

  dotButton.addEventListener("click", () => {
    console.log(". button clicked");
    if (typeof displayValue != "number") {
      if (displayValue.indexOf(".") == -1) {
        addToDisplay(".");
      }
    }
  });

  let numberButtons = [...allButtons].filter((button) => {
    if (button.innerText == "0") return true;
    if (Number(button.innerText)) return true;
  });

  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log(`btn num clicked => ${button.innerText}`);
      addToDisplay(button.innerText);
    });
  });

  let acButton = document.querySelector("#clear").addEventListener("click", () => resetButton());
};

initialSetup();

const addToDisplay = (n) => {
  if (displayValue == 0) {
    displayValue = document.querySelector("#display").textContent = n;
  } else {
    displayValue = document.querySelector("#display").textContent += n;
  }
  document.querySelector("#display").textContent = displayValue;
  if (currentA) {
    currentB = displayValue;
  }
};

const resetButton = () => {
  currentA = false;
  currentB = false;
  currentOperator = false;
  displayValue = 0;
  removeActiveFromButtons(functionalButtons);
  roundDisplay(displayValue);
};

const removeFromDisplay = () => {
  let newDisplay;
  console.log(displayValue.length);
  if (displayValue.length > 1) {
    newDisplay = displayValue.substr(0, displayValue.length - 1);
  } else {
    newDisplay = 0;
  }
  displayValue = newDisplay;
  roundDisplay(displayValue);
};

const roundDisplay = (n) => {
  console.log("s");
  document.querySelector("#display").textContent = Math.round(n * 1000) / 1000;
};
