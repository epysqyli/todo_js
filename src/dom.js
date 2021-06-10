// dom manipulation module
// button event listeners should be here
import builder from "./builder";

const createItem = () => {
  let content = document.getElementById("content");

  let toDoBox = document.createElement("div");
  toDoBox.classList.add("to-do-box");

  let tiles = builder.createToDo(
    "Tiles purchase",
    "Need to get some tiles from shop X in order to get started with the roof thing",
    "Tomorrow before noon"
  );

  builder.createProject("Roof");
  builder.addItemToProject(tiles, builder.projects.Roof);

  let itemTitle = document.createElement("h2");
  let itemDescription = document.createElement("p");
  let itemDueDate = document.createElement("p");

  itemTitle.innerHTML = tiles.title;
  itemDescription.innerHTML = tiles.description;
  itemDueDate.innerHTML = tiles.dueDate;

  toDoBox.append(itemTitle);
  toDoBox.append(itemDescription);
  toDoBox.append(itemDueDate);

  content.appendChild(toDoBox);
};

export default createItem;
