import { http, HttpResponse, delay } from "msw";

describe("AddTodoPageError", () => {
    it("Visits the Add Todo page. Then goes back to home.", () => {
        cy.visit("/");
  
        cy.contains("To-do List");
        cy.contains("My To-dos");
    
        //loading
        cy.get("[aria-label='Loading todos']");
    
        //success
        cy.contains("Add Todo").click();
    
        cy.url().should("include", "/add");
    
        cy.contains("Add Todo");

        cy.get("button[aria-label='Go back']").click();

        console.log(cy.url())
        cy.url().should("include", "/");

        cy.contains("To-do List");
        cy.contains("My To-dos");
    });

    it("Visits the Add Todo page. Add a new todo. Less than 5 characters.", () => {
      cy.visit("/");
  
      cy.contains("To-do List");
      cy.contains("My To-dos");
  
      //loading
      cy.get("[aria-label='Loading todos']");
  
      //success
      cy.contains("Add Todo").click();
  
      cy.url().should("include", "/add");
  
      cy.contains("Add Todo");
  
      //add
      cy.get("input[id=todo-title]").type("less");
      cy.get("input[type=checkbox]").click();
  
      cy.get("input[type=submit]").contains("Add").click();
  
      //error
      cy.get("label").contains("Title").should("have.class", "Mui-error");
      cy.get("p#todo-title-helper-text").as("errorText").contains("Must be at least 5 characters.");

      //close error
      cy.get("input[id=todo-title]").type("m");

      cy.get("@errorText").should("not.exist");
  
    });

    it("Visits the Add Todo page. Add a new todo. Then shows alert. Error.", () => {
      cy.visit("/");
  
      cy.contains("To-do List");
      cy.contains("My To-dos");
  
      //loading
      cy.get("[aria-label='Loading todos']");
  
      //success
      cy.contains("Add Todo").click();
  
      cy.url().should("include", "/add");
  
      cy.contains("Add Todo");
  
      //add
      cy.get("input[id=todo-title]").type("Buy New Toolkit");
      cy.get("input[type=checkbox]").click();

      //fake request
      cy.interceptMSW(
        http.post("/api/todolist", async () => {
            await delay();
            
            return HttpResponse.error();
        })
      );
  
      cy.get("input[type=submit]").contains("Add").click();
  
      //loading
      cy.get("input[type=submit]").contains("Loading...");
      cy.get("input[type=submit]").should("be.disabled");
  
      //error
      cy.get("input[type=submit]").contains("Add");
      cy.get("input[type=submit]").should("not.be.disabled");

      cy.get("div[role=alert]").as("alert").contains("Something went wrong. Please try again later.");

      //close alert
      cy.get("button[aria-label='Close add alert']").click();

      cy.get("@alert").should("not.exist");
  
    });
});