//elements
//form elements
const form = document.querySelector('form');
const taskInput = document.querySelector('.task-input');

//list elements
const clearAll = document.querySelector('.clear-all');
const taskList = document.querySelector('.tasks-list');

//EventListeners
form.addEventListener('submit', AddTask);
taskList.addEventListener('click', DeleteTask);
clearAll.addEventListener('click', ClearAll);

function AddTask(e){

    if(taskInput.value == ''){
        alert('Insert a task name');
    }

    const li = document.createElement('li');
    const p = document.createElement('p');
    const a = document.createElement('a');

    li.classList.add('task-item');
    p.classList.add('task-item-name');
    a.classList.add('delete-task-item');

    p.innerText = taskInput.value;

    a.href = '#'
    a.innerText = 'x';

    li.appendChild(p);
    li.appendChild(a);

    taskList.appendChild(li);

    taskInput.value = '';

    e.preventDefault();
}

function DeleteTask(e){
    if(e.target.classList.contains('delete-task-item')){
        if(confirm(`Remove '${e.target.parentElement.firstChild.textContent}' ?`)){
            e.target.parentElement.remove();
        }
    }
}

function ClearAll(){
    if(confirm('Remove all tasks ?')){
        while(taskList.firstChild){
            taskList.firstChild.remove();
        }
    }
}