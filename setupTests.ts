import "@testing-library/jest-dom";
// import { TextEncoder } from "util";

// global.TextEncoder = TextEncoder;

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