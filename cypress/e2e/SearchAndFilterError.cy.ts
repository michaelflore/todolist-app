import { http, HttpResponse, delay } from "msw";

describe("SearchAndFilterError", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Filter all todos. Error.", () => {

        cy.contains("To-do List");
        cy.contains("My To-dos");

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("div[role=list]").children().should("have.length.greaterThan", 0);
    
        //fake request
        cy.interceptMSW(
            http.get("/api/todolist", async () => {
                await delay();
                
                return HttpResponse.error();
            })
        );

        cy.get("button").contains("All").click();

        //loading
        cy.get("[aria-label='Loading todos']");

        //error
        cy.get("div[role=alert]").as("alert").contains("Something went wrong. Please try again later.");

        //close alert
        cy.get("button[aria-label='Close alert']").click();

        cy.get("@alert").should("not.exist");
        cy.get("div[role=list]").children().should("have.length.greaterThan", 0);
    
    });

    it("Filter all todos. Search in all. Error.", () => {

        cy.contains("To-do List");
        cy.contains("My To-dos");

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("button").contains("All").click();

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("div[role=list]").children().should("have.length.greaterThan", 0);

        //fake request
        cy.interceptMSW(
            http.get("/api/todolist", async () => {
                await delay();
                
                return HttpResponse.error();
            })
        );

        //search
        cy.get("input[placeholder='Search todos...']").type("Project report");

        //loading
        cy.get("[aria-label='Loading todos']");

        //error
        cy.get("div[role=alert]").as("alert").contains("Something went wrong. Please try again later.");

        //close alert
        cy.get("button[aria-label='Close alert']").click();

        cy.get("@alert").should("not.exist");
        cy.get("div[role=list]").children().should("have.length.greaterThan", 0);
    
    });

    it("Filter completed todos. Error.", () => {

        cy.contains("To-do List");
        cy.contains("My To-dos");

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("div[role=list]").children().should("have.length.greaterThan", 0);
    
        //fake request
        cy.interceptMSW(
            http.get("/api/todolist", async () => {
                await delay();
                
                return HttpResponse.error();
            })
        );

        cy.get("button").contains("Completed").click();

        //loading
        cy.get("[aria-label='Loading todos']");

        //error
        cy.get("div[role=alert]").as("alert").contains("Something went wrong. Please try again later.");

        //close alert
        cy.get("button[aria-label='Close alert']").click();

        cy.get("@alert").should("not.exist");
        cy.get("div[role=list]").children().should("have.length.greaterThan", 0);
    
    });

    it("Filter completed todos. Search in completed. Error.", () => {

        cy.contains("To-do List");
        cy.contains("My To-dos");

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("button").contains("Completed").click();

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("div[role=list]").children().find("input[type=checkbox]").should("be.checked");

        //fake request
        cy.interceptMSW(
            http.get("/api/todolist", async () => {
                await delay();
                
                return HttpResponse.error();
            })
        );

        //search
        cy.get("input[placeholder='Search todos...']").type("Project report");

        //loading
        cy.get("[aria-label='Loading todos']");

        //error
        cy.get("div[role=alert]").as("alert").contains("Something went wrong. Please try again later.");

        //close alert
        cy.get("button[aria-label='Close alert']").click();

        cy.get("@alert").should("not.exist");
        cy.get("div[role=list]").children().should("have.length.greaterThan", 0);
    
    });

    it("Filter pending todos. Error.", () => {

        cy.contains("To-do List");
        cy.contains("My To-dos");

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("div[role=list]").children().should("have.length.greaterThan", 0);
    
        //fake request
        cy.interceptMSW(
            http.get("/api/todolist", async () => {
                await delay();
                
                return HttpResponse.error();
            })
        );

        cy.get("button").contains("Pending").click();

        //loading
        cy.get("[aria-label='Loading todos']");

        //error
        cy.get("div[role=alert]").as("alert").contains("Something went wrong. Please try again later.");

        //close alert
        cy.get("button[aria-label='Close alert']").click();

        cy.get("@alert").should("not.exist");
        cy.get("div[role=list]").children().should("have.length.greaterThan", 0);
    
    });

    it("Filter pending todos. Search in pending. Error.", () => {

        cy.contains("To-do List");
        cy.contains("My To-dos");

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("button").contains("Pending").click();

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("div[role=list]").children().find("input[type=checkbox]").should("not.be.checked");

        //fake request
        cy.interceptMSW(
            http.get("/api/todolist", async () => {
                await delay();
                
                return HttpResponse.error();
            })
        );

        //search
        cy.get("input[placeholder='Search todos...']").type("Project report");

        //loading
        cy.get("[aria-label='Loading todos']");

        //error
        cy.get("div[role=alert]").as("alert").contains("Something went wrong. Please try again later.");

        //close alert
        cy.get("button[aria-label='Close alert']").click();

        cy.get("@alert").should("not.exist");
        cy.get("div[role=list]").children().should("have.length.greaterThan", 0);
    
    });

});