import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import builder from "./builder";
import removeAllChildren from "./helpers";

//function for creating new project objects via the input element
const addProject = (projectName) => {
  if (projectName == "") {
    return;
  }
  builder.projects.addProject(projectName);
  let projectsList = document.getElementById("projects-list");
  let newProject = document.createElement("div");
  newProject.classList.add("project");
  newProject.innerHTML = builder.projects[projectName].name;
  projectsList.appendChild(newProject);
};

// populate items-container with the actual todoes belonging to the selected project
const displayToDoes = (projectName) => {
  const values = Object.values(builder.projects[projectName]).slice(2);

  let itemContainer = document.getElementById("to-does-container");
  removeAllChildren(itemContainer);

  values.forEach((item) => {
    let itemBox = document.createElement("div");
    itemBox.classList.add("to-do-box");

    // style the toDo item - title - p - due date - priority - complete or not
    let title = document.createElement("h3");
    title.id = "box-title";
    title.innerHTML = item.toDo.title;
    let description = document.createElement("div");
    description.id = "box-desc";
    description.innerHTML = item.toDo.description;
    let due = document.createElement("div");
    due.id = "box-due";
    due.innerHTML = `Due on: ${item.toDo.dueDate}`;
    let status = document.createElement("div");
    status.id = "box-status";
    status.innerHTML = `Completed? ${item.toDo.complete}`;

    itemBox.appendChild(title);
    itemBox.appendChild(description);
    itemBox.appendChild(due);
    itemBox.appendChild(status);
    itemContainer.appendChild(itemBox);
  });
};

// populate items-container with project title
const displayProject = (project) => {
  let projectTitle = document.getElementById("title");
  projectTitle.innerHTML = project.name;
  displayToDoes(project.name);
};

// i used to avoid duplicating event listeners on existing projects after adding a new one with addBtn
let i = 0;

// enables clicking on the project list
const addProjectListener = () => {
  let projectsArray = Array.from(document.querySelectorAll(".project"));
  projectsArray.slice(i, projectsArray.length).forEach((project) =>
    project.addEventListener("click", (e) => {
      displayProject(builder.projects[e.target.innerHTML]);
    })
  );
};

// define click event listener on add button for new projects
const addProjectBtn = document.getElementById("add-project-btn");
addProjectBtn.addEventListener("click", () => {
  i++; // to avoid duplicating event listeners
  let projectName = document.getElementById("project-name");
  addProject(projectName.value);
  projectName.value = "";
  addProjectListener();
});

// define click event listener for add toTo Item button
const addToDoBtn = document.getElementById("add-todo-btn");
addToDoBtn.addEventListener("click", () => {
  // function that adds and then displays new toDoItem object based on the selected project
  let itemContainer = document.getElementById("to-does-container");
  removeAllChildren(itemContainer);

  let newToDoForm = document.createElement("div");
  newToDoForm.id = "new-todo-form";

  let titleLabel = document.createElement("label");
  let title = document.createElement("input");
  title.id = "todo-title";
  titleLabel.textContent = "Enter the task name";
  titleLabel.setAttribute("for", "todo-title");

  let descLabel = document.createElement("label");
  let desc = document.createElement("textarea");
  desc.id = "todo-desc";
  descLabel.textContent = "Enter the description";
  descLabel.setAttribute("for", "todo-desc");

  let dueDate = document.createElement("input");
  dueDate.id = "due-date";
  dueDate.type = "date";
  let dueDateLabel = document.createElement("label");
  dueDateLabel.setAttribute("for", "due-date");
  dueDateLabel.textContent = "When is the task due?";

  let submitBtn = document.createElement("div");
  submitBtn.id = "submit-btn";
  submitBtn.textContent = "Create Task";

  newToDoForm.appendChild(titleLabel);
  newToDoForm.appendChild(title);
  newToDoForm.appendChild(descLabel);
  newToDoForm.appendChild(desc);
  newToDoForm.appendChild(dueDateLabel);
  newToDoForm.appendChild(dueDate);
  newToDoForm.appendChild(submitBtn);

  itemContainer.appendChild(newToDoForm);

  let currentProject = document.getElementById("title").textContent;

  submitBtn.addEventListener("click", () => {
    let newToDo = builder.createToDo(
      title.value,
      desc.value,
      dueDate.value,
      currentProject
    );
    builder.projects[currentProject].addToDo(newToDo);

    // render the project view again
    displayToDoes(currentProject);
  });
});

//// NON DOM STUFF ////
// add default project
addProject("Default");

// define a test toDo item
let testItem = builder.createToDo(
  "Test Item",
  "Some stuff and some details Some stuff and some details Some stuff and some details Some stuff and some details ",
  "sometime",
  "Default"
);

// add test item to default project
builder.projects["Default"].addToDo(testItem);

// function to activate project event listener
addProjectListener();
