import { worker } from "../../src/__mocks__/mock-server-browser";
import mockedDatabase from "../../src/__mocks__/mock-db";
import { RequestHandler } from "msw";

before(() => {
    worker.start();
});

afterEach(() => {
    mockedDatabase.resetDB();
    worker.resetHandlers();
});

after(() => {
    worker.stop();
});

Cypress.Commands.add("interceptMSW", (...handlers: RequestHandler[]) => {
    worker.use(...handlers);
});