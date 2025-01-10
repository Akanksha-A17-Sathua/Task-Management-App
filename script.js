// Define the tasks array to store all tasks
let tasks = [];

// Function to display the tasks
function displayTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // Clear the list

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    taskDiv.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p><strong>Due Date:</strong> ${task.dueDate}</p>
      <button class="edit-btn" onclick="editTask(${index})">Edit</button>
      <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
    `;

    taskList.appendChild(taskDiv);
  });
}

// Function to edit a task
function editTask(index) {
  const task = tasks[index];

  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description;
  document.getElementById("task-due-date").value = task.dueDate;

  // Set the form to edit mode
  document.getElementById("task-form").setAttribute("data-edit-index", index);
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasksToLocalStorage(); // Save updated tasks to localStorage
  displayTasks(); // Refresh the task list
}

// Event listener for the form submission
document.getElementById("task-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form from reloading the page

  const title = document.getElementById("task-title").value;
  const description = document.getElementById("task-desc").value;
  const dueDate = document.getElementById("task-due-date").value;

  const editIndex = this.getAttribute("data-edit-index");

  if (editIndex !== null) {
    // Update an existing task
    tasks[editIndex] = { title, description, dueDate };
    this.removeAttribute("data-edit-index"); // Remove edit mode
  } else {
    // Add a new task
    tasks.push({ title, description, dueDate });
  }

  // Save tasks to localStorage and refresh the task list
  saveTasksToLocalStorage();
  this.reset();
  displayTasks();
});

// Save tasks to localStorage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage when the page loads
function loadTasksFromLocalStorage() {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    displayTasks();
  }
}

// Function to toggle the theme
function toggleTheme() {
  const body = document.body;
  const isDarkMode = document.getElementById("theme-toggle-checkbox").checked;

  if (isDarkMode) {
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
}

// Load theme from localStorage
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    document.getElementById("theme-toggle-checkbox").checked = true;
  }
}
document.getElementById("heading").addEventListener("change", toggleTheme);
// Event listener for theme toggle
document.getElementById("theme-toggle-checkbox").addEventListener("change", toggleTheme);

// Load tasks and theme on page load
window.onload = function () {
  loadTasksFromLocalStorage();
  loadTheme();
};






