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
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear tasks event
  clearBtn.addEventListener("click", clearTasks);
  // filter tasks event
  filter.addEventListener("keyup", debouncedFilterTasks);
}

// Add task function
function addTask(e) {
  e.preventDefault();

  if (taskInput.value === "") {
    alert("Add a task");
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
    )
      e.target.parentElement.parentElement.remove();
  }
}

// Clear Tasks
function clearTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
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
