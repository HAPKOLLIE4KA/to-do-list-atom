const key = "tasks"

function Task(name, desc="", complete=false) {
    this.name = name;
    this.desc = desc;
    this.complete = complete;
}

function getAllElemntsFromLocalStorage() {
    const dataTasks = JSON.parse(localStorage.getItem(key))
    return dataTasks
}

function setAllElemntsInLocalStorage() {
    const dataTasks = Array.from(allTasks).map((div) => {
        const name = div.getElementsByClassName('task__title')[0].innerHTML
        const desc = div.getElementsByClassName('task__description')[0]?.innerHTML
        const isComplete = div.className.includes("task_complete")
        return new Task(name, desc ?? "", isComplete)
    })

    localStorage.setItem(key, JSON.stringify(dataTasks))
}

function parseObjectInHtmlElement(obj) {
    const newElement = document.createElement('div');
    newElement.className = `task${obj.complete ? " task_complete" : ""}`;

    newElement.innerHTML =  `<button class="task__btn task__options_btn_complete"></button>
    <div class="task__body">
        <div class="task__title">${obj.name}</div>
        ${obj.desc ? `<div class="task__description">${obj.desc}</div>`: ""}
    </div>
    <button class="task__btn task__options_btn_delete"></button>`;
    return newElement;
}

function insertInContainerAllTasksFromLocalStorage() {
    const dataTasks = getAllElemntsFromLocalStorage()
    if (dataTasks !== null) {
        dataTasks.forEach(task => {
            const taskHtml = parseObjectInHtmlElement(task);
            tasksContainer.append(taskHtml);
        })
    }
   
}
