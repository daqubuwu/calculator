import React, { useState } from 'react';
import { calculate } from './calculator';

const App: React.FC = () => {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const handleCalculate = () => {
        try {
            setError('');
            const calculatedResult = calculate(expression);
            setResult(calculatedResult);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
            setResult('');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '200px', fontFamily: 'Inter', }}>
            <h1 style={{ textAlign: 'center' }}>Калькулятор</h1>
            
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                    placeholder="Введите выражение (например: 1 + 2 или VII * III)"
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        boxSizing: 'border-box'
                    }}
                />
            </div>
            
            <div style={{ marginBottom: '10px' }}>
                <button
                    onClick={handleCalculate}
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Посчитать
                </button>
            </div>
            
            {error && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                    Ошибка: {error}
                </div>
            )}
            
            <div style={{
                padding: '10px',
                border: '1px solid #ddd',
                minHeight: '20px'
            }}>
                <strong>Результат:</strong> {result}
            </div>
            
            <div style={{ marginTop: '20px' }}>
                <h3>Примеры:</h3>
                <div>
                    <p>3 + 4 * 2</p>
                    <p>(3 + 4) * 2</p>
                    <p>5! + 3</p>
                    <p>sqrt 16 + 3</p>
                    <p>VII * III</p>
                    <p>(X + V) * II</p>
                </div>
            </div>
        </div>
    );
};

export default App;