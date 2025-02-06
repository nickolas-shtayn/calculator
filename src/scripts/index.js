import { getFirstNumber, getSecondNumber, setOperation, getResult, 
    appendToFirstNumber, appendToSecondNumber,
    getOperation, backspace} from "./calculator-model";
import { updateDisplay, animateButton } from "./calculator-view";
import { setupHistory } from "./calculator-history";
import { handlePostCalculation, handleNormalInput } from "./calculator-controller";
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
        if (getResult()) {
          handlePostCalculation(target);
        } else {
          handleNormalInput(target);
        }
        updateDisplay(getFirstNumber(), getSecondNumber(), getOperation(), getResult());
      });
      
      keyboard.addEventListener("keydown", (event) => {
        const target = event.key.toLowerCase();
        animateButton(target);
        if (getResult()) {
          handlePostCalculation(target);
        } else {
          handleNormalInput(target);
        }
        updateDisplay(getFirstNumber(), getSecondNumber(), getOperation(), getResult());
      });
};

initializeCalculator();