const romanToArabicMap: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
};

const arabicToRomanMap: [number, string][] = [
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
];

export function isRomanNumber(str: string): boolean {
    return /^[IVXLCDM]+$/i.test(str);
}

export function romanToArabic(roman: string): number {
    let result = 0;
    let prevValue = 0;
    
    for (let i = roman.length - 1; i >= 0; i--) {
        const currentChar = roman[i].toUpperCase();
        const currentValue = romanToArabicMap[currentChar];
        
        if (currentValue < prevValue) {
            result -= currentValue;
        } else {
            result += currentValue;
        }
        
        prevValue = currentValue;
    }
    
    return result;
}

export function arabicToRoman(arabic: number): string {
    if (arabic <= 0) return '';
    
    let result = '';
    let remaining = arabic;
    
    for (const [value, symbol] of arabicToRomanMap) {
        while (remaining >= value) {
            result += symbol;
            remaining -= value;
        }
    }
    
    return result;
}