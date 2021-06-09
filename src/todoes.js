// declare object containing all projects
let projects = {
  addProject: function(projectName) {
    this[projectName] = {
      addToDo: function(toDo) {
        this[toDo.title] = {toDo};
      }
    };
  }
};

// declare project object
let projectPrototype = {
  addToDoItem: function(toDo) {
    this[toDo.title] = {toDo};
  }
};

// declare factory function for toDo objects
const createToDo = (
  title,
  description,
  dueDate,
  project = "defaultProject",
  complete = false
) => {
  return { title, description, dueDate, project, complete };
};
