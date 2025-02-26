import list from "../../mockdata.json" assert { type: "json" };
import { TodoI } from "../types/todo";

//since we are using this db in request handlers, its better to use an object that contains the db internally rather than using
//a variable with an exported function
class MockedDb {
    db: TodoI[];

    constructor() {
        this.db = list.todoList.map((value) => ( {...value} ));;
    }

    resetDB(): void {
        this.db = list.todoList.map((value) => ( {...value} ));
    }

}

export default new MockedDb();
