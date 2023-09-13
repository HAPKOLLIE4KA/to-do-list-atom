export function getTaskElement (nameTask, descTask) {
    const newElement = document.createElement('div');
    newElement.classList.value = "task task_add";
   
    newElement.innerHTML =  `<button class="task__btn task__options_btn_complete"></button>
    <div class="task__body">
        <div class="task__title">${nameTask}</div>
        ${descTask ? `<div class="task__description">${descTask}</div>`: ""}
    </div>
    <button class="task__btn task__options_btn_delete"></button>`;
    return newElement;
}