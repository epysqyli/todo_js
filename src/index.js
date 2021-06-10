import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import builder from "./builder";
import removeAllChildren from "./helpers";

//function for adding projects
const addProject = (projectName) => {
  if (projectName == "") {
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
  i++; // to avoid duplicating event listeners
  let projectName = document.getElementById("project-name");
  addProject(projectName.value);
  projectName.value = "";
  addProjectListener();
});

// add default project
addProject("Default");

// define a test toDo item
let testItem = builder.createToDo(
  "test Item",
  "Some stuff and some details",
  "sometime"
);

// add test item to default project
builder.addItemToProject(testItem, builder.projects["Default"]);

// populate items-container with project title, 
// Add display of project todoes as boxes and a way to create new todoes
const displayProject = (project) => {
  let projectTitle = document.getElementById("title");
  projectTitle.innerHTML = project.name;
};

// i used to avoid duplicating event listeners on previous projects after adding a new one with addBtn
let i = 0;

const addProjectListener = () => {
  let projectsArray = Array.from(document.querySelectorAll(".project"));
  projectsArray.slice(i, projectsArray.length).forEach((project) =>
    project.addEventListener("click", (e) => {
      console.log(builder.projects[e.target.innerHTML]);
      displayProject(builder.projects[e.target.innerHTML]);
    })
  );
};

addProjectListener();
