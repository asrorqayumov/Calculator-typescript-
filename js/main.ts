class Calculator {
  currentOperand: string;
  previousOperand: string;
  operation: undefined | string;
  constructor(
    public previousOperandTextElement: HTMLElement,
    public currentOperandTextElement: HTMLElement
  ) {
    this.clear();
  }

  clear(): void {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete(): void {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number): void {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation): void {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute(): void {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
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
  }

  updateDisplay(): void {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");

const equalsButton = document.querySelector("[data-equals]") as HTMLElement;
const deleteButton = document.querySelector("[data-delete]") as HTMLElement;
const allClearButton = document.querySelector(
  "[data-all-clear]"
) as HTMLElement;
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
) as HTMLElement;
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
) as HTMLElement;

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button: any): void => {
  button.addEventListener("click", (): void => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button: Element): void => {
  button.addEventListener("click", (): void => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (): void => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (): void => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (): void => {
  calculator.delete();
  calculator.updateDisplay();
});
