document.addEventListener('DOMContentLoaded', () => { 
    const todoInput = document.getElementById('todo-input'); 
    const addBtn = document.querySelector('.add-btn'); 
    const todoList = document.querySelector('.todo-list'); 
    const filterBtns = document.querySelectorAll('.filter-btn'); 

    let todos = JSON.parse(localStorage.getItem('todos')) || []; 

    const saveTodos = () => { 
        localStorage.setItem('todos', JSON.stringify(todos)); 
    }; 

    const renderTodos = (filter = 'all') => { 
        todoList.innerHTML = ''; 
         
        let filteredTodos = todos; 
        if (filter === 'active') { 
            filteredTodos = todos.filter(todo => !todo.completed); 
        } else if (filter === 'completed') { 
            filteredTodos = todos.filter(todo => todo.completed); 
        } 

        if (filteredTodos.length === 0) { 
            todoList.innerHTML = '<div class="empty-state">No tasks found. Time to add some! ✨</div>'; 
            return; 
        } 

        filteredTodos.forEach((todo, index) => { 
            const li = document.createElement('li'); 
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`; 
             
            li.innerHTML = ` 
                <input type="checkbox" class="checkbox" ${todo.completed ? 'checked' : ''}> 
                <span class="todo-text">${todo.text}</span> 
                <button class="delete-btn"><i class="fas fa-trash-alt"></i></button> 
            `; 

            const checkbox = li.querySelector('.checkbox'); 
            checkbox.addEventListener('change', () => toggleTodo(index)); 

            const deleteBtn = li.querySelector('.delete-btn'); 
            deleteBtn.addEventListener('click', (e) => { 
                e.stopPropagation(); 
                deleteTodo(index); 
            }); 

            todoList.appendChild(li); 
        }); 
    }; 

    const addTodo = (text) => { 
        if (text.trim()) { 
            todos.unshift({ text, completed: false }); // Add new items at the beginning 
            saveTodos(); 
            renderTodos(); 
            todoInput.value = ''; 
        } 
    }; 

    const toggleTodo = (index) => { 
        todos[index].completed = !todos[index].completed; 
        saveTodos(); 
        renderTodos(); 
    }; 

    const deleteTodo = (index) => { 
        todos.splice(index, 1); 
        saveTodos(); 
        renderTodos(); 
    }; 

    addBtn.addEventListener('click', () => { 
        addTodo(todoInput.value); 
    }); 

    todoInput.addEventListener('keypress', (e) => { 
        if (e.key === 'Enter') { 
            addTodo(todoInput.value); 
        } 
    }); 

    filterBtns.forEach(btn => { 
        btn.addEventListener('click', () => { 
            filterBtns.forEach(b => b.classList.remove('active')); 
            btn.classList.add('active'); 
            renderTodos(btn.dataset.filter); 
        }); 
    }); 

    renderTodos(); 
}); 