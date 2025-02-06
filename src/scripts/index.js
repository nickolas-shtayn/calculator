import { getFirstNumber, getSecondNumber, setOperation, getResult, 
    appendToFirstNumber, appendToSecondNumber,
    getOperation} from "./calculator-model";
import { updateDisplay, animateButton } from "./calculator-view";
import { setupHistory } from "./calculator-history";
import { handleCalculatorInput } from "./calculator-controller";
import "../styles/style.css"

function initializeCalculator() {
    setupHistory((calculation) => {
      appendToFirstNumber(calculation.firstNumber);
      setOperation(calculation.operation);
      appendToSecondNumber(calculation.secondNumber);
      updateDisplay(
        getFirstNumber(),
        getSecondNumber(),
        getOperation(),
        getResult()
      );
    });
  
    const mouse = document.querySelector(".buttons");
    const keyboard = document.querySelector("#calculator");
  
    mouse.addEventListener("click", (event) => {
      const target = event.target.textContent.trim();
      animateButton(target);
      handleCalculatorInput(target);
    });
  
    keyboard.addEventListener("keydown", (event) => {
      const target = event.key.toLowerCase();
      animateButton(target);
      handleCalculatorInput(target);
    });
};
