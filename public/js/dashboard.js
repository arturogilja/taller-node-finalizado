const description = document.getElementById("description");
const descriptionToEdit = document.getElementById("description-to-edit");

const createForm = document.getElementById("create-form");
createForm.addEventListener("submit", e => {
  e.preventDefault();
  createTodo();
});

const editForm = document.getElementById("edit-form");
editForm.addEventListener("submit", e => {
  e.preventDefault();
  editTodo(descriptionToEdit.dataset.id, descriptionToEdit.value);
});

const templateItem = document.getElementById("item");
const todosTable = document.getElementById("todos-table");

getTodos();

function insertTodoInTable(todo) {
  let newTodo = document.importNode(templateItem.content, true);
  newTodo.querySelector("tr").id = todo._id;
  newTodo.querySelector(".done").dataset.id = todo._id;
  newTodo.querySelector(".edit").dataset.id = todo._id;
  newTodo.querySelector(".delete").dataset.id = todo._id;
  newTodo.querySelector(".description-item").dataset.id = todo._id;
  newTodo.querySelector(".description-item").innerText = todo.description;
  if (todo.isDone) {
    newTodo.querySelector(".done").checked = true;
    newTodo.querySelector(".description-item").style.textDecoration =
      "line-through";
  }
  todosTable.append(newTodo);
  assignEventListeners();
}

function assignEventListeners() {
  const checks = document.getElementsByClassName("done");
  const edits = document.getElementsByClassName("edit");
  const deletes = document.getElementsByClassName("delete");

  for (let i = 0; i < checks.length; i++) {
    const check = checks[i];
    check.addEventListener("change", () => {
      if (check.checked) {
        checkTodo(check._id, true);
      } else {
        checkTodo(check._id, false);
      }
      check.disabled = true;
    });
  }

  for (let i = 0; i < edits.length; i++) {
    const edit = edits[i];
    edit.addEventListener("click", () => {
      descriptionToEdit.dataset.id = edit.dataset.id;
    });
  }

  for (let i = 0; i < deletes.length; i++) {
    const deleteBtn = deletes[i];
    deleteBtn.addEventListener("click", () => {
      deleteTodo(deleteBtn.dataset.id);
    });
  }
}

function updateTodoInTable(item) {
  const checks = document.getElementsByClassName("done");
  const descriptions = document.getElementsByClassName("description-item");
  for (let i = 0; i < checks.length; i++) {
    console.log(checks[i].dataset.id === item._id);
    if (checks[i].dataset.id === item._id) {
      checks[i].checked = item.isDone;
      checks[i].disabled = false;
    }
    break;
  }

  for (let i = 0; i < descriptions.length; i++) {
    if (descriptions[i].dataset.id === item._id) {
      descriptions[i].innerText = item.description;
      if (item.isDone) descriptions[i].style.textDecoration = "line-through";
      else descriptions[i].style.textDecoration = "none";
    }
    break;
  }
}

function deleteItemFromTable(id) {
  const todo = document.getElementById(id);
  todo.parentNode.removeChild(todo);
}

async function createTodo() {
  //Peticion POST a /item/
}

async function getTodos() {
  //peticion GET a /item
}

async function checkTodo(id, isDone) {
  //peticion PUT a /item/:idItem (solo el is done)
}

async function editTodo(id, description) {
  //peticion PUT a /item/:idItem (solo la descripcion)
}

async function deleteTodo(id) {
  //peticion DELETE a /item/:idItem (solo la descripcion)
}
