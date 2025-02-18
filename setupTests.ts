import "@testing-library/jest-dom";
import { randomUUID } from "crypto";

Object.defineProperty(global, "crypto", {
    value: {
      randomUUID: randomUUID
    },
    writable: true
});

import { server } from "./src/__mocks__/mock-server";

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    server.close();
})