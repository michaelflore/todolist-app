import { http, HttpResponse, delay } from "msw";

describe("EditTodoPageError", () => {
    it("Visits the Edit Todo page. Then goes back to home.", () => {
        cy.visit("/");
  
        cy.contains("To-do List");
        cy.contains("My To-dos");
    
        //loading
        cy.get("[aria-label='Loading todos']");
    
        //success
        cy.get("div[role=list]").children().first().within(($first) => {
            cy.wrap($first).as("firstitem");
            cy.get("a[aria-label='Edit todo']").click();
        });
    
        cy.url().should("include", "/edit");
    
        cy.contains("Edit Todo");

        cy.get("button[aria-label='Go back']").click();

        cy.url().should("include", "/");

        cy.contains("To-do List");
        cy.contains("My To-dos");
    });

    it("Visits the Edit Todo page. Incorrect item id.", () => {
        cy.visit("/");
    
        cy.contains("To-do List");
        cy.contains("My To-dos");
    
        //loading
        cy.get("[aria-label='Loading todos']");
    
        //success
        cy.get("div[role=list]").children().should("have.length.greaterThan", 0);

        //fake request
        http.get("/api/todolist/:todoId", async () => {
            await delay();
            
            return HttpResponse.error();
        });

        cy.visit("/edit/test");
    
        cy.url().should("include", "/edit");
    
        cy.contains("Edit Todo");
    
        //error
        cy.get("div[role=alert]").as("alert").contains("Item not found.");
    
    });

    it("Visits the Edit Todo page. Fetches todo. Error.", () => {
        cy.visit("/");
    
        cy.contains("To-do List");
        cy.contains("My To-dos");
    
        //loading
        cy.get("[aria-label='Loading todos']");

        //fake request
        cy.interceptMSW(
            http.get("/api/todolist/:todoId", async () => {
                await delay();
                
                return HttpResponse.error();
            })
        );
    
        //success
        cy.get("div[role=list]").children().first().within(($first) => {
          cy.wrap($first).as("firstitem");
          cy.get("a[aria-label='Edit todo']").click();
        });
    
        cy.url().should("include", "/edit");
    
        cy.contains("Edit Todo");

        //loading
        cy.get("span[aria-label='Loading todo information']").should("exist");
    
        //error
        cy.get("div[role=alert]").as("alert").contains("Something went wrong. Please try again later.");
    
    });

    it("Visits the Edit Todo page. Update a new todo. Less than 5 characters.", () => {
      cy.visit("/");
  
      cy.contains("To-do List");
      cy.contains("My To-dos");
  
      //loading
      cy.get("[aria-label='Loading todos']");
  
      //success
      cy.get("div[role=list]").children().first().within(($first) => {
        cy.wrap($first).as("firstitem");
        cy.get("a[aria-label='Edit todo']").click();
      });
  
      cy.url().should("include", "/edit");
  
      cy.contains("Edit Todo");
  
      //edit
      cy.get("input[id=todo-title]").clear();
      cy.get("input[id=todo-title]").type("less");
      cy.get("input[type=checkbox]").click();
  
      cy.get("input[type=submit]").contains("Update").click();
  
      //error
      cy.get("label").contains("Title").should("have.class", "Mui-error");
      cy.get("p#todo-title-helper-text").as("errorText").contains("Must be at least 5 characters.");

      //close error
      cy.get("input[id=todo-title]").type("m");

      cy.get("@errorText").should("not.exist");
  
    });

    it.only("Visits the Edit Todo page. Update a todo. Then shows alert. Modify url param.", () => {
      cy.visit("/");
  
      cy.contains("To-do List");
      cy.contains("My To-dos");
  
      //loading
      cy.get("[aria-label='Loading todos']");
  
      //success
      cy.get("div[role=list]").children().should("have.length.greaterThan", 0);
      
      //fake request
      //How we would change url params
      cy.interceptMSW(
          http.get("/api/todolist/:todoId", async () => {
            await delay();
            
            return HttpResponse.json({
              "id": "outdatedid",
              "title": "Complete project report",
              "completed": true
            }, { status: 200 });
          })
      );

      cy.visit("/edit/outdatedid");
  
      cy.url().should("include", "/edit");
  
      cy.contains("Edit Todo");
  
      //edit
      cy.get("input[id=todo-title]").clear();
      cy.get("input[id=todo-title]").type("Clean the Garage");
      cy.get("input[type=checkbox]").click();
  
      cy.get("input[type=submit]").contains("Update").click();
  
      //loading
      cy.get("input[type=submit]").contains("Loading...");
      cy.get("input[type=submit]").should("be.disabled");
  
      //error
      cy.get("input[type=submit]").contains("Update");
      cy.get("input[type=submit]").should("not.be.disabled");

      cy.get("div[role=alert]").as("alert").contains("Item not found.");

      //close alert
      cy.get("button[aria-label='Close update alert']").click();

      cy.get("@alert").should("not.exist");
  
    });

    it("Visits the Edit Todo page. Update a todo. Then shows alert. Error.", () => {
      cy.visit("/");
  
      cy.contains("To-do List");
      cy.contains("My To-dos");
  
      //loading
      cy.get("[aria-label='Loading todos']");
  
      //success
      cy.get("div[role=list]").children().first().within(($first) => {
        cy.wrap($first).as("firstitem");
        cy.get("a[aria-label='Edit todo']").click();
      });
  
      cy.url().should("include", "/edit");
  
      cy.contains("Edit Todo");
  
      //edit
      cy.get("input[id=todo-title]").clear();
      cy.get("input[id=todo-title]").type("Clean the Garage");
      cy.get("input[type=checkbox]").click();

      //fake request
      cy.interceptMSW(
        http.patch("/api/todolist/:todoId", async () => {
            await delay();
            
            return HttpResponse.error();
        })
      );
  
      cy.get("input[type=submit]").contains("Update").click();
  
      //loading
      cy.get("input[type=submit]").contains("Loading...");
      cy.get("input[type=submit]").should("be.disabled");
  
      //error
      cy.get("input[type=submit]").contains("Update");
      cy.get("input[type=submit]").should("not.be.disabled");

      cy.get("div[role=alert]").as("alert").contains("Something went wrong. Please try again later.");

      //close alert
      cy.get("button[aria-label='Close update alert']").click();

      cy.get("@alert").should("not.exist");
  
    });
});