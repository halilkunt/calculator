(function createGridItems(){
    const buttons = {
        ac : {
            text : "AC",
            class : "expression",
            dataValue : "clear", 
        },
        negative : {
            text : "+/-",
            class : "expression",
            dataValue : "negative",

        },
        modulus : {
            text : "%",
            class : "expression",
            dataValue : "modulus",
        },
        divide : {
            text : "/",
            class : "operator",
            dataValue : "divide",
        },
        "+7" : {
            text : "7",
            class : "number",
            dataValue : "7",
        },
        "+8" :  {
            text : "8",
            class : "number",
            dataValue : "8",
        },
        "+9" :  {
            text : "9",
            class : "number",
            dataValue : "9",
        },
        multiply :  {
            text : "*",
            class : "operator",
            dataValue : "multiply",
        },
        "+4" :  {
            text : "4",
            class : "number",
            dataValue : "4",
        },
        "+5" :  {
            text : "5",
            class : "number",
            dataValue : "5",
        },
        "+6" :  {
            text : "6",
            class : "number",
            dataValue : "6",
        },
        substract :  {
            text : "-",
            class : "operator",
            dataValue : "substract",
        },
        "+1" :  {
            text : "1",
            class : "number",
            dataValue : "1",
        },
        "+2" :  {
            text : "2",
            class : "number",
            dataValue : "2",
        },
        "+3" :  {
            text : "3",
            class : "number",
            dataValue : "3",
        },
        add :  {
            text : "+",
            class : "operator",
            dataValue : "add",
        },
        "+0" :  {
            text : "0",
            class : "number",
            dataValue : "0",
        },
        dot :  {
            text : ".",
            class : "number",
            dataValue : "dot",
        },
        equal :  {
            text : "=",
            class : "operator",
            dataValue : "equal",
        }
    }


    for(let value in buttons){

        const gridContainer = document.querySelector(".calculator-buttons-grid");

        const gridItem = document.createElement("a");
       /* gridItem.classList.add("grid-item");*/    
        gridItem.classList.add(buttons[value].class);
        
        gridItem.innerText = buttons[value].text;

        const attribute = document.createAttribute("data-value");
        attribute.value = buttons[value].dataValue;
        gridItem.setAttributeNode(attribute);

        gridContainer.appendChild(gridItem);
    }

    loadFunctionality();

})();


let firstValue = secondValue = screenValue = operand = "undefined" ;


function loadFunctionality(){

    const buttons = document.querySelectorAll("a");
    
    buttons.forEach(button => button.addEventListener("click", calculate));
}


function calculate(){
    const operation = this.getAttribute("class");
    const dataValue = this.getAttribute("data-value");

    console.log(operation);

    if(operation === "expression"){
        switch(dataValue){
            case "clear":
                firstValue = secondValue = operand = "undefined";
                screenValue = 0;
                changeScreen();
                break;  
            case "negative":
                if(screenValue === firstValue){

                    screenValue *= -1;
                    if(screenValue.toString().length > 8){
                        screenValue = screenValue.toString().slice(0,8);
                    }
                    firstValue = screenValue;
                }else{
                    screenValue *= -1;
                    secondValue = screenValue;
                }
                changeScreen();
                break;     
            case "modulus":
                if(screenValue === firstValue){

                    screenValue /= 100;
                    firstValue = screenValue;
                }else{
                    screenValue /= 100;
                    secondValue = screenValue;
                }
                changeScreen();
                break;     
        }
    }else if(operation === "number"){
        if(firstValue === "undefined"){
            firstValue = dataValue;
            screenValue = firstValue;
            changeScreen();
        }else if(operand === "undefined"){
            if(firstValue.toString().length < 9){
                firstValue = `${firstValue}${dataValue}`;
                screenValue = firstValue;
                changeScreen();
            }
        }else if(secondValue === "undefined"){
            secondValue = dataValue;
            screenValue = secondValue;
            changeScreen();
        }else{
            if(secondValue.toString().length < 9){
                secondValue = `${secondValue}${dataValue}`;
                screenValue = secondValue;
                changeScreen();
            }
        }
    }else if(operation === "operator"){

        switch(operand){
            case "undefined":
                operand = dataValue;
                break;
            default:    
                if(dataValue === "equal" && firstValue !== "undefined" && secondValue !== "undefined"){
                    decideOperation(firstValue, secondValue, operand);
                    operand = "undefined";

                }
                else if(firstValue !== "undefined" && secondValue !== "undefined"){
                    decideOperation(firstValue, secondValue, operand);
                    operand = dataValue;
                }        
        }

    }else if(operation === "dot"){
        if(screenValue === firstValue){
            firstValue += "."
        }else if(screenValue === secondValue){
            secondValue += ".";
        }
    }
}

function decideOperation(first, second, operation){

    if(operation === "add"){
        firstValue = add(Number(first), Number(second));
        secondValue = "undefined";
        screenValue = firstValue;
        changeScreen();
    }else  if(operation === "substract"){
        firstValue = substract(Number(first), Number(second));
        secondValue = "undefined";
        screenValue = firstValue;
        changeScreen();
    }else  if(operation === "multiply"){
        firstValue = multiply(Number(first), Number(second));
        secondValue = "undefined";
        screenValue = firstValue;
        changeScreen();
    }else  if(operation === "divide"){
        firstValue = divide(Number(first), Number(second));
        secondValue = "undefined";
        screenValue = firstValue;
        changeScreen();
    }
}

function changeScreen(){
    const calculatorScreen = document.querySelector(".process");

    calculatorScreen.innerText = screenValue;
}

function add(a, b){
    return a+b;
}

function substract(a, b){
    return a-b;
}

function multiply(a, b){
    const result = a * b;
    if(result.toString().length > 8){
        return result.toPrecision(3);
    }
    return result;
}

function divide(a, b){
    const result = a/b;
    if(result.toString().length > 8){
        return result.toPrecision(7);
    }
    return result;
}