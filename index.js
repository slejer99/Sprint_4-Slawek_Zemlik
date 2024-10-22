const addTask = document.getElementById("add-task");
addTask.style.margin = "5px";
let taskList = document.querySelector("ul");
const taskInput = document.getElementById("task-input");
const div = document.querySelector("div");

function addElement(element, text) {
  if (text) {
    element = document.createElement(element);
    element.textContent = text;
    return element;
  } else {
    return document.createElement(element);
  }
}

addTask.addEventListener("click", function () {
  if (!taskInput.value) {
    alert("Pole 'Dodaj nowe zadanie' nie może być puste");
  } else if (!taskList) {
    taskList = addElement("ul");
    div.appendChild(taskList);
    addTaskItem(taskInput.value);
    taskInput.value = "";
  } else {
    addTaskItem(taskInput.value);
    taskInput.value = "";
  }
});

function addTaskItem(taskText) {
  const li = addElement("li");
  const taskSpan = addElement("span", taskText);
  li.appendChild(taskSpan);
  taskList.appendChild(li);

  const buttonEdit = addElement("button", "Edytuj");
  buttonEdit.classList.add("edit");
  const buttonDelete = addElement("button", "Usuń");
  buttonDelete.classList.add("delete");
  li.append(buttonEdit, buttonDelete);

  buttonEdit.addEventListener("click", function () {
    taskSpan.textContent = "";
    const input = addElement("input");
    li.prepend(input);
    input.value = taskText;

    const saveButton = addElement("button", "Zatwierdź zmiany");
    li.insertBefore(saveButton, buttonEdit);
    li.removeChild(buttonEdit);

    saveButton.addEventListener("click", function () {
      const newTaskText = input.value;
      taskSpan.textContent = newTaskText;
      taskText = newTaskText;

      li.removeChild(input);
      li.removeChild(saveButton);
      li.insertBefore(buttonEdit, buttonDelete);
    });
  });
  buttonDelete.addEventListener("click", function () {
    li.remove();
  });
}
