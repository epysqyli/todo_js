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
  builder.createProject(projectName);
  let projectsList = document.getElementById("projects-list");
  let newProject = document.createElement("div");
  newProject.classList.add("project");
  newProject.innerHTML = builder.projects[projectName].name;
  projectsList.appendChild(newProject);
};

// i used to avoid duplicating event listeners on previous projects after adding a new one with addBtn
let i = 0;

// enables clicking on the project list
const addProjectListener = () => {
  let projectsArray = Array.from(document.querySelectorAll(".project"));
  projectsArray.slice(i, projectsArray.length).forEach((project) =>
    project.addEventListener("click", (e) => {
      // console.log(builder.projects[e.target.innerHTML]);
      displayProject(builder.projects[e.target.innerHTML]);
    })
  );
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

// populate items-container with project title
const displayProject = (project) => {
  let projectTitle = document.getElementById("title");
  projectTitle.innerHTML = project.name;
  displayToDoes(project.name);
};

// populate items-container with the actual todoes belonging to the selected project
const displayToDoes = (projectName) => {
  const values = Object.values(builder.projects[projectName]).slice(2);
  console.log(values);

  let itemContainer = document.getElementById("to-does-container");
  removeAllChildren(itemContainer);

  values.forEach(item => {
    let itemBox = document.createElement("div");
    itemBox.classList.add("to-do-box");
    
    // style the toDo item - title - p - due date - priority - complete or not
    let title = document.createElement("h3");
    title.innerHTML = item.toDo.title;
    let description = document.createElement("p");
    description.innerHTML =  item.toDo.description;
    
    itemBox.appendChild(title);
    itemBox.appendChild(description);
    itemContainer.appendChild(itemBox);
  })
};


//// NON DOM STUFF ////
// add default project
addProject("Default");

// define a test toDo item
let testItem = builder.createToDo(
  "test Item",
  "Some stuff and some details",
  "sometime"
);

let secondItem = builder.createToDo(
  "Second Item",
  "Some stuff and some details",
  "sometime soon"
);

// add test item to default project
builder.addItemToProject(testItem, builder.projects["Default"]);
builder.addItemToProject(secondItem, builder.projects["Default"]);

// function to activate project event listener
addProjectListener();
