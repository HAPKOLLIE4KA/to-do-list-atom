
document.addEventListener("DOMContentLoaded", () => {
    insertInContainerAllTasksFromLocalStorage();
    checkIsEmptyTasksContainer();
})

function zeroingClassNamesTasks ()  {
    Array.from(allTasks).forEach(task => 
        task.className = task.className.replace(' task_secelected', ""));
}

function getTaskElement (nameTask, descTask) {
    const newElement = document.createElement('div');
    newElement.className = "task task_add";
   
    newElement.innerHTML =  `<button class="task__btn task__options_btn_complete"></button>
    <div class="task__body">
        <div class="task__title">${nameTask}</div>
        ${descTask ? `<div class="task__description">${descTask}</div>`: ""}
    </div>
    <button class="task__btn task__options_btn_delete"></button>`;
    return newElement;
}

function checkIsEmptyTasksContainer() {
    if (!allTasks.length) tasksContainer.className += " tasks_container_empty"
    else tasksContainer.className = tasksContainer.className.replace(" tasks_container_empty", "")
}

function deleteTask(task) {
    task.className += " task_delete"; 
    setTimeout(() => {
        task.remove();
        setAllElemntsInLocalStorage();
        checkIsEmptyTasksContainer();
    }, transition)
}

function moveToEndList(task) {
    setTimeout(() => {
        task.remove();
        tasksContainer.append(task);
        setAllElemntsInLocalStorage();

    }, transition)
    
}

function insertTaskBeforeCompletes(task, callback=() => {}) {
    const completeTask = completedTasks[0];
    task.remove()

    if (completeTask !== undefined){
        completeTask.insertAdjacentHTML('beforebegin', task.outerHTML)
    } else {
        tasksContainer.append(task)
    }
    callback()

}

function moveUpList(task) {

    setTimeout(() => {
        insertTaskBeforeCompletes(task);
        setAllElemntsInLocalStorage();

    }, transition)
}

function completeTask(task) {
    const classes = task.className;
    if ( !classes.includes("task_complete")) {
        task.className += " task_complete";
        moveToEndList(task);
    } 
    else if ( classes.includes("task_complete")) {
        task.className = classes.replace(' task_complete', "")
        moveUpList(task);
    } 
}

function generateError() {
    if (body.getElementsByClassName("error")[0] !== undefined) return
    const error = document.createElement('div');
    error.className = "error"
    error.innerHTML = "Введите название задачи"
    body.prepend(error);

    setTimeout(() => {
        error.className += " error_shadow"
    }, 3500)
    setTimeout(() => {
        error.remove();
    }, 4500)
}

deleteFirstBtn.addEventListener("click", () => {
    zeroingClassNamesTasks();
    if (allTasks.length) deleteTask(allTasks[0]);
    
})

deleteLastBtn.addEventListener('click', () => {
    zeroingClassNamesTasks();
    if (allTasks.length) deleteTask(allTasks[allTasks.length - 1]);
})

selectOddBtn.addEventListener('click', () => {
    zeroingClassNamesTasks();
    Array.from(allTasks).forEach((task, idx) =>{
        if ((idx + 1) % 2 == 1) {
            task.className += " task_secelected";
        }
    } 
)
})

selectEvenBtn.addEventListener('click', () => {
    zeroingClassNamesTasks();
    Array.from(allTasks).forEach((task, idx) =>{
        if ((idx + 1) % 2 == 0  ) {
            task.className += " task_secelected"; 
        }
    } 
)
})

selectDeleteBtn.addEventListener('click', () => {
    zeroingClassNamesTasks();
})

tasksContainer.addEventListener("click", (e) => {
    if (e.target.className.includes("task__options_btn_delete")) {
        zeroingClassNamesTasks();
        deleteTask(e.target.parentElement);
    }
    if (e.target.className.includes("task__options_btn_complete")) {
        zeroingClassNamesTasks();
        completeTask(e.target.parentElement);
    }
})

addTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    zeroingClassNamesTasks();
    if (inputNameTask.value == "") {
        generateError();
        return;
    }
    const htmlTask = getTaskElement(inputNameTask.value ,inputDescTask.value);

    inputNameTask.value = "";
    inputDescTask.value = "";

    
    insertTaskBeforeCompletes(htmlTask, () => {
        setTimeout(() => {
            Array.from(addTasks).forEach(task => 
                task.className = task.className.replace(' task_add', ""));
                setAllElemntsInLocalStorage();
        }, transition);
    })
    checkIsEmptyTasksContainer();
    
})
