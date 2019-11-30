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

const createTodoButton = document.getElementById("createTodoButton");

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
  assignEventListeners(todo._id);
}

function assignEventListeners(id) {
  const checks = document.getElementsByClassName("done");
  const edits = document.getElementsByClassName("edit");
  const deletes = document.getElementsByClassName("delete");

  for (let i = 0; i < checks.length; i++) {
    const check = checks[i];

    if (check.dataset.id === id) {
      check.addEventListener("click", () => {
        if (check.checked) {
          checkTodo(check.dataset.id, true);
        } else {
          checkTodo(check.dataset.id, false);
        }
      });
    }
  }

  for (let i = 0; i < edits.length; i++) {
    const edit = edits[i];
    if (!edit.hasListener) {
      edit.addEventListener("click", () => {
        descriptionToEdit.dataset.id = edit.dataset.id;
        descriptionToEdit.value = "";
      });
      edit.hasListener = true;
    }
  }

  for (let i = 0; i < deletes.length; i++) {
    const deleteBtn = deletes[i];
    if (!deleteBtn.hasListener) {
      deleteBtn.addEventListener("click", () => {
        deleteTodo(deleteBtn.dataset.id);
      });
      deleteBtn.hasListener = true;
    }
  }
}

function updateTodoInTable(item) {
  const checks = document.getElementsByClassName("done");
  const descriptions = document.getElementsByClassName("description-item");
  for (let i = 0; i < checks.length; i++) {
    if (checks[i].dataset.id === item._id) {
      checks[i].checked = item.isDone;
      break;
    }
  }

  for (let i = 0; i < descriptions.length; i++) {
    console.log(descriptions[i].dataset.id);
    if (descriptions[i].dataset.id === item._id) {
      descriptions[i].innerText = item.description;
      if (item.isDone) descriptions[i].style.textDecoration = "line-through";
      else descriptions[i].style.textDecoration = "none";
      break;
    }
  }
}

function deleteItemFromTable(id) {
  const todo = document.getElementById(id);
  todo.parentNode.removeChild(todo);
}

async function getTodos() {
  //peticion GET a /item
  const res = await makeRequest(
    "/api/item",
    "GET",
    null,
    sessionStorage.getItem("token")
  );
  const response = await res.json();
  response.items.forEach(todo => {
    insertTodoInTable(todo);
  });
}

async function createTodo() {
  //Peticion POST a /item/
  const res = await makeRequest(
    "/api/item",
    "POST",
    {
      description: description.value
    },
    sessionStorage.getItem("token")
  );
  const response = await res.json();
  console.log(response);
  insertTodoInTable(response.item);
}

async function checkTodo(id, isDone) {
  //peticion PUT a /item/:idItem (solo el isDone)
  const res = await makeRequest(
    `/api/item/${id}`,
    "PUT",
    {
      isDone
    },
    sessionStorage.getItem("token")
  );
  const response = await res.json();
  console.log(response.item);
  updateTodoInTable(response.item);
}

async function editTodo(id, description) {
  //peticion PUT a /item/:idItem (solo la descripcion)
  const res = await makeRequest(
    `/api/item/${id}`,
    "PUT",
    {
      description
    },
    sessionStorage.getItem("token")
  );
  const response = await res.json();
  console.log(response.item);
  updateTodoInTable(response.item);
}

async function deleteTodo(id) {
  //peticion DELETE a /item/:idItem (solo la descripcion)
  const res = await makeRequest(
    `/api/item/${id}`,
    "DELETE",
    null,
    sessionStorage.getItem("token")
  );
  const response = await res.json();
  console.log(response.item);
  deleteItemFromTable(id);
}
