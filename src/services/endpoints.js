export default {
    getToken:  "challenger",
    getAllToDo: "todos",
    getToDoById: (id) => `todos/${id}`,
    updateOrDeleteById: (id) => `todos/${id}`,
    getFilteredTodoByDoneStatus: 'todos?doneStatus=true'
};
