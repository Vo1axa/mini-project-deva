const display = document.querySelector('.display'); 
const buttons = document.querySelectorAll('button'); 
let calculation = ''; 
let lastResult = ''; 

buttons.forEach(button => { 
    button.addEventListener('click', () => { 
        const value = button.textContent; 

        if (value === 'C') { 
            calculation = ''; 
            display.value = ''; 
        } else if (value === '←') { 
            calculation = calculation.slice(0, -1); 
            display.value = calculation; 
        } else if (value === '=') { 
            try { 
                lastResult = eval(calculation); 
                display.value = lastResult; 
                calculation = lastResult.toString(); 
            } catch { 
                display.value = 'Error'; 
                calculation = ''; 
            } 
        } else { 
            calculation += value; 
            display.value = calculation; 
        } 
    }); 
}); 

// Keyboard support
document.addEventListener('keydown', (event) => { 
    const key = event.key; 
    if (key >= '0' && key <= '9' || key === '.' || key === '+' ||  
        key === '-' || key === '*' || key === '/' || key === '%') { 
        calculation += key; 
        display.value = calculation; 
    } else if (key === 'Enter') { 
        try { 
            lastResult = eval(calculation); 
            display.value = lastResult; 
            calculation = lastResult.toString(); 
        } catch { 
            display.value = 'Error'; 
            calculation = ''; 
        } 
    } else if (key === 'Backspace') { 
        calculation = calculation.slice(0, -1); 
        display.value = calculation; 
    } else if (key === 'Escape') { 
        calculation = ''; 
        display.value = ''; 
    } 
}); 
