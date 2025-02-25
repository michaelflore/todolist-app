describe("EditTodoPage", () => {
  it("Visits the Edit Todo page. Edit a todo. Then shows alert.", () => {
    cy.visit("/");

    cy.contains("To-do List");
    cy.contains("My To-dos");

    //loading
    cy.get("[aria-label='Loading todos']");

    //success
    cy.get("div[role=list]").children().first().find("a[aria-label='Edit todo']").click();

    cy.url().should("include", "/edit/");

    cy.contains("Edit Todo");

    //loading
    cy.get("[aria-label='Loading todo information']");

    //update
    cy.get("input[id=todo-title]").clear();
    cy.get("input[id=todo-title]").type("Go to the Bank");
    cy.get("input[type=checkbox]").click();

    cy.get("input[type=submit]").contains("Update").click();

    //loading
    cy.get("input[type=submit]").contains("Loading...");

    //success
    cy.url().should("include", "/");
    cy.contains("Todo updated successfully.");

    cy.get("div[role=list]").children().first().should("have.text", "Go to the Bank");

    //close alert
    cy.get("button[aria-label=Close]").click();

  });

});