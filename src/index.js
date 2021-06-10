import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import builder from "./builder";

let addProject = document.getElementById('add-project');
addProject.addEventListener("click", () => {
  let projectName = prompt("Enter a project name");
  builder.createProject(projectName);
  content.innerHTML += builder.projects[projectName].name;
})