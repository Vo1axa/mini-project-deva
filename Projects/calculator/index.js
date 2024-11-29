
const display = document.querySelector('.display'); 
const buttons = document.querySelectorAll('button'); 
let calculation = ''; 
let lastResult = ''; 

// Fungsi untuk menambahkan animasi press 
function addPressAnimation(button) { 
    button.classList.add('pressed'); 
    setTimeout(() => { 
        button.classList.remove('pressed'); 
    }, 200); 
} 

buttons.forEach(button => { 
    button.addEventListener('click', () => { 
        addPressAnimation(button); 
        const value = button.textContent; 

        if (value === 'C') { 
            calculation = ''; 
            display.value = ''; 
        } else if (value === '←') { 
            calculation = calculation.slice(0, -1); 
            display.value = calculation; 
        } else if (value === '=') { 
            try { 
                // Mengganti simbol × dan ÷ dengan operator yang sesuai 
                let evaluationString = calculation.replace(/×/g, '*').replace(/÷/g, '/'); 
                lastResult = eval(evaluationString); 
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

// Keyboard support dengan animasi 
document.addEventListener('keydown', (event) => { 
    const key = event.key; 
    const buttonMap = { 
        'Enter': '=', 
        '*': '×', 
        '/': '÷', 
        'Escape': 'C' 
    }; 

    const mappedKey = buttonMap[key] || key; 
    const button = Array.from(buttons).find(btn => btn.textContent === mappedKey); 

    if (button) { 
        addPressAnimation(button); 
        button.click(); 
    } 

    if (key >= '0' && key <= '9' || key === '.' || key === '+' ||  
        key === '-' || key === '*' || key === '/' || key === '%') { 
        if (key === '*') displayValue = '×'; 
        if (key === '/') displayValue = '÷'; 
        calculation += displayValue; 
        display.value = calculation; 
    } else if (key === 'Enter') { 
        try { 
            let evaluationString = calculation.replace(/×/g, '*').replace(/÷/g, '/'); 
            lastResult = eval(evaluationString); 
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