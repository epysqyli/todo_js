import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import builder from "./builder";
import removeAllChildren from "./helpers";

//function for adding projects
const addProject = (projectName) => {
  if (projectName == '') {
    return;
  }
  builder.createProject(projectName);
  let projectsList = document.getElementById("projects-list");
  let newProject = document.createElement("div");
  newProject.classList.add("project");
  newProject.innerHTML = builder.projects[projectName].name;
  projectsList.appendChild(newProject);
};

// define click event listener on add button for new projects
const addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", () => {
  let projectName = document.getElementById("project-name");
  addProject(projectName.value);
  projectName.value = '';
});

// add default project
addProject("Default");

let testItem = builder.createToDo("test Item", "Some stuff and some details", "sometime");
builder.addItemToProject(testItem, builder.projects["Default"]);

// populate items-container with project title, project todoes as boxes and a way to create new todoes