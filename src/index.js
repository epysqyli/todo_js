import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import builder from "./builder";

// create default Project and add it to the DOM --> make a function for this
builder.createProject("defaultProject");
let projectsList = document.getElementById("projects");
let newProject = document.createElement("div");
newProject.classList.add('project');
newProject.innerHTML = builder.projects["defaultProject"].name;
projectsList.appendChild(newProject);