import { getFirstNumber, getSecondNumber, setOperation, getResult, 
    appendToFirstNumber, appendToSecondNumber,
    getOperation} from "./calculator-model";
import { updateDisplay, animateButton } from "./calculator-view";
import { setupHistory } from "./calculator-history";
import { handleCalculatorInput } from "./calculator-controller";
import "../styles/style.css"

const initializeCalculator = () => {
    setupHistory((calculation) => {
        appendToFirstNumber(calculation.firstNumber);
        setOperation(calculation.operation);
        appendToSecondNumber(calculation.secondNumber);
        updateDisplay(getFirstNumber(), getSecondNumber(), getOperation(), getResult());
    });
};

// const model = new CalculatorModel;
// const view = new CalculatorView;
// const history = new CalculatorHistory;
// const controller = new CalculatorController(model, view, history);

// const mouse = document.querySelector(".buttons");
// const keyboard = document.querySelector("#calculator");

// mouse.addEventListener("click", (event) => controller.handleClick(event));

// keyboard.addEventListener("keydown", (event) => controller.handleKeyPress(event));