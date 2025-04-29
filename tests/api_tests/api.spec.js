import {test, expect} from '@playwright/test';
import {ChallengesApi} from "../../src/services/index";
import payloads from "../../src/services/payloads";
import {TodoBuilder} from "../../src/helpers/builders/todo.builder";
import {ChallengesController, TodosController} from "../../src/controllers";

const URL = 'https://apichallenges.herokuapp.com/';

test.describe('API-тесты для работы с задачами', () => {
    let api = new ChallengesApi(URL);
    let challengesController = new ChallengesController(api);
    let todosController = new TodosController(api);
    let createdToDoId;

    test("Получить токен авторизации GET /challenger (200)",
        {tag: '@get'},
        async () => {
            const response = await challengesController.createChallenger();

            expect(response.status).toBe(201);
            expect(response.headers.get('x-challenger')).toEqual(expect.any(String));
        });

    test('Создать новую задачу POST /todos (201)',
        {tag: '@post'},
        async () => {
            const newTodo = new TodoBuilder().addTitle().addDoneStatus(true).addDescription().generate()
            const postPayload = payloads.newToDoPayload(newTodo.title, newTodo.doneStatus, newTodo.description);
            const response = await todosController.postTodo(postPayload)
            const todo = await response.json();

            createdToDoId = todo.id;

            expect(response.status).toBe(201);
            expect(newTodo.title).toBe(todo.title);
            expect(newTodo.doneStatus).toBe(todo.doneStatus);
            expect(newTodo.description).toBe(todo.description);
        });


    test('Получить список задач GET /todos (200)',
        {tag: '@get'},
        async () => {
            const response = await todosController.getAllTodos()
            const body = (await response.json()).todos;

            expect(response.status).toBe(200);
            expect(body.length).toBe(11);
        });

    test('Получить задачу по id GET /todos/{id} (200)',
        {tag: '@get'},
        async () => {
            const response = await todosController.getTodoById(createdToDoId);
            const id = (await response.json()).todos[0].id;

            expect(response.status).toBe(200);
            expect(id).toBe(createdToDoId);
        });

    test('Отфильтровать задачу по статусу GET /todos (200) ?filter',
        {tag: '@get'},
        async () => {
            const response = await todosController.getDoneTodos()
            const responseBody = await response.json();

            expect(response.status).toBe(200);
            responseBody.todos.forEach((element) => expect(element.doneStatus).toBe(true));
        });

    test('Обновить описание задачи по id POST /todos/{id} (200)',
        {tag: '@post'},
        async () => {
            const newDescription = new TodoBuilder().addDescription().generate().description;

            const postPayload = payloads.updateDescriptionPayload(newDescription);
            const response = await todosController.postTodoById(createdToDoId , postPayload);
            const responseBody = await response.json();

            expect(response.status).toBe(200);
            expect(responseBody.description).toBe(newDescription);
        });

    test('Обновить все поля задачи PUT /todos/{id} full (200)',
        {tag: '@put'},
        async () => {
            const newTodoContent = new TodoBuilder().addTitle().addDoneStatus(true).addDescription().generate()

            const postPayload = payloads.updatePayload(createdToDoId, newTodoContent.title, newTodoContent.doneStatus, newTodoContent.description);
            const response = await todosController.putTodo(createdToDoId, postPayload);
            const responseBody = await response.json();

            expect(response.status).toBe(200);
            expect(responseBody.title).toBe(newTodoContent.title);
            expect(responseBody.doneStatus).toBe(newTodoContent.doneStatus);
            expect(responseBody.description).toBe(newTodoContent.description);
        });

    test('Удалить задачу по id DELETE /todos/{id} (200)',
        {tag: '@delete'},
        async () => {
            const response = await todosController.deleteTodosById(createdToDoId);
            expect(response.status).toBe(200)
        });

})

