document.addEventListener('DOMContentLoaded', function () {
    // Selecting elements
    const result = document.getElementById('result');
    let expression = "";
    const buttons = document.querySelectorAll('.buttons button');

    // Adding click event listener to all buttons
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            handleButtonClick(this.value);
           console.log(expression);
        });
    });

    // Function to handle button click
    function handleButtonClick(value) {

        switch(value){

            case "c":
                result.value = "";
                expression= "";
                break;

                case "backspace":
                result.value = result.value.slice(0, -1);
                expression = expression.slice(0, -1);
                //todo: handle the deletions of e & pi
                break;

                case "e":
                result.value +="e";
                expression +="Math.E"
                break;

                case "π":
                result.value +="π";
                expression +="Math.PI"
                break;

                case "sin(":
                result.value +="sin(";
                expression +="Math.sin("
                break;

                case "cos(":
                result.value +="cos(";
                expression +="Math.cos("
                break;

                case "tan(":
                result.value +="tan(";
                expression +="Math.tan("
                break;


                case "^":
                    result.value +="^";
                    expression +="**"
                    break;

                case "!":
                    result.value +="fact(";
                    expression +="factorial("
                    break;

                case "=":
                    try{
                 result.value = calculateExpression(result.value);
                    }catch(e){
                        result.value = e;
                    }
                    break;

            default:
                result.value += value;
                expression = expression+=value;
            break;

        }
        
        }
    
});

function calculateExpression(expression) {
    expression = expression.replace(new RegExp('e', 'g'), Math.E)
    .replace(new RegExp('π', 'g'), Math.PI);
    
    const tokens = tokenize(expression);
    const syntaxTree = parseExpression(tokens);
    const result = evaluateSyntaxTree(syntaxTree);
    return result;
  }
  
  function tokenize(expression) {
    return expression.match(/\d+\.?\d*|\+|\-|\*|\^|\/|\(|\)|sin|cos|tan|fact/g);
  }
  
  function parseExpression(tokens) {
    const outputQueue = [];
    const operatorStack = [];
  
    for (const token of tokens) {
      if (isNumeric(token)) {
        outputQueue.push(parseFloat(token));
      } else if (isOperator(token)) {
        while (
          operatorStack.length > 0 &&
          getOperatorPrecedence(operatorStack[operatorStack.length - 1]) >= getOperatorPrecedence(token)
        ) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
      } else if (isTrigFunction(token)) {
        operatorStack.push(token);
      } else if (token === '(') {
        operatorStack.push(token);
      } else if (token === ')') {
        while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.pop(); // Pop '('
      }
    }
  
    while (operatorStack.length > 0) {
      outputQueue.push(operatorStack.pop());
    }
  
    return outputQueue;
  }
  
  function evaluateSyntaxTree(syntaxTree) {
    const valueStack = [];
  
    for (const token of syntaxTree) {
      if (isNumeric(token)) {
        valueStack.push(token);
      } else if (isOperator(token)) {
        const b = valueStack.pop();
        const a = valueStack.pop();
        valueStack.push(applyOperator(a, b, token));
      } else if (isTrigFunction(token)) {
        const operand = valueStack.pop();
        valueStack.push(applyTrigFunction(operand, token));
      }
    }
  
    return valueStack.pop();
  }
  
  function isNumeric(token) {
    return !isNaN(parseFloat(token)) && isFinite(token);
  }
  
  function isOperator(token) {
    return token === '+' || token === '-' || token === '*' || token === '/' || token=='^';
  }
  
  function isTrigFunction(token) {
    return token === 'sin' || token === 'cos' || token === 'tan' || 'fact';
  }
  
  function getOperatorPrecedence(operator) {
    switch (operator) {
      case '+':
      case '-':
        return 1;
      case '*':
      case '/':
      case '^':
        return 2;
      case 'sin':
      case 'cos':
      case 'tan':
      case 'fact':
        return 3;

      case '^':
      case 'fact':
        return 4;
      default:
        return 0;
    }
  }
  
  function applyOperator(a, b, operator) {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return a / b;
      case '^':
        return a**b;
      default:
        return 0;
    }
  }
  
  function applyTrigFunction(operand, functionName) {
    switch (functionName) {
      case 'sin':
        return Math.sin(operand);
      case 'cos':
        return Math.cos(operand);
      case 'tan':
        return Math.tan(operand);
      case 'fact':
        return factorial(operand);
      default:
        return 0;
    }
  }

  //self defined math methods
      // Function to calculate factorial
      function factorial(num) {
        if (num === 0 || num === 1) {
            return 1;
        } else {
            return num * factorial(num - 1);
        }
    }
