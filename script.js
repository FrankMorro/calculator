//  Display Section
const previousOperandDisplay = document.querySelector('[data-previous-operand]')
const currentOperandDisplay = document.querySelector('[data-current-operand]')

// Clear and backspace section
const percentageButton = document.querySelector('[data-percentage]')
const clearButton = document.querySelector('[data-clear]')
const allClearButton = document.querySelector('[data-all-clear]')
const backspaceButton = document.querySelector('[data-backspace]')

// Math Function section
const frac1xButton = document.querySelector('[data-frac1x]')
const squareButton = document.querySelector('[data-square]')
const daricButton = document.querySelector('[data-daric]')

// Digit, operation and equals section
const digitButtons = document.querySelectorAll('[data-digit]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')

let currentOperand = '0'
let previousOperand = ''
let currentOperation = ''
let currentResult = 0
let operation = undefined

let operand1 = 0
let operand2 = 0

// Function Section
function clear() {
  currentOperandDisplay.textContent = '0'
  currentOperand = '0'
  operation = undefined
}

function allClear() {
  currentOperandDisplay.textContent = '0'
  previousOperandDisplay.textContent = ''
  previousOperand = ''
  currentResult = 0
  currentOperation = ''
  clear()
}

function backspace() {
  if (currentOperandDisplay.textContent.length === 1) {
    currentOperandDisplay.textContent = '0'
    currentOperand = '0'
  } else {
    currentOperandDisplay.textContent = currentOperandDisplay.textContent.slice(
      0,
      -1
    )
    currentOperand = Number(currentOperandDisplay.textContent)
  }
}

function appendDigit(number) {
  if (currentOperand.length > 13) return

  if (number === '.' && currentOperand.includes('.')) return

  if (currentOperand === '0') {
    currentOperand = ''
  }

  currentOperand += number.toString()
}

function chooseOperation(operationCurrent) {
  console.log('operador ' + operationCurrent)
  if (currentOperand === '') return

  if (previousOperand !== '') {
    compute()
  }

  operation = operationCurrent
  currentOperation = operationCurrent
  previousOperand = currentOperand
  currentOperand = ''

  //previousOperandDisplay.textContent = previousOperand + ' ' + operationCurrent

  console.log('operation ' + operationCurrent)
  console.log('previo ' + previousOperand)
}

function compute() {
  let calculate
  operand1 = parseFloat(previousOperand)
  operand2 = parseFloat(currentOperand)

  // TODO Quitar luego
  console.log(operand1, operation, operand2)

  if (isNaN(operand1) || isNaN(operand2)) return

  switch (operation) {
    case '÷':
      calculate = operand1 / operand2
      break

    case '×':
      calculate = operand1 * operand2
      break

    case '−':
      calculate = operand1 - operand2
      break

    case '+':
      calculate = operand1 + operand2
      break

    default:
      return
  }

  //currentOperand = calculate
  // previousOperand = calculate
  currentOperand = calculate
  operation = undefined

  previousOperandDisplay.textContent = previousOperand.toString()
  currentOperandDisplay.textContent = currentOperand.toString()
  //previousOperand = ''

  console.log(calculate)
}

function updateDisplay() {
  currentOperandDisplay.textContent = currentOperand

  if (operation !== undefined) {
    previousOperandDisplay.textContent = `${previousOperand} ${operation}`
  } else {
    previousOperandDisplay.textContent = `${operand1} ${currentOperation} ${operand2} =`
  }
}

// Event Listeners
// Percentage Button
percentageButton.addEventListener('click', (button) => {
  console.log('percentage')
})

// Clear Button
clearButton.addEventListener('click', () => {
  clear()
})

// All Clear Button
allClearButton.addEventListener('click', () => {
  allClear()
})

// Backspace Button
backspaceButton.addEventListener('click', () => {
  backspace()
})

// Frac1x Button
frac1xButton.addEventListener('click', () => {})

//Square Button
squareButton.addEventListener('click', () => {})

// Daric Button
daricButton.addEventListener('click', () => {})

// Digit Buttons
digitButtons.forEach((button) => {
  button.addEventListener('click', () => {
    appendDigit(button.textContent)
    updateDisplay()
  })
})

// Operation Buttons
operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    chooseOperation(button.textContent)
    updateDisplay()
  })
})

// Equals Button
equalsButton.addEventListener('click', () => {
  compute()
  updateDisplay()
})
