//  Display Section
const previousOperandDisplay = document.querySelector('[data-previous-operand]')
const currentOperandDisplay = document.querySelector('[data-current-operand]')

// Clear and backspace section
const percentageButton = document.querySelector(['data-percentage'])
const clearButton = document.querySelector(['data-clear'])
const allClearButton = document.querySelector(['data-all-clear'])
const backspaceButton = document.querySelector(['data-backspace'])

// Math Function section
const frac1xButton = document.querySelector(['data-frac1x'])
const squareButton = document.querySelector(['data-square'])
const daricButton = document.querySelector(['data-daric'])

// Digit, operation and equals section
const digitButtons = document.querySelectorAll(['data-digit'])
const operationButtons = document.querySelectorAll(['data-operation'])
const equalsButton = document.querySelector(['data-equals'])

// Event Listeners
// Percentage Button
percentageButton.addEventListener('click', () => {})
// Clear Button
clearButton.addEventListener('click', () => {})
// All Clear Button
allClearButton.addEventListener('click', () => {})
// Backspace Button
backspaceButton.addEventListener('click', () => {})

// Frac1x Button
frac1xButton.addEventListener('click', () => {})
//Square Button
squareButton.addEventListener('click', () => {})
// Daric Button
daricButton.addEventListener('click', () => {})

// Equals Button
// Digit Buttons
digitButtons.forEach((button) => {
  button.addEventListener('click', () => {})
})
// Operation Buttons
operationButtons.forEach((button) => {
  button.addEventListener('click', () => {})
})
equalsButton.addEventListener('click', () => {})
