import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import builder from "./builder";

//function for adding projects
const addProject = (projectName) => {
  builder.createProject(projectName);
  let projectsList = document.getElementById("projects-list");
  let newProject = document.createElement("div");
  newProject.classList.add("project");
  newProject.innerHTML = builder.projects[projectName].name;
  projectsList.appendChild(newProject);
};

addProject("Default");

const addBtn = document.getElementById('add-btn');
addBtn.addEventListener("click", () => {
  addProject(document.getElementById('project-name').value);
})