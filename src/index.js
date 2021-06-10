import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";
import "./builder";
import builder from "./builder";

// object creation example
builder.createProject("firstProject");
let first = builder.createToDo(
  "firstItem",
  "This is the first item I am going to cross",
  "someday"
);

builder.addItemToProject(first, builder.projects.firstProject);

builder.createProject("otherProject");
let second = builder.createToDo(
  "secondItem",
  "Some more stuff to do!",
  "some other day"
);

let third = builder.createToDo(
  "thirdItem",
  "Some more stuff to do, it never ends!",
  "some other far away day"
);

builder.addItemToProject(second, builder.projects.otherProject);
builder.addItemToProject(third, builder.projects.otherProject);

console.log(builder.projects);
