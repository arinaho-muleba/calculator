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

                          
                case "arcsin(":
                result.value +="arcsin(";
                expression +="Math.asin("
                break;

                case "arccos(":
                result.value +="arccos(";
                expression +="Math.acos("
                break;

                case "arctan(":
                result.value +="arctan(";
                expression +="Math.atan("
                break;

                case "^":
                    result.value +="^";
                    expression +="**"
                    break;

                case "²":
                    result.value +="²";
                    expression +="**2"
                    break;
                
                case "³":
                    result.value +="³";
                    expression +="**3"
                    break;
        
                    case "exp(":
                        result.value +="exp(";
                        expression +="Math.exp("
                        break;
                
                case "log10(":
                    result.value +="log10(";
                    expression +="Math.log("
                    break;

                case "√":
                    result.value +="sqrt(";
                    expression +="Math.sqrt("
                    break;

                case "∛":
                    result.value +="cbrt(";
                    expression +="cuber("
                    break;

                case "ln(":
                    result.value +="ln(";
                    expression +="Math.log("
                    break;

                    
                case "10^":
                    result.value +="10^";
                    expression +="10**"
                    break;

                case "!":
                    result.value +="fact(";
                    expression +="factorial("
                    break;


                    
                    




                case "=":
                    try{
                 result.value = eval(expression);
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

        function cuber(num){
            return num **(1/3);
        }

        function tenToThePower(exponent){
            return 10**exponent;
        }
    

    // Function to calculate factorial
    function factorial(num) {
        if (num === 0 || num === 1) {
            return 1;
        } else {
            return num * factorial(num - 1);
        }
    }

    function convertToJS(expression){
            return expression.replaceAll("sin(","Math.sin(")
    }
});