const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearButton = document.getElementById("clearButton");

let tasks = [];

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Digite uma tarefa antes de adicionar.");
        return;
    }

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    taskInput.value = "";

    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    renderTasks();
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.classList.add("task");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <div class="task-content">
                <input 
                    type="checkbox" 
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${task.id})"
                >

                <span>${task.text}</span>
            </div>

            <button 
                class="delete-button"
                onclick="deleteTask(${task.id})"
            >
                Excluir
            </button>
        `;

        taskList.appendChild(li);
    });

    updateTaskCount();
}

function updateTaskCount() {
    const remainingTasks = tasks.filter(
        task => !task.completed
    ).length;

    if (remainingTasks === 1) {
        taskCount.textContent = "1 tarefa pendente";
    } else {
        taskCount.textContent = `${remainingTasks} tarefas pendentes`;
    }
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

clearButton.addEventListener("click", clearCompleted);

renderTasks();