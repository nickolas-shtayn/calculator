import { calculate } from "./calculator-model";

describe("Calculate", () => {
    test("addition", () => {
        firstNumber = '10';
        secondNumber = '5';
        operation = '+'

        const result = calculate();

        expect(result).toBe(15);
    });

    test("subtraction", () => {
        firstNumber = '10';
        secondNumber = '5';
        operation = '-';

        const result = calculate();

        expect(result).toBe(5);
    });

    test("multiplication", () => {
        firstNumber = '10';
        secondNumber = '5';
        operation = '*';

        const result = calculate();

        expect(result).toBe(50);
    });

    test("division", () => {
        firstNumber = '10';
        secondNumber = '5';
        operation = '/';

        const result = calculate();

        expect(result).toBe(2);        
    });

    test("division by 0", () => {
        firstNumber = '10';
        secondNumber = '0';
        operation = '/';

        const result = calculate();

        expect(result).toBeUndefined()        
        expect(console.error).toHaveBeenCalledWith("Cannot divide by zero");
    });

    test("modulo", () => {
        firstNumber = '10';
        secondNumber = '5';
        operation = '%';

        const result = calculate();

        expect(result).toBe(0);        
    });

    test("modulo of 0", () => {
        firstNumber = '10';
        secondNumber = '0';
        operation = '%';

        const result = calculate();

        expect(result).toBeNaN();
        expect(console.error).toHaveBeenCalledWith("Cannot find modulo of zero")
    });
});