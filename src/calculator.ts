import { isRomanNumber, romanToArabic, arabicToRoman } from './romanNumerals';

function factorial(n: number): number {
    if (n < 0) throw new Error('Факториал отрицателен');
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

function evaluateExpression(a: number, b: number, operator: string): number {
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        case '^': return Math.pow(a, b);
        default: throw new Error(`Неизвестный знак: ${operator}`);
    }
}

function evaluateSingleOperation(value: number, operator: string): number {
    switch (operator) {
        case 'sqrt': return Math.sqrt(value);
        case '!': return factorial(value);
        default: throw new Error(`Неизвестный знак: ${operator}`);
    }
}

function isSingleOperation(operator: string): boolean {
    return operator === 'sqrt' || operator === '!';
}

function getPrecedence(operator: string): number {
    if (operator === '^') return 4;
    if (operator === '!' || operator === 'sqrt') return 4;
    if (operator === '*' || operator === '/') return 3;
    if (operator === '+' || operator === '-') return 2;
    return 0;
}

function applyOperator(operators: string[], values: number[]) {
    const operator = operators.pop()!;
    
    if (isSingleOperation(operator)) {
        const value = values.pop()!;
        values.push(evaluateSingleOperation(value, operator));
    } else {
        const b = values.pop()!;
        const a = values.pop()!;
        values.push(evaluateExpression(a, b, operator));
    }
}

export function calculate(expression: string): string {
    const tokens = expression.match(/([IVXLCDM]+|\d+|\+|-|\*|\/|\^|sqrt|!|\(|\))/gi);
    if (!tokens) throw new Error('Invalid expression');
    
    const isRoman = tokens.some(token => isRomanNumber(token));
    const hasArabic = tokens.some(token => /^\d+$/.test(token));
    
    if (isRoman && hasArabic) {
        throw new Error('Нельзя миксовать арабские и римские числа');
    }
    
    const operators: string[] = [];
    const values: number[] = [];
    
    for (const token of tokens) {
        if (/^[IVXLCDM]+$/i.test(token)) {
            const num = romanToArabic(token);
            if (num < 1 || num > 100) throw new Error('Число вне диапазона (1-100)');
            values.push(num);
        } else if (/^\d+$/.test(token)) {
            const num = parseInt(token, 10);
            if (num < 1 || num > 100) throw new Error('Число вне диапазона (1-100)');
            values.push(num);
        } else if (token === '(') {
            operators.push(token);
        } else if (token === ')') {
            while (operators.length && operators[operators.length - 1] !== '(') {
                applyOperator(operators, values);
            }
            operators.pop(); // Remove '('
        } else {
            while (
                operators.length &&
                operators[operators.length - 1] !== '(' &&
                getPrecedence(operators[operators.length - 1]) >= getPrecedence(token)
            ) {
                applyOperator(operators, values);
            }
            operators.push(token);
        }
    }
    
    while (operators.length) {
        applyOperator(operators, values);
    }
    
    if (values.length !== 1) throw new Error('Invalid expression');
    
    const result = values[0];
    
    if (isRoman) {
        if (result < 1) return '';
        return arabicToRoman(Math.round(result));
    } else {
        return result.toString();
    }
}