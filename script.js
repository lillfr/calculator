function add(a, b) {
    return a + b;
}
function substract(a, b) {
    return a - b;
}
function multiply (a, b) {
    return a * b;
}
function divide (a, b) {
    return a / b;
}

function operate (a, b, op) {
    a = +a;
    b = +b;
    let res;
    switch (op) {
        case '+': 
            res = add(a, b);
            break;
        case '-': 
            res = substract(a, b);
            break;
        case '*': 
            res = multiply(a, b);
            break;
        case '÷': 
            if (b == 0) {
                wasErr = true;
                return 'your calculator farted..'; 
            }
            res = divide(a, b);
            break;
    }
    return +(res.toFixed(10)).toString()
}

function clearEverything() {
    a = '';
    b = '';
    op = '';
    text.innerHTML = '';
    wasNum = false;
    wasDot = false;
    wasEqual = false;
    wasErr = false;
}

let a = '';
let b = '';
let op = '';
let wasNum = false;
let wasEqual = false;
let wasDot = false;
let wasErr = false;
const text = document.querySelector('#text');

const digits = document.querySelectorAll(".digit");
digits.forEach(digit => {
    digit.addEventListener('click', (e) => {
        if (wasErr) {
            clearEverything();
            console.log('aboba2');
        }
        if (wasNum) {
            wasNum = false;
            text.innerHTML = '';
        }
        if (wasEqual) {
            clearEverything();
        }
        text.innerHTML += e.target.innerHTML;
        if (op == '') a += e.target.innerHTML;
        else b += e.target.innerHTML;
    });
});

const dot = document.querySelector(".dot");
dot.addEventListener('click', (e) => {
    if (!wasDot) {
        if (wasNum) {
            text.innerHTML = '';
        }
        wasDot = true;
        text.innerHTML += '.';
        if (op == '') a += e.target.innerHTML;
        else b += e.target.innerHTML;
    }
});

const operators = document.querySelectorAll(".operator");
operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        if (wasErr) {
            clearEverything();
        } else {
            wasDot = false;
            if (a == '') {
                a = '0';
                text.innerHTML = '0';
                wasNum = true;
            }
            if (a != '' && b != '') {
                text.innerHTML = operate(a, b, op);
                if (!wasErr) {
                    a = text.innerHTML;
                    b = '';
                    wasNum = true;
                }
            }
            if (wasEqual) {
                wasEqual = false;
                a = text.innerHTML;
                b = '';
            }
            if (e.target.innerHTML == '&divide;') op = '/';
            else op = e.target.innerHTML;
            wasNum = true;
        }
    });
});

const clear = document.querySelector("#clear");
clear.addEventListener('click', (e) => {
    clearEverything();
});

const del = document.querySelector("#del");
del.addEventListener('click', (e) => {
    if (wasErr) {
        clearEverything();
    } else {
        let str = text.innerHTML;
        str = str.slice(0, str.length-1);
        text.innerHTML = str;
        if (wasEqual) {
            wasEqual = false;
            a = str;
            b = '';
            op = '';
        } else if (op != '') {
            b = str;
        } else {
            a = str;
            op = '';
            b = '';
            wasNum = true;
        }
    }
});

const equal = document.querySelector('#equal');
equal.onclick = () => {
    wasDot = false;
    if (a == '') {
        text.innerHTML = '0';
    } else if (b == '') {
        text.innerHTML = a;
    } else {
        text.innerHTML = operate(a, b, op);
    }
    wasEqual = true;
};