describe("AddTodoPage", () => {
  it("Visits the Add Todo page. Add a new todo. Then shows alert.", () => {
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

    cy.get("input[type=submit]").contains("Add").click();

    //loading
    cy.get("input[type=submit]").contains("Loading...");

    //success
    cy.url().should("include", "/");
    cy.contains("Todo added successfully.");

    cy.get("div[role=list]").children().first().should("have.text", "Buy New Toolkit");

    //close alert
    cy.get("button[aria-label=Close]").click();

  });

});