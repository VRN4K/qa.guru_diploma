import endpoints from "../services/endpoints";

export class TodosController {
    constructor(api) {
        this.api = api;
    }

    async getAllTodos() {
        return await this.api.get(endpoints.getAllToDo);
    }

    async getTodoById(todoId) {
        return await this.api.get(endpoints.getToDoById(todoId))
    }

    async getDoneTodos() {
        return await this.api.get(endpoints.getFilteredTodoByDoneStatus);
    }

    async postTodo(payload) {
        return await this.api.post(endpoints.getAllToDo, payload);
    }

    async postTodoById(id, payload) {
        return await this.api.post(endpoints.updateOrDeleteById(id), payload)
    }

    async putTodo(id, payload) {
        return await this.api.put(endpoints.getToDoById(id), payload);
    }

    async deleteTodosById(id) {
        return await this.api.delete(endpoints.updateOrDeleteById(id));
    }
}