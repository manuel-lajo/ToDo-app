
let TaskList = [
  { id: 1, description: 'this is task nro. 1', checked: false },
  { id: 2, description: 'this is another task', checked: false },
  { id: 3, description: 'this is task nro. 3', checked: true },
  { id: 4, description: 'this is task nro. 4', checked: false },
];

exports.getTasks = (req, res, next) => {
  res.json(TaskList)
};

exports.postTask = (req, res, next) => {
  const { description, id } = req.body;
  const newTask = { id, description, checked: false };
  TaskList.push(newTask);
  res.status(200).json({ task: newTask, message: 'Task added successfully.' });
};

exports.updateTask = (req, res, next) => {
  const id = +req.params.id;
  const index = TaskList.findIndex(element => element.id === id);
  TaskList[index].checked = !TaskList[index].checked;
  res.status(200).json({ message: 'Task updated successfully.' });
};

exports.deleteTask = (req, res, next) => {
  const id = +req.params.id;
  TaskList = TaskList.filter(element => element.id !== id);
  console.log(TaskList);
  res.status(200).json({ message: 'Task deleted successfully.' });
};
