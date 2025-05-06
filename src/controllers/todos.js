export class TodosController {
    constructor(api) {
        this.api = api;
    }

    async getAllTodos() {
        return await this.api.get('/todos');
    }

    async getTodoById(todoId) {
        return await this.api.get(`/todos/${todoId}`)
    }

    async getDoneTodos() {
        return await this.api.get('/todos?doneStatus=true');
    }

    async postTodo(todo) {
        const payload = {
            "title": `${todo.title}`,
            "doneStatus": Boolean(todo.doneStatus),
            "description": `${todo.description}`
        }
        return await this.api.post('/todos', payload);
    }

    async postTodoById(todo) {
        const payload = {
            "description": `${todo.description}`
        }
        return await this.api.post(`/todos/${todo.id}`, payload)
    }

    async putTodo(todo){
        const payload = {
            "id": Number(todo.id),
            "title": `${todo.title}`,
            "doneStatus": Boolean(todo.doneStatus),
            "description": `${todo.description}`
        }

        return await this.api.put(`/todos/${todo.id}`, payload);
    }

    async deleteTodosById(todoId) {
        return await this.api.delete(`/todos/${todoId}`);
    }
}