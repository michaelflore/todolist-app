import "@testing-library/jest-dom";
import { randomUUID } from "crypto";

import { server } from "./src/__mocks__/mock-server-node";
import mockedDatabase from "./src/__mocks__/mock-db";

Object.defineProperty(global, "crypto", {
    value: {
      randomUUID: randomUUID
    },
    writable: true
});

//given our server implementation we are modifying the original 'list' object so the server would be shared between all tests
beforeAll(() => {
    server.listen();
});

afterEach(() => {
    mockedDatabase.resetDB();
    server.resetHandlers();
});

afterAll(() => {
    server.close();
})