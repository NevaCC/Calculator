// Neva Campbell
// JavaScript for calculator


//calculator object
const calculator = {
    numDisplayed: '0',
    firstOperand: null,
    secondOperandInput: false,
    operator: null
};

function inputNumber(num) {
    const { numDisplayed, secondOperandInput } = calculator;

    if(secondOperandInput === true) {
        calculator.numDisplayed = num;
        calculator.secondOperandInput = false;
    }
    else {
        //if numDisplayed is 0, overwrite; append numbers if not 0
        calculator.numDisplayed = numDisplayed === '0' ? num : numDisplayed + num;
    }

    console.log(calculator);
}

function inputDecimal (dec) {
    //prevent decimal from being appended to input after pressing operator
    if(calculator.secondOperandInput === true) {
        calculator.numDisplayed = '0.';
        calculator.secondOperandInput = false;
        return;
    }

    //determine if numDisplayed contains a decimal
    if(!calculator.numDisplayed.includes(dec)) {
        //add decimal point
        calculator.numDisplayed += dec;
    }
}

function operationHandler(operatorClicked) {
    //destructure calculator object properties
    const { firstOperand, numDisplayed, operator } = calculator;
    //convert numDisplayed to floating point number
    const inputNum = parseFloat(numDisplayed);

    //allows user to change operator
    if(operator && calculator.secondOperandInput) {
        calculator.operator = operatorClicked;
        console.log(calculator);
        return;
    }

    //determine if firstOperand is null and if inputNum is not a NaN value
    if(firstOperand === null && !isNaN(inputNum)) {
        //store value in firstOperand property
        calculator.firstOperand = inputNum;
    }
    else if(operator) {
        const result = evaluate(firstOperand, inputNum, operator);

        calculator.numDisplayed = `${parseFloat(result.toFixed(6))}`;
        calculator.firstOperand = result; 
    }

    calculator.secondOperandInput = true;
    calculator.operator = operatorClicked;
    
    console.log(calculator);
}

function evaluate(firstOperand, secondOperand, operator) {
    switch(operator) {
        case '/':
            return firstOperand / secondOperand;
            break;
        case '*':
            return firstOperand * secondOperand;
            break;
        case '-':
            return firstOperand - secondOperand;
            break;
        case '+':
            return firstOperand + secondOperand;
            break;
        default:
            return secondOperand;
    }
}

function clearCalculator() {
    calculator.numDisplayed = '0';
    calculator.firstOperand = null;
    calculator.secondOperandInput = false;
    calculator.operator = null;
    console.log(calculator);
}

function updateCalcDisplay() {
    //select calculator display
    const calcDisplay = document.querySelector('.calculatorDisplay');
    //update value in calculator display
    calcDisplay.value = calculator.numDisplayed;
}

updateCalcDisplay();

//handle all button clicks
const keys = document.querySelector('.calculatorKeys');
keys.addEventListener('click', (event) => {
    //clicked element
    const { target } = event;

    //determine if clicked element is a button
    if(!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operatorBtn')) {
        operationHandler(target.value);
        updateCalcDisplay();
        return;
    }

    if (target.classList.contains('decimalBtn')) {
        inputDecimal(target.value);
        updateCalcDisplay();
        return;
    }

    if (target.classList.contains('clearBtn')) {
        clearCalculator();
        updateCalcDisplay();
        return;
    }

    inputNumber(target.value);
    updateCalcDisplay();
});