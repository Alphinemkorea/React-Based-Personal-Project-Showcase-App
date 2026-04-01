/**
 * Simple Calculator with History Tracking
 */

// 1. Determine the Design: Track Operation History
const calculationHistory = [];

function addToHistory(num1, num2, operator, result) {
    const calculationEntry = {
        operands: [num1, num2],
        operator: operator,
        result: result
    };
    calculationHistory.push(calculationEntry);
}

// 2. Simple Operations
function add(a, b) {
    const result = a + b;
    addToHistory(a, b, '+', result);
    return result;
}

function subtract(a, b) {
    const result = a - b;
    addToHistory(a, b, '-', result);
    return result;
}

function multiply(a, b) {
    const result = a * b;
    addToHistory(a, b, '*', result);
    return result;
}

function divide(a, b) {
    if (b === 0) {
        console.error("Error: Cannot divide by zero.");
        return null;
    }
    const result = a / b;
    addToHistory(a, b, '/', result);
    return result;
}

// 3. Display History
function displayHistory() {
    console.log("\n--- Calculation History Log ---");

    if (calculationHistory.length === 0) {
        console.log("History is empty.");
    } else {
        calculationHistory.forEach((entry, index) => {
            const [n1, n2] = entry.operands;
            console.log(`${index + 1}: ${n1} ${entry.operator} ${n2} = ${entry.result}`);
        });
    }
    console.log("-------------------------------\n");
}

// 4. Test and Refine
// Running various test cases
add(10, 5);
subtract(20, 8);
multiply(4, 3);
divide(100, 2);
displayHistory();