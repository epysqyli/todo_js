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
  const toDoes = Object.values(builder.projects[projectName]).slice(2);

  let itemContainer = document.getElementById("to-does-container");
  removeAllChildren(itemContainer);

  toDoes.forEach((item) => {
    let itemBox = document.createElement("div");
    itemBox.classList.add("to-do-box");

    // style the toDo item - title - p - due date - priority - complete or not
    let title = document.createElement("h3");
    title.id = "box-title";
    title.innerHTML = item.toDo.title;
    let description = document.createElement("div");
    description.id = "box-desc";
    description.innerHTML = item.toDo.description;

    // create a flex div with date on the left and status on the right
    let dateStatusContainer = document.createElement("div");
    dateStatusContainer.id = "date-status-container";

    let due = document.createElement("div");
    due.id = "box-due";
    due.innerHTML = `Due on:<br> ${item.toDo.dueDate}`;
    let status = document.createElement("div");
    status.id = "box-status";

    // this solves status overwrite when displaying todoes
    if (item.toDo.complete == false) {
      status.innerHTML = "Mark as done";
    }
    if (item.toDo.complete == true) {
      status.innerHTML = "Mark as to be done";
      itemBox.classList.add("box-done");
    }

    dateStatusContainer.appendChild(due);
    dateStatusContainer.appendChild(status);

    let deleteBtn = document.createElement("div");
    deleteBtn.id = "box-delete";
    deleteBtn.innerHTML = "Delete Item";

    let editBtn = document.createElement("div");
    editBtn.id = "box-edit";
    editBtn.innerHTML = "Edit Item";

    itemBox.appendChild(title);
    itemBox.appendChild(description);
    itemBox.appendChild(dateStatusContainer);
    itemBox.append(editBtn);
    itemBox.append(deleteBtn);
    itemContainer.appendChild(itemBox);

    status.addEventListener("click", () => {
      if (item.toDo.complete == false) {
        item.toDo.complete = true;
        status.innerHTML = "Mark as to be done";
        itemBox.classList.add("box-done");
      } else {
        item.toDo.complete = false;
        status.innerHTML = "Mark as done";
        itemBox.classList.remove("box-done");
      }
    });

    deleteBtn.addEventListener("click", () => {
      delete builder.projects[projectName][item.toDo.title];
      displayToDoes(projectName);
    });

    // event listener to edit item
    editBtn.addEventListener("click", () => {
      let itemContainer = document.getElementById("to-does-container");
      removeAllChildren(itemContainer);

      let newToDoForm = document.createElement("div");
      newToDoForm.id = "new-todo-form";

      let titleLabel = document.createElement("label");
      let title = document.createElement("input");
      title.value = item.toDo.title;
      title.id = "todo-title";
      titleLabel.textContent = "Enter the task name";
      titleLabel.setAttribute("for", "todo-title");

      let descLabel = document.createElement("label");
      let desc = document.createElement("textarea");
      desc.value = item.toDo.description;
      desc.id = "todo-desc";
      descLabel.textContent = "Enter the description";
      descLabel.setAttribute("for", "todo-desc");

      let dueDate = document.createElement("input");
      dueDate.id = "due-date";
      dueDate.type = "date";
      dueDate.value = item.toDo.dueDate;
      let dueDateLabel = document.createElement("label");
      dueDateLabel.setAttribute("for", "due-date");
      dueDateLabel.textContent = "When is the task due?";

      let submitBtn = document.createElement("div");
      submitBtn.id = "submit-btn";
      submitBtn.textContent = "Edit Task";

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
        item.toDo.title = title.value;
        item.toDo.description = desc.value;
        item.toDo.dueDate = dueDate.value;
        item.toDo.project = currentProject;
        // render the project view again
        displayToDoes(currentProject);
      });
    });
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
      let projectsArrayClone = Array.from(
        document.querySelectorAll(".project")
      );
      updateSelectedProject(e.target, projectsArrayClone);
      displayProject(builder.projects[e.target.innerHTML]);
    })
  );
};

// define function that removes class from all array items (using clone array) except the selected one
const updateSelectedProject = (selectedProject, array) => {
  array.forEach((project) => {
    if (project.innerHTML != selectedProject.innerHTML) {
      project.classList.remove("selected-project");
    } else {
      project.classList.add("selected-project");
    }
  });
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
  "2021-10-20",
  "Default"
);

// add test item to default project
builder.projects["Default"].addToDo(testItem);

// function to activate project event listener
addProjectListener(); // there seems to a be a bug if the plus button is clicked before entering a title
window.onload = function () {
  document.getElementsByClassName("project")[0].click();
};
