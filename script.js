const task = document.getElementById("task");
const addBtn = document.getElementById("add-task");
const clearBtn = document.getElementById("clear-task");
const filter = document.getElementById("filter");
const ul = document.querySelector(".list");
const delBtn = document.querySelector(".del-btn");

loadeventlisteners();

function loadeventlisteners() {
  task.addEventListener("focus", (e) => {
    task.classList.add("active");
    task.setAttribute("placeholder", "");
  });

  task.addEventListener("blur", (e) => {
    task.classList.remove("active");
    task.setAttribute("placeholder", "Create new task");
  });

  filter.addEventListener("focus", (e) => {
    filter.classList.add("active");
    filter.setAttribute("placeholder", "");
  });

  filter.addEventListener("blur", (e) => {
    filter.classList.remove("active");
    filter.setAttribute("placeholder", "Filter");
    filter.value = "";
  });

  document.addEventListener("DOMContentLoaded", getTasks);
  addBtn.addEventListener("click", addTask);
  ul.addEventListener("click", removeTask);
  filter.addEventListener("keyup", filterTasks);
  clearBtn.addEventListener("click", clearAllTasks);
}

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    const className = "list-item bg-purple text-light";
    const li = document.createElement("li");
    li.className = className;
    const elem = ` ${task}<a href="#" class="del-btn"><i class="fa-solid fa-trash text-danger"></i></a> `;
    li.innerHTML = elem;
    ul.appendChild(li);
  });
}

function addTask(e) {
  if (task.value === "") {
    alert("add a task");
  } else {
    const className = "list-item bg-purple text-light";
    const li = document.createElement("li");
    li.className = className;
    const elem = ` ${task.value}<a href="#" class="del-btn"><i class="fa-solid fa-trash text-danger"></i></a> `;
    li.innerHTML = elem;
    ul.appendChild(li);
    storeTaskInLocalStorage(task.value);
    task.value = "";
  }
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  console.log(text);

  document.querySelectorAll(".list-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

function clearAllTasks(e) {
  /* ul.innerHTML = ""; */
  while (ul.firstChild) {
    ul.firstChild.remove();
  }
  localStorage.clear();
}

function removeFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task, index) => {
    console.log(task, index);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.parentElement.classList.contains("list-item")) {
    e.target.parentElement.parentElement.remove();
    /*  console.log(e.target.parentElement.parentElement.textContent); */
  }
  removeFromLocalStorage(e.target.parentElement.parentElement.textContent);
}
