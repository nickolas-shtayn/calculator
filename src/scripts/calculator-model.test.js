import { calculate, appendToFirstNumber, getResult,
         appendToSecondNumber, setOperation, clear } from "./calculator-model";

describe("Calculate", () => {
    test("addition", () => {
        appendToFirstNumber('10');
        appendToSecondNumber('5');
        setOperation('+');

        calculate();

        expect(getResult()).toBe(15);
        clear()
    });

    test("subtraction", () => {
        appendToFirstNumber('10');
        appendToSecondNumber('5');
        setOperation('-');

        calculate();

        expect(getResult()).toBe(5);
        clear()
    });

    test("multiplication", () => {
        appendToFirstNumber('10');
        appendToSecondNumber('5');
        setOperation('*')

        calculate();

        expect(getResult()).toBe(50);
        clear()
    });

    test("division", () => {
        appendToFirstNumber('10');
        appendToSecondNumber('5');
        setOperation('/');

        calculate();

        expect(getResult()).toBe(2);  
        clear()      
    });

    test("division by 0", () => {
        jest.spyOn(console, 'error');

        appendToFirstNumber('10');
        appendToSecondNumber('0');
        setOperation('/');

        calculate();

        expect(getResult()).toBe('');        
        expect(console.error).toHaveBeenCalledWith("Cannot divide by zero");
        
        jest.clearAllMocks();
        clear()
    });

    test("modulo", () => {
        appendToFirstNumber('10');
        appendToSecondNumber('5');
        setOperation('%');

        calculate();

        expect(getResult()).toBe(0); 
        clear()       
    });

    test("modulo of 0", () => {
        jest.spyOn(console, 'error');

        appendToFirstNumber('10');
        appendToSecondNumber('0');
        setOperation('%');

        calculate();

        expect(getResult()).toBe('');
        expect(console.error).toHaveBeenCalledWith("Cannot find modulo of zero");
        
        jest.clearAllMocks();
        clear()
    });
});