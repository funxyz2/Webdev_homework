document.getElementById("formTask").onsubmit = function(event) {
    event.preventDefault();
    const taskInputNode = document.getElementById("inputTask");
    const taskText = taskInputNode.value.trim();
    const taskStatus = document.getElementById("taskStatus").value;
    const taskCategory = document.getElementById("taskCategory").value;
    
    if (taskText !== "") {
        const task = {
            text: taskText,
            status: taskStatus,
            category: taskCategory
        };
        addTask(task);
        saveTasks();
    }
    taskInputNode.value = "";
};

document.getElementById("formCategory").onsubmit = function(event) {
    event.preventDefault();
    const categoryInputNode = document.getElementById("inputCategory");
    const categoryText = categoryInputNode.value.trim();
    const categoryDropdown = document.getElementById("taskCategory");
    
    if (categoryText !== "" && !categoryExists(categoryText)) {
        addCategory(categoryText);
        saveCategories();
    }
    categoryInputNode.value = "";
};

document.getElementById("saveBtn").addEventListener("click", function(event) {
    event.preventDefault();
    saveTasks();
});

window.onload = function() {
    loadCategories();
    loadTasks();
};

function addTask(task) {
    const taskList = document.getElementById("tasks");
    const taskItem = document.createElement("li");
    taskItem.textContent = task.text;
    
    const categorySpan = document.createElement("span");
    categorySpan.className = "category";
    categorySpan.textContent = task.category;
    taskItem.prepend(categorySpan);
    
    const statusSpan = document.createElement("span");
    statusSpan.className = "status";
    statusSpan.textContent = task.status;
    taskItem.appendChild(statusSpan);

    if (task.status === "Completed") taskItem.classList.add("completed");
    
    taskItem.addEventListener("click", function() {
        taskItem.classList.toggle("completed");
        task.status = taskItem.classList.contains("completed") ? "Completed" : "Pending";
        saveTasks();
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function() {
        taskList.removeChild(taskItem);
        saveTasks();
    });

    taskItem.appendChild(removeButton);
    taskList.appendChild(taskItem);
}

function addCategory(category) {
    const categoryDropdown = document.getElementById("taskCategory");
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryDropdown.appendChild(option);
}

function categoryExists(category) {
    const categoryDropdown = document.getElementById("taskCategory");
    for (let option of categoryDropdown.options) {
        if (option.value === category) return true;
    }
    return false;
}

function saveTasks() {
    const taskList = document.getElementById("tasks");
    const tasks = [];
    for (let taskItem of taskList.getElementsByTagName("li")) {
        const task = {
            text: taskItem.childNodes[1].textContent,
            status: taskItem.childNodes[2].textContent,
            category: taskItem.childNodes[0].textContent
        };
        tasks.push(task);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        for (let task of tasks) {
            addTask(task);
        }
    }
}

function saveCategories() {
    const categories = [];
    const categoryDropdown = document.getElementById("taskCategory");
    for (let option of categoryDropdown.options) {
        if (option.value !== "") categories.push(option.value);
    }
    localStorage.setItem("categories", JSON.stringify(categories));
}

function loadCategories() {
    const categories = JSON.parse(localStorage.getItem("categories"));
    if (categories) {
        for (let category of categories) {
            addCategory(category);
        }
    }
}
