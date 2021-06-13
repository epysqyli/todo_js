// module defining object creation structures

// declare factory function for toDo objects
const createToDo = (
  title,
  description,
  dueDate,
  project,
  complete = false
) => {
  return { title, description, dueDate, project, complete };
};

// declare object containing all projects
let projects = {
  addProject: function (projectName) {
    this[projectName] = {
      name: String(projectName),
      addToDo: function (toDo) {
        this[toDo.title] = { toDo };
      },
    };
  },
};

// export all functions and objects
export default { createToDo, projects };
