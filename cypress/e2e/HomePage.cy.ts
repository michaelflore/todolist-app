describe("Home Page", () => {
  it("Visits the Add Todo page. Add a new todo. Then shows alert.", () => {
    cy.visit("/");

    cy.contains("To-do List");
    cy.contains("My To-dos");

    cy.contains("Add Todo").click();

    cy.url().should("include", "/add");

    cy.contains("Add Todo");

    cy.get("input[id=todo-title]").type("Buy New Toolkit");
    cy.get("input[type=submit]").contains("Add").click();

    //loading
    cy.get("input[type=submit]").contains("Loading...");

    //sucess
    cy.url().should("include", "/");
    cy.contains("Todo added successfully.");

    cy.get("div[role=list]").children().first().contains("Buy New Toolkit");

    //close alert
    cy.get("button[aria-label=Close]").click();

  });

  it("Check on checkbox to mark complete.", () => {
    cy.visit("/");

    cy.contains("To-do List");
    cy.contains("My To-dos");

    cy.get("div[role=list]").children().first().within(() => {
      cy.get("input[type=checkbox]").click();

      //loading
      cy.get("span[role=progressbar]").should("be.visible");

      cy.get("span[role=presentation]").should("be.visible");
      cy.get("button[aria-label='Delete todo']").should("be.disabled");

      //success
      cy.get("span[role=progressbar]").should("not.exist"); 
      cy.get("span[role=presentation]").should("not.exist");

      cy.get("input[type=checkbox]").should("be.checked"); 
      cy.get("a[aria-label='Edit todo']").should("have.attr", "href");
      cy.get("button[aria-label='Delete todo']").should("not.be.disabled");
    });

  });
})