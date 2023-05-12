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
const plusMnButton = document.querySelector('[data-plusmn]')

let currentOperand = '0'
let previousOperand = ''
let currentOperation = ''
let currentResult = 0
let operation = undefined

let operand1 = 0
let operand2 = 0
let calculate = 0
let lastEntry = 'NONE'
let isError = false

const DEFAULT_DISPLAY_NUMBER = 12

const entry = {
  none: 'NONE',
  digit: 'DIGIT',
  operator: 'OPERATOR',
  equals: 'EQUALS',
  function: 'FUNCTION',
  ce: 'CE',
}

clear()

// Function Section
function clear() {
  if (isError) {
    previousOperandDisplay.textContent = ''
  }

  currentOperandDisplay.textContent = '0'
  currentOperand = '0'
  calculate = 0
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
  if (isError) {
    allClear()
  }

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
  // console.log(currentOperand)

  if (isError) {
    previousOperandDisplay.textContent = ''
  }

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

  if (lastEntry === entry.equals) {
    previousOperandDisplay.textContent = ''
  }

  if (lastEntry !== entry.digit) {
    currentOperand = ''
  }

  if (
    (lastEntry === entry.none || lastEntry === entry.equals) &&
    number === '\u002E'
  ) {
    currentOperand = '0'
  }

  lastEntry = entry.digit

  currentOperand += number.toString()
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

  previousOperandDisplay.textContent = previousOperand + ' ' + operationCurrent

  if (lastEntry === entry.digit) {
    currentOperandDisplay.textContent = previousOperand
  }

  lastEntry = entry.operator
}

function compute() {
  if (lastEntry !== entry.equals) {
    operand1 = parseFloat(previousOperand)
    operand2 = parseFloat(currentOperand)
  }

  if (isNaN(operand1) || isNaN(operand2)) return

  switch (currentOperation) {
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
  // console.log(calculate, typeof calculate)
  if (calculate === Infinity || calculate === -Infinity) {
    clear()
    changeTextSize(24)
    isError = true
    currentOperandDisplay.textContent = 'No se puede dividir entre cero'
    return
  }

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

function square() {
  if (currentOperand === '0') {
    return
  }

  let square = 0.0

  if (lastEntry === entry.function) {
    square = Number(currentOperand) ** 2
    if (square === Infinity) {
      currentOperandDisplay.textContent = 'Desbordamiento'
      isError = true
      return
    } else {
      previousOperandDisplay.textContent = `sqr(${currentOperand})`
    }

    calculate = square
  }

  if (lastEntry === entry.equals || lastEntry === entry.digit) {
    square = Number(currentOperand) ** 2
    calculate = square
    previousOperandDisplay.textContent = `sqr(${currentOperand})`
  }

  if (lastEntry === entry.operator) {
    square = Number(previousOperand) ** 2
    calculate = square
    previousOperandDisplay.textContent = `sqr(${previousOperand})`
  }

  if (lastEntry === entry.digit) {
    currentOperand = ''
    // lastEntry = entry.equals
  }

  currentOperand = square

  if (square.toString().length >= DEFAULT_DISPLAY_NUMBER) {
    changeTextSize(30)
  } else {
    changeTextSize(40)
  }

  // currentOperandDisplay.textContent = getDisplayNumber(square.toFixed(6))
  currentOperandDisplay.textContent = getDisplayNumber(square)
  lastEntry = entry.function
}

function sqrt() {
  if (currentOperand < 0) {
    previousOperandDisplay.textContent = `\u221A${currentOperand}`
    currentOperandDisplay.textContent = 'Entrada no válida'
    currentOperand = ''
    return
  }

  let sqrt = Math.sqrt(Number(currentOperandDisplay.textContent))

  if (sqrt.toString().length >= 14) {
    changeTextSize(30)
  } else {
    changeTextSize(40)
  }

  previousOperandDisplay.textContent = `\u221A(${currentOperand})`
  currentOperandDisplay.textContent = sqrt

  currentOperand = sqrt
  lastEntry = entry.function
}

// Event Listeners
// Percentage Button
percentageButton.addEventListener('click', (button) => {
  // TODO Pendiente agregar funcionalidad
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
frac1xButton.addEventListener('click', () => {
  // console.log('current ' + currentOperand, typeof currentOperand)
  // console.log('prev ' + previousOperand, typeof previousOperand)

  if (currentOperand === '0') {
    return
  }

  let frac1x = 0

  console.log('lastEntry ', lastEntry)

  if (lastEntry === entry.function) {
    console.log('current FUNCTION ', currentOperand)
    frac1x = 1 / currentOperand

    if (frac1x === Infinity) {
      isError = true
      currentOperandDisplay.textContent = `Error`
      previousOperandDisplay.textContent = `1/(${currentOperand})`
      return
    } else {
      previousOperandDisplay.textContent = `1/(${currentOperand})`
    }
  }

  if (lastEntry === entry.equals || lastEntry === entry.digit) {
    console.log('current digit ', currentOperand)
    frac1x = 1 / currentOperand
    previousOperandDisplay.textContent = `1/(${currentOperand})`
  }

  // if (lastEntry === entry.digit) {
  //   frac1x = 1 / currentOperand
  //   previousOperandDisplay.textContent = `1/(${currentOperand})`
  // }

  if (lastEntry === entry.operator) {
    console.log('previous operand', previousOperand)
    frac1x = 1 / previousOperand
    previousOperandDisplay.textContent = `1/(${previousOperand})`
  }

  if (lastEntry === entry.digit) {
    currentOperand = ''
    lastEntry = entry.equals
  }

  currentOperand = frac1x

  if (frac1x.toString().length >= 18) {
    changeTextSize(30)
    frac1x = frac1x.toFixed(16)
  } else {
    changeTextSize(40)
  }

  currentOperandDisplay.textContent = frac1x
  lastEntry = entry.function
})

//Square Button
squareButton.addEventListener('click', () => {
  square()
})

// Daric Button
daricButton.addEventListener('click', () => {
  sqrt()
})

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
  if (lastEntry === entry.equals) {
    compute()
    return
  }

  compute()
  previousOperand = currentOperand
  lastEntry = entry.equals
  updateDisplay()
})

// PlusMn Button
plusMnButton.addEventListener('click', () => {
  console.log(currentOperand, typeof currentOperand)
  if (currentOperand === '0') {
    return
  }

  if (currentOperand.toString().includes('-')) {
    currentOperand = currentOperand.toString().replace('-', '')
  } else {
    currentOperand = '-' + currentOperand
  }

  currentOperandDisplay.textContent = getDisplayNumber(currentOperand)
})

// function hasMoreThanTenZeros(num) {
//   const str = num.toString();
//   const decimalIndex = str.indexOf('.');
//   if (decimalIndex === -1) {
//     return false;
//   }
//   const zerosAfterDecimal = str.length - decimalIndex - 1;
//   return zerosAfterDecimal > 10;
// }

// console.log(hasMoreThanTenZeros(0.00000000001)); // true
// console.log(hasMoreThanTenZeros(0.000000000001)); // false
