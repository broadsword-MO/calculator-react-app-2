import { useState } from 'react';
import { useEffect } from 'react'; // For keyboard use

// Use this instead of hooks import above, inside Codepen.io
// const { useState, useEffect } = React;

function App() {
    const [calc, setCalc] = useState('');
    const [result, setResult] = useState('');
    const [num, setNum] = useState('');
    // const [key, setKey] = useState('');

    const ops = ['/', '*', '+', '-'];
    const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    function evaluate(string) {
        return new Function('return ' + string)();
    }
    // Round to 6 decimal places
    function round(num) {
        return +(Math.round(num + 'e+6') + 'e-6');
    }

    const decHandler = (dec) => {
        if (num.toString().includes(dec)) {
            return; // Do nothing
        } else if (calc === '') {
            setNum(0 + dec); // Add a zero before decimal
            setCalc(0 + dec); // Ditto
        } else if (num === '') {
            setNum(0 + dec); // Add a zero before decimal
            setCalc(calc + 0 + dec); // Ditto
        } else {
            setNum(num + dec);
            setCalc(calc + dec);
            setResult(evaluate(calc + dec).toString());
        }
    };

    const updateNum = (value) => {
        if (calc.toString() === 'NaN' || (calc === '' && value === '0')) {
            // ?REVIEW Edge case for max digits needed?
            return;
        }
        setNum(num + value);
        setCalc(calc + value);
        setResult(evaluate(calc + value).toString());
    };

    const updateOper = (op) => {
        if (
            calc === '' || // calc display is empty
            calc.toString() === 'NaN' ||
            (calc.slice(-1) === '-' && op === '-')
        ) {
            // Or already have one minus operator
            return; // Do nothing

        // Trying
        } else if (ops.includes(calc.slice(-1)) && ops.includes(calc.slice(-2, -1))) {
            // Used two operators, so replace
            return setCalc(calc.slice(0, -2) + op);

        } else if (ops.includes(calc.slice(-1)) && op !== '-') {
            // Just used another operator, so replace
            return setCalc(calc.slice(0, -1) + op);
        }

        setNum('');
        setCalc(calc + op);
    };

    const equals = () => {
        if (calc === '') {
            return;
        } else if (ops.includes(calc.slice(-1))) {
            setCalc(calc.slice(0, -1));
        } else if (
            !num.includes('.') ||
            !calc.includes('.') ||
            result.includes('e+') ||
            calc.includes('e+')
        ) {
            // No decimal rounding of numbers without decimals
            setCalc(evaluate(calc).toString());
        } else {
            // Only round numbers with decimals (bc rounding with 16 or more digits before decimal returns NaN)
            setCalc(round(evaluate(calc)).toString());
        }
        setNum(calc);
        setResult('');
    };

    const allClear = () => {
        if (calc === '') {
            return;
        }
        setCalc(''); // Clears all
        setResult('');
        setNum('');
    };

    const clearEntry = () => {
        if (calc === '') {
            return;
        }
        setCalc(calc.slice(0, -1)); // CE, return all but the last
        setResult(calc.slice(0, -1));
    };

    // For using the keyboard
    useEffect(() => {
        // initiate the event handler
        window.addEventListener('keydown', keyHandler, false);

        // this will clean up the event every time the component is re-rendered
        return function cleanup() {
            window.removeEventListener('keydown', keyHandler);
        };
    });

    const keyHandler = (event) => {
        // setKey(event.key);
        (nums.includes(event.key) && updateNum(event.key)) ||
            (ops.includes(event.key) && updateOper(event.key)) ||
            (event.key === '.' && decHandler(event.key)) ||
            ((event.key === 'Enter' || event.key === '=') && equals()) ||
            (event.key === 'Delete' && allClear()) ||
            (event.key === 'Backspace' && clearEntry());
        return;
    };

    return (
        <div className="App">
            <div className="ts">
                num = {num}; calc = {calc}; result = {result};
            </div>
            {/* <div className="ts">onKeyDown event = '{key}'</div> */}
            <div className="calculator">
                <div className="display">
                    <div className="preview">
                        {result ? `(${result})` : '( )'}
                    </div>
                    <div id="display">{calc || '0'}</div>
                </div>
                <div className="keyPad">
                    {/* Operators */}
                    <button
                        className="button topRow opButton clearAll"
                        id="clear"
                        onClick={allClear}>
                        AC
                    </button>
                    <button
                        className="button topRow opButton divide"
                        id="divide"
                        onClick={() => updateOper('/')}>
                        /
                    </button>
                    <button
                        className="button topRow opButton multiply"
                        id="multiply"
                        onClick={() => updateOper('*')}>
                        x
                    </button>
                    <button
                        className="button topRow opButton clearEntry"
                        onClick={clearEntry}>
                        CE
                    </button>
                    <button
                        className="button opButton minus"
                        id="subtract"
                        onClick={() => updateOper('-')}>
                        -
                    </button>
                    <button
                        className="button opButton plus"
                        id="add"
                        onClick={() => updateOper('+')}>
                        +
                    </button>
                    {/* Numbers */}
                    <button
                        className="button numButton seven"
                        id="seven"
                        onClick={() => updateNum('7')}>
                        7
                    </button>
                    <button
                        className="button numButton eight"
                        id="eight"
                        onClick={() => updateNum('8')}>
                        8
                    </button>
                    <button
                        className="button numButton nine"
                        id="nine"
                        onClick={() => updateNum('9')}>
                        9
                    </button>
                    <button
                        className="button numButton four"
                        id="four"
                        onClick={() => updateNum('4')}>
                        4
                    </button>
                    <button
                        className="button numButton five"
                        id="five"
                        onClick={() => updateNum('5')}>
                        5
                    </button>
                    <button
                        className="button numButton six"
                        id="six"
                        onClick={() => updateNum('6')}>
                        6
                    </button>
                    <button
                        className="button numButton one"
                        id="one"
                        onClick={() => updateNum('1')}>
                        1
                    </button>
                    <button
                        className="button numButton two"
                        id="two"
                        onClick={() => updateNum('2')}>
                        2
                    </button>
                    <button
                        className="button numButton three"
                        id="three"
                        onClick={() => updateNum('3')}>
                        3
                    </button>
                    <button
                        className="button numButton zero"
                        id="zero"
                        onClick={() => updateNum('0')}>
                        0
                    </button>

                    <button
                        className="button numButton decimal"
                        id="decimal"
                        onClick={() => decHandler('.')}>
                        .
                    </button>
                    <button
                        className="button equalButton"
                        id="equals"
                        onClick={equals}>
                        =
                    </button>
                </div>
            </div>
        </div>
    );
}

// Comment out for codepen.io
export default App;

// For Codepen.io
// const root = ReactDOM.createRoot(document.getElementById("app"));
// root.render(<App />);
