"use strict"
const TASK_PATTERN = /(?!^\s*?$)^.+$/;
let countListItem = 0;
const taskList = document.getElementById("taskList");
const input = document.querySelector("input[type=text]");

const addToDoButton = document.getElementById("addToDoButton");
console.log(taskList);
addToDoButton.onclick = onAddButton;
createTimeView();
input.oninput = validateInput;


function onAddButton(event) {
    if (input.value.match(TASK_PATTERN)) {
        input.classList.remove('invalidInput');
        input.classList.remove('validInput');
        taskList.prepend(createListItem(input.value));
        input.value = ""
    }
}


function validateInput(event) {
    if (this.value.match(TASK_PATTERN)) {
        this.classList.add("validInput");
        this.classList.remove("invalidInput");
    } else {
        this.classList.add("invalidInput")
        this.classList.remove("validInput")
        if (this.value === "") {
            this.classList.remove("invalidInput")
        }
    }

}

function createListItem(text) {
    countListItem++;
    const listItem = document.createElement("li");
    listItem.setAttribute("data-listid", countListItem);
    listItem.setAttribute("id", countListItem);
    listItem.classList.add("taskItem");
    const div = document.createElement("div");
    div.classList.add('taskConteiner')
    div.appendChild(createCheckBox(countListItem));
    div.appendChild(createTask(countListItem, text));
    listItem.appendChild(div);
    listItem.appendChild(createDeleteButton(listItem.dataset.listid));
    return listItem;

}

function createCheckBox(id) {
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", 'checkbox');
    checkBox.setAttribute("data-taskid", id);
    checkBox.onchange = onCheckboxChangeHandler;
    return checkBox;

}

function createTask(id, text) {
    const task = document.createElement("p");
    task.classList.add("taskText");

    task.innerText = text;
    return task
}

function createDeleteButton(id) {
    const deleteButton = document.createElement("img");
    deleteButton.classList.add("deleteTask");
    deleteButton.setAttribute("src", 'assets/img/close-circle.png');
    deleteButton.setAttribute("alt", 'delete');
    console.log(id);
    deleteButton.setAttribute("data-listid", id);
    deleteButton.onclick = deleteItem;
    return deleteButton;
}

function deleteItem() {
    removeElemById(this.dataset.listid);
}

function removeElemById(id) {
    const listItem = document.getElementById(id);
    listItem.remove();


}

function onCheckboxChangeHandler(event) {
    const taskListItemElem = document.getElementById(this.dataset.taskid);
    if (this.checked) {

        taskListItemElem.classList.add('taskDone')
    } else {
        taskListItemElem.classList.remove('taskDone')

    }


}

function createTimeView() {
    let date = new Date();
    const time = document.createElement("div");
    time.classList.add("time");
    time.innerText = date.toLocaleString('en', {weekday: 'long'}) + " \n " + date.toLocaleString('en', {month: 'long'}) + " " + date.getDate();
    const header = document.getElementById("header");
    header.appendChild(time);
}