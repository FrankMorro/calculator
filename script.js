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
let calculate = 0
let lastEntry = 'NONE'

const DEFAULT_DISPLAY_NUMBER = 12

const entry = {
  none: 'NONE',
  digit: 'DIGIT',
  operator: 'OPERATOR',
  equals: 'EQUALS',
  ce: 'CE',
}

clear()

// Function Section
function clear() {
  currentOperandDisplay.textContent = '0'
  currentOperand = '0'
  // operation = undefined
  lastEntry = entry.ce
  changeTextSize(40)
}

function allClear() {
  currentOperandDisplay.textContent = '0'
  previousOperandDisplay.textContent = ''
  previousOperand = ''
  currentResult = 0
  currentOperation = ''
  operation = undefined
  clear()
  lastEntry = entry.none
  changeTextSize(40)
}

function backspace() {
  if (lastEntry === entry.operator) return

  if (lastEntry === entry.equals) {
    allClear()
    return
  }

  if (currentOperandDisplay.textContent.length === 1) {
    currentOperandDisplay.textContent = '0'
    currentOperand = '0'
  } else {
    currentOperandDisplay.textContent = currentOperand.toString().slice(0, -1)

    currentOperand = Number(currentOperandDisplay.textContent)
  }

  currentOperandDisplay.textContent = getDisplayNumber(
    currentOperandDisplay.textContent
  )

  if (currentOperand.length >= DEFAULT_DISPLAY_NUMBER) {
    changeTextSize(30)
  } else {
    changeTextSize(40)
  }
  lastEntry = entry.digit
}

function changeTextSize(num) {
  let font = parseInt(num)
  currentOperandDisplay.style.fontSize = font + 'px'
}

function appendDigit(number) {
  console.log(currentOperand)

  if (currentOperand.length >= 16) return

  if (currentOperand.length >= DEFAULT_DISPLAY_NUMBER) {
    changeTextSize(30)
  } else {
    changeTextSize(40)
  }

  if (
    number === '\u002E' &&
    currentOperand.toString().includes('\u002E') &&
    lastEntry !== entry.equals
  )
    return

  if (currentOperandDisplay.textContent === '0') {
    currentOperand = ''
  }

  // console.log(lastEntry)
  if (lastEntry === entry.equals) {
    previousOperandDisplay.textContent = ''
  }

  if (lastEntry !== entry.digit) {
    currentOperand = ''
    // lastEntry = entry.digit
  }

  if (
    (lastEntry === entry.none || lastEntry === entry.equals) &&
    number === '\u002E'
  ) {
    currentOperand = '0'
  }

  lastEntry = entry.digit

  currentOperand += number.toString()

  //lastEntry = entry.digit
}

function chooseOperation(operationCurrent) {
  if (currentOperand === '') {
    operation = operationCurrent
    currentOperation = operationCurrent
    return
  }

  if (previousOperand !== '') {
    compute()
  }

  operation = operationCurrent
  currentOperation = operationCurrent
  previousOperand = currentOperand
  currentOperand = ''

  // console.log('prev ' + previousOperand)
  // console.log('last ' + lastEntry)
  // console.log('operator ' + entry.operator)
  // console.log(lastEntry === entry.digit)

  previousOperandDisplay.textContent = previousOperand + ' ' + operationCurrent

  if (lastEntry === entry.digit) {
    currentOperandDisplay.textContent = previousOperand
  }

  lastEntry = entry.operator

  // console.log('operation ' + operationCurrent)
  // console.log('previo ' + previousOperand)
}

function compute() {
  operand1 = parseFloat(previousOperand)
  operand2 = parseFloat(currentOperand)

  // console.log(operand1, operand2)

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
  previousOperand = calculate
  currentOperand = calculate
  operation = undefined

  if (calculate.toString().length >= 16) {
    changeTextSize(26)
  } else if (calculate.toString().length >= DEFAULT_DISPLAY_NUMBER) {
    changeTextSize(30)
  } else {
    changeTextSize(40)
  }

  previousOperandDisplay.textContent = calculate.toString()
  currentOperandDisplay.textContent = calculate.toString()
  previousOperand = ''
}

function updateDisplay() {
  currentOperandDisplay.textContent = getDisplayNumber(currentOperand)

  if (lastEntry === entry.operator) {
    currentOperandDisplay.textContent = getDisplayNumber(previousOperand)
    currentOperand = ''
  }

  if (operation !== undefined) {
    previousOperandDisplay.textContent = `${getDisplayNumber(
      previousOperand
    )} ${operation}`
  } else {
    if (currentOperation === '') return

    if (lastEntry === entry.equals) {
      previousOperandDisplay.textContent = `${getDisplayNumber(
        operand1
      )} ${currentOperation} ${getDisplayNumber(operand2)} =`
    }
  }
}

function getDisplayNumber(number) {
  const stringNumber = number.toString()
  const integerDigits = parseFloat(stringNumber.split('.')[0])
  const decimalDigits = stringNumber.split('.')[1]
  let integerDisplay
  if (isNaN(integerDigits)) {
    integerDisplay = ''
  } else {
    integerDisplay = integerDigits.toLocaleString('en', {
      maximumFractionDigits: 0,
    })
  }
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`
  } else {
    return integerDisplay
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
  previousOperand = currentOperand
  lastEntry = entry.equals
  updateDisplay()
})

// function newCompute() {
//   lastEntry = entry.equals
// }
