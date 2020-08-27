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
document.addEventListener('DOMContentLoaded', LoadLocalStorage);

//manage tasks functions
function AddTask(e){

    if(taskInput.value == ''){
        alert('Insert a task name');
        return;
    }

    CreateTaskOnDOM(taskInput.value);
    AddToLocalStorage(taskInput.value);

    taskInput.value = '';

    e.preventDefault();
}

function DeleteTask(e){
    if(e.target.classList.contains('delete-task-item')){
        if(confirm(`Remove '${e.target.parentElement.firstChild.textContent}' ?`)){
            DeleteOnLocalStorage(e.target.parentElement.firstChild.textContent);
            e.target.parentElement.remove();
        }
    }
}

function ClearAll(){
    if(confirm('Remove all tasks ?')){
        while(taskList.firstChild){
            taskList.firstChild.remove();
        }

        ClearAllLocalStorage();
    }
}

function CreateTaskOnDOM(taskName){
    const li = document.createElement('li');
    const p = document.createElement('p');
    const a = document.createElement('a');

    li.classList.add('task-item');
    p.classList.add('task-item-name');
    a.classList.add('delete-task-item');

    p.innerText = taskName;

    a.href = '#';
    a.innerText = 'x';

    li.appendChild(p);
    li.appendChild(a);

    taskList.appendChild(li);
}

//local storage functions
function AddToLocalStorage(taskName){
    let tasks;
    if(localStorage.getItem('tasks') == null)
        tasks = []; 
    else
        tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.push(taskName);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function DeleteOnLocalStorage(taskName){
    if(localStorage.getItem('tasks') != null){
        let tasks = JSON.parse(localStorage.getItem('tasks'));

        tasks.forEach(function(task, index){
            if(task === taskName){
                tasks.splice(index, 1);
            }
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function LoadLocalStorage(){
    if(localStorage.getItem('tasks') != null){
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(function(task){
            CreateTaskOnDOM(task);
        });
    }
}

function ClearAllLocalStorage(){
    if(localStorage.getItem('tasks') != null){
        localStorage.clear();
    }
    else{
        alert('No tasks to remove');
    }
}