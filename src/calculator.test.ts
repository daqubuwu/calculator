import { calculate } from './calculator';

describe('Calculator', () => {
    describe('Arabic numbers', () => {
        test('basic operations', () => {
            expect(calculate('1 + 2')).toBe('3');
            expect(calculate('5 - 3')).toBe('2');
            expect(calculate('2 * 3')).toBe('6');
            expect(calculate('6 / 2')).toBe('3');
        });

        test('operator precedence', () => {
            expect(calculate('1 + 2 * 3')).toBe('7');
            expect(calculate('(1 + 2) * 3')).toBe('9');
        });

        test('advanced operations', () => {
            expect(calculate('2 ^ 3')).toBe('8');
            expect(calculate('sqrt 16')).toBe('4');
            expect(calculate('5!')).toBe('120');
        });

        test('invalid expressions', () => {
            expect(() => calculate('1 +')).toThrow();
            expect(() => calculate('+ 1')).toThrow();
            expect(() => calculate('1 + 1 +')).toThrow();
        });

        test('out of range', () => {
            expect(() => calculate('0 + 1')).toThrow();
            expect(() => calculate('101 + 1')).toThrow();
        });
    });

    describe('Roman numbers', () => {
        test('basic operations', () => {
            expect(calculate('I + II')).toBe('III');
            expect(calculate('V - III')).toBe('II');
            expect(calculate('II * III')).toBe('VI');
            expect(calculate('VI / II')).toBe('III');
        });

        test('operator precedence', () => {
            expect(calculate('I + II * III')).toBe('VII');
            expect(calculate('(I + II) * III')).toBe('IX');
        });

        test('advanced operations', () => {
            expect(calculate('II ^ III')).toBe('VIII');
            expect(calculate('sqrt XVI')).toBe('IV');
            expect(calculate('V!')).toBe('CXX');
        });

        test('invalid results', () => {
            expect(calculate('I - II')).toBe('');
            expect(calculate('sqrt I')).toBe('I');
        });

        test('mixed numerals', () => {
            expect(() => calculate('I + 1')).toThrow();
        });
    });
});