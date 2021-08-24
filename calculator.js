// Nick's JS calculator
// By Nick Roach 17/6/2021

let number1Flag = false; //used to flag when number1 has been input. Operation inputs will not be received until this flag is set to true
let number2Flag = false; //used to flag when number2 has been input. Equals will not work until this flag is set to true
let operationFlag = false; //used to flag when an operation has been input so that subsequent input digits will be appended to number2
let resultFlag = false; //this flag is used to prevent the appending of digits to number1 when it is a result of a previous calculation
let displayString = ""; //the string that is displayed in the display
let digit = "";

let number1 = ""; //the first number for the calculation
let number2 = ""; //the second numnber for the calculation
let operation = ""; //the operation that should be performed for the calculation


//update the display initially so that it displays "0"
updateDisplay();

//this function updates the display each time it is called
function updateDisplay() {
    if(number2.length > 1 && number2[0] === "0" && number2[1] !== "."){ //if the second number is 0 followed by a character that is not a decimal point, slice off that leading 0 i.e. do not allow eg. 003 as number 2 
        number2 = number2.slice(1);
    }

    if(number1.length > 1 && number1[0] === "0" && number1[1] !== "."){ //if the first number is 0 followed by a character that is not a decimal point, slice off that leading 0 i.e. do not allow eg. 003 as number1 
        number1 = number1.slice(1);
    }



    if(displayString.length > 13){
        alert("Display overflow. Display will be cleared"); //if the display is full, further operations can no longer be displayed and this is handled by raising this alert and clearing the display
        clear();
    }
    if(number1 === ""){
        document.getElementById("display").innerHTML = "0"; //if nothing has been input yet, display 0;
    }
    else {
        displayString = number1 + operation + number2; //the calculation that is being prepared for execution. It is in the form of a string and will only be converted to numbers when the calculation is to be executed
        document.getElementById("display").innerHTML = displayString; //put the display string in the display
    }

    // CONSOLE LOGS FOR DEBUGGING
    // console.clear();
    // console.log("number1: " + number1);
    // console.log("number2: " + number2);
    // console.log("operation: " + operation);
    // console.log("operationFlag: " + operationFlag);
    // console.log("number2[0]: " + number2[0]);
    // console.log("number2[1]: " + number2[1]);
    // console.log("number2.length: " + number2.length);
}


//NUMBER BUTTONS 

//Button "decimal"
document.getElementById("decimal").addEventListener("click", function() {
    if(operationFlag === false && resultFlag === false && displayString !== "0" && !number1.includes(".")){ //if an operation hasn't been put in yet and number 1 is not the result of a previous calculation, append the digit to number1
        number1 = number1 + ".";
        number1Flag = true;
    }
    else if(operationFlag === true && number2 !== "" && !number2.includes(".")){
        number2 = number2 + ".";
        number2Flag = true;
    }
    else if(operationFlag === false && resultFlag === false && displayString === "0"){
        number1 = "0.";
        number1Flag = true;
    }
    else if(operationFlag === true && number2 === ""){
        number2 = number2 + "0.";
        number2Flag = true;
    }
    updateDisplay();
});

//Button "0"
document.getElementById("zero").addEventListener("click", function() {
    if(operationFlag === false && resultFlag === false && displayString !== "0"){ //if an operation hasn't been put in yet and number 1 is not the result of a previous calculation, append the digit to number1
        number1 = number1 + "0";
        number1Flag = true;
    }
    else if(operationFlag === true && number2 !== "0"){ //if number 2 is already "0", don't append another "0"
        number2 = number2 + "0";
        number2Flag = true;
    }
    else if(displayString === "0"){
        number1 = "0"
        number1Flag = true;
    }
    updateDisplay();
});



//This adds event listeners for the buttons 1-9 and tells them to call the function "handler"
const buttonsOneToNine = document.getElementsByClassName('oneToNine');
for (let i = 0; i < buttonsOneToNine.length; ++i) {
    buttonsOneToNine[i].addEventListener('click', handler);
}



//This adds event listeners for the operation buttons and tells them to call the function "opHandler"
const opButtons = document.getElementsByClassName('operator');
for (let i = 0; i < opButtons.length; ++i) {
    opButtons[i].addEventListener('click', opHandler);
}




//1-9 BUTTON HANDLER FUNCTION. Handles button presses from 1-9
function handler(event) {
    if(operationFlag === false && resultFlag === false){ //if an operation hasn't been put in yet and number1 is not the result of a previous calculation, append the digit to number1
        number1 = number1 + event.target.value;
        number1Flag = true;
    }
    else if(operationFlag === true){ //if an operation has been selected, the digit should be appended to number2
        number2 = number2 + event.target.value;
        number2Flag = true;
    }
    updateDisplay();
}



//OPERATION BUTTON HANDLER FUNCTION. Handles operation button presses
function opHandler(event) {
    if(number2Flag){ //if number1, operator and number2 are populated, call the equals() function
        equals();
    }

    if(number1Flag === false){
        //if number1 has not been input yet, then ignore the operation input
    }
    else if (number2Flag === false){ //but if number1 is populated, but number2 isn't, set operation to "plus"
        operation = event.target.value;
        operationFlag = true;
    }
    updateDisplay();
}



function equals() { //this is set up as a separate function so it can be called by the operation buttons as well as equals
    if(number2){ //if number1, operation and number2 have been input
        switch(operation){
            case "+": 
                number1 = Number(number1) + Number(number2);
                break;  

            case "-":
                number1 = Number(number1) - Number(number2);
                break;

            case "×": 
                number1 = Number(number1) * Number(number2);
                break;

            case "÷": 
                number1 = Number(number1) / Number(number2);
                break;
        }
        
        resultFlag = true;
        number1Flag = true;
        number2Flag = false;
        operationFlag = false;
        number2 = "";
        operation = "";
    }
    updateDisplay();
}

//Button "="
document.getElementById("equals").addEventListener("click", function() {
    equals();
});

//This is a separate function so that it can be called on display overflow
function clear(){
        number1Flag = false;
        number2Flag = false;
        operationFlag = false;
        resultFlag = false;
    
        number1 = "";
        number2 = "";
        operation = "";
        displayString = "0";
    
        updateDisplay();
}



//Button "clear"
document.getElementById("clear").addEventListener("click", function() {
    clear();
});