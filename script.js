// const helperFunctions = require("./helpers");
// console.log("Calculator helper functions loaded:", Object.keys(helperFunctions));
import {handleCalculatorInput, calculateResult, updateDisplay, clearDisplay, userChoices} from "./helpers.js";
console.log("Calculator helper functions loaded");

const validOperators = ['+', '-', 'x', '*', '/', '%', '=', 'enter', 'backspace', 'delete', '.', 'shift', 'meta'];
const numPad = document.querySelector("#numpad")
const calculator = document.querySelector("#calculator");

numPad.addEventListener("click", (e) => {
    let target = e.target.textContent;

    clearDisplay(target)

    if (target === '=') {
        if (userChoices.firstNumber !== '' && userChoices.operation !== '' && userChoices.secondNumber !== '') {
            calculateResult()
        } else {
            alert("Empty input");
        }
    } else {
        handleCalculatorInput(target)
    }

    updateDisplay();

});

calculator.addEventListener("keydown", (e) => {
    let target = e.key.toLowerCase(); 

    clearDisplay(target)

    if (isNaN(target)) {
        if (!validOperators.includes(target)) {
            alert(`${target} is an invalid key`);
        };
    }
        

    if (target === '=' || target === 'enter') {
        if (userChoices.firstNumber !== '' && userChoices.operation !== '' && userChoices.secondNumber !== '') {
            calculateResult()
        } else {
            alert("Empty input");
        }
    } else {
        handleCalculatorInput(target)
    }

    updateDisplay();

});