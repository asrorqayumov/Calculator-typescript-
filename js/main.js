var Calculator = /** @class */ (function () {
    function Calculator(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    Calculator.prototype.clear = function () {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    };
    Calculator.prototype.delete = function () {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    };
    Calculator.prototype.appendNumber = function (number) {
        if (number === "." && this.currentOperand.includes("."))
            return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    };
    Calculator.prototype.chooseOperation = function (operation) {
        if (this.currentOperand === "")
            return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    };
    Calculator.prototype.compute = function () {
        var computation;
        var prev = parseFloat(this.previousOperand);
        var current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current))
            return;
        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
            case "÷":
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    };
    Calculator.prototype.updateDisplay = function () {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = "".concat(this.previousOperand, " ").concat(this.operation);
        }
        else {
            this.previousOperandTextElement.innerText = "";
        }
    };
    return Calculator;
}());
var numberButtons = document.querySelectorAll("[data-number]");
var operationButtons = document.querySelectorAll("[data-operation]");
var equalsButton = document.querySelector("[data-equals]");
var deleteButton = document.querySelector("[data-delete]");
var allClearButton = document.querySelector("[data-all-clear]");
var previousOperandTextElement = document.querySelector("[data-previous-operand]");
var currentOperandTextElement = document.querySelector("[data-current-operand]");
var calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
numberButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});
operationButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});
equalsButton.addEventListener("click", function () {
    calculator.compute();
    calculator.updateDisplay();
});
allClearButton.addEventListener("click", function () {
    calculator.clear();
    calculator.updateDisplay();
});
deleteButton.addEventListener("click", function () {
    calculator.delete();
    calculator.updateDisplay();
});
