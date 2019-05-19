// Debounce variable
let debounceId;

// UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// Load all event listeners function
function loadEventListeners() {
  // DOM Load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear tasks event
  clearBtn.addEventListener("click", clearTasks);
  // filter tasks event
  filter.addEventListener("keyup", debouncedFilterTasks);
}

// Get tasks from local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(task => {
    // Create li element
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));

    // Create new link element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);

    // Append the li to ul
    taskList.appendChild(li);
  });
}

// Add task function
function addTask(e) {
  e.preventDefault();

  if (taskInput.value === "") {
    alert("Add a task");
    return;
  }

  // Create li element
  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(taskInput.value));

  // Create new link element
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append link to li
  li.appendChild(link);

  // Append the li to ul
  taskList.appendChild(li);

  // Store in local storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = "";
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (
      confirm(
        `Are you sure you want to delete task "${
          e.target.parentElement.parentElement.textContent
        }" ?`
      )
    ) {
      e.target.parentElement.parentElement.remove();

      // Remove from ls
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task, index) => {
    console.log(task, taskItem);
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // clear tasks from LS
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

function debouncedFilterTasks(e) {
  console.log(debounceId);
  if (debounceId === undefined) {
    debounceId = setTimeout(filterTasks, 500, e);
  } else {
    clearTimeout(debounceId);
    debounceId = setTimeout(filterTasks, 500, e);
  }
}

// Store task in local storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks = [...tasks, task];

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
