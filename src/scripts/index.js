import { getFirstNumber, getSecondNumber, getOperation, getResult, 
    appendToFirstNumber, appendToSecondNumber} from "./calculator-model";
import { updateDisplay, animateButton } from "./calculator-view";
import { setupHistory } from "./calculator-history";
import { handleCalculatorInput } from "./calculator-controller";
import "../styles/style.css"

// import { CalculatorModel } from "./calculator-model";
// import { CalculatorView } from "./calculator-view";
// import { CalculatorController } from "./calculator-controller";
// import { CalculatorHistory } from "./calculator-history";
// import "../styles/style.css"

// const model = new CalculatorModel;
// const view = new CalculatorView;
// const history = new CalculatorHistory;
// const controller = new CalculatorController(model, view, history);

// const mouse = document.querySelector(".buttons");
// const keyboard = document.querySelector("#calculator");

// mouse.addEventListener("click", (event) => controller.handleClick(event));

// keyboard.addEventListener("keydown", (event) => controller.handleKeyPress(event));