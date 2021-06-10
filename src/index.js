import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";
import "./builders";
import builders from "./builders";

// object creation example
builders.createProject("firstProject");
let first = builders.createToDo(
  "firstItem",
  "This is the first item I am going to cross",
  "someday"
);

builders.addItemToProject(first, builders.projects.firstProject);

builders.createProject("otherProject");
let second = builders.createToDo(
  "secondItem",
  "Some more stuff to do!",
  "some other day"
);

let third = builders.createToDo(
  "thirdItem",
  "Some more stuff to do, it never ends!",
  "some other far away day"
);

builders.addItemToProject(second, builders.projects.otherProject);
builders.addItemToProject(third, builders.projects.otherProject);

console.log(builders.projects);
