// factory function creating a single ToDo object
const createToDo = (
  title,
  description,
  dueDate,
  project = "default",
  complete = false
) => {
  return { title, description, dueDate, complete };
};

let first = createToDo(
  "first todo",
  "This is a way for me to remember things",
  "tomorrow"
);

// when the app is opened, there is a default project object to which every new created toDo goes in automatically. Users can create new project objects of course

