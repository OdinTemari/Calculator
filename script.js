function updateDisplay(inputKey){
    //update contents of the display panel
    let string = displaypanel.textContent.replace (' ', '');
    if (string !== '') {
        if (string.charAt(0) =='0') {
            displaypanel.textContent = string.replace(string.charAt(0),'');
        }
    }

    if (displaypanel.textContent.length==numdigits) {
        return; // do not accept more inputs
    }
    if (lastOperation=='=') {
        displaypanel.textContent='';
    }
    displaypanel.textContent= displaypanel.textContent + inputKey;

}

function handleOperation(symbol) {
    if (symbol=='AC') {
        displaypanel.textContent='0';
        lastOperation='';
        return;
    }
    lastOperation=symbol; 
    
    let string= displaypanel.textContent;
    string = string.replace (' ', '');
    let str= string.split(/(?=\-)|(?=\+)|(?=\*)|(?=\/)/g)
    if (str.length<2) {
        // Only one number found
        if (symbol !== '=') {
            displaypanel.textContent= displaypanel.textContent + symbol;
        }
        return //[Number(str[0]), [], ''];
    }
    operand= str[1].charAt(0);
    str[1]= str[1].replace(str[1].charAt(0), '');
    if (str[1]=='') {
        // no second number
        return //[Number(str[0]), [], ''];
    }

    let result=0;
    if (!operand || operand == "") {
        // only first number passed
        result= Number(str[0]); // a;
    } else if (operand.includes('+')) {
        result= Number(str[0]) + Number(str[1]); //. return a+b;
    } else if (operand.includes('-')) {
        result= Number(str[0]) - Number(str[1]); //return a-b;
    } else if (operand.includes('/')) {
        result= Number(str[0]) / Number(str[1]); //return a/b;
    } else if (operand.includes('*') || operand.includes ('x')) {
        result= Number(str[0]) * Number(str[1]); //return a*b;
    } else {
        return "Error: Invalid Operand";
    }

    if (symbol !== '=') {
        displaypanel.textContent= result + symbol;
    } else {
        displaypanel.textContent= result;
    };
    
}


const numdigits=10; // number of digits
let lastOperation='';
let displaypanel= document.getElementById("display-main");
let numkeys= document.getElementsByClassName("keys-number");
for (let i=0; i<numkeys.length; i++) {
    // assign call back to each key
    numkeys.item(i).addEventListener('click', function() {
        updateDisplay(this.textContent);
    });
};

let opskey= document.getElementsByClassName("keys-operator");
for (let i=0; i < opskey.length; i++) {
    opskey.item(i).addEventListener('click', function() {
        handleOperation(this.textContent);
    });
}

// To do ===========================
// round results to available space (trailing zeros a problem)
// log to history panel
// back space key
// % key
// ===================================

window.addEventListener("keydown", function (e) {
    //3console.log(e.keyCode); //96-105 is 0 to 9; 106 *, 111 /, 107 +, 109 -
    if (e.keyCode >= 96 && e.keyCode <=105) {
        // numbers pressed
        updateDisplay((e.keyCode-96)); //Sends 0-9 
    } else if (e.keyCode==110) {
        updateDisplay('.');

    } else if (e.keyCode==106) {
        // operand button pressed
        handleOperation('*')
    } else if (e.keyCode==111) {
        // operand button pressed
        handleOperation('/')
    } else if (e.keyCode==107) {
        // operand button pressed
        handleOperation('+')
    } else if (e.keyCode==109) {
        // operand button pressed
        handleOperation('-')
    } else if (e.keyCode==13) {
        // enter key pressed
        handleOperation('=')
    } else if (e.keyCode==27) {
        // esc key pressed
        handleOperation('AC');

    }});